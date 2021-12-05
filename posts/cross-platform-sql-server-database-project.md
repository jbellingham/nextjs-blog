---
title: "TWIL: Cross-platform SQL Server Database Project"
date: "2021-12-05"
---

## This Week I Learned

**It’s possible to build a SQL Server Database project down to a dacpac on Mac or Linux**.

### What is a SQL Server Database project?

A database project is similar to the plain old C# based projects you're probably already familiar with. Where the database project differs is that it allows you to develop, build, and publish a database from a source controlled project, using SQL scripts. Before Entity Framework and code-first arrived, it was (seemingly) the preferred approach to database administration, and it _still is_ the preferred approach among those more comfortable with SQL than C# code.

A database project describes the desired state of your database schema. The output of a database project build is a .dacpac file, that can be used with various tooling to deploy or migrate a database instance.

Historically, building these SQL Server Database projects was only possible on Windows, due to the .sqlproj project type being based on an older version of .NET Framework.

Well it turns out now you can build these projects without Windows, it just takes a little finessing. Here are two options I've found:

### Option 1: Add a separate, cross-platform build project

Firstly, if you are doing this on a non-Windows system, you will need to download the [Mono sdk](https://www.mono-project.com/) in order to create .NET Framework projects.

Assuming you already have an existing database project, let’s create a new ".NET Standard Class Library" project called `Database.Build`. Delete `Class1.cs`, we won’t be using it.

Open up `Database.Build.csproj` for editing and you should see something like this:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
  </PropertyGroup>

</Project>
```

Edit the line `<Project Sdk="Microsoft.NET.Sdk">` to instead read `<Project Sdk="MSBuild.Sdk.SqlProj/1.15.0">`

Next, we can add any links to sql scripts in our existing database that we want to include in our new dacpac build:

```xml
<ItemGroup>
  <Content Include="..\Database\dbo\**\*.sql" />
</ItemGroup>
```

The content path assumes an existing co-located database project called `Database`.

If you run a build for `Database.Build` you should see output similar to

```
1>ResolveDatabaseReferences:
         Resolved dacpac file from package NETStandard.Library to /users/jessebellingham/.nuget/packages/netstandard.library/2.0.3/tools/NETStandard.Library.dacpac
         Resolved database package references:
       ValidateEnvironment:
         Using target framework netcoreapp3.1 to run DacpacTool
       CoreGenerateAssemblyInfo:
       Skipping target "CoreGenerateAssemblyInfo" because all output files are up-to-date with respect to the input files.
       CoreCompile:
         dotnet "/Users/jessebellingham/.nuget/packages/msbuild.sdk.sqlproj/1.15.0/Sdk/../tools/netcoreapp3.1/DacpacTool.dll" build -o "obj/Debug/netstandard2.0/Database.Build.dacpac" -n "Database.Build" -v "1.0.0" -sv Sql150 -i "obj/Debug/netstandard2.0/Database.Build.InputFiles.txt"
         Using package name Database.Build and version 1.0.0
         Using SQL Server version Sql150
         Adding /Users/jessebellingham/dev/CrossPlatformDbBuild/Database/dbo/Table1.sql to the model

Writing model to /Users/jessebellingham/dev/CrossPlatformDbBuild/Database.Build/obj/Debug/netstandard2.0/Database.Build.dacpac
       CopyFilesToOutputDirectory:
         Copying file from "/Users/jessebellingham/dev/CrossPlatformDbBuild/Database.Build/obj/Debug/netstandard2.0/Database.Build.dacpac" to "/Users/jessebellingham/dev/CrossPlatformDbBuild/Database.Build/bin/Debug/netstandard2.0/Database.Build.dacpac".
         Database.Build -> /Users/jessebellingham/dev/CrossPlatformDbBuild/Database.Build/bin/Debug/netstandard2.0/Database.Build.dacpac
     1>Done Building Project "/Users/jessebellingham/dev/CrossPlatformDbBuild/Database.Build/Database.Build.csproj" (build target(s)).
```

And with that, we now have successfully built a .dacpac without needing Windows 🎉

**Note**

If you need to target a different version of SQL Server than the default `Sql150`, you can add this line `<SqlServerVersion>SqlAzure</SqlServerVersion>` to the `<PropertyGroup` section.

Similarly, if you want to use SqlCmd variables, these can just be copied across from your existing .sqlproj file, e.g.:

```xml
<ItemGroup>
  <SqlCmdVariable Include="SomeVariable" />
</ItemGroup>
```

Finally, there is support for running pre and post-deployment scripts in a dacpac deploy build this way, although there are [limitations described here](https://github.com/rr-wfm/MSBuild.Sdk.SqlProj#pre--and-post-deployment-scripts).

```xml
<ItemGroup>
  <PostDeploy Include="..\Database\Post-Deployment\Script.PostDeployment.sql" />
</ItemGroup>
```

### Option 2: Use .NET Framework reference assemblies

This option is a bit simpler, and involves adding a package reference directly to your .sqlproj file as can be seen [here](https://github.com/Microsoft/dotnet/tree/master/releases/reference-assemblies). Note: this approach also works for regular .csproj projects.

We'll need to add the following to your `<PropertyGroup>` element:

`<TargetFramework>net472</TargetFramework>`

We'll also need to add a new `ItemGroup`:

```xml
  <ItemGroup>
    <PackageReference Include="Microsoft.NETFramework.ReferenceAssemblies" Version="1.0.2" PrivateAssets="All" />
  </ItemGroup>
```

With the whole thing looking something like this for a database project:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Database</OutputType>
    <TargetFramework>net452</TargetFramework>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.NETFramework.ReferenceAssemblies" Version="1.0.2" PrivateAssets="All" />
  </ItemGroup>

</Project>
```

With that done, we need to do a `dotnet restore` to populate the added reference assemblies, at which point, we should be able to do a `dotnet build` noting a similar build output to the one shown above.

**Common issues**

An issue I ran into with this second approach was this `[Asset file is missing target](https://docs.microsoft.com/en-us/dotnet/core/tools/sdk-errors/netsdk1005)` error. As the docs suggest, I was able to resolve it by ensuring that I had the `TargetFrameworks` property, and deleting the `obj` folder. After doing this, the build should now be working.
