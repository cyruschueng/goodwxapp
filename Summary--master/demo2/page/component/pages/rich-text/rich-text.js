// page/component/pages/rich-text/rich-text.js
Page({
  data: {
    nodes:"<b>hi,click button to change nodes.</b>",
    nodes1: [{
      name: 'div',
      type:'node',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }],
    nodes2: `<table width="100%" style="text-align:center;box-shadow: 2px 2px 5px #888;">
  <tr>
    <th>Month</th>
    <th>Savings</th>
    <th>third</th>
  </tr>
  <tr>
    <td>January</td>
    <td>$100</td>
    <td>$100</td>
  </tr>
  <tr>
    <td>January1</td>
    <td>$1001</td>
    <td>$1001</td>
  </tr>
</table><br>
<img style="box-shadow: 2px 2px 6px #888;" src="http://www.w3school.com.cn/i/eg_tulip.jpg" width="100%" alt="郁金香" />
<ol>
   <li>Coffee</li>
   <li>Tea</li>
   <li>Milk</li>
</ol>
<del>del style</del>,<ins>ins style</ins><br>
<sub>下标</sub>,<sup>上标</sup><br>
<em>em标签</em>
<ul>
   <li>Coffee</li>
   <li>Tea</li>
   <li>Milk</li>
</ul>
<h1>这是标题 1</h1>
<h2>这是标题 2</h2>
<h3>这是标题 3</h3>
<h4>这是标题 4</h4>
<h5>这是标题 5</h5>
<h6>这是标题 6</h6>
<hr />
<fieldset>
  <legend>health information</legend>
  height: <input type="text" />
  weight: <input type="text" />
</fieldset>
<p><span>some text.</span>some other text.</p>`
  },
  changeNodes(e){
    var fieldName = e.currentTarget.dataset.name
    this.setData({
      nodes: this.data[fieldName]
    })
  },
  tap() {
    console.log('tap')
  }
})