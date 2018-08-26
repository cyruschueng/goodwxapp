/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
/*
谭超注释，模板
CKEDITOR.addTemplates("default",{imagesPath:CKEDITOR.getUrl(CKEDITOR.plugins.getPath("templates")+"templates/images/"),templates:[{title:"Image and Title",image:"template1.gif",description:"One main image with a title and text that surround the image.",html:'\x3ch3\x3e\x3cimg src\x3d" " alt\x3d"" style\x3d"margin-right: 10px" height\x3d"100" width\x3d"100" align\x3d"left" /\x3eType the title here\x3c/h3\x3e\x3cp\x3eType the text here\x3c/p\x3e'},{title:"Strange Template",image:"template2.gif",description:"A template that defines two columns, each one with a title, and some text.",
html:'\x3ctable cellspacing\x3d"0" cellpadding\x3d"0" style\x3d"width:100%" border\x3d"0"\x3e\x3ctr\x3e\x3ctd style\x3d"width:50%"\x3e\x3ch3\x3eTitle 1\x3c/h3\x3e\x3c/td\x3e\x3ctd\x3e\x3c/td\x3e\x3ctd style\x3d"width:50%"\x3e\x3ch3\x3eTitle 2\x3c/h3\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3eText 1\x3c/td\x3e\x3ctd\x3e\x3c/td\x3e\x3ctd\x3eText 2\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3cp\x3eMore text goes here.\x3c/p\x3e'},{title:"Text and Table",image:"template3.gif",description:"A title with some text and a table.",
html:'\x3cdiv style\x3d"width: 80%"\x3e\x3ch3\x3eTitle goes here\x3c/h3\x3e\x3ctable style\x3d"width:150px;float: right" cellspacing\x3d"0" cellpadding\x3d"0" border\x3d"1"\x3e\x3ccaption style\x3d"border:solid 1px black"\x3e\x3cstrong\x3eTable title\x3c/strong\x3e\x3c/caption\x3e\x3ctr\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3cp\x3eType the text here\x3c/p\x3e\x3c/div\x3e'}]});
*/
CKEDITOR.addTemplates( 'default',
	{
	// The name of sub folder which hold the shortcut preview images of the templates.
	imagesPath : 'http://picoocheadportrait.oss-cn-beijing.aliyuncs.com/web/res/system/test/1.jpg',
	// The templates definitions.
	templates :
	[
		{
		title: '图文',

		//image: 'http://picoocheadportrait.oss-cn-beijing.aliyuncs.com/web/res/system/test/1.jpg',

		//description: 'Description of my template 1.',

		html:

		'此处填写内容'

		},

		{

		title: '达人',

		html:

		'<div class="details_article">此处填写达人页头部页面</div>'+
			'<!--tab切换--><div class="tabs_tit">'+
				'<div class="moving_bg">&nbsp;</div><span class="tab_item cur" id="aa">故事</span> <span class="tab_item" id="bb">干货</span></div>'+
			'<div class="tabs_con">'+
				'<div class="story"><div class="details_article">此处填写达人页故事页面</div></div><br />'+
				'<div class="gh"><div class="details_article">此处填写达人页干货页面</div></div>'+
			'</div>'
		
		},
		/*{
		title: '投票',

		//image: 'http://picoocheadportrait.oss-cn-beijing.aliyuncs.com/web/res/system/test/1.jpg',

		//description: 'Description of my template 1.',

		html:

		'<div id="danxuan">'+
			'<div class="details_article">'+
				'<div class="details_article_pic">'+
					'此处插入投票文章图片'+
				'</div>'+
				'<div class="details_article_tit">'+
					'此处填写标题'+
				'</div>'+
				'<div class="details_article_con">'+
					'此处填写内容'+
				'</div>'+
			'</div>'+
			'<!--详情投票-->'+

			'<!--s博士解答-->'+
				'<div class="Dr_answer">'+
				'<div class="Dr_answer_top">'+
					'<img src="/statics/Portal/images/details/Dr_answer_topbg.png" />'+
				'</div>'+
				'<div class="Dr_answer_nr">'+
					'<h3 class="Dr_answer_tit">'+
						'此处填写解答标题'+
					'</h3>'+
					'<p class="Dr_answer_p">'+
						'此处填写解答内容段'+
					'</p>'+
				'</div>'+
				'<div class="Dr_answer_pic">'+
					'<img src="/statics/Portal/images/details/Dr_answer_pic.png" />'+
				'</div>'+
				'<div class="Dr_answer_bottom">'+
					'<img src="/statics/Portal/images/details/Dr_answer_bottombg.png" />'+
				'</div>'+
			'</div>'+
		'</div>'

		},{
		title: '问答',

		//image: 'http://picoocheadportrait.oss-cn-beijing.aliyuncs.com/web/res/system/test/1.jpg',

		//description: 'Description of my template 1.',

		html:

		'<div id="expand-qabody"><div class="details_article">此处填写内容' +

		'</div></div>'

		},{
		title: '插入投票列表和按钮',

		//image: 'http://picoocheadportrait.oss-cn-beijing.aliyuncs.com/web/res/system/test/1.jpg',

		//description: 'Description of my template 1.',

		html:

		'<div class="details_vote radio" style="display: block;">'+
			'<ul class="vote_list">此处插入单个投票'+
			'</ul>'+
			'<div class="vote_btn_con">'+
				'<a href="#" class="vote_btn_a_cur">投票</a>'+
			'</div>'+
		'</div>'

		},{
		title: '插入单个投票',
		html:

		'<li>'+
			'<div class="label" value="237"> <img src="/statics/Portal/images/details/radio001.png" class="cur"> <img src="/statics/Portal/images/details/radio002.png" class=""> </div>'+
			'<div class="vote_tit">投票内容</div>'+
		'</li>'

		},*/

	]

});


