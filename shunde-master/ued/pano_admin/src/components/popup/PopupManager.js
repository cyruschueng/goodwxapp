import Vue from 'vue'
import overlayOpt from './overlay.vue'
const Overlay = Vue.extend(overlayOpt)

let zIndex = 20180222

const getZIndex = () => {
  return zIndex++
}

const PopupManager = {
  instances: [],
  overlay: null,
  bodyOverflow: '',
  open (instance) { // 本质为实例入栈
    // 弹窗为null或者已经在实例栈中，就不进行接下来操作
    if (!instance || this.instances.indexOf(instance) !== -1) return
    // 入栈
    this.instances.push(instance)
    // 如果栈中只有一个实例时，显示overlay
    if (this.instances.length === 1) {
      this.showOverlay()
    }
    // 提升弹窗zindex
    instance.$el.style.zIndex = getZIndex()
  },
  close (instance) { // 本质是实例出栈
    // 如果实例不在栈，不做任何处理
    let index = this.instances.indexOf(instance)
    if (index === -1) return
    Vue.nextTick(() => {
      // 将实例推出栈
      this.instances.splice(index, 1)
      // 如果栈为空，关闭overlay
      if (this.instances.length === 0) {
        this.closeOverlay()
      }
    })
  },
  showOverlay () { // 实例话overlay + 挂载到body + 禁止页面滚动
    // 实例化overlay
    // 因为vue2不支持把html，body设为挂载点，所以先渲染后手动添加入dom
    this.overlay = new Overlay({
      el: document.createElement('div')
    })
    // 为overlay的容器设置zindex
    this.overlay.$el.style.zIndex = getZIndex()
    // 为overlay设置点击方法
    this.overlay.click = this.handlerOverlayClick.bind(this)
    // 将overlay手动挂载到document.body
    // vm.$appendTo已经被移除，使用原生方法：myElement.appendChild(vm.$el)
    document.body.appendChild(this.overlay.$el)
    // 禁止页面滚动
    this.bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  },
  closeOverlay () { // overlay实例置为null + body中移除 + 允许页面滚动
    document.body.removeChild(this.overlay.$el)
    this.overlay.$destroy()
    this.overlay = null
    document.body.style.overflow = this.bodyOverflow
  },
  // overlay的点击处理，优先调用栈顶的实例的overlayclick方法
  handlerOverlayClick () {
    if (this.instances.length === 0) return
    let instance = this.instances[this.instances.length - 1]
    if (instance.overlayClick) {
      instance.overlayClick()
    }
  }
}
export default PopupManager
