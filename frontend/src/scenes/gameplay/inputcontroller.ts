import Phaser from 'phaser';

import { Canvas } from './canvas';
import { Player } from '../../sprites/player';

export class InputController {
    private _canvas: Canvas | undefined;

    public attach(canvas: Canvas): void {
        if (this._canvas) {
            throw new Error("Cannot attach input controller when it is already attached");
        }
        this._canvas = canvas;

        this._canvas.input.topOnly = false;
        this._canvas.input.on('pointerdown', this.clickHandler, this);
        this._canvas.input.keyboard.on('keydown', this.keyHandler, this);
        this._canvas.input.keyboard.on('keyup', this.keyHandler, this);
    }

    public detach(): void {
        if (!this._canvas) {
            throw new Error("Cannot detach input controller when it is not attached");
        }
        this._canvas.input.keyboard.off('keyup', this.keyHandler, this, false);
        this._canvas.input.keyboard.off('keydown', this.keyHandler, this, false);
        this._canvas.input.off('pointerdown', this.clickHandler, this, false);
        this._canvas = undefined;
    }

    clickHandler(pointer: Phaser.Input.Pointer, gameObjects: Phaser.GameObjects.GameObject[]): void {
        if (!this._canvas) {
            return;
        }

        let canvas = this._canvas;

        let player = gameObjects.find(player => player.name == canvas.PLAYER_NAME) as Player;
        if (player) {
          let center = player.getCenter();
          let direction = center.subtract(new Phaser.Math.Vector2(pointer.worldX, pointer.worldY));
          if (-direction.y > Math.abs(direction.x)) {
            player.jump();
          } else if (direction.y > Math.abs(direction.x)) {
            player.stomp();
          } else if (-direction.x > Math.abs(direction.y)) {
            player.leapLeft();
          } else if (direction.x > Math.abs(direction.y)) {
            player.leapRight();
          }
          return;
        }

        let bot = gameObjects.find(bot => bot.name.startsWith(canvas.BOT_NAME_PREFIX)) as Phaser.Physics.Matter.Image;
        if (bot) {
            let center = bot.getCenter();
            let direction = center.subtract(new Phaser.Math.Vector2(pointer.worldX, pointer.worldY));
          canvas.jump(bot, direction);
          return;
        }

        let cookie = gameObjects.find(cookie => cookie.name.startsWith(canvas.COOKIE_NAME_PREFIX)) as Phaser.GameObjects.Sprite;
        if (cookie) {
          let remaining = this._canvas.destroyCookie(cookie);
          if (remaining<= 0) {
            canvas.conclude(true);
          }
          return;
        }

        canvas.createCookie(canvas.COOKIE_NAME_PREFIX + Date.now() + '_' + Math.random(), pointer.worldX, pointer.worldY);
    }

    keyHandler(event: KeyboardEvent) {
      if (event.repeat) {
        return;
      }

      let canvas = this._canvas;
      if (!canvas) {
        return;
      }

      const left = [Phaser.Input.Keyboard.KeyCodes.LEFT, Phaser.Input.Keyboard.KeyCodes.A];
      const right = [Phaser.Input.Keyboard.KeyCodes.RIGHT, Phaser.Input.Keyboard.KeyCodes.D];
      const up = [Phaser.Input.Keyboard.KeyCodes.UP, Phaser.Input.Keyboard.KeyCodes.W, Phaser.Input.Keyboard.KeyCodes.SPACE];
      const down = [Phaser.Input.Keyboard.KeyCodes.DOWN, Phaser.Input.Keyboard.KeyCodes.S];


      let player = canvas.children.getByName(canvas.PLAYER_NAME) as Player;
      if (!player) {
        return;
      }

      if (event.type == 'keydown') {
        if (up.indexOf(event.keyCode) >= 0) {
          player.jump();
        } else if (down.indexOf(event.keyCode) >= 0) {
          player.stomp();
        } else if (left.indexOf(event.keyCode) >= 0) {
          player.leapLeft();
        } else if (right.indexOf(event.keyCode) >= 0) {
          player.leapRight();
        }
      }
    }
}