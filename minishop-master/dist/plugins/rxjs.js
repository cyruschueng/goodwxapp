import Axe from '../modules/axe/index.js'
import {
  Subject,
  Observable
} from '../modules/rxjs/index'

Axe.mixin({
  onInit () {
    var domStreams = this.domStreams
    if (domStreams && Array.isArray(domStreams)) {
      domStreams.forEach((key) => {
        this[key] = new Subject()
        var onKey = 'on' + key.trim().replace(/^[a-z]/, (s) => s.toUpperCase())
        this[onKey] = (e) => {
          this[key].next(e)
        }
      })
    }
  }
})

// 添加$watchAsObservable实例方法
Axe.prototype.$watchAsObservable = function (exp) {
  return Observable.create(observer => {
    const watch = (data) => {
      if (data.hasOwnProperty(exp)) {
        observer.next(data[exp])
      }
    }

    this.on('axe:updated', watch)
    return () => {
      this.off('axe:updated', watch)
    }
  })
}
