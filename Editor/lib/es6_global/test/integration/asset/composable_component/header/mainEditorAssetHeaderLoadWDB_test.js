

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as WDBTool$WonderEditor from "../../../../tool/WDBTool.js";
import * as LoadTool$WonderEditor from "../../tool/LoadTool.js";
import * as ConsoleTool$WonderEditor from "../../../../unit/tool/external/ConsoleTool.js";
import * as LoadWDBTool$WonderEditor from "../../../tool/LoadWDBTool.js";
import * as OptionService$WonderEditor from "../../../../../src/service/primitive/OptionService.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as GameObjectUtils$WonderEditor from "../../../../../src/core/utils/engine/GameObjectUtils.js";
import * as SparseMapService$WonderEditor from "../../../../../src/service/atom/SparseMapService.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as SettingToolEngine$WonderEditor from "../../../../tool/engine/SettingToolEngine.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as MainEditorCameraTool$WonderEditor from "../../../../tool/MainEditorCameraTool.js";
import * as GameViewEditorService$WonderEditor from "../../../../../src/service/state/editor/view/gameView/GameViewEditorService.js";
import * as GeometryEngineService$WonderEditor from "../../../../../src/service/state/engine/GeometryEngineService.js";
import * as MainEditorAssetIdTool$WonderEditor from "../../tool/MainEditorAssetIdTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../../../inspector/composable_component/assetTree_inspector/tool/AssetTreeInspectorTool.js";
import * as GameObjectLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/GameObjectLogicService.js";
import * as PrimitiveEngineService$WonderEditor from "../../../../../src/service/state/engine/PrimitiveEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../src/service/state/engine/GameObjectEngineService.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../tool/MainEditorAssetUploadTool.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../src/service/state/engine/MeshRendererEngineService.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as GameObjectMeshRendererTool$WonderEditor from "../../../../tool/GameObjectMeshRendererTool.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../src/service/state/engine/LightMaterialEngineService.js";
import * as MainEditorAssetWDBNodeTool$WonderEditor from "../../tool/MainEditorAssetWDBNodeTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as MainEditorAssetFolderNodeTool$WonderEditor from "../../tool/MainEditorAssetFolderNodeTool.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/GeometryDataAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/ImageDataMapAssetEditorService.js";
import * as MainEditorAssetTextureNodeTool$WonderEditor from "../../tool/MainEditorAssetTextureNodeTool.js";
import * as MaterialNodeAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/MaterialNodeAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../src/service/state/engine/BasicSourceTextureEngineService.js";
import * as MainEditorAssetMaterialNodeTool$WonderEditor from "../../tool/MainEditorAssetMaterialNodeTool.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("MainEditorAssetHeader->load wdb", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var cubeTexturedWDBArrayBuffer = /* record */[/* contents */1];
        var truckWDBArrayBuffer = /* record */[/* contents */1];
        var sceneWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                cubeTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("CubeTextured");
                truckWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("CesiumMilkTruck");
                sceneWDBArrayBuffer[0] = WDBTool$WonderEditor.generateSceneWDB(/* () */0);
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test load wdb", (function () {
                beforeEach((function () {
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                        LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                        return LoadTool$WonderEditor.buildFakeLoadImage();
                      }));
                Wonder_jest.testPromise("should not active wdb->camera", (function () {
                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                        var currentCameraGameObject = MainEditorCameraTool$WonderEditor.getCurrentCameraGameObject(engineState);
                        StateLogicService$WonderEditor.getAndSetEditorState(GameViewEditorService$WonderEditor.removeActivedBasicCameraView);
                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, "Scene", /* () */0).then((function () {
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                          GameViewEditorService$WonderEditor.getActivedBasicCameraView(editorState),
                                                          MainEditorCameraTool$WonderEditor.getCurrentCameraGameObject(engineState)
                                                        ]), /* tuple */[
                                                      undefined,
                                                      currentCameraGameObject
                                                    ]));
                                    }));
                      }));
                Wonder_jest.testPromise("test the wdb gameObject and it's children isRender should be false", (function () {
                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, "CubeTextured", /* () */0).then((function (uploadedWDBNodeId) {
                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                      var wdbGameObject = MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(uploadedWDBNodeId, editorState);
                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return GameObjectMeshRendererTool$WonderEditor.getAllGameObjectMeshRendererComponent(wdbGameObject, param);
                                                                  })).map((function (meshRender) {
                                                                  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return MeshRendererEngineService$WonderEditor.getMeshRendererIsRender(meshRender, param);
                                                                              }));
                                                                })).filter((function (isRender) {
                                                                return isRender;
                                                              })).length), 0));
                                    }));
                      }));
                describe("extract assets from loaded wdb asset", (function () {
                        beforeEach((function () {
                                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                return /* () */0;
                              }));
                        describe("if wdb has no material", (function () {
                                var wdbArrayBuffer = /* record */[/* contents */1];
                                var _generateWDB = function () {
                                  return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                                var match = GameObjectLogicService$WonderEditor.createGameObject(/* tuple */[
                                                      editorState,
                                                      engineState
                                                    ]);
                                                var match$1 = match[1];
                                                var match$2 = GameObjectEngineService$WonderEditor.create(match$1[0]);
                                                var rootGameObject = match$2[1];
                                                var engineState$1 = GameObjectUtils$WonderEditor.addChild(rootGameObject, match$1[1], match$2[0]);
                                                return /* tuple */[
                                                        rootGameObject,
                                                        /* tuple */[
                                                          match[0],
                                                          engineState$1
                                                        ]
                                                      ];
                                              }));
                                };
                                beforeAll((function () {
                                        wdbArrayBuffer[0] = _generateWDB(/* () */0);
                                        return /* () */0;
                                      }));
                                return Wonder_jest.testPromise("should has no extracted assets", (function () {
                                              Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                            StateEditorService$WonderEditor.getState(/* () */0);
                                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](StateLogicService$WonderEditor.getEditorState(MainEditorAssetTreeTool$WonderEditor.getRootNodeId), undefined, /* () */0);
                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                          }));
                                            }));
                              }));
                        describe("extract material assets", (function () {
                                describe("test asset tree", (function () {
                                        describe("should add \"Materials\" folder node and add material node into it", (function () {
                                                Wonder_jest.testPromise("test load the same wdb once", (function () {
                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("Materials", /* tuple */[
                                                                                    editorState,
                                                                                    engineState
                                                                                  ])), undefined, /* () */0);
                                                                      return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                    }));
                                                      }));
                                                return Wonder_jest.testPromise("test load the same wdb twice", (function () {
                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
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
                                              }));
                                        return Wonder_jest.testPromise("material asset should has unique name", (function () {
                                                      Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                                      var addedFolderNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                      StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                              return MainEditorAssetFolderNodeTool$WonderEditor.setFolderName(addedFolderNodeId, "Materials", param);
                                                            }));
                                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId, undefined, /* () */0);
                                                      var addedMaterialNodeId = addedFolderNodeId + 1 | 0;
                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                      AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, addedMaterialNodeId, LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectMaterialName(/* () */0), /* () */0);
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                                    StateEditorService$WonderEditor.getState(/* () */0);
                                                                    MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId, undefined, /* () */0);
                                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                  }));
                                                    }));
                                      }));
                                describe("test wdb asset->wdb gameObject->material", (function () {
                                        Wonder_jest.testPromise("wdb gameObject should use extraced material asset->materialComponent", (function () {
                                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                              var cubeTexturedMeshGameObject = LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId, /* tuple */[
                                                                    editorState,
                                                                    engineState
                                                                  ]);
                                                              var material = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(cubeTexturedMeshGameObject, engineState);
                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetMaterialNodeTool$WonderEditor.hasMaterialComponent(material, LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectMaterialType(/* () */0), editorState)), true));
                                                            }));
                                              }));
                                        return Wonder_jest.testPromise("if already has equaled material asset, wdb gameObject should use it", (function () {
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                  var cubeTexturedMeshGameObject1 = LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId1, /* tuple */[
                                                                                        editorState,
                                                                                        engineState
                                                                                      ]);
                                                                                  var material1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(cubeTexturedMeshGameObject1, engineState);
                                                                                  var cubeTexturedMeshGameObject2 = LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId2, /* tuple */[
                                                                                        editorState,
                                                                                        engineState
                                                                                      ]);
                                                                                  var material2 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(cubeTexturedMeshGameObject2, engineState);
                                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                      MainEditorAssetMaterialNodeTool$WonderEditor.hasMaterialComponent(material1, LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectMaterialType(/* () */0), editorState),
                                                                                                      MainEditorAssetMaterialNodeTool$WonderEditor.hasMaterialComponent(material2, LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectMaterialType(/* () */0), editorState),
                                                                                                      MaterialNodeAssetEditorService$WonderEditor.findAllMaterialNodes(editorState).length
                                                                                                    ]), /* tuple */[
                                                                                                  true,
                                                                                                  true,
                                                                                                  1
                                                                                                ]));
                                                                                }));
                                                                  }));
                                                    }));
                                      }));
                                describe("fix bug", (function () {
                                        var wdbArrayBuffer = /* record */[/* contents */1];
                                        var _generateShareMaterialWDB = function () {
                                          return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                                        var match = GeometryEngineService$WonderEditor.createCubeGeometry(engineState);
                                                        var geometry = match[1];
                                                        var match$1 = LightMaterialEngineService$WonderEditor.create(match[0]);
                                                        var lightMaterial = match$1[1];
                                                        var match$2 = PrimitiveEngineService$WonderEditor.createCube(/* tuple */[
                                                              geometry,
                                                              lightMaterial
                                                            ], editorState, match$1[0]);
                                                        var match$3 = PrimitiveEngineService$WonderEditor.createCube(/* tuple */[
                                                              geometry,
                                                              lightMaterial
                                                            ], match$2[0], match$2[1]);
                                                        var match$4 = GameObjectEngineService$WonderEditor.create(match$3[1]);
                                                        var rootGameObject = match$4[1];
                                                        var engineState$1 = GameObjectUtils$WonderEditor.addChild(rootGameObject, match$3[2], GameObjectUtils$WonderEditor.addChild(rootGameObject, match$2[2], match$4[0]));
                                                        return /* tuple */[
                                                                rootGameObject,
                                                                /* tuple */[
                                                                  match$3[0],
                                                                  engineState$1
                                                                ]
                                                              ];
                                                      }));
                                        };
                                        beforeAll((function () {
                                                wdbArrayBuffer[0] = _generateShareMaterialWDB(/* () */0);
                                                return /* () */0;
                                              }));
                                        return Wonder_jest.testPromise("if wdb gameObjects share the same material, should only extrace the shared material once", (function () {
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
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
                                return /* () */0;
                              }));
                        describe("extract texture assets", (function () {
                                describe("test asset tree", (function () {
                                        describe("should add \"Textures\" folder node and add texture node into it", (function () {
                                                Wonder_jest.testPromise("test load the same wdb once", (function () {
                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("Textures", /* tuple */[
                                                                                    editorState,
                                                                                    engineState
                                                                                  ])), undefined, /* () */0);
                                                                      return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                    }));
                                                      }));
                                                return Wonder_jest.testPromise("test load the same wdb twice", (function () {
                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                          MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("Textures", /* tuple */[
                                                                                                        editorState,
                                                                                                        engineState
                                                                                                      ])), undefined, /* () */0);
                                                                                          return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                                        }));
                                                                          }));
                                                            }));
                                              }));
                                        return Wonder_jest.testPromise("texture asset should has unique name", (function () {
                                                      Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                      var addedFolderNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                      StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                              return MainEditorAssetFolderNodeTool$WonderEditor.setFolderName(addedFolderNodeId, "Textures", param);
                                                            }));
                                                      var textureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                                                      AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetTextureNode */1](undefined, undefined, textureNodeId, LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectTextureName(/* () */0), /* () */0);
                                                      MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetChildrenNodeIntoAssetTreeNode */1](textureNodeId, addedFolderNodeId, undefined, undefined, /* () */0);
                                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](StateLogicService$WonderEditor.getEditorState(MainEditorAssetTreeTool$WonderEditor.getRootNodeId), undefined, /* () */0);
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                                    StateEditorService$WonderEditor.getState(/* () */0);
                                                                    MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId, undefined, /* () */0);
                                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                  }));
                                                    }));
                                      }));
                                describe("test wdb asset->wdb gameObject->texture", (function () {
                                        Wonder_jest.testPromise("wdb gameObject should use extraced texture asset->textureComponent", (function () {
                                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                              var cubeTexturedMeshGameObject = LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId, /* tuple */[
                                                                    editorState,
                                                                    engineState
                                                                  ]);
                                                              var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(cubeTexturedMeshGameObject, engineState);
                                                              var diffuseMap = LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialDiffuseMap(__x, engineState);
                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetTextureNodeTool$WonderEditor.hasTextureComponent(diffuseMap, editorState)), true));
                                                            }));
                                              }));
                                        return Wonder_jest.testPromise("if already has equaled texture asset, wdb gameObject should use it", (function () {
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                    var cubeTexturedMeshGameObject1 = LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId1, /* tuple */[
                                                                          editorState,
                                                                          engineState
                                                                        ]);
                                                                    var material1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(cubeTexturedMeshGameObject1, engineState);
                                                                    StateEditorService$WonderEditor.setState(editorState);
                                                                    StateEngineService$WonderEditor.setState(engineState);
                                                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, OptionService$WonderEditor.unsafeGet(MainEditorAssetMaterialNodeTool$WonderEditor.findNodeIdByMaterialComponentAndType(material1, LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectMaterialType(/* () */0), editorState)), /* () */0);
                                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                  var cubeTexturedMeshGameObject2 = LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId2, /* tuple */[
                                                                                        editorState,
                                                                                        engineState
                                                                                      ]);
                                                                                  var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(cubeTexturedMeshGameObject2, engineState);
                                                                                  var diffuseMap2 = LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialDiffuseMap(__x, engineState);
                                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                      MainEditorAssetTextureNodeTool$WonderEditor.hasTextureComponent(diffuseMap2, editorState),
                                                                                                      TextureNodeAssetEditorService$WonderEditor.findAllTextureNodes(editorState).length,
                                                                                                      SparseMapService$WonderEditor.length(ImageDataMapAssetEditorService$WonderEditor.getValidValues(editorState))
                                                                                                    ]), /* tuple */[
                                                                                                  true,
                                                                                                  1,
                                                                                                  1
                                                                                                ]));
                                                                                }));
                                                                  }));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("fix bug", (function () {
                                var wdbArrayBuffer = /* record */[/* contents */1];
                                var _generateWDB = function () {
                                  return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                                var match = GeometryEngineService$WonderEditor.createCubeGeometry(engineState);
                                                var geometry = match[1];
                                                var match$1 = LightMaterialEngineService$WonderEditor.create(match[0]);
                                                var lightMaterial1 = match$1[1];
                                                var match$2 = LightMaterialEngineService$WonderEditor.create(match$1[0]);
                                                var lightMaterial2 = match$2[1];
                                                var match$3 = BasicSourceTextureEngineService$WonderEditor.create(match$2[0]);
                                                var map1 = match$3[1];
                                                var match$4 = BasicSourceTextureEngineService$WonderEditor.create(match$3[0]);
                                                var map2 = match$4[1];
                                                var source = WDBTool$WonderEditor.buildSource(undefined, undefined, "image.png", /* () */0);
                                                var engineState$1 = BasicSourceTextureEngineService$WonderEditor.setSource(source, map2, BasicSourceTextureEngineService$WonderEditor.setSource(source, map1, match$4[0]));
                                                var engineState$2 = LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseMap(map1, lightMaterial1, engineState$1);
                                                var engineState$3 = LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseMap(map2, lightMaterial2, engineState$2);
                                                var match$5 = PrimitiveEngineService$WonderEditor.createCube(/* tuple */[
                                                      geometry,
                                                      lightMaterial1
                                                    ], editorState, engineState$3);
                                                var match$6 = PrimitiveEngineService$WonderEditor.createCube(/* tuple */[
                                                      geometry,
                                                      lightMaterial1
                                                    ], match$5[0], match$5[1]);
                                                var match$7 = PrimitiveEngineService$WonderEditor.createCube(/* tuple */[
                                                      geometry,
                                                      lightMaterial2
                                                    ], match$6[0], match$6[1]);
                                                var match$8 = GameObjectEngineService$WonderEditor.create(match$7[1]);
                                                var rootGameObject = match$8[1];
                                                var engineState$4 = GameObjectUtils$WonderEditor.addChild(rootGameObject, match$7[2], GameObjectUtils$WonderEditor.addChild(rootGameObject, match$6[2], GameObjectUtils$WonderEditor.addChild(rootGameObject, match$5[2], match$8[0])));
                                                return /* tuple */[
                                                        rootGameObject,
                                                        /* tuple */[
                                                          match$7[0],
                                                          engineState$4
                                                        ]
                                                      ];
                                              }));
                                };
                                beforeAll((function () {
                                        wdbArrayBuffer[0] = _generateWDB(/* () */0);
                                        return /* () */0;
                                      }));
                                return Wonder_jest.testPromise("\n          1.load wdb asset a1(\n          has three children: c1, c2, c3;\n          c1,c2 share one material m1;\n          c3 use material m2;\n          m1 use texture t1;\n          m2 use texture t2;\n          t1,t2 use the same image i1;\n          )\n\n          should extract 2 texture assets;\n          should only has one image node;\n          ", (function () {
                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                TextureNodeAssetEditorService$WonderEditor.findAllTextureNodes(editorState).length,
                                                                                SparseMapService$WonderEditor.length(ImageDataMapAssetEditorService$WonderEditor.getValidValues(editorState))
                                                                              ]), /* tuple */[
                                                                            2,
                                                                            1
                                                                          ]));
                                                          }));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("relate wdb asset gameObjects with default geometrys", (function () {
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
                                        var engineState$1 = GameObjectUtils$WonderEditor.addChild(rootGameObject, match$2[2], match$2[1]);
                                        return /* tuple */[
                                                rootGameObject,
                                                /* tuple */[
                                                  match$2[0],
                                                  engineState$1
                                                ]
                                              ];
                                      }));
                        };
                        beforeAll((function () {
                                wdbArrayBuffer[0] = _generateWDB(/* () */0);
                                return /* () */0;
                              }));
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, false, undefined, /* () */0);
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                              }));
                        return Wonder_jest.testPromise("\n        1.create gameObject g1 with default cube geometry in scene;\n        2.load wdb asset w1(has one cube gameObject with default cube geometry);\n\n        g1->geometry->select geometry group widget should only have not-duplicate-default-geometrys and be using default cube geometry\n        ", (function () {
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                    MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0)));
                                                  }));
                                    }));
                      }));
                describe("fix bug", (function () {
                        Wonder_jest.testPromise("the wdb->name in the same path should be unique", (function () {
                                var fileName = "CubeTextured";
                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, fileName, /* () */0).then((function (uploadedWDBNodeId1) {
                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, fileName, /* () */0).then((function (uploadedWDBNodeId2) {
                                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                NodeNameAssetLogicService$WonderEditor.getWDBNodeName(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(uploadedWDBNodeId1, editorState)),
                                                                                NodeNameAssetLogicService$WonderEditor.getWDBNodeName(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(uploadedWDBNodeId2, editorState))
                                                                              ]), /* tuple */[
                                                                            fileName,
                                                                            "CubeTextured 1"
                                                                          ]));
                                                          }));
                                            }));
                              }));
                        describe("load wdb contain light shouldn't warn exceed max count even though the total light count is exceed(because wdb light is not render)", (function () {
                                var wdbArrayBuffer = /* record */[/* contents */1];
                                var _generateWDB = function () {
                                  return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                                var match = GameObjectEngineService$WonderEditor.create(engineState);
                                                var rootGameObject = match[1];
                                                var match$1 = PrimitiveEngineService$WonderEditor.createDirectionLight(editorState, match[0]);
                                                var engineState$1 = GameObjectUtils$WonderEditor.addChild(rootGameObject, match$1[2], match$1[1]);
                                                return /* tuple */[
                                                        rootGameObject,
                                                        /* tuple */[
                                                          match$1[0],
                                                          engineState$1
                                                        ]
                                                      ];
                                              }));
                                };
                                beforeAll((function () {
                                        wdbArrayBuffer[0] = _generateWDB(/* () */0);
                                        return /* () */0;
                                      }));
                                return Wonder_jest.testPromise("test", (function () {
                                              MainEditorSceneTool$WonderEditor.initState(sandbox, false, undefined, /* () */0);
                                              MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                              ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                              var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var match = PrimitiveEngineService$WonderEditor.createDirectionLight(editorState, engineState);
                                              var match$1 = PrimitiveEngineService$WonderEditor.createDirectionLight(match[0], match[1]);
                                              var match$2 = PrimitiveEngineService$WonderEditor.createDirectionLight(match$1[0], match$1[1]);
                                              var match$3 = PrimitiveEngineService$WonderEditor.createDirectionLight(match$2[0], match$2[1]);
                                              StateEditorService$WonderEditor.setState(match$3[0]);
                                              StateEngineService$WonderEditor.setState(match$3[1]);
                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                            return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](warn))));
                                                          }));
                                            }));
                              }));
                        describe("fix geometry bug", (function () {
                                return Wonder_jest.testPromise("\n        1.create gameObject g1 in scene;\n        2.load truck wdb asset w1;\n\n        g1->geometry->select geometry group widget shouldn't has \"NoName Geometry\"\n        ", (function () {
                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(truckWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                            MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0)));
                                                          }));
                                            }));
                              }));
                        describe("fix load wdb after load wdb error", (function () {
                                var stoveWDBArrayBuffer = /* record */[/* contents */1];
                                beforeAll((function () {
                                        stoveWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("SuperLowPolyStove");
                                        return /* () */0;
                                      }));
                                return Wonder_jest.testPromise("\n            1.load wdb w1(error);\n            2.load wdb w2;\n\n            should load w2 success\n            ", (function () {
                                              MainEditorSceneTool$WonderEditor.initState(sandbox, false, SettingToolEngine$WonderEditor.buildBufferConfigStr(10000, 30, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                              MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                              ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(stoveWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                            var error = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                                          return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](error))));
                                                                        }));
                                                          }));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
