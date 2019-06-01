type retainedProps = {isInitEngine: bool};

module Method = {
  let resizeCanvasAndViewPort = () => ResizeUtils.resizeScreen();

  let buildNoCameraElement = () =>
    SceneUtils.isSceneHaveNoActiveCamera() ?
      switch (
        GameViewEditorService.getViewRect(StateEditorService.getState())
      ) {
      | None => ReasonReact.null
      | Some(_) =>
        <div className="gameViewNoCamera">
          <span className="gameViewNoCamera-text">
            {DomHelper.textEl("No Camera !")}
          </span>
        </div>
      } :
      ReasonReact.null;

  let dragWDB = MainEditorDragWDBEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditor");

let _buildElementBeforeInitEngine = (uiState, dispatchFunc) =>
  <article key="mainEditor" className="wonder-mainEditor-component">
    <div key="leftComponent" className="left-component">
      <div className="top-widget">
        <div id="canvasParent" key="webglParent" className="webgl-parent">
          <Canvas
            key="webgl"
            domId="canvas"
            dragWDB={Method.dragWDB((uiState, dispatchFunc), ())}
            isWDBAssetFile=WDBNodeAssetEditorService.isWDBAssetFile
          />
        </div>
      </div>
      <div className="bottom-widget" />
    </div>
    <div key="rightComponent" className="right-component" />
  </article>;

let _buildElementAfterInitEngine = (uiState, dispatchFunc) =>
  <article key="mainEditor" className="wonder-mainEditor-component">
    <div key="leftComponent" className="left-component">
      <div className="top-widget">
        <MainEditorLeftComponents uiState dispatchFunc />
        <div id="canvasParent" key="webglParent" className="webgl-parent">
          {Method.buildNoCameraElement()}
          <Canvas
            key="webgl"
            domId="canvas"
            dragWDB={Method.dragWDB((uiState, dispatchFunc), ())}
            isWDBAssetFile=WDBNodeAssetEditorService.isWDBAssetFile
          />
        </div>
      </div>
      <div className="bottom-widget">
        <MainEditorBottomComponents uiState dispatchFunc />
      </div>
    </div>
    <div key="rightComponent" className="right-component">
      <div className="inline-component inspector-parent">
        <MainEditorInspector
          uiState
          dispatchFunc
          addableComponentConfig={
            GameObjectAllComponentParseUtils.getGameObjectAllComponentConfig()
          }
        />
      </div>
    </div>
  </article>;

let render = (uiState: AppStore.appState, dispatchFunc, _self) =>
  uiState.isInitEngine ?
    _buildElementAfterInitEngine(uiState, dispatchFunc) :
    _buildElementBeforeInitEngine(uiState, dispatchFunc);

let make = (~uiState: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    isInitEngine: uiState.isInitEngine,
  },
  didUpdate:
    ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
    oldSelf.retainedProps != newSelf.retainedProps ?
      Method.resizeCanvasAndViewPort() : (),
  didMount: _self => {
    Js.Promise.(
      MainUtils.initEngine()
      |> then_(_ => {
           (
             editorState =>
               editorState
               |> TreeAssetEditorService.createTree
               |> StateEditorService.setState
           )
           |> StateLogicService.getAndSetEditorState;

           dispatchFunc(AppStore.InitEngineAction) |> resolve;
         })
      |> ignore
    );

    EventHelper.onresize(Method.resizeCanvasAndViewPort);
  },
  render: self => render(uiState, dispatchFunc, self),
};