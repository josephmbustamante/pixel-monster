import * as Shared from '../shared';

const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;

export interface Player {
  gameObject: Phaser.GameObjects.Rectangle;
  physicsBody: Phaser.Physics.Arcade.Body;
}

export const createPlayer = (scene: Phaser.Scene, x: number, y: number): Player => {
  const playerGameObject = scene.add.rectangle(x, y, PLAYER_WIDTH, PLAYER_HEIGHT, Shared.PLAYER_STARTING_COLOR_HEX)
    .setOrigin(0, 0).setInteractive();

  scene.physics.add.existing(playerGameObject, false);
  const playerPhysicsBody = playerGameObject.body as Phaser.Physics.Arcade.Body;

  return {
    gameObject: playerGameObject,
    physicsBody: playerPhysicsBody,
  };
};
