

import * as GameObjectAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as PointLightAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/light/PointLightAPI.js";

function createGameObject(state) {
  var match = PointLightAPI$Wonderjs.createPointLight(state);
  var light = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectPointLightComponent(gameObject, light, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          light
        ];
}

export {
  createGameObject ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
