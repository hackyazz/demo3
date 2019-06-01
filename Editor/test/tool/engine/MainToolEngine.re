open Sinon;

open Wonderjs;

let createGetContextStub = (fakeGl, sandbox) =>
  createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns(fakeGl);

let buildFakeGl = (sandbox) => {
  "VERTEX_SHADER": 0,
  "FRAGMENT_SHADER": 1,
  "HIGH_FLOAT": 2,
  "MEDIUM_FLOAT": 3,
  "viewport": createEmptyStub(refJsObjToSandbox(sandbox^)),
  "getShaderPrecisionFormat":
    createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns({"precision": 1}),
  "getExtension": createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns(Obj.magic(0))
};

let buildFakeCanvas = (id, gl, sandbox) => {
  "id": id,
  "nodeType": 1,
  "style": {"left": "", "top": "", "width": "", "height": "", "position": "static"},
  "width": 0.,
  "height": 0.,
  "getContext": createGetContextStub(gl, sandbox)
};

let buildFakeDomForPassCanvasId = (~id="webgl", sandbox) => {
  let canvasDom = buildFakeCanvas(id, buildFakeGl(sandbox), sandbox);
  let querySelectorAll =
    createMethodStub(refJsObjToSandbox(sandbox^), DomHelper.document |> Obj.magic, "querySelectorAll");
  querySelectorAll |> returns([||]) |> ignore;
  querySelectorAll |> withOneArg({j|#$id|j}) |> returns([|canvasDom|])
};

let buildFakeDomForNotPassCanvasId = (sandbox) => {
  let fakeGl = buildFakeGl(sandbox);
  let canvasDom = buildFakeCanvas("a", fakeGl, sandbox);
  let div = {"innerHTML": "", "firstChild": canvasDom};
  let body = {"prepend": createEmptyStub(refJsObjToSandbox(sandbox^)), "style": {"cssText": ""}};
  createMethodStub(refJsObjToSandbox(sandbox^), DomHelper.document |> Obj.magic, "createElement")
  |> withOneArg("div")
  |> returns(div)
  |> ignore;
  createMethodStub(refJsObjToSandbox(sandbox^), DomHelper.document |> Obj.magic, "querySelectorAll")
  |> withOneArg("body")
  |> returns([body])
  |> ignore;
  (canvasDom, fakeGl, div, body)
};

let buildMainConfig =
    (
      ~bufferConfig=Js.Nullable.undefined,
      ~gpuConfig=Js.Nullable.undefined,
      ~canvasId=Js.Nullable.undefined,
      ~isDebug=Js.Nullable.undefined,
      ~contextConfig=Js.Nullable.undefined,
      ()
    ) => {
  "bufferConfig": bufferConfig,
  "gpuConfig": gpuConfig,
  "canvasId": canvasId,
  "isDebug": isDebug,
  "contextConfig": contextConfig
};

let getIsDebug = () => IsDebugMainService.getIsDebug(StateDataMain.stateData);