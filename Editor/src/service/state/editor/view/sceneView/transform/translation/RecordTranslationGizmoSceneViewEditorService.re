open EditorType;

open SceneViewType;

let getData = editorState =>
  editorState
  |> RecordTransformGizmoSceneViewEditorService.getData
  |> Js.Option.andThen((. data) => Some(data.translationGizmoData));

let unsafeGetData = editorState =>
  editorState |> getData |> OptionService.unsafeGet;