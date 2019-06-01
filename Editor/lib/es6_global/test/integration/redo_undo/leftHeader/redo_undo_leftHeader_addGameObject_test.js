

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";

describe("redo_undo:leftHeader add gameObject", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateAddCubeAndEmptyGameObject = function () {
          MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
          return MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
        };
        var _simulateTwiceAddSphere = function () {
          MainEditorLeftHeaderTool$WonderEditor.addSphere(undefined, undefined, /* () */0);
          return MainEditorLeftHeaderTool$WonderEditor.addSphere(undefined, undefined, /* () */0);
        };
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "add cube and empty gameObject;\n      prepare first step: set currentSceneTreeNode", /* tuple */[
              _simulateAddCubeAndEmptyGameObject,
              _beforeEach,
              (function () {
                  return /* () */0;
                })
            ], BuildComponentForCurryTool$WonderEditor.buildSceneTree);
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "add sphere;\n      prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceAddSphere,
                    _beforeEach,
                    (function () {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildSceneTree);
      }));

export {
  
}
/*  Not a pure module */
