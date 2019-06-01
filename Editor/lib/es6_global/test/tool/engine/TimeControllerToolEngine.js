

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function setStartTime(startTime) {
  window.performance = {
    now: (function () {
        return startTime;
      })
  };
  return /* () */0;
}

function getTimeControllerRecord(state) {
  return state[/* timeControllerRecord */32];
}

function setElapsed(elapsed, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* timeControllerRecord */32];
  newrecord[/* timeControllerRecord */32] = /* record */[
    /* elapsed */elapsed,
    /* startTime */init[/* startTime */1],
    /* deltaTime */init[/* deltaTime */2],
    /* lastTime */init[/* lastTime */3],
    /* gameTime */init[/* gameTime */4],
    /* fps */init[/* fps */5]
  ];
  return newrecord;
}

export {
  setStartTime ,
  getTimeControllerRecord ,
  setElapsed ,
  
}
/* No side effect */
