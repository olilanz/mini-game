/**
 * Game-Play
 * 
 * This is the scene that harnesses tyhe actual gameplay. 
 */

import { BaseScene } from '../basescene';

import { InputController } from './inputcontroller';

import __imageBackground from '../../assets/images/background.png';
import __imageMonster from '../../assets/images/monster.png';
import __imageCookie from '../../assets/images/cookie.png';

import __spineBoyAtlas from '../../assets/spine/spineboy/spineboy.atlas'

export interface ICanvasStats {
  opponentCount: integer;
  cookieCount: integer;
  cameraZoom: number;
}

export class Canvas extends BaseScene {

  private readonly WORLD_HEIGHT: integer = 1500; // in world coords [cm])
  private readonly WORLD_WIDTH: integer = 4000; // in world coords [cm]
  private readonly CAMERA_DEFAULT_ZOOM: number = 0.75;

  public readonly MONSTER_NAME: string = 'monster';
  public readonly MONSTER_SIZE: integer = 120; // [cm]
  
  public readonly COOKIE_NAME_PREFIX: string = 'cookie_';
  public readonly COOKIE_SIZE: integer = 100; // [cm]

  private readonly OPPONENT_PREFIX: string = "opponent_";
  private readonly OPPONENT_TEXT_POSTFIX: string = "_name";

  private _stats: ICanvasStats;

  private _inputController: InputController = new InputController;

  constructor() {
    super({
      key: 'Canvas',
    });
    this._stats = {
      opponentCount: 0,
      cookieCount: 0,
      cameraZoom: 0
    };
  }

  init(config: object) {
    let navstate = this.getNavigationState();
    this.data.values.level = navstate.currentLevel;

    this.attachDefaultHandlers();
    this._inputController.attach(this);
  }

  preload(): void {
    this.load.image('background', __imageBackground);
    this.load.image('monster', __imageMonster);
    this.load.image('cookie', __imageCookie);

    this.load.setPath('assets/spine/spineboy')

    // @ts-ignore
    this.load.spine('boy', 'spineboy.json', 'spineboy.atlas');
  }

  create(): void {
    // world
    this
      .matter
      .world
      .setBounds(0, 0, this.WORLD_WIDTH, this.WORLD_HEIGHT);
    
    this.add.tileSprite(0, 0, this.WORLD_WIDTH, this.WORLD_HEIGHT, 'background')
      .setName('background')
      .setOrigin(0, 0);

    this.cameras.main
      .setZoom(this.CAMERA_DEFAULT_ZOOM)
      .setBounds(0, 0, this.WORLD_WIDTH, this.WORLD_HEIGHT);
    this._stats.cameraZoom = this.cameras.main.zoom;

    // monster
    let monsterwidth = this.MONSTER_SIZE;
    let monsterheight = monsterwidth * 1.1;
    let monster = this.matter.add.sprite(0, 0, 'monster') as Phaser.Physics.Matter.Sprite;
    monster.setName(this.MONSTER_NAME)
      .setPosition(2 * monsterwidth, this.WORLD_HEIGHT - (2 * monsterheight))
      .setDisplaySize(monsterwidth, monsterheight)
      .setInteractive()
      .setTrapezoid(monsterwidth, monsterheight, 0.5, {});
    monster.setFixedRotation();

    this.createSpineBoy();

    this.cameras.main
      .startFollow(monster, false, 0.1, 0.1);

    this.createCookies(this.data.values.level);

    this.onResize(this.scale.gameSize,
      this.scale.baseSize, 
      this.scale.displaySize, 
      this.scale.resolution);
  }

  onShutdown() {
    this._inputController.detach();
    this.detachDefaultHandlers();
  }

  jump(object: Phaser.Physics.Matter.Sprite, direction: Phaser.Math.Vector2) {
    object.setVelocity(direction.x, direction.y);
  }

  public getCanvasStats(): ICanvasStats {
    return this._stats;
  }

  createCookies(count: integer): void {
    for (let i = 0; i < count; i++) {
      this.createCookie(
        this.COOKIE_NAME_PREFIX + i, 
        i * Phaser.Math.Between(30, 60),
        i * Phaser.Math.Between(20, 40));
    }
  }

  createSpineBoy() {
    let offset = 100;

    // @ts-ignore
    let spine = this.add.spine(0, 0, 'boy', 'idle', true) as SpineGameObject;  
    spine.setName("spine")
      .setPosition(offset, this.WORLD_HEIGHT - offset);

    let bodyConfig = { 
      shape: { 
        type: 'trapezoid',
        width: this.MONSTER_SIZE,
        height: this.MONSTER_SIZE * 1.5,
        slope: 0.3
      } 
    };

    let body = this.matter.add.gameObject(spine, bodyConfig);
  }

  createCookie(name: string, x: number, y: number): integer {
    let cookiewidth = this.COOKIE_SIZE * Phaser.Math.FloatBetween(0.9, 1.25);

    console.log('create cookie: ' + name);
    console.log('cookiewidth: ' + cookiewidth);
    let cookie = this.matter.add.sprite(0, 0, 'cookie')
    cookie.setName(name)
      .setPosition(x, y)
      .setDisplaySize(cookiewidth, cookiewidth)
      .setCircle((cookiewidth / 2) * 0.85 /* adjust because graphic has a small margin */, {})
    cookie.setAngularVelocity(Phaser.Math.FloatBetween(-0.05, 0.05));
    cookie.setBounce(0.6);
    cookie.setFriction(0.01, 0, 0);
    cookie.setInteractive();
    this._stats.cookieCount++;
    return this._stats.cookieCount;
  }

  public pause() {
    this.scene.pause();
    this.cameras.main.alpha = 0.2;
  }

  public resume() {
    this.scene.resume();
    this.cameras.main.alpha = 1.0;
  }

  destroyCookie(cookie: Phaser.GameObjects.Sprite): integer {
    this.matter.world.remove(cookie.body, true);
    this.children.remove(cookie);
    cookie.destroy();
    this._stats.cookieCount--;
    return this._stats.cookieCount;
  }

  update(time: number, delta: number): void {
    let monster = this.children.getByName(this.MONSTER_NAME) as Phaser.Physics.Matter.Sprite;
    if (monster) {
      let pos = monster.getCenter() as Phaser.Math.Vector2;
      this.getEngine().setMonsterPosition(pos.x, pos.y);
    }

    this.updateOpponentPosition();
  }

  conclude(success: boolean): void {
    this.scene.get('Harness').events.emit('conclude', success);
  }

  private updateOpponentPosition(): void {
    let opponents = this.getEngine().getOpponents();

    let opponentCount = 0;
    for (let id in opponents) {
      opponentCount++;
      let opponent = opponents[id];

      let opponentName = this.OPPONENT_PREFIX + id;
      let opponentSprite = (this.children.getByName(opponentName) as Phaser.GameObjects.Sprite | null);      
      if (opponentSprite) {
        // opponent found, update it position
        opponentSprite.setPosition(opponent.posX, opponent.posY);
      } else {
        // opponent not found, so create it
        let monsterwidth = this.MONSTER_SIZE;
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

    this._stats.opponentCount = opponentCount;

    // todo: the opponents that were not in the list should be eliminated.
  }
}


