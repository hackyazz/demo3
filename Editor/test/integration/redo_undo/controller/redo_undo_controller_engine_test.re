open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: controller engine", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test undo operate", () => {
      describe("test add gameObject", () => {
        beforeEach(() => {
          MainEditorSceneTool.initState(~sandbox, ());
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
          ControllerTool.stubRequestAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
          ControllerTool.run();
        });
        test("test undo one step which from second to first", () => {
          MainEditorLeftHeaderTool.addCube();
          MainEditorLeftHeaderTool.addCube();

          RedoUndoTool.undoHistoryState();

          StateEngineService.unsafeGetState()
          |> HierarchyGameObjectEngineService.getChildren(
               MainEditorSceneTool.unsafeGetScene(),
             )
          |> Js.Array.length
          |> expect == 5;
        });
      });
      describe("test dispose gameObject from engine", () => {
        beforeEach(() => {
          MainEditorSceneTool.initStateWithJob(
            ~sandbox,
            ~noWorkerJobRecord=
              NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
                ~loopPipelines=
                  {|
                [
                    {
                        "name": "default",
                        "jobs": [
                            {
                                "name": "dispose"
                            }
                        ]
                    }
                ]
            |},
                (),
              ),
            (),
          );

          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );
          ControllerTool.stubRequestAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
          ControllerTool.run();
        });

        test("test undo one step which from second to first", () => {
          MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();
          MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

          RedoUndoTool.undoHistoryState();

          StateEngineService.unsafeGetState()
          |> HierarchyGameObjectEngineService.getChildren(
               MainEditorSceneTool.unsafeGetScene(),
             )
          |> Js.Array.length
          |> expect == 3;
        });
      });
      describe("test transform", () => {
        beforeEach(() => {
          MainEditorSceneTool.initState(
            ~sandbox,
            ~buffer=
              SettingToolEngine.buildBufferConfigStr(~transformCount=10, ()),
            (),
          );
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );
          ControllerTool.stubRequestAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
          ControllerTool.run();
        });

        test("test undo one step which from second to first", () => {
          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();
          let firstValue = 155.;
          let secondValue = 200.;
          RedoUndoTransformTool.simulateTwiceChangePosition(
            ~firstValue,
            ~secondValue,
            (),
          );

          RedoUndoTool.undoHistoryState();

          StateEngineService.unsafeGetState()
          |> TransformEngineService.getLocalPosition(
               currentGameObjectTransform,
             )
          |> expect == (155., 0., 0.);
        });
      });
      describe("fix bug", () => {
        beforeEach(() => {
          MainEditorSceneTool.initState(~sandbox, ());

          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );
          ControllerTool.stubRequestAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
          ControllerTool.run();
        });
        test("the undo operate should deep copy current engineState", () => {
          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();
          let firstValue = 150.;
          let secondValue = 200.;
          RedoUndoTransformTool.simulateTwiceChangePosition(
            ~firstValue,
            ~secondValue,
            (),
          );

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          StateEngineService.unsafeGetState()
          |> TransformEngineService.getLocalPosition(
               currentGameObjectTransform,
             )
          |> expect == (150., 200., 0.);
        });
      });
    });
  });