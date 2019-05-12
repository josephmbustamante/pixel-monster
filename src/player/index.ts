import * as Shared from '../shared';

const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;

// An arbitrary number used to determine how drastically touching another color
// should change the player's color
const COLOR_WEIGHT = .15;

export interface Player {
  color: Shared.Color;
  addColor: (newColor: Shared.Color) => void;
  gameObject: Phaser.GameObjects.Rectangle;
  physicsBody: Phaser.Physics.Arcade.Body;
}

export const createPlayer = (scene: Phaser.Scene, x: number, y: number): Player => {
  const playerColor = { r: 0, g: 0, b: 0 };
  const playerColorHex = Shared.convertFullColorToHex(playerColor);

  const playerGameObject = scene.add.rectangle(x, y, PLAYER_WIDTH, PLAYER_HEIGHT, playerColorHex)
    .setOrigin(0, 0).setInteractive();

  scene.physics.add.existing(playerGameObject, false);
  const playerPhysicsBody = playerGameObject.body as Phaser.Physics.Arcade.Body;

  const addColor = (newColor: Shared.Color) => {
    playerColor.r = playerColor.r + (newColor.r - playerColor.r) * COLOR_WEIGHT;
    playerColor.g = playerColor.g + (newColor.g - playerColor.g) * COLOR_WEIGHT;
    playerColor.b = playerColor.b + (newColor.b - playerColor.b) * COLOR_WEIGHT;

    playerGameObject.setFillStyle(Shared.convertFullColorToHex(playerColor));
  };

  return {
    color: playerColor,
    addColor,
    gameObject: playerGameObject,
    physicsBody: playerPhysicsBody,
  };
};
