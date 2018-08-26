var data=eval(<?php echo json_encode($music);?>); 

ueditor编辑器失去焦点事件
UE.getEditor('content').addListener('blur',function(editor){savecontent();});



移动端滚动穿透问题完美解决方案[https://uedsky.com/2016-06/mobile-modal-scroll/]
```
解决方案 position: fixed
CSS
body.modal-open {
    position: fixed;
    width: 100%;
}
如果只是上面的 css，滚动条的位置同样会丢失
所以如果需要保持滚动条的位置需要用 js 保存滚动条位置关闭的时候还原滚动位置

JavaScript
/**
  * ModalHelper helpers resolve the modal scrolling issue on mobile devices
  * https://github.com/twbs/bootstrap/issues/15852
  * requires document.scrollingElement polyfill https://github.com/yangg/scrolling-element
  */
var ModalHelper = (function(bodyCls) {
  var scrollTop;
  return {
    afterOpen: function() {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function() {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
})('modal-open');
```


