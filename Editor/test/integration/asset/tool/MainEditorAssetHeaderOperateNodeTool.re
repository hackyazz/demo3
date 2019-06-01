let removeNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~nodeId,
      (),
    ) => {
  MainEditorAssetNodeTool.setCurrentNodeId(nodeId);

  MainEditorAssetHeader.Method.removeAssetNode(
    (uiState, dispatchFunc),
    (),
    (),
  );
};

let removeTextureNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~textureNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~uiState, ~nodeId=textureNodeId, ());

let removeMaterialNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~materialNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~uiState, ~nodeId=materialNodeId, ());

let removeFolderNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~folderNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~uiState, ~nodeId=folderNodeId, ());

let removeWDBNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~wdbNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~uiState, ~nodeId=wdbNodeId, ());

let addFolder =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorAssetHeader.Method.addFolder((uiState, dispatchFunc), (), ());

let addMaterial =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorAssetHeader.Method.addMaterial((uiState, dispatchFunc), (), ());