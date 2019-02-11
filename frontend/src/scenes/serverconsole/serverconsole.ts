/**
 * Console for server interactions
 * 
 * Provides monitoring and control for the backend
 */

import { BaseScene } from '../basescene';
import { ConsoleProxy, EngineStats } from '../../communication/consoleproxy';
import { ConnectionState } from '../../communication/abstractconnection';
import __imageFullscreen from '../../assets/images/button_fullscreen.png';
import __imageWindowed from '../../assets/images/button_windowed.png';
import __soundBlop from '../../assets/sounds/blop.mp3';

export class ServerConsole extends BaseScene {

  private _server: ConsoleProxy = new ConsoleProxy("/consolehub", "anonymous");
  private _consoleText: string[] =  [];

  private readonly MAX_MESSAGES = 50;         // milliseconds
  private readonly REFRESH_INTERVAL = 1000;   // milliseconds

  private _countdown: integer = 0;            // 

  private _statsPlayerCount: number | undefined = undefined;
  private _statsAdminCount: number | undefined = undefined;
  
  constructor() {
    super({
      key: 'ServerConsole'
    });
  }

  init(config: { success: boolean }) {
    this.attachDefaultHandlers();

    this._server.onConnectionStateChanged(this.onConnectionStateChanged.bind(this));
    this._server.onSetStats(this.onReceiveStats.bind(this));
    this._server.start();
  }

  preload(): void {
    this.load.image('btnFullscreen', __imageFullscreen);
    this.load.image('btnWindowed', __imageWindowed);
    this.load.audio('blop', __soundBlop);
  }

  create(): void {
    let text = [
      'Console', 
      'Server interactions will be available here.'
    ];

    this.addButton('btnFullscreen', 'btnFullscreen', 
    function (this: ServerConsole) {
      this.setFullscreenMode(true);
    }, this);

    this.addButton('btnWindowed', 'btnWindowed', 
    function (this: ServerConsole) {
      this.setFullscreenMode(false);
    }, this);

    this.add.text(0, 0, ["..."], { fontSize: '12px', fill: '#fff', backgroundcolor: '#aaa' })
      .setName('consoleText');

    this.add.circle(0, 0, 5, 0, 9)
      .setName('connectionIndicator');

    let dims = this.getScreenDimension();
    this.updateLayout(dims.width, dims.height);

    this.updateConsoleText();
    this.setConnectionStateIndicator(this._server.getConnectionState());
  }

  updateLayout(width: number, height: number): void {
    let size = Math.min(width, height);
    let margin = size * 0.1;
    let btnsize = size * 0.08;

    let isFullscreen = this.game.scale.isFullscreen;

    (this.children.getByName('btnFullscreen') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, margin)
      .setDisplaySize(btnsize, btnsize)
      .setActive(!isFullscreen)
      .setVisible(!isFullscreen);

    (this.children.getByName('btnWindowed') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, margin)
      .setDisplaySize(btnsize, btnsize)
      .setActive(isFullscreen)
      .setVisible(isFullscreen);

    (this.children.getByName('consoleText') as Phaser.GameObjects.Text)
      .setPosition(margin, margin);

    (this.children.getByName('connectionIndicator') as Phaser.GameObjects.Arc)
      .setPosition(margin, margin / 2);
  }

  update(time: number, delta: number): void {
    if (this._server.getConnectionState() == ConnectionState.connected) {
      this._countdown -= delta;
    }
    if (this._countdown <= 0) {
      this._server.requestStats();
      this._countdown = this.REFRESH_INTERVAL;
    }
  }

  setConnectionStateIndicator(state: ConnectionState) {
    let color: number = 0;
    switch (state) {
      case ConnectionState.stopped: {
        color = 0xff0000;
        break;
      }
      case ConnectionState.connecting: {
        color = 0xffff00;        
        break;
      }
      case ConnectionState.connected: {
        color = 0x00ff00;
        break;
      }
    }

    let cirlce = this.children.getByName('connectionIndicator') as Phaser.GameObjects.Arc | null;
    if (cirlce) {
      cirlce.setFillStyle(color, 1);
    }
  }

  setFullscreenMode(on: boolean) {
    this.sound.play('blop', { loop: false });
    if (this.game.scale.isFullscreen == on) {
      return;
    }
    if (on) {
      this.game.scale.startFullscreen();
    } else {
      this.game.scale.stopFullscreen();
    }
  }

  updateConsoleText() {
    let status: string = "not connected...";
    if (this._statsPlayerCount && this._statsAdminCount) {
      status = this._statsPlayerCount + " players and " + this._statsAdminCount + " admins online";
    }

    let text = Array<string>().concat(status, "",this._consoleText);

    let textObj = (this.children.getByName('consoleText') as Phaser.GameObjects.Text);
    if (textObj) {
      textObj.setText(text);
    }
  }

  addConsoleMessage(message: string) {
    // insert new messages in front
    this._consoleText.unshift(message);

    // drop last message if too many
    if (this._consoleText.length > this.MAX_MESSAGES) {
      this._consoleText.pop();
    }

    this.updateConsoleText();
  }

  onResize(gameSize: Phaser.Structs.Size, baseSize: Phaser.Structs.Size, displaySize: Phaser.Structs.Size, resolution: number) {
    super.onResize(gameSize, baseSize, displaySize, resolution);
    this.updateLayout(displaySize.width, displaySize.height);
  }

  onShutdown(): void {
    this._server.stop();
    this.detachDefaultHandlers();
  }

  onConnectionStateChanged(newState: ConnectionState, oldState: ConnectionState) {
    this.setConnectionStateIndicator(newState);

    if (ConnectionState.connected != newState) {
      this._statsPlayerCount = undefined;
    }

    this.addConsoleMessage(
      "Connection state changed from " + ConnectionState[oldState] + " to " + ConnectionState[newState]
      );    
  }

  onReceiveStats(stats: EngineStats): void {
    this._statsPlayerCount = stats.playerCount;
    this._statsAdminCount = stats.adminCount;

    this.addConsoleMessage(
      "Stats received: " + stats.statsTimeStampUtc + "; CPU Time: " + stats.cpuTimeMs
      );
  }
}


