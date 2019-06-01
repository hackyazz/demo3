

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ParseNoWorkerJobService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/noWorkerJob/ParseNoWorkerJobService.js";
import * as OperateNoWorkerJobService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/noWorkerJob/OperateNoWorkerJobService.js";

function buildNoWorkerInitPipelineConfigWithoutInitMain() {
  return "\n    [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_camera\"\n            },\n            {\n              \"name\": \"start_time\"\n            },\n            {\n              \"name\": \"preget_glslData\"\n            },\n            {\n              \"name\": \"init_state\"\n            },\n            {\n              \"name\": \"init_basic_material\"\n            },\n            {\n              \"name\": \"init_light_material\"\n            },\n            {\n              \"name\": \"init_texture\"\n            }\n            ]\n        }\n    ]\n            ";
}

function buildNoWorkerInitJobConfigWithoutInitMain() {
  return "\n    [\n        {\n            \"name\": \"init_camera\"\n        },\n        {\n            \"name\": \"start_time\"\n        },\n        {\n            \"name\": \"preget_glslData\"\n        },\n        {\n            \"name\": \"init_state\"\n        },\n        {\n            \"name\": \"init_basic_material\"\n        },\n        {\n            \"name\": \"init_light_material\"\n        },\n            {\n              \"name\": \"init_texture\"\n            }\n    ]\n            ";
}

function buildNoWorkerLoopPipelineConfig() {
  return "\n    [\n        {\n            \"name\": \"default\",\n            \"jobs\": [\n                {\n                    \"name\": \"tick\"\n                },\n                {\n                    \"name\": \"dispose\"\n                },\n                {\n                    \"name\": \"reallocate_cpu_memory\"\n                },\n                {\n                    \"name\": \"update_transform\"\n                },\n                {\n                    \"name\": \"update_camera\"\n                },\n                {\n                    \"name\": \"get_camera_data\"\n                },\n                {\n                    \"name\": \"create_basic_render_object_buffer\"\n                },\n                {\n                    \"name\": \"create_light_render_object_buffer\"\n                },\n                {\n                    \"name\": \"clear_color\"\n                },\n                {\n                    \"name\": \"clear_buffer\"\n                },\n                {\n                    \"name\": \"clear_last_send_component\"\n                },\n                {\n                    \"name\": \"send_uniform_shader_data\"\n                },\n                {\n                    \"name\": \"render_basic\"\n                },\n                {\n                    \"name\": \"front_render_light\"\n                },\n                {\n                    \"name\": \"render_imgui\"\n                }\n            ]\n        }\n    ]\n            ";
}

function buildNoWorkerLoopJobConfig() {
  return "\n    [\n    {\n        \"name\": \"tick\"\n    },\n    {\n        \"name\": \"update_transform\"\n    },\n    {\n        \"name\": \"update_camera\"\n    },\n    {\n        \"name\": \"get_camera_data\"\n    },\n    {\n        \"name\": \"create_basic_render_object_buffer\"\n    },\n    {\n        \"name\": \"create_light_render_object_buffer\"\n    },\n    {\n        \"name\": \"clear_color\",\n        \"flags\": [\n            \"#20B2AA\"\n        ]\n    },\n    {\n        \"name\": \"clear_buffer\",\n        \"flags\": [\n            \"COLOR_BUFFER\",\n            \"DEPTH_BUFFER\",\n            \"STENCIL_BUFFER\"\n        ]\n    },\n    {\n        \"name\": \"clear_last_send_component\"\n    },\n    {\n        \"name\": \"send_uniform_shader_data\"\n    },\n    {\n        \"name\": \"render_basic\"\n    },\n    {\n        \"name\": \"front_render_light\"\n    },\n    {\n        \"name\": \"dispose\"\n    },\n    {\n        \"name\": \"reallocate_cpu_memory\"\n    },\n    {\n        \"name\": \"render_imgui\"\n    },\n    {\n        \"name\": \"prepare_render_scene_view\"\n    },\n    {\n        \"name\": \"prepare_render_game_view\"\n    },\n    {\n        \"name\": \"restore\"\n    }\n]\n            ";
}

function buildNoWorkerJobConfig($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, _) {
  var noWorkerSetting = $staropt$star !== undefined ? $staropt$star : "\n        {\n        \"init_pipeline\": \"default\",\n        \"loop_pipeline\": \"default\"\n    }\n    ";
  var initPipelines = $staropt$star$1 !== undefined ? $staropt$star$1 : "\n             [\n                 {\n                   \"name\": \"default\",\n                   \"jobs\": [\n                     {\n                       \"name\": \"init_camera\"\n                     },\n                     {\n                       \"name\": \"start_time\"\n                     },\n                     {\n                       \"name\": \"preget_glslData\"\n                     },\n                     {\n                       \"name\": \"init_state\"\n                     },\n                     {\n                       \"name\": \"init_basic_material\"\n                     },\n                     {\n                       \"name\": \"init_light_material\"\n                     },\n                     {\n                         \"name\":\"init_texture\"\n                     },\n        {\n          \"name\": \"init_imgui\"\n        }\n                   ]\n                 }\n               ]\n                     ";
  var loopPipelines = $staropt$star$2 !== undefined ? $staropt$star$2 : "\n    [\n        {\n            \"name\": \"default\",\n            \"jobs\": [\n                {\n                    \"name\": \"tick\"\n                },\n                {\n                    \"name\": \"dispose\"\n                },\n                {\n                    \"name\": \"reallocate_cpu_memory\"\n                },\n                {\n                    \"name\": \"update_transform\"\n                },\n                {\n                    \"name\": \"update_camera\"\n                },\n                {\n                    \"name\": \"get_camera_data\"\n                },\n                {\n                    \"name\": \"create_basic_render_object_buffer\"\n                },\n                {\n                    \"name\": \"create_light_render_object_buffer\"\n                },\n                {\n                    \"name\": \"clear_color\"\n                },\n                {\n                    \"name\": \"clear_buffer\"\n                },\n                {\n                    \"name\": \"clear_last_send_component\"\n                },\n                {\n                    \"name\": \"send_uniform_shader_data\"\n                },\n                {\n                    \"name\": \"render_basic\"\n                },\n                {\n                    \"name\": \"front_render_light\"\n                },\n                {\n                    \"name\": \"render_imgui\"\n                }\n            ]\n        }\n    ]\n            ";
  var initJobs = $staropt$star$3 !== undefined ? $staropt$star$3 : "\n             [\n                 {\n                     \"name\": \"create_canvas\"\n                 },\n                 {\n                     \"name\": \"create_gl\"\n                 },\n                 {\n                     \"name\": \"set_full_screen\"\n                 },\n                 {\n                     \"name\": \"set_viewport\"\n                 },\n                 {\n                     \"name\": \"detect_gl\"\n                 },\n                 {\n                     \"name\": \"init_camera\"\n                 },\n                 {\n                     \"name\": \"start_time\"\n                 },\n                 {\n                     \"name\": \"preget_glslData\"\n                 },\n                 {\n                     \"name\": \"init_state\"\n                 },\n                 {\n                     \"name\": \"init_basic_material\"\n                 },\n                 {\n                     \"name\": \"init_light_material\"\n                 },\n                 {\n                     \"name\": \"init_texture\"\n                 },\n        {\n          \"name\": \"init_imgui\"\n        }\n             ]\n                     ";
  var loopJobs = $staropt$star$4 !== undefined ? $staropt$star$4 : "\n    [\n    {\n        \"name\": \"tick\"\n    },\n    {\n        \"name\": \"update_transform\"\n    },\n    {\n        \"name\": \"update_camera\"\n    },\n    {\n        \"name\": \"get_camera_data\"\n    },\n    {\n        \"name\": \"create_basic_render_object_buffer\"\n    },\n    {\n        \"name\": \"create_light_render_object_buffer\"\n    },\n    {\n        \"name\": \"clear_color\",\n        \"flags\": [\n            \"#20B2AA\"\n        ]\n    },\n    {\n        \"name\": \"clear_buffer\",\n        \"flags\": [\n            \"COLOR_BUFFER\",\n            \"DEPTH_BUFFER\",\n            \"STENCIL_BUFFER\"\n        ]\n    },\n    {\n        \"name\": \"clear_last_send_component\"\n    },\n    {\n        \"name\": \"send_uniform_shader_data\"\n    },\n    {\n        \"name\": \"render_basic\"\n    },\n    {\n        \"name\": \"front_render_light\"\n    },\n    {\n        \"name\": \"dispose\"\n    },\n    {\n        \"name\": \"reallocate_cpu_memory\"\n    },\n    {\n        \"name\": \"render_imgui\"\n    },\n    {\n        \"name\": \"prepare_render_scene_view\"\n    },\n    {\n        \"name\": \"prepare_render_game_view\"\n    },\n    {\n        \"name\": \"restore\"\n    }\n]\n            ";
  return /* tuple */[
          noWorkerSetting,
          initPipelines,
          loopPipelines,
          initJobs,
          loopJobs
        ];
}

function buildNoWorkerEmptyJobConfig() {
  return buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n      ]\n    }\n  ]\n        ", "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n      ]\n    }\n  ]\n        ", "\n        []\n        ", "\n        []\n        ", /* () */0);
}

function create(param, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* noWorkerJobRecord */2] = /* record */[
    /* setting */ParseNoWorkerJobService$Wonderjs.convertSettingToRecord(JSON.parse(param[0])),
    /* initPipelines */ParseNoWorkerJobService$Wonderjs.convertInitPipelinesToRecord(JSON.parse(param[1])),
    /* loopPipelines */ParseNoWorkerJobService$Wonderjs.convertLoopPipelinesToRecord(JSON.parse(param[2])),
    /* initJobs */ParseNoWorkerJobService$Wonderjs.convertInitJobsToRecord(JSON.parse(param[3])),
    /* loopJobs */ParseNoWorkerJobService$Wonderjs.convertLoopJobsToRecord(JSON.parse(param[4]))
  ];
  return newrecord;
}

function getSetting(state) {
  return OperateNoWorkerJobService$Wonderjs.getSetting(state[/* noWorkerJobRecord */2]);
}

function getInitJobs(state) {
  return OperateNoWorkerJobService$Wonderjs.getInitJobs(state[/* noWorkerJobRecord */2]);
}

function getLoopPipelines(state) {
  return OperateNoWorkerJobService$Wonderjs.getLoopPipelines(state[/* noWorkerJobRecord */2]);
}

function getLoopJobs(state) {
  return OperateNoWorkerJobService$Wonderjs.getLoopJobs(state[/* noWorkerJobRecord */2]);
}

function getInitPipelines(state) {
  return OperateNoWorkerJobService$Wonderjs.getInitPipelines(state[/* noWorkerJobRecord */2]);
}

export {
  buildNoWorkerInitPipelineConfigWithoutInitMain ,
  buildNoWorkerInitJobConfigWithoutInitMain ,
  buildNoWorkerLoopPipelineConfig ,
  buildNoWorkerLoopJobConfig ,
  buildNoWorkerJobConfig ,
  buildNoWorkerEmptyJobConfig ,
  create ,
  getSetting ,
  getInitJobs ,
  getLoopPipelines ,
  getLoopJobs ,
  getInitPipelines ,
  
}
/* OperateNoWorkerJobService-Wonderjs Not a pure module */
