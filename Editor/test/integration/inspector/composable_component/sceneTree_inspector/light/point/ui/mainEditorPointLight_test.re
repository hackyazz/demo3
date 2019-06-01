open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorPointLight", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareWithEmptyJob = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode", () => {
      let _prepareDefaultSceneAndInit = () => {
        MainEditorSceneTool.createDefaultScene(sandbox, () =>
          MainEditorSceneTool.getDirectionLightInDefaultScene
          |> StateLogicService.getEngineStateToGetData
          |> GameObjectTool.setCurrentSceneTreeNode
        );
        DirectorToolEngine.prepareAndInitAllEnginState();

        MainEditorLightTool.setLightTypeToBePointLight();
      };

      let _prepareWithJob = () => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
          (),
        );
        EventListenerTool.buildFakeDom()
        |> EventListenerTool.stubGetElementByIdReturnFakeDom;
      };
      describe("test change color", () => {
        beforeEach(() => {
          _prepareWithJob();
          _prepareDefaultSceneAndInit();
        });

        PickColorTool.testOperateColorPickToChangeColor(
          sandbox,
          BuildComponentForCurryTool.buildPointLight,
          (
            GameObjectTool.getCurrentSceneTreeNodePointLightComponent,
            MainEditorPointLightTool.changeColor,
            PointLightEngineService.getPointLightColor,
          ),
        );
      });

      describe("test pointLight's attribute set in engine", () => {
        beforeEach(() => {
          _prepareWithEmptyJob();

          MainEditorSceneTool.createDefaultScene(sandbox, () =>
            MainEditorSceneTool.getDirectionLightInDefaultScene
            |> StateLogicService.getEngineStateToGetData
            |> GameObjectTool.setCurrentSceneTreeNode
          );

          MainEditorLightTool.setLightTypeToBePointLight();
        });

        describe("test change point light intensity", () =>
          test("test change intensity should set into engine", () => {
            let currentGameObjectPointLightComponent =
              GameObjectTool.getCurrentSceneTreeNodePointLightComponent();
            let value = 10.1;

            MainEditorPointLightTool.changeIntensity(
              currentGameObjectPointLightComponent,
              value,
            );

            PointLightEngineService.getPointLightIntensity(
              currentGameObjectPointLightComponent,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(5)
            |> expect == value;
          })
        );

        describe("test change point light constant", () =>
          test("test change constant should set into engine", () => {
            let currentGameObjectPointLightComponent =
              GameObjectTool.getCurrentSceneTreeNodePointLightComponent();
            let value = 10.1;

            MainEditorPointLightTool.changeConstant(
              currentGameObjectPointLightComponent,
              value,
            );

            PointLightEngineService.getPointLightConstant(
              currentGameObjectPointLightComponent,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(5)
            |> expect == value;
          })
        );
        describe("test change point light linear", () =>
          test("test change linear should set into engine", () => {
            let currentGameObjectPointLightComponent =
              GameObjectTool.getCurrentSceneTreeNodePointLightComponent();
            let value = 10.1;

            MainEditorPointLightTool.changeLinear(
              currentGameObjectPointLightComponent,
              value,
            );

            PointLightEngineService.getPointLightLinear(
              currentGameObjectPointLightComponent,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(5)
            |> expect == value;
          })
        );
        describe("test change point light quadratic", () =>
          test("test change quadratic should set into engine", () => {
            let currentGameObjectPointLightComponent =
              GameObjectTool.getCurrentSceneTreeNodePointLightComponent();
            let value = 10.1;

            MainEditorPointLightTool.changeQuadratic(
              currentGameObjectPointLightComponent,
              value,
            );

            PointLightEngineService.getPointLightQuadratic(
              currentGameObjectPointLightComponent,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(5)
            |> expect == value;
          })
        );
        describe("test change point light range", () =>
          test("test change range should set into engine", () => {
            let currentGameObjectPointLightComponent =
              GameObjectTool.getCurrentSceneTreeNodePointLightComponent();
            let value = 10.1;

            MainEditorPointLightTool.changeRange(
              currentGameObjectPointLightComponent,
              value,
            );

            PointLightEngineService.getPointLightRange(
              currentGameObjectPointLightComponent,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(5)
            |> expect == value;
          })
        );
      });
    });
  });