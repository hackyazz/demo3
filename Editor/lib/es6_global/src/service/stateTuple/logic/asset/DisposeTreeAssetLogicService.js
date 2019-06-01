

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as NodeAssetService$WonderEditor from "../../../record/editor/asset/NodeAssetService.js";
import * as GeometryEngineService$WonderEditor from "../../../state/engine/GeometryEngineService.js";
import * as InspectorEditorService$WonderEditor from "../../../state/editor/inspector/InspectorEditorService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../state/editor/asset/TreeAssetEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../state/engine/gameObject/GameObjectEngineService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../record/editor/asset/IterateTreeAssetService.js";
import * as GeometryAssetLogicService$WonderEditor from "./GeometryAssetLogicService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../../core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js";
import * as LightMaterialEngineService$WonderEditor from "../../../state/engine/LightMaterialEngineService.js";
import * as OperateTextureLogicService$WonderEditor from "../OperateTextureLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../state/editor/asset/OperateTreeAssetEditorService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../state/editor/asset/TextureNodeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../state/editor/asset/ImageDataMapAssetEditorService.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../state/editor/asset/MaterialDataAssetEditorService.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../state/editor/asset/CurrentNodeIdAssetEditorService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor from "../../../state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js";

function _disposeClonedGameObjectsComponentType(clonedGameObjects, editorState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (editorState, wdbGameObject) {
                return InspectorEditorService$WonderEditor.removeComponentTypeToMap(wdbGameObject, /* Geometry */2, editorState);
              }), editorState, clonedGameObjects);
}

function _getClonedGameObjects(wdbGameObjects, param) {
  var engineState = param[1];
  return ArrayService$WonderEditor.exclude(wdbGameObjects, ArrayService$WonderCommonlib.flatten(GeometryAssetLogicService$WonderEditor.getGeometryAssetsFromWDBGameObjects(wdbGameObjects, /* tuple */[
                        param[0],
                        engineState
                      ]).map((function (geometry) {
                        return GeometryEngineService$WonderEditor.unsafeGetGeometryGameObjects(geometry, engineState);
                      }))));
}

function _disposeTextureNodeEditorData(param, editorState) {
  var imageDataIndex = param[/* imageDataIndex */1];
  var match = TextureNodeAssetEditorService$WonderEditor.doesAnyTextureUseImage(imageDataIndex, editorState);
  if (match) {
    return editorState;
  } else {
    return ImageDataMapAssetEditorService$WonderEditor.removeData(imageDataIndex, editorState);
  }
}

function _disposeWDBNodeEditorData(param, param$1) {
  var engineState = param$1[1];
  var editorState = param$1[0];
  var wdbGameObjects = HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(param[/* wdbGameObject */1], engineState);
  return _disposeClonedGameObjectsComponentType(_getClonedGameObjects(wdbGameObjects, /* tuple */[
                  editorState,
                  engineState
                ]), editorState);
}

function _disposeNodeEditorData(node, engineState, editorState) {
  return NodeAssetService$WonderEditor.handleNode(node, (function (param, nodeData) {
                return _disposeTextureNodeEditorData(nodeData, editorState);
              }), (function (param, param$1) {
                return editorState;
              }), (function (param, nodeData) {
                return _disposeWDBNodeEditorData(nodeData, /* tuple */[
                            editorState,
                            engineState
                          ]);
              }), (function (param, param$1, param$2) {
                return editorState;
              }));
}

function _disposeTextureFromAllLightMaterials(textureComponent, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, lightMaterial) {
                return OperateTextureLogicService$WonderEditor.handleLightMaterialComponentFromHasDiffuseMapToNoMap(lightMaterial, engineState);
              }), engineState, LightMaterialEngineService$WonderEditor.getAllLightMaterials(engineState).filter((function (lightMaterial) {
                    return LightMaterialEngineService$WonderEditor.isDiffuseMap(lightMaterial, textureComponent, engineState);
                  })));
}

function _disposeGeometryAssets(wdbGameObjects, param) {
  var engineState = param[1];
  var __x = GeometryAssetLogicService$WonderEditor.getGeometryAssetsFromWDBGameObjects(wdbGameObjects, /* tuple */[
        param[0],
        engineState
      ]);
  return GeometryEngineService$WonderEditor.batchDisposeGeometry(__x, engineState);
}

function _disposeWDBGameObjects(wdbGameObjects, param) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                return GameObjectEngineService$WonderEditor.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(gameObject, engineState);
              }), param[1], wdbGameObjects);
}

function _disposeTextureNodeEngineData(param, engineState) {
  return _disposeTextureFromAllLightMaterials(param[/* textureComponent */0], engineState);
}

function _disposeMaterialNodeEngineData(param, param$1) {
  var type_ = param[/* type_ */0];
  var match = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultMaterialDataByType(type_, param$1[0]);
  return InspectorRenderGroupUtils$WonderEditor.Dispose[/* replaceGameObjectsMaterialsOfTheMaterial */3](/* tuple */[
              /* tuple */[
                param[/* materialComponent */1],
                match[0]
              ],
              /* tuple */[
                type_,
                match[1]
              ]
            ], param$1[1]);
}

function _disposeWDBNodeEngineData(param, param$1) {
  var engineState = param$1[1];
  var editorState = param$1[0];
  var wdbGameObjects = HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(param[/* wdbGameObject */1], engineState);
  var engineState$1 = _disposeGeometryAssets(wdbGameObjects, /* tuple */[
        editorState,
        engineState
      ]);
  return _disposeWDBGameObjects(wdbGameObjects, /* tuple */[
              editorState,
              engineState$1
            ]);
}

function _disposeNodeEngineData(node, editorState, engineState) {
  return NodeAssetService$WonderEditor.handleNode(node, (function (param, nodeData) {
                return _disposeTextureNodeEngineData(nodeData, engineState);
              }), (function (param, nodeData) {
                return _disposeMaterialNodeEngineData(nodeData, /* tuple */[
                            editorState,
                            engineState
                          ]);
              }), (function (param, nodeData) {
                return _disposeWDBNodeEngineData(nodeData, /* tuple */[
                            editorState,
                            engineState
                          ]);
              }), (function (param, param$1, param$2) {
                return engineState;
              }));
}

function disposeNode(node, param) {
  var engineState = param[1];
  var editorState = _disposeNodeEditorData(node, engineState, OperateTreeAssetEditorService$WonderEditor.removeNode(node, param[0]));
  var engineState$1 = _disposeNodeEngineData(node, editorState, engineState);
  return /* tuple */[
          editorState,
          engineState$1
        ];
}

function _disposeTreeEditorData(engineState, editorState) {
  return IterateTreeAssetService$WonderEditor.fold((function (editorState, param, param$1, param$2) {
                return editorState;
              }), editorState, TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), undefined, (function (editorState, param, nodeData) {
                return _disposeTextureNodeEditorData(nodeData, editorState);
              }), undefined, (function (editorState, param, nodeData) {
                return _disposeWDBNodeEditorData(nodeData, /* tuple */[
                            editorState,
                            engineState
                          ]);
              }), /* () */0);
}

function _disposeTreeEngineData(editorState, engineState) {
  return IterateTreeAssetService$WonderEditor.fold((function (engineState, param, param$1, param$2) {
                return engineState;
              }), engineState, TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), undefined, (function (engineState, param, nodeData) {
                return _disposeTextureNodeEngineData(nodeData, engineState);
              }), (function (engineState, param, nodeData) {
                return _disposeMaterialNodeEngineData(nodeData, /* tuple */[
                            editorState,
                            engineState
                          ]);
              }), (function (engineState, param, nodeData) {
                return _disposeWDBNodeEngineData(nodeData, /* tuple */[
                            editorState,
                            engineState
                          ]);
              }), /* () */0);
}

function disposeTree(param) {
  var engineState = param[1];
  var editorState = _disposeTreeEditorData(engineState, param[0]);
  var engineState$1 = _disposeTreeEngineData(editorState, engineState);
  return /* tuple */[
          CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(TreeAssetEditorService$WonderEditor.clearTree(editorState))),
          engineState$1
        ];
}

export {
  _disposeClonedGameObjectsComponentType ,
  _getClonedGameObjects ,
  _disposeTextureNodeEditorData ,
  _disposeWDBNodeEditorData ,
  _disposeNodeEditorData ,
  _disposeTextureFromAllLightMaterials ,
  _disposeGeometryAssets ,
  _disposeWDBGameObjects ,
  _disposeTextureNodeEngineData ,
  _disposeMaterialNodeEngineData ,
  _disposeWDBNodeEngineData ,
  _disposeNodeEngineData ,
  disposeNode ,
  _disposeTreeEditorData ,
  _disposeTreeEngineData ,
  disposeTree ,
  
}
/* ArrayService-WonderEditor Not a pure module */
