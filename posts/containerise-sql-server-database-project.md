---
title: "TWIL: Containerise a SQL Server Database Project"
description: "How to containerise a SQL Server Database project with dacpac"
keywords: "dotnet, .net, sql, sql server, cross-platform, legacy, dacpac"
date: "2021-12-12"
isDraft: false
---

## This Week I Learned

How to containerise a SQL Server database project with dacpac.

![A container ship full of containers](https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80 "A container ship full of containers")
_A container ship full of containers - credit: [Ian Taylor on Unsplash](https://unsplash.com/@carrier_lost)_
<br /><br />

### Why do we want to do this?

A challenge I have faced multiple times now in my career is the challenge of how to test behaviour found in stored procedures in a database. Data layers favouring stored procedures tend to accumulate complex logic in those stored procedures over time, including logic that _probably_ should have been implemented in code. This logic shouldn't be treated any differently to logic found anywhere else in our systems; that is, we would like to have tests in place to ensure correctness. These tests will act as our safety net when making changes to that complex stored procedure logic.

One way of facilitating tests targeting this stored procedure logic is to treat the data layer like a black-box; write integration tests that exercise these stored procedures, without really needing to know anything too specific about how they work. With this information then, the question arises, what database do I run my tests against? We _could_ target whatever database instance we use for local development, but that's not much use for running anywhere else, like for example, a build pipeline. We could target a long-lived shared environment, like a pre-prod environment for example, but there are issues with that too:

-   We're limited in how we can test, because we have to ensure that our tests are compatible with what is currently deployed to that environment.
-   The data beneath us is constantly changing (due to it being a shared environment), leading to potentially "flaky" tests.

Wouldn't it be great if we could create our own dedicated test database, on demand, seeded with all the data we need to test, and tear down that database just as easily?

Well with Docker, we can!

### Creating the Dockerfile

This post follows on from [last week's post](cross-platform-sql-server-database-project) about cross-platform database projects, so we'll use that project as the basis for our new container. First, let's create a new Dockerfile inside our database project, and our Dockerfile will be based off of the `mcr.microsoft.com/mssql/server` image on DockerHub, targeting version 2019

```docker
FROM mcr.microsoft.com/mssql/server:2019-latest
```

<br />
Next, we'll need to assume the root user,

```docker
USER root
```

as it is required in order to be able to install the `unzip` package, which we'll need later:

```docker
# Install Unzip
RUN apt-get update \
    && apt-get install unzip -y
```

<br />
Next, we need to fetch and install `SQLPackage` for Linux, and make it executable inside the container using the unzip package from the previous step:

```docker
# Install SQLPackage for Linux and make it executable
RUN wget -progress=bar:force -q -O sqlpackage.zip https://go.microsoft.com/fwlink/?linkid=2157202 \
    && unzip -qq sqlpackage.zip -d /opt/sqlpackage \
    && chmod +x /opt/sqlpackage/sqlpackage
```

<br />

Then, we need to add our built dacpac into the image (the path to your dacpac may differ slightly, depending on which version of dotnet you are targeting, and the name of your database):

```docker
# Add the DACPAC to the image
COPY ./bin/Debug/net452/Database.dacpac /tmp/db.dacpac
```

<br />

Next, we'll switch to a non-root user for security reasons, and specify a couple of build-time arguments:

```docker
# switch to non-root user
USER 1001

# Configure external build arguments to allow configurability.
ARG DBNAME=Database
ARG PASSWORD
```

<br />

We'll also need to configure some environment variables that our SQL Server instance needs:

```docker
# Configure the required environment variables
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=$PASSWORD
```

<br />

And last but not least, we need to start our SQL Server instance, deploy the dacpac, and then finally kill SQL Server so that it is ready to start up when the container is run:

```docker
# Launch SQL Server, confirm startup is complete, deploy the DACPAC, then terminate SQL Server.
# See https://stackoverflow.com/a/51589787/488695
RUN ( /opt/mssql/bin/sqlservr & ) | grep -q "Service Broker manager has started" && ( echo "SQLServer started" && sleep 10s ) || ( echo "SQLSERVER failed to start" && exit ) \
    && /opt/sqlpackage/sqlpackage /a:Publish /tsn:. /tdn:${DBNAME} /tu:sa /tp:$SA_PASSWORD /sf:/tmp/db.dacpac \
    && pkill sqlservr
```

<br />

There's a lot going on there, so let's break it down a bit, first we start the SQL Server process, and monitor for logs indicating success or failure to startup:

```docker
RUN ( /opt/mssql/bin/sqlservr & ) | grep -q "Service Broker manager has started" && ( echo "SQLServer started" && sleep 10s ) || ( echo "SQLSERVER failed to start" && exit ) \
```

Then we run our SQLPackage executable from the beginning, which takes in our dacpac and build arguments in order to deploy the dacpac against the running SQL Server instance:

```docker
&& /opt/sqlpackage/sqlpackage /a:Publish /tsn:. /tdn:${DBNAME} /tu:sa /tp:$SA_PASSWORD /sf:/tmp/db.dacpac \
```

Lastly, we kill the SQL Server process, as the mssql image we're using as the base of our image is expecting to start up SQL Server when it runs, and will break if it is already running.

So when it's all put together, your Dockerfile should look something like this:

```docker
FROM mcr.microsoft.com/mssql/server:2019-latest
USER root
# Install Unzip
RUN apt-get update \
    && apt-get install unzip -y

# Install SQLPackage for Linux and make it executable
RUN wget -progress=bar:force -q -O sqlpackage.zip https://go.microsoft.com/fwlink/?linkid=2157202 \
    && unzip -qq sqlpackage.zip -d /opt/sqlpackage \
    && chmod +x /opt/sqlpackage/sqlpackage

# Add the DACPAC to the image
COPY ./bin/Debug/net452/Database.dacpac /tmp/db.dacpac

# switch to non-root user
USER 1001

# Configure external build arguments to allow configurability.
ARG DBNAME=Database
ARG PASSWORD

# Configure the required environment variables
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=$PASSWORD

# Launch SQL Server, confirm startup is complete, deploy the DACPAC, then terminate SQL Server.
# See https://stackoverflow.com/a/51589787/488695
RUN ( /opt/mssql/bin/sqlservr & ) | grep -q "Service Broker manager has started" && ( echo "SQLServer started" && sleep 10s ) || ( echo "SQLSERVER failed to start" && exit ) \
    && /opt/sqlpackage/sqlpackage /a:Publish /tsn:. /tdn:${DBNAME} /tu:sa /tp:$SA_PASSWORD /sf:/tmp/db.dacpac \
    && pkill sqlservr
```

<br />

### Running the Docker image

The build command to generate an image from our Dockerfile looks like this: `docker build --build-arg PASSWORD='s0mes3curepassw0rd!' -t db:1.0 .`

And then we can run it like so: `docker run -p 1433:1433 --name db -d db:1.0`

Hooray 🎉🎉 we now have a running docker container with an instance of SQL Server and our published schema from the dacpac. Now we're ready to write integration tests targeting our database running in Docker 🙌
<br />
<br />

---

<br />

**Final thoughts**

One really awesome thing about being able to deploy a dacpac to a container like this is that the dacpac deploy happens as part of the docker _build,_ and can optionally include pre- and post-deployment scripts. This allows you to seed your newly created database so that it is ready to rock immediately after starting up, as the image comes with all the data it needs baked in.
