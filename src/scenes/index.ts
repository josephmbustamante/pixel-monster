import { MainMenuScene } from './main-menu-scene';
import { GameScene } from './game-scene';

const scenes: Phaser.Scene[] = [
  new MainMenuScene(),
  new GameScene(),
];

export default scenes;
