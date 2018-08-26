<ul>
    <li cardId={{cardInfo.cardId}} amount={{amount}}>
    	<a href="ps_cardDetail-give.html?cardId={{cardInfo.cardId}}&isEdit={{isEdit}}" id="cardDetail">
        <img src="{{appInfo.appImg}}" class="logo" />
        <dl>
            <dd>{{appInfo.appName}}</dd>
            <dt>{{title}}</dt>
            <dd>自领取之日起{{cardInfo.days}}天内有效</dd>
        </dl></a>
            <em class="r" giftId={{id}}><i></i>重新选择</em>
    </li>
</ul>
