open Wonderjs;

open StateDataMainType;

/* light material */

let hasLightMaterialComponent = GameObjectAPI.hasGameObjectLightMaterialComponent;

let getLightMaterialComponent = (gameObject, engineState) =>
  GetComponentGameObjectService.getLightMaterialComponent(.
    gameObject,
    engineState.gameObjectRecord,
  );

let unsafeGetLightMaterialComponent = GameObjectAPI.unsafeGetGameObjectLightMaterialComponent;

let addLightMaterialComponent = GameObjectAPI.addGameObjectLightMaterialComponent;

let disposeLightMaterialComponent = GameObjectAPI.disposeGameObjectLightMaterialComponent;

let removeLightMaterialComponent = GameObjectAPI.removeGameObjectLightMaterialComponent;

/* basic material */

let hasBasicMaterialComponent = GameObjectAPI.hasGameObjectBasicMaterialComponent;

let getBasicMaterialComponent = (gameObject, engineState) =>
  GetComponentGameObjectService.getBasicMaterialComponent(.
    gameObject,
    engineState.gameObjectRecord,
  );

let unsafeGetBasicMaterialComponent = GameObjectAPI.unsafeGetGameObjectBasicMaterialComponent;

let addBasicMaterialComponent = GameObjectAPI.addGameObjectBasicMaterialComponent;

let disposeBasicMaterialComponent = GameObjectAPI.disposeGameObjectBasicMaterialComponent;

let removeBasicMaterialComponent = GameObjectAPI.removeGameObjectBasicMaterialComponent;

/* mesh renderer */

let addMeshRendererComponent = GameObjectAPI.addGameObjectMeshRendererComponent;

let getMeshRendererComponent = (gameObject, engineState) =>
  GetComponentGameObjectService.getMeshRendererComponent(.
    gameObject,
    engineState.gameObjectRecord,
  );

let unsafeGetMeshRendererComponent = GameObjectAPI.unsafeGetGameObjectMeshRendererComponent;

let hasMeshRendererComponent = GameObjectAPI.hasGameObjectMeshRendererComponent;

let disposeMeshRendererComponent = GameObjectAPI.disposeGameObjectMeshRendererComponent;

/* geometry */

let unsafeGetGeometryComponent = (gameObject, engineState) =>
  engineState
  |> GameObjectAPI.unsafeGetGameObjectGeometryComponent(gameObject);

let getGeometryComponent = (gameObject, engineState) =>
  GetComponentGameObjectService.getGeometryComponent(.
    gameObject,
    engineState.gameObjectRecord,
  );

let disposeGeometryComponent = GameObjectAPI.disposeGameObjectGeometryComponent;

let removeGeometryComponent = GameObjectAPI.removeGameObjectGeometryComponent;

let hasGeometryComponent = GameObjectAPI.hasGameObjectGeometryComponent;

let addGeometryComponent = GameObjectAPI.addGameObjectGeometryComponent;
/* perspective camera projection */

let addPerspectiveCameraProjectionComponent = GameObjectAPI.addGameObjectPerspectiveCameraProjectionComponent;

let hasPerspectiveCameraProjectionComponent = GameObjectAPI.hasGameObjectPerspectiveCameraProjectionComponent;

let unsafeGetPerspectiveCameraProjectionComponent = GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent;

let disposePerspectiveCameraProjectionComponent = GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent;
/* camera view */

let addBasicCameraViewComponent = GameObjectAPI.addGameObjectBasicCameraViewComponent;

let hasBasicCameraViewComponent = GameObjectAPI.hasGameObjectBasicCameraViewComponent;

let unsafeGetBasicCameraViewComponent = GameObjectAPI.unsafeGetGameObjectBasicCameraViewComponent;

let disposeBasicCameraViewComponent = GameObjectAPI.disposeGameObjectBasicCameraViewComponent;
/* transform */

let unsafeGetTransformComponent = GameObjectAPI.unsafeGetGameObjectTransformComponent;

let hasTransformComponent = GameObjectAPI.hasGameObjectTransformComponent;

/* source instance */
let unsafeGetSourceInstanceComponent = GameObjectAPI.unsafeGetGameObjectSourceInstanceComponent;

let hasSourceInstanceComponent = GameObjectAPI.hasGameObjectSourceInstanceComponent;

let addSourceInstanceComponent = GameObjectAPI.addGameObjectSourceInstanceComponent;

/* direction light */

let addDirectionLightComponent = GameObjectAPI.addGameObjectDirectionLightComponent;

let disposeDirectionLightComponent = GameObjectAPI.disposeGameObjectDirectionLightComponent;

let unsafeGetDirectionLightComponent = GameObjectAPI.unsafeGetGameObjectDirectionLightComponent;

let hasDirectionLightComponent = GameObjectAPI.hasGameObjectDirectionLightComponent;

/* point light */
let addPointLightComponent = GameObjectAPI.addGameObjectPointLightComponent;

let disposePointLightComponent = GameObjectAPI.disposeGameObjectPointLightComponent;

let unsafeGetPointLightComponent = GameObjectAPI.unsafeGetGameObjectPointLightComponent;

let hasPointLightComponent = GameObjectAPI.hasGameObjectPointLightComponent;

let hasLightComponent = (gameObject, engineState) =>
  hasDirectionLightComponent(gameObject, engineState)
  || hasPointLightComponent(gameObject, engineState);

/* arcball camera */

let addArcballCameraControllerComponent = GameObjectAPI.addGameObjectArcballCameraControllerComponent;

let disposeArcballCameraControllerComponent = GameObjectAPI.disposeGameObjectArcballCameraControllerComponent;

let unsafeGetArcballCameraControllerComponent = GameObjectAPI.unsafeGetGameObjectArcballCameraControllerComponent;

let hasArcballCameraControllerComponent = GameObjectAPI.hasGameObjectArcballCameraControllerComponent;

/* all components */

let getAllLightMaterialComponents = GameObjectAPI.getAllLightMaterialComponents;

let getAllDirectionLightComponents = GameObjectAPI.getAllDirectionLightComponents;

let getAllBasicCameraViewComponents = GameObjectAPI.getAllBasicCameraViewComponents;

let getAllArcballCameraControllerComponents = GameObjectAPI.getAllArcballCameraControllerComponents;

let getAllPerspectiveCameraProjectionComponents = GameObjectAPI.getAllPerspectiveCameraProjectionComponents;

let getAllGeometryComponents = GameObjectAPI.getAllGeometryComponents;