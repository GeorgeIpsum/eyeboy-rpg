import { TiledResource } from "@excaliburjs/plugin-tiled";
import { ImageFiltering, ImageSource, Loader } from "excalibur";

import tmxPath from "../static/blank.tmx?url";
import boyPath from "../static/boy.png?url";
import { Boy } from "./boy";

export const BoySheet = new ImageSource(boyPath, false, ImageFiltering.Pixel);
export const BlankTiles = new TiledResource(tmxPath, {
  entityClassNameFactories: {
    boy: (props) => {
      const boy = new Boy(props.worldPos);
      boy.z = 100;
      return boy;
    },
  },
  pathMap: [{ path: "blank.tmx", output: tmxPath }],
});

export const loadResources = () => {
  const loader = new Loader();
  loader.addResource(BoySheet);
  loader.addResource(BlankTiles);
  return loader;
};
