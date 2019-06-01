open EditorType;

open NodeAssetType;

/* let getResult = (nodeId, editorState) =>
   editorState.assetRecord |> TextureNodeMapAssetService.getResult(nodeId); */

let getTextureComponent = (nodeId, editorState) => {
  let {textureComponent} =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
    |> TextureNodeAssetService.getNodeData;

  textureComponent;
};

let getTextureName =
    (
      ~nodeId,
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) =>
  OperateTextureLogicService.getName(
    ~texture=getTextureComponent(nodeId, editorState),
    ~engineState,
  );

let setTextureImageName = (nodeId, name, editorState) => {
  let textureComponent = getTextureComponent(nodeId, editorState);

  editorState
  |> ImageDataMapAssetEditorService.setData(
       textureComponent,
       {
         ...
           ImageDataMapAssetEditorService.unsafeGetData(
             textureComponent,
             editorState,
           ),
         name,
       },
     );
};

let hasTextureComponent = (texture, editorState) =>
  TextureNodeAssetEditorService.getTextureComponents(editorState)
  |> Js.Array.includes(texture);

let findTextureNodeIdByTextureComponent = (texture, editorState) =>
  TextureNodeAssetEditorService.findAllTextureNodes(editorState)
  |> Js.Array.find(node => {
       let {textureComponent}: NodeAssetType.textureNodeData =
         TextureNodeAssetService.getNodeData(node);

       textureComponent === texture;
     })
  |> Js.Option.map((. node) => NodeAssetService.getNodeId(~node));

let buildTextureAssetName = imageName =>
  FileNameService.getBaseName(imageName);