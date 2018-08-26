$(function () {
  //获取URL参数
  function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
  var group_id = getQueryString('group_id');
  //old api.codoon.com/white-web/groupmanage/get_group_galleries
  $.ajax({
    type:'POST',
    url:'//www.codoon.com/group_sports/get_group_galleries',
    data:{
      user_id:'',
      group_id:group_id,
      page:1,
      limit:1
    },
    crossDomain: true,
    datatype: 'json',
    success:function(data){
      if(data.status=='Error'){
        return alert(data.description);
      }
      //console.log(data.data);
      updatedom(data.data);
    },
    error: function(){
      alert('请求错误!');
    }
  });

//百分比
  function percentNum(num, num2) {
    return (Math.round(num / num2 * 10000) / 100.00 + '%'); //小数点后两位百分比
  }
  function updatedom(mes) {
    $('.c_word').text((mes.max_photo_count-mes.used_photo_count)+'/'+mes.max_photo_count);
    $('.max_word').text(mes.max_photo_count);
    $('.level_word').text('Lv.'+mes.group_level);
    var pieData = [
      {
        value : parseInt(mes.max_photo_count-mes.used_photo_count),
        color : '#68db89',
        text: percentNum((mes.max_photo_count-mes.used_photo_count),mes.max_photo_count)
      },
      {
        value : parseInt(mes.used_photo_count),
        color : '#a4e6ff',
        text: ''
      },
    ];
    var showA={
      responsive: true,
      // 是否执行动画
      animation : false,
      // 动画的时间
      // animationSteps : 40,
      //缝隙
      segmentShowStroke : true,
      segmentStrokeWidth : 4,
    };
    var showB={
      responsive: true,
      animation : false,
      segmentShowStroke : false
    };
    if(mes.max_photo_count==mes.used_photo_count || mes.used_photo_count==0){
      var myPie = new Chart(document.getElementById('canvas').getContext('2d')).Pie(pieData,showB);
    }else {
      var myPie = new Chart(document.getElementById('canvas').getContext('2d')).Pie(pieData,showA);
    }
  }

})
