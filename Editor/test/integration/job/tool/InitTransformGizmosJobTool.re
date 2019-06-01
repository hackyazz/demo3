let prepareStateAndView = (~sandbox, ~viewWidth, ~viewHeight) => {
  MainEditorSceneTool.initStateWithJob(
    ~sandbox,
    ~isInitJob=false,
    ~noWorkerJobRecord=
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
              "name": "init_transform_gizmos"
            },
            {
              "name": "init_picking"
            }
          ]
        }
      ]
            |},
        ~loopPipelines=
          {|
              [
    {
        "name": "default",
        "jobs": [
            {
                "name": "update_transform_gizmos"
            },
            {
                "name": "update_transform"
            }
        ]
    }
]
              |},
        (),
      ),
    (),
  );

  PrepareRenderViewJobTool.setViewRect(
    ~width=viewWidth * 2,
    ~height=viewHeight,
    (),
  );
};

let prepareMouseEvent =
    (
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      ~offsetParent=Js.Nullable.undefined,
      (),
    ) => {
  prepareStateAndView(~sandbox, ~viewWidth, ~viewHeight);

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

let prepareOneGameObject =
    (
      ~createGameObjectFunc=InitPickingJobTool.createSphere,
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
  let ((viewWidth, viewHeight), (offsetLeft, offsetTop)) =
    prepareMouseEvent(
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      (),
    );

  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let (editCamera, (editorState, engineState)) =
    InitPickingJobTool.prepareCamera(
      cameraPos,
      (viewWidth, viewHeight),
      (editorState, engineState),
    );

  let (engineState, gameObject1) =
    InitPickingJobTool.prepareGameObject(
      gameObjectPos,
      gameObjectEulerAngles,
      createGameObjectFunc,
      engineState,
    );

  InitPickingJobTool.prepareState(sandbox, editorState, engineState);

  gameObject1;
};

let getCurrentSceneTreeNodePosition = () => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  TransformEngineService.getPosition(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    ),
    engineState,
  )
  |> Vector3Service.truncate(3);
};

let getGameObjectLocalRotation = gameObject => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  TransformEngineService.getLocalRotation(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  )
  |> TranasformToolEngine.truncateRotation(~rotation=_, ());
};

let getGameObjectEulerAngles = gameObject => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  TransformEngineService.getEulerAngles(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  )
  |> Vector3Service.truncate(1);
};

let getGameObjectLocalEulerAngles = gameObject => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  TransformEngineService.getLocalEulerAngles(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  )
  |> Vector3Service.truncate(1);
};

let getGameObjectLocalScale = gameObject => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  TransformEngineService.getLocalScale(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  )
  |> Vector3Service.truncate(1);
};

let getCurrentSceneTreeNodeEulerAngles = () => {
  let editorState = StateEditorService.getState();
  SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState)
  |> getGameObjectEulerAngles;
};

let getCurrentSceneTreeNodeLocalRotation = () => {
  let editorState = StateEditorService.getState();
  SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState)
  |> getGameObjectLocalRotation;
};

let getCurrentSceneTreeNodeLocalScale = () => {
  let editorState = StateEditorService.getState();
  SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState)
  |> getGameObjectLocalScale;
};

let createTransformGizmos = ((editorState, engineState)) =>
  InitTransformGizmosJob._createTransformGizmos((editorState, engineState));