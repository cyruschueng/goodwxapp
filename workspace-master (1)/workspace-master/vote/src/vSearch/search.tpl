{{#each this}}
<li class="placeholder">
	
	<img src="{{image}}" alt="">
	<p class="playIn">
		<span class="playerNum">{{id}}号</span>
		<span class="playerName">{{name}}</span>
	</p>
	<a href="vVote.html?applyId={{id}}&applyName={{name}}&applyOpenid={{openId}}&activityId={{activityId}}&voteOpenid={{voteOpenid}}" class="weui-btn weui-btn_primary">投票</a>
	<p class="vote">{{votes}}票</p>
</li>
{{/each}}
