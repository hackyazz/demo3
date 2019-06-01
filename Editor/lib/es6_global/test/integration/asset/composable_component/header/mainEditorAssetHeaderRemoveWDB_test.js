

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as WDBTool$WonderEditor from "../../../../tool/WDBTool.js";
import * as LoadTool$WonderEditor from "../../tool/LoadTool.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as LoadWDBTool$WonderEditor from "../../../tool/LoadWDBTool.js";
import * as ArrayService$WonderEditor from "../../../../../src/service/atom/ArrayService.js";
import * as InspectorTool$WonderEditor from "../../../../tool/ui/InspectorTool.js";
import * as OptionService$WonderEditor from "../../../../../src/service/primitive/OptionService.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as GameObjectUtils$WonderEditor from "../../../../../src/core/utils/engine/GameObjectUtils.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as ImportPackageTool$WonderEditor from "../../../header/tool/ImportPackageTool.js";
import * as SettingToolEngine$WonderEditor from "../../../../tool/engine/SettingToolEngine.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as PrimitiveEngineService$WonderEditor from "../../../../../src/service/state/engine/PrimitiveEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../src/service/state/engine/GameObjectEngineService.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../tool/MainEditorAssetTreeTool.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../../unit/tool/MainEditorSceneTreeTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../tool/MainEditorAssetUploadTool.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../src/service/state/engine/LightMaterialEngineService.js";
import * as MainEditorAssetWDBNodeTool$WonderEditor from "../../tool/MainEditorAssetWDBNodeTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/GeometryDataAssetEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("MainEditorAssetHeader->remove wdb", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var cubeTexturedWDBArrayBuffer = /* record */[/* contents */1];
        var sceneWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                cubeTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("CubeTextured");
                sceneWDBArrayBuffer[0] = WDBTool$WonderEditor.generateSceneWDB(/* () */0);
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                LoadTool$WonderEditor.buildFakeLoadImage();
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("drag wdb asset into scene;\n              select wdb to be currentNode;\n              click remove-button;\n              ", (function () {
                describe("test cloned gameObjects of the wdb asset", (function () {
                        Wonder_jest.testPromise("cloned gameObjects shouldn't be removed", (function () {
                                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                            }));
                              }));
                        describe("cloned gameObjects->geometrys should be disposed", (function () {
                                var _prepare = function (testFunc) {
                                  MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                var clonedGameObjectsWhoHasGeometryWhenCloned = LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjects(engineState);
                                                StateEngineService$WonderEditor.setState(engineState);
                                                return Curry._2(testFunc, clonedGameObjectsWhoHasGeometryWhenCloned, engineState);
                                              }));
                                };
                                Wonder_jest.testPromise("test engine", (function () {
                                        return _prepare((function (clonedGameObjectsWhoHasGeometryWhenCloned, engineState) {
                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](clonedGameObjectsWhoHasGeometryWhenCloned.map((function (gameObject) {
                                                                                return GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(gameObject, engineState);
                                                                              }))), /* array */[
                                                                      false,
                                                                      false
                                                                    ]));
                                                    }));
                                      }));
                                return Wonder_jest.testPromise("test snapshot", (function () {
                                              return _prepare((function (clonedGameObjectsWhoHasGeometryWhenCloned, _) {
                                                            MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, ArrayService$WonderEditor.unsafeGetFirst(clonedGameObjectsWhoHasGeometryWhenCloned), /* () */0);
                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                                          }));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("dispose wdb asset gameObject", (function () {
                        Wonder_jest.testPromise("it's geometry should be disposed", (function () {
                                MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                              MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                              var component = BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0);
                                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(component));
                                            }));
                              }));
                        describe("it's material should be removed", (function () {
                                return Wonder_jest.testPromise("the material asset related with the material component should exist", (function () {
                                              MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                            MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("Materials", /* tuple */[
                                                                          editorState,
                                                                          engineState
                                                                        ])), undefined, /* () */0);
                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                          }));
                                            }));
                              }));
                        return Wonder_jest.testPromise("it should be disposed", (function () {
                                      MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var wdbGameObject = LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId, /* tuple */[
                                                          editorState,
                                                          engineState
                                                        ]);
                                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.isAlive(wdbGameObject, engineState)), false));
                                                  }));
                                    }));
                      }));
                return /* () */0;
              }));
        Wonder_jest.testPromise("load CubeTextured.wdb;\n              remove CubeTextured.wdb;\n              load Scene.wdb;\n              load CubeTextured.wdb;\n\n              the MainEditorAssetChildrenNode panel should show \"Scene\",\"Cubetextured\"\n                ", (function () {
                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                          return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0)));
                                                        }));
                                          }));
                            }));
              }));
        describe("fix bug", (function () {
                describe("the default geometry with wdb asset should be remove instead of dispose when remove wdb asset", (function () {
                        var wdbArrayBuffer = /* record */[/* contents */1];
                        var _generateWDB = function () {
                          return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                        var match = GameObjectEngineService$WonderEditor.create(engineState);
                                        var rootGameObject = match[1];
                                        var geometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState);
                                        var match$1 = LightMaterialEngineService$WonderEditor.create(match[0]);
                                        var match$2 = PrimitiveEngineService$WonderEditor.createCube(/* tuple */[
                                              geometry,
                                              match$1[1]
                                            ], editorState, match$1[0]);
                                        var cube1 = match$2[2];
                                        var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("Cube1", cube1, match$2[1]);
                                        var engineState$2 = GameObjectUtils$WonderEditor.addChild(rootGameObject, cube1, engineState$1);
                                        return /* tuple */[
                                                rootGameObject,
                                                /* tuple */[
                                                  match$2[0],
                                                  engineState$2
                                                ]
                                              ];
                                      }));
                        };
                        beforeAll((function () {
                                wdbArrayBuffer[0] = _generateWDB(/* () */0);
                                return /* () */0;
                              }));
                        return Wonder_jest.testPromise("\n        1.create gameObject g1 with default cube geometry in scene;\n        2.load wdb asset w1(has one cube gameObject with default cube geometry);\n        3.drag wdb asset to scene tree to be c1;\n        4.remove w1;\n\n        c1's and g1's geometry shouldn't be changed\n        ", (function () {
                                      MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var firstCubeGameObject = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                    StateEditorService$WonderEditor.getState(/* () */0);
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var clonedGameObject = LoadWDBTool$WonderEditor.findGameObjectByName("Cube1", engineState);
                                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                                    var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(clonedGameObject, engineState$1),
                                                                        GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(firstCubeGameObject, engineState$1)
                                                                      ]), /* tuple */[
                                                                    true,
                                                                    true
                                                                  ]));
                                                  }));
                                    }));
                      }));
                describe("test with import package", (function () {
                        var truckWDBArrayBuffer = /* record */[/* contents */1];
                        beforeAll((function () {
                                truckWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("CesiumMilkTruck");
                                return /* () */0;
                              }));
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), SettingToolEngine$WonderEditor.buildBufferConfigStr(300000, 300, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), false, undefined, /* () */0);
                                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                              }));
                        return Wonder_jest.testPromise("\n        1.load truck wdb asset w1;\n        2.drag w1 to scene tree to be c1;\n        3.export package;\n        4.import package;\n        3.export package;\n        4.import package;\n        4.remove w1;\n\n        c1's all geometrys should be disposed\n        ", (function () {
                                      ImportPackageTool$WonderEditor.prepareFakeCanvas(sandbox);
                                      var wdbName = "TruckWDB";
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(truckWDBArrayBuffer[0], undefined, undefined, wdbName, /* () */0).then((function (uploadedWDBNodeId) {
                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                    return ImportPackageTool$WonderEditor.testImportPackage((function () {
                                                                  return ImportPackageTool$WonderEditor.testImportPackage((function () {
                                                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, MainEditorAssetWDBNodeTool$WonderEditor.getWDBNodeIdByName(wdbName, /* tuple */[
                                                                                          editorState,
                                                                                          engineState
                                                                                        ]), /* () */0);
                                                                                var __x = LoadWDBTool$WonderEditor.findGameObjectByName(LoadWDBTool$WonderEditor.Truck[/* getTruck1GameObjectName */1](/* () */0), engineState);
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(__x, engineState)), false));
                                                                              }), undefined, undefined, undefined, undefined, /* () */0);
                                                                }), undefined, undefined, undefined, undefined, /* () */0);
                                                  }));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
