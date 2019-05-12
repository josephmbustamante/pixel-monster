
const PLATFORM_WIDTH = 50;
const PLATFORM_HEIGHT = 50;

const PLATFORM_COLOR = 0xff0000;

export interface Platform {
  gameObject: Phaser.GameObjects.Rectangle;
  physicsBody: Phaser.Physics.Arcade.StaticBody;
}

export const createPlatform = (scene: Phaser.Scene, x: number, y: number) => {
  const platform = scene.add.rectangle(x, y, PLATFORM_WIDTH, PLATFORM_HEIGHT, PLATFORM_COLOR)
    .setOrigin(0, 0).setInteractive();

  scene.physics.add.existing(platform, true);
  const staticPhysicsBody = platform.body as Phaser.Physics.Arcade.StaticBody;

  return {
    gameObject: platform,
    physicsBody: staticPhysicsBody,
  };
};
