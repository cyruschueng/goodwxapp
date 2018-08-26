(function() {
	! function($) {
		var t;
		return t = function() {
			function t(t) {
				var i, s, e, u, h, n;
				this.input = t, this.input.hide(), this.min = null != (i = this.input.attr("min")) ? i : 0, this.max = null != (s = this.input.attr("max")) ? s : 100, this.step = null != (e = this.input.attr("step")) ? e : 1, this.value = null != (u = this.input.attr("value")) ? u : (this.max - this.min) / 2 + this.min, this.decimals = null != (h = this.input.data("decimals")) ? h : 0, this.color = null != (n = this.input.data("color")) ? n : "#333", this.min = parseFloat(this.removeCommas(this.min)), this.max = parseFloat(this.removeCommas(this.max)), this.step = parseFloat(this.removeCommas(this.step)), this.value = parseFloat(this.removeCommas(this.value)), this.decimals = parseFloat(this.removeCommas(this.decimals)), this.slider = $("<div>").addClass("srs-slider").insertAfter(this.input), this.minus = $("<div><span>-</span></div>").addClass("srs-minus").appendTo(this.slider), this.plus = $("<div><span>+</span></div>").addClass("srs-plus").appendTo(this.slider), this.track = $("<div>").addClass("srs-track").appendTo(this.slider), this.thumb = $("<div><span>").addClass("srs-thumb").appendTo(this.track), this.bubble = $("<div><span>").addClass("srs-bubble").appendTo(this.thumb).hide(), this.minus.css("color", this.color), this.plus.css("color", this.color), this.thumb.css("background", this.color), this.dragging = !1, this.limit = 1e3, this.thumbOffset = this.thumb.outerWidth() / 2, this.thumbNumber = this.thumb.find("span").first(), this.bubbleNumber = this.bubble.find("span").first(), this.setValue(this.value), this.positionThumb(this.value), (this.value >= this.limit || this.decimals > 0) && this.toggleBubble(!0), this.thumb.on("mousedown touchstart", function(t) {
					return function(i) {
						return t.dragging ? void 0 : (i.preventDefault(), t.dragging = !0, t.value >= t.limit || t.decimals > 0 || t.toggleBubble(!0), t.dragThumb(i.pageX))
					}
				}(this)), $("html").on("mousemove touchmove", function(t) {
				
					return function(i) {
						var s;
						return t.dragging ? (i.preventDefault(), "touchmove" === i.type ? (s = i.originalEvent.touches[0], t.dragThumb(s.pageX)) : ($("html").css({
							cursor: "ew-resize"
						}), t.dragThumb(i.pageX))) : void 0
					}
				}(this)).on("mouseup touchend", function(t) {
					return function(i) {
						return t.dragging ? (i.preventDefault(), t.dragging = !1, t.value >= t.limit || t.decimals > 0 || t.toggleBubble(!1), $("html").css({
							cursor: "default"
						})) : void 0
							
					}
				}(this)), this.minus.on("click", function(t) {
					return function(i) {
						var s;
					
						return i.preventDefault(), s = t.value - t.step, s = Math.max(t.min, s), t.setValue(s), t.positionThumb(s), t.value >= t.limit || t.decimals > 0 ? t.toggleBubble(!0) : t.toggleBubble(!1)
					}
				}(this)), this.plus.on("click", function(t) {
					return function(i) {
						var s;
						
						return i.preventDefault(), s = t.value + t.step, s = Math.min(t.max, s), t.setValue(s), t.positionThumb(s), t.value >= t.limit || t.decimals > 0 ? t.toggleBubble(!0) : t.toggleBubble(!1)
					}
				}(this))
			}
			return t.prototype.toggleBubble = function(t) {
				return t ? (this.bubble.stop(!0, !0).fadeIn(200), this.thumbNumber.stop(!0, !0).fadeOut(200)) : (this.bubble.stop(!0, !0).fadeOut(200), this.thumbNumber.stop(!0, !0).fadeIn(200))
			}, t.prototype.dragThumb = function(t) {
				var i, s, e;
				return s = this.track.offset().left + this.thumbOffset, i = this.track.offset().left + this.track.outerWidth() - this.thumbOffset, e = Math.max(s, t), e = Math.min(i, e), this.setValue(this.calcValue()), this.thumb.offset({
					left: e - this.thumbOffset
				})
			}, t.prototype.normalize = function(t, i, s) {
				return(t - i) / (s - i)
			}, t.prototype.addCommas = function(t) {
				return t.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
			}, t.prototype.removeCommas = function(t) {
				return t.toString().replace(/,/g, "")
			}, t.prototype.calcValue = function() {
				var t;
				return t = this.normalize(this.thumb.position().left, 0, this.track.outerWidth() - 2 * this.thumbOffset), t * (this.max - this.min) + this.min
			}, t.prototype.setValue = function(t) {
				var i;
				return this.value = Math.round((t - this.min) / this.step) * this.step + this.min, this.input.val(this.value), i = this.addCommas(this.value.toFixed(this.decimals)), this.bubbleNumber.text(i), this.value >= this.limit || this.decimals > 0 ? this.thumbNumber.text("") : this.thumbNumber.text(i)
			}, t.prototype.positionThumb = function(t) {
				var i;
				return i = this.normalize(t, this.min, this.max), this.thumb.offset({
					left: Math.round(i * (this.track.outerWidth() - 2 * this.thumbOffset) + this.track.offset().left)
				})
			}, t
		}(), $.extend($.fn, {
			srs: function() {
				return new t($(this))
			}
		}), $(function() {
			return $(".srs").each(function() {
				
				return $(this).srs()
			})
		})
	}(this.jQuery)
}).call(this);