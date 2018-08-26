(function(factory) {
  'use strict';

  factory(window.jQuery);
})
(function($) {
  'use strict';

  //弹出层验证码类定义
  $.MdPop = function(options) {
    var that = this;
    var copy = options || {};

    //验证码弹出层HTML
    var $dom = (function() {
      var ary = [];

      //Mask.
      ary.push('<div class="md_pop1">');
      ary.push('<div class="md_pop_mask"><!--layout--></div>');

      //Warp.
      ary.push('  <div class="md_pop_wrap">');
      ary.push('    <div class="md_pop_main">');

      //Topic
      ary.push('      <div class="md_pop_close">X</div>');

      //Cont
      ary.push('      <div class="md_pop_cont">');
      ary.push('        <div class="code">');
      ary.push('          <h2 class="code_title">请输入图形验证码</h2>');
      ary.push('          <div class="code_main">');
      ary.push('            <div class="code_main_top">');
      ary.push('              <i class="code_pic"><img /></i>');
      ary.push('              <em class="code_input_box">');
      ary.push('                <input type="text" class="code_input">');
      ary.push('              </em>');
      ary.push('            </div>');
      ary.push('            <div class="code_warn"></div>');
      ary.push('          </div>');
      ary.push('          <div class="code_btn_box">');
      ary.push('            <a href="javascript:void(0);" class="code_btn">确定</a>');
      ary.push('          </div>');
      ary.push('        </div>');
      ary.push('      </div>');
      ary.push('    </div>');
      ary.push('  </div>');
      ary.push('</div>');

      return $(ary.join(''));
    })();

    $('body').append($dom);

    //提供公用方法
    //关闭弹出层
    that.close = function() {
      $dom.remove();
      return that;
    };

    that.loadCode = function() {

    };

    //input的值
    that.val = function() {

      return $dom.find('.code_input')
          .val();
    };
    //刷验证码
    that.loadCode = function() {
      $dom.find('.code_pic > img')
          .prop('src', copy.src +  '&' + new Date());
    };

    //设置提醒文本内容.
    that.warn = function(str) {
      $dom.find('.code_warn')
        .html(str);
      return that;
    };

    //关闭按钮
    $dom.on('click', '.md_pop_close', function() {
      that.close();
    });

    //确定按钮
    $dom.on('click', '.code_btn', function() {
      copy.confirm.apply(that);
    });

    $dom.find('.code_pic > img')
        .prop('src', copy.src +  '&' + new Date())
        .on('click', function() {
           $(this).prop('src', copy.src +  '&' + new Date())
        });
  }
});

function isMobile(mobile){
  mobile=mobile.replace(" ", "").replace(" ", "");
  //手机号码
  var uTel = /^((13[0-9])|145|147|17[0678]|(15[^4\D])|(18[0-9]))\d{8}$/;
  if (uTel.test(mobile)) {
    return true;
  }
  return false;
}