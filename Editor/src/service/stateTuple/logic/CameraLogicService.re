/* let _markLastSceneCameraToBeActive =
     (gameObject, targetRemoveBasicCameraView, editorState, engineState) =>
   switch (
     engineState
     |> SceneEngineService.getSceneAllBasicCameraViews
     |> Js.Array.filter(component => component != targetRemoveBasicCameraView)
     |> ArrayService.getLast
   ) {
   | None => (
       GameViewEditorService.removeActivedBasicCameraView(editorState),
       engineState,
     )
   | Some(lastBasicCameraView) =>
     let engineState =
       StateEditorService.getIsRun() ?
         ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponentForGameView(
           lastBasicCameraView
           |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
                _,
                engineState,
              ),
           engineState,
         ) :
         engineState;

     (
       GameViewEditorService.setActivedBasicCameraView(
         lastBasicCameraView,
         editorState,
       ),
       engineState,
     );
   }; */

let createCamera = (editorState, engineState) => {
  let (editorState, (engineState, gameObject)) =
    GameObjectLogicService.createGameObject((editorState, engineState));
  let (engineState, cameraComponentRecord) =
    CameraEngineService.createCameraGroup(engineState);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("Camera", gameObject);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addCameraGroup(
         gameObject,
         cameraComponentRecord,
       );

  (editorState, engineState, gameObject);
};
let unbindArcballCameraControllerEventIfHasComponentForGameView =
    (gameObject, editorState, engineState) => {
  let targetRemoveBasicCameraView =
    engineState
    |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
         gameObject,
       );

  GameViewEditorService.isActiveBasicCameraView(
    targetRemoveBasicCameraView,
    editorState,
  ) ?
    {
      let engineState =
        StateEditorService.getIsRun() ?
          ArcballCameraEngineService.unbindArcballCameraControllerEventIfHasComponentForGameView(
            gameObject,
            engineState,
          ) :
          engineState;

      let editorState =
        GameViewEditorService.removeActivedBasicCameraView(editorState);

      /* _markLastSceneCameraToBeActive(
           gameObject,
           targetRemoveBasicCameraView,
           editorState,
           engineState,
         ); */

      (editorState, engineState);
    } :
    (editorState, engineState);
};
