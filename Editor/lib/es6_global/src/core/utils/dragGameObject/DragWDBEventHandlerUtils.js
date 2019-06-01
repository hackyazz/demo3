

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../ui/store/AppStore.js";
import * as DragWDBUtils$WonderEditor from "./DragWDBUtils.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/state/StateEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../service/state/editor/sceneTree/SceneTreeEditorService.js";

function handleSelfLogic(param, param$1, param$2) {
  var targetGameObject = param$2[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var editorState$1 = SceneTreeEditorService$WonderEditor.setIsShowChildren(targetGameObject, true, editorState);
  var match = DragWDBUtils$WonderEditor.dragWDB(param$2[1], targetGameObject, param$2[2], /* tuple */[
        editorState$1,
        engineState
      ]);
  var match$1 = match[1];
  if (match[0]) {
    Curry._1(param[1], [
          AppStore$WonderEditor.UpdateAction,
          /* Update */[/* array */[/* SceneTree */6]]
        ]);
  }
  StateEditorService$WonderEditor.setState(match$1[0]);
  StateEngineService$WonderEditor.setState(match$1[1]);
  return /* () */0;
}

export {
  handleSelfLogic ,
  
}
/* AppStore-WonderEditor Not a pure module */
