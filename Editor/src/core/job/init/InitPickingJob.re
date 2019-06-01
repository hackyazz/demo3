let _checkIntersectMesh =
    (ray, (_, _, geometry, localToWorldMatrixTypeArray), engineState) =>
  MeshUtils.checkIntersectMesh(
    ray,
    /* TODO judge material->side */
    (geometry, localToWorldMatrixTypeArray, RayType.Back),
    engineState,
  )
  |> Js.Option.andThen((. intersectedPoint) =>
       Wonderjs.Vector3Service.transformMat4Tuple(
         intersectedPoint,
         localToWorldMatrixTypeArray,
       )
       |. Some
     );

let _isIntersectSphere =
    (
      ray,
      (_, _, geometry, localToWorldMatrixTypeArray),
      (editorState, engineState),
    ) =>
  RayIntersectUtils.isIntersectSphere(
    SphereShapeUtils.applyMatrix4(
      PickingEditorService.unsafeGetSphereShape(geometry, editorState),
      localToWorldMatrixTypeArray,
    ),
    ray,
  );

let _getDistanceToCamera = (intersectedPoint, cameraPos, engineState) =>
  Wonderjs.Vector3Service.sub(
    Wonderjs.Vector3Type.Float,
    intersectedPoint,
    cameraPos,
  )
  |> Vector3Service.length;

let _getTopOne = (cameraGameObject, engineState, intersectedDatas) => {
  let cameraPos =
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        cameraGameObject,
        engineState,
      ),
      engineState,
    );

  intersectedDatas
  |> Js.Array.sortInPlaceWith(
       ((_, intersectedPoint1), (_, intersectedPoint2)) =>
       _getDistanceToCamera(intersectedPoint1, cameraPos, engineState)
       -. _getDistanceToCamera(intersectedPoint2, cameraPos, engineState)
       |> NumberType.convertFloatToInt
     )
  |> ArrayService.getFirst
  |> Js.Option.map((. (gameObject, _)) => gameObject);
};

let _isCurrentSceneTreeNode = (gameObject, currentSceneTreeNodeOpt) =>
  switch (currentSceneTreeNodeOpt) {
  | None => false
  | Some(currentSceneTreeNode) => gameObject == currentSceneTreeNode
  };

let _findRootGameObject = (parentGameObject, rootGameObject, engineState) =>
  GameObjectEngineService.unsafeGetGameObjectIsRoot(
    parentGameObject,
    engineState,
  ) ?
    parentGameObject : rootGameObject;

let rec _find =
        (gameObject, rootGameObject, currentSceneTreeNodeOpt, engineState) =>
  switch (
    HierarchyGameObjectEngineService.getParentGameObject(
      gameObject,
      engineState,
    )
  ) {
  | None => rootGameObject
  | Some(parentGameObject) =>
    _isCurrentSceneTreeNode(parentGameObject, currentSceneTreeNodeOpt) ?
      rootGameObject :
      _find(
        parentGameObject,
        _findRootGameObject(parentGameObject, rootGameObject, engineState),
        currentSceneTreeNodeOpt,
        engineState,
      )
  };

let _findTopRootGameObject = ((editorState, engineState), gameObjectOpt) => {
  let currentSceneTreeNodeOpt =
    SceneTreeEditorService.getCurrentSceneTreeNode(editorState);

  gameObjectOpt
  |> Js.Option.map((. gameObject) =>
       _find(gameObject, gameObject, currentSceneTreeNodeOpt, engineState)
     );
};

let _getAllGameObjectData = engineState =>
  HierarchyGameObjectEngineService.getAllGameObjects(
    SceneEngineService.getSceneGameObject(engineState),
    engineState,
  )
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasGeometryComponent(
         gameObject,
         engineState,
       )
       && InspectorRenderGroupUtils.hasRenderGroupComponents(
            gameObject,
            engineState,
          )
     )
  |> Js.Array.map(gameObject => {
       let transform =
         GameObjectComponentEngineService.unsafeGetTransformComponent(
           gameObject,
           engineState,
         );
       (
         gameObject,
         transform,
         GameObjectComponentEngineService.unsafeGetGeometryComponent(
           gameObject,
           engineState,
         ),
         TransformEngineService.getLocalToWorldMatrixTypeArray(
           transform,
           engineState,
         ),
       );
     });

let _computeSphereShapeData = (allGameObjectData, (editorState, engineState)) =>
  allGameObjectData
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. editorState, (_, _, geometry, _)) =>
         switch (PickingEditorService.getSphereShape(geometry, editorState)) {
         | None =>
           PickingEditorService.setSphereShape(
             geometry,
             SphereShapeUtils.setFromPoints(
               GeometryEngineService.getGeometryVertices(
                 geometry,
                 engineState,
               ),
             ),
             editorState,
           )
         | Some(_) => editorState
         },
       editorState,
     );

let _findPickedOne = (event, allGameObjectData, (editorState, engineState)) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let ray =
    RayUtils.createPerspectiveCameraRayFromEvent(
      event,
      cameraGameObject,
      (editorState, engineState),
    );

  allGameObjectData
  |> Js.Array.filter(data =>
       _isIntersectSphere(ray, data, (editorState, engineState))
     )
  |> Js.Array.map(((gameObject, _, _, _) as data) =>
       (gameObject, _checkIntersectMesh(ray, data, engineState))
     )
  |> Js.Array.filter(((_, checkData)) => Js.Option.isSome(checkData))
  |> Js.Array.map(((gameObject, checkData)) =>
       (gameObject, OptionService.unsafeGet(checkData))
     )
  |> _getTopOne(cameraGameObject, engineState)
  |> _findTopRootGameObject((editorState, engineState));
};

let _isNotNeedPushToHistoryStack = pickedGameObjectOpt =>
  switch (pickedGameObjectOpt) {
  | None =>
    ! (
      SceneTreeEditorService.hasCurrentSceneTreeNode
      |> StateLogicService.getEditorState
    )
  | Some(pickedGameObject) =>
    switch (
      SceneTreeEditorService.getCurrentSceneTreeNode
      |> StateLogicService.getEditorState
    ) {
    | Some(currentSceneTreeNode)
        when currentSceneTreeNode === pickedGameObject =>
      true
    | _ => false
    }
  };

let _handleSceneTreeCurrentNodeAndRedoUndo =
    (pickedGameObjectOpt, engineState) => {
  engineState |> StateEngineService.setState |> ignore;

  let uiState = UIStateService.getState();
  let dispatchFunc = UIStateService.getDispatch();

  _isNotNeedPushToHistoryStack(pickedGameObjectOpt) ?
    SceneTreeSelectCurrentNodeEventHandler.CustomEventHandler.handleSelfLogic(
      (uiState, dispatchFunc),
      (),
      pickedGameObjectOpt,
    ) :
    SceneTreeSelectCurrentNodeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
      (uiState, dispatchFunc),
      (),
      pickedGameObjectOpt,
    );

  StateEngineService.unsafeGetState();
};

let _handlePickSuccess = (gameObject, engineState) =>
  engineState |> _handleSceneTreeCurrentNodeAndRedoUndo(Some(gameObject));

let _handlePickFail = engineState =>
  _handleSceneTreeCurrentNodeAndRedoUndo(None, engineState);

let _handlePicking = (event: EventType.customEvent, engineState) => {
  let editorState = StateEditorService.getState();

  let (editorState, pickedGameObject) =
    switch (
      PickIMGUIUtils.findPickedIMGUIGameObject(
        event,
        editorState,
        engineState,
      )
    ) {
    | Some(gameObject) => (editorState, Some(gameObject))
    | None =>
      let allGameObjectData = _getAllGameObjectData(engineState);

      let editorState =
        _computeSphereShapeData(
          allGameObjectData,
          (editorState, engineState),
        );

      (
        editorState,
        (editorState, engineState)
        |> _findPickedOne(event, allGameObjectData),
      );
    };

  editorState |> StateEditorService.setState |> ignore;

  let engineState =
    switch (pickedGameObject) {
    | None => _handlePickFail(engineState)
    | Some(gameObject) => _handlePickSuccess(gameObject, engineState)
    };

  let engineState = StateLogicService.renderWhenStop(engineState);

  (engineState, event);
};

let _isHandlePicking = (event, editorState) =>
  MouseEventService.isLeftMouseButton(event)
  && !
       SelectTransformGizmoSceneViewEditorService.isSelectAnyTransformGizmo(
         editorState,
       );

let initJob = (_, engineState) => {
  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointTapEventName(),
      ~handleFunc=
        (. event, engineState) =>
          _isHandlePicking(event, StateEditorService.getState()) ?
            _handlePicking(event, engineState) : (engineState, event),
      ~state=engineState,
      (),
    );

  engineState;
};