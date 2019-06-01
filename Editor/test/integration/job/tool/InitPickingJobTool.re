let prepareStateAndView =
    (
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~noWorkerJobRecord,
      ~isInitState=true,
      (),
    ) => {
  isInitState ?
    MainEditorSceneTool.initStateWithJob(
      ~sandbox,
      ~isInitJob=false,
      ~noWorkerJobRecord,
      (),
    ) :
    ();

  PrepareRenderViewJobTool.setViewRect(
    ~width=viewWidth * 2,
    ~height=viewHeight,
    (),
  );
};

let prepareMouseEvent =
    (
      ~sandbox,
      ~noWorkerJobRecord,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      ~offsetParent=Js.Nullable.undefined,
      ~isInitState=true,
      (),
    ) => {
  prepareStateAndView(
    ~sandbox,
    ~viewWidth,
    ~viewHeight,
    ~noWorkerJobRecord,
    ~isInitState,
    (),
  );

  MouseEventTool.prepareWithState(
    ~sandbox,
    ~canvasWidth=viewWidth,
    ~canvasHeight=viewHeight,
    ~offsetLeft,
    ~offsetTop,
    ~offsetParent,
    ~engineState=StateEngineService.unsafeGetState(),
    (),
  );
  MouseEventTool.prepareForPointerLock(sandbox);

  MouseEventTool.setPointerLocked(.);

  ((viewWidth, viewHeight), (offsetLeft, offsetTop));
};

let createGameObject = (geometry, engineState) => {
  let (engineState, lightMaterial) =
    LightMaterialEngineService.create(engineState);

  let (engineState, obj) = engineState |> GameObjectEngineService.create;

  let transform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      obj,
      engineState,
    );

  let (engineState, meshRenderer) =
    MeshRendererEngineService.create(engineState);
  let renderGroup =
    RenderGroupEngineService.buildRenderGroup(meshRenderer, lightMaterial);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("gameObject", obj)
    |> GameObjectComponentEngineService.addGeometryComponent(obj, geometry)
    |> RenderGroupEngineService.addRenderGroupComponents(
         obj,
         renderGroup,
         (
           GameObjectComponentEngineService.addMeshRendererComponent,
           GameObjectComponentEngineService.addLightMaterialComponent,
         ),
       );

  (engineState, obj);
};

let createSphere = engineState => {
  let (engineState, geometry) =
    GeometryEngineService.createSphereGeometry(1., 10, engineState);

  createGameObject(geometry, engineState);
};

let createCube = engineState => {
  let (engineState, geometry) =
    GeometryEngineService.createCubeGeometry(engineState);

  createGameObject(geometry, engineState);
};

let prepareCamera =
    (cameraPos, (viewWidth, viewHeight), (editorState, engineState)) => {
  let (editorState, engineState, editCamera) =
    CameraLogicService.createCamera(editorState, engineState);

  let editCameraPerspectiveCameraProjection =
    GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
      editCamera,
      engineState,
    );

  let engineState =
    engineState
    |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraAspect(
         (viewWidth |> NumberType.convertIntToFloat)
         /. (viewHeight |> NumberType.convertIntToFloat),
         editCameraPerspectiveCameraProjection,
       )
    |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraFovy(
         60.,
         editCameraPerspectiveCameraProjection,
       )
    |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraNear(
         0.1,
         editCameraPerspectiveCameraProjection,
       )
    |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraFar(
         50000.,
         editCameraPerspectiveCameraProjection,
       );

  let editorState =
    editorState |> SceneViewEditorService.setEditCamera(editCamera);

  let editCameraTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      editCamera,
      engineState,
    );

  let engineState =
    engineState
    |> TransformEngineService.setLocalPosition(cameraPos, editCameraTransform);

  let engineState =
    engineState
    |> TransformEngineService.lookAt(editCameraTransform, (0., 0., 0.));

  (editCamera, (editorState, engineState));
};

let prepareGameObject =
    (gameObjectPos, gameObjectEulerAngles, createGameObjectFunc, engineState) => {
  let (engineState, gameObject) = createGameObjectFunc(engineState);

  let gameObjectTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    );

  let sceneGameObject = SceneEngineService.getSceneGameObject(engineState);

  let engineState =
    engineState
    |> HierarchyGameObjectEngineService.addChild(sceneGameObject, gameObject);

  let engineState =
    engineState
    |> TransformEngineService.setLocalPosition(
         gameObjectPos,
         gameObjectTransform,
       )
    |> TransformEngineService.setLocalEulerAngles(
         gameObjectEulerAngles,
         gameObjectTransform,
       );

  /* let engineState =
     engineState
     |> TransformEngineService.setLocalPosition(
          gameObjectPos,
          gameObjectTransform,
        )
     |> TransformEngineService.setLocalEulerAngles(
          gameObjectEulerAngles,
          gameObjectTransform,
        ); */

  (engineState, gameObject);
};

let prepareState = (sandbox, editorState, engineState) => {
  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);

  StateLogicService.getAndRefreshEngineState();

  SceneTreeEditorService.clearCurrentSceneTreeNode
  |> StateLogicService.getAndSetEditorState;
};

let triggerPicking = (~eventButton=1, ~sandbox, ~pageX, ~pageY, ()) => {
  let target = EventTool.buildCanvasTarget();

  EventTool.triggerDomEvent(
    "mousedown",
    EventTool.getBody(),
    MouseEventTool.buildMouseDomEvent(
      ~pageX,
      ~pageY,
      ~target,
      ~which=eventButton,
      (),
    ),
  );
  EventTool.triggerDomEvent(
    "mouseup",
    EventTool.getBody(),
    MouseEventTool.buildMouseDomEvent(
      ~pageX,
      ~pageY,
      ~target,
      ~which=eventButton,
      (),
    ),
  );
  EventTool.triggerDomEvent(
    "click",
    EventTool.getBody(),
    MouseEventTool.buildMouseDomEvent(
      ~pageX,
      ~pageY,
      ~target,
      ~which=eventButton,
      (),
    ),
  );
};

let triggerPickingAndRestore = (~eventButton=1, ~sandbox, ~pageX, ~pageY, ()) => {
  triggerPicking(~eventButton, ~sandbox, ~pageX, ~pageY, ());

  EventTool.restore();
};

let pickOne = gameObject => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;

  let editorState = StateEditorService.getState();

  SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState)
  |> expect == gameObject;
};

let notPick = () => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;

  let editorState = StateEditorService.getState();

  SceneTreeEditorService.getCurrentSceneTreeNode(editorState)
  |> Js.Option.isNone
  |> expect == true;
};

let buildDefaultNoWorkerJobRecord = () =>
  NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
    ~initPipelines=
      {|
            [
        {
          "name": "default",
          "jobs": [
            {
              "name": "init_event_for_editor"
            },
            {
              "name": "init_camera"
            },
            {
              "name": "init_picking"
            }
          ]
        }
      ]
            |},
    (),
  );

let prepareWithoutState =
    (
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      ~cameraPos,
      ~isInitState=true,
      ~noWorkerJobRecord=buildDefaultNoWorkerJobRecord(),
      (),
    ) => {
  let ((viewWidth, viewHeight), (offsetLeft, offsetTop)) =
    prepareMouseEvent(
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      ~noWorkerJobRecord,
      ~isInitState,
      (),
    );

  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let (editCamera, (editorState, engineState)) =
    prepareCamera(
      cameraPos,
      (viewWidth, viewHeight),
      (editorState, engineState),
    );

  (editorState, engineState);
};

let prepare =
    (
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      ~cameraPos,
      ~isInitState=true,
      ~noWorkerJobRecord=buildDefaultNoWorkerJobRecord(),
      (),
    ) => {
  let (editorState, engineState) =
    prepareWithoutState(
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      ~cameraPos,
      ~isInitState=true,
      ~noWorkerJobRecord=buildDefaultNoWorkerJobRecord(),
      (),
    );

  prepareState(sandbox, editorState, engineState);
};

let prepareOneGameObject =
    (
      ~createGameObjectFunc=createSphere,
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      ~cameraPos,
      ~gameObjectPos,
      ~gameObjectEulerAngles,
      (),
    ) => {
  prepare(
    ~sandbox,
    ~viewWidth,
    ~viewHeight,
    ~offsetLeft,
    ~offsetTop,
    ~cameraPos,
    (),
  );

  let engineState = StateEngineService.unsafeGetState();
  let (engineState, gameObject1) =
    prepareGameObject(
      gameObjectPos,
      gameObjectEulerAngles,
      createGameObjectFunc,
      engineState,
    );

  /* prepareState(sandbox, editorState, engineState); */

  gameObject1;
};

let prepareTwoGameObjects =
    (
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      ~cameraPos,
      ~gameObject1Pos,
      ~gameObject1EulerAngles,
      ~gameObject2Pos,
      ~gameObject2EulerAngles,
      ~createGameObjectFunc1=createSphere,
      ~createGameObjectFunc2=createSphere,
      ~noWorkerJobRecord=buildDefaultNoWorkerJobRecord(),
      (),
    ) => {
  let ((viewWidth, viewHeight), (offsetLeft, offsetTop)) =
    prepareMouseEvent(
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      ~noWorkerJobRecord,
      (),
    );

  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let (editCamera, (editorState, engineState)) =
    prepareCamera(
      cameraPos,
      (viewWidth, viewHeight),
      (editorState, engineState),
    );

  let (engineState, gameObject1) =
    prepareGameObject(
      gameObject1Pos,
      gameObject1EulerAngles,
      createGameObjectFunc1,
      engineState,
    );

  let (engineState, gameObject2) =
    prepareGameObject(
      gameObject2Pos,
      gameObject2EulerAngles,
      createGameObjectFunc2,
      engineState,
    );

  prepareState(sandbox, editorState, engineState);

  (gameObject1, gameObject2);
};