<ul>
    {{#each data}}
    <li cardId={{cardInfo.cardId}} class="{{ifFree amount}}"><a href="ps_cardDetail.html?cardId={{cardInfo.cardId}}">
        <img src="{{appInfo.appImg}}" class="logo" />
        <dl>
            <dd>{{appInfo.appName}}</dd>
            <dt>{{title}}</dt>
            <!-- <dd>自领取之日起{{days}}天内有效</dd> -->
        </dl></a>
        <div class="cardDt">
          <p><i class="{{moneySign amount}}"><img src="../ps_card/imgs/money.png"></i><b>{{amountChange amount}}</b></p>
          <span class="r" cardId={{cardInfo.cardId}} giftId={{id}}>{{cardSelected id}}</span>
        </div>
       <!--  {{#if selectedCardId}}
       <div class="r" cardId={{cardId}}><img src="../ps_card/imgs/rAble.png" /></div>
       {{else}}
       <div class="r" cardId={{cardId}}><img src="../ps_card/imgs/rDisable.png" /></div>
       {{/if}} -->
       <div class="topCircle"></div>
       <div class="bottomCircle"></div>
    </li>
    {{/each}}
</ul>

<!--li cardId="12131">
    <img src="../ps_card/imgs/logo.png" class="logo" />
    <dl>
        <dd>杭州人保财险</dd>
        <dt>20元流量抵扣券</dt>
        <dd>有效期至2017.12.29</dd>
    </dl>
    <img src="../ps_card/imgs/rDisable.png" class="r" />
    <img src="../ps_card/imgs/corner.png" class="buy" />
</li-->
