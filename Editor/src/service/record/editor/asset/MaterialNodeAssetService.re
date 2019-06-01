open TreeAssetType;

open NodeAssetType;

let getNodeName =
    ({materialComponent, type_}: materialNodeData, getMaterialNameFunc) =>
  getMaterialNameFunc(~material=materialComponent, ~type_);

let buildNodeData = (~type_, ~materialComponent) => {
  type_,
  materialComponent,
};

let buildNode = (~nodeId, ~type_, ~materialComponent) =>
  MaterialNode(nodeId, buildNodeData(~type_, ~materialComponent));

let buildNodeByNodeData = (~nodeId, ~nodeData) =>
  MaterialNode(nodeId, nodeData);

let isMaterialNode = node =>
  switch (node) {
  | MaterialNode(_, _) => true
  | _ => false
  };

let getNodeData = node =>
  switch (node) {
  | MaterialNode(nodeId, nodeData) => nodeData
  | _ =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j|should be material node|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };