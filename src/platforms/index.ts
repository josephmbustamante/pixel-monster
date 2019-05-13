import * as Shared from '../shared';

export const createPlatform = (scene: Phaser.Scene, x: number, y: number) => {
  const platform = new Platform(scene, x, y, true, Shared.KnownColors.Green);

  return platform;
};

// The reason that a platform uses class notation and isn't more functional is because Phaser passes the underlying
// GameObject class through when a collision occurs, so making a new class that extends a GameObject ensures that we
// will have all of our custom information and functions on collisions.
export class Platform extends Phaser.GameObjects.Rectangle {
  public body: Phaser.Physics.Arcade.StaticBody;

  private color: Shared.Color;

  // Whether this tile will transfer color when it is first touched
  private hasColor: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number, hasColor: boolean, color: Shared.Color) {
    super(scene, x, y, Shared.TILE_WIDTH, Shared.TILE_HEIGHT);

    this.changeColor(color);

    this.setOrigin(0, 0);
    this.setInteractive();

    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    this.hasColor = hasColor;
  }

  public platformHasColor() {
    return this.hasColor;
  }

  public getColor() {
    return this.color;
  }

  public removeColor() {
    if (this.hasColor) {
      this.changeColor(Shared.KnownColors.Gray);

      this.hasColor = false;
    }
  }

  private changeColor = (newColor: Shared.Color) => {
    this.color = newColor;
    this.setFillStyle(Shared.convertFullColorToHex(newColor));
  }
}
