

import * as Json_decode$WonderBsJson from "../../../../../../../node_modules/wonder-bs-json/lib/es6_global/src/Json_decode.js";

function convertToRecord(setting) {
  return /* record */[
          /* debug */Json_decode$WonderBsJson.optional((function (param) {
                  return Json_decode$WonderBsJson.field("debug", (function (json) {
                                return /* record */[
                                        /* isDebug */Json_decode$WonderBsJson.field("is_debug", Json_decode$WonderBsJson.bool, json),
                                        /* showMessage */Json_decode$WonderBsJson.field("show_message", Json_decode$WonderBsJson.bool, json)
                                      ];
                              }), param);
                }), setting),
          /* redoUndo */Json_decode$WonderBsJson.optional((function (param) {
                  return Json_decode$WonderBsJson.field("redo_undo", (function (json) {
                                return /* record */[/* maxStackSize */Json_decode$WonderBsJson.field("max_stack_size", Json_decode$WonderBsJson.$$int, json)];
                              }), param);
                }), setting),
          /* hotKeys */Json_decode$WonderBsJson.field("hotkeys", (function (param) {
                  return Json_decode$WonderBsJson.array((function (json) {
                                return /* record */[
                                        /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                                        /* values */Json_decode$WonderBsJson.field("values", (function (param) {
                                                return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.string, param);
                                              }), json)
                                      ];
                              }), param);
                }), setting)
        ];
}

export {
  convertToRecord ,
  
}
/* No side effect */
