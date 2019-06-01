open NodeAssetType;

open FileType;

let getUploadAssetType = name => {
  let extname = FileNameService.getExtName(name);

  switch (extname) {
  | ".wdb" => LoadWDB
  | ".glb" => LoadGLB
  | ".jpg"
  | ".jpeg"
  | ".png" => LoadTexture
  | ".zip" => LoadGLTFZip
  | _ =>
    ConsoleUtils.error(
      LogUtils.buildErrorMessage(
        ~description=
          LanguageUtils.getMessageLanguageDataByType(
            "load-asset-file",
            LanguageEditorService.unsafeGetType
            |> StateLogicService.getEditorState,
          ),
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
    |> StateLogicService.getEditorState;

    LoadError;
  };
};

let getUploadPackageType = name => {
  let extname = FileNameService.getExtName(name);

  switch (extname) {
  | ".wpk" => LoadWPK
  | _ =>
    ConsoleUtils.error(
      LogUtils.buildErrorMessage(
        ~description=
          LanguageUtils.getMessageLanguageDataByType(
            "load-asset-package",
            LanguageEditorService.unsafeGetType
            |> StateLogicService.getEditorState,
          ),
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
    |> StateLogicService.getEditorState;

    LoadError;
  };
};

let _handlePackageSpecificFuncByTypeSync = (type_, handleWPKFunc) =>
  switch (type_) {
  | LoadWPK => handleWPKFunc()
  | LoadError => ()
  };

let _handleAssetSpecificFuncByTypeSync =
    (
      type_,
      (handleTextureFunc, handleWDBFunc, handleGLBFunc, handleGLTFZipFunc),
    ) =>
  switch (type_) {
  | LoadTexture => handleTextureFunc()
  | LoadWDB => handleWDBFunc()
  | LoadGLB => handleGLBFunc()
  | LoadGLTFZip => handleGLTFZipFunc()
  | LoadError => ()
  };

let readPakckageByTypeSync = (reader, fileInfo: fileInfoType) =>
  _handlePackageSpecificFuncByTypeSync(
    getUploadPackageType(fileInfo.name), () =>
    FileReader.readAsArrayBuffer(reader, fileInfo.file)
  );

let readAssetByTypeSync = (reader, fileInfo: fileInfoType) =>
  _handleAssetSpecificFuncByTypeSync(
    getUploadAssetType(fileInfo.name),
    (
      () => FileReader.readAsDataURL(reader, fileInfo.file),
      () => FileReader.readAsArrayBuffer(reader, fileInfo.file),
      () => FileReader.readAsArrayBuffer(reader, fileInfo.file),
      () => FileReader.readAsArrayBuffer(reader, fileInfo.file),
    ),
  );