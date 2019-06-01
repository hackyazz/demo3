/* open EditorType;

   open SceneViewType; */

/* TransformEngineService.getPosition(
     GameObjectComponentEngineService.unsafeGetTransformComponent(
       SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
       engineState,
     ),
     engineState,
   ); */

/* let _isSelectCircleNotVisiblePart =
     (intersectPointInCircle,  cameraPosInLocalCoordSystem) =>
   Vector3Service.dot(
     Wonderjs.Vector3Service.normalize(
       Wonderjs.Vector3Service.sub(
         Wonderjs.Vector3Type.Float,
         (0., 0., 0.),
         intersectPointInCircle,
       ),
     ),
     Wonderjs.Vector3Service.sub(
       Wonderjs.Vector3Type.Float,
       cameraPosInLocalCoordSystem,
       intersectPointInCircle,
     ),
   )
   >= 0.0; */

let _isSelectCircleNotVisiblePart =
    (intersectPointInCircle, centerPoint, cameraPos) =>
  Vector3Service.dot(
    Wonderjs.Vector3Service.normalize(
      Wonderjs.Vector3Service.sub(
        Wonderjs.Vector3Type.Float,
        centerPoint,
        intersectPointInCircle,
      ),
    ),
    Wonderjs.Vector3Service.sub(
      Wonderjs.Vector3Type.Float,
      cameraPos,
      intersectPointInCircle,
    ),
  )
  >= 0.0;

let _isIntersectWithCircle = (intersectPoint, editorState, engineState) => {
  let expandFactor = 0.2;
  let radius =
    DataRotationGizmoSceneViewEditorService.getRadius()
    *. ComputeTransformGizmoScaleUtils.getScaleFactor(
         editorState,
         engineState,
       );

  let lengthToCenter =
    Vector3Service.length(
      Wonderjs.Vector3Service.sub(
        Wonderjs.Vector3Type.Float,
        intersectPoint,
        CircleRotationGizmosUtils.getCenterPoint(editorState, engineState),
      ),
    );

  lengthToCenter <= radius
  *. (1. +. expandFactor)
  && lengthToCenter >= radius
  *. (1. -. expandFactor);
};

let _isSelectCircle = (intersectXYPlanePoint, editorState, engineState) =>
  switch (intersectXYPlanePoint) {
  | None => false
  | Some(intersectPoint) =>
    _isSelectCircleNotVisiblePart(
      intersectPoint,
      CircleRotationGizmosUtils.getCenterPoint(editorState, engineState),
      CameraPosUtils.getCameraPos(editorState, engineState),
    ) ?
      false : _isIntersectWithCircle(intersectPoint, editorState, engineState)
  };

let _selectCircle =
    (
      intersectPlanePoint,
      (setCurrentGizmoColorFunc, onlySelectCircleGizmoFunc),
      editorState,
      engineState,
    ) => {
  let editorState =
    editorState
    |> onlySelectCircleGizmoFunc
    |> AngleRotationGizmoSceneViewEditorService.setDragStartPoint(
         intersectPlanePoint,
       );

  let engineState = setCurrentGizmoColorFunc(editorState, engineState);

  (editorState, engineState);
};

let selectRotationGizmo = (event, editorState, engineState) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let ray =
    RayUtils.createPerspectiveCameraRayFromEvent(
      event,
      cameraGameObject,
      (editorState, engineState),
    );

  let intersectXYPlanePoint =
    RayIntersectUtils.checkIntersectPlane(
      CircleRotationGizmosUtils.buildXYPlane(editorState, engineState),
      ray,
    );

  !
    ComputeRotationGizmosUtils.isGizmoUnUsed(
      SceneViewType.XYCircle,
      editorState,
      engineState,
    )
  && _isSelectCircle(intersectXYPlanePoint, editorState, engineState) ?
    _selectCircle(
      intersectXYPlanePoint |> OptionService.unsafeGet,
      (
        CurrentTransformGizmosUtils.setCurrentGizmoColor(
          GameObjectEngineService.getAllBasicMaterials(
            HierarchyGameObjectEngineService.getAllGameObjects(
              OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo(
                editorState,
              ),
              engineState,
            ),
            engineState,
          ),
        ),
        SelectRotationGizmoSceneViewEditorService.onlySelectXYCircleGizmo,
      ),
      editorState,
      engineState,
    ) :
    {
      let intersectXZPlanePoint =
        RayIntersectUtils.checkIntersectPlane(
          CircleRotationGizmosUtils.buildXZPlane(editorState, engineState),
          ray,
        );

      !
        ComputeRotationGizmosUtils.isGizmoUnUsed(
          SceneViewType.XZCircle,
          editorState,
          engineState,
        )
      && _isSelectCircle(intersectXZPlanePoint, editorState, engineState) ?
        _selectCircle(
          intersectXZPlanePoint |> OptionService.unsafeGet,
          (
            CurrentTransformGizmosUtils.setCurrentGizmoColor(
              GameObjectEngineService.getAllBasicMaterials(
                HierarchyGameObjectEngineService.getAllGameObjects(
                  OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXZCircleGizmo(
                    editorState,
                  ),
                  engineState,
                ),
                engineState,
              ),
            ),
            SelectRotationGizmoSceneViewEditorService.onlySelectXZCircleGizmo,
          ),
          editorState,
          engineState,
        ) :
        {
          let intersectYZPlanePoint =
            RayIntersectUtils.checkIntersectPlane(
              CircleRotationGizmosUtils.buildYZPlane(
                editorState,
                engineState,
              ),
              ray,
            );

          !
            ComputeRotationGizmosUtils.isGizmoUnUsed(
              SceneViewType.YZCircle,
              editorState,
              engineState,
            )
          && _isSelectCircle(intersectYZPlanePoint, editorState, engineState) ?
            _selectCircle(
              intersectYZPlanePoint |> OptionService.unsafeGet,
              (
                CurrentTransformGizmosUtils.setCurrentGizmoColor(
                  GameObjectEngineService.getAllBasicMaterials(
                    HierarchyGameObjectEngineService.getAllGameObjects(
                      OperateRotationGizmoSceneViewEditorService.unsafeGetRotationYZCircleGizmo(
                        editorState,
                      ),
                      engineState,
                    ),
                    engineState,
                  ),
                ),
                SelectRotationGizmoSceneViewEditorService.onlySelectYZCircleGizmo,
              ),
              editorState,
              engineState,
            ) :
            (
              editorState
              |> SelectRotationGizmoSceneViewEditorService.markNotSelectAnyRotationGizmo,
              engineState,
            );
        };
    };
};