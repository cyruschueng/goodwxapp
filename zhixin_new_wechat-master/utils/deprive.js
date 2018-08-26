// 判断有无授权
// if (request_header.Authorization !== "") {
//     console.log("getCourseAtLaunch with Authorization");
//     let url = "https://www.yongrui.wang/WeChatMiniProgram/course/" + parseInt(courseId);
//     wxRequest.getRequestWithAuth(url, request_header)
//         .then(res => {
//             console.log("getCourseAtLaunch success, res:", res.data);
//             console.log("self:", self);
//             course = res.data;
//
//             self.data.currentCourse = res.data;
//             self.initPageCourse();
//             wx.hideLoading();
//         }).catch(res => {
//         console.log("getCourseAtLaunch failed, res:", res);
//     })
//         .finally(() => {
//             console.log("getCourseAtLaunch finally!");
//         });
// } else {
//     console.log("getCourseAtLaunch without Authorization");
//     wxLogin().then(res => {
//         console.log("wxLogin success, res:", res.code);
//         let url = 'https://www.yongrui.wang/WeChatMiniProgram/user/weChatMPOpenIdByJSCode/' + res.code;
//         wxRequest.getRequest(url)
//             .then(res => {
//                 console.log("get openId success, res.data:", res.data);
//                 let mpOpenId = res.data.mpOpenId;
//                 wxGetSetting()
//                     .then(res => {
//                         console.log("wxGetSetting success, res:", res);
//                         wxGetUserInfo({
//                             data: {
//                                 'withCredentials': true
//                             }
//                         })
//                             .then(res => {
//                                 // 可以将 res 发送给后台解码出 unionId
//                                 console.log("wxGetUserInfo success, userInfo:", res.userInfo);
//
//                                 // 取得openId后去获取unionId，并带回服务器上用户的数据
//                                 let url = 'https://www.yongrui.wang/WeChatMiniProgram/user/weChatMPUnionIdQuery';
//                                 let data = {
//                                     mpOpenId: mpOpenId,
//                                     encryptedData: res.encryptedData,
//                                     iv: res.iv
//                                 };
//                                 wxRequest.postRequest(url, data)
//                                     .then(res => {
//                                         // 最核心的部分，获取成功以后，保存信息
//                                         console.log("get data from server success, res:", res);
//                                         wx.hideLoading();
//                                         let userAuth = res.data.weChatInfo.unionId + ":password";
//                                         let arrayBuffer = new ArrayBuffer(userAuth.length * 2);
//                                         let bufferView = new Uint16Array(arrayBuffer);
//                                         for (let i = 0, strLen = userAuth.length; i < strLen; i++) {
//                                             bufferView[i] = userAuth.charCodeAt(i);
//                                         }
//
//                                         let basicAuth = "Basic " + wx.arrayBufferToBase64(bufferView);
//
//                                         let request_header = {
//                                             Authorization: basicAuth
//                                         };
//
//                                         console.log("get request_header success, request_header:", request_header);
//
//                                         let url = "https://www.yongrui.wang/WeChatMiniProgram/course/" + parseInt(courseId);
//                                         wxRequest.getRequestWithAuth(url, request_header)
//                                             .then(res => {
//                                                 console.log("getCourseAtLaunch success, res:", res);
//                                                 course = res.data;
//
//                                                 self.data.currentCourse = res.data;
//
//                                                 self.initPageCourse();
//                                                 wx.hideLoading();
//                                             }).catch(res => {
//                                             console.log("getCourseAtLaunch failed, res:", res);
//                                         })
//                                             .finally(() => {
//                                                 console.log("getCourseAtLaunch finally!");
//                                             });
//                                     })
//                                     .catch(res => {
//                                         console.log("get data from server failed, res:", res);
//                                     });
//                             })
//                             .catch(res => {
//                                 console.log("getUserInfo failed, res:", res);
//                             });
//                     })
//                     .catch(res => {
//                         console.log("wxGetSetting failed, res:", res);
//                     });
//             })
//             .catch(res => {
//                 console.log("get openId failed, res:", res);
//             });
//     })
//         .catch(res => {
//             console.log("wxLogin failed, res:", res);
//             // wx.hideLoading();
//         })
//         .finally(() => {
//             console.log("wxLogin finally!");
//             // finishSync(userInfoLocal);
//         });
// }