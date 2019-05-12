import * as Phaser from 'phaser';
import * as Shared from './shared';
import Scenes from './scenes';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Cell Two Workshop Game',

  type: Phaser.AUTO,

  width: window.innerWidth,
  height: window.innerHeight,

  scene: Scenes,

  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },

  parent: 'game',
  backgroundColor: Shared.BACKGROUND_COLOR_HEX,
};

export const game = new Phaser.Game(gameConfig);
