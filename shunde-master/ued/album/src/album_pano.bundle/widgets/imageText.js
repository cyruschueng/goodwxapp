require(function() {
	var View = com.appengine.view.View;
	var TranslateAnimation = com.appengine.animation.TranslateAnimation;
	var DecelerateInterpolator = com.appengine.animation.DecelerateInterpolator;
	var CustomScrollViewTranslateAnimation = TranslateAnimation.extend({
        init : function(){
            TranslateAnimation.prototype.init.apply(this,arguments);
        },
        animateFrame: function (view, progress) {
            if (this.fromTranslateY != null && this.toTranslateY != null) {
                var translateY = view.fixTextTY(this.fromTranslateY + (this.toTranslateY - this.fromTranslateY) * progress);
                if(view.$("scrollText").translateY + view.$("detail").translateY <= 0){
					view.$("titleLine").setVisible(true);
					view.$("scrollText").setTranslateY(0);					
					view.$("detail").setTranslateY(translateY);					
				} else {
					view.$("titleLine").setVisible(false);
					view.$("detail").setTranslateY(0);
					view.$("scrollText").setTranslateY(translateY);
				}
            }          
        }
    });

	View.extend("com.album.widgets.ImageText", {
		init: function () {
			View.prototype.init.apply(this, arguments);
			this.img;
			this.title;
			this.detail;
			this.frame.height;
			this.frame.width;
			this.scaleRate = 1;
			this.maxScale = 3;
			this.titleHeight = 30;
			this.initTextHight = 100;
			this.containerPadding = 20;

			var self = this;

			this.renderSubviews();
			this.pinchGestureDetector = new com.appengine.gesture.PinchGestureDetector();
			this.pinchGestureDetector.callback = function (scale, reset, event) {
				if (!self.isImgArea(event.getY()) && self.$("scrollText").visible) {
					return;
				}
				if (reset) {
					if (!self.$("img")) {
						return;
					}
					self.initTouchCenterX = event.getX();
					self.initTouchCenterY = event.getY();
					self.initImageTranslateX = self.$("img").translateX;
					self.initImageTranslateY = self.$("img").translateY;
					self.initScaleRate = self.scaleRate;
				} else {
					if (!self.$("img")) {
						return;
					}

					var imageScale = self.initScaleRate * scale;
					var imgW = self.frame.width * self.$("img").scaleX;
					var imgH = self.frame.height * self.$("img").scaleY;
					var imgAX = self.$("img").anchorX;
					var imgAY = self.$("img").anchorY;
					var imgTX = self.$("img").translateX;
					var imgTY = self.$("img").translateY;

					if (imageScale < 1) {
						imageScale = 1;
					}

					if (imageScale > self.maxScale) {
						imageScale = self.maxScale;
					}

					if (imgTX < (self.frame.width - imgW) * (1 - imgAX) || imgTY < (self.frame.height - imgH) * (1 - imgAY)) {
						self.$("img").setAnchorX(0);
						self.$("img").setAnchorY(0);
					} else {
						self.$("img").setAnchorX((self.initTouchCenterX / self.frame.width).toFixed(2));
						self.$("img").setAnchorY((self.initTouchCenterY / self.frame.height).toFixed(2));
					}
					self.$("img").setScaleX(imageScale);
					self.$("img").setScaleY(imageScale);
					self.scaleRate = imageScale;
				}
			};
			this.panGestureDetector = new com.appengine.gesture.PanGestureDetector();
			this.panGestureDetector.callback = function (translateX, translateY, event) {
				var curX = this.initX + translateX;
				var curY = this.initY + translateY;
				if (self.isImgArea(event.getY()) || !self.$("scrollText").visible) {
					if (!self.$("img")) {
						return;
					}
					if (event.state == 0) {
						this.initX = self.$("img").translateX;
						this.initY = self.$("img").translateY;
					} else if (event.state == 1) {
						curX = self.fixImgTX(curX);
						curY = self.fixImgTY(curY);
						self.$("img").setTranslateX(curX);
						self.$("img").setTranslateY(curY);
					}
				} else {
					if (!self.$("scrollText")) {
						return;
					}

					var transView;

					if(self.$("scrollText").translateY + self.$("detail").translateY <= 0){
						self.$("titleLine").setVisible(true);
						self.$("scrollText").setTranslateY(0);
						transView = self.$("detail");					
					} else {
						self.$("titleLine").setVisible(false);
						self.$("detail").setTranslateY(0);
						transView = self.$("scrollText");
					}
						
					if (event.state == 0) {
						if(self.$("scrollText").translateY < 0){
							self.$("scrollText").setTranslateY(0);
						}						
						transView.startAnimation(null, false);
						this.initY = transView.translateY;
					} else if (event.state == 1) {					
						curY = self.fixTextTY(curY);
						transView.setTranslateY(curY);
						if(self.$("scrollText").translateY < 0){
							self.$("scrollText").setTranslateY(0);
						}						
					}
				}
			};
			this.sweepGestureDetector = new com.appengine.gesture.SweepGestureDetector();
            this.sweepGestureDetector.callback = function(vX, vY, event){
            	if (self.isImgArea(event.getY()) || !self.$("scrollText").visible) {
            		return;
            	}
            	self.fly(vX, vY);
            };
            this.$("gstArea").gestureDetectors.push(this.pinchGestureDetector);
			this.$("gstArea").gestureDetectors.push(this.panGestureDetector);
			this.$("gstArea").gestureDetectors.push(this.sweepGestureDetector);
		},
		isImgArea: function (tuochY) {
			if (tuochY < this.$("scrollText").translateY + this.$("detail").translateY + this.containerPadding) {
				return 1;
			} else {
				return 0;
			}
		},		
		setTextInitPos: function () {
			var initTY = this.frame.height - 2 * this.containerPadding - this.initTextHight;
			this.$("scrollText").setTranslateY(initTY + "dp");
			this.$("detail").setTranslateY(0);		
		},
		fixImgTX: function (curX) {
			var minX = -(this.frame.width * this.$("img").scaleX - this.frame.width) * (1 - this.$("img").anchorX);
			var maxX = (this.frame.width * this.$("img").scaleX - this.frame.width) * this.$("img").anchorX;
			if (curX < minX) {
				curX = minX;
			}
			if (curX > maxX) {
				curX = maxX;
			}
			return curX;
		},
		fixImgTY: function (curY) {
			var minY = -(this.frame.height * this.$("img").scaleY - this.frame.height) * (1 - this.$("img").anchorY);
			var maxY = (this.frame.height * this.$("img").scaleY - this.frame.height) * this.$("img").anchorY;
			if (curY < minY) {
				curY = minY;
			}
			if (curY > maxY) {
				curY = maxY;
			}
			return curY;
		},
		getMinTranslateY: function () {
			var minY;
			if (this.frame.height - 2 * this.containerPadding - this.titleHeight > this.$("scrollText").height) {
				minY = -(titleHeight);
			} else {
				minY = -(this.$("scrollText").frame.height - this.frame.height + 2 * this.containerPadding + 2 * this.titleHeight);
			}
			return minY;
		},
		getMaxTranslateY: function () {
			return this.frame.height - 2 * this.containerPadding - this.initTextHight;
		},
		fixTextTY: function (curY) {
			if (curY < this.getMinTranslateY()) {
				curY = this.getMinTranslateY();
			}
			if (curY > this.getMaxTranslateY()) {
				curY = this.getMaxTranslateY();
			}
			return curY;
		},		
		fly: function (vx, vy) {
            var self = this;

            var a = 0.001;
            var t = Math.abs(vy) / a;
            var s = 0.5 * a * t * t * (vy > 0 ? 1 : -1);
            var toTranslateY;
          
            var trans = new CustomScrollViewTranslateAnimation();
            trans.timeInterplator = new DecelerateInterpolator(2);
            if(self.$("scrollText").translateY + self.$("detail").translateY <= 0){
            	toTranslateY = self.$("detail").translateY + s;
            	trans.fromTranslateY = self.$("detail").translateY;
            } else {
            	toTranslateY = self.$("scrollText").translateY + s;
            	trans.fromTranslateY = self.$("scrollText").translateY;
            }
            trans.toTranslateY = toTranslateY;
            trans.duration = t;
            self.startAnimation(trans);
        },
		whenRender: function () {			
			this.$("img").setSrc(this.img);
			this.$("title").setText(this.title);
			this.$("detail").setText(this.detail);
			this.$("titleLine").setVisible(false);
			this.$("scrollText").setVisible(true);
			this.setTextInitPos();		
		},
		renderSubviews: function () {
			var subviews = View.parse({
					children:[
						{
							type: "ImageView",
							id: "img"
						},
						{
							id: "scrollText",
							layout: "vertical",
							padding: "20dp",
							height: "wrap",
							children: [
								{
									id: "titleBar",
									height: "30dp",
									marginBottom: "15dp",
									children: [
										{
											type: "TextView",
											id: "title",											
											height: "30dp",
											fontColor: "#ffffff",
											fontSize: "20dp",
											contentGravity: "left|center"
										},
										{
											id: "titleLine",
											visible: "false",
											height: "1dp",
											background: "#ffffff",
											alpha: "0.2",
											gravity: "bottom"
										}
									]
								},
								{
									clipToBounds: "true",
									height: "wrap",
									children: [
										{
											type: "TextView",
											id: "detail",											
											lineSpace: "5dp",
											height: "wrap",
											fontColor: "#ffffff",
											fontSize: "14dp"
										}
									]
								}
							]
						},
						{
							id: "gstArea"
						}
					]
				});
			this.addView(subviews);
		}
	});
});