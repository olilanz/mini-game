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
| `docker pusch olilanz/mini-game .` | Pushes the image to DockerHub (if you have the privs to do so).|
