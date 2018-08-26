/**
 * API -- 发票接口
 * 
 * v1.5.0
 * 
 *
 *
 */


 module.exports = {
   chooseTitle(opts) {
     const _opts = {
       success(res) {
         const _res = {
           type: 'String, 抬头类型，0-单位，1-个人',
           title: 'String, 抬头名称',
           taxNumber: 'String, 抬头税号',
           companyAddress: 'String, 单位地址',
           telephone: 'String, 手机号码',
           bankName: 'String, 银行名称',
           bankAccount: 'String, 银行账号',
           errMsg: 'String'
         }
       }
     }
   }
 } 