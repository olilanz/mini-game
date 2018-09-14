/**
 * Game-Play
 * 
 * This is the scene that harnesses tyhe actual gameplay. 
 */

import { BaseScene } from '../scenes/basescene';
import __imageMonster from '../assets/images/monster.png';
import __imageCookie from '../assets/images/cookie.png';
import __soundBlop from '../assets/sounds/blop.mp3';

export class GamePlay extends BaseScene {

  private readonly MONSTER_NAME: string = 'monster';
  private readonly COOKIE_NAME_PREFIX: string = 'cookie_';

  private monster!: Phaser.Physics.Matter.Sprite;
  private cookieCount: integer = 0;
  private statusText!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'GamePlay',
    });
  }

  init(config: object) {
    let navstate = this.getNavigationState();
    this.data.values.level = navstate.currentLevel;
    this.cookieCount = 0;

    this.attachDefaultHandlers();
  }

  preload(): void {
    this.load.audio('blop', __soundBlop);
    this.load.image('monster', __imageMonster);
    this.load.image('cookie', __imageCookie);
  }

  create(): void {
    this.statusText = this.add.text(16, 16, [], { fontSize: '24px', fill: '#fff' });
    this.updateText();

    let dims = this.getScreenDimension();
    this.updateWorldSize(dims.width, dims.height);

    this.monster = this.matter.add.sprite(dims.width * 0.5, dims.height * 0.5, 'monster');
    this.monster.setName(this.MONSTER_NAME);
    this.monster.setDisplaySize(dims.width * 0.1, this.monster.width * (dims.width * 0.1) / this.monster.width);
    this.monster.setBody({
      type: 'circle',
      radius: (this.monster.displayWidth / 2 - 5),
    }, {});
    this.monster.setStatic(true);
    this.monster.setInteractive();

    this.input.setTopOnly(false);
    this.input.on('pointerdown', function (this: GamePlay, pointer: Phaser.Input.Pointer, gameObjects: Phaser.GameObjects.GameObject[]) {
      this.clickHandler(pointer, gameObjects);
    }, this);

    this.createCookies(this.data.values.level);
    this.updateText();
  }

  onResize(width: number, height: number) {
    this.updateWorldSize(width, height);
  }

  updateWorldSize(width: number, height: number): void {
    this.scene.get('GamePlay')
      .matter
      .world
      .setBounds(0, -200, width, height + 200);
  }

  clickHandler(pointer: Phaser.Input.Pointer, gameObjects: Phaser.GameObjects.GameObject[]): void {
    this.sound.play('blop', { loop: false });

    let monster = gameObjects.find(monster => monster.name == this.MONSTER_NAME);
    if (monster) {
      this.conclude(false);
      return;
    }

    let cookie = gameObjects.find(cookie => cookie.name.startsWith(this.COOKIE_NAME_PREFIX)) as Phaser.GameObjects.Sprite;
    if (cookie) {
      let remaining = this.destroyCookie(cookie);
      this.updateText();
      if (remaining<= 0) {
        this.conclude(true);
      }
      return;
    }

    this.createCookie(this.COOKIE_NAME_PREFIX + Date.now() + '_' + Math.random(), pointer.x, pointer.y);
    this.updateText();
  }

  createCookies(count: integer): void {
    for (let i = 0; i < count; i++) {
      this.createCookie(this.COOKIE_NAME_PREFIX + i, i * Phaser.Math.Between(30, 60), i * Phaser.Math.Between(20, 40));
    }
  }

  createCookie(name: string, x: number, y: number): integer {
    console.log('create cookie: ' + name);
    let cookie = this.matter.add.sprite(x, y, 'cookie');
    cookie.setName(name);
    cookie.setDisplaySize(this.monster.displayWidth, this.monster.displayWidth);
    cookie.setAngularVelocity(Phaser.Math.FloatBetween(-5.0, 5.0));
    cookie.setBody({
      type: 'circle',
      radius: (cookie.displayWidth / 2.4) 
    }, {});
    cookie.setBounce(0.6);
    cookie.setFriction(0.01, 0, 0);
    cookie.setInteractive();
    this.cookieCount++;
    return this.cookieCount;
  }

  destroyCookie(cookie: Phaser.GameObjects.Sprite): integer {
    this.matter.world.remove(cookie.body, true);
    this.children.remove(cookie);
    cookie.destroy();
    this.cookieCount--;
    return this.cookieCount;
  }

  update(time: number, delta: number): void {
  }

  conclude(success: boolean): void {
    this.scene.get('Level').events.emit('conclude', success);
  }

  updateText(): void {
    let text = [
      'Level ' + this.data.values.level,
      'Cookie count: ' + this.cookieCount
    ];
    this.statusText.setText(text);
  }
}


