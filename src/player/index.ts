import * as Shared from '../shared';

export const createPlayer = (scene: Phaser.Scene, x: number, y: number): Player => {
  const player = new Player(scene, x, y, Shared.KnownColors.Black);

  return player;
};

// TODO: could we not export this somehow?
export class Player extends Phaser.GameObjects.Rectangle {
  public body: Phaser.Physics.Arcade.Body;

  private color: Shared.Color;

  // An arbitrary number used to determine how drastically touching another color
  // should change the player's color
  private colorWeight = .15;

  constructor(scene: Phaser.Scene, x: number, y: number, color: Shared.Color) {
    super(scene, x, y, Shared.TILE_WIDTH, Shared.TILE_HEIGHT);

    this.changeColor(color);

    this.setOrigin(0, 0);
    this.setInteractive();

    scene.add.existing(this);
    scene.physics.add.existing(this, false);
  }

  public addColor = (colorToAdd: Shared.Color) => {
    const currentColor = this.color;

    const newColor = {
      r: currentColor.r + (colorToAdd.r - currentColor.r) * this.colorWeight,
      g: currentColor.g + (colorToAdd.g - currentColor.g) * this.colorWeight,
      b: currentColor.b + (colorToAdd.b - currentColor.b) * this.colorWeight,
    };

    this.changeColor(newColor);
  }

  private changeColor = (newColor: Shared.Color) => {
    this.color = newColor;
    const colorHex = Shared.convertFullColorToHex(newColor);
    this.setFillStyle(colorHex);
  }
}
