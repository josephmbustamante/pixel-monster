import * as Shared from '../shared';

export const createPlatform = (scene: Phaser.Scene, x: number, y: number) => {
  const color = { r: 128, g: 128, b: 128 };
  const colorHex = Shared.convertFullColorToHex(color);

  const platform = new Platform(scene, x, y, colorHex);
  return platform;
};

// The reason that a platform uses class notation and isn't more functional is because Phaser passes the underlying
// GameObject class through when a collision occurs, so making a new class that extends a GameObject ensures that we
// will have all of our custom information and functions on collisions.
class Platform extends Phaser.GameObjects.Rectangle {
  public body: Phaser.Physics.Arcade.StaticBody;

  private hasColor: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number, colorHex: number) {
    super(scene, x, y, Shared.TILE_WIDTH, Shared.TILE_HEIGHT, colorHex);

    this.setOrigin(0, 0);
    this.setInteractive();

    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    this.hasColor = true;
  }
}
