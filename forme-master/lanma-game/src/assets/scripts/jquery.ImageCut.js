
(function($){
	$.fn.imageCut = function(options){
		var nh,nw,ny,dh,dw,dy

		// 初始化自定义参数
		var v = {
				w:300,                    // 导出图片的宽度
				h:300,                    // 导出图片的高度
				r:150,                    // 半径
				url:'',                   // 用户上传图片链接
				mask:'',                  // 开发上传的背景头像形状图
				sureDom:'',               // 点击完成的dom
				initialScale:1,           // 缩放比例
				callback:function(base64Data){}
			},
			o = $.extend(v,options);
		o.r = o.w/2;

		//获取遮罩层的宽高度
		var _maskimage_ = new Image();
		_maskimage_.src = o.mask;

		_maskimage_.onload = function(){
			o.w = _maskimage_.width;
			o.h = _maskimage_.height;
			o.r = o.w/2;
		};

		$(this).html('');
		var box = $(this),
			first = true,
		img;

		//全局变量
		var x = 0,y = 0,scale = v.initialScale,gx = 0,gy = 0,p_left = 0,p_top = 0,
			gw,gh,ngw,ngh;

		// 位置移动坐标界限
		var pos = new Object();

		//获取图片信息
		var image = new Image();
		image.src = 'http://activity-codoon.b0.upaiyun.com/html5canvass/upload/select.png';    // 默认提示
		image.onload = function(){

			//添加盒子内元素
			if(box.html()!=''){
				first = false;
				gx = (o.w-o.r*2)*0.5;
				gy = (o.h-o.r*2)*0.5;
			}else{
				box.append('\
					<div id="cut-mask"><canvas id="canvas-mask"></canvas><canvas id="target" style="display:none;"></canvas></div>\
					<div id="cut-img"></div>\
				');


				img = document.getElementById('cut-img');
				var cutMask = document.getElementById('cut-mask');

				//遮罩层
				cutMask.style.width =  o.w+'px';
				cutMask.style.height =  o.h+'px';
				cutMask.style.position = 'relative';
				cutMask.style.top = '0px';
				cutMask.style.left = '0px';
				cutMask.style.zIndex = 10;

				//图片
				img.style.width =  o.w+'px';
				img.style.height =  o.h+'px';
				img.style.position = 'relative';
				img.style.top = (+(-o.h))+'px';
				img.style.left = '0px';
				img.style.backgroundImage = 'url('+image.src+')';
				img.style.backgroundSize = 'cover';

				//初始化设置遮罩图片
				var mask = document.getElementById('canvas-mask');
				var msk = mask.getContext('2d');
				mask.width = o.w;
				mask.height = o.h;

				//背景图片
				var _image_ = new Image();
				_image_.src = o.mask;

				_image_.onload = function(){
					msk.drawImage(_image_,0,0);
				};

				gw = image.width,
					gh = image.height,
					ngw = image.width,
					ngh = image.height,

					//矩形选框位置参数
					pos.l = (o.w-o.r*2)*0.5;
				pos.t = (o.h-o.r*2)*0.5;
				pos.r = (o.w-o.r*2)*0.5+o.r*2;
				pos.b = (o.h-o.r*2)*0.5+o.r*2;

				//element = document.getElementById(id);
				img.style.backgroundPosition = (o.w-o.r*2)*0.5+'px '+(o.h-o.r*2)*0.5+'px';
			}

			if(first){
				//触控移动
				touch.on(box,'touchstart',start);
				touch.on(box,'drag',move);
				touch.on(box,'dragend',end);
				//触控缩放
				touch.on(box,'pinchstart',startscale);
				touch.on(box,'pinch',movescale);
				touch.on(box,'pinchend',endscale);

				convertImgToBase64(o.url, function(base64Img){
					var source_img = new Image();
					source_img.src = base64Img;
					source_img.onload = function(){
						resetImg(source_img);
					}
				});

				//获取剪切过后的图片
				o.sureDom.click(function(){
					submitBase64();
				});

			}

			//转为base64
			function convertImgToBase64(url, callback, outputFormat){
				var canvas = document.createElement('CANVAS'),
					ctx = canvas.getContext('2d'),
					img = new Image;
				img.crossOrigin = 'Anonymous';
				img.onload = function(){
					canvas.height = img.height;
					canvas.width = img.width;
					ctx.drawImage(img,0,0);
					var dataURL = canvas.toDataURL(outputFormat || 'image/png');
					callback.call(this, dataURL);
					canvas = null;
				};
				img.src = url;
			}

			//重置图片
			function resetImg(source_img){
				if(source_img.naturalWidth<o.r*2 || source_img.naturalHeight<o.r*2){
					alert('图片尺寸太小，请重新选择不小于'+o.r*2+'*'+o.r*2+'像素大小的图片');
				}else{
					var quality = 1;
					var newImgData = compress(source_img,quality);

					var new_img = new Image();
					new_img.src = newImgData;
					new_img.onload = function(){
						if(new_img.width>o.r*2*2 && new_img.height>o.r*2*2){
							gw = ngw = new_img.width/2;
							gh = ngh = new_img.height/2;
						}else{
							gw = ngw = new_img.width;
							gh = ngh = new_img.height;
						}

						image.src = newImgData;

						img.style.backgroundImage = 'url('+newImgData+')';
						img.style.backgroundSize = ngw+'px '+ngh+'px';

					}
				}
			}

			//压缩图片
			var imageWidth,imageHeight;
			function compress(source_img,quality){

				var MaxW = 1200,MaxH = 1200;
				if(source_img.width>source_img.height){
					imageWidth=MaxW;
					imageHeight=Math.round(MaxH*(source_img.height/source_img.width));
				}else if(source_img.width<source_img.height){
					imageHeight=MaxH;
					imageWidth=Math.round(MaxW*(source_img.width/source_img.height));
				}else{
					imageWidth=MaxW;
					imageHeight=MaxH;
				}
				quality = imageWidth/source_img.width;

				var canvas=document.createElement('canvas');
				canvas.width=imageWidth;
				canvas.height=imageHeight;
				var con=canvas.getContext('2d');
				con.clearRect(0,0,canvas.width,canvas.height);
				con.drawImage(source_img,0,0,canvas.width,canvas.height);
				var base64=canvas.toDataURL('image/png',quality);
				return base64;
			}

			//触控移动
			function start(event){
				event.preventDefault();
			}
			function move(event){
				event.preventDefault();
				if(first){
					return;
				}

				//定位 防止超出选区
				p_left = gx+event.x;
				p_top = gy+event.y;
				if(p_left>pos.l){
					p_left = pos.l;
				}
				if(p_top>pos.t){
					p_top = pos.t;
				}
				if(p_left+ngw<pos.r){
					p_left = pos.r-ngw+1;
				}
				if(p_top+ngh<pos.b){
					p_top = pos.b-ngh+1;
				}

				img.style.backgroundPosition = p_left+'px '+p_top+'px';
				img.style.backgroundRepeat = 'no-repeat';

			}
			function end(event){
				gx = p_left;
				gy = p_top;
			}


			//触控缩放
			function startscale(event){
				event.preventDefault();
			}
			function movescale(event){
				event.preventDefault();
				if(first){
					return;
				}

				scale = event.scale;
				scale = scale>3?3:scale;
				scale = scale<0?0:scale;

				if(gw*scale>=o.r*2 && gh*scale>=o.r*2){
					ngw = gw*scale;
					ngh = gh*scale;

					//定位 防止超出选区
					p_left = gx*scale;
					p_top = gy*scale;
					p_left = p_left-(ngw-gw)/2;
					p_top = p_top-(ngh-gh)/2;

					if(p_left>pos.l){
						p_left = pos.l;
					}

					if(p_top>pos.t){
						p_top = pos.t;
					}
					//宽度小于选区
					if(p_left+ngw<pos.r){
						p_left = pos.r-ngw+1;
					}
					//高度小于选区
					if(p_top+ngh<pos.b){
						p_top = pos.b-ngh+1;
					}

					img.style.backgroundSize = ngw+'px '+ngh+'px';
					img.style.backgroundPosition = p_left+'px '+p_top+'px';
					img.style.backgroundRepeat = 'no-repeat';

				}
			}
			function endscale(event){
				var xy = img.style.backgroundSize;
				var arr = xy.split(' ');
				gx = parseInt(img.style.backgroundPositionX);
				gy = parseInt(img.style.backgroundPositionY);
				gw = parseInt(arr[0]);
				gh = parseInt(arr[1]);
			}

			//保存提交图片Base64数据
			function submitBase64(){

				if(first){
					alert('请先选择一张图片');
					return;
				}

				var canvas = $("<canvas />").attr({
					width: o.r*2,
					height: o.r*2
				}).get(0);

				var canvasContext = canvas.getContext("2d");
				canvasContext.fillStyle = "#eee";
				canvasContext.arc(canvas.width,canvas.height,canvas.width/2,0,(Math.PI/180)*360,false);//圆形选框

				var cx = (o.w*0.5-o.r-gx)*image.width/gw,
					cy = (o.h*0.5-o.r-gy)*image.height/gh,
					cw = o.r*2*image.width/gw,
					ch = o.r*2*image.height/gh;

				var nx = ny = nw = nh = 0;
				var dx = dy = dw = dh = 0;
				if(cx<0){
					nx = 0;
					if(cx+cw<image.width){
						nw = cx+cw;
					}else{
						nw = image.width;
					}
				}else{
					nx = cx;
					if(cx+cw<image.width){
						nw = cw;
					}else{
						nw = image.width-cx;
					}
				}

				if(cy<0){
					ny = 0;
					if(cy+ch<image.height){
						nh = cy+ch;
					}else{
						nh = image.height;
					}
				}else{
					ny = cy;
					if(cy+ch<image.height){
						nh = ch;
					}else{
						nh = image.height-cy;
					}
				}

				dx = (cx<0?-cx:0)*gw/image.width;
				dy = (cy<0?-cy:0)*gh/image.height;
				dw = (nw*gw/image.width<o.r*2?nw*gw/image.width:o.r*2);
				dh = (nh*gh/image.height<o.r*2?nh*gh/image.height:o.r*2);

				// 定位剪切的部分
				canvasContext.drawImage(
					image,
					nx,
					ny,
					nw,
					nh,
					dx,
					dy,
					dw,
					dh
				);

				var mask = new Image(), bg = new Image();
				var mDf = $.Deferred(), bgDf = $.Deferred();

				mask.src = o.mask;
				bg.src =  canvas.toDataURL();

				mask.addEventListener("load", function(){ mDf.resolve(this); });
				bg.addEventListener("load", function(){ bgDf.resolve(this); });

				var canvas1 = document.createElement("canvas"), ctx = canvas1.getContext('2d');
				var target = document.getElementById("target"), targetCtx = target.getContext('2d');

				target.width = o.w;
				target.height = o.h;

				$.when(mDf, bgDf).done(function(){
					var l = (bg.width / 2) - (mask.width / 2), t = (bg.height / 2) - (mask.height / 2);

					canvas1.width = bg.width;
					canvas1.height = bg.height;

					ctx.drawImage(mask,l, t);
					ctx.globalCompositeOperation = "source-out";
					ctx.drawImage(bg, 0, 0);

					var imageData = ctx.getImageData(l, t, mask.width, mask.height);
					targetCtx.putImageData(imageData, 0,0);

					var a = convertCanvasToImage(target);
					o.callback(a.src);
				});

			}

			function convertCanvasToImage(canvas) {

				var image = new Image();
				image.src = canvas.toDataURL("image/png");
				return image;
			}

		}
	}
})(jQuery);