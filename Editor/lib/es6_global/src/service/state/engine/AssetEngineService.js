

import * as LoaderManagerAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/asset/LoaderManagerAPI.js";
import * as LoaderManagerSystem$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/asset/LoaderManagerSystem.js";

function loadConfig(jsonPathArr, stateData) {
  return LoaderManagerSystem$Wonderjs.loadConfig(jsonPathArr, LoaderManagerAPI$Wonderjs._fetch, stateData);
}

export {
  loadConfig ,
  
}
/* LoaderManagerAPI-Wonderjs Not a pure module */
