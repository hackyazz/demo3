open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: remove light component", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateRemoveSpecificComponent = () =>
      MainEditorInspectorRemoveComponentTool.removeDirectionLightComponent();

    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setDirectionLightGameObjectToBeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        SceneTreeWidgetService.getWidget(),
      )
      |> StateLogicService.getAndSetEditorState;
    };
    let _afterEach = () => ();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoOneStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateRemoveSpecificComponent, _beforeEach, _afterEach),
      BuildComponentForCurryTool.buildInspectorComponent,
    );
  });