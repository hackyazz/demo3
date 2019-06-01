

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as FileNameService$WonderEditor from "../../../../src/service/atom/FileNameService.js";
import * as NodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/NodeAssetService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/TextureNodeAssetService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/ImageDataMapAssetEditorService.js";

function getTextureComponent(nodeId, editorState) {
  return TextureNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState))[/* textureComponent */0];
}

function setTextureImageName(nodeId, name, editorState) {
  var textureComponent = getTextureComponent(nodeId, editorState);
  var init = ImageDataMapAssetEditorService$WonderEditor.unsafeGetData(textureComponent, editorState);
  return ImageDataMapAssetEditorService$WonderEditor.setData(textureComponent, /* record */[
              /* base64 */init[/* base64 */0],
              /* uint8Array */init[/* uint8Array */1],
              /* blobObjectURL */init[/* blobObjectURL */2],
              /* name */name,
              /* mimeType */init[/* mimeType */4]
            ], editorState);
}

function hasTextureComponent(texture, editorState) {
  return TextureNodeAssetEditorService$WonderEditor.getTextureComponents(editorState).includes(texture);
}

function findTextureNodeIdByTextureComponent(texture, editorState) {
  return Js_option.map(NodeAssetService$WonderEditor.getNodeId, Js_primitive.undefined_to_opt(TextureNodeAssetEditorService$WonderEditor.findAllTextureNodes(editorState).find((function (node) {
                        var match = TextureNodeAssetService$WonderEditor.getNodeData(node);
                        return match[/* textureComponent */0] === texture;
                      }))));
}

var buildTextureAssetName = FileNameService$WonderEditor.getBaseName;

export {
  getTextureComponent ,
  setTextureImageName ,
  hasTextureComponent ,
  findTextureNodeIdByTextureComponent ,
  buildTextureAssetName ,
  
}
/* TextureNodeAssetService-WonderEditor Not a pure module */
