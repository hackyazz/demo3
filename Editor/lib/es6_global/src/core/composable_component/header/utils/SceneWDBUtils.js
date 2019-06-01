

import * as Most from "most";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as OptionService$WonderEditor from "../../../../service/primitive/OptionService.js";
import * as JobEngineService$WonderEditor from "../../../../service/state/engine/job/JobEngineService.js";
import * as IMGUIEditorService$WonderEditor from "../../../../service/state/editor/imgui/IMGUIEditorService.js";
import * as SceneEngineService$WonderEditor from "../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../service/state/engine/state/StateEngineService.js";
import * as GameViewEditorService$WonderEditor from "../../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as InspectorEditorService$WonderEditor from "../../../../service/state/editor/inspector/InspectorEditorService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as AssembleWDBEngineService$WonderEditor from "../../../../service/state/engine/AssembleWDBEngineService.js";
import * as ManageIMGUIEngineService$WonderEditor from "../../../../service/state/engine/ManageIMGUIEngineService.js";
import * as GameObjectComponentLogicService$WonderEditor from "../../../../service/stateTuple/logic/GameObjectComponentLogicService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

function _setIMGUIData(hasWDBIMGUIFunc, editorState, engineState) {
  var wdbImguiFunc = hasWDBIMGUIFunc ? ManageIMGUIEngineService$WonderEditor.getIMGUIFunc(engineState) : undefined;
  return /* tuple */[
          wdbImguiFunc !== undefined ? IMGUIEditorService$WonderEditor.setGameViewIMGUICustomData(OptionService$WonderEditor.unsafeGet(ManageIMGUIEngineService$WonderEditor.getCustomData(engineState)), IMGUIEditorService$WonderEditor.setGameViewIMGUIFunc(Caml_option.valFromOption(wdbImguiFunc), editorState)) : IMGUIEditorService$WonderEditor.removeGameViewIMGUICustomData(IMGUIEditorService$WonderEditor.removeGameViewIMGUIFunc(editorState)),
          engineState
        ];
}

function _handleEngineState(sceneGameObject, hasWDBIMGUIFunc, engineState) {
  var engineState$1 = SceneEngineService$WonderEditor.setSceneGameObject(sceneGameObject, engineState);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = GameObjectEngineService$WonderEditor.getGameObjectActiveBasicCameraView(sceneGameObject, engineState$1);
  var editorState$1 = match !== undefined ? GameViewEditorService$WonderEditor.setActivedBasicCameraView(match, editorState) : GameViewEditorService$WonderEditor.removeActivedBasicCameraView(editorState);
  var match$1 = _setIMGUIData(hasWDBIMGUIFunc, editorState$1, engineState$1);
  var engineState$2 = match$1[1];
  var editorState$2 = SceneTreeEditorService$WonderEditor.clearCurrentSceneTreeNode(InspectorEditorService$WonderEditor.clearComponentTypeMap(match$1[0]));
  StateEditorService$WonderEditor.setState(InspectorEditorService$WonderEditor.addSceneGameObjectComponentTypeToMap(sceneGameObject, GameObjectComponentLogicService$WonderEditor.setGameObjectArrComponentTypeMap(HierarchyGameObjectEngineService$WonderEditor.getChildren(sceneGameObject, engineState$2), GameObjectComponentLogicService$WonderEditor.buildAllComponentArray(/* () */0), engineState$2, editorState$2)));
  var engineState$3 = GameObjectEngineService$WonderEditor.setGameObjectName(SceneEngineService$WonderEditor.getDefaultName(/* () */0), sceneGameObject, engineState$2);
  return /* tuple */[
          sceneGameObject,
          engineState$3
        ];
}

function importSceneWDB(wdbArrayBuffer) {
  var engineState = JobEngineService$WonderEditor.execDisposeJob(SceneEngineService$WonderEditor.disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return Most.map((function (param) {
                var match = param[1];
                var match$1 = _handleEngineState(param[2], match[1], param[0]);
                StateEngineService$WonderEditor.setState(match$1[1]);
                return /* tuple */[
                        match$1[0],
                        match[0]
                      ];
              }), AssembleWDBEngineService$WonderEditor.assembleWDB(wdbArrayBuffer, true, false, true, true, false, engineState));
}

export {
  _setIMGUIData ,
  _handleEngineState ,
  importSceneWDB ,
  
}
/* most Not a pure module */
