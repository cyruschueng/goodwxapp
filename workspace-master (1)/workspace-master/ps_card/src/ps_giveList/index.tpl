<ul>
    {{#each data}}
    <li cardId="{{id}}"><a href="ps_giveDetail.html?cardId={{id}}">
        <img src="{{imageUrl}}" />
        <dl>
            <dt>{{name}}</dt>
            <dd>赠送时间：{{createTime}}</dd>
            <dd>{{templateStatus status}}</dd>
        </dl></a>
    </li>
    {{/each}}
</ul>