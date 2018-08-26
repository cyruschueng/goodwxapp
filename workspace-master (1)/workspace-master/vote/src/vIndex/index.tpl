{{#if currentUser}}
<li class="placeholder bgf7ba2a">
	{{#if currentUser.topImg}}
	<div class="top" style="background:url('http://{{currentUser.host}}/vote/imgs/{{currentUser.topImg}}');background-size: 100% 100%;">{{currentUser.votesRank}}</div>
	{{/if}}

	<img src="{{currentUser.image}}" alt="" class="applyImage" />
	<p class="playIn">
		<span class="playerNum">{{currentUser.id}}号</span>
		<span class="playerName">{{currentUser.name}}</span>
	</p>
	<a href="http://{{currentUser.host}}/vote/vVote.html?applyId={{currentUser.id}}&applyName={{currentUser.name}}&applyOpenid={{currentUser.openId}}&activityId={{currentUser.activityId}}&voteOpenid={{currentUser.voteOpenid}}&isMe=true" class="weui-btn weui-btn_primary">投票</a>
	<p class="vote">{{currentUser.votes}}票</p>
</li>
{{/if}}
{{#if sortUser}}
	{{#each sortUser}}
	<li class="placeholder">
		{{#if topImg}}
		<div class="top" style="background:url('http://{{host}}/vote/imgs/{{topImg}}');background-size: 100% 100%;">{{votesRank}}</div>
		{{/if}}
		<img src="{{image}}" alt="" class="applyImage" />
		<p class="playIn">
			<span class="playerNum">{{id}}号</span>
			<span class="playerName">{{name}}</span>
		</p>
		<a href="http://{{host}}/vote/vVote.html?applyId={{id}}&applyName={{name}}&applyOpenid={{openId}}&activityId={{activityId}}&voteOpenid={{voteOpenid}}" class="weui-btn weui-btn_primary">投票</a>
		<p class="vote">{{votes}}票</p>
	</li>
	{{/each}}
{{/if}}