function save(filePath) {
  return new Promise((resolve, reject) => {
    wx.saveFile({
      tempFilePath: filePath,
      success(res){
        resolve(res.savedFilePath)
      },
      fail(res){
        reject(res.errMsg)
      }
    })
  })
}

export default {
  save
}
