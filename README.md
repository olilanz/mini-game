# mini-game

Toying around with TypeScript and Phaser 3.

Hosted on: https://mini-game.oliverlanz.ch


## frontend

Built as a pure TypeScript app, supporting flexible hosting options.

Located in ./fronted folder. See [frontend](./frontend/README.md).


## backend

Built as .NET Core WebApp, which can selve the fontent, and respond to API calls. 

Located in ./backend folder. See [backend](./backend/README.md).


## production build

The production build is best created using the Dockerfile. It builds the software, and creates a Docker image as a result. 

| Command | Description |
|---------|-------------|
| `docker build -t olilanz/mini-game .` | Build the mini-game image.|
| `docker run -p 8000:80 -it olilanz/mini-game` | Runs the container. Connect to http://localhost:8000. <br> Press `Ctrl + c` to kill the container. |
| `docker push olilanz/mini-game` | Pushes the image to DockerHub (if you have the privs to do so).|


## development flow

Development of frontend and backend can be done entirely separate. For details, see the readmeas in the respective folders: [frontend](./frontend/README.md), [backend](./backend/README.md).

But more commonly I find that frontend and backend are developed simultaneously, e.g. with continuous rebuild and hot reloading. Here's what you need:

* To enable continuous re-building of the front-end, run `npm run watch-build` in `./frontend/`. This will ensure that an updated version will be installed for the backend to be served, and it will be updated every time a source file changes.
* To enable continuous re-building and serving up of the backend, run `dotnet watch run` in `./backend/src`. This will serve up the backend with included frontend, and rebuild every time a sorce file changes. 
* To see the output, connect a web browser to the backend at `http://localhost:5000`. This will bring up the full appication. Consult the browser's developer console to see logs of the frontend.

