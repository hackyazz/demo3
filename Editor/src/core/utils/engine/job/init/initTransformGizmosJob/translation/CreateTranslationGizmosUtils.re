let _createTranslationAxisGizmo = (color, engineState) => {
  let (engineState, axisGameObject) =
    GameObjectEngineService.create(engineState);

  let (engineState, coneGeometry) =
    GeometryEngineService.createConeGeometry(0.5, 1., 10, 10, engineState);

  let (engineState, cylinderGeometry) =
    GeometryEngineService.createCylinderGeometry(
      0.1,
      0.1,
      5.,
      5,
      5,
      engineState,
    );

  let (engineState, coneGameObject, coneMaterial, coneMeshRenderer) =
    engineState
    |> CreateTransformGizmosUtils.createBasicGameObject(coneGeometry);

  let (
    engineState,
    cylinderGameObject,
    cylinderMaterial,
    cylinderMeshRenderer,
  ) =
    engineState
    |> CreateTransformGizmosUtils.createBasicGameObject(cylinderGeometry);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("arrow", coneGameObject)
    |> GameObjectEngineService.setGameObjectName("line", cylinderGameObject);

  let engineState =
    engineState
    |> BasicMaterialEngineService.setColor(color, coneMaterial)
    /* |> BasicMaterialEngineService.setIsDepthTest(false, coneMaterial) */
    |> MeshRendererEngineService.setMeshRendererIsRender(
         coneMeshRenderer,
         false,
       )
    |> BasicMaterialEngineService.setColor(color, cylinderMaterial)
    /* |> BasicMaterialEngineService.setIsDepthTest(false, cylinderMaterial) */
    |> MeshRendererEngineService.setMeshRendererIsRender(
         cylinderMeshRenderer,
         false,
       );

  let engineState =
    engineState
    |> TransformGameObjectEngineService.setLocalPosition(
         cylinderGameObject,
         (0., 2.5, 0.),
       )
    |> TransformGameObjectEngineService.setLocalPosition(
         coneGameObject,
         (0., 5.5, 0.),
       );

  let engineState =
    engineState
    |> HierarchyGameObjectEngineService.addChild(
         axisGameObject,
         coneGameObject,
       )
    |> HierarchyGameObjectEngineService.addChild(
         axisGameObject,
         cylinderGameObject,
       );

  (
    engineState,
    axisGameObject,
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      axisGameObject,
      engineState,
    ),
  );
};

let _createTranslationPlaneGizmo = (color, engineState) => {
  let (engineState, planeGeometry) =
    GeometryEngineService.createPlaneGeometry(2., 2., 5, 5, engineState);

  let (engineState, planeGameObject, planeMaterial, planeMeshRenderer) =
    engineState
    |> CreateTransformGizmosUtils.createBasicGameObject(planeGeometry);

  let alpha = 0.3;

  let engineState =
    engineState
    |> BasicMaterialEngineService.setColor(color, planeMaterial)
    |> BasicMaterialEngineService.setAlpha(planeMaterial, alpha)
    |> MeshRendererEngineService.setMeshRendererIsRender(
         planeMeshRenderer,
         false,
       );

  (
    engineState,
    planeGameObject,
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      planeGameObject,
      engineState,
    ),
  );
};

let _createAxisGizmos = engineState => {
  let (engineState, xAxisGizmo, xAxisTransform) =
    _createTranslationAxisGizmo(
      DataTranslationGizmoSceneViewEditorService.getXAxisColor(),
      engineState,
    );
  let (engineState, yAxisGizmo, yAxisTransform) =
    _createTranslationAxisGizmo(
      DataTranslationGizmoSceneViewEditorService.getYAxisColor(),
      engineState,
    );

  let (engineState, zAxisGizmo, zAxisTransform) =
    _createTranslationAxisGizmo(
      DataTranslationGizmoSceneViewEditorService.getZAxisColor(),
      engineState,
    );

  let engineState =
    engineState
    |> TransformEngineService.setLocalEulerAngles(
         (0., 0., (-90.)),
         xAxisTransform,
       )
    |> TransformEngineService.setLocalEulerAngles(
         (90., 0., 0.),
         zAxisTransform,
       );

  (engineState, (xAxisGizmo, yAxisGizmo, zAxisGizmo));
};

let _createPlaneGizmos = engineState => {
  let (engineState, xyPlaneGizmo, xyPlaneTransform) =
    _createTranslationPlaneGizmo(
      DataTranslationGizmoSceneViewEditorService.getXYPlaneColor(),
      engineState,
    );

  let (engineState, xzPlaneGizmo, xzPlaneTransform) =
    _createTranslationPlaneGizmo(
      DataTranslationGizmoSceneViewEditorService.getXZPlaneColor(),
      engineState,
    );

  let (engineState, yzPlaneGizmo, yzPlaneTransform) =
    _createTranslationPlaneGizmo(
      DataTranslationGizmoSceneViewEditorService.getYZPlaneColor(),
      engineState,
    );

  let engineState =
    engineState
    |> TransformEngineService.setLocalEulerAngles(
         (0., 90., 0.),
         yzPlaneTransform,
       )
    |> TransformEngineService.setLocalEulerAngles(
         (90., 0., 0.),
         xzPlaneTransform,
       );

  (engineState, (xyPlaneGizmo, xzPlaneGizmo, yzPlaneGizmo));
};

let createTranslationGizmos = engineState => {
  let (engineState, (xAxisGizmo, yAxisGizmo, zAxisGizmo)) =
    _createAxisGizmos(engineState);

  let (engineState, (xyPlaneGizmo, xzPlaneGizmo, yzPlaneGizmo)) =
    _createPlaneGizmos(engineState);

  let (engineState, wholeGizmo) =
    GameObjectEngineService.create(engineState);

  let engineState =
    engineState
    |> HierarchyGameObjectEngineService.addChild(wholeGizmo, zAxisGizmo)
    |> HierarchyGameObjectEngineService.addChild(wholeGizmo, yAxisGizmo)
    |> HierarchyGameObjectEngineService.addChild(wholeGizmo, xAxisGizmo)
    |> HierarchyGameObjectEngineService.addChild(wholeGizmo, xyPlaneGizmo)
    |> HierarchyGameObjectEngineService.addChild(wholeGizmo, xzPlaneGizmo)
    |> HierarchyGameObjectEngineService.addChild(wholeGizmo, yzPlaneGizmo);

  (
    engineState,
    wholeGizmo,
    (xAxisGizmo, yAxisGizmo, zAxisGizmo),
    (xyPlaneGizmo, xzPlaneGizmo, yzPlaneGizmo),
  );
};