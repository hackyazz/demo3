open SceneTreeNodeType;

type state = {
  dragGapClass: string,
  style: ReactDOMRe.Style.t,
  dragPosition: sceneTreeDragType,
};

type action =
  | Nothing
  | TogggleChildren(int)
  | DragLeave
  | DragEnd
  | DragStart
  | DragOver(sceneTreeDragType)
  | DragGameObject(int, int, sceneTreeDragType)
  | DragWDB(int, int, sceneTreeDragType);

module Method = {
  let buildDragEndState = state => {
    ...state,
    dragGapClass: "no-drag",
    dragPosition: NoDrag,
    style: ReactUtils.addStyleProp("opacity", "1", state.style),
  };

  let handleDragStart = (gameObject, widget, (dragImg, effectAllowd), event) => {
    DragEventBaseUtils.dragStart(
      gameObject,
      widget,
      (dragImg, effectAllowd),
      event,
    );
    DragStart;
  };

  let _calcDragPosition = (event, domElement) => {
    let domClientRect = DomHelper.getDomClientRect(domElement);
    let domTop = domClientRect##top;
    let domOffsetHeight = domClientRect##height;
    let gapHeight = TreeNodeUtils.getGapHeight();

    switch (event |> ReactEventRe.Mouse.pageY) {
    | pageY when pageY > domOffsetHeight + domTop - gapHeight =>
      DragAfterTarget
    | pageY when pageY < domTop + gapHeight => DragBeforeTarget
    | pageY => DragIntoTarget
    };
  };

  let handleDragLeave = (gameObject, event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);

    DragLeave;
  };

  let handleDragEnd = _event => {
    CurrentDragSourceEditorService.clearCurrentDragSource
    |> StateLogicService.getAndSetEditorState;

    DragEnd;
  };

  let handleDragOver =
      (
        gameObject,
        (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
        event,
      ) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    EventHelper.preventDefault(e);
    let _isValidForDragOver = DragEventBaseUtils.isValidForDragEnter;

    let (isValid, _) =
      _isValidForDragOver(gameObject, isWidgetFunc, checkNodeRelationFunc);

    isValid || isAssetWDBFileFunc() ?
      DragOver(
        ReactDOMRe.domElementToObj(ReactEventRe.Mouse.target(event))
        |> _calcDragPosition(event),
      ) :
      Nothing;
  };

  let handleDrop =
      (
        gameObject,
        (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
        dragPosition,
        event,
      ) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    let startId = DragUtils.getDragedId(e);

    EventHelper.preventDefault(e);

    let (isValid, relationResult) =
      DragEventBaseUtils.isValidForDragDrop(
        gameObject,
        startId,
        isWidgetFunc,
        checkNodeRelationFunc,
      );

    isValid ?
      DragGameObject(gameObject, startId, dragPosition) :
      isAssetWDBFileFunc() ?
        {
          let wdbGameObject =
            StateEditorService.getState()
            |> OperateTreeAssetEditorService.unsafeFindNodeById(startId)
            |> WDBNodeAssetService.getWDBGameObject;

          DragWDB(gameObject, wdbGameObject, dragPosition);
        } :
        DragLeave;
  };

  let buildNotDragableUl = TreeNodeUtils.buildNotDragableUl;

  let _showGameObjectIcon = (gameObject, engineState) =>
    engineState |> LightEngineService.hasLightComponent(gameObject) ?
      <img src="./public/img/lightIcon.png" className="treeNode-icon" /> :
      engineState |> CameraEngineService.hasCameraGroup(gameObject) ?
        <img src="./public/img/cameraIcon.png" className="treeNode-icon" /> :
        <img src="./public/img/gameObjectIcon.png" className="treeNode-icon" />;

  let _renderDragableText =
      (
        (state, send),
        (
          gameObject,
          widget,
          dragImg,
          name,
          isShowChildren,
          isSelected,
          isActive,
        ),
        (
          onSelectFunc,
          isWidgetFunc,
          checkNodeRelationFunc,
          isAssetWDBFileFunc,
        ),
      ) =>
    <div
      className={
        ClassNameService.buildMultipleClassName([|
          "draggable-container",
          isSelected ? isActive ? "select-active" : "select-not-active" : "",
          state.dragGapClass,
        |])
      }
      id={j|sceneTreeNode-$gameObject|j}
      style={state.style}
      draggable={
        !(
          SceneEngineService.isSceneGameObject(gameObject)
          |> StateLogicService.getEngineStateToGetData
        )
      }
      onClick={event => onSelectFunc(gameObject)}
      onDragStart={
        e => send(handleDragStart(gameObject, widget, (dragImg, "move"), e))
      }
      onDragEnd={_e => send(handleDragEnd(_e))}
      onDragLeave={_e => send(handleDragLeave(gameObject, _e))}
      onDragOver={
        e =>
          send(
            handleDragOver(
              gameObject,
              (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
              e,
            ),
          )
      }
      onDrop={
        _e =>
          send(
            handleDrop(
              gameObject,
              (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
              state.dragPosition,
              _e,
            ),
          )
      }>
      {
        _showGameObjectIcon(gameObject)
        |> StateLogicService.getEngineStateToGetData
      }
      {DomHelper.textEl(name)}
    </div>;

  let _renderContent =
      (
        (state, send),
        (
          gameObject,
          widget,
          dragImg,
          name,
          isShowChildren,
          isHasChildren,
          isSelected,
          isActive,
        ),
        (
          onSelectFunc,
          isWidgetFunc,
          checkNodeRelationFunc,
          isAssetWDBFileFunc,
        ),
      ) =>
    <li>
      {
        isHasChildren ?
          TreeNodeUtils.renderChildren(
            gameObject,
            isShowChildren,
            send,
            TogggleChildren(gameObject),
          ) :
          <div className="item-triangle" />
      }
      {
        _renderDragableText(
          (state, send),
          (
            gameObject,
            widget,
            dragImg,
            name,
            isShowChildren,
            isSelected,
            isActive,
          ),
          (
            onSelectFunc,
            isWidgetFunc,
            checkNodeRelationFunc,
            isAssetWDBFileFunc,
          ),
        )
      }
    </li>;
};

let component = ReasonReact.reducerComponent("SceneTreeNode");

let reducer =
    (
      isShowChildren,
      (dragGameObject, dragWDB, handleToggleShowTreeChildren),
      action,
      state,
    ) =>
  switch (action) {
  | TogggleChildren(targetUid) =>
    ReasonReactUtils.sideEffects(() =>
      handleToggleShowTreeChildren(targetUid, !isShowChildren)
    )

  | DragStart =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("opacity", "0.2", state.style),
    })

  | DragOver(dragPosition) =>
    switch (dragPosition) {
    | DragBeforeTarget =>
      ReasonReact.Update({
        ...state,
        dragGapClass: "drag-gap-top",
        dragPosition,
      })
    | DragIntoTarget =>
      ReasonReact.Update({
        ...state,
        dragGapClass: "drag-gap-center",
        dragPosition,
      })
    | DragAfterTarget =>
      ReasonReact.Update({
        ...state,
        dragGapClass: "drag-gap-bottom",
        dragPosition,
      })
    }

  | DragLeave => ReasonReact.Update({...state, dragGapClass: "no-drag"})

  | DragEnd => ReasonReact.Update(Method.buildDragEndState(state))

  | DragGameObject(targetUid, draggedUid, dragPosition) =>
    ReasonReactUtils.updateWithSideEffects(
      Method.buildDragEndState(state), _state =>
      dragGameObject((targetUid, draggedUid, dragPosition))
    )

  | DragWDB(targetUid, wdbGameObject, dragPosition) =>
    ReasonReactUtils.updateWithSideEffects(
      Method.buildDragEndState(state), _state =>
      dragWDB((targetUid, wdbGameObject, dragPosition))
    )

  | Nothing => ReasonReact.NoUpdate
  };

let render =
    (
      (
        gameObject,
        name,
        widget,
        dragImg,
        isShowChildren,
        isHasChildren,
        isSelected,
        isActive,
      ),
      (onSelectFunc, isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
      treeChildren,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  Method.buildNotDragableUl(
    treeChildren,
    isShowChildren,
    Method._renderContent(
      (state, send),
      (
        gameObject,
        widget,
        dragImg,
        name,
        isShowChildren,
        isHasChildren,
        isSelected,
        isActive,
      ),
      (onSelectFunc, isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
    ),
  );

let make =
    (
      ~gameObject,
      ~name,
      ~isSelected,
      ~isActive,
      ~dragImg,
      ~widget,
      ~onSelect,
      ~dragGameObject,
      ~dragWDB,
      ~isWidget,
      ~isShowChildren,
      ~isHasChildren,
      ~checkNodeRelation,
      ~handleToggleShowTreeChildren,
      ~isAssetWDBFile,
      ~treeChildren,
      _children,
    ) => {
  ...component,
  initialState: () => {
    style: ReactDOMRe.Style.make(),
    dragGapClass: "no-drag",
    dragPosition: NoDrag,
  },
  reducer:
    reducer(
      isShowChildren,
      (dragGameObject, dragWDB, handleToggleShowTreeChildren),
    ),
  render: (({state}: ReasonReact.self('a, 'b, 'c)) as self) =>
    render(
      (
        gameObject,
        name,
        widget,
        dragImg,
        isShowChildren,
        isHasChildren,
        isSelected,
        isActive,
      ),
      (onSelect, isWidget, checkNodeRelation, isAssetWDBFile),
      treeChildren,
      self,
    ),
  didUpdate: _self =>
    SceneTreeNodeScrollUtils.handleSelectedSceneTreeNodeScroll(
      isSelected,
      gameObject,
    ),
  didMount: _ =>
    SceneTreeNodeScrollUtils.handleSelectedSceneTreeNodeScroll(
      isSelected,
      gameObject,
    ),
};