<div class="votitle">
  <h1>
    报名成功
    <span class="orbottom"></span>
  </h1>
</div>
<div class="suContent">
  <img src="{{userInfo.image}}" alt="" class="applyImage" />
  <p class="line">编号：<span class="indent">{{userInfo.id}}</span></p>
  <p class="line">姓名：<span class="indent">{{userInfo.name}}</span></p>
  <p class="line">联系方式：<span>{{userInfo.phone}}</span></p>
  <p class="line">参赛宣言：<span>{{userInfo.applySlogan}}</span>
  </p>
</div>


{{#if userInfo.type}}
<div class="vote">
    <a href="javascript:;" class="weui-btn weui-btn_primary share">邀请好友助力</a>
</div>
{{else}}
<div class="ticketCon errorMsg">{{userInfo.msg}}</div>
{{/if}}



