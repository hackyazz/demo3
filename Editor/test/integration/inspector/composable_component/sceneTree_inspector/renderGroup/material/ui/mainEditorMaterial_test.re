open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MaterialDataAssetType;

let _ =
  describe("MainEditorMaterial", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
        (),
      );
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        )
      );

      describe("test change material", () => {
        describe("test snapshot", () =>
          test("test show default light material component", () =>
            BuildComponentTool.buildMaterial()
            |> ReactTestTool.createSnapshotAndMatch
          )
        );

        describe("test logic", () => {
          beforeEach(() => DirectorToolEngine.prepareAndInitAllEnginState());

          test(
            "currentSceneTreeNode's default material should be lightMaterial",
            () => {
            let materialType =
              MainEditorMaterialUtils.getMaterialTypeByGameObject(
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              )
              |> StateLogicService.getEngineStateToGetData;

            materialType |> expect == MaterialDataAssetType.LightMaterial;
          });

          describe(
            "test change currentSceneTreeNode's lightMaterial to basicMaterial",
            () => {
            test(
              "test currentSceneTreeNode's material component should be basicMaterial",
              () => {
              MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial();

              GameObjectComponentEngineService.hasBasicMaterialComponent(
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              )
              |> StateLogicService.getEngineStateToGetData
              |> expect == true;
            });
            test(
              "test gameObject should move from lightMaterialRenderGameObjectArray to basicMaterialRenderGameObjectArray",
              () => {
                let (basicMaterialRenderCount, lightMaterialRenderCount) =
                  MeshRendererToolEngine.getAllRenderArrayCount();

                MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial();

                MeshRendererToolEngine.getAllRenderArrayCount()
                |>
                expect == (
                            basicMaterialRenderCount + 2,
                            lightMaterialRenderCount - 2,
                          );
              },
            );
            test("should remove lightMaterial instead of dispose it", () => {
              let currentGameObject =
                GameObjectTool.unsafeGetCurrentSceneTreeNode();
              let engineState = StateEngineService.unsafeGetState();
              let oldLightMaterial =
                GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                  currentGameObject,
                  engineState,
                );

              MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial();

              let engineState = StateEngineService.unsafeGetState();
              (
                LightMaterialToolEngine.isAlive(oldLightMaterial, engineState),
                GameObjectComponentEngineService.hasLightMaterialComponent(
                  currentGameObject,
                  engineState,
                ),
              )
              |> expect == (true, false);
            });
          });
        });
      });

      describe("deal with specific case", () =>
        describe(
          "test MainEditorMaterialUtils getMaterialTypeByGameObject function",
          () =>
          test(
            "test if gameObject haven't material component, should throw error",
            () =>
            expect(() => {
              MainEditorSceneTool.setDirectionLightGameObjectToBeCurrentSceneTreeNode();

              MainEditorMaterialUtils.getMaterialTypeByGameObject(
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              )
              |> StateLogicService.getEngineStateToGetData;
            })
            |> toThrowMessageRe([%re {|/should\shas\smaterial\scomponent/g|}])
          )
        )
      );
    });

    describe("test select material group->show order", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );

        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
      });

      test(
        {|
        order should be:
        1)default material is in the end;
        2)sort material assets by firstname alphabetically
        |},
        () => {
          let addedMaterialNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          let addedMaterialNodeId2 = addedMaterialNodeId1 |> succ;
          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          AssetTreeInspectorTool.Rename.renameAssetMaterialNode(
            ~nodeId=addedMaterialNodeId1,
            ~name="BMaterial",
            (),
          );
          AssetTreeInspectorTool.Rename.renameAssetMaterialNode(
            ~nodeId=addedMaterialNodeId2,
            ~name="AMaterial",
            (),
          );

          BuildComponentTool.buildMaterial(
            ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            ~isShowMaterialGroup=true,
            (),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        },
      );
    });
  });