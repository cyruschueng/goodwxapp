
<div class="playerContent">
	<img src="{{userInfo.image}}" alt="">
	<p class="playIn">
		<span class="playerNum">{{userInfo.id}}号</span>
		<span class="playerName">{{userInfo.name}}</span>
	</p>
	<p class="declaration">
		参赛宣言：
		<span>{{userInfo.applySlogan}}</span>
	</p>
</div>
{{#if userInfo.type}}
<div class="ticketCon">
	<div class="weui">
      <div class="weui-col-28 w28">
      	<p class="p1">{{userInfo.votes}}</p>
      	<p class="p2">当前票数</p>
      </div>
      <div class="weui-col-28 w28 borderLeft">
      	<p class="p1">{{curRank}}</p>
      	<p class="p2">当前排名</p>
      </div>
      <div class="weui-col-44 w44 borderLeft">
      	<p class="p1">{{votesGap}}</p>
      	<p class="p2">距离上一名票数</p>
      </div>
    </div>
    <div class="needKnow">
    	
    </div>
</div>
<div class="vote" id="voteBox">
	<a href="javascript:;" class="weui-btn weui-btn_primary" id="vote">投票</a>
</div>

  {{#if userInfo.isMe}}
  <div class="vote">
    <a class="share">邀请好友助力</a>
  </div>
  {{else}}
  <div class="vote">
    <a class="share">我要分享</a>
  </div>
  {{/if}}

{{else}}
<div class="ticketCon errorMsg">{{userInfo.msg}}</div>
{{/if}}
