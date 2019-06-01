

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../../../../../../../utils/console/LogUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../../utils/ui/ConsoleUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as GameObjectLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/GameObjectLogicService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as PointLightEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/PointLightEngineService.js";
import * as DirectionLightEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/DirectionLightEngineService.js";
import * as OperatePointLightLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/OperatePointLightLogicService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as OperateDirectionLightLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/OperateDirectionLightLogicService.js";

function getLightOptions(param) {
  return /* array */[
          /* record */[
            /* key : DirectionLight */0,
            /* value */"direction_light"
          ],
          /* record */[
            /* key : PointLight */1,
            /* value */"point_light"
          ]
        ];
}

function isLightGameObject(gameObject, engineState) {
  if (GameObjectComponentEngineService$WonderEditor.hasDirectionLightComponent(gameObject, engineState)) {
    return true;
  } else {
    return GameObjectComponentEngineService$WonderEditor.hasPointLightComponent(gameObject, engineState);
  }
}

function getLightTypeByGameObject(gameObject, engineState) {
  var match = GameObjectComponentEngineService$WonderEditor.hasDirectionLightComponent(gameObject, engineState);
  var match$1 = GameObjectComponentEngineService$WonderEditor.hasPointLightComponent(gameObject, engineState);
  var exit = 0;
  if (match) {
    if (match$1) {
      exit = 1;
    } else {
      return /* DirectionLight */0;
    }
  } else if (match$1) {
    return /* PointLight */1;
  } else {
    exit = 1;
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("gameObject:" + (String(gameObject) + " should has light component"), "", "", ""));
  }
  
}

function handleSpecificFuncByLightType(lightType, param) {
  var currentSceneTreeNode = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  if (lightType) {
    return Curry._1(param[1], currentSceneTreeNode);
  } else {
    return Curry._1(param[0], currentSceneTreeNode);
  }
}

function getDirectionLightExceedMaxCountMessage(param) {
  return "the direction light count is exceed max count!";
}

function getPointLightExceedMaxCountMessage(param) {
  return "the point light count is exceed max count!";
}

function isLightExceedMaxCountByType(targetLightType, engineState) {
  if (targetLightType) {
    return /* tuple */[
            "the point light count is exceed max count!",
            PointLightEngineService$WonderEditor.isMaxCount(engineState)
          ];
  } else {
    return /* tuple */[
            "the direction light count is exceed max count!",
            DirectionLightEngineService$WonderEditor.isMaxCount(engineState)
          ];
  }
}

function isLightExceedMaxCountByCount(param, engineState) {
  var match = DirectionLightEngineService$WonderEditor.isMaxCountByCount(param[0], engineState);
  if (match) {
    return /* tuple */[
            "the direction light count is exceed max count!",
            true
          ];
  } else {
    var match$1 = PointLightEngineService$WonderEditor.isMaxCountByCount(param[1], engineState);
    if (match$1) {
      return /* tuple */[
              "the point light count is exceed max count!",
              true
            ];
    } else {
      return /* tuple */[
              "",
              false
            ];
    }
  }
}

function getLightCount(gameObject, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, gameObject) {
                var pointLightCount = param[1];
                var directionLightCount = param[0];
                var match = GameObjectComponentEngineService$WonderEditor.hasDirectionLightComponent(gameObject, engineState);
                var match$1 = GameObjectComponentEngineService$WonderEditor.hasPointLightComponent(gameObject, engineState);
                return /* tuple */[
                        match ? directionLightCount + 1 | 0 : directionLightCount,
                        match$1 ? pointLightCount + 1 | 0 : pointLightCount
                      ];
              }), /* tuple */[
              0,
              0
            ], HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState));
}

function _getOperateSourceLightFunc(lightType, gameObject, engineState) {
  if (lightType) {
    return /* tuple */[
            GameObjectComponentEngineService$WonderEditor.unsafeGetPointLightComponent(gameObject, engineState),
            OperatePointLightLogicService$WonderEditor.disposePointLight
          ];
  } else {
    return /* tuple */[
            GameObjectComponentEngineService$WonderEditor.unsafeGetDirectionLightComponent(gameObject, engineState),
            OperateDirectionLightLogicService$WonderEditor.disposeDirectionLight
          ];
  }
}

function _getOperateTargetLightFunc(lightType, engineState) {
  if (lightType) {
    return /* tuple */[
            OperatePointLightLogicService$WonderEditor.createPointLight(engineState),
            OperatePointLightLogicService$WonderEditor.addPointLight
          ];
  } else {
    return /* tuple */[
            OperateDirectionLightLogicService$WonderEditor.createDirectionLight(engineState),
            OperateDirectionLightLogicService$WonderEditor.addDirectionLight
          ];
  }
}

function replaceLightByType(sourceLightType, targetLightType) {
  var gameObject = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = isLightExceedMaxCountByType(targetLightType, engineState);
  if (match[1]) {
    return ConsoleUtils$WonderEditor.warn(match[0], editorState);
  } else {
    var match$1 = _getOperateSourceLightFunc(sourceLightType, gameObject, engineState);
    var match$2 = _getOperateTargetLightFunc(targetLightType, engineState);
    var match$3 = match$2[0];
    var engineState$1 = GameObjectEngineService$WonderEditor.initGameObject(gameObject, Curry._3(match$2[1], gameObject, match$3[1], Curry._3(match$1[1], gameObject, match$1[0], match$3[0])));
    StateLogicService$WonderEditor.refreshEngineState(engineState$1);
    return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc(SceneEngineService$WonderEditor.clearShaderCacheAndReInitAllLightMaterials);
  }
}

function disposeLightByLightType(lightType, currentSceneTreeNode, param) {
  var engineState = param[1];
  var editorState = param[0];
  if (lightType) {
    return GameObjectLogicService$WonderEditor.disposePointLight(currentSceneTreeNode, GameObjectComponentEngineService$WonderEditor.unsafeGetPointLightComponent(currentSceneTreeNode, engineState), /* tuple */[
                editorState,
                engineState
              ]);
  } else {
    return GameObjectLogicService$WonderEditor.disposeDirectionLight(currentSceneTreeNode, GameObjectComponentEngineService$WonderEditor.unsafeGetDirectionLightComponent(currentSceneTreeNode, engineState), /* tuple */[
                editorState,
                engineState
              ]);
  }
}

export {
  getLightOptions ,
  isLightGameObject ,
  getLightTypeByGameObject ,
  handleSpecificFuncByLightType ,
  getDirectionLightExceedMaxCountMessage ,
  getPointLightExceedMaxCountMessage ,
  isLightExceedMaxCountByType ,
  isLightExceedMaxCountByCount ,
  getLightCount ,
  _getOperateSourceLightFunc ,
  _getOperateTargetLightFunc ,
  replaceLightByType ,
  disposeLightByLightType ,
  
}
/* Log-WonderLog Not a pure module */
