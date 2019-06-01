open InspectorComponentType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectPrimitiveType.gameObject;
  type dataTuple = componentType;
  type return = unit;

  let _isRemoveLight = type_ => type_ === Light;

  let handleSelfLogic =
      ((uiState, dispatchFunc), currentSceneTreeNode, type_) => {
    let (editorState, engineState) =
      (StateEditorService.getState(), StateEngineService.unsafeGetState())
      |> InspectorRemoveComponentUtils.removeComponentByType(
           type_,
           currentSceneTreeNode,
         );

    editorState |> StateEditorService.setState |> ignore;
    engineState |> StateEngineService.setState |> ignore;

    _isRemoveLight(type_) ?
      {
        StateLogicService.getAndRefreshEngineState();

        SceneEngineService.clearShaderCacheAndReInitAllLightMaterials
        |> StateLogicService.getAndSetEngineState;
      } :
      ();

    StateLogicService.getAndRefreshEngineState();

    AddableComponentUtils.isNeedUpdateSceneTree(type_) ?
      dispatchFunc(
        AppStore.UpdateAction(
          Update([|UpdateStore.Inspector, UpdateStore.SceneTree|]),
        ),
      )
      |> ignore :
      dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
      |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);