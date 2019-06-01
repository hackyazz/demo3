open Js.Typed_array;

let _writeHeader = (jsonByteLength, bufferAlignedByteLength, dataView) =>
  dataView
  |> DataViewUtils.writeUint32_1(jsonByteLength, 0)
  |> DataViewUtils.writeUint32_1(bufferAlignedByteLength, _, dataView);

let _getEmptyEncodedUint8Data = () => {
  let encoder = TextEncoder.newTextEncoder();
  let emptyUint8DataArr = encoder |> TextEncoder.encodeUint8Array(" ");

  Uint8Array.unsafe_get(emptyUint8DataArr, 0);
};

let _writeJson =
    (
      byteOffset,
      (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
      dataView,
    ) =>
  HeaderExportUtils.writeUint8ArrayToArrayBufferWithEmptyData(
    byteOffset,
    (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
    dataView,
  );

let _writeBuffer =
    (
      headerAndJsonAlignedByteOffset,
      (
        (imageBufferViewArr, wdbBufferViewArr),
        imageUint8ArrayArr,
        wdbArrayBufferArr,
      ),
      arrayBuffer,
    ) => {
  let uint8Array = Uint8Array.fromBuffer(arrayBuffer);
  let uint8Array =
    imageBufferViewArr
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           uint8Array,
           {byteOffset, byteLength}: ExportAssetType.bufferView,
           index,
         ) => {
           let imageUint8Array = Array.unsafe_get(imageUint8ArrayArr, index);

           BufferUtils.mergeUint8Array(
             uint8Array,
             imageUint8Array,
             headerAndJsonAlignedByteOffset + byteOffset,
           );
         },
         uint8Array,
       );

  let uint8Array =
    wdbBufferViewArr
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           uint8Array,
           {byteOffset, byteLength}: ExportAssetType.bufferView,
           index,
         ) => {
           let wdbArrayBuffer = Array.unsafe_get(wdbArrayBufferArr, index);

           BufferUtils.mergeArrayBuffer(
             uint8Array,
             wdbArrayBuffer,
             headerAndJsonAlignedByteOffset + byteOffset,
           );
         },
         uint8Array,
       );

  uint8Array |> Uint8Array.buffer;
};

let _computeByteLength = (bufferTotalAlignedByteLength, jsonUint8Array) => {
  let jsonByteLength = jsonUint8Array |> Uint8Array.byteLength;

  let jsonAlignedByteLength = jsonByteLength |> BufferUtils.alignedLength;

  let totalByteLength =
    ASBUtils.getHeaderTotalByteLength()
    + jsonAlignedByteLength
    + bufferTotalAlignedByteLength;

  (jsonByteLength, jsonAlignedByteLength, totalByteLength);
};

let generateASB = (imageUint8ArrayMap, (editorState, engineState)) => {
  let (
    engineState,
    (imageArr, textureArr, basicMaterialArr, lightMaterialArr, wdbArr),
    (imageBufferViewArr, wdbBufferViewArr),
    (imageUint8ArrayArr, wdbArrayBufferArr),
    bufferTotalAlignedByteLength,
  ) =
    BuildJsonDataUtils.buildJsonData(
      imageUint8ArrayMap,
      (editorState, engineState),
    );

  let jsonUint8Array =
    BuildJsonDataUtils.buildJsonUint8Array(
      bufferTotalAlignedByteLength,
      (
        Js.Array.concat(wdbBufferViewArr, imageBufferViewArr),
        imageArr,
        textureArr,
        basicMaterialArr,
        lightMaterialArr,
        wdbArr,
      ),
    );

  let (jsonByteLength, jsonAlignedByteLength, totalByteLength) =
    _computeByteLength(bufferTotalAlignedByteLength, jsonUint8Array);

  let asb = ArrayBuffer.make(totalByteLength);
  let dataView = DataViewUtils.create(asb);

  let byteOffset =
    _writeHeader(jsonByteLength, bufferTotalAlignedByteLength, dataView);

  let emptyEncodedUint8Data = _getEmptyEncodedUint8Data();

  let (byteOffset, _, dataView) =
    _writeJson(
      byteOffset,
      (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
      dataView,
    );

  let arrayBuffer =
    _writeBuffer(
      byteOffset,
      (
        (imageBufferViewArr, wdbBufferViewArr),
        imageUint8ArrayArr,
        wdbArrayBufferArr,
      ),
      dataView |> DataView.buffer,
    );

  (engineState, asb);
};