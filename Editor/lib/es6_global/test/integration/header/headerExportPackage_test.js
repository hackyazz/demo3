

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as LoadTool$WonderEditor from "../asset/tool/LoadTool.js";
import * as ConsoleTool$WonderEditor from "../../unit/tool/external/ConsoleTool.js";
import * as ControllerTool$WonderEditor from "../../unit/composable_component/controller/tool/ControllerTool.js";
import * as ImageDataMapTool$WonderEditor from "../asset/tool/ImageDataMapTool.js";
import * as ExportPackageTool$WonderEditor from "./tool/ExportPackageTool.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as HeaderExportPackageUtils$WonderEditor from "../../../src/core/composable_component/header/utils/export/HeaderExportPackageUtils.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../asset/tool/MainEditorAssetUploadTool.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../src/service/state/editor/asset/TextureNodeAssetEditorService.js";

describe("header export package", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("if is run", (function () {
                return Wonder_jest.test("warn", (function () {
                              ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                              var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                              ControllerTool$WonderEditor.run(/* () */0);
                              HeaderExportPackageUtils$WonderEditor.exportPackage("aaa");
                              return Sinon.toCalledWith(/* array */["should export package when stop, but now is run!"], Wonder_jest.Expect[/* expect */0](warn));
                            }));
              }));
        describe("optimize", (function () {
                beforeEach((function () {
                        Curry._1(LoadTool$WonderEditor.buildFakeAtob, /* () */0);
                        Curry._1(LoadTool$WonderEditor.buildFakeBtoa, /* () */0);
                        Curry._1(LoadTool$WonderEditor.buildFakeTextEncoder, /* () */0);
                        LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                        LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                        Curry._1(LoadTool$WonderEditor.buildFakeLoadImage, /* () */0);
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                      }));
                return Wonder_jest.testPromise("set builded image uint8Array to editorState", (function () {
                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function () {
                                            ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TextureNodeAssetEditorService$WonderEditor.findAllTextureNodes(editorState).filter((function (node) {
                                                                      var match = ImageDataMapTool$WonderEditor.getDataByTextureNode(node, editorState);
                                                                      return Js_option.isSome(match[/* uint8Array */1]);
                                                                    })).length), 1));
                                          }));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
