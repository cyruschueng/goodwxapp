$(function(){

	if ($(".swiper-container1")) {
		// 初始化滚动控件
		var swiper1 = new Swiper('.swiper-container1', {
			pagination: '.pagination1',
			loop: true,
			autoplay: 3500, // 轮播间隙
			speed: 600, // 滑动速度
			grabCursor: true,
			paginationClickable: true, // 点击下面的轮播点能够自动滑倒那页
			calculateHeight: true, // 解决自动设置1000+的高度
			autoplayDisableOnInteraction: false, // 轮播时，手势滑动后保证能继续轮播
			onImagesReady: function() {
				// alert(1);
			}
		});
	}

	if ($(".swiper-container2")) {
		// 初始化滚动控件
		var swiper2 = new Swiper('.swiper-container2', {
			pagination: '.pagination2',
			loop: true,
			autoplay: 3500, // 轮播间隙
			speed: 600, // 滑动速度
			grabCursor: true,
			paginationClickable: true, // 点击下面的轮播点能够自动滑倒那页
			calculateHeight: true, // 解决自动设置1000+的高度
			autoplayDisableOnInteraction: false, // 轮播时，手势滑动后保证能继续轮播
			onImagesReady: function() {
				// alert(1);
			}
		});
	}

	if ($(".swiper-container3")) {
		// 初始化滚动控件
		var swiper3 = new Swiper('.swiper-container3', {
			pagination: '.pagination3',
			loop: true,
			autoplay: 3500, // 轮播间隙
			speed: 600, // 滑动速度
			grabCursor: true,
			paginationClickable: true, // 点击下面的轮播点能够自动滑倒那页
			calculateHeight: true, // 解决自动设置1000+的高度
			autoplayDisableOnInteraction: false, // 轮播时，手势滑动后保证能继续轮播
			onImagesReady: function() {
				// alert(1);
			}
		});
	}

	if ($(".swiper-container4")) {
		// 初始化滚动控件
		var swiper4 = new Swiper('.swiper-container4', {
			pagination: '.pagination4',
			loop: true,
			autoplay: 3500, // 轮播间隙
			speed: 600, // 滑动速度
			grabCursor: true,
			paginationClickable: true, // 点击下面的轮播点能够自动滑倒那页
			calculateHeight: true, // 解决自动设置1000+的高度
			autoplayDisableOnInteraction: false, // 轮播时，手势滑动后保证能继续轮播
			onImagesReady: function() {
				// alert(1);
			}
		});
	}

});