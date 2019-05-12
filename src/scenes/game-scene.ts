
const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  private player: Phaser.GameObjects.Rectangle;
  private body: Phaser.Physics.Arcade.Body;

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
    this.player = this.add.rectangle(this.getGameWidth() / 2, this.getGameHeight() - this.platformHeight * 2, 50, this.platformHeight, 0x00ff00)
      .setOrigin(0, 0).setInteractive();
    this.physics.add.existing(this.player, false);
    this.body = this.player.body as Phaser.Physics.Arcade.Body;
    this.body.setGravityY(this.gravity);
    // this.body.setMaxVelocity(this.playerVelocity, this.maxVelocityY);
    this.body.setDragX(this.drag);

    this.platforms = this.createPlatforms();
    this.physics.add.collider(this.player, this.platforms);
  }

  public update() {
    const cursorKeys = this.input.keyboard.createCursorKeys();
    if (cursorKeys.up.isDown && this.body.onFloor()) {
      this.body.setVelocityY(-this.jumpForce);
    }
    if (cursorKeys.right.isDown) {
      this.body.setVelocityX(this.playerVelocity);
    }
    if (cursorKeys.left.isDown) {
      this.body.setVelocityX(-this.playerVelocity);
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
