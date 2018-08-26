const Upyun = require('./upyun-wxapp-sdk')

const config = {
  UPYUN_BUCKET: 'youhaodongxi-test',
  UPYUN_OPERATOR: 'youhaodongxi',
  UPYUN_GET_SIGNATURE_URL: 'https://weapp-test.youhaodongxi.com/dfs/upyun/signature'
}

const upyun = new Upyun({
  bucket: config.UPYUN_BUCKET,
  operator: config.UPYUN_OPERATOR,
  getSignatureUrl: config.UPYUN_GET_SIGNATURE_URL
})

module.exports = ({ localPath, remoteFolder, fileName }) => {
  // const date = new Date()
  // const dateFolder = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
  const name = fileName || /([^\/.]*).([^\/.]*)$/.exec(localPath)[1]
  const ext = localPath.substr(localPath.lastIndexOf('.'))

  return new Promise((resolve, reject) => {
    upyun.upload({
      localPath,
      remotePath: `${remoteFolder}/${name}${ext}`,
      success (res) {
        const { statusCode, errMsg, data } = res
        if (statusCode != 200) {
          return reject(res)
        }
        resolve(res)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}
