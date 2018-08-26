/** 用于处理表单输入框 */
export default function input(e) {
  const value = e.detail.value
  const name = e.currentTarget.dataset.name
  this.setData({
    [name]: value
  })
}
