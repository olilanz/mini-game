/**
 * Game-Play
 * 
 * This is the scene that harnesses tyhe actual gameplay. 
 */

import { BaseScene } from '../basescene';

import __imageBackground from '../../assets/images/background.png';
import __imageMonster from '../../assets/images/monster.png';
import __imageCookie from '../../assets/images/cookie.png';
import __soundBlop from '../../assets/sounds/blop.mp3';

export class Canvas extends BaseScene {

  private readonly MONSTER_NAME: string = 'monster';
  private readonly COOKIE_NAME_PREFIX: string = 'cookie_';

  private readonly OPPONENT_PREFIX: string = "opponent_";
  private readonly OPPONENT_TEXT_POSTFIX: string = "_name";

  private cookieCount: integer = 0;
  private statusText!: Phaser.GameObjects.Text;

  private lastFps: integer = 0;

  constructor() {
    super({
      key: 'Canvas',
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
    this.load.image('background', __imageBackground);
    this.load.image('monster', __imageMonster);
    this.load.image('cookie', __imageCookie);
  }

  create(): void {

    this.statusText = this.add.text(16, 16, [], { fontSize: '24px', fill: '#fff' });
    this.updateText();

    this
      .matter
      .world
      .setBounds(0, -200, 800, 600 + 200);
    
    this.add.tileSprite(0, 0, 800, 600, 'background')
      .setName('background')
      .setOrigin(0, 0);

    let dims = this.getScreenDimension();
    let monsterwidth = dims.width * 0.1;
    let monsterheight = monsterwidth * 1.1;
    let monster = this.matter.add.sprite(monsterwidth, monsterheight, 'monster') as Phaser.Physics.Matter.Sprite;
    monster.setName(this.MONSTER_NAME)
      .setDisplaySize(monsterwidth, monsterheight)
      .setInteractive()
      .setBody({
        type: 'circle',
        radius: (monsterwidth / 2 - 5),
      }, {})
    monster.setFixedRotation();

    this.cameras.main
      .startFollow(monster, false, 0.1, 0.1);

    this.input.setTopOnly(false);
    this.input.on('pointerdown', function (this: Canvas, pointer: Phaser.Input.Pointer, gameObjects: Phaser.GameObjects.GameObject[]) {
      this.clickHandler(pointer, gameObjects);
    }, this);

    this.createCookies(this.data.values.level);
    this.updateText();
  }

  onResize(width: number, height: number) {
    //this.updateWorldSize(width, height);
  }

  jump(object: Phaser.Physics.Matter.Sprite) {
    object.setVelocity(Phaser.Math.Between(-3, 3), -20);
  }

  clickHandler(pointer: Phaser.Input.Pointer, gameObjects: Phaser.GameObjects.GameObject[]): void {
    this.sound.play('blop', { loop: false });

    let monster = gameObjects.find(monster => monster.name == this.MONSTER_NAME);
    if (monster) {
      this.jump(monster as Phaser.Physics.Matter.Sprite);
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
    let dims = this.getScreenDimension();
    let cookiewidth = dims.width * Phaser.Math.FloatBetween(0.1, 0.15);

    let pos = this.cameras.main.getWorldPoint(x, y)

    console.log('create cookie: ' + name);
    let cookie = this.matter.add.sprite(pos.x, pos.y, 'cookie')
    cookie.setName(name);
    cookie.setDisplaySize(cookiewidth, cookiewidth);
    cookie.setBody({
      type: 'circle',
      radius: (cookiewidth / 2.4) 
    }, {});
    cookie.setAngularVelocity(Phaser.Math.FloatBetween(-0.05, 0.05));
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
    let monster = this.children.getByName(this.MONSTER_NAME) as Phaser.Physics.Matter.Sprite;
    if (monster) {
      let pos = monster.getCenter() as Phaser.Math.Vector2;
      this.getEngine().setMonsterPosition(pos.x, pos.y);
    }

    this.updateOpponentPosition();
    this.updateFpsText(this.game.loop.actualFps);
  }

  conclude(success: boolean): void {
    this.scene.get('Harness').events.emit('conclude', success);
  }

  updateFpsText(actualFps: number) {
    let fps: integer = Math.trunc(actualFps);
    if (this.lastFps != fps) {
      this.lastFps = fps;
      this.updateText();
    }
  }

  updateText(): void {
    let text = [
      `Level ${this.data.values.level}`,
      `Cookie count: ${this.cookieCount}`,
      `FPS: ${this.lastFps}` 
    ];
    this.statusText.setText(text);
  }

  private updateOpponentPosition(): void {
    let opponents = this.getEngine().getOpponents();
    for (let id in opponents) {
      let opponent = opponents[id];

      let opponentName = this.OPPONENT_PREFIX + id;
      let opponentSprite = (this.children.getByName(opponentName) as Phaser.GameObjects.Sprite | null);      
      if (opponentSprite) {
        // opponent found, update it position
        opponentSprite.setPosition(opponent.posX, opponent.posY);
      } else {
        // opponent not found, so create it
        let dims = this.getScreenDimension();    
        let monsterwidth = dims.width * 0.1;
        let monsterheight = monsterwidth * 1.1;
    
        this.add.sprite(opponent.posX, opponent.posY, 'monster')
          .setName(opponentName)
          .setDisplaySize(monsterwidth, monsterheight)
          .setAlpha(0.4);
      }

      let opponentTextName = opponentName + this.OPPONENT_TEXT_POSTFIX;
      let opponentTextSprite = (this.children.getByName(opponentTextName) as Phaser.GameObjects.Text | null);
      if (opponentTextSprite) {
        // opponent text found, update it position
        opponentTextSprite.setPosition(opponent.posX, opponent.posY);
      } else {
        // opponent text not found, so create it
        this.add.text(8, 8, opponent.name, { fontSize: '12px', fill: '#fff' })
          .setName(opponentTextName)
          .setPosition(opponent.posX, opponent.posY);
      }
    }
    // todo: the opponents that were not in the list should be eliminated.
  }
}


