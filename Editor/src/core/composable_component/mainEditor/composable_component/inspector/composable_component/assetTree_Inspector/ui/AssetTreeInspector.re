open NodeAssetType;

open FileType;

open NodeAssetType;

type state = {
  inputValue: string,
  originalName: string,
};

type action =
  | Blur
  | Change(string);

module Method = {
  let change = event => {
    let inputVal =
      ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value;
    Change(inputVal);
  };

  let renameAssetTreeNode = AssetRenameNodeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let buildFolderComponent = (state, send, languageType, currentNodeId, _, _) =>
    <div className="inspector-asset-folder">
      <h1>
        {
          DomHelper.textEl(
            LanguageUtils.getAssetLanguageDataByType(
              "asset-folder",
              languageType,
            ),
          )
        }
      </h1>
      <hr />
      <div className="inspector-item">
        <div className="item-header">
          <span> {DomHelper.textEl("Name")} </span>
        </div>
        <div className="item-content">
          <input
            className="input-component float-input"
            type_="text"
            value={state.inputValue}
            disabled={
              NodeAssetService.isIdEqual(
                RootTreeAssetEditorService.getRootNode
                |> StateLogicService.getEditorState
                |> NodeAssetService.getNodeId(~node=_),
                currentNodeId,
              )
            }
            onChange={_e => send(change(_e))}
            onBlur={_e => send(Blur)}
          />
        </div>
      </div>
    </div>;

  let buildTextureComponent =
      (
        (uiState, dispatchFunc),
        state,
        currentNodeId,
        {textureComponent}: NodeAssetType.textureNodeData,
      ) =>
    <TextureInspector
      uiState
      dispatchFunc
      name={state.inputValue}
      textureComponent
      renameFunc={
        renameAssetTreeNode((uiState, dispatchFunc), currentNodeId)
      }
    />;

  let buildMaterialComponent =
      (
        (uiState, dispatchFunc),
        state,
        currentNodeId,
        {type_, materialComponent}: NodeAssetType.materialNodeData,
      ) =>
    <MaterialInspector
      uiState
      dispatchFunc
      currentNodeId
      name={state.inputValue}
      type_
      materialComponent
      renameFunc={
        renameAssetTreeNode((uiState, dispatchFunc), currentNodeId)
      }
    />;

  let buildWDBComponent = (state, send, _, _) =>
    <div className="inspector-asset-wdb">
      <h1> {DomHelper.textEl("Model")} </h1>
      <hr />
      <div className="inspector-item">
        <div className="item-header">
          <span className=""> {DomHelper.textEl("Name:")} </span>
        </div>
        <div className="item-content">
          <input
            className="input-component float-input"
            type_="text"
            value={state.inputValue}
            onChange={_e => send(change(_e))}
            onBlur={_e => send(Blur)}
          />
        </div>
      </div>
    </div>;

  let showAssetNodeComponent =
      (
        reduxTuple,
        currentNode,
        languageType,
        {state, send}: ReasonReact.self('a, 'b, 'c),
      ) =>
    NodeAssetService.handleNode(
      ~node=currentNode,
      ~textureNodeFunc=buildTextureComponent(reduxTuple, state),
      ~materialNodeFunc=buildMaterialComponent(reduxTuple, state),
      ~wdbNodeFunc=buildWDBComponent(state, send),
      ~folderNodeFunc=buildFolderComponent(state, send, languageType),
    );

  let initFolderName = (currentNodeId, currentNodeData, _) => {
    let folderName = FolderNodeAssetService.getNodeName(currentNodeData);

    {inputValue: folderName, originalName: folderName};
  };

  let initTextureName = (engineState, _, {textureComponent}) => {
    let baseName =
      NodeNameAssetLogicService.getTextureNodeName(
        ~texture=textureComponent,
        ~engineState,
      );

    {inputValue: baseName, originalName: baseName};
  };

  let initMaterialName = (engineState, _, {materialComponent, type_}) => {
    let baseName =
      NodeNameAssetLogicService.getMaterialNodeName(
        ~material=materialComponent,
        ~type_,
        ~engineState,
      );

    {inputValue: baseName, originalName: baseName};
  };
  let initWDBName = (currentNodeId, currentNodeData) => {
    let baseName =
      NodeNameAssetLogicService.getWDBNodeName(
        WDBNodeAssetService.buildNodeByNodeData(
          ~nodeId=currentNodeId,
          ~nodeData=currentNodeData,
        ),
      );

    {inputValue: baseName, originalName: baseName};
  };
};

let component = ReasonReact.reducerComponent("AssetTreeInspector");

let reducer = ((uiState, dispatchFunc), currentNode, action) =>
  switch (action) {
  | Change(value) => (
      state => ReasonReact.Update({...state, inputValue: value})
    )
  | Blur => (
      state =>
        switch (state.inputValue) {
        | "" => ReasonReact.Update({...state, inputValue: state.originalName})
        | value =>
          state.inputValue
          |> ValueService.isValueEqual(ValueType.String, state.originalName) ?
            ReasonReact.NoUpdate :
            ReasonReactUtils.updateWithSideEffects(
              {...state, originalName: value}, _state =>
              Method.renameAssetTreeNode(
                (uiState, dispatchFunc),
                NodeAssetService.getNodeId(~node=currentNode),
                value,
              )
            )
        }
    )
  };

let render = ((uiState, dispatchFunc), currentNode, self) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="AssetTreeInspector" className="wonder-inspector-assetTree">
    {
      Method.showAssetNodeComponent(
        (uiState, dispatchFunc),
        currentNode,
        languageType,
        self,
      )
    }
  </article>;
};

let make =
    (~uiState: AppStore.appState, ~dispatchFunc, ~currentNode, _children) => {
  ...component,
  initialState: () => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    NodeAssetService.handleNode(
      ~node=currentNode,
      ~textureNodeFunc=Method.initTextureName(engineState),
      ~materialNodeFunc=Method.initMaterialName(engineState),
      ~wdbNodeFunc=Method.initWDBName,
      ~folderNodeFunc=Method.initFolderName,
    );
  },
  reducer: reducer((uiState, dispatchFunc), currentNode),
  render: self => render((uiState, dispatchFunc), currentNode, self),
};