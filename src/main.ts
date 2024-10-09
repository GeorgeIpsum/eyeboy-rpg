import * as ex from "excalibur";

import { BlankTiles, loadResources } from "./resources";

const game = new ex.Engine({
  width: 800,
  height: 600,
  canvasElementId: "game",
  pixelArt: true,
  pixelRatio: 2,
  suppressConsoleBootMessage: true,
});

game.start(loadResources()).then(() => {
  BlankTiles.addToScene(game.currentScene);
});
