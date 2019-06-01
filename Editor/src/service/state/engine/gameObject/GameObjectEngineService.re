open Wonderjs;

let create = GameObjectAPI.createGameObject;

let initGameObject = GameObjectAPI.initGameObject;

let isGameObjectAlive = GameObjectAPI.isGameObjectAlive;

let disposeGameObject = GameObjectAPI.disposeGameObject;

let cloneGameObject =
    (gameObject, count, isShareMaterial, engineState)
    : (array(array('a)), Wonderjs.StateDataMainType.state) => {
  let (engineState, cloneGameObjects) =
    engineState
    |> GameObjectAPI.cloneGameObject(gameObject, count, isShareMaterial);

  (cloneGameObjects, engineState);
};

let disposeGameObjectKeepOrder = GameObjectAPI.disposeGameObjectKeepOrder;

let disposeGameObjectKeepOrderRemoveGeometry = GameObjectAPI.disposeGameObjectKeepOrderRemoveGeometry;

let disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial = GameObjectAPI.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial;

let disposeGameObjectDisposeGeometryRemoveMaterial = GameObjectAPI.disposeGameObjectDisposeGeometryRemoveMaterial;

/* let hasGameObjectBoxGeometryComponent = GameObjectAPI.hasGameObjectBoxGeometryComponent; */
/*
 let hasGameObjectLightMaterialComponent = GameObjectAPI.hasGameObjectLightMaterialComponent; */

/* let hasGameObjectDirectionLightComponent = GameObjectAPI.hasGameObjectDirectionLightComponent;

   let hasGameObjectPointLightComponent = GameObjectAPI.hasGameObjectPointLightComponent; */

let getGameObjectName = GameObjectAPI.getGameObjectName;

let unsafeGetGameObjectName = GameObjectAPI.unsafeGetGameObjectName;

let setGameObjectName = (name, gameObject, engineState) =>
  GameObjectAPI.setGameObjectName(gameObject, name, engineState);

let getGameObjectIsRoot = (gameObject, engineState) =>
  IsRootGameObjectMainService.getIsRoot(gameObject, engineState);

let unsafeGetGameObjectIsRoot = GameObjectAPI.unsafeGetGameObjectIsRoot;

let setGameObjectIsRoot = GameObjectAPI.setGameObjectIsRoot;

let _getAllComponents =
    (allGameObjects, (hasComponentFunc, unsafeGetComponentFunc), engineState) =>
  allGameObjects
  |> Js.Array.filter(gameObject => hasComponentFunc(gameObject, engineState))
  |> Js.Array.map(gameObject =>
       unsafeGetComponentFunc(gameObject, engineState)
     )
  |> WonderCommonlib.ArrayService.removeDuplicateItems;

let getAllBasicMaterials = (allGameObjects, engineState) =>
  _getAllComponents(
    allGameObjects,
    (
      GameObjectComponentEngineService.hasBasicMaterialComponent,
      GameObjectComponentEngineService.unsafeGetBasicMaterialComponent,
    ),
    engineState,
  );

let getAllLightMaterials = (allGameObjects, engineState) =>
  _getAllComponents(
    allGameObjects,
    (
      GameObjectComponentEngineService.hasLightMaterialComponent,
      GameObjectComponentEngineService.unsafeGetLightMaterialComponent,
    ),
    engineState,
  );

let getAllArcballCameraControllers = (allGameObjects, engineState) =>
  _getAllComponents(
    allGameObjects,
    (
      GameObjectComponentEngineService.hasArcballCameraControllerComponent,
      GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent,
    ),
    engineState,
  );

/* let getAllGeometrys = (allGameObjects, engineState) =>
   _getAllComponents(
     allGameObjects,
     (
       GameObjectComponentEngineService.hasGeometryComponent,
       GameObjectComponentEngineService.unsafeGetGeometryComponent,
     ),
     engineState,
   ); */

let getAllDirectionLights = (allGameObjects, engineState) =>
  _getAllComponents(
    allGameObjects,
    (
      GameObjectComponentEngineService.hasDirectionLightComponent,
      GameObjectComponentEngineService.unsafeGetDirectionLightComponent,
    ),
    engineState,
  );

let getAllPointLights = (allGameObjects, engineState) =>
  _getAllComponents(
    allGameObjects,
    (
      GameObjectComponentEngineService.hasPointLightComponent,
      GameObjectComponentEngineService.unsafeGetPointLightComponent,
    ),
    engineState,
  );

/* let disposeGameObjectArrKeepOrder = (gameObjectArr, engineState) =>
   gameObjectArr
   |> WonderCommonlib.ArrayService.reduceOneParam(
        (. engineState, gameObject) =>
          engineState |> isGameObjectAlive(gameObject) ?
            disposeGameObjectKeepOrder(gameObject, engineState) : engineState,
        engineState,
      ); */

let initAllGameObjects = (gameObject, engineState) =>
  HierarchyGameObjectEngineService.getAllGameObjects(gameObject, engineState)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, gameObject) =>
         initGameObject(gameObject, engineState),
       engineState,
     );

let _getGameObjectActiveBasicCameraViews = (gameObject, engineState) =>
  engineState
  |> HierarchyGameObjectEngineService.getAllGameObjects(gameObject)
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasBasicCameraViewComponent(
         gameObject,
         engineState,
       )
     )
  |> Js.Array.map(gameObject =>
       GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
         gameObject,
         engineState,
       )
     )
  |> Js.Array.filter(basicCameraView =>
       BasicCameraViewEngineService.isActiveBasicCameraView(
         basicCameraView,
         engineState,
       )
     )
  |> WonderLog.Contract.ensureCheck(
       activedBasicCameraViews =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|only has 0 or 1 active basicCameraView|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 activedBasicCameraViews |> Js.Array.length <= 1
               )
             )
           )
         ),
       StateEditorService.getStateIsDebug(),
     );

let getGameObjectActiveBasicCameraView = (gameObject, engineState) => {
  let activeBasicCameraViews =
    _getGameObjectActiveBasicCameraViews(gameObject, engineState);

  activeBasicCameraViews |> Js.Array.length === 0 ?
    None : Array.unsafe_get(activeBasicCameraViews, 0) |. Some;
};

let setAllGameObjectsIsRenderIfHasMeshRenderer =
    (isRender, gameObject, engineState) => {
  let rec _iterateGameObjectArr = (gameObjectArr, engineState) =>
    gameObjectArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) => {
           let engineState =
             engineState
             |> GameObjectComponentEngineService.hasMeshRendererComponent(
                  gameObject,
                ) ?
               engineState
               |> GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
                    gameObject,
                  )
               |. MeshRendererEngineService.setMeshRendererIsRender(
                    isRender,
                    engineState,
                  ) :
               engineState;

           _iterateGameObjectArr(
             engineState
             |> HierarchyGameObjectEngineService.getChildren(gameObject),
             engineState,
           );
         },
         engineState,
       );

  _iterateGameObjectArr([|gameObject|], engineState);
};