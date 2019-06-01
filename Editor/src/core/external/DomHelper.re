open DomHelperType;

[@bs.val] external document: document = "";

[@bs.val] [@bs.scope "document"]
external createElement: string => document = "createElement";

[@bs.val] [@bs.scope "document"]
external getElementById: string => Dom.element = "getElementById";

[@bs.val] [@bs.scope "document"]
external getElementsByClassName: string => array(Dom.element) =
  "getElementsByClassName";

[@bs.val] external alert: string => unit = "alert";

let getBody = [%raw param => "
  return document.body
"];

let appendChild = [%raw (parent, child) => "
  parent.appendChild(child);
"];

let removeChild = [%raw (parent, child) => "
  parent.removeChild(child);
"];

let innerHtml = [%raw (dom, html) => "
  dom.innerHTML = html;
"];
let getAttribute = [%raw (dom, prop) => "
  return dom.getAttribute(prop);
"];

let setAttribute = [%raw
  (dom, prop, value) => "
  dom.setAttribute(prop,value);
"
];

let locationReload = [%raw param => "
  window.location.reload(true);
"];

let apply = [%raw
  {|
    function(dataArray, func) {
      return func.apply(null, dataArray);
    }
  |}
];

let deleteKeyInMap = [%raw
  {|
    function (key,map) {
      delete map[key];
      return map;
    }
  |}
];

let getDomClientRect = [%raw
  {|
  function(ele){
    if (!ele.getClientRects().length) {
      return { top: 0, left: 0 };
    }

    let rect = ele.getBoundingClientRect();
    if (rect.width || rect.height) {
        let doc = ele.ownerDocument;
        let win = doc.defaultView;
        let docElem = doc.documentElement;

        return {
            top: (rect.top + win.pageYOffset) - docElem.clientTop,
            left: (rect.left + win.pageXOffset) - docElem.clientLeft,
            offsetLeft: ele.offsetLeft,
            offsetTop: ele.offsetTop,
            height: rect.height,
            width: rect.width,
        }
    }

    return rect;
  }
  |}
];

let getRandomKey = (): string =>
  StringService.floatToString(Js.Date.now() *. Js.Math.random());

let intEl = n => ReasonReact.string(string_of_int(n));

let textEl = str => ReasonReact.string(str);