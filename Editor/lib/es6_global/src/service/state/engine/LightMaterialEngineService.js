

import * as LightMaterialAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/material/LightMaterialAPI.js";
import * as ShaderEngineService$WonderEditor from "./ShaderEngineService.js";
import * as NameLightMaterialMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/light/NameLightMaterialMainService.js";
import * as GameObjectLightMaterialService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/material/light/GameObjectLightMaterialService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/light/RecordLightMaterialMainService.js";
import * as ManageMapLightMaterialMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/light/mapManager/ManageMapLightMaterialMainService.js";

function getLightMaterialGameObjects(material, engineState) {
  return GameObjectLightMaterialService$Wonderjs.getGameObjects(material, RecordLightMaterialMainService$Wonderjs.getRecord(engineState));
}

function hasLightMaterialGameObjects(material, engineState) {
  var match = GameObjectLightMaterialService$Wonderjs.getGameObjects(material, RecordLightMaterialMainService$Wonderjs.getRecord(engineState));
  if (match !== undefined) {
    return match.length > 0;
  } else {
    return false;
  }
}

function setLightMaterialDiffuseColor(color, material, engineState) {
  return LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material, color, engineState);
}

function setLightMaterialShininess(shininess, material, engineState) {
  return LightMaterialAPI$Wonderjs.setLightMaterialShininess(material, shininess, engineState);
}

function setLightMaterialDiffuseMap(map, material, engineState) {
  return LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, map, engineState);
}

function isDiffuseMap(material, texture, engineState) {
  var match = ManageMapLightMaterialMainService$Wonderjs.getDiffuseMap(material, engineState);
  if (match !== undefined) {
    return match === texture;
  } else {
    return false;
  }
}

function reInitLightMaterialsAndClearShaderCache(materials, engineState) {
  return ShaderEngineService$WonderEditor.clearInitShaderCache(LightMaterialAPI$Wonderjs.reInitMaterials(materials, engineState));
}

var create = LightMaterialAPI$Wonderjs.createLightMaterial;

var unsafeGetLightMaterialGameObjects = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialGameObjects;

var getLightMaterialName = NameLightMaterialMainService$Wonderjs.getName;

var getLightMaterialDiffuseColor = LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor;

var getLightMaterialShininess = LightMaterialAPI$Wonderjs.getLightMaterialShininess;

var unsafeGetLightMaterialDiffuseMap = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap;

var getLightMaterialDiffuseMap = ManageMapLightMaterialMainService$Wonderjs.getDiffuseMap;

var hasLightMaterialDiffuseMap = LightMaterialAPI$Wonderjs.hasLightMaterialDiffuseMap;

var removeLightMaterialDiffuseMap = LightMaterialAPI$Wonderjs.removeLightMaterialDiffuseMap;

var unsafeGetLightMaterialName = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialName;

var setLightMaterialName = LightMaterialAPI$Wonderjs.setLightMaterialName;

var hasLightMaterialSpecularMap = LightMaterialAPI$Wonderjs.hasLightMaterialSpecularMap;

var removeLightMaterialSpecularMap = LightMaterialAPI$Wonderjs.removeLightMaterialSpecularMap;

var reInitMaterials = LightMaterialAPI$Wonderjs.reInitMaterials;

var getAllLightMaterials = LightMaterialAPI$Wonderjs.getAllLightMaterials;

var batchDisposeLightMaterial = LightMaterialAPI$Wonderjs.batchDisposeLightMaterial;

export {
  create ,
  unsafeGetLightMaterialGameObjects ,
  getLightMaterialGameObjects ,
  hasLightMaterialGameObjects ,
  getLightMaterialName ,
  getLightMaterialDiffuseColor ,
  setLightMaterialDiffuseColor ,
  getLightMaterialShininess ,
  setLightMaterialShininess ,
  unsafeGetLightMaterialDiffuseMap ,
  getLightMaterialDiffuseMap ,
  setLightMaterialDiffuseMap ,
  hasLightMaterialDiffuseMap ,
  removeLightMaterialDiffuseMap ,
  unsafeGetLightMaterialName ,
  setLightMaterialName ,
  hasLightMaterialSpecularMap ,
  isDiffuseMap ,
  removeLightMaterialSpecularMap ,
  reInitMaterials ,
  reInitLightMaterialsAndClearShaderCache ,
  getAllLightMaterials ,
  batchDisposeLightMaterial ,
  
}
/* LightMaterialAPI-Wonderjs Not a pure module */
