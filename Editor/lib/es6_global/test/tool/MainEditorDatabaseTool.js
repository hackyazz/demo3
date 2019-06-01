

import * as HashMapService$WonderCommonlib from "../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";

function buildFakeLocalStorage() {
  var fakeLocalStorage = HashMapService$WonderCommonlib.createEmpty(/* () */0);
  global.localStorage = fakeLocalStorage;
  return /* () */0;
}

function getExtensionTestKey() {
  return "databaseTest";
}

export {
  buildFakeLocalStorage ,
  getExtensionTestKey ,
  
}
/* HashMapService-WonderCommonlib Not a pure module */
