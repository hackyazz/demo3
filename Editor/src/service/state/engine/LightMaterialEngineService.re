open Wonderjs;

let create = LightMaterialAPI.createLightMaterial;

let unsafeGetLightMaterialGameObjects = LightMaterialAPI.unsafeGetLightMaterialGameObjects;

let getLightMaterialGameObjects = (material, engineState) =>
  GameObjectLightMaterialService.getGameObjects(
    material,
    RecordLightMaterialMainService.getRecord(engineState),
  );

let hasLightMaterialGameObjects = (material, engineState) =>
  switch (getLightMaterialGameObjects(material, engineState)) {
  | None => false
  | Some(gameObjects) => Js.Array.length(gameObjects) > 0
  };

let getLightMaterialName = NameLightMaterialMainService.getName;

let unsafeGetLightMaterialName = LightMaterialAPI.unsafeGetLightMaterialName;

let setLightMaterialName = LightMaterialAPI.setLightMaterialName;

let getLightMaterialDiffuseColor = LightMaterialAPI.getLightMaterialDiffuseColor;

let setLightMaterialDiffuseColor = (color, material, engineState) =>
  engineState
  |> LightMaterialAPI.setLightMaterialDiffuseColor(material, color);

let getLightMaterialShininess = LightMaterialAPI.getLightMaterialShininess;

let setLightMaterialShininess = (shininess, material, engineState) =>
  LightMaterialAPI.setLightMaterialShininess(
    material,
    shininess,
    engineState,
  );

let unsafeGetLightMaterialDiffuseMap = LightMaterialAPI.unsafeGetLightMaterialDiffuseMap;

let getLightMaterialDiffuseMap = ManageMapLightMaterialMainService.getDiffuseMap;

let setLightMaterialDiffuseMap = (map, material, engineState) =>
  engineState |> LightMaterialAPI.setLightMaterialDiffuseMap(material, map);

let hasLightMaterialDiffuseMap = LightMaterialAPI.hasLightMaterialDiffuseMap;

let removeLightMaterialDiffuseMap = LightMaterialAPI.removeLightMaterialDiffuseMap;

let unsafeGetLightMaterialName = LightMaterialAPI.unsafeGetLightMaterialName;

let setLightMaterialName = LightMaterialAPI.setLightMaterialName;

let hasLightMaterialSpecularMap = LightMaterialAPI.hasLightMaterialSpecularMap;

let isDiffuseMap = (material, texture, engineState) =>
  switch (getLightMaterialDiffuseMap(material, engineState)) {
  | Some(map) when map === texture => true
  | _ => false
  };

let removeLightMaterialSpecularMap = LightMaterialAPI.removeLightMaterialSpecularMap;

/* let getLightMaterialSpecularColor = LightMaterialAPI.getLightMaterialSpecularColor;

   let setLightMaterialSpecularColor = LightMaterialAPI.setLightMaterialSpecularColor; */

let reInitMaterials = LightMaterialAPI.reInitMaterials;

let reInitLightMaterialsAndClearShaderCache = (materials, engineState) =>
  engineState
  |> reInitMaterials(materials)
  |> ShaderEngineService.clearInitShaderCache;

let getAllLightMaterials = LightMaterialAPI.getAllLightMaterials;

let batchDisposeLightMaterial = LightMaterialAPI.batchDisposeLightMaterial;