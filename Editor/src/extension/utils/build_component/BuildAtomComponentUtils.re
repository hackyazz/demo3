open AtomComponentUtils;

let buildComponentByName = (componentName, argumentArray) =>
  switch (componentName) {
  | "float_input" => DomHelper.apply(argumentArray, buildFloatInput)
  | "button" => DomHelper.apply(argumentArray, buildButton)
  | "div" => DomHelper.apply(argumentArray, buildDiv)
  | _ =>
    /* TODO use ConsoleUtils.error */
    WonderLog.Log.error(
      LogUtils.buildErrorMessage(
        ~description={j|the specific component: $componentName is not find|j},
        ~reason="",
        ~solution=
          {j|check extension->panelExtension->render->name->$componentName should correct|j},
        ~params={j|componentName: $componentName|j},
      ),
    );
    ReasonReact.null;
  };