open Wonder_jest;

open Expect;

open Expect.Operators;

open NodeAssetType;

open Sinon;

let _ =
  describe("controller inspector meshRenderer", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      StateEditorService.getState()
      |> CurrentNodeIdAssetEditorService.clearCurrentNodeId
      |> SelectedFolderNodeIdInAssetTreeAssetEditorService.clearSelectedFolderNodeIdInAssetTree
      |> StateEditorService.setState
      |> ignore;
    });

    describe("test set value into engineState", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          SceneTreeWidgetService.getWidget(),
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test meshRenderer change drawMode", () => {
        test("test set drawMode to Lines", () => {
          let lineType = MainEditorMeshRendererTool.getDrawModeLineType();

          MainEditorMeshRendererTool.changeMode(~value=lineType, ());

          let meshRenderer = GameObjectTool.getCurrentSceneTreeNodeMeshRenderer();

          StateEngineService.unsafeGetState()
          |> MeshRendererEngineService.getDrawMode(meshRenderer)
          |> expect == lineType;
        });
        describe("test set drawMode to Triangle_fan", () =>
          test("test logic", () => {
            let triangleFanType =
              MainEditorMeshRendererTool.getDrawModeTriangleFanType();

            MainEditorMeshRendererTool.changeMode(~value=triangleFanType, ());

            let meshRenderer =
              GameObjectTool.getCurrentSceneTreeNodeMeshRenderer();

            StateEngineService.unsafeGetState()
            |> MeshRendererEngineService.getDrawMode(meshRenderer)
            |> expect == triangleFanType;
          })
        );
      });
    });
  });