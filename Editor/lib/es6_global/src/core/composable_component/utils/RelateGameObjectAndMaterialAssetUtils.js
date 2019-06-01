

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_obj from "../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as ConverterEngineService$WonderEditor from "../../../service/state/engine/ConverterEngineService.js";
import * as ImmutableSparseMapService$WonderEditor from "../../../service/atom/ImmutableSparseMapService.js";
import * as MaterialAssetLogicService$WonderEditor from "../../../service/stateTuple/logic/asset/MaterialAssetLogicService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../service/state/engine/LightMaterialEngineService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as RelateGameObjectAndAssetUtils$WonderEditor from "./RelateGameObjectAndAssetUtils.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../service/state/editor/asset/MaterialDataAssetEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as RelateGameObjectAndTextureAssetUtils$WonderEditor from "./RelateGameObjectAndTextureAssetUtils.js";

function _isBasicMaterialNameEqual(name1, material2, engineState) {
  return RelateGameObjectAndAssetUtils$WonderEditor.isNameEqual(name1, material2, /* tuple */[
              BasicMaterialEngineService$WonderEditor.getBasicMaterialName,
              ConverterEngineService$WonderEditor.isDefaultBasicMaterialName
            ], engineState);
}

function _isLightMaterialNameEqual(name1, material2, engineState) {
  return RelateGameObjectAndAssetUtils$WonderEditor.isNameEqual(name1, material2, /* tuple */[
              LightMaterialEngineService$WonderEditor.getLightMaterialName,
              ConverterEngineService$WonderEditor.isDefaultLightMaterialName
            ], engineState);
}

function isBasicMaterialDataEqual(param, material2, _imageUint8ArrayDataMap, engineState) {
  if (_isBasicMaterialNameEqual(param[0], material2, engineState)) {
    return Caml_obj.caml_equal(param[1], BasicMaterialEngineService$WonderEditor.getColor(material2, engineState));
  } else {
    return false;
  }
}

function isLightMaterialDataEqual(param, material2, param$1) {
  var engineState = param$1[2];
  var textureData = param[3];
  if (_isLightMaterialNameEqual(param[0], material2, engineState) && Caml_obj.caml_equal(param[1], LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(material2, engineState)) && param[2] === LightMaterialEngineService$WonderEditor.getLightMaterialShininess(material2, engineState)) {
    var match = LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(material2, engineState);
    if (textureData !== undefined) {
      if (match !== undefined) {
        return Curry._4(param$1[1], Caml_option.valFromOption(textureData), match, param$1[0], engineState);
      } else {
        return false;
      }
    } else {
      return match === undefined;
    }
  } else {
    return false;
  }
}

function isEqualDefaultBasicMaterial(gameObjectMaterial, param, engineState) {
  return MaterialAssetLogicService$WonderEditor.isDefaultBasicMaterial(gameObjectMaterial, param[1][0], engineState);
}

function isEqualDefaultLightMaterial(gameObjectMaterial, param, engineState) {
  return MaterialAssetLogicService$WonderEditor.isDefaultLightMaterial(gameObjectMaterial, param[1][0], engineState);
}

function getBasicMaterialData(material, engineState) {
  return /* tuple */[
          BasicMaterialEngineService$WonderEditor.getBasicMaterialName(material, engineState),
          BasicMaterialEngineService$WonderEditor.getColor(material, engineState)
        ];
}

function _findMaterialAsset(param, engineState, isMaterialDataEqualFunc) {
  var imageUint8ArrayDataMap = param[2];
  var material = param[1];
  var match = ImmutableSparseMapService$WonderEditor.find((function (param) {
          return Curry._4(isMaterialDataEqualFunc, param[1], material, imageUint8ArrayDataMap, engineState);
        }), param[0]);
  if (match !== undefined) {
    return Caml_option.some(match[0]);
  }
  
}

function _getRelatedMaterialData(param, param$1, param$2, engineState) {
  var unsafeGetMaterialComponentFunc = param$2[0];
  var defaultMaterialData = param$1[2];
  var replacedTargetMaterialMap = param[1];
  var gameObject = param[0];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("default material component has not been added to gameObject", "has"), (function (param) {
                        var material = Curry._2(unsafeGetMaterialComponentFunc, gameObject, engineState);
                        return material !== defaultMaterialData[0];
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var material = Curry._2(unsafeGetMaterialComponentFunc, gameObject, engineState);
  var match = ImmutableSparseMapService$WonderCommonlib.get(material, replacedTargetMaterialMap);
  var match$1;
  if (match !== undefined) {
    match$1 = /* tuple */[
      Caml_option.valFromOption(match),
      replacedTargetMaterialMap
    ];
  } else {
    var match$2 = Curry._3(param$2[1], material, defaultMaterialData, engineState);
    var targetMaterial = match$2 ? defaultMaterialData[0] : _findMaterialAsset(/* tuple */[
            param$1[1],
            material,
            param[2]
          ], engineState, param$2[2]);
    match$1 = /* tuple */[
      targetMaterial,
      ImmutableSparseMapService$WonderCommonlib.set(material, targetMaterial, replacedTargetMaterialMap)
    ];
  }
  return /* tuple */[
          material,
          match$1[0],
          Caml_option.some(param$1[0]),
          match$1[1]
        ];
}

function getRelatedMaterialDataFromGameObject(gameObject, replacedTargetMaterialMap, imageUint8ArrayDataMap, param, param$1, isLightMaterialDataEqualFunc, engineState) {
  var match = GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(gameObject, engineState);
  if (match) {
    return _getRelatedMaterialData(/* tuple */[
                gameObject,
                replacedTargetMaterialMap,
                imageUint8ArrayDataMap
              ], /* tuple */[
                /* BasicMaterial */0,
                param$1[0],
                param[0]
              ], /* tuple */[
                GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent,
                isEqualDefaultBasicMaterial,
                isBasicMaterialDataEqual
              ], engineState);
  } else {
    var match$1 = GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(gameObject, engineState);
    if (match$1) {
      return _getRelatedMaterialData(/* tuple */[
                  gameObject,
                  replacedTargetMaterialMap,
                  imageUint8ArrayDataMap
                ], /* tuple */[
                  /* LightMaterial */1,
                  param$1[1],
                  param[1]
                ], /* tuple */[
                  GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent,
                  isEqualDefaultLightMaterial,
                  isLightMaterialDataEqualFunc
                ], engineState);
    } else {
      return /* tuple */[
              undefined,
              undefined,
              undefined,
              replacedTargetMaterialMap
            ];
    }
  }
}

function doesNeedReplaceMaterial(param) {
  if (param[0] !== undefined && param[1] !== undefined) {
    return param[2] !== undefined;
  } else {
    return false;
  }
}

function replaceToMaterialAssetMaterialComponent(gameObject, param, engineState) {
  var materialType = param[2];
  var targetMaterial = param[1];
  var sourceMaterial = param[0];
  if (sourceMaterial !== undefined && targetMaterial !== undefined && materialType !== undefined) {
    var targetMaterial$1 = targetMaterial;
    var sourceMaterial$1 = sourceMaterial;
    if (materialType) {
      return GameObjectComponentEngineService$WonderEditor.addLightMaterialComponent(gameObject, targetMaterial$1, GameObjectComponentEngineService$WonderEditor.disposeLightMaterialComponent(gameObject, sourceMaterial$1, engineState));
    } else {
      return GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent(gameObject, targetMaterial$1, GameObjectComponentEngineService$WonderEditor.disposeBasicMaterialComponent(gameObject, sourceMaterial$1, engineState));
    }
  } else {
    return engineState;
  }
}

function getLightMaterialData(material, param) {
  var engineState = param[1];
  var match = LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(material, engineState);
  return /* tuple */[
          LightMaterialEngineService$WonderEditor.getLightMaterialName(material, engineState),
          LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(material, engineState),
          LightMaterialEngineService$WonderEditor.getLightMaterialShininess(material, engineState),
          match !== undefined ? RelateGameObjectAndTextureAssetUtils$WonderEditor.getTextureData(match, /* tuple */[
                  param[0],
                  engineState
                ]) : undefined
        ];
}

function getDefaultMaterialData(editorState, engineState) {
  var defaultBasicMaterialData = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultBasicMaterial(editorState);
  var defaultBasicMaterialData_001 = getBasicMaterialData(defaultBasicMaterialData, engineState);
  var defaultBasicMaterialData$1 = /* tuple */[
    defaultBasicMaterialData,
    defaultBasicMaterialData_001
  ];
  var defaultLightMaterialData = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial(editorState);
  var defaultLightMaterialData_001 = getLightMaterialData(defaultLightMaterialData, /* tuple */[
        editorState,
        engineState
      ]);
  var defaultLightMaterialData$1 = /* tuple */[
    defaultLightMaterialData,
    defaultLightMaterialData_001
  ];
  return /* tuple */[
          defaultBasicMaterialData$1,
          defaultLightMaterialData$1
        ];
}

function getBasicMaterialDataMap(basicMaterialMap, engineState) {
  return ImmutableSparseMapService$WonderCommonlib.mapValid((function (material) {
                return /* tuple */[
                        material,
                        getBasicMaterialData(material, engineState)
                      ];
              }), basicMaterialMap);
}

function getLightMaterialDataMap(lightMaterialMap, param) {
  var engineState = param[1];
  var editorState = param[0];
  return ImmutableSparseMapService$WonderCommonlib.mapValid((function (material) {
                return /* tuple */[
                        material,
                        getLightMaterialData(material, /* tuple */[
                              editorState,
                              engineState
                            ])
                      ];
              }), lightMaterialMap);
}

export {
  _isBasicMaterialNameEqual ,
  _isLightMaterialNameEqual ,
  isBasicMaterialDataEqual ,
  isLightMaterialDataEqual ,
  isEqualDefaultBasicMaterial ,
  isEqualDefaultLightMaterial ,
  getBasicMaterialData ,
  _findMaterialAsset ,
  _getRelatedMaterialData ,
  getRelatedMaterialDataFromGameObject ,
  doesNeedReplaceMaterial ,
  replaceToMaterialAssetMaterialComponent ,
  getLightMaterialData ,
  getDefaultMaterialData ,
  getBasicMaterialDataMap ,
  getLightMaterialDataMap ,
  
}
/* Log-WonderLog Not a pure module */
