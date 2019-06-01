open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("test init camera controller job", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test bind for game view", () => {
      let _setArballCameraControllerGameObjectToCurrentSceneTreeNode = () => {
        let engineState = StateEngineService.unsafeGetState();
        let (engineState, gameObject, _, _) =
          ArcballCameraControllerToolEngine.createGameObject(engineState);
        engineState |> StateEngineService.setState |> ignore;
        GameObjectTool.setCurrentSceneTreeNode(gameObject);
      };

      let _prepare = () => {
        _setArballCameraControllerGameObjectToCurrentSceneTreeNode();
        PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
        StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);
        /* let value = ref(0);
           EventTool.onCustomGlobalEvent(
             pointEventName,
             0,
             (. event, state) => {
               value := 1;
               (state, event);
             },
           )
           |> StateLogicService.getAndSetEngineState;

           value; */
      };

      let _judgeShouldRemoveLocalEulerAngleData = () => {
        let localEulerAngle =
          TransformUtils.getTransformRotationData(
            GameObjectTool.getCurrentSceneTreeNodeTransform(),
          )
          |> StateLogicService.getEngineStateToGetData;

        JudgeTool.isEqual(
          localEulerAngle |> Vector3Service.truncate(3),
          (0., 0., 0.),
        );
      };

      let _judgeRefreshInspector = dispatchFuncStub =>
        dispatchFuncStub
        |> SinonTool.calledWith(
             _,
             AppStore.UpdateAction(Update([|UpdateStore.Inspector|])),
           );

      describe(
        "if current scene tree node has arcballCameraController component", () => {
        let _prepareMouseEvent = (~sandbox, ()) => {
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
        "name": "init_camera_controller"
      }
          ]
        }
      ]
            |},
                ~initJobs=
                  {j|
    [

        {
              "name": "init_event_for_editor"
        },
      {
        "name": "init_camera_controller"
      }
    ]
            |j},
                (),
              ),
            (),
          );

          MouseEventTool.prepareWithState(
            ~sandbox,
            ~engineState=StateEngineService.unsafeGetState(),
            (),
          );
          MouseEventTool.setPointerLocked(.);
        };

        let _prepareAndExec = ((pageX, pageY), triggerFunc) => {
          _prepare();

          triggerFunc(pageX, pageY);
        };

        describe("trigger refresh_inspector event", () => {
          test("test bind point drag event", () => {
            let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);
            _prepareMouseEvent(~sandbox, ());

            _prepareAndExec(
              (60, 20),
              (pageX, pageY) => {
                MainEditorTransformTool.setLocalEulerAngleData();

                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseDomEvent(~pageX, ~pageY, ()),
                );
                EventTool.triggerDomEvent(
                  "mousemove",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseDomEvent(~pageX, ~pageY, ()),
                );
                EventTool.triggerDomEvent(
                  "mouseup",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseDomEvent(),
                );
                EventTool.restore();
              },
            );

            (
              _judgeShouldRemoveLocalEulerAngleData(),
              _judgeRefreshInspector(dispatchFuncStub),
            )
            |> expect == (true, true);
          });
          test("test bind point scale event", () => {
            let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);
            _prepareMouseEvent(~sandbox, ());

            _prepareAndExec(
              (60, 20),
              (pageX, pageY) => {
                MainEditorTransformTool.setLocalEulerAngleData();

                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseDomEvent(~pageX, ~pageY, ()),
                );
                EventTool.triggerDomEvent(
                  "mousewheel",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseDomEvent(~pageX, ~pageY, ()),
                );
                EventTool.restore();
              },
            );

            (
              _judgeShouldRemoveLocalEulerAngleData(),
              _judgeRefreshInspector(dispatchFuncStub),
            )
            |> expect == (true, true);
          });
        });
      });

      describe("test bind keydown event", () => {
        let _prepareKeyboardEvent = (~sandbox, ()) => {
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
              "name": "init_camera_controller"
            }
          ]
        }
      ]
            |},
                ~initJobs=
                  {j|
    [

        {
              "name": "init_event_for_editor"
        },
            {
              "name": "init_camera_controller"
            }
    ]
            |j},
                (),
              ),
            (),
          );

          let canvasDom =
            EventTool.buildFakeCanvasWithSize(
              0,
              0,
              (0, 0, Js.Nullable.null),
            );

          let engineState =
            ViewToolEngine.setCanvas(
              canvasDom |> Obj.magic,
              StateEngineService.unsafeGetState(),
            )
            |> FakeGlToolEngine.setFakeGl(
                 FakeGlToolEngine.buildFakeGl(~sandbox, ()),
               );

          StateEngineService.setState(engineState) |> ignore;

          BrowserDetectToolEngine.setChrome();
        };

        describe(
          "if current scene tree node has arcballCameraController component",
          () => {
          let _prepareAndExec = ((pageX, pageY)) => {
            _prepare();
            MainEditorTransformTool.setLocalEulerAngleData();

            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getBody(),
              MouseEventTool.buildMouseDomEvent(~pageX, ~pageY, ()),
            );
            EventTool.triggerDomEvent(
              "keydown",
              EventTool.getKeyboardEventBindedDom(),
              KeyboardEventTool.buildKeyboardDomEvent(),
            );
            EventTool.restore();
          };

          test("trigger refresh_inspector event", () => {
            let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);
            _prepareKeyboardEvent(~sandbox, ());

            _prepareAndExec((60, 20));

            (
              _judgeShouldRemoveLocalEulerAngleData(),
              _judgeRefreshInspector(dispatchFuncStub),
            )
            |> expect == (true, true);
          });
        });
      });
    });
  });