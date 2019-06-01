

import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as OptionService$WonderEditor from "../../../../src/service/primitive/OptionService.js";
import * as NodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/NodeAssetService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/WDBNodeAssetService.js";
import * as MainEditorAssetTreeTool$WonderEditor from "./MainEditorAssetTreeTool.js";
import * as GeometryAssetLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/asset/GeometryAssetLogicService.js";
import * as WDBNodeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/WDBNodeAssetEditorService.js";
import * as RootTreeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/RootTreeAssetEditorService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";

function getWDBGameObject(nodeId, editorState) {
  return WDBNodeAssetService$WonderEditor.getWDBGameObject(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
}

var getAllWDBGameObjects = GeometryAssetLogicService$WonderEditor.getAllWDBGameObjects;

function addWDBNodeToRoot(gameObject, nodeId, editorState, $staropt$star, $staropt$star$1, _) {
  var name = $staropt$star !== undefined ? $staropt$star : "";
  if ($staropt$star$1 !== undefined) {
    Js_primitive.valFromOption($staropt$star$1);
  } else {
    new ArrayBuffer(0);
  }
  return WDBNodeAssetEditorService$WonderEditor.addWDBNodeToAssetTree(RootTreeAssetEditorService$WonderEditor.getRootNode(editorState), WDBNodeAssetService$WonderEditor.buildNode(nodeId, name, gameObject), editorState);
}

function getWDBNodeIdByName(wdbGameObjectName, param) {
  return NodeAssetService$WonderEditor.getNodeId(OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeByName(wdbGameObjectName, /* tuple */[
                      param[0],
                      param[1]
                    ])));
}

export {
  getWDBGameObject ,
  getAllWDBGameObjects ,
  addWDBNodeToRoot ,
  getWDBNodeIdByName ,
  
}
/* OptionService-WonderEditor Not a pure module */
