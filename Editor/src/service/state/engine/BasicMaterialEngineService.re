open Wonderjs;

let create = BasicMaterialAPI.createBasicMaterial;

let getColor = BasicMaterialAPI.getBasicMaterialColor;

let unsafeGetBasicMaterialGameObjects = BasicMaterialAPI.unsafeGetBasicMaterialGameObjects;

let getBasicMaterialGameObjects = (material, engineState) =>
  GameObjectBasicMaterialService.getGameObjects(
    material,
    RecordBasicMaterialMainService.getRecord(engineState),
  );

let hasBasicMaterialGameObjects = (material, engineState) =>
  switch (getBasicMaterialGameObjects(material, engineState)) {
  | None => false
  | Some(gameObjects) => Js.Array.length(gameObjects) > 0
  };

let getBasicMaterialName = NameBasicMaterialMainService.getName;

let unsafeGetBasicMaterialName = BasicMaterialAPI.unsafeGetBasicMaterialName;

let setBasicMaterialName = BasicMaterialAPI.setBasicMaterialName;

let setColor = (color, material, engineState) =>
  engineState |> BasicMaterialAPI.setBasicMaterialColor(material, color);

let setIsDepthTest = (isDepthTest, material, engineState) =>
  engineState
  |> BasicMaterialAPI.setBasicMaterialIsDepthTest(material, isDepthTest);

let setAlpha = BasicMaterialAPI.setBasicMaterialAlpha;

let reInitMaterials = BasicMaterialAPI.reInitMaterials;

let reInitBasicMaterialsAndClearShaderCache = (materials, engineState) =>
  engineState
  |> reInitMaterials(materials)
  |> ShaderEngineService.clearInitShaderCache;

let getAllBasicMaterials = BasicMaterialAPI.getAllBasicMaterials;

let batchDisposeBasicMaterial = BasicMaterialAPI.batchDisposeBasicMaterial;