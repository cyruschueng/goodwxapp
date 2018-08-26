<ul>
    <li cardId={{cardInfo.cardId}} class="cardsDe">
        <img src="{{appInfo.appImg}}" class="logo" />
        <dl>
            <dd>{{appInfo.appName}}</dd>
            <dt>{{title}}</dt>
        </dl>
        <div class="cardDt">
          <p><i class="{{moneySign amount}}"><img src="../ps_card/imgs/money.png"></i><b>{{amountChange amount}}</b></p>
        </div>
        <div class="topCircle"></div>
       <div class="bottomCircle"></div>
    </li>
</ul>

<!--使用须知-->
<div class="cardDetail useInfor">
	<dl>
		<dt>使用须知</dt>
		<dd class="f999">
            <p>自领取之日起{{cardInfo.days}}天内有效</p>
            <p></p>
        </dd>
	</dl>
</div>

<!--使用须知-->
<!--div class="cardDetail">
	<dl>
		<dt>购买须知</dt>
		<dd class="f999">在购买任意保险时使用，请在使用卡券时与本
              店服务人员核对信息；
             卡券核销后24小时内到账。</dd>
	</dl>
</div-->