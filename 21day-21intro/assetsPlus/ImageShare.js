

const html2canvas = require('html2canvas')

//import {API_TOKEN, SEVER_URL} from './frame/serverConfig'


    /**
     * 将html转换成base64
     * @param element
     * @returns {Promise}
       */
    function convertHtmlToBase64 (element, height, width) {
        return new Promise(
            (resolve, reject) => {
                html2canvas(element, {
                    height,
                    width,
                    useCORS: true
                }).then(
                    (originCanvas) => {
                        originCanvas.style.height = height + 'px'
                        originCanvas.style.width = width + 'px'
                        originCanvas.style.display = 'none'

                        let base64 = convertCanvasToBase64(originCanvas)
                        // window.document.body.removeChild(element)
                        resolve(base64)
                    }
                )
            }
        )
    }


    /**
     * 将canvas转成base64
     * @param originCanvas
     * @returns {*|String|string}
     *
       */
    function convertCanvasToBase64 (originCanvas) {
      let canvas = window.document.body.appendChild(originCanvas)
      const base64 = canvas.toDataURL()
      window.document.body.removeChild(canvas)
      return Promise.resolve(base64)
    }

module.exports = convertHtmlToBase64
