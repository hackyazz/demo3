

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_obj from "../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";

function _isNameEqual(name1, name2, isDefaultNameFunc) {
  var match = Curry._1(isDefaultNameFunc, name1) && Curry._1(isDefaultNameFunc, name2);
  if (match) {
    return true;
  } else {
    return Caml_obj.caml_equal(name1, name2);
  }
}

function isNameEqual(name1, component2, param, engineState) {
  var match = Curry._2(param[0], component2, engineState);
  if (name1 !== undefined) {
    if (match !== undefined) {
      return _isNameEqual(Caml_option.valFromOption(name1), Caml_option.valFromOption(match), param[1]);
    } else {
      return false;
    }
  } else {
    return match === undefined;
  }
}

export {
  _isNameEqual ,
  isNameEqual ,
  
}
/* No side effect */
