const regeneratorRuntime = require('../../lib/regenerator-runtime')
const promisify = require('../../lib/promisify')

const chooseImage = promisify(wx.chooseImage)

Component({
  properties: {
    text: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    },
    count: {
      type: Number,
      value: 1
    }
  },

  data: {
    filePath: ''
  },

  methods: {
    async choose () {
      try {
        const { count } = this.data
        const res = await chooseImage({ count })
        const { tempFilePaths } = res
        if (count == 1) {
          const filePath = tempFilePaths[0]
          this.setData({
            filePath
          })
          this.triggerEvent('selected', { filePath })
        } else {
          this.triggerEvent('selected', { filePaths: tempFilePaths })
        }
      } catch (err) {
        const { errMsg } = err
        switch (errMsg) {
          case 'chooseImage:fail cancel':
            console.log('cancel chooseImage')
            break
          default:
            console.log('complete')
        }
      }
    }
  }
})
