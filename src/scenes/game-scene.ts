import { createPlayer, Player } from '../player';
import { createPlatform, Platform } from '../platforms';
import * as _ from 'lodash';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  private player: Player;

  private platforms: Phaser.Physics.Arcade.StaticGroup;

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

    this.player.body.setGravityY(this.gravity);
    this.player.body.setDragX(this.drag);

    this.platforms = this.createPlatforms();
    this.physics.add.collider(this.player, this.platforms, (player: Player, platform: Platform) => {
      if (platform.platformHasColor()) {
        const platformColor = platform.getColor();
        player.addColor(platformColor);
        platform.removeColor();
      }
    });
  }

  public update() {
    const cursorKeys = this.input.keyboard.createCursorKeys();

    if (cursorKeys.up.isDown && this.player.body.onFloor()) {
      this.player.body.setVelocityY(-this.jumpForce);
    }
    if (cursorKeys.right.isDown && !this.player.body.onWall()) {
      this.player.body.setVelocityX(this.playerVelocity);
    }
    if (cursorKeys.left.isDown && !this.player.body.onWall()) {
      this.player.body.setVelocityX(-this.playerVelocity);
    }
  }

  private createPlatforms() {
    const ceiling = _.times(40, (index) => createPlatform(this, 50 * index, 0));
    const floor = _.times(40, (index) => createPlatform(this, 50 * index, 950));

    const leftWall = _.times(18, (index) => createPlatform(this, 0, 50 * (index + 1) ));
    const rightWall = _.times(18, (index) => createPlatform(this, 1950, 50 * (index + 1) ));

    const platform1 = _.times(8, (index) => createPlatform(this, 350 + 50 * index, 200));
    const platform2 = _.times(12, (index) => createPlatform(this, 750 + 50 * index, 400));
    const platform3 = _.times(8, (index) => createPlatform(this, 300 + 50 * index, 600));
    const platform4 = _.times(6, (index) => createPlatform(this, 500 + 50 * index, 800));

    const platforms = [...ceiling, ...floor, ...leftWall, ...rightWall, ...platform1, ...platform2, ...platform3, ...platform4];

    const group = this.physics.add.staticGroup(platforms.map((platform) => platform));

    return group;
  }
}
