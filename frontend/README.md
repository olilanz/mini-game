# frontend

The tooling is built around the Node Package Manager ([mpn](https://nodejs.org)). You need to get a recent version of npm in order to get going.

Part of the [mini-game](~/README.md).


## Install and run

The following commands will get you started:

| Command         | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| `npm i -g npm`  | Update npm to required version.                                   |
| `npm install`   | Install dependencies.                                             |
| `npm start`     | Builds game and startes server. Connect to http://localhost:1234. |
| `npm run build` | Builds game.                                                      |


## Updating packages

| Command          | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| `npm outdated`   | Shows which packages have new releases that could possibly be upgraded to. |
| `npm upgrade -g` | Updates all top level packages to the latest version.                      |


## Thanks to

* Richard Davey from [Photon Storm](https://twitter.com/photonstorm) for his dedication to creating Phaser
* Nate from [EsotericSoftware](http://esotericsoftware.com/blog/building-spine) for bringing skeleton animations to all platforms.
* Yannick for his providing his sample projects on [github](https://github.com/yandeu)

# Considertations

## Supported browsers

The list of supported browsers is defined in `package.json`. The intention was to support a broad spectrum of active browsers, 
and then have the polyfiller handle the compatibility issues. Unfortunately I hit the `regeneratorRuntime is not defined` error
with IE 11. It is for that reason excluded form the list.

Reference: [Parcel, how to fix the `regeneratorRuntime is not defined` error](https://flaviocopes.com/parcel-regeneratorruntime-not-defined/)