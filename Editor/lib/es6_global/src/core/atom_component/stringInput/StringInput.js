

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as ReasonReactUtils$WonderEditor from "../../utils/ui/ReasonReactUtils.js";

function change($$event) {
  var inputVal = $$event.target.value;
  return /* Change */[inputVal];
}

function triggerOnChange(value, onChangeFunc) {
  if (onChangeFunc !== undefined) {
    return Curry._1(onChangeFunc, value);
  } else {
    return /* () */0;
  }
}

function triggerOnBlur(value, onBlurFunc) {
  if (onBlurFunc !== undefined) {
    return Curry._1(onBlurFunc, value);
  } else {
    return /* () */0;
  }
}

function handleBlurAction(state, canBeNull, onBlurFunc) {
  if (canBeNull !== undefined) {
    if (canBeNull) {
      return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                  /* inputValue */state[/* inputValue */0],
                  /* originalName */state[/* inputValue */0]
                ], (function (_state) {
                    return triggerOnBlur(state[/* inputValue */0], onBlurFunc);
                  }));
    } else {
      var value = state[/* inputValue */0];
      if (value === "") {
        return /* Update */Block.__(0, [/* record */[
                    /* inputValue */state[/* originalName */1],
                    /* originalName */state[/* originalName */1]
                  ]]);
      } else {
        return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                    /* inputValue */state[/* inputValue */0],
                    /* originalName */value
                  ], (function (_state) {
                      return triggerOnBlur(state[/* inputValue */0], onBlurFunc);
                    }));
      }
    }
  } else {
    return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                /* inputValue */state[/* inputValue */0],
                /* originalName */state[/* inputValue */0]
              ], (function (_state) {
                  return triggerOnBlur(state[/* inputValue */0], onBlurFunc);
                }));
  }
}

var Method = /* module */[
  /* change */change,
  /* triggerOnChange */triggerOnChange,
  /* triggerOnBlur */triggerOnBlur,
  /* handleBlurAction */handleBlurAction
];

var component = ReasonReact.reducerComponent("StringInput");

function reducer(param, canBeNull, action, state) {
  var onChangeFunc = param[0];
  if (action) {
    var value = action[0];
    return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                /* inputValue */value,
                /* originalName */state[/* originalName */1]
              ], (function (_state) {
                  return triggerOnChange(value, onChangeFunc);
                }));
  } else {
    return handleBlurAction(state, canBeNull, param[1]);
  }
}

function render(label, title, param) {
  var send = param[/* send */3];
  return React.createElement("article", {
              className: "inspector-item"
            }, label !== undefined ? React.createElement("div", {
                    className: "item-header",
                    title: title !== undefined ? title : ""
                  }, React.createElement("span", {
                        className: "component-label"
                      }, DomHelper$WonderEditor.textEl(label))) : null, React.createElement("div", {
                  className: "item-content"
                }, React.createElement("input", {
                      className: "input-component float-input",
                      type: "text",
                      value: param[/* state */1][/* inputValue */0],
                      onBlur: (function (_e) {
                          return Curry._1(send, /* Blur */0);
                        }),
                      onChange: (function (_e) {
                          return Curry._1(send, change(_e));
                        })
                    })));
}

function make(defaultValue, label, title, onChange, onBlur, canBeNull, _children) {
  var partial_arg = /* tuple */[
    onChange,
    onBlur
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
              return render(label, title, self);
            }),
          /* initialState */(function (param) {
              if (defaultValue !== undefined) {
                var value = defaultValue;
                return /* record */[
                        /* inputValue */value,
                        /* originalName */value
                      ];
              } else {
                return /* record */[
                        /* inputValue */"",
                        /* originalName */""
                      ];
              }
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg, canBeNull, param, param$1);
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
