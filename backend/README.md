# backend

The tooling is built using dotnet core. Part of the [mini-game](../README.md).


## Install and run

The following commands will get you started:

| Command | Description |
|---------|-------------|
| `dotnet restore` | Update local packages.|
| `dotnet build` | Compile and build assebblies.|
| `dotnet run` | Builds and starts the server. Connect to http://localhost:5000. |


## Structre

The backend is a .NET Core application, using Kestrel for serving up the frontend and SignalR for communiation. 