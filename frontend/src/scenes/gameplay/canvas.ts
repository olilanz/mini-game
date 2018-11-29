/**
 * Game-Play
 * 
 * This is the scene that harnesses tyhe actual gameplay. 
 */

import { BaseScene } from '../basescene';

import __imageBackground from '../../assets/images/background.png';
import __imageMonster from '../../assets/images/monster.png';
import __imageCookie from '../../assets/images/cookie.png';

export class Canvas extends BaseScene {

  public readonly MONSTER_NAME: string = 'monster';
  public readonly COOKIE_NAME_PREFIX: string = 'cookie_';

  private readonly OPPONENT_PREFIX: string = "opponent_";
  private readonly OPPONENT_TEXT_POSTFIX: string = "_name";

  private readonly WORLD_HEIGHT: integer = 800; // in world coords
  private readonly WORLD_WIDTH: integer = 2000; // in world coords
  private readonly CAMERA_DEFAULT_ZOOM: number = 0.75;

  private cookieCount: integer = 0;

  constructor() {
    super({
      key: 'Canvas',
    });
  }

  public getCookieCount(): integer {
    return this.cookieCount;
  }

  init(config: object) {
    let navstate = this.getNavigationState();
    this.data.values.level = navstate.currentLevel;
    this.cookieCount = 0;

    this.attachDefaultHandlers();
  }

  preload(): void {
    this.load.image('background', __imageBackground);
    this.load.image('monster', __imageMonster);
    this.load.image('cookie', __imageCookie);
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

    // moster
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

    // attach camera to momster
    this.cameras.main
      .startFollow(monster, false, 0.1, 0.1);

    this.createCookies(this.data.values.level);
    this.onResize(dims.width, dims.height);
  }

  onResize(width: number, height: number) {
    /* todo: does not work as intended...
    let displayInWorld = this.cameras.main.getWorldPoint(width, height);
    let widthFactor = displayInWorld.x / this.WORLD_WIDTH;
    let heightFactor = displayInWorld.y / this.WORLD_HEIGHT;

    let zoom = Math.max(widthFactor, heightFactor, this.CAMERA_DEFAULT_ZOOM);

    if (this.cameras.main.zoom == zoom) {
      // Zoom factor is already set up correctly. Don't mess with it.
    } else {
      this.cameras.main.setZoom(zoom);
      this.cameras.main.useBounds = true;
    }
    */
  }

  jump(object: Phaser.Physics.Matter.Sprite) {
    object.setVelocity(Phaser.Math.Between(-9, 9), -15);
  }

  createCookies(count: integer): void {
    for (let i = 0; i < count; i++) {
      let pos = new Phaser.Math.Vector2(
        i * Phaser.Math.Between(30, 60), 
        i * Phaser.Math.Between(20, 40));
      this.createCookie(this.COOKIE_NAME_PREFIX + i, pos.x, pos.y);
    }
  }

  createCookie(name: string, x: number, y: number): integer {
    let dims = this.getScreenDimension();
    let cookiewidth = dims.width * Phaser.Math.FloatBetween(0.1, 0.15);

    console.log('create cookie: ' + name);
    let cookie = this.matter.add.sprite(x, y, 'cookie')
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
  }

  conclude(success: boolean): void {
    this.scene.get('Harness').events.emit('conclude', success);
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


