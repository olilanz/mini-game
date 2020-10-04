# mini-game

[![Build status](https://dev.azure.com/ocl-simcorp/mini-game/_apis/build/status/mini-game%20-%20CI)](https://dev.azure.com/ocl-simcorp/mini-game/_build/latest?definitionId=2)

An evolving game that is being built with the intent of learning, and the purpose to identify the sweet-spots and limitations of web technologies in the space of multi-player, high-fps, mobile gaming.

The game mechanics consist of parallel universes, where each player lives its own universe with own physics and interactions in that universe. But the universes are connected through portals, through which players can interact to achieve shared goals. 

On touch screens, the character jumps when tapping on it. On devices with keyboards, the arrow keys can be used in addition.

At this still early stage, all players are visible in all universes. Focus is currently given to the animation system, input handling, and the frontend/backend communication. 

The running example is hosted here: https://mini-game.oliverlanz.ch

Try it out by connecting multiple devices simultaneously.


## Code and Architecture

The game runs from a single Docker container, which serves a web service endpoint. The client runs in a web browser.

* Source Code: https://github.com/olilanz/mini-game
* Public Docker image: https://hub.docker.com/r/olilanz/mini-game/


The front-end could be hosted separately. Such as for development and testing. But for the game to work, the back-end must be available to connect to.

* [front-end](./frontend/README.md): Is a TypeScript app, running the physics simulations, doing the user input, sound, animations, rendering, and communication with the back-end. Located in ./fronted folder.
* [back-end](./backend/README.md): Is a .NET Core WebApp, written in C#. It serves the front-end, and coordinates the player interactions. Located in ./backend folder.


## Building for Production

Use the Dockerfile for creating production builds: 

| Command | Description |
|---------|-------------|
| `docker build -t olilanz/mini-game .` | Build the mini-game image.|
| `docker run -p 8000:80 -it olilanz/mini-game` | Runs the container. Connect to http://localhost:8000 for testing. <br> Press `Ctrl + c` to kill the container. |
| `docker push olilanz/mini-game` | Pushes the image to DockerHub (if you have the privs to do so).|


## Development with Hot Re-Build and Re-Load

Development of front-end and back-end can be done entirely separate. For details, see the readmes in the respective folders: [frontend](./frontend/README.md), [backend](./backend/README.md).

But more commonly I find that frontend and backend are developed simultaneously, e.g. with continuous rebuild and hot module reloading. Here's what you need:

* To enable continuous re-building of the front-end, run `npm run watch-build` in `./frontend/`. This will ensure that an updated version will be installed for the backend to be served, and it will be updated every time a source file changes.
* To enable continuous re-building and serving up of the backend, run `dotnet watch run` in `./backend/src`. This will build and start up the back-end, which serves up the front-end, and rebuild every time a source file changes. 
* To see the output, connect a web browser to the backend at `http://localhost:5000`. This will bring up the full appication. Consult the browser's developer console to see logs of the frontend.


## Deployment Options

### Docker Engine

Not much fuzz. Just...

`docker run -p 8000:80 -it olilanz/mini-game`

That serves it up on port 8000.


### Local Kubernetes

For local deployment there are multiple options. The source tree conatins a few files for a Kubernetes deployment. On Linux I found it most productive to use the snap based microk8s deployment. That gets the Kuberneter cluster up and running within seconds. Follow the steps:

- Install and start cluster: 
    - `sudo snap install microk8s --classic`
- Convenience: 
    - `sudo snap alias microk8s.docker docker`
    - `sudo snap alias microk8s.kubectl kubectl`
- Add infrastructure: 
    - `sudo microk8s.enable dns dashboard`

Deply the service using the `kubernetes.yml` deployment file.

NOTE: In order to expose the deployment to the host network you can define an external IP, for example using: 

- `kubectl expose deployment/mini-game-deployment --port=80 --target-port=80 --type=NodePort --external-ip 192.168.1.10 --name mini-game-ext`
