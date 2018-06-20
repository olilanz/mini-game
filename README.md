# mini-game

Toying around with TypeScript

### Requirements

We need [Node.js](https://nodejs.org) to install and run scripts.

## Install and run

Run next commands in your terminal:

| Command | Description |
|---------|-------------|
| `npm i -g npm` | Update npm to latest version.|
| `npm install` | Install dependencies.|
| `npm run dev` | Builds game and startes server. Connect to http://localhost:8000. <br> Press `Ctrl + c` to kill **http-server** process. |
=======

## Build Docker image

| Command | Description |
|---------|-------------|
| `docker run -v $(PWD):/usr/share/nginx/html/ -p 8000:80 -it nginx` | Run container on local source tree without building the image. Connect to http://localhost:8000. |
| `docker build -t mini-game .` | Build the mini-game image.|
| `docker run -p 8000:80 -it mini-game` | Runs the container. Connect to http://localhost:8000. <br> Press `Ctrl + c` to kill **http-server** process. |
=======

## Notes

Bootstrapped from here: https://github.com/digitsensitive/phaser3-typescript