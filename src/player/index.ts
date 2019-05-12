import * as Shared from '../shared';

const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;

export interface Player {
  color: Shared.Color;
  gameObject: Phaser.GameObjects.Rectangle;
  physicsBody: Phaser.Physics.Arcade.Body;
}

export const createPlayer = (scene: Phaser.Scene, x: number, y: number): Player => {
  const startingColor = { r: 0, g: 0, b: 0 };
  const startingColorHex = Shared.convertFullColorToHex(startingColor);

  const playerGameObject = scene.add.rectangle(x, y, PLAYER_WIDTH, PLAYER_HEIGHT, startingColorHex)
    .setOrigin(0, 0).setInteractive();

  scene.physics.add.existing(playerGameObject, false);
  const playerPhysicsBody = playerGameObject.body as Phaser.Physics.Arcade.Body;

  return {
    color: startingColor,
    gameObject: playerGameObject,
    physicsBody: playerPhysicsBody,
  };
};
