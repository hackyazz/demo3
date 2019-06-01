

import * as Vector3Service$WonderEditor from "../../src/service/primitive/Vector3Service.js";
import * as TransformEngineService$WonderEditor from "../../src/service/state/engine/TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";

function getLocalEulerAngles(gameObject, engineState) {
  return Vector3Service$WonderEditor.truncate(5, TransformEngineService$WonderEditor.getLocalEulerAngles(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState));
}

function setLocalEulerAngles(gameObject, localEulerAngles, engineState) {
  return TransformEngineService$WonderEditor.setLocalEulerAngles(localEulerAngles, GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState);
}

function getEulerAngles(gameObject, engineState) {
  return Vector3Service$WonderEditor.truncate(5, TransformEngineService$WonderEditor.getEulerAngles(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState));
}

function getLocalScale(gameObject, engineState) {
  return Vector3Service$WonderEditor.truncate(5, TransformEngineService$WonderEditor.getLocalScale(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState));
}

function setLocalScale(gameObject, localScale, engineState) {
  return TransformEngineService$WonderEditor.setLocalScale(localScale, GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState);
}

function setPosition(gameObject, pos, engineState) {
  return TransformEngineService$WonderEditor.setPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), pos, engineState);
}

export {
  getLocalEulerAngles ,
  setLocalEulerAngles ,
  getEulerAngles ,
  getLocalScale ,
  setLocalScale ,
  setPosition ,
  
}
/* Vector3Service-WonderEditor Not a pure module */
