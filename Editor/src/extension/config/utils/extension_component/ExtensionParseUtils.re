open DomHelper;

open ExtensionParseType;

let func = [%raw
  {| function(extensionText) {
    return (new Function(extensionText))();
  }
  |}
];

let _buildExtensionRecord = extensionText => tFromJs(func(extensionText));

let _getExtensionName = extensionRecord => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|the extension name exist|j},
                ~actual={j|not|j},
              ),
              () =>
              extensionRecord.name |> Js.Nullable.test |> assertFalse
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );
  extensionRecord.name |> Js.Nullable.to_opt |> OptionService.unsafeGet;
};

let _getExtensionMethods = extensionRecord => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|the extension->methodExtension exist|j},
                ~actual={j|not|j},
              ),
              () =>
              extensionRecord.methodExtension
              |> Js.Nullable.return
              |> Js.Nullable.test
              |> assertFalse
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );
  extensionRecord.methodExtension
  |> Js.Nullable.to_opt
  |> OptionService.unsafeGet;
};

let _getExtensionPanels = extensionRecord => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|the extension panelExtension exist|j},
                ~actual={j|not|j},
              ),
              () =>
              extensionRecord.methodExtension
              |> Js.Nullable.test
              |> assertFalse
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );
  extensionRecord.panelExtension
  |> Js.Nullable.to_opt
  |> OptionService.unsafeGet;
};

let createComponentMap = extensionText => {
  let extensionRecord = _buildExtensionRecord(extensionText);
  _getExtensionMethods(extensionRecord)
  |> ExtensionMethodMapUtils.createExtensionMap
  |> ComponentMapUtils.addExtensionMap(
       ComponentMapUtils.createComponentMap(),
       _getExtensionName(extensionRecord),
     );
};

let _convertdRecord = extensionObj => {
  name: extensionObj##name,
  parent: extensionObj##parent,
  render: extensionObj##render,
  initialState: extensionObj##initialState,
  willRender: extensionObj##willRender,
  didMount: extensionObj##didMount,
};

let extensionPanelComponent = (componentName, extensionText, uiState) => {
  let extensionRecord = _buildExtensionRecord(extensionText);
  _getExtensionPanels(extensionRecord)
  |> Js.Array.map((panel: panelType) => parsePanelTypeToJsObj(panel))
  |> Js.Array.filter(panel => panel##parent === componentName)
  |> (
    panelArray => {
      let len = panelArray |> Js.Array.length;
      switch (len) {
      | 0 => [||]
      | _ =>
        panelArray
        |> Js.Array.map(panelObj => panelObj |> _convertdRecord)
        |> Js.Array.map(record =>
             <PanelExtension
               key={getRandomKey()}
               record
               name={_getExtensionName(extensionRecord)}
               uiState
             />
           )
      };
    }
  );
};