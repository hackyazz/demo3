

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Color$WonderEditor from "../../../../../../../../../../../external/Color.js";
import * as ColorType$WonderEditor from "../../../../../../../../../../../external/type/ColorType.js";
import * as ValueService$WonderEditor from "../../../../../../../../../../../../service/atom/ValueService.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../../../utils/language/LanguageUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as PickColorComponent$WonderEditor from "../../../../../../../atom_component/PickColorComponent/ui/PickColorComponent.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as DirectionLightEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/DirectionLightEngineService.js";
import * as MainEditorFloatInputBaseComponent$WonderEditor from "../../../../../atom_component/FloatInputBaseComponent/MainEditorFloatInputBaseComponent.js";
import * as DirectionLightIntensityBlurEventHandler$WonderEditor from "./eventHandler/DirectionLightIntensityBlurEventHandler.js";
import * as DirectionLightCloseColorPickEventHandler$WonderEditor from "./eventHandler/DirectionLightCloseColorPickEventHandler.js";

var component = ReasonReact.statelessComponent("MainEditorDirectionLight");

function getColor(lightComponent, param) {
  return Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                    return DirectionLightEngineService$WonderEditor.getDirectionLightColor(lightComponent, param);
                  })));
}

function changeColor(lightComponent, value) {
  var __x = Color$WonderEditor.getEngineColorRgbArr(ColorType$WonderEditor.convertColorObjToColorPickType(value));
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return DirectionLightEngineService$WonderEditor.setDirectionLightColor(__x, lightComponent, param);
              }));
}

var closeColorPick = DirectionLightCloseColorPickEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1];

function blurIntensityEvent(param, lightComponent, intensity) {
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, intensity, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return DirectionLightEngineService$WonderEditor.getDirectionLightIntensity(lightComponent, param);
            })));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(DirectionLightIntensityBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], lightComponent, intensity);
  }
}

function changeIntensity(lightComponent, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return DirectionLightEngineService$WonderEditor.setDirectionLightIntensity(value, lightComponent, param);
              }));
}

var Method = /* module */[
  /* getColor */getColor,
  /* changeColor */changeColor,
  /* closeColorPick */closeColorPick,
  /* blurIntensityEvent */blurIntensityEvent,
  /* changeIntensity */changeIntensity
];

function render(param, lightComponent, _self) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var partial_arg = /* tuple */[
    uiState,
    dispatchFunc
  ];
  var partial_arg$1 = /* tuple */[
    uiState,
    dispatchFunc
  ];
  return React.createElement("article", {
              className: "wonder-direction-light"
            }, ReasonReact.element(undefined, undefined, PickColorComponent$WonderEditor.make("Color", LanguageUtils$WonderEditor.getInspectorLanguageDataByType("light-color-describe", languageType), (function (param) {
                        return Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                          return DirectionLightEngineService$WonderEditor.getDirectionLightColor(lightComponent, param);
                                        })));
                      }), (function (param) {
                        return changeColor(lightComponent, param);
                      }), Curry._2(closeColorPick, /* tuple */[
                          uiState,
                          dispatchFunc
                        ], lightComponent), /* array */[])), ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make((function (param) {
                        return blurIntensityEvent(partial_arg, lightComponent, param);
                      }), "Intensity", (function (param) {
                        return DirectionLightEngineService$WonderEditor.getDirectionLightIntensity(lightComponent, param);
                      }), (function (param) {
                        return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param$1) {
                                      return DirectionLightEngineService$WonderEditor.setDirectionLightIntensity(param, lightComponent, param$1);
                                    }));
                      }), (function (param) {
                        return blurIntensityEvent(partial_arg$1, lightComponent, param);
                      }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("light-intensity-describe", languageType), /* array */[])));
}

function make(uiState, dispatchFunc, lightComponent, _children) {
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
                        ], lightComponent, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  component ,
  Method ,
  render ,
  make ,
  
}
/* component Not a pure module */
