open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("MainEditorTransform rotation", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test change rotation value", () => {
      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );
      });

      describe("test change localEulerAngle x", () => {
        test("test snapshot", () => {
          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();
          let value = (-10.1213);

          MainEditorTransformTool.changeRotationX(
            currentGameObjectTransform,
            value,
          );

          BuildComponentTool.buildMainEditorTransformComponent(
            TestTool.buildEmptyAppState(),
            currentGameObjectTransform,
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });

        test("set to engine state", () => {
          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();
          let value = (-10.1213);

          MainEditorTransformTool.changeRotationX(
            currentGameObjectTransform,
            value,
          );

          let engineState = StateEngineService.unsafeGetState();

          let (x, y, z) =
            TransformEngineService.getLocalEulerAngles(
              currentGameObjectTransform,
              engineState,
            );

          (x |> TypeArrayTool.truncateFloatValue(5), y, z)
          |> expect == (value, 0., 0.);
        });
      });

      describe("deal with the specific case", () => {
        beforeEach(() => {
          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();

          TransformUtils.getTransformRotationData(currentGameObjectTransform)
          |> ignore;
        });

        test(
          {|
      1.getTransformRotationData;
      2.set rotation to (x:-45.0, y:180.0, z:0.0);

      inspector->transform->rotation should show (-45.0, 180.0, 0.0)
      |},
          () => {
            let currentGameObjectTransform =
              GameObjectTool.getCurrentSceneTreeNodeTransform();
            let x = (-45.);
            let y = 180.;
            let z = (-0.);

            MainEditorTransformTool.changeRotationX(
              currentGameObjectTransform,
              x,
            );
            MainEditorTransformTool.changeRotationY(
              currentGameObjectTransform,
              y,
            );
            MainEditorTransformTool.changeRotationZ(
              currentGameObjectTransform,
              z,
            );

            BuildComponentTool.buildMainEditorTransformComponent(
              TestTool.buildEmptyAppState(),
              currentGameObjectTransform,
            )
            |> ReactTestTool.createSnapshotAndMatch;
          },
        );
        test(
          {|
      1.getTransformRotationData;
      2.set rotation to (x:-45.0, y:180.0);

      inspector->transform->rotation should show (-45.0, 180.0, 0.0)
      |},
          () => {
            let currentGameObjectTransform =
              GameObjectTool.getCurrentSceneTreeNodeTransform();
            let x = (-45.);
            let y = 180.;

            MainEditorTransformTool.changeRotationX(
              currentGameObjectTransform,
              x,
            );
            MainEditorTransformTool.changeRotationY(
              currentGameObjectTransform,
              y,
            );

            BuildComponentTool.buildMainEditorTransformComponent(
              TestTool.buildEmptyAppState(),
              currentGameObjectTransform,
            )
            |> ReactTestTool.createSnapshotAndMatch;
          },
        );
      });
    });
  });