/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.height = 600;
	config.filebrowserImageUploadUrl= "https://a.picooc.com/picooc-background/article/ckEditorUpload";
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	//config.templates_replaceContent = false;
	config.allowedContent=true;
/*	config.toolbar = 'Basic';
	config.toolbar_Basic =
[
    ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink','-','About']
];*/
	config.toolbar = 'Full';
    config.toolbar_Full = [
        {name: 'document',items: ['Source', 'Templates','-']},
        {name: 'clipboard',items: ['Undo', 'Redo']},
        {name: 'editing',items: ['Find', 'Replace', '-', 'SelectAll', '-']},
        { name: 'basicstyles',items: ['Bold', 'Italic', 'Underline', 'Strike',  '-', 'RemoveFormat']},
        
        {name: 'paragraph',items: ['-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-',]},
        {name: 'links',items: ['Link', 'Unlink']},
        {name: 'insert',items: ['Image', 'HorizontalRule', 'SpecialChar', 'PageBreak']},
        '/',
        { name: 'styles',items: ['Styles', 'Format', 'Font', 'FontSize']},
        { name: 'colors',items: ['TextColor', 'BGColor']},
        { name: 'tools',items: [ '-']}
    ];
};
