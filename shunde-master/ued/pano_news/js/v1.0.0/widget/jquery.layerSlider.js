(function($) {

	$.fn.mpcLayerSlider = function(options) {

		var settings = $.extend({
			'pauseOnHover': false,
			'slideshow' : false,
			'delay': 10000,
			'showArrows': true,
			'showTimer': true,
			'uiStyle': 'style01',
			'arrowsOffset': 0,
			'autoPlayVideo': false,
			'shadowStyle': 'style01',
			'transitionTime': 1000,
			'showControlsOnHover': false,
			'controlsOpacity': 1,
			'showBullets': true,
			'showBulletsTooltip': true,
			'bulletsVerticalPosition': 'bottom',
			'bulletsVerticalOffset': 0,
			'bulletsHorizontalPosition': 'center',
			'bulletsHorizontalOffset': 0,
			'revertAnimation': false,
			'defaultWidth': 960,
			'defaultHeight': 450,
			'swipeGesture': true
		}, options);

		var $slider = this,
			$slider_parent = $slider.parent(),
			$slides_list,
			$slides,
			$wrapper,
			$slides_wrapper,
			$ui,
			$controls,
			$timer,
			$slideshowControl,
			$preloader,
			$prev_slide,
			$next_slide,
			$thumbs_container,
			$thumbs_wrapper,
			$thumbs_up_button,
			$thumbs_down_button,
			$thumbs,
			$thumbs_tooltip,
			$thumbs_tooltip_images_wrap,
			$thumbs_tooltip_images,
			$window = $(window),
			$queued_slide

		var index = 0,
			slides_count,
			timer,
			mouse_out = true,
			side_offset,
			scale_ratio = 1,
			yt_players = {},
			v_players = {},
			tooltip_timer,
			touch_coords,
			preload_timer,
			preload_time = 600,
			paused;

		mpcSlider();

		function mpcSlider() {
			parseConfig();
			init();
			addBehavior();

			return $slider;
		}
		
		/* Parsing provided by user configuration for correct types. */
		function parseConfig() {
			settings.pauseOnHover = typeof settings.pauseOnHover == 'boolean' ? settings.pauseOnHover : false;
			settings.delay = typeof settings.delay == 'number' ? settings.delay : 10000;
			settings.showArrows = typeof settings.showArrows == 'boolean' ? settings.showArrows : true;
			settings.showTimer = typeof settings.showTimer == 'boolean' ? settings.showTimer : true;

			settings.arrowsOffset = typeof settings.arrowsOffset == 'number' ? settings.arrowsOffset : 0;
			settings.autoPlayVideo = typeof settings.autoPlayVideo == 'boolean' ? settings.autoPlayVideo : false;

			settings.transitionTime = typeof settings.transitionTime == 'number' ? settings.transitionTime : 1000;
			settings.showControlsOnHover = typeof settings.showControlsOnHover == 'boolean' ? settings.showControlsOnHover : false;
			settings.controlsOpacity = typeof settings.controlsOpacity == 'number' ? settings.controlsOpacity : 1;
			settings.showBullets = typeof settings.showBullets == 'boolean' ? settings.showBullets : true;
			settings.showBulletsTooltip = typeof settings.showBulletsTooltip == 'boolean' ? settings.showBulletsTooltip : true;

			settings.bulletsVerticalOffset = typeof settings.bulletsVerticalOffset == 'number' ? settings.bulletsVerticalOffset : 0;
			settings.bulletsHorizontalOffset = typeof settings.bulletsHorizontalOffset == 'number' ? settings.bulletsHorizontalOffset : 0;
			settings.revertAnimation = typeof settings.revertAnimation == 'boolean' ? settings.revertAnimation : false;
			settings.defaultWidth = typeof settings.defaultWidth == 'number' ? settings.defaultWidth : 960;
			settings.defaultHeight = typeof settings.defaultHeight == 'number' ? settings.defaultHeight : 450;
			settings.swipeGesture = typeof settings.swipeGesture == 'boolean' ? settings.swipeGesture : true;

			settings.uiStyle = typeof settings.uiStyle == 'string' ? settings.uiStyle : 'style01';
			settings.shadowStyle = typeof settings.shadowStyle == 'string' ? settings.shadowStyle : 'style01';
			settings.bulletsVerticalPosition = typeof settings.bulletsVerticalPosition == 'string' ? settings.bulletsVerticalPosition : 'bottom';
			settings.bulletsHorizontalPosition = typeof settings.bulletsHorizontalPosition == 'string' ? settings.bulletsHorizontalPosition : 'center';
		}

		/* Initialising slider. Creating all elements. */
		function init() {
			$slides_list = $slider.children('ul');

			if(!$.support.leadingWhitespace)
				$('html').addClass('ie8');

			$slides = $slides_list.children();

			$wrapper = $('<div class="mpc_ls_wrapper"></div>');
			$slides_wrapper = $('<div class="mpc_ls_slides_wrapper"></div>');
			$ui = $('<div class="mpc_ls_ui"></div>');
			$timer = $('<div class="mpc_ls_timer"></div>');
			$preloader = $('<div class="mpc_ls_preloader"></div>');
			$prev_slide = $('<a href="#" class="mpc_ls_prev_slide mpc_ls_ui_button ' + settings.uiStyle + '"></a>');
			$next_slide = $('<a href="#" class="mpc_ls_next_slide mpc_ls_ui_button ' + settings.uiStyle + '"></a>');

			$thumbs_container = $('<div class="mpc_ls_slides_thumbs"></div>');

			$slider.addClass('mpc_ls')
			$slides_list.addClass('mpc_ls_slides');

			$wrapper
				.append($slides_wrapper, $preloader)
				.appendTo($slider);

			$slides_wrapper.append($slides_list);

			$ui
				.append($timer, $prev_slide, $next_slide, $thumbs_container)
				.appendTo($wrapper);

			if(settings.uiStyle != 'style07') {
				$prev_slide.css('top', settings.defaultHeight * scale_ratio / 2);
				$next_slide.css('top', settings.defaultHeight * scale_ratio / 2);
			}

			$controls = $prev_slide.add($next_slide);

			$slides.css('visibility', 'hidden');

			$slides_list.data('toLoad', $slides.length);

			slides_count = $slides.length - 1;
			side_offset = ($slider.width() - settings.defaultWidth * scale_ratio) / 2;

			if(settings.shadowStyle != 'none')
				$wrapper.prepend('<div class="mpc_ls_shadow ' + settings.shadowStyle + '"></div>');

			if(settings.arrowsOffset != 0 && settings.uiStyle != 'style07') {
				$prev_slide.css('left', '-=' + settings.arrowsOffset);
				$next_slide.css('right', '-=' + settings.arrowsOffset);
			}

			if(settings.delay < settings.transitionTime)
				settings.transitionTime = settings.delay;

			if(settings.uiStyle == 'none') {
				settings.showBullets = false;
				settings.showArrows = false;
			}

			if(!settings.showTimer)
				$timer.css('visibility', 'hidden');

			if(settings.uiStyle == 'style09')
				settings.showBulletsTooltip = false;

			saveDefaults();

			preloadImages();

			prepareVideos();
		}

		/* Adding event listeners to slider elements. */
		function addBehavior() {
			$prev_slide.on('click', null, index - 1, slideButtonHandler);
			$next_slide.on('click', null, index + 1, slideButtonHandler);

			if(settings.slideshow && settings.pauseOnHover) {
				$slides.on('mouseenter', pauseTimer);
				$slides.on('mouseleave', continueTimer);
				$slides.on('mouseenter mouseleave', setMouseOver);
			}

			$ui.on('click', function(e) {
			    e.preventDefault();
			})

			$window.resize(function() {
				var $slide = $slides.eq(index);

				side_offset = ($slider.width() - settings.defaultWidth * scale_ratio) / 2;

				if($slider_parent.width() < settings.defaultWidth) {
					scaleSlider();
					
					if(settings.uiStyle == 'style09')
						updateThumbsItems();
				}
				else {
					scaleToDefault();
					
					if(settings.uiStyle == 'style09')
						updateThumbsItems();
				}

				if(!$slide.data('animationFinished')) {
					if(settings.slideshow) {
						stopTimer();
						startTimer();
					}
					
					animateSlide($slide);
				}
				else
					resetAnimationTimer($slide);
			})

			$slides_list.on('initSlide', function() {
				if($slider_parent.width() < settings.defaultWidth)
					scaleSlider();

				var $slide = $slides.eq(index);

				$preloader.fadeOut();
				$slide
					.css('visibility', 'visible')
					.fadeIn(function() {
						$slides.css('visibility', 'visible');
					});

				adjustBackground($slide);
				adjustBackground($slide);
				animateSlide($slide);

				if(settings.slideshow)
					timerLoop();

				if(settings.showBullets)
					initThumbs();
			})

			if(settings.swipeGesture && $slides_wrapper.get(0).addEventListener) {
				$slides_wrapper.get(0).addEventListener('touchstart', function(e){
					if(e.touches.length == 1) {
						touch_coords = e.touches[0].pageX;
					}

					$slides_wrapper.get(0).addEventListener('touchmove', holdSwipe, false);
				}, false);
				$slides_wrapper.get(0).addEventListener('touchend', function(e){
					if(e.touches.length == 0) {
						touch_coords -= e.changedTouches[0].pageX;

						if(Math.abs(touch_coords) > 100) {
							if(touch_coords < 0)
								$prev_slide.click();
							else {
								$next_slide.click();
							}
						}
					}

					$slides_wrapper.get(0).removeEventListener('touchmove', holdSwipe);
				}, false);

				if(settings.uiStyle == 'style09') {
					$thumbs_container.get(0).addEventListener('touchstart', function(e){
						if(e.touches.length == 1) {
							touch_coords = e.touches[0].pageY;
						}

						$thumbs_container.get(0).addEventListener('touchmove', holdSwipe, false);
					}, false);
					$thumbs_container.get(0).addEventListener('touchend', function(e){
						if(e.touches.length == 0) {
							touch_coords -= e.changedTouches[0].pageY;

							if(Math.abs(touch_coords) > 100) {
								if(touch_coords < 0)
									$thumbs_up_button.click();
								else {
									$thumbs_down_button.click();
								}
							}
						}

						$thumbs_container.get(0).removeEventListener('touchmove', holdSwipe);
					}, false);
				}
			}
		}

		/* Setting controls opacity specified in settings. */
		function controlsOpacity() {
			if(settings.showControlsOnHover) {
				$controls.css({
					'opacity': settings.controlsOpacity,
					'filter': 'alpha(opacity=' + (settings.controlsOpacity * 100) + ')'
				});

				$slider.on('mouseenter', function() {
					$controls
						.stop(true)
						.animate({
							'opacity': 1
						});
				})
				$slider.on('mouseleave', function() {
					$controls.animate({
						'opacity': settings.controlsOpacity
					});
				})

				if(settings.uiStyle == 'style07') {
					$prev_slide.css({
						'opacity': settings.controlsOpacity,
						'filter': 'alpha(opacity=' + (settings.controlsOpacity * 100) + ')'
					});
					$next_slide.css({
						'opacity': settings.controlsOpacity,
						'filter': 'alpha(opacity=' + (settings.controlsOpacity * 100) + ')'
					});
				}
			}
			else {
				$controls.css({
					'opacity': settings.controlsOpacity,
					'filter': 'alpha(opacity=' + (settings.controlsOpacity * 100) + ')'
				});

				if(settings.uiStyle == 'style07') {
					$prev_slide.css({
						'opacity': settings.controlsOpacity,
						'filter': 'alpha(opacity=' + (settings.controlsOpacity * 100) + ')'
					});
					$next_slide.css({
						'opacity': settings.controlsOpacity,
						'filter': 'alpha(opacity=' + (settings.controlsOpacity * 100) + ')'
					});
				}
			}
		}

		/* Adding event listeners to bullets. */
		function thumbsBehavior() {
			if(settings.showBullets) {
				$thumbs.on('click', thumbClickHandler);

				if(settings.showBulletsTooltip) {
					$thumbs
						.on('mouseenter', initShowTooltip)
						.on('mouseleave', initHideTooltip);
				}

				if(settings.uiStyle == 'style09') {
					$thumbs_container
						.on('allImagesLoaded', function() {
							$thumbs_up_button.removeClass('active');
							$thumbs_down_button.addClass('active');
							
							var item_height = $thumbs.height() + 11;
							var max_items = Math.floor(($wrapper.height()) / item_height);

							if(max_items >= $thumbs.length) {
								$thumbs_up_button.hide();
								$thumbs_down_button.hide();
							}

							max_items = Math.max(Math.min($thumbs.length, max_items), 1);

							$thumbs_container
								.height(max_items * item_height + 0)
								.css('top', ($slider.height() - $thumbs_container.height()) / 2);

							if($thumbs_wrapper.height() > $thumbs_container.height()) {
								$thumbs_down_button.addClass('active');

								$thumbs_up_button.on('click', slideThumbs);
								$thumbs_down_button.on('click', slideThumbs);
							}
							else {
								$thumbs_down_button.removeClass('active');
							}
						})

					preloadAllImages($thumbs_container);
				}
			}
		}

		/* Updating displayed images in UI Style 09 */
		function updateThumbsItems() {
			var item_height = $thumbs.height() + 11;
			var max_items = Math.floor(($wrapper.height()) / item_height);

			if(max_items >= $thumbs.length) {
				$thumbs_up_button.hide();
				$thumbs_down_button.hide();
			}

			max_items = Math.max(Math.min($thumbs.length, max_items), 1);

			$thumbs_container
				.height(max_items * item_height + 0)
				.css('top', ($slider.height() - $thumbs_container.height()) / 2);

			slideThumbs($thumbs.index($thumbs.filter('.active')));
		}

		/* Preventing scroll on touch devices for gesture checking. */
		function holdSwipe(e) {
			e.preventDefault();
		}

		function prepareVideos() {
			$slides.find('iframe').each(function(id_index) {
				var $frame = $(this);

				if($frame.attr('src').indexOf('youtube') != -1) {
					var script = document.createElement('script');
					script.src = "//www.youtube.com/iframe_api";
					var scriptTag = document.getElementsByTagName('script')[0];
					scriptTag.parentNode.insertBefore(script, scriptTag);

					var url = $frame.attr('src'),
						 values = getQueryValues(url);

					values.enablejsapi = 1;
					values.playerapiid = 'youtube_player_' + id_index;
					
					url = setQueryValues(url, values);

					$frame.attr({
						'id': values.playerapiid,
						'src': url
					})

					$frame.addClass('youtube');
				}

				if($frame.attr('src').indexOf('vimeo') != -1) {
					var script = document.createElement('script');
					script.src = 'http://a.vimeocdn.com/js/froogaloop2.min.js';
					var scriptTag = document.getElementsByTagName('script')[0];
					scriptTag.parentNode.insertBefore(script, scriptTag);

					var url = $frame.attr('src'),
						 values = getQueryValues(url);

					values.api = 1;
					values.player_id = 'vimeo_player_' + id_index;

					url = setQueryValues(url, values);

					$frame.attr({
						'id': values.player_id,
						'src': url
					})

					$frame.addClass('vimeo');
				}
			})
		}

		/* Adding events for Youtube player state change. */
		function youtubePlayerStateChange(e) {
			if(e.data == YT.PlayerState.PLAYING) {
				if(settings.pauseOnHover) {
					$slides.off('mouseenter', pauseTimer);
					$slides.off('mouseleave', continueTimer);
				}

				if(settings.slideshow)
					pauseTimer();
			}
			else {
				if(settings.pauseOnHover) {
					$slides.on('mouseenter', pauseTimer);
					$slides.on('mouseleave', continueTimer);
				}

				if(mouse_out && settings.slideshow)
					continueTimer();
			}
		}

		/* Autoplaying Youtube player after it is loaded. */
		function youtubePlayerReady (player) {
			if(settings.autoPlayVideo)
				player.target.playVideo();
		}

		/* Adding events for Vimeo player state change. */
		function vimeoPlayerReady(id) {
			var player = v_players[id];

			player.addEvent('play', function() {
				if(settings.pauseOnHover) {
					$slides.off('mouseenter', pauseTimer);
					$slides.off('mouseleave', continueTimer);
				}

				if(settings.slideshow)
					pauseTimer();
			})
			player.addEvent('pause', function() {
				if(settings.pauseOnHover) {
					$slides.on('mouseenter', pauseTimer);
					$slides.on('mouseleave', continueTimer);
				}

				if(mouse_out && settings.slideshow)
					continueTimer();
			})
			player.addEvent('finish', function() {
				if(settings.pauseOnHover) {
					$slides.on('mouseenter', pauseTimer);
					$slides.on('mouseleave', continueTimer);
				}

				if(mouse_out && settings.slideshow)
					continueTimer();
			})

			if(settings.autoPlayVideo)
				player.api('play');
		}

		/* Getting all query variables from string. Used with players URLs. */
		function getQueryValues(query_string) {
			if(query_string.indexOf('?') == -1)
				return {}

			query_string = decodeURIComponent(query_string.substr(query_string.indexOf('?') + 1));
			var values_array = query_string.replace(/&amp;/g, '&').split('&'),
				 values = {};

			if(query_string == '')
				return {};

			for(var i = 0; i < values_array.length; i++) {
				var pair = values_array[i].split('=');

				if(pair.length == 2)
					values[pair[0]] = pair[1];
				else
					values[pair[0]] = undefined;
			}

			return values;
		}

		/* Setting all query variables in string. Used with players URLs. */
		function setQueryValues(url, values) {
			if(url.indexOf('?') == -1)
				url += '?';
			else
				url = decodeURIComponent(url.substr(0, url.indexOf('?') + 1));

			for(key in values) {
				url += key + (values[key] == undefined ? '' : '=' + values[key]) + '&';
			}

			url = url.substr(0, url.length - 1);
			
			return url;
		}

		/* Initialising preload of all images from slides. */
		function preloadImages() {
			$slides.each(function() {
				var $slide = $(this),
					 count = $slide.find('img').length;

				$slide
					.data('count', count)
					.find('img').each(function() {
						var $image = $(this)

						$image
							.data('slide', $slide)
							.load(imageLoaded);

						$image.attr('src', $image.attr('src'));
					})

				if($slide.data('count') == 0)
					slideReady($slide);
			})

			preload_timer = setTimeout(preloadTimeout, preload_time);
		}

		/* Updating image counter of slide after image is loaded. */
		function imageLoaded() {
			var $image = $(this),
				 $slide = $image.data('slide');

			if(!$image.data('defW'))
				$image.data({
					'defW': $image.width(),
					'defH': $image.height()
				})

			$slide.data('count', $slide.data('count') - 1);

			if($slide.data('count') == 0)
				slideReady($slide);
		}

		/* Setting ready state of slide after all images were loaded. */
		function slideReady($slide) {
			$slide
				.data('ready', true)
				.hide()
				.css('visibility', 'visible');

			$slides_list.data('toLoad', $slides_list.data('toLoad') - 1);

			if($slides.index($slide) == 0)
				$slides_list.trigger('initSlide');

			if($slides_list.data('toLoad') == 0)
				clearTimeout(preload_timer);
		}

		/* Forcing ready state of every slide after 5sec. */
		function preloadTimeout() {
			$slides.each(function() {
				slideReady($(this));
			})
		}

		/* Saving default CSS calues of every item in slide. */
		function saveDefaults() {
			$slides.each(function() {
				var $slide = $(this);

				$slide.find('*').not('.mpc_ls_slide_item').each(function() {
					var $this = $(this);

					$this.data({
						'padding-left': parseFloat($this.css('padding-left')),
						'padding-right': parseFloat($this.css('padding-right')),
						'padding-top': parseFloat($this.css('padding-top')),
						'padding-bottom': parseFloat($this.css('padding-bottom')),
						'margin-left': parseFloat($this.css('margin-left')),
						'margin-right': parseFloat($this.css('margin-right')),
						'margin-top': parseFloat($this.css('margin-top')),
						'margin-bottom': parseFloat($this.css('margin-bottom')),
						'border-width': parseFloat($this.css('border-width')),
						'outline-width': parseFloat($this.css('outline-width')),
						'line-height': parseFloat($this.css('line-height')),
						'font-size': parseFloat($this.css('font-size')),
						'defW': parseFloat($this.css('width')),
						'defH': parseFloat($this.css('height'))
					})

					if($this.is('iframe'))
						$this.data({
							'defW': $this.attr('width'),
							'defH': $this.attr('height')
						})
				})
			})
		}

		/* Initialising show tooltip. */
		function initShowTooltip() {
			var self = this;

			tooltip_timer = setTimeout(function() {
				showTooltip(self);
			}, 200);
		}

		/* Initialising hide tooltip. */
		function initHideTooltip() {
			clearTimeout(tooltip_timer);

			hideTooltip();
		}

		/* Showing bullets tooltip with image. */
		function showTooltip(thumb) {
			var $thumb = $(thumb);
			var $image = $thumbs_tooltip_images.eq($thumbs.index($thumb));

			$thumbs_tooltip.stop(true);

			if($thumbs_tooltip.css('opacity') != 0) {
				$thumbs_tooltip_images
					.stop(true)
					.animate({
						'opacity': 0
					}, 'fast');

				$image.animate({
					'opacity': 1
				}, 'fast');

				$thumbs_tooltip
					.css('visibility', 'visible')
					.stop(true)
					.animate({
						'left': $thumb.position().left + $thumb.children().position().left + $thumb.children().outerWidth() / 2 - $image.width() / 2 - 4 + parseInt($thumb.css('margin-left'), 10),
						'top': $thumb.position().top - $image.height() - Math.max($thumb.height(), $thumb.children().height()) / 2 - 8,
						'opacity': 1
					})

				$thumbs_tooltip_images_wrap
					.stop(true)
					.animate({
						'width': $image.width(),
						'height': $image.height()
					})
			}
			else {
				$thumbs_tooltip_images
					.stop(true)
					.css({
						'opacity': 0
					});

				$image.animate({
					'opacity': 1
				});

				$thumbs_tooltip
					.css({
						'left': $thumb.position().left + $thumb.children().position().left + $thumb.children().outerWidth() / 2 - $image.width() / 2 - 4 + parseInt($thumb.css('margin-left'), 10),
						'top': $thumb.position().top - $image.height() - Math.max($thumb.height(), $thumb.children().height()) / 2 - 8,
						'visibility': 'visible'
					})
					.animate({
						'opacity': 1
					})

				$thumbs_tooltip_images_wrap
					.css({
						'width': $image.width(),
						'height': $image.height()
					})
			}
		}

		/* Hiding bullets tooltip with image. */
		function hideTooltip() {
			$thumbs_tooltip
				.stop(true)
				.animate({
					'opacity': 0
				}, function() {
					$thumbs_tooltip.css('visibility', 'hidden');
				});

			$thumbs_tooltip_images
				.animate({
					'opacity': 0
				});
		}

		/* Scaling slider if window width is smaller then default width of slide. */
		function scaleSlider() {
			var slider_width = $slider_parent.width();

			scale_ratio = slider_width / settings.defaultWidth;
			side_offset = ($slider.width() - settings.defaultWidth * scale_ratio) / 2;

			$slides.each(function() {
				var $slide = $(this);

				$slide.children('.mpc_ls_slide_item').find('*').each(function() {
					var $this = $(this);

					$this.css({
						'padding-left': roundNumber($this.data('padding-left') * scale_ratio),
						'padding-right': roundNumber($this.data('padding-right') * scale_ratio),
						'padding-top': roundNumber($this.data('padding-top') * scale_ratio),
						'padding-bottom': roundNumber($this.data('padding-bottom') * scale_ratio),
						'margin-left': roundNumber($this.data('margin-left') * scale_ratio),
						'margin-right': roundNumber($this.data('margin-right') * scale_ratio),
						'margin-top': roundNumber($this.data('margin-top') * scale_ratio),
						'margin-bottom': roundNumber($this.data('margin-bottom') * scale_ratio),
						'border-width': roundNumber($this.data('border-width') * scale_ratio),
						'outline-width': roundNumber($this.data('outline-width') * scale_ratio),
						'line-height': roundNumber($this.data('line-height') * scale_ratio) + 'px',
						'font-size': roundNumber($this.data('font-size') * scale_ratio),
						'width': roundNumber($this.data('defW') * scale_ratio),
						'height': roundNumber($this.data('defH') * scale_ratio)
					})

					if($this.is('img'))
						$this.css({
							'width': $this.data('defW') * scale_ratio,
							'height': $this.data('defH') * scale_ratio
						})

					if($this.is('iframe'))
						$this.attr({
							'width': $this.data('defW') * scale_ratio,
							'height': $this.data('defH') * scale_ratio
						})
				})

				$slide.children('.mpc_ls_slide_item').each(function() {
					var $item = $(this);
					$item.css({
						'left': ($item.data('x') + side_offset) * scale_ratio,
						'top': $item.data('y') * scale_ratio
					})
				})
			})

			if(settings.uiStyle != 'style09')
				switch(settings.bulletsVerticalPosition) {
					case 'top':
						$thumbs_container.css({
							'top': settings.bulletsVerticalOffset
						})
						break;
					case 'center':
						$thumbs_container.css({
							'top': settings.defaultHeight * scale_ratio / 2 - 10 + settings.bulletsVerticalOffset
						})
						break;
					case 'bottom':
						$thumbs_container.css({
							'top': settings.defaultHeight * scale_ratio - $thumbs_container.height() + settings.bulletsVerticalOffset
						})
						break;
					default:
						$thumbs_container.css({
							'top': settings.defaultHeight * scale_ratio - $thumbs_container.height() + settings.bulletsVerticalOffset
						})
				}

			if(settings.uiStyle != 'style07') {
				$prev_slide.css('top', settings.defaultHeight * scale_ratio / 2);
				$next_slide.css('top', settings.defaultHeight * scale_ratio / 2);
			}

			$slider.height(settings.defaultHeight * scale_ratio);
			$slider.width(settings.defaultWidth * scale_ratio);

			adjustBackground($slides.eq(index));
			// console.log($controls);
			if(slider_width < 480)
				$controls
					.stop(true)
					.animate({
						'opacity': 0
					}, function() {
						$controls.css('visibility', 'hidden');
					});
			else
				if(settings.showArrows)
					if(!settings.showControlsOnHover)
						$controls
							.css('visibility', 'visible')
							.stop(true)
							.animate({
								'opacity': 1
							});
		}

		/* Restoring default slide scale if window width is higher then default width of slider. */
		function scaleToDefault() {
			scale_ratio = 1;
			side_offset = ($slider.width() - settings.defaultWidth) / 2;

			$slides.each(function() {
				var $slide = $(this);

				$slide.children('.mpc_ls_slide_item').find('*').each(function() {
					var $this = $(this);

					$this.css({
						'padding-left': $this.data('padding-left'),
						'padding-right': $this.data('padding-right'),
						'padding-top': $this.data('padding-top'),
						'padding-bottom': $this.data('padding-bottom'),
						'margin-left': $this.data('margin-left'),
						'margin-right': $this.data('margin-right'),
						'margin-top': $this.data('margin-top'),
						'margin-bottom': $this.data('margin-bottom'),
						'border-width': $this.data('border-width'),
						'outline-width': $this.data('outline-width'),
						'line-height': $this.data('line-height') + 'px',
						'font-size': $this.data('font-size'),
						'width': $this.data('defW'),
						'height': $this.data('defH')
					})

					if($this.is('img'))
						$this.css({
							'width': $this.data('defW'),
							'height': $this.data('defH')
						})

					if($this.is('iframe'))
						$this.attr({
							'width': $this.data('defW') * scale_ratio,
							'height': $this.data('defH') * scale_ratio
						})
				})

				$slide.children('.mpc_ls_slide_item').each(function() {
					var $item = $(this);
					$item.css({
						'left': ($item.data('x') + side_offset),
						'top': $item.data('y')
					})
				})
			})

			if(settings.uiStyle != 'style09')
				switch(settings.bulletsVerticalPosition) {
					case 'top':
						$thumbs_container.css({
							'top': settings.bulletsVerticalOffset
						})
						break;
					case 'center':
						$thumbs_container.css({
							'top': settings.defaultHeight * scale_ratio / 2 - 10 + settings.bulletsVerticalOffset
						})
						break;
					case 'bottom':
						$thumbs_container.css({
							'top': settings.defaultHeight * scale_ratio - $thumbs_container.height() + settings.bulletsVerticalOffset
						})
						break;
					default:
						$thumbs_container.css({
							'top': settings.defaultHeight * scale_ratio - $thumbs_container.height() + settings.bulletsVerticalOffset
						})
				}

			if(settings.uiStyle != 'style07') {
				$prev_slide.css('top', settings.defaultHeight * scale_ratio / 2);
				$next_slide.css('top', settings.defaultHeight * scale_ratio / 2);
			}

			$slider.height(settings.defaultHeight);
			$slider.width('');

			adjustBackground($slides.eq(index));

			if(settings.showArrows)
				if(!settings.showControlsOnHover)
					$controls
						.css('visibility', 'visible')
						.stop(true)
						.animate({
							'opacity': 1
						});
		}

		/* Checking which bullet was clicked. */
		function thumbClickHandler(e) {
			var thumb_index = $thumbs.index($(this));

			if(thumb_index != index)
				changeSlide(thumb_index);

			if(settings.uiStyle != 'style09')
				initHideTooltip();
		}

		/* Initialising bullets layout creation. */
		function initThumbs() {
			switch(settings.uiStyle) {
				case 'style01':
					squareThumbs();
					break;
				case 'style02':
				case 'style03':
				case 'style04':
				case 'style05':
					bulletThumbs();
					break;
				case 'style06':
					circleThumbs();
					break;
				case 'style07':
					blockThumbs();
					swapArrows();
					break;
				case 'style08':
					bulletThumbs();
					$slides_list.addClass('frame');
					$slides_wrapper.addClass('frame');

					addWrapperCorners();
					break;
				case 'style09':
					imageThumbs();
					break;
			}

			if(settings.uiStyle == 'style09')
				$controls = $controls.add($thumbs_container);
			else {
				$controls = $controls.add($thumbs);
			}

			thumbsBehavior();
			controlsOpacity();
		}

		/* Creating bullets layout used in UI styles 02,03,04,08. */
		function bulletThumbs() {
			var thumbs_markup = '';

			for(var i = 0; i < $slides.length; i++) {
				thumbs_markup += '<a href="#" class="mpc_ls_thumb"><span class="mpc_ls_thumb_inside"></span></a>'
			}
			
			$thumbs_container
				.addClass(settings.uiStyle)
				.append(thumbs_markup)
				.height($thumbs_container.children().height());

			$thumbs = $thumbs_container.children();
			$thumbs.eq(index).addClass('active');

			if(settings.showBulletsTooltip)
				addTooltip();

			positionThumbs();
		}

		/* Creating bullets layout used in UI styles 01. */
		function squareThumbs() {
			var thumbs_markup = '';

			for(var i = 0; i < $slides.length; i++) {
				thumbs_markup += '<a href="#" class="mpc_ls_thumb"><span class="mpc_ls_thumb_inside"></span></a>'
			}
			
			$thumbs_container
				.addClass(settings.uiStyle)
				.append(thumbs_markup)
				.height($thumbs_container.children().outerHeight());

			$thumbs = $thumbs_container.children();
			$thumbs.eq(index).addClass('active');

			if(settings.showBulletsTooltip)
				addTooltip();

			addSlideshowControl();

			positionThumbs();
		}

		/* Creating bullets layout used in UI styles 06. */
		function circleThumbs() {
			var thumbs_markup = '';

			for(var i = 0; i < $slides.length; i++) {
				thumbs_markup += '<a href="#" class="mpc_ls_thumb"><span class="mpc_ls_thumb_inside">' + (i + 1) + '</span></a>'
			}
			
			$thumbs_container
				.addClass(settings.uiStyle)
				.append(thumbs_markup)
				.height($thumbs_container.children().height());

			$thumbs = $thumbs_container.children();
			$thumbs
				.width(roundNumber(100 / $thumbs.length, 1) + '%')
				.eq(index)
					.width(19)
					.addClass('active highlight');

			if(settings.showBulletsTooltip)
				addTooltip();

			positionThumbs();
		}

		/* Creating bullets layout used in UI styles 07. */
		function blockThumbs() {
			var thumbs_markup = '';

			for(var i = 0; i < $slides.length; i++) {
				thumbs_markup += '<a href="#" class="mpc_ls_thumb"><span class="mpc_ls_thumb_inside"></span></a>'
			}
			
			$thumbs_container
				.addClass(settings.uiStyle)
				.append(thumbs_markup)
				.height($thumbs_container.children().height());

			$thumbs = $thumbs_container.children();
			$thumbs
				.eq(index)
					.addClass('active')
					.end()
				.first()
					.addClass('left')
					.end()
				.last()
					.addClass('right');

			if(settings.showBulletsTooltip)
				addTooltip();

			positionThumbs();
		}

		/* Adding corners image used in UI style 07. */
		function addWrapperCorners() {
			var cornersMarkup = '<div class="tl corner"></div><div class="tr corner"></div><div class="bl corner"></div><div class="br corner"></div>';
			$slides_wrapper.append(cornersMarkup);
		}

		/* Swapping arrows location in UI style 08. */
		function swapArrows() {
			$next_slide.appendTo($thumbs_container);
			$prev_slide.prependTo($thumbs_container);
		}

		/* Adding tooltip. */
		function addTooltip() {
			$thumbs_tooltip = $('<div class="mpc_ls_thumbs_tooltip"></div>');
			$thumbs_tooltip_images_wrap = $('<div class="mpc_ls_thumbs_tooltip_wrap"></div>');

			var thumbs_tooltip_markup = '';

			for(var j = 0; j < $slides.length; j++) {
				thumbs_tooltip_markup += '<img src="' + $slides.eq(j).data('thumbnail') + '">'
			}

			$thumbs_tooltip_images_wrap.append(thumbs_tooltip_markup);

			$thumbs_tooltip
				.append($thumbs_tooltip_images_wrap)
				.appendTo($thumbs_container);

			$thumbs_tooltip_images = $thumbs_tooltip_images_wrap.children();

			$thumbs_tooltip_images.each(function() {
				var $image = $(this);

				$image.load(function() {
					$image.css({
						'width': $image.width(),
						'height': $image.height()
					})
				})
			})

			switch(settings.uiStyle) {
				case 'style02':
					$thumbs_tooltip.addClass('dark');
					break;
				case 'style04':
				case 'style07':
					$thumbs_tooltip.addClass('round dark');
					break;
				case 'style05':
				case 'style06':
				case 'style08':
					$thumbs_tooltip.addClass('round');
					break;
			}
		}

		/* Adding slideshow controls used in UI style 01. */
		function addSlideshowControl() {
			$slideshowControl = $('<a href="#" class="mpc_ls_slideshow_toggle"></a>');

			$slideshowControl.prependTo($thumbs_container);

			if(!settings.slideshow)
				$slideshowControl.removeClass('off');
			else
				$slideshowControl.addClass('off');

			$slideshowControl.on('click', function() {
				if(settings.slideshow) {
					$slideshowControl.removeClass('off');

					stopTimer();
				}
				else {
					$slideshowControl.addClass('off');
					
					startTimer();
				}

				settings.slideshow = !settings.slideshow;
			});
		}

		/* Positioning bullets on slider. */
		function positionThumbs() {
			switch(settings.bulletsVerticalPosition) {
				case 'top':
					$thumbs_container.css({
						'top': settings.bulletsVerticalOffset
					})
					break;
				case 'center':
					$thumbs_container.css({
						'top': settings.defaultHeight * scale_ratio / 2 - 10 + settings.bulletsVerticalOffset
					})
					break;
				case 'bottom':
					$thumbs_container.css({
						'top': settings.defaultHeight * scale_ratio - $thumbs_container.height() + settings.bulletsVerticalOffset
					})
					break;
				default:
					$thumbs_container.css({
						'top': settings.defaultHeight * scale_ratio - $thumbs_container.height() + settings.bulletsVerticalOffset
					})
			}

			switch(settings.bulletsHorizontalPosition) {
				case 'left':
					$thumbs_container.css({
						'left': settings.bulletsHorizontalOffset,
						'right': '',
						'text-align': 'left'
					})
					break;
				case 'center':
					$thumbs_container.css({
						'left': settings.bulletsHorizontalOffset,
						'right': '',
						'text-align': 'center'
					})
					break;
				case 'right':
					$thumbs_container.css({
						'left': '',
						'right': settings.bulletsHorizontalOffset,
						'text-align': 'right'
					})
					break;
				default:
					$thumbs_container.css({
						'left': settings.bulletsHorizontalOffset,
						'right': settings.bulletsHorizontalOffset,
						'text-align': 'center'
					})
			}
		}

		/* Creating bullets layout used in UI styles 09. */
		function imageThumbs() {
			var thumbs_markup = '';

			for(var i = 0; i < $slides.length; i++) {
				thumbs_markup += '<a href="#" class="mpc_ls_image_thumb"><img src="' + $slides.eq(i).data('thumbnail') + '"></a>'
			}

			$thumbs_wrapper = $('<div class="mpc_ls_image_thumbs_wrap"></div>');
			$thumbs_wrapper
				.append(thumbs_markup)
				.data('top_item', 0);

			$thumbs_mask = $('<div class="mpc_ls_image_thumbs_mask"></div>');
			$thumbs_mask.append($thumbs_wrapper);

			$thumbs_up_button = $('<a href="#" class="mpc_ls_slides_thumbs_button mpc_ls_slides_thumbs_button_up"></a>');
			$thumbs_up_button.data('dir', 'prev');
			$thumbs_down_button = $('<a href="#" class="mpc_ls_slides_thumbs_button mpc_ls_slides_thumbs_button_down"></a>');
			$thumbs_down_button.data('dir', 'next');

			$thumbs_container
				.addClass('style09')
				.append($thumbs_mask, $thumbs_up_button, $thumbs_down_button);

			$thumbs = $thumbs_wrapper.children();
			$thumbs.on('updateList', updateThumbsList);
			$thumbs.eq(index).addClass('active');
		}

		/* Sliding iamge bullets in UI style 09. */
		function slideThumbs(item_index) {
			item_index = typeof item_index !== 'undefined' ? item_index : 0;

			$thumbs_up_button.off('click', slideThumbs);
			$thumbs_down_button.off('click', slideThumbs);

			setTimeout(function() {
				$thumbs_up_button.on('click', slideThumbs);
				$thumbs_down_button.on('click', slideThumbs);
			}, 600)

			var $button = $(this);
			var dir = '';
			
			if($button.is('.mpc_ls_slides_thumbs_button'))
				dir = $button.data('dir');

			var item_height = $thumbs_wrapper.height() / $thumbs_wrapper.children().length;
			var visible_items = Math.floor($thumbs_container.height() / item_height);
			var top_item = $thumbs_wrapper.data('top_item');
			var all_items = $thumbs.length;
			var next_items = all_items - visible_items - top_item;
			var prev_items = top_item;

			if(dir && dir == 'prev') {
				if(prev_items > visible_items) {
					$thumbs_wrapper
						.css({
							'top': - $thumbs.eq(top_item - visible_items).position().top
						})
						.data('top_item', top_item - visible_items);

					$thumbs_down_button.addClass('active');
				}
				else if(prev_items > 0) {
					$thumbs_wrapper
						.css({
							'top': - $thumbs.eq(top_item - prev_items).position().top
						})
						.data('top_item', top_item - prev_items);

					$thumbs_up_button.removeClass('active');
					$thumbs_down_button.addClass('active');
				}
			}
			else if(dir && dir == 'next') {
				if(next_items > visible_items) {
					$thumbs_wrapper
						.css({
							'top': - $thumbs.eq(top_item + visible_items).position().top
						})
						.data('top_item', top_item + visible_items);

					$thumbs_up_button.addClass('active');
				}
				else if(next_items > 0) {
					$thumbs_wrapper
						.css({
							'top': - $thumbs.eq(top_item + next_items).position().top
						})
						.data('top_item', top_item + next_items);

					$thumbs_up_button.addClass('active');
					$thumbs_down_button.removeClass('active');
				}
			}
			else {
				if(top_item >= item_index) {
					$thumbs_wrapper
						.css({
							'top': - $thumbs.eq(item_index).position().top
						})
						.data('top_item', item_index);

					$thumbs_down_button.addClass('active');
					if($thumbs_container.data('mouse_over'))

					if(item_index == 0) {
						$thumbs_up_button.removeClass('active');
					}
				}
				else {
					var past_index_items = all_items - item_index;

					if(past_index_items > visible_items) {
						$thumbs_wrapper
							.css({
								'top': - $thumbs.eq(item_index).position().top
							})
							.data('top_item', item_index);

						$thumbs_up_button.addClass('active');
						$thumbs_down_button.addClass('active');
					}
					else {
						$thumbs_wrapper
							.css({
								'top': - $thumbs.eq(all_items - visible_items).position().top
							})
							.data('top_item', all_items - visible_items);

						$thumbs_up_button.addClass('active');
						$thumbs_down_button.removeClass('active');
					}
				}
			}
		}

		/* Updating bullets in UI style 09 so actual slide is visible. */
		function updateThumbsList() {
			var $current = $(this);
			var cur_index = $thumbs.index($current);
			var item_height = $thumbs_wrapper.height() / $thumbs_wrapper.children().length;
			var visible_items = Math.floor($thumbs_container.height() / item_height);
			var top_item = $thumbs_wrapper.data('top_item');
			var all_items = $thumbs.length;

			if(cur_index < top_item || cur_index > top_item + visible_items - 1) {
				slideThumbs(cur_index);
			}
		}

		/* Checking which arrow was clicked. */
		function slideButtonHandler(e) {
			changeSlide(e.data);
		}

		/* Changing current slide to new one. */
		function changeSlide(new_index) {
			var $current_slide,
				 $new_slide;

			$current_slide = $slides.eq(index);

			if(new_index < 0)
				new_index = slides_count;
			if(new_index > slides_count)
				new_index = 0;

			index = new_index;

			$new_slide = $slides.eq(index);

			initTransition($current_slide, $new_slide);

			$timer
				.stop(true)
				.width(0);

			if(mouse_out && settings.slideshow)
				timerLoop();

			if(settings.showBullets) {
				$thumbs
					.removeClass('active')
					.addClass('highlight')
					.eq(index)
						.addClass('active')
						.trigger('updateList')
						.nextAll()
							.removeClass('highlight');
			}

			$current_slide.find('iframe').each(function() {
				var $frame = $(this);

				if($frame.is('.youtube')) {
					var player = yt_players[$frame.attr('id')];

					player.pauseVideo();
				}
				if($frame.is('.vimeo')) {
					var player = $f($frame[0]);

					player.api('pause');
				}
			})
			$new_slide.find('iframe').each(function() {
				var $frame = $(this);

				if($frame.is(':not(.listenersAdded)')) {
					if($frame.is('.youtube')) {
						var player = new YT.Player($frame.attr('id'), {
							events: {
								'onStateChange': youtubePlayerStateChange,
								'onReady': youtubePlayerReady
							}
						});

						yt_players[$frame.attr('id')] = player;

						$frame.addClass('listenersAdded');
					}
					if($frame.is('.vimeo')) {
						var player = $f($frame[0]);
						v_players[$frame.attr('id')] = player;

						player.addEvent('ready', vimeoPlayerReady);

						$frame.addClass('listenersAdded');
					}
				}
				else {
					if($frame.is('.youtube')) {
						var player = yt_players[$frame.attr('id')];

						if(settings.autoPlayVideo)
							player.playVideo();
					}
					if($frame.is('.vimeo')) {
						var player = v_players[$frame.attr('id')];
						
						if(settings.autoPlayVideo)
							player.api('play');
					}
				}
			})
		}

		/* Initialising slides transition. */
		function initTransition($current, $next) {
			var transition = $next.data('transition'),
				 easing = $next.data('easing');
				 time = settings.transitionTime;

			$prev_slide.off('click', slideButtonHandler);
			$next_slide.off('click', slideButtonHandler);
			if(settings.showBullets)
				$thumbs.off('click', thumbClickHandler);

			setTimeout(function() {
				$prev_slide.on('click', null, index - 1, slideButtonHandler);
				$next_slide.on('click', null, index + 1, slideButtonHandler);
				if(settings.showBullets)
					$thumbs.on('click', thumbClickHandler);
			}, time);

			switch(transition) {
				case 'slideTop':
					$next
						.css({
							'top': - $wrapper.height(),
							'left': 0,
							'opacity': 1,
							'visibility': 'visible'
						})
						.show()
						.animate({
							'top': 0
						}, time, easing);

					$current
						.animate({
							'top': $wrapper.height()
						}, time, easing, function() {
						    $current.css('visibility', 'hidden');
						});
					break;
				case 'slideBottom':
					$next
						.css({
							'top': $wrapper.height(),
							'left': 0,
							'opacity': 1,
							'visibility': 'visible'
						})
						.show()
						.animate({
							'top': 0
						}, time, easing);
						
					$current
						.animate({
							'top': - $wrapper.height()
						}, time, easing, function() {
						    $current.css('visibility', 'hidden');
						});
					break;
				case 'slideLeft':
					$next
						.css({
							'left': - $wrapper.width(),
							'top': 0,
							'opacity': 1,
							'visibility': 'visible'
						})
						.show()
						.animate({
							'left': 0
						}, time, easing);
						
					$current
						.animate({
							'left': $wrapper.width()
						}, time, easing, function() {
						    $current.css('visibility', 'hidden');
						});
					break;
				case 'slideRight':
					$next
						.css({
							'left': $wrapper.width(),
							'top': 0,
							'opacity': 1,
							'visibility': 'visible'
						})
						.show()
						.animate({
							'left': 0
						}, time, easing);
						
					$current
						.animate({
							'left': - $wrapper.width()
						}, time, easing, function() {
						    $current.css('visibility', 'hidden');
						});
					break;
				case 'fadeIn':
					$next
						.hide()
						.css({
							'left': 0,
							'top': 0,
							'opacity': 0,
							'visibility': 'visible'
						})
						.fadeTo(time, 1);

					$current
						.css({
							'left': 0,
							'top': 0,
							'opacity': 1
						})
						.fadeTo(time, 0, function() {
							$current.css('visibility', 'hidden');
						});
					break;
			}

			adjustBackground($next);
			adjustBackground($next);
			animateSlide($next);

			if(settings.revertAnimation)
				reanimateSlide($current);
		}

		/* Animating slide items in reverse. Used with changing slides. */
		function reanimateSlide($slide) {
			var $item,
				 options;

			$slide.children().filter('.mpc_ls_slide_item').each(function() {
				$item = $(this);

				options = {
					x: 0,
					y: 0,
					alpha: 1
				}

				switch($item.data('effect')) {
					case 'slideTop':
						options.x = ($item.data('x') + side_offset) * scale_ratio;
						options.y = - $item.height();
						break;
					case 'slideBottom':
						options.x = ($item.data('x') + side_offset) * scale_ratio;
						options.y = $wrapper.height() + $item.height();
						break;
					case 'slideLeft':
						options.x = - $item.width();
						options.y = $item.data('y') * scale_ratio;
						break;
					case 'slideRight':
						options.x = $wrapper.width() + $item.width();
						options.y = ($item.data('y')) * scale_ratio;
						break;
					case 'none':
						options.x = ($item.data('x') + side_offset) * scale_ratio;
						options.y = $item.data('y') * scale_ratio;
						break;
					default:

				}

				if($item.data('fade') == 'on')
					options.alpha = 0;

				clearTimeout($item.data('timer'));

				$item
					.stop(true)
					.animate({
						'left': options.x,
						'top': options.y,
					}, $item.data('duration'), $item.data('easing'))
					.animate({
						'opacity': options.alpha
					}, {
						duration: $item.data('duration'),
						queue: false
					})
			})
		}

		/* Initialising slide items animation. */
		function animateSlide($slide) {
			var $item,
				 options,
				 animationTime = 0;

			$slide.children().filter('.mpc_ls_slide_item').each(function() {
				$item = $(this);

				options = {
					x: 0,
					y: 0,
					scale: 1,
					alpha: 1
				}

				switch($item.data('effect')) {
					case 'slideTop':
						options.x = ($item.data('x') + side_offset) * scale_ratio;
						options.y = - $item.height() - 100;
						options.scale = 1;
						break;
					case 'slideBottom':
						options.x = ($item.data('x') + side_offset) * scale_ratio;
						options.y = $wrapper.height() + $item.height() + 100;
						options.scale = 1;
						break;
					case 'slideLeft':
						options.x = - $item.width() - 100;
						options.y = $item.data('y') * scale_ratio;
						options.scale = 1;
						break;
					case 'slideRight':
						options.x = $wrapper.width() + $item.width() + 100;
						options.y = $item.data('y') * scale_ratio;
						options.scale = 1;
						break;
					case 'grow':
						options.x = ($item.data('x') + side_offset) * scale_ratio;
						options.y = $item.data('y') * scale_ratio;
						options.scale = 0;
						break;
					case 'none':
						options.x = ($item.data('x') + side_offset) * scale_ratio;
						options.y = $item.data('y') * scale_ratio;
						options.scale = 1;
						break;
					default:

				}

				if($item.data('fade') == 'on')
					options.alpha = 0;

				clearTimeout($item.data('timer'));

				$item
					.stop(true)
					.css({
						'opacity': options.alpha,
						'left': options.x,
						'top': options.y,
						'transform': 'scale(' + options.scale + ')'
					})

				$item.data('timer', setTimeout($.proxy(animateItem, $item), $item.data('delay')));

				animationTime = Math.max($item.data('duration') + $item.data('delay'), animationTime);
			})

			clearTimeout($slide.data('animationTimer'));
			$slide.data('animationTime', animationTime);
			$slide.data('animationTimer', setTimeout($.proxy(animationFinished, $slide), animationTime));
		}

		/* Animating slide item. */
		function animateItem() {
			var $this = this;

			$this
				.stop(true)
				.animate({
					'left': ($this.data('x') + side_offset) * scale_ratio,
					'top': $this.data('y') * scale_ratio

				}, $this.data('duration'), $this.data('easing'));

			if($this.data('effect') == 'grow')
				$this.animate({
					'opacity': 1
				}, {
					duration: $this.data('duration'),
					queue: false,
					step: function(now, fx) {
						$(this).css({
							'transform': 'scale(' + now + ')'
						});
					}
				})
			else
				$this.animate({
					'opacity': 1
				}, {
					duration: $this.data('duration'),
					queue: false
				})
		}

		/* Setting finished state after all items on slide was animated. */
		function animationFinished(e) {
			$(this).data('animationFinished', true);
		}

		/* Reseting animation timer. */
		function resetAnimationTimer($slide) {
			clearTimeout($slide.data('animationTimer'));

			$slide.data('animationTimer', setTimeout($.proxy(animationFinished, $slide), $slide.data('animationTime')));
		}

		/* Scaling slide background to fit in slide after scaling. */
		function adjustBackground($slide) {
			var $background = $slide.find('.mpc_ls_slide_background');

			if($background.length) {
				var $image = $background.children('img');
				var height = $slider.height();
				var width = $slider.width();

				if(settings.uiStyle == 'style08') {
					height -= 20;
					width -= 20;
				}

				if($background.data('style') == 'scale') {
					if($image.length) {
						var ratio_w = width / $image.data('defW');
						var ratio_h = height / $image.data('defH');

						if(ratio_w > ratio_h)
							$image.css({
								'width': '100%',
								'height': '',
								'margin-top': (height - $image.height()) / 2,
								'margin-left': ''
							});
						else
							$image.css({
								'width': '',
								'height': '100%',
								'margin-left': (width - $image.width()) / 2,
								'margin-top': ''
							});
					}
				}
				else {
					if($image.length) {
						$image.addClass('bg_center');

						if($image.data('defH') > height)
							$image.css({
								'height': '100%',
								'margin-top': 0
							});
						else
							$image.css({
								'height': '',
								'margin-top': (height - $image.height()) / 2
							});

						$image.css({
							'margin-left': - $image.width() / 2
						});
					}
				}
			}
		}

		/* Initialising slideshow timer. */
		function timerLoop(delay) {
			delay = typeof delay !== 'undefined' ? delay : settings.delay;

			clearTimeout(timer);

			timer = setTimeout(function() {
			    changeSlide(index + 1);
			}, delay);

			$timer
				.animate({
					'width': '100%'
				}, delay, 'linear');
		}

		/* Changing state of slideshow timer. */
		function pauseTimer() {
			clearTimeout(timer);
			$timer.stop(true);
		}
		function stopTimer() {
			clearTimeout(timer);
			$timer.stop(true);

			$timer.width(0);

			if(settings.pauseOnHover) {
				$slides.off('mouseenter', pauseTimer);
				$slides.off('mouseleave', continueTimer);
			}
		}
		function startTimer() {
			timerLoop(settings.delay);

			if(settings.pauseOnHover) {
				$slides.on('mouseenter', pauseTimer);
				$slides.on('mouseleave', continueTimer);
			}
		}
		function continueTimer() {
			timerLoop(settings.delay * (1 - $timer.width() / $wrapper.width()));
		}

		/* Checking if mouse is over slider. */
		function setMouseOver(e) {
			if(e.type == 'mouseenter')
				mouse_out = false;
			else 
				mouse_out = true;
		}

		/* Rounding numbers to given decimal place. */
		function roundNumber(num, dec) {
			dec = typeof dec !== 'undefined' ? dec : 1;

			return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
		}

		/* Preloading all images of object. */
		function preloadAllImages($target) {
			var $images = $target.find('img');
			var count = $images.length;

			$images.each(function() {
				var $image = $(this);

				$image.load(function() {
					count--;

					if(count == 0)
						$target.trigger('allImagesLoaded');
				})

				$image.attr('src', $image.attr('src'));
			})
		}
	};

})(jQuery);