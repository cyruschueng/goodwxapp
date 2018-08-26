/**
 * @filename header.js
 * @filedesc header.js
 * @authors lq
 * @email 610970478@qq.com
 * @date 2016-10-12 15:35:01
 * @version v3.0
*/
var phoneWidth = parseInt(window.screen.width),
	phoneScale = phoneWidth/750;
document.write('<meta name="viewport" content="width=750, initial-scale=1, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');