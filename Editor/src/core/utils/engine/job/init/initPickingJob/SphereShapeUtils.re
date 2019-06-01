open ShapeType;

open InitPickingJobType;

let _forEachVertices = (vertices, verticesCount, func) => {
  let index = ref(0);
  let maxRadiusSqRef = ref(0.);

  while (index^ < verticesCount) {
    let maxRadiusSq =
      func(
        (
          Js.Typed_array.Float32Array.unsafe_get(vertices, index^),
          Js.Typed_array.Float32Array.unsafe_get(vertices, index^ + 1),
          Js.Typed_array.Float32Array.unsafe_get(vertices, index^ + 2),
        ),
        maxRadiusSqRef^,
      );

    maxRadiusSqRef := maxRadiusSq;
    index := index^ + 3;
  };

  maxRadiusSqRef^;
};

let calcMaxDistanceOfPointsToCenter = (center, vertices) =>
  _forEachVertices(
    vertices,
    Js.Typed_array.Float32Array.length(vertices),
    (vertex, maxRadiusSq) =>
    Js.Math.max_float(
      maxRadiusSq,
      Vector3Service.distanceToSquared(center, vertex),
    )
  );

let setFromPoints = vertices => {
  let center =
    AABBShapeUtils.setFromPoints(vertices) |> AABBShapeUtils.getCenter;

  {
    center,
    radius:
      calcMaxDistanceOfPointsToCenter(center, vertices) |> Js.Math.sqrt,
  };
};

let applyMatrix4 = ({center, radius}, localToWorldMatrixTypeArray) => {
  center:
    Wonderjs.Vector3Service.transformMat4Tuple(
      center,
      localToWorldMatrixTypeArray,
    ),
  radius:
    radius *. Matrix4Service.getMaxScaleOnAxis(localToWorldMatrixTypeArray),
};