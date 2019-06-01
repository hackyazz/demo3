type state = {componentValueForUndo: float};

type action =
  | TriggerBlur(float)
  | TriggerDragDrop(float);

let component =
  ReasonReact.reducerComponent("MainEditorFloatInputBaseComponent");

let reducer = ((blurValueFunc, dragDropFunc), action, state) =>
  switch (action) {
  | TriggerBlur(value) =>
    blurValueFunc(state.componentValueForUndo);

    ReasonReact.Update({...state, componentValueForUndo: value});
  | TriggerDragDrop(value) =>
    dragDropFunc(state.componentValueForUndo);

    ReasonReact.Update({...state, componentValueForUndo: value});
  };

let render =
    (
      label,
      title,
      changeComponentValueFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <FloatInput
    defaultValue={state.componentValueForUndo |> StringService.floatToString}
    label
    title={
      switch (title) {
      | None => ""
      | Some(title) => title
      }
    }
    onChange=changeComponentValueFunc
    onBlur={value => send(TriggerBlur(value))}
    onDragDrop={value => send(TriggerDragDrop(value))}
  />;

let make =
    (
      ~dragDropFunc=_ => (),
      ~label,
      ~getComponentValueFunc,
      ~changeComponentValueFunc,
      ~blurValueFunc,
      ~title: option(string)=?,
      _children,
    ) => {
  ...component,
  initialState: () => {
    componentValueForUndo:
      (getComponentValueFunc |> StateLogicService.getEngineStateToGetData)
      ->(FloatService.truncateFloatValue(5)),
  },
  reducer: reducer((blurValueFunc, dragDropFunc)),
  render: self => render(label, title, changeComponentValueFunc, self),
};