var myEvent = (function() {
      var handlers = {};
    
      function on(evt, func) {
        handlers[evt] = handlers[evt] || [];
        handlers[evt].push(func);
      }
      function once(evt, func) {
        handlers[evt] = [];
        handlers[evt].push(func);
      }
      function off(evt, func) {
        var handler = handlers[evt];
        if (handler) {
          for (var i = 0; i < handler.length; i++) {
            if (handler[i] === func) {
              handler.splice(i, 1);
              return;
            }
          }
        }
      }
      function emit(evt, arg) {
        if (handlers[evt]) {
          for (var i = 0; i < handlers[evt].length; i++) {
            handlers[evt][i](arg);
          }
        }
      }
      return {
        on: on,
        once: once,
        off: off,
        emit: emit,
      };
    })();


    JS观察者模式

// 这是一种创建松散耦合代码的技术。它定义对象间 一种一对多的依赖关系，当一个对象的状态发生改变时，
// 所有依赖于它的对象都将得到通知。由主体和观察者组成，主体负责发布事件，同时观察者通过订阅这些事件来观察该主体。
// 主体并不知道观察者的任何事情，观察者知道主体并能注册事件的回调函数。