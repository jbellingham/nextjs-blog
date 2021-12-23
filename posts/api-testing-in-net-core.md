---
title: "TWIL: API Testing in .NET Core"
description: "How to write portable API tests for .NET Core APIs"
keywords: "dotnet, .net, sql, sql server, cross-platform, testing, api"
date: "2021-12-20"
---

## This Week I Learned

How to easily create API tests in .NET Core, using [WebApplicationFactory](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.testing.webapplicationfactory-1).

![A terminal window on a laptop screen](https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80 "A terminal window on a laptop screen")
_A terminal window on a laptop screen - credit: [Sai Kiran Anagani on Unsplash](https://unsplash.com/@anagani_saikiran)_
<br /><br />

### What is an API test?

There are lots of different ways of categorising tests. Even if we’ve been able to (sort of) agree on some high-level categories, e.g. Unit; Integration; End-to-end;, it seems like everyone has a slightly different idea of what constitutes a unit test versus an integration test for example. For the purpose of this article, an API test is a test that primarily exercises a system by calling into its _public_ API in the same way that an API user or front-end application would.

### Test methodology and configuration

We want this test to match as closely as possible to the code a real front-end request would pass through, so ideally our API should be configured using largely the same configuration as it would in any other environment. The only exceptions to this rule should be any external dependencies, such as databases and any other services relied on for data or otherwise.

In the case of other services our API relies on, it is acceptable (and probably preferable) to mock/stub out those requests. This can probably be argued either way, but in my view, it makes more sense to assume the happy path from these dependencies, and therefore isolate the tests to just our API and have a much clearer signal when the tests break. We would then have tests covering more closely the integration point with that external dependency, verifying how our system behaves in all (or most) possible happy and non-happy path cases.

In the case of any owned¹ databases our API relies on, ideally we should have a “real” database to connect to, one that is expressly for our testing purposes, seeded with any data our tests may need. We should be able to setup and teardown our testing database, ideally by running one command each respectively, and for any given build/test run, multiple setups should result in exactly the same database with exactly the same data. This testing database should preferably also run on the same database management system (DBMS) that your real system is using, i.e. if you use SQL Server in production, use SQL Server for testing, if you use Postgres in production, use Postgres for testing. Things like in-memory databases are handy for when you _really_ can’t use the real thing, but if at all possible, prefer to use the same tech as your non-test systems. The reason for this is that there are non-trivial differences between DBMS’s that can result in false negatives or worse, false positives.

> 💡 1. Owned here meaning any databases that are tied to the domain our API serves.

This post follows on from my previous in the TWIL series, where I demonstrated how we can run a real instance of SQL Server inside a Docker container. This fulfills all of our above criteria:

-   We are running the same DBMS as we are in our production system (SQL Server), albeit in a container
-   We can seed our database with the data it needs for tests (bonus points for the seed happening during the docker build, and not the docker run)
-   We can easily setup and teardown our database instance with docker, spinning up new containers on demand and dropping them just as easily

### Test setup using WebApplicationFactory

[WebApplicationFactory](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.testing.webapplicationfactory-1) is a class provided by Microsoft in the [`Microsoft.AspNetCore.Mvc.Testing`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.testing) namespace, from .Net Core 1 onward. It is a utility class that greatly simplifies testing .Net APIs by providing a clean and easy way of spinning up a running instance of an application, as well as providing the configurability we need.

First thing we’re going to want to do is create a new class `ApiWebApplicationFactory`:

```csharp
namespace MyApplication.Tests.Api
{
    public class ApiWebApplicationFactory
    {

    }
}
```

Next, we’ll be inheriting from the `WebApplicationFactory` class mentioned above, bringing in the necessary using statements:

```csharp
using MyApplication.Api;
using Microsoft.AspNetCore.Mvc.Testing;

namespace MyApplication.Tests.Api
{
    public class ApiWebApplicationFactory : WebApplicationFactory<Startup>
    {

    }
}
```

Notice that `WebApplicationFactory` takes in a generic argument `<Startup>` . This is the Startup class that our real API uses to configure itself when it first starts. Remember how I said we want our tests to match as closely as possible to the code a real request would pass through? This is our first step to achieving that, as we’re configuring our test context with the exact same configuration code that the real API uses.

Next, we want to be able to override _some_ configuration for our tests, remember also how I mentioned above that external dependencies can either be mocked/stubbed out, or in the case of our database, have a config that differs slightly to its production equivalent.

The way we can do that is pretty simple, we’re able to override the `CreateHostBuilder` method available to us from `WebApplicationFactory` :

```csharp
using MyApplication.Api;
using Microsoft.AspNetCore.Mvc.Testing;

namespace MyApplication.Tests.Api
{
    public class ApiWebApplicationFactory : WebApplicationFactory<Startup>
    {
        protected override IHostBuilder CreateHostBuilder()
        {
            return Host.CreateDefaultBuilder()
                .ConfigureWebHostDefaults(builder =>
                {
                    builder.UseStartup<Startup>().UseTestServer();
                });
        }
    }
}
```

Because we’re now overriding `CreateHostBuilder` , we have to tell .NET how to create the test server for our tests. We’re still using essentially just the defaults here, but potentially we could change the Startup file being used to create our application, as well as injecting a test appsettings.json file, or enabling environment variables for use within tests are both possible at this point. Either way, we tell .NET to use the same startup as the API, and `UseTestServer()` instructs .NET to create a test server running our application and serve it at localhost.

Say we wanted to override configuration that enabled database connectivity, the way we would go about that is to add to our `CreateHostBuilder` method:

```csharp
using MyApplication.Api;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace MyApplication.Tests.Api
{
    public class ApiWebApplicationFactory : WebApplicationFactory<Startup>
    {
        protected override IHostBuilder CreateHostBuilder()
        {
            return Host.CreateDefaultBuilder()
                .ConfigureWebHostDefaults(builder =>
                {
                    builder.UseStartup<Startup>().UseTestServer();
                })
                .ConfigureServices((builder, serviceCollection) =>
                {
                    // apply new "appsettings" configuration
                    serviceCollection.Configure<DbConfig>(_ => _.SomeOption = "someOption");

                    // configuring some external dependency to resolve to our stubbed version for testing
                    serviceCollection.AddTransient<ISomeExternalDependency, StubbedExternalDependency>();
                });
        }
    }
}
```

> 💡 An observation: any _existing_ service configurations don’t get replaced when we run the above in `ConfigureServices`. We end up with the old and the new configuration inside the service collection. In practice, .NET seems to pick the most recently created configuration, when it finds more than one for a given service. This hasn’t proven to be a problem yet, I’ll come back and update here if it ever does.

And that’s it for setup. We’ve now got a factory class that will help us build and run our API in a test server, as well as give us utilities for hitting the test server with requests, so lets look at that now.

### Writing a test

There are a few options available to us as far as .NET testing frameworks go, like NUnit, xUnit and MSTest. Today I’m going to be using xUnit with FluentAssertions, but most of this will still be applicable to any other choice.

First lets create a new test class:

```csharp
using Xunit;

public class MyApplicationApiTests
{
    [Fact]
    public void MyFirstApiTest()
    {

    }
}
```

In order for us to use our `ApiWebApplicationFactory` in our new test class, it needs to be included as part of a _test fixture_. In xUnit, a fixture is a way of sharing setup and cleanup code between tests. Again, we have some choice in what kind of fixture we choose to implement here:

-   Constructor and dispose
    -   xUnit creates a new instance of the class for every test that gets run in the class, meaning that any code inside the constructor will be run for every test
-   Class fixture
    -   Setup runs once per test _class_, and is shared between tests in that class
-   Collection fixture
    -   Can be used for multiple classes
    -   Setup runs once for the first class it is attached to, and is shared for all subsequent classes

> 💡 For more information check out [the docs](https://xunit.net/docs/shared-context).

Because we probably don’t need or want to go through the process of creating a new factory, and thus a new application and test server for every test, we probably don’t want to go with the constructor and dispose option. That leaves us with two options, class fixture or collection fixture. We’ll go with class fixture for now, since we only have one test class, however if in future we have multiple test classes that need the same test setup, we may decide to share it with a collection fixture.

Let’s see what our class looks like when we apply the class fixture:

```csharp
using Xunit;

public class MyApplicationApiTests : IClassFixture<ApiWebApplicationFactory>
{
    private readonly ApiWebApplicationFactory _factory;

    public MyApplicationApiTests(ApiWebApplicationFactory factory)
    {
        _factory = factory ?? throw new ArgumentException(nameof(factory));
    }

    public void MyFirstApiTest()
    {

    }
}
```

Cool, we’re finally ready to start writing some test logic, so let’s do that now:

```csharp
// return type of our test method changed from void to async Task because
// our API call is asynchronous
public async Task MyFirstApiTest()
{
    // CreateClient() is a helper method on WebApplicationFactory that returns
    // an HttpClient preconfigured to run against our API running on the test server
    var client = _factory.CreateClient();

    var getResponse = await client.GetAsync("/users");

    // using Newtonsoft.Json to deserialize the response to a C# object
    var users = JsonConvert.DeserializeObject<List<User>>(await getResponse.Content.ReadAsStringAsync());

    // using FluentAssertions to assert against the deserialized object
    users.Should().BeEquivalentTo(new List<User>
    {
        new User("Bob"),
        new User("Jim")
    });
}
```

And here’s what the whole thing looks like, annotated with the arrange act assert syntax:

```csharp
using System;
using System.Text;
using System.Threading.Tasks;
using MyApplication.Api.Models;
using FluentAssertions;
using Newtonsoft.Json;
using Xunit;

public class MyApplicationApiTests : IClassFixture<ApiWebApplicationFactory>
{
    private readonly ApiWebApplicationFactory _factory;

    public MyApplicationApiTests(ApiWebApplicationFactory factory)
    {
        _factory = factory ?? throw new ArgumentException(nameof(factory));
    }

    public async Task MyFirstApiTest()
    {
        // arrange
        var client = _factory.CreateClient();

        // act
        var getResponse = await client.GetAsync("/users");
        var users = JsonConvert.DeserializeObject<List<User>>(await getResponse.Content.ReadAsStringAsync());

        // assert
        users.Should().BeEquivalentTo(new List<User>
        {
            new User("Bob"),
            new User("Jim")
        });
    }
}
```

And there you have it, a fully functional API test 🎉🎉 running against a real instance of the API, configured near identically to what would be in production, and yet, completely decoupled from any notion of _environment_. What we have here is incredibly flexible in that we can happily run these tests in, say, a build pipeline, and all we need to enable that is to have the owned database configured and available on the build agent (which is easy enough with a containerised database as in [my previous post](containerise-sql-server-database-project)).

Happy testing! 🧪
