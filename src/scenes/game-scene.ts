import { createPlayer, Player } from '../player';

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
    this.player = createPlayer(this, this.getGameWidth() / 2, this.getGameHeight() - this.platformHeight * 2);

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
    const floor = this.add.rectangle(0, this.getGameHeight() - this.platformHeight, this.getGameWidth(), this.platformHeight, 0xff0000)
      .setOrigin(0, 0).setInteractive();
    this.physics.add.existing(floor, true);

    const ceiling = this.add.rectangle(0, 0, this.getGameWidth(), this.platformHeight, 0xff0000)
      .setOrigin(0, 0).setInteractive();
    this.physics.add.existing(ceiling, true);

    const rightWall = this.add.rectangle(this.getGameWidth() - this.platformHeight, this.platformHeight, this.platformHeight, this.getGameHeight() - this.platformHeight * 2, 0xff0000)
      .setOrigin(0, 0).setInteractive();
    this.physics.add.existing(rightWall, true);

    const leftWall = this.add.rectangle(0, this.platformHeight, this.platformHeight, this.getGameHeight() - this.platformHeight * 2, 0xff0000)
      .setOrigin(0, 0).setInteractive();
    this.physics.add.existing(leftWall, true);

    const group = this.physics.add.staticGroup([
      floor,
      ceiling,
      rightWall,
      leftWall,
    ]);

    return group;
  }

  private getGameWidth() {
    return window.innerWidth;
  }

  private getGameHeight() {
    return window.innerHeight;
  }
}
