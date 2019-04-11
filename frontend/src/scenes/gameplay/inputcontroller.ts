
import { Canvas } from './canvas';

export class InputController {
    private _canvas: Canvas | undefined;

    public attach(canvas: Canvas): void {
        if (this._canvas) {
            throw "Cannot attach input controller when it is already attached";
        }
        this._canvas = canvas;

        this._canvas.input.topOnly = false;
        this._canvas.input.on('pointerdown', this.clickHandler, this);
        this._canvas.input.keyboard.on('keydown', this.keyHandler, this);
        this._canvas.input.keyboard.on('keyup', this.keyHandler, this);
    }

    public detach(): void {
        if (!this._canvas) {
            throw "Cannot detach input controller when it is not attached";
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

        let player = gameObjects.find(player => player.name == canvas.PLAYER_NAME) as Phaser.Physics.Matter.Image;
        if (player) {
            let center = player.getCenter();
            let direction = center.subtract(new Phaser.Math.Vector2(pointer.worldX, pointer.worldY));
          canvas.jump(player, direction);
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

        let pos = canvas.cameras.main.getWorldPoint(pointer.x, pointer.y);
        canvas.createCookie(canvas.COOKIE_NAME_PREFIX + Date.now() + '_' + Math.random(), pos.x, pos.y);
    }

    keyHandler(event: KeyboardEvent) {
      if (event.repeat) {
        return;
      }

      let canvas = this._canvas;
      if (!canvas) {
        return;
      }

      if (event.type == 'keydown') {
        let direction = new Phaser.Math.Vector2(0, 0);
        if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.UP) {
          direction.y = -30;
        } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.DOWN) {
          direction.y = 40;
        } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.LEFT) {
          direction.x = -20;
        } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.RIGHT) {
          direction.x = 20;
        }

        let player = canvas.children.getByName(canvas.PLAYER_NAME) as Phaser.Physics.Matter.Image;
        if (player) {
          canvas.jump(player, direction);
          console.log("jump");
          return;
        }
      }
    }
}