/**
 * 添加directive方法
 */

export default {
  install (Vue) {
    /* 上传9张全景拼接图 */
    Vue.directive('upload-stitch-batch', {
      bind (el, binding, vnode) {
        if (!el._input) {
          el._input = document.createElement('input')
        }
      }
    })
  }
}
