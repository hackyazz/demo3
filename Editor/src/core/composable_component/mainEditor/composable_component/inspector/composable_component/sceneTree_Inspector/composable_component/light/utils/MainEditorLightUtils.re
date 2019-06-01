open SelectType;

open MainEditorLightType;

let getLightOptions = () => [|
  {key: DirectionLight |> convertLightTypeToInt, value: "direction_light"},
  {key: PointLight |> convertLightTypeToInt, value: "point_light"},
|];

let isLightGameObject = (gameObject, engineState) =>
  GameObjectComponentEngineService.hasDirectionLightComponent(
    gameObject,
    engineState,
  )
  || GameObjectComponentEngineService.hasPointLightComponent(
       gameObject,
       engineState,
     );

let getLightTypeByGameObject = (gameObject, engineState) =>
  switch (
    GameObjectComponentEngineService.hasDirectionLightComponent(
      gameObject,
      engineState,
    ),
    GameObjectComponentEngineService.hasPointLightComponent(
      gameObject,
      engineState,
    ),
  ) {
  | (true, false) => DirectionLight
  | (false, true) => PointLight
  | _ =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j|gameObject:$gameObject should has light component|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let handleSpecificFuncByLightType =
    (lightType, (handleDirectionLightFunc, handlePointLightFunc)) => {
  let currentSceneTreeNode =
    SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;

  switch (lightType) {
  | DirectionLight => currentSceneTreeNode |> handleDirectionLightFunc
  | PointLight => currentSceneTreeNode |> handlePointLightFunc
  };
};

let getDirectionLightExceedMaxCountMessage = () =>
  LanguageUtils.getMessageLanguageDataByType(
    "direction-light-exceed",
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState,
  );

let getPointLightExceedMaxCountMessage = () =>
  LanguageUtils.getMessageLanguageDataByType(
    "point-light-exceed",
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState,
  );

let isLightExceedMaxCountByType = (targetLightType, engineState) =>
  switch (targetLightType) {
  | DirectionLight => (
      getDirectionLightExceedMaxCountMessage(),
      engineState |> DirectionLightEngineService.isMaxCount,
    )

  | PointLight => (
      getPointLightExceedMaxCountMessage(),
      engineState |> PointLightEngineService.isMaxCount,
    )
  };

let isLightExceedMaxCountByCount =
    ((directionLightCount, pointLightCount), engineState) =>
  DirectionLightEngineService.isMaxCountByCount(
    directionLightCount,
    engineState,
  ) ?
    (getDirectionLightExceedMaxCountMessage(), true) :
    PointLightEngineService.isMaxCountByCount(pointLightCount, engineState) ?
      (getPointLightExceedMaxCountMessage(), true) : ("", false);

let getLightCount = (gameObject, engineState) =>
  HierarchyGameObjectEngineService.getAllGameObjects(gameObject, engineState)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (directionLightCount, pointLightCount), gameObject) => (
         GameObjectComponentEngineService.hasDirectionLightComponent(
           gameObject,
           engineState,
         ) ?
           directionLightCount |> succ : directionLightCount,
         GameObjectComponentEngineService.hasPointLightComponent(
           gameObject,
           engineState,
         ) ?
           pointLightCount |> succ : pointLightCount,
       ),
       (0, 0),
     );

let _getOperateSourceLightFunc = (lightType, gameObject, engineState) =>
  switch (lightType) {
  | DirectionLight => (
      engineState
      |> GameObjectComponentEngineService.unsafeGetDirectionLightComponent(
           gameObject,
         ),
      OperateDirectionLightLogicService.disposeDirectionLight,
    )
  | PointLight => (
      engineState
      |> GameObjectComponentEngineService.unsafeGetPointLightComponent(
           gameObject,
         ),
      OperatePointLightLogicService.disposePointLight,
    )
  };

let _getOperateTargetLightFunc = (lightType, engineState) =>
  switch (lightType) {
  | DirectionLight => (
      OperateDirectionLightLogicService.createDirectionLight(engineState),
      OperateDirectionLightLogicService.addDirectionLight,
    )
  | PointLight => (
      OperatePointLightLogicService.createPointLight(engineState),
      OperatePointLightLogicService.addPointLight,
    )
  };

let replaceLightByType = (sourceLightType, targetLightType) => {
  let gameObject =
    SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let (message, isMaxCount) =
    isLightExceedMaxCountByType(targetLightType, engineState);

  isMaxCount ?
    ConsoleUtils.warn(message, editorState) :
    {
      let (sourceLight, disposeSourceLightFunc) =
        _getOperateSourceLightFunc(sourceLightType, gameObject, engineState);

      let ((engineState, targetLight), addTargetLightFunc) =
        _getOperateTargetLightFunc(targetLightType, engineState);

      let engineState =
        engineState
        |> disposeSourceLightFunc(gameObject, sourceLight)
        |> addTargetLightFunc(gameObject, targetLight)
        |> GameObjectEngineService.initGameObject(gameObject);

      StateLogicService.refreshEngineState(engineState);

      SceneEngineService.clearShaderCacheAndReInitAllLightMaterials
      |> StateLogicService.getAndRefreshEngineStateWithFunc;
    };
};

let disposeLightByLightType =
    (lightType, currentSceneTreeNode, (editorState, engineState)) =>
  switch (lightType) {
  | DirectionLight =>
    (editorState, engineState)
    |> GameObjectLogicService.disposeDirectionLight(
         currentSceneTreeNode,
         engineState
         |> GameObjectComponentEngineService.unsafeGetDirectionLightComponent(
              currentSceneTreeNode,
            ),
       )

  | PointLight =>
    (editorState, engineState)
    |> GameObjectLogicService.disposePointLight(
         currentSceneTreeNode,
         engineState
         |> GameObjectComponentEngineService.unsafeGetPointLightComponent(
              currentSceneTreeNode,
            ),
       )
  };