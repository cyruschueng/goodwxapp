/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [{
			name: 'clipboard',
			groups: ['clipboard', 'undo']
		}, {
			name: 'editing',
			groups: ['find', 'selection', 'spellchecker']
		}, {
			name: 'links'
		}, {
			name: 'insert'
		}, {
			name: 'forms'
		}, {
			name: 'tools'
		}, {
			name: 'document',
			groups: ['mode', 'document', 'doctools']
		}, {
			name: 'others'
		},
		'/', {
			name: 'basicstyles',
			groups: ['basicstyles', 'cleanup']
		}, {
			name: 'paragraph',
			groups: ['list', 'indent', 'blocks', 'align', 'bidi']
		}, {
			name: 'styles'
		}, {
			name: 'colors'
		}, {
			name: 'about'
		}
	];

	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';
	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';
	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
//	config.filebrowserUploadUrl = seturl + 'upload/ckeidtor';
	config.baseURI = imgurl
	config.filebrowserUploadUrl = imgurl+'/upload/ckeidtor';
//	<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction(1,'/uploads/20160524/GVbYgfL6pozuqCSFN3kDhi6Y.png','')</script>
	//	config.filebrowserImageBrowseUrl = '../editor/ckfinder/ckfinder.html?Type=Images';
	//	config.filebrowserImageUploadUrl = '../editor/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images';
	//	config.filebrowserWindowWidth = '800'; //“浏览服务器”弹出框的size设置
	//	config.filebrowserWindowHeight = '500';
};