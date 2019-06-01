

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../../atom_component/select/Select.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../../utils/language/LanguageUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/MeshRendererEngineService.js";
import * as MainEditorMeshRendererUtils$WonderEditor from "../util/MainEditorMeshRendererUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as MeshRendererChangeModeEventHandler$WonderEditor from "../eventHandler/MeshRendererChangeModeEventHandler.js";

var changeMode = MeshRendererChangeModeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var Method = /* module */[/* changeMode */changeMode];

var component = ReasonReact.reducerComponent("MainEditorMeshRenderer");

function reducer(param, action, state) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
              /* drawMode */action[0],
              /* meshRenderer */state[/* meshRenderer */1]
            ], (function (state) {
                return Curry._3(changeMode, /* tuple */[
                            uiState,
                            dispatchFunc
                          ], state[/* meshRenderer */1], state[/* drawMode */0]);
              }));
}

function render(param, param$1) {
  var send = param$1[/* send */3];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  return React.createElement("article", {
              key: "MainEditorMeshRenderer",
              className: "wonder-mesh-renderer"
            }, ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Draw Mode", MainEditorMeshRendererUtils$WonderEditor.getDrawModeOptions(/* () */0), param$1[/* state */1][/* drawMode */0], (function (value) {
                        return Curry._1(send, /* ChangeMode */[value]);
                      }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("draw-mode-describe", languageType), /* array */[])));
}

function make(uiState, dispatchFunc, _children) {
  var partial_arg = /* tuple */[
    uiState,
    dispatchFunc
  ];
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(/* tuple */[
                          uiState,
                          dispatchFunc
                        ], self);
            }),
          /* initialState */(function (param) {
              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
              var meshRenderer = GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(StateEditorService$WonderEditor.getState(/* () */0)), engineState);
              return /* record */[
                      /* drawMode */MeshRendererEngineService$WonderEditor.getDrawMode(meshRenderer, engineState),
                      /* meshRenderer */meshRenderer
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg, param, param$1);
            }),
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  render ,
  make ,
  
}
/* component Not a pure module */
