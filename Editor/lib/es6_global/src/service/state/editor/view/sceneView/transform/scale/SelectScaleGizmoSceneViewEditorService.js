

import * as RecordScaleGizmoSceneViewEditorService$WonderEditor from "./RecordScaleGizmoSceneViewEditorService.js";
import * as RecordTransformGizmoSceneViewEditorService$WonderEditor from "../RecordTransformGizmoSceneViewEditorService.js";

function isScaleXAxisGizmoSelected(editorState) {
  return RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isScaleXAxisGizmoSelected */5];
}

function isScaleYAxisGizmoSelected(editorState) {
  return RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isScaleYAxisGizmoSelected */6];
}

function isScaleZAxisGizmoSelected(editorState) {
  return RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isScaleZAxisGizmoSelected */7];
}

function isScaleCenterBoxGizmoSelected(editorState) {
  return RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isScaleCenterBoxGizmoSelected */8];
}

function isSelectAnyScaleGizmo(editorState) {
  var match = RecordScaleGizmoSceneViewEditorService$WonderEditor.getData(editorState);
  if (match !== undefined) {
    if (RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isScaleXAxisGizmoSelected */5] || RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isScaleYAxisGizmoSelected */6] || RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isScaleZAxisGizmoSelected */7]) {
      return true;
    } else {
      return RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isScaleCenterBoxGizmoSelected */8];
    }
  } else {
    return false;
  }
}

function markNotSelectAnyScaleGizmo(editorState) {
  var init = editorState[/* sceneViewRecord */3];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  var init$2 = RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* gridPlane */init[/* gridPlane */1],
            /* editCamera */init[/* editCamera */2],
            /* transformGizmoData *//* record */[
              /* currentGizmoType */init$1[/* currentGizmoType */0],
              /* coordinateSystem */init$1[/* coordinateSystem */1],
              /* translationGizmoData */init$1[/* translationGizmoData */2],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
              /* scaleGizmoData : record */[
                /* scaleWholeGizmo */init$2[/* scaleWholeGizmo */0],
                /* scaleXAxisGizmo */init$2[/* scaleXAxisGizmo */1],
                /* scaleYAxisGizmo */init$2[/* scaleYAxisGizmo */2],
                /* scaleZAxisGizmo */init$2[/* scaleZAxisGizmo */3],
                /* scaleCenterBoxGizmo */init$2[/* scaleCenterBoxGizmo */4],
                /* isScaleXAxisGizmoSelected */false,
                /* isScaleYAxisGizmoSelected */false,
                /* isScaleZAxisGizmoSelected */false,
                /* isScaleCenterBoxGizmoSelected */false,
                /* dragStartMouseLocation */init$2[/* dragStartMouseLocation */9],
                /* dragStartPointInLocalCoordinateSystem */init$2[/* dragStartPointInLocalCoordinateSystem */10],
                /* currentSceneTreeNodeStartLocalScale */init$2[/* currentSceneTreeNodeStartLocalScale */11],
                /* dragStartXAxisNormalizedVec */init$2[/* dragStartXAxisNormalizedVec */12],
                /* dragStartYAxisNormalizedVec */init$2[/* dragStartYAxisNormalizedVec */13],
                /* dragStartZAxisNormalizedVec */init$2[/* dragStartZAxisNormalizedVec */14],
                /* dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray */init$2[/* dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray */15]
              ]
            ]
          ],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13],
          /* languageType */editorState[/* languageType */14]
        ];
}

function onlySelectScaleXAxisGizmo(editorState) {
  var editorState$1 = markNotSelectAnyScaleGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */3];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  return /* record */[
          /* settingRecord */editorState$1[/* settingRecord */0],
          /* sceneTreeRecord */editorState$1[/* sceneTreeRecord */1],
          /* assetRecord */editorState$1[/* assetRecord */2],
          /* sceneViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* gridPlane */init[/* gridPlane */1],
            /* editCamera */init[/* editCamera */2],
            /* transformGizmoData *//* record */[
              /* currentGizmoType */init$1[/* currentGizmoType */0],
              /* coordinateSystem */init$1[/* coordinateSystem */1],
              /* translationGizmoData */init$1[/* translationGizmoData */2],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
              /* scaleGizmoData : record */[
                /* scaleWholeGizmo */init$2[/* scaleWholeGizmo */0],
                /* scaleXAxisGizmo */init$2[/* scaleXAxisGizmo */1],
                /* scaleYAxisGizmo */init$2[/* scaleYAxisGizmo */2],
                /* scaleZAxisGizmo */init$2[/* scaleZAxisGizmo */3],
                /* scaleCenterBoxGizmo */init$2[/* scaleCenterBoxGizmo */4],
                /* isScaleXAxisGizmoSelected */true,
                /* isScaleYAxisGizmoSelected */init$2[/* isScaleYAxisGizmoSelected */6],
                /* isScaleZAxisGizmoSelected */init$2[/* isScaleZAxisGizmoSelected */7],
                /* isScaleCenterBoxGizmoSelected */init$2[/* isScaleCenterBoxGizmoSelected */8],
                /* dragStartMouseLocation */init$2[/* dragStartMouseLocation */9],
                /* dragStartPointInLocalCoordinateSystem */init$2[/* dragStartPointInLocalCoordinateSystem */10],
                /* currentSceneTreeNodeStartLocalScale */init$2[/* currentSceneTreeNodeStartLocalScale */11],
                /* dragStartXAxisNormalizedVec */init$2[/* dragStartXAxisNormalizedVec */12],
                /* dragStartYAxisNormalizedVec */init$2[/* dragStartYAxisNormalizedVec */13],
                /* dragStartZAxisNormalizedVec */init$2[/* dragStartZAxisNormalizedVec */14],
                /* dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray */init$2[/* dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray */15]
              ]
            ]
          ],
          /* gameViewRecord */editorState$1[/* gameViewRecord */4],
          /* eventRecord */editorState$1[/* eventRecord */5],
          /* imguiRecord */editorState$1[/* imguiRecord */6],
          /* inspectorRecord */editorState$1[/* inspectorRecord */7],
          /* consoleRecord */editorState$1[/* consoleRecord */8],
          /* transformRecord */editorState$1[/* transformRecord */9],
          /* pickingRecord */editorState$1[/* pickingRecord */10],
          /* currentDragSource */editorState$1[/* currentDragSource */11],
          /* currentSelectSource */editorState$1[/* currentSelectSource */12],
          /* loopId */editorState$1[/* loopId */13],
          /* languageType */editorState$1[/* languageType */14]
        ];
}

function onlySelectScaleYAxisGizmo(editorState) {
  var editorState$1 = markNotSelectAnyScaleGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */3];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  return /* record */[
          /* settingRecord */editorState$1[/* settingRecord */0],
          /* sceneTreeRecord */editorState$1[/* sceneTreeRecord */1],
          /* assetRecord */editorState$1[/* assetRecord */2],
          /* sceneViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* gridPlane */init[/* gridPlane */1],
            /* editCamera */init[/* editCamera */2],
            /* transformGizmoData *//* record */[
              /* currentGizmoType */init$1[/* currentGizmoType */0],
              /* coordinateSystem */init$1[/* coordinateSystem */1],
              /* translationGizmoData */init$1[/* translationGizmoData */2],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
              /* scaleGizmoData : record */[
                /* scaleWholeGizmo */init$2[/* scaleWholeGizmo */0],
                /* scaleXAxisGizmo */init$2[/* scaleXAxisGizmo */1],
                /* scaleYAxisGizmo */init$2[/* scaleYAxisGizmo */2],
                /* scaleZAxisGizmo */init$2[/* scaleZAxisGizmo */3],
                /* scaleCenterBoxGizmo */init$2[/* scaleCenterBoxGizmo */4],
                /* isScaleXAxisGizmoSelected */init$2[/* isScaleXAxisGizmoSelected */5],
                /* isScaleYAxisGizmoSelected */true,
                /* isScaleZAxisGizmoSelected */init$2[/* isScaleZAxisGizmoSelected */7],
                /* isScaleCenterBoxGizmoSelected */init$2[/* isScaleCenterBoxGizmoSelected */8],
                /* dragStartMouseLocation */init$2[/* dragStartMouseLocation */9],
                /* dragStartPointInLocalCoordinateSystem */init$2[/* dragStartPointInLocalCoordinateSystem */10],
                /* currentSceneTreeNodeStartLocalScale */init$2[/* currentSceneTreeNodeStartLocalScale */11],
                /* dragStartXAxisNormalizedVec */init$2[/* dragStartXAxisNormalizedVec */12],
                /* dragStartYAxisNormalizedVec */init$2[/* dragStartYAxisNormalizedVec */13],
                /* dragStartZAxisNormalizedVec */init$2[/* dragStartZAxisNormalizedVec */14],
                /* dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray */init$2[/* dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray */15]
              ]
            ]
          ],
          /* gameViewRecord */editorState$1[/* gameViewRecord */4],
          /* eventRecord */editorState$1[/* eventRecord */5],
          /* imguiRecord */editorState$1[/* imguiRecord */6],
          /* inspectorRecord */editorState$1[/* inspectorRecord */7],
          /* consoleRecord */editorState$1[/* consoleRecord */8],
          /* transformRecord */editorState$1[/* transformRecord */9],
          /* pickingRecord */editorState$1[/* pickingRecord */10],
          /* currentDragSource */editorState$1[/* currentDragSource */11],
          /* currentSelectSource */editorState$1[/* currentSelectSource */12],
          /* loopId */editorState$1[/* loopId */13],
          /* languageType */editorState$1[/* languageType */14]
        ];
}

function onlySelectScaleZAxisGizmo(editorState) {
  var editorState$1 = markNotSelectAnyScaleGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */3];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  return /* record */[
          /* settingRecord */editorState$1[/* settingRecord */0],
          /* sceneTreeRecord */editorState$1[/* sceneTreeRecord */1],
          /* assetRecord */editorState$1[/* assetRecord */2],
          /* sceneViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* gridPlane */init[/* gridPlane */1],
            /* editCamera */init[/* editCamera */2],
            /* transformGizmoData *//* record */[
              /* currentGizmoType */init$1[/* currentGizmoType */0],
              /* coordinateSystem */init$1[/* coordinateSystem */1],
              /* translationGizmoData */init$1[/* translationGizmoData */2],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
              /* scaleGizmoData : record */[
                /* scaleWholeGizmo */init$2[/* scaleWholeGizmo */0],
                /* scaleXAxisGizmo */init$2[/* scaleXAxisGizmo */1],
                /* scaleYAxisGizmo */init$2[/* scaleYAxisGizmo */2],
                /* scaleZAxisGizmo */init$2[/* scaleZAxisGizmo */3],
                /* scaleCenterBoxGizmo */init$2[/* scaleCenterBoxGizmo */4],
                /* isScaleXAxisGizmoSelected */init$2[/* isScaleXAxisGizmoSelected */5],
                /* isScaleYAxisGizmoSelected */init$2[/* isScaleYAxisGizmoSelected */6],
                /* isScaleZAxisGizmoSelected */true,
                /* isScaleCenterBoxGizmoSelected */init$2[/* isScaleCenterBoxGizmoSelected */8],
                /* dragStartMouseLocation */init$2[/* dragStartMouseLocation */9],
                /* dragStartPointInLocalCoordinateSystem */init$2[/* dragStartPointInLocalCoordinateSystem */10],
                /* currentSceneTreeNodeStartLocalScale */init$2[/* currentSceneTreeNodeStartLocalScale */11],
                /* dragStartXAxisNormalizedVec */init$2[/* dragStartXAxisNormalizedVec */12],
                /* dragStartYAxisNormalizedVec */init$2[/* dragStartYAxisNormalizedVec */13],
                /* dragStartZAxisNormalizedVec */init$2[/* dragStartZAxisNormalizedVec */14],
                /* dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray */init$2[/* dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray */15]
              ]
            ]
          ],
          /* gameViewRecord */editorState$1[/* gameViewRecord */4],
          /* eventRecord */editorState$1[/* eventRecord */5],
          /* imguiRecord */editorState$1[/* imguiRecord */6],
          /* inspectorRecord */editorState$1[/* inspectorRecord */7],
          /* consoleRecord */editorState$1[/* consoleRecord */8],
          /* transformRecord */editorState$1[/* transformRecord */9],
          /* pickingRecord */editorState$1[/* pickingRecord */10],
          /* currentDragSource */editorState$1[/* currentDragSource */11],
          /* currentSelectSource */editorState$1[/* currentSelectSource */12],
          /* loopId */editorState$1[/* loopId */13],
          /* languageType */editorState$1[/* languageType */14]
        ];
}

function onlySelectScaleCenterBoxGizmo(editorState) {
  var editorState$1 = markNotSelectAnyScaleGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */3];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  return /* record */[
          /* settingRecord */editorState$1[/* settingRecord */0],
          /* sceneTreeRecord */editorState$1[/* sceneTreeRecord */1],
          /* assetRecord */editorState$1[/* assetRecord */2],
          /* sceneViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* gridPlane */init[/* gridPlane */1],
            /* editCamera */init[/* editCamera */2],
            /* transformGizmoData *//* record */[
              /* currentGizmoType */init$1[/* currentGizmoType */0],
              /* coordinateSystem */init$1[/* coordinateSystem */1],
              /* translationGizmoData */init$1[/* translationGizmoData */2],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
              /* scaleGizmoData : record */[
                /* scaleWholeGizmo */init$2[/* scaleWholeGizmo */0],
                /* scaleXAxisGizmo */init$2[/* scaleXAxisGizmo */1],
                /* scaleYAxisGizmo */init$2[/* scaleYAxisGizmo */2],
                /* scaleZAxisGizmo */init$2[/* scaleZAxisGizmo */3],
                /* scaleCenterBoxGizmo */init$2[/* scaleCenterBoxGizmo */4],
                /* isScaleXAxisGizmoSelected */init$2[/* isScaleXAxisGizmoSelected */5],
                /* isScaleYAxisGizmoSelected */init$2[/* isScaleYAxisGizmoSelected */6],
                /* isScaleZAxisGizmoSelected */init$2[/* isScaleZAxisGizmoSelected */7],
                /* isScaleCenterBoxGizmoSelected */true,
                /* dragStartMouseLocation */init$2[/* dragStartMouseLocation */9],
                /* dragStartPointInLocalCoordinateSystem */init$2[/* dragStartPointInLocalCoordinateSystem */10],
                /* currentSceneTreeNodeStartLocalScale */init$2[/* currentSceneTreeNodeStartLocalScale */11],
                /* dragStartXAxisNormalizedVec */init$2[/* dragStartXAxisNormalizedVec */12],
                /* dragStartYAxisNormalizedVec */init$2[/* dragStartYAxisNormalizedVec */13],
                /* dragStartZAxisNormalizedVec */init$2[/* dragStartZAxisNormalizedVec */14],
                /* dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray */init$2[/* dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray */15]
              ]
            ]
          ],
          /* gameViewRecord */editorState$1[/* gameViewRecord */4],
          /* eventRecord */editorState$1[/* eventRecord */5],
          /* imguiRecord */editorState$1[/* imguiRecord */6],
          /* inspectorRecord */editorState$1[/* inspectorRecord */7],
          /* consoleRecord */editorState$1[/* consoleRecord */8],
          /* transformRecord */editorState$1[/* transformRecord */9],
          /* pickingRecord */editorState$1[/* pickingRecord */10],
          /* currentDragSource */editorState$1[/* currentDragSource */11],
          /* currentSelectSource */editorState$1[/* currentSelectSource */12],
          /* loopId */editorState$1[/* loopId */13],
          /* languageType */editorState$1[/* languageType */14]
        ];
}

export {
  isScaleXAxisGizmoSelected ,
  isScaleYAxisGizmoSelected ,
  isScaleZAxisGizmoSelected ,
  isScaleCenterBoxGizmoSelected ,
  isSelectAnyScaleGizmo ,
  markNotSelectAnyScaleGizmo ,
  onlySelectScaleXAxisGizmo ,
  onlySelectScaleYAxisGizmo ,
  onlySelectScaleZAxisGizmo ,
  onlySelectScaleCenterBoxGizmo ,
  
}
/* RecordScaleGizmoSceneViewEditorService-WonderEditor Not a pure module */
