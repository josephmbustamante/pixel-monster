import { createPlayer, Player } from '../player';
import { createPlatform } from '../platforms';
import * as _ from 'lodash';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  private player: Player;

  private platforms: Phaser.Physics.Arcade.StaticGroup;
  private platformHeight = 50;

  private playerVelocity = 500;
  private jumpForce = 1200;
  private gravity = 3000;
  private drag = 4000;

  constructor() {
    super(sceneConfig);
  }

  public preload() {
    // this.load.image('sample', 'assets/sample.jpg');
  }

  public create() {
    this.player = createPlayer(this, 100, 100);

    this.player.physicsBody.setGravityY(this.gravity);
    // this.body.setMaxVelocity(this.playerVelocity, this.maxVelocityY);
    this.player.physicsBody.setDragX(this.drag);

    this.platforms = this.createPlatforms();
    this.physics.add.collider(this.player.gameObject, this.platforms);
  }

  public update() {
    const cursorKeys = this.input.keyboard.createCursorKeys();

    if (cursorKeys.up.isDown && this.player.physicsBody.onFloor()) {
      this.player.physicsBody.setVelocityY(-this.jumpForce);
    }
    if (cursorKeys.right.isDown) {
      this.player.physicsBody.setVelocityX(this.playerVelocity);
    }
    if (cursorKeys.left.isDown) {
      this.player.physicsBody.setVelocityX(-this.playerVelocity);
    }
  }

  private createPlatforms() {
    const ceiling = _.times(20, (index) => createPlatform(this, 50 * index, 0));
    const floor = _.times(20, (index) => createPlatform(this, 50 * index, 950));

    const leftWall = _.times(18, (index) => createPlatform(this, 0, 50 * (index + 1) ));
    const rightWall = _.times(18, (index) => createPlatform(this, 950, 50 * (index + 1) ));

    const platforms = [...ceiling, ...floor, ...leftWall, ...rightWall];

    const group = this.physics.add.staticGroup(platforms.map((platform) => platform.gameObject));

    return group;
  }

}
