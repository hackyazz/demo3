/* let computeCanvasSize = ((_,_, sceneViewWidth, sceneViewHeight), (_,_, gameViewWidth, gameViewHeight) ) => {
       WonderLog.Contract.requireCheck (() => {
       open WonderLog;
       open Contract;
       open Operators;

       test
       (Log.buildAssertMessage(~expect={j|sceneViewHeight === gameViewHeight|j}, ~actual={j|not|j}),
       (
       () => {
           sceneViewHeight == gameViewHeight

       })
       );
       }, StateEditorService.getStateIsDebug());

       (
           sceneViewWidth,
       )
   }; */

let _getCanvasParentSize = parent => (
  parent##offsetWidth,
  parent##offsetHeight,
);

let getCanvasParentSize = () =>
  DomHelper.getElementById("canvasParent")
  |> DomHelperType.convertDomElementToJsObj
  |> _getCanvasParentSize;

let getCanvasSize = () => {
  let canvas =
    DomHelper.getElementById("canvas")
    |> DomHelperType.convertDomElementToJsObj;

  (canvas##width, canvas##height);
};

let resizeCanvas = ((width, height)) =>
  DomHelper.getElementById("canvas")
  |> DomHelperType.convertDomElementToJsObj
  |> ScreenEngineService.setScreenSize((width, height, width, height))
  |> ignore;

let resizeViewport = ((width, height), engineState) =>
  engineState
  |> PerspectiveCameraProjectionEngineService.markAllPerspectiveCameraProjectionsDirty
  |> DeviceManagerEngineService.setViewport((0, 0, width, height));

/*
 let resizeViewport2 = ((width, height), engineState) =>
   engineState
   |> PerspectiveCameraProjectionEngineService.markAllPerspectiveCameraProjectionsDirty
   |> DeviceManagerEngineService.setViewport((0, 0, width, height)); */

let updateViewRect = ((canvasWidth, canvasHeight), editorState) =>
  editorState
  |> SceneViewEditorService.updateViewRect((
       0,
       0,
       canvasWidth / 2,
       canvasHeight,
     ))
  |> GameViewEditorService.updateViewRect((
       canvasWidth / 2,
       0,
       canvasWidth / 2,
       canvasHeight,
     ));

let isSizeEqual = (size1, size2) => size1 >= size2 - 1 && size1 <= size2 + 1;

let getViewWidth = (sceneViewWidth, gameViewWidth) =>
  sceneViewWidth + gameViewWidth;

let getViewHeight = (sceneViewHeight, gameViewHeight) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|sceneViewHeight == gameViewHeight|j},
                ~actual={j|not|j},
              ),
              () =>
              sceneViewHeight == gameViewHeight
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );
  sceneViewHeight;
};

let isViewSizeChange =
    (
      (_, _, sceneViewWidth, sceneViewHeight),
      (_, _, gameViewWidth, gameViewHeight),
      (canvasWidth, canvasHeight),
    ) =>
  ! isSizeEqual(getViewWidth(sceneViewWidth, gameViewWidth), canvasWidth)
  || !
       isSizeEqual(
         getViewHeight(sceneViewHeight, gameViewHeight),
         canvasHeight,
       );

let resizeScreen = () => {
  let canvasParentSize = getCanvasParentSize();

  resizeCanvas(canvasParentSize);

  DeviceManagerEngineService.getGl(StateEngineService.unsafeGetState())
  |> Js.Option.isSome ?
    {
      updateViewRect(canvasParentSize)
      |> StateLogicService.getAndSetEditorState;

      StateEngineService.unsafeGetState()
      |> resizeViewport(canvasParentSize)
      |> StateLogicService.refreshEngineState
      |> ignore;
    } :
    ();
};