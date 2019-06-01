

import * as ArrayService$WonderEditor from "../../../../src/service/atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../../src/service/primitive/OptionService.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/TextureNodeAssetService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js";

function unsafeGetTextureNode(nodeId) {
  return OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, StateEditorService$WonderEditor.getState(/* () */0));
}

var unsafeGetSelectedFolderNodeInAssetTree = OperateTreeAssetEditorService$WonderEditor.unsafeGetSelectedFolderNodeInAssetTree;

function unsafeGetCurrentNode(editorState) {
  return OptionService$WonderEditor.unsafeGet(OperateTreeAssetEditorService$WonderEditor.getCurrentNode(editorState));
}

var unsafeGetCurrentNodeId = CurrentNodeIdAssetEditorService$WonderEditor.unsafeGetCurrentNodeId;

function getTextureComponentFromNodeId(nodeId) {
  return TextureNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, StateEditorService$WonderEditor.getState(/* () */0)))[/* textureComponent */0];
}

function getTextureComponentFromCurrentNodeId() {
  return getTextureComponentFromNodeId(CurrentNodeIdAssetEditorService$WonderEditor.unsafeGetCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0)));
}

function setCurrentNodeId(nodeId) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  StateEditorService$WonderEditor.setState(CurrentNodeIdAssetEditorService$WonderEditor.setCurrentNodeId(nodeId, editorState));
  return /* () */0;
}

function getUploadedTextureIndex(assetTreeData) {
  return assetTreeData[/* firstLayer */1][/* textureData */3][/* lastIndex */1] + 1 | 0;
}

function getAddedFirstFolderNodeDomIndexForAssetTree(assetTreeData) {
  return assetTreeData[/* firstLayer */1][/* folderDomIndexArr */1].length + 1 | 0;
}

function getAddedSecondNodeDomIndex(assetTreeData) {
  return assetTreeData[/* firstLayer */1][/* length */0] + 2 | 0;
}

function getAddedFirstNodeDomIndex(assetTreeData) {
  return assetTreeData[/* firstLayer */1][/* length */0] + 1 | 0;
}

function getFirstFolderDomIndexForAssetChildren(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* firstLayer */1][/* folderDomIndexArr */1]) - 1 | 0;
}

function getFirstFolderDomIndexForAssetTree(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* firstLayer */1][/* folderDomIndexArr */1]);
}

function getSecondFolderDomIndexForAssetChildren(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(1, assetTreeData[/* firstLayer */1][/* folderDomIndexArr */1]) - 1 | 0;
}

function getSecondFolderDomIndexForAssetTree(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(1, assetTreeData[/* firstLayer */1][/* folderDomIndexArr */1]);
}

function getFirstTextureDomIndex(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* firstLayer */1][/* textureData */3][/* domIndexArr */0]) - 1 | 0;
}

function getSecondTextureDomIndex(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(1, assetTreeData[/* firstLayer */1][/* textureData */3][/* domIndexArr */0]) - 1 | 0;
}

function getFirstJsonDomIndex(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* firstLayer */1][/* jsonDomIndexArr */2]) - 1 | 0;
}

function getRootFolderNodeId(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* treeNodeIdData */2][/* folderNodeIdArr */0]);
}

function getFirstFolderNodeId(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(1, assetTreeData[/* treeNodeIdData */2][/* folderNodeIdArr */0]);
}

function getSecondFolderNodeId(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(2, assetTreeData[/* treeNodeIdData */2][/* folderNodeIdArr */0]);
}

function getFirstTextureNodeId(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* treeNodeIdData */2][/* textureNodeIdArr */2]);
}

function getSecondTextureNodeId(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(1, assetTreeData[/* treeNodeIdData */2][/* textureNodeIdArr */2]);
}

function getFirstJsonNodeId(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* treeNodeIdData */2][/* jsonNodeIdArr */1]);
}

var OperateTwoLayer = /* module */[
  /* getUploadedTextureIndex */getUploadedTextureIndex,
  /* getAddedFirstFolderNodeDomIndexForAssetTree */getAddedFirstFolderNodeDomIndexForAssetTree,
  /* getAddedSecondNodeDomIndex */getAddedSecondNodeDomIndex,
  /* getAddedFirstNodeDomIndex */getAddedFirstNodeDomIndex,
  /* getFirstFolderDomIndexForAssetChildren */getFirstFolderDomIndexForAssetChildren,
  /* getFirstFolderDomIndexForAssetTree */getFirstFolderDomIndexForAssetTree,
  /* getSecondFolderDomIndexForAssetChildren */getSecondFolderDomIndexForAssetChildren,
  /* getSecondFolderDomIndexForAssetTree */getSecondFolderDomIndexForAssetTree,
  /* getFirstTextureDomIndex */getFirstTextureDomIndex,
  /* getSecondTextureDomIndex */getSecondTextureDomIndex,
  /* getFirstJsonDomIndex */getFirstJsonDomIndex,
  /* getRootFolderNodeId */getRootFolderNodeId,
  /* getFirstFolderNodeId */getFirstFolderNodeId,
  /* getSecondFolderNodeId */getSecondFolderNodeId,
  /* getFirstTextureNodeId */getFirstTextureNodeId,
  /* getSecondTextureNodeId */getSecondTextureNodeId,
  /* getFirstJsonNodeId */getFirstJsonNodeId
];

function getFirstLayserFirstFolderDomIndex(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* firstLayer */1][/* folderDomIndexArr */1]);
}

function getFirstLayserSecondFolderDomIndex(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(1, assetTreeData[/* firstLayer */1][/* folderDomIndexArr */1]);
}

function getSecondLayserFirstFolderDomIndexForAssetTree(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* secondLayer */2][/* folderDomIndexArr */2]);
}

function getSecondLayserFirstFolderDomIndexForAssetChildren(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* secondLayer */2][/* folderDomIndexArr */2]) - 1 | 0;
}

function getSecondLayserSecondFolderDomIndexForAssetTree(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(1, assetTreeData[/* secondLayer */2][/* folderDomIndexArr */2]);
}

function getSecondLayserSecondTextureDomIndex(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* secondLayer */2][/* textureData */4][/* domIndexArr */0]) - 1 | 0;
}

var OperateThreeLayer = /* module */[
  /* getFirstLayserFirstFolderDomIndex */getFirstLayserFirstFolderDomIndex,
  /* getFirstLayserSecondFolderDomIndex */getFirstLayserSecondFolderDomIndex,
  /* getSecondLayserFirstFolderDomIndexForAssetTree */getSecondLayserFirstFolderDomIndexForAssetTree,
  /* getSecondLayserFirstFolderDomIndexForAssetChildren */getSecondLayserFirstFolderDomIndexForAssetChildren,
  /* getSecondLayserSecondFolderDomIndexForAssetTree */getSecondLayserSecondFolderDomIndexForAssetTree,
  /* getSecondLayserSecondTextureDomIndex */getSecondLayserSecondTextureDomIndex
];

export {
  unsafeGetTextureNode ,
  unsafeGetSelectedFolderNodeInAssetTree ,
  unsafeGetCurrentNode ,
  unsafeGetCurrentNodeId ,
  getTextureComponentFromNodeId ,
  getTextureComponentFromCurrentNodeId ,
  setCurrentNodeId ,
  OperateTwoLayer ,
  OperateThreeLayer ,
  
}
/* ArrayService-WonderEditor Not a pure module */
