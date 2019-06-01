let _addComponent = ((uiState, dispatchFunc), gameObject, type_) =>
  AddableComponent.Method.addSpecificComponent(
    (uiState, dispatchFunc),
    gameObject,
    type_,
  );

let addDirectionLightComponent =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _addComponent((uiState, dispatchFunc), gameObject, "Light");

let addCameraGroupComponent =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _addComponent((uiState, dispatchFunc), gameObject, "CameraGroup");

let addGeometryComponent =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _addComponent((uiState, dispatchFunc), gameObject, "Geometry");

let addRenderGroupComponent =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _addComponent((uiState, dispatchFunc), gameObject, "RenderGroup");

let addArcballCameraControllerComponent =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _addComponent(
    (uiState, dispatchFunc),
    gameObject,
    "ArcballCameraController",
  );

let buildTwoAddedArcballCameraControllerCamera = sandbox => {
  let (camera1, camera2, cube) =
    SceneTreeTool.buildTwoCameraSceneGraphToEngine(sandbox);

  camera1 |> GameObjectTool.setCurrentSceneTreeNode;

  addArcballCameraControllerComponent();

  camera2 |> GameObjectTool.setCurrentSceneTreeNode;
  addArcballCameraControllerComponent();

  (camera1, camera2);
};