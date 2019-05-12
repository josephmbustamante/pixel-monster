import * as Shared from '../shared';

const PLATFORM_WIDTH = 50;
const PLATFORM_HEIGHT = 50;

export interface Platform {
  color: Shared.Color;
  gameObject: Phaser.GameObjects.Rectangle;
  physicsBody: Phaser.Physics.Arcade.StaticBody;
}

export const createPlatform = (scene: Phaser.Scene, x: number, y: number) => {
  const color = { r: 128, g: 128, b: 128 };
  const colorHex = Shared.convertFullColorToHex(color);

  const platform = scene.add.rectangle(x, y, PLATFORM_WIDTH, PLATFORM_HEIGHT, colorHex)
    .setOrigin(0, 0).setInteractive();

  scene.physics.add.existing(platform, true);
  const staticPhysicsBody = platform.body as Phaser.Physics.Arcade.StaticBody;

  return {
    color,
    gameObject: platform,
    physicsBody: staticPhysicsBody,
  };
};
