$(function () {
	var elems = $(".news_con").find("img");
	for (var i = 0, len = elems.length; i < len; i++) {
		$(elems[i]).css({
			width: "100% !important"
		})
	}
});