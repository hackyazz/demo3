


var onload = (
    function (url, handleFunc) {
        var image = new Image()
        image.src = url

        if (image.complete) {
          // 圖片已經被載入
          handleFunc(image)
        } else {
          // 如果圖片未被載入，則設定載入時的回調
          image.onload = function () {
            handleFunc(image)
          }
        }
      }
    );

export {
  onload ,
  
}
/* onload Not a pure module */
