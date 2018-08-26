
import Promise from '../utils/npm/bluebird.min';

export function wxUploadP(data) {
  var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
  var newUrls = '';

    wx.uploadFile({
      url: 'http://192.168.1.18:9003/picture/upload',
      filePath: data.path[i],
      name: 'uploadFile',//这里根据自己的实际情况改
      formData: null,
      success: (res) => {

        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
        if (+res.statusCode >= 200 && +res.statusCode < 400) {

          success++;
          console.log(i);

          return res.data
        } else {
          console.log(" failed: " + JSON.stringify(res.data))
          // wx.hideLoading()
          return res.data
        }

      },
      fail: (res) => {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: (res) => {
        console.log(i);
        i++;

        console.log(" complete: " + JSON.stringify(res.data))

        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);

          // return resolve(res.data)
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;

          return wxUploadP(data);
        }

      }
    })
}

// export function wxUploadP(data) {
//   var that = this,
//     i = data.i ? data.i : 0,
//     success = data.success ? data.success : 0,
//     fail = data.fail ? data.fail : 0;
//   var newUrls = '';

//   return new Promise((resolve, reject) => {
//     wx.uploadFile({
//       url: 'http://192.168.1.18:9003/picture/upload',
//       filePath: data.path[i],
//       name: 'uploadFile',//这里根据自己的实际情况改
//       formData: null,
//       success: (res) => {
        
//         //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
//         // console.log('upload img succeed: ' + JSON.stringify(res))

//         if (+res.statusCode >= 200 && +res.statusCode < 400) {

//           success++;
//           // console.log(res)
//           console.log(i);

//           // console.log(' succeed: ' + JSON.stringify(res.data))
//           // wx.hideLoading()
//           // if (i == data.path.length) { 
//             // data.newUrls = []
//             // data.newUrls.push(res.data)
//           console.log(' succeed: ' + JSON.stringify(res.data))
//           data.path[i] = res.data;
//           console.log(' path: ' + JSON.stringify(data.path))
//           // if (i+1 == data.path.length) {
//             return resolve(data.path)
//           // }
//           // }
//         } else {
//           console.log(" failed: " + JSON.stringify(res.data))
//           // wx.hideLoading()
//           return reject(res.data)
//         }

//       },
//       fail: (res) => {
//         fail++;
//         console.log('fail:' + i + "fail:" + fail);
//       },
//       complete: (res) => {
//         console.log(i);
//         i++;

//         console.log(" complete: " + JSON.stringify(res.data))

//         if (i == data.path.length) {   //当图片传完时，停止调用          
//           console.log('执行完毕');
//           console.log('成功：' + success + " 失败：" + fail);

//           // return resolve(res.data)
//         } else {//若图片还没有传完，则继续调用函数
//           console.log(i);
//           data.i = i;
//           data.success = success;
//           data.fail = fail;

//           return wxUploadP(data);
//         }

//       }
//     })
//   })
// }
