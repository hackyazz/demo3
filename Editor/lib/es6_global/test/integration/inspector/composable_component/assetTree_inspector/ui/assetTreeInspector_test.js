

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as ReactTool$WonderEditor from "../../../../../tool/ui/ReactTool.js";
import * as InspectorTool$WonderEditor from "../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as AssetWidgetService$WonderEditor from "../../../../../../src/service/record/editor/widget/AssetWidgetService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../tool/AssetTreeInspectorTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetFolderNodeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetFolderNodeTool.js";
import * as MainEditorAssetTextureNodeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetTextureNodeTool.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js";
import * as MainEditorAssetChildrenNodeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetChildrenNodeTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor from "../../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js";

describe("assetTree inspector", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("prepare currentSelectSource", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                        var partial_arg = AssetWidgetService$WonderEditor.getWidget(/* () */0);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                    }));
                      }));
                afterEach((function () {
                        StateEditorService$WonderEditor.setState(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0))));
                        return /* () */0;
                      }));
                describe("test component snapshot", (function () {
                        Wonder_jest.test("if hasn't current node, show nothing", (function () {
                                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                              }));
                        describe("else", (function () {
                                Wonder_jest.test("test set folder to be current node", (function () {
                                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                        MainEditorAssetChildrenNodeTool$WonderEditor.selectFolderNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, undefined, /* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                      }));
                                return Wonder_jest.test("test set texture to be current node", (function () {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                              MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test rename folder node", (function () {
                        Wonder_jest.test("test rename to specific name", (function () {
                                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */3](undefined, undefined, nodeId, "mickeyFolder", /* () */0);
                                MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](nodeId, undefined, /* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                              }));
                        describe("test the root folder can't be rename", (function () {
                                return Wonder_jest.test("the root treeNode->rename-input->disabled should be true", (function () {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getRootNodeId */2], assetTreeData);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeInspectorTool$WonderEditor.Rename[/* isFolderNameDisabled */4](nodeId)), true);
                                            }));
                              }));
                        describe("test rename asset tree children node", (function () {
                                describe("if node has ext name", (function () {
                                        Wonder_jest.test("rename input should show it", (function () {
                                                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                                var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                                StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                        return MainEditorAssetFolderNodeTool$WonderEditor.setFolderName(nodeId, "folder1.aaa", param);
                                                      }));
                                                MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](nodeId, undefined, /* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                              }));
                                        return Wonder_jest.test("if rename success, the newName should include ext name", (function () {
                                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                                      var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                                      AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */3](undefined, undefined, nodeId, "folder.aaa", /* () */0);
                                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](nodeId, undefined, /* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("deal with specific case", (function () {
                                return Wonder_jest.test("key in '', trigger onBlur, the input value should be original name", (function () {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                              var reasonStateUpdate = ReactTool$WonderEditor.getUpdateState(AssetTreeInspectorTool$WonderEditor.reducer(undefined, undefined, nodeId, /* Blur */0, /* record */[
                                                        /* inputValue */"",
                                                        /* originalName */"bbb"
                                                      ], /* () */0));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](reasonStateUpdate[/* inputValue */0]), "bbb");
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test rename texture node", (function () {
                        describe("test rename asset tree children node", (function () {
                                describe("if node has ext name", (function () {
                                        return Wonder_jest.test("rename input shouldn't show it", (function () {
                                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                      var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                                                      StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                              return MainEditorAssetTextureNodeTool$WonderEditor.setTextureImageName(nodeId, "texture1.png", param);
                                                            }));
                                                      MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(nodeId, undefined, undefined, /* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                    }));
                                      }));
                                return /* () */0;
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
