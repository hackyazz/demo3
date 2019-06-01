open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorLight component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
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

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setDirectionLightGameObjectToBeCurrentSceneTreeNode,
        )
      );
      describe("test change light type", () => {
        test(
          "test the original type is direction light, should show direction light component ",
          () =>
          BuildComponentTool.buildLight()
          |> ReactTestTool.createSnapshotAndMatch
        );
        test(
          "test change type to be point light, should show point light component",
          () => {
          MainEditorLightTool.setLightTypeToBePointLight();

          BuildComponentTool.buildLight()
          |> ReactTestTool.createSnapshotAndMatch;
        });
        test(
          "test change type to be direction light, should show direction light component",
          () => {
            MainEditorLightTool.setLightTypeToBePointLight();
            MainEditorLightTool.setLightTypeToBeDirectionLight();

            BuildComponentTool.buildLight()
            |> ReactTestTool.createSnapshotAndMatch;
          },
        );

        describe("should re-init all light material components", () =>
          describe("test change direction light to be point light", () =>
            test(
              "test
               glsl->DIRECTION_LIGHTS_COUNT should - 1;
               glsl->POINT_LIGHTS_COUNT should + 1;",
              () => {
                let gl = FakeGlToolEngine.getEngineStateGl();
                let glShaderSource = gl##shaderSource;

                MainEditorLightTool.setLightTypeToBePointLight();

                (
                  GLSLToolEngine.contain(
                    GLSLToolEngine.getVsSource(glShaderSource),
                    {|#define DIRECTION_LIGHTS_COUNT 0|},
                  ),
                  GLSLToolEngine.contain(
                    GLSLToolEngine.getVsSource(glShaderSource),
                    {|#define POINT_LIGHTS_COUNT 1|},
                  ),
                )
                |> expect == (true, true);
              },
            )
          )
        );

        describe("deal with specific cases", () => {
          beforeEach(() => ConsoleTool.notShowMessage());
          afterEach(() => ConsoleTool.showMessage());

          test(
            "if target light type is maxCount, not change to it and warn", () => {
            let engineState = StateEngineService.unsafeGetState();
            let (engineState, _, _) =
              PointLightToolEngine.createGameObject(engineState);
            let (engineState, _, _) =
              PointLightToolEngine.createGameObject(engineState);
            let (engineState, _, _) =
              PointLightToolEngine.createGameObject(engineState);
            let (engineState, _, _) =
              PointLightToolEngine.createGameObject(engineState);
            let warn =
              createMethodStubWithJsObjSandbox(
                sandbox,
                ConsoleTool.console,
                "warn",
              );

            MainEditorLightTool.setLightTypeToBePointLight();

            let engineState = StateEngineService.unsafeGetState();

            (
              ConsoleTool.getMessage(warn)
              |> Js.String.includes(
                   "the point light count is exceed max count",
                 ),
              GameObjectTool.unsafeGetCurrentSceneTreeNode()
              |> GameObjectComponentEngineService.hasPointLightComponent(
                   _,
                   engineState,
                 ),
            )
            |> expect == (true, false);
          });
        });
      });

      describe("deal with specific cases", () =>
        test(
          "test getLightTypeByGameObject should throw error when gameObject haven't light ",
          () =>
          expect(() => {
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

            MainEditorLightUtils.getLightTypeByGameObject(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData;
          })
          |> toThrowMessageRe([%re {|/should\shas\slight\scomponent/img|}])
        )
      );
    });
  });