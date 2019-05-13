import * as Shared from '../shared';

export const createPlayer = (scene: Phaser.Scene, x: number, y: number): Player => {
  const playerColor = { r: 0, g: 0, b: 0 };
  const playerColorHex = Shared.convertFullColorToHex(playerColor);

  const player = new Player(scene, x, y, playerColorHex);

  return player;
};

class Player extends Phaser.GameObjects.Rectangle {
  public body: Phaser.Physics.Arcade.StaticBody;

  private color: Shared.Color;

  // An arbitrary number used to determine how drastically touching another color
  // should change the player's color
  private colorWeight = .15;

  constructor(scene: Phaser.Scene, x: number, y: number, colorHex: number) {
    super(scene, x, y, Shared.TILE_WIDTH, Shared.TILE_HEIGHT, colorHex);

    this.setOrigin(0, 0);
    this.setInteractive();

    scene.add.existing(this);
    scene.physics.add.existing(this, true);
  }

  public addColor = (newColor: Shared.Color) => {
    this.color.r = this.color.r + (newColor.r - this.color.r) * this.colorWeight;
    this.color.g = this.color.g + (newColor.g - this.color.g) * this.colorWeight;
    this.color.b = this.color.b + (newColor.b - this.color.b) * this.colorWeight;

    this.changeColor(this.color);
  }

  private changeColor = (newColor: Shared.Color) => {
    this.setFillStyle(Shared.convertFullColorToHex(newColor));
  }
}
