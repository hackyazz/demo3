open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("fix material asset bug", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("fix bug", () => {
      describe("fix change material type bug", () => {
        let _prepareTwoGameObjects = () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
          let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();
          let engineState = StateEngineService.unsafeGetState();
          let gameObject1 = MainEditorSceneTool.getFirstCube(engineState);
          let gameObject2 = MainEditorSceneTool.getSecondCube(engineState);
          let sourceMaterial1 =
            GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
              gameObject1,
              engineState,
            );
          let sourceMaterial2 =
            GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
              gameObject2,
              engineState,
            );

          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          let materialComponent =
            MainEditorAssetMaterialNodeTool.getMaterialComponent(
              ~nodeId=addedMaterialNodeId,
              (),
            );

          MainEditorMaterialTool.changeMaterial(
            ~sourceMaterial=sourceMaterial1,
            ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
            ~targetMaterial=materialComponent,
            ~targetMaterialType=MaterialDataAssetType.LightMaterial,
            ~gameObject=gameObject1,
            ~materialNodeId=Some(addedMaterialNodeId),
            (),
          );
          MainEditorMaterialTool.changeMaterial(
            ~sourceMaterial=sourceMaterial2,
            ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
            ~targetMaterial=materialComponent,
            ~targetMaterialType=MaterialDataAssetType.LightMaterial,
            ~gameObject=gameObject2,
            ~materialNodeId=Some(addedMaterialNodeId),
            (),
          );

          (
            (gameObject1, gameObject2),
            materialComponent,
            addedMaterialNodeId,
          );
        };

        describe("fix change gameObject->material->type bug", () => {
          describe(
            {|
        add material m1;
        select sceneTree->gameObject g1;
        g1 change material to m1;
        change g1->material->type to basicMaterial;
        |},
            () =>
            test("m1->type should be basicMaterial", () => {
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
              let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();
              let gameObject = GameObjectTool.unsafeGetCurrentSceneTreeNode();

              MainEditorAssetHeaderOperateNodeTool.addMaterial();

              let materialComponent =
                MainEditorAssetMaterialNodeTool.getMaterialComponent(
                  ~nodeId=addedMaterialNodeId,
                  (),
                );

              MainEditorMaterialTool.changeMaterial(
                ~sourceMaterial=
                  GameObjectTool.getCurrentSceneTreeNodeLightMaterial(),
                ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                ~targetMaterial=materialComponent,
                ~targetMaterialType=MaterialDataAssetType.LightMaterial,
                ~gameObject,
                ~materialNodeId=Some(addedMaterialNodeId),
                (),
              );

              MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial();

              let type_ =
                MainEditorAssetMaterialNodeTool.getMaterialType(
                  ~nodeId=addedMaterialNodeId,
                  (),
                );

              type_ |> expect == MaterialDataAssetType.BasicMaterial;
            })
          );

          describe(
            {|
        add material m1;
        select sceneTree->gameObject g1;
        g1 change material to m1;
        select sceneTree->gameObject g2;
        g2 change material to m1;
        change g1->material->type to basicMaterial;
        change g1->material->type to lightMaterial;
        |},
            () =>
            test("m1->type and g2->material->type should be lightMaterial", () => {
              let (
                (gameObject1, gameObject2),
                materialComponent,
                addedMaterialNodeId,
              ) =
                _prepareTwoGameObjects();
              gameObject1 |> GameObjectTool.setCurrentSceneTreeNode;

              MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial();
              MainEditorLightMaterialTool.changeMaterialTypeToBeLightMaterial();

              let type_ =
                MainEditorAssetMaterialNodeTool.getMaterialType(
                  ~nodeId=addedMaterialNodeId,
                  (),
                );

              let engineState = StateEngineService.unsafeGetState();
              (
                type_,
                GameObjectComponentEngineService.hasLightMaterialComponent(
                  gameObject2,
                  engineState,
                ),
              )
              |> expect == (MaterialDataAssetType.LightMaterial, true);
            })
          );
        });

        describe("fix change MaterialInspector->type bug", () => {
          let _prepareAndExec = () => {
            let (
              (gameObject1, gameObject2),
              materialComponent,
              addedMaterialNodeId,
            ) =
              _prepareTwoGameObjects();

            MaterialInspectorTool.changeMaterialType(
              ~material=materialComponent,
              ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
              ~targetMaterialType=MaterialDataAssetType.BasicMaterial,
              ~materialNodeId=addedMaterialNodeId,
              (),
            );

            (
              (gameObject1, gameObject2),
              materialComponent,
              addedMaterialNodeId,
            );
          };

          describe("fix name", () => {
            beforeEach(() => {
              let _ =
                MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
              ();
            });

            test(
              {|
              1.change to basic material type;

              name shouldn't change
              |},
              () => {
                let addedMaterialNodeId =
                  MainEditorAssetIdTool.getNewAssetId();

                MainEditorAssetHeaderOperateNodeTool.addMaterial();

                let materialComponent =
                  MainEditorAssetMaterialNodeTool.getMaterialComponent(
                    ~nodeId=addedMaterialNodeId,
                    (),
                  );

                MaterialInspectorTool.changeMaterialType(
                  ~material=materialComponent,
                  ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                  ~targetMaterialType=MaterialDataAssetType.BasicMaterial,
                  ~materialNodeId=addedMaterialNodeId,
                  (),
                );

                MainEditorAssetChildrenNodeTool.selectMaterialNode(
                  ~nodeId=addedMaterialNodeId,
                  (),
                );
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              },
            );
            test(
              {|
              1.change name to n1;
              2.change to basic material type;

              name should still be n1
              |},
              () => {
                let addedMaterialNodeId =
                  MainEditorAssetIdTool.getNewAssetId();

                MainEditorAssetHeaderOperateNodeTool.addMaterial();

                let name = "Material222";
                AssetTreeInspectorTool.Rename.renameAssetMaterialNode(
                  ~nodeId=addedMaterialNodeId,
                  ~name,
                  (),
                );

                let materialComponent =
                  MainEditorAssetMaterialNodeTool.getMaterialComponent(
                    ~nodeId=addedMaterialNodeId,
                    (),
                  );

                MaterialInspectorTool.changeMaterialType(
                  ~material=materialComponent,
                  ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                  ~targetMaterialType=MaterialDataAssetType.BasicMaterial,
                  ~materialNodeId=addedMaterialNodeId,
                  (),
                );

                MainEditorAssetChildrenNodeTool.selectMaterialNode(
                  ~nodeId=addedMaterialNodeId,
                  (),
                );
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              },
            );
            test(
              {|
              add material m1;
              change m1->name to n1;
              select sceneTree->gameObject g1;
              g1 change material to m1;
              change m1->type to basicMaterial;

              m1->name should still be n1
              |},
              () => {
                let ((gameObject1, gameObject2), _, addedMaterialNodeId) =
                  _prepareAndExec();

                let name = "Material222";
                AssetTreeInspectorTool.Rename.renameAssetMaterialNode(
                  ~nodeId=addedMaterialNodeId,
                  ~name,
                  (),
                );

                let engineState = StateEngineService.unsafeGetState();

                gameObject1 |> GameObjectTool.setCurrentSceneTreeNode;

                MainEditorLightMaterialTool.changeMaterialTypeToBeLightMaterial();

                MainEditorAssetChildrenNodeTool.selectMaterialNode(
                  ~nodeId=addedMaterialNodeId,
                  (),
                );
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              },
            );

            describe(
              {|
        add material m1;
        add material m2;
        change m2->type to basicMaterial;
        |},
              () =>
              test("m2->name shouldn't equal m1->name", () => {
                let addedMaterialNodeId1 =
                  MainEditorAssetIdTool.getNewAssetId();
                let addedMaterialNodeId2 = addedMaterialNodeId1 |> succ;
                let gameObject =
                  GameObjectTool.unsafeGetCurrentSceneTreeNode();

                MainEditorAssetHeaderOperateNodeTool.addMaterial();
                MainEditorAssetHeaderOperateNodeTool.addMaterial();

                let materialComponent =
                  MainEditorAssetMaterialNodeTool.getMaterialComponent(
                    ~nodeId=addedMaterialNodeId2,
                    (),
                  );

                MaterialInspectorTool.changeMaterialType(
                  ~material=materialComponent,
                  ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                  ~targetMaterialType=MaterialDataAssetType.BasicMaterial,
                  ~materialNodeId=addedMaterialNodeId2,
                  (),
                );

                MainEditorAssetChildrenNodeTool.selectMaterialNode(
                  ~nodeId=addedMaterialNodeId2,
                  (),
                );

                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              })
            );
          });

          describe(
            {|
        add material m1;
        select sceneTree->gameObject g1;
        g1 change material to m1;
        select sceneTree->gameObject g2;
        g2 change material to m1;
        change m1->type to basicMaterial;
        |},
            () => {
              test(
                "g1,g2->material->material type should be basicMaterial;", () => {
                let ((gameObject1, gameObject2), _, _) = _prepareAndExec();

                let engineState = StateEngineService.unsafeGetState();
                (
                  GameObjectComponentEngineService.hasBasicMaterialComponent(
                    gameObject1,
                    engineState,
                  ),
                  GameObjectComponentEngineService.hasBasicMaterialComponent(
                    gameObject2,
                    engineState,
                  ),
                )
                |> expect == (true, true);
              });
              test(
                "should dispose source material asset->materialComponent", () => {
                MainEditorSceneTool.initStateWithJob(
                  ~sandbox,
                  ~isBuildFakeDom=false,
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

                let ((gameObject1, gameObject2), sourceMaterialAsset, _) =
                  _prepareAndExec();

                DirectorToolEngine.runWithDefaultTimeEngineState();

                let engineState = StateEngineService.unsafeGetState();
                LightMaterialToolEngine.isAlive(
                  sourceMaterialAsset,
                  engineState,
                )
                |> expect == false;
              });

              describe(
                {|
    change g1->material->type to lightMaterial;
    |}, () =>
                test(
                  "m1->type and g2->material->type should be lightMaterial", () => {
                  let ((gameObject1, gameObject2), _, addedMaterialNodeId) =
                    _prepareAndExec();

                  let engineState = StateEngineService.unsafeGetState();

                  gameObject1 |> GameObjectTool.setCurrentSceneTreeNode;

                  MainEditorLightMaterialTool.changeMaterialTypeToBeLightMaterial();

                  let type_ =
                    MainEditorAssetMaterialNodeTool.getMaterialType(
                      ~nodeId=addedMaterialNodeId,
                      (),
                    );
                  let engineState = StateEngineService.unsafeGetState();
                  (
                    type_,
                    GameObjectComponentEngineService.hasLightMaterialComponent(
                      gameObject2,
                      engineState,
                    ),
                  )
                  |> expect == (MaterialDataAssetType.LightMaterial, true);
                })
              );
            },
          );
        });
      });

      describe(
        {|
        add material m1;
        upload texture t1;
        drag t1 to m1->diffuseMap;
        remove t1 by remove texture asset;
        |},
        () => {
          beforeEach(() => {
            MainEditorAssetTool.buildFakeFileReader();
            MainEditorAssetTool.buildFakeImage();
          });

          testPromise("m1->materialInspector->diffuseMap should be none", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();

            MainEditorAssetHeaderOperateNodeTool.addMaterial();

            let material =
              MainEditorAssetMaterialNodeTool.getMaterialComponent(
                ~nodeId=addedMaterialNodeId,
                (),
              );

            MainEditorAssetUploadTool.loadOneTexture()
            |> then_(uploadedTextureNodeId => {
                 let editorState = StateEditorService.getState();
                 let textureComponent =
                   MainEditorAssetTextureNodeTool.getTextureComponent(
                     uploadedTextureNodeId,
                     editorState,
                   );

                 MainEditorLightMaterialTool.Drag.dragAssetTextureToMap(
                   ~textureNodeId=uploadedTextureNodeId,
                   ~material,
                   (),
                 );
                 MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                   ~textureNodeId=uploadedTextureNodeId,
                   (),
                 );
                 MainEditorAssetChildrenNodeTool.selectMaterialNode(
                   ~nodeId=addedMaterialNodeId,
                   (),
                 );

                 BuildComponentTool.buildInspectorComponent(
                   TestTool.buildEmptyAppState(),
                   InspectorTool.buildFakeAllShowComponentConfig(),
                 )
                 |> ReactTestTool.createSnapshotAndMatch
                 |> resolve;
               });
          });
        },
      );
    });
  });