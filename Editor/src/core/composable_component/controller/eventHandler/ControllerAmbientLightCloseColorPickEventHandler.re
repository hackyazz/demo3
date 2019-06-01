module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = string;
  type return = unit;

  let setUndoValueToCopiedEngineState = ((uiState, dispatchFunc), (), value) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> SceneEngineService.setAmbientLightColor(
         value |> Color.convert16HexToRGBArr,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);