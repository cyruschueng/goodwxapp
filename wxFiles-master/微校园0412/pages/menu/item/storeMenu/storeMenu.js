var app = getApp()
let id;
var that;
Page({
	data: {
    jscss:'jiesuan2',
		margin: -200,
		dianming: '',
    phone:'',
		hidden: false,
		totalCount: 0,
		totalPrice: 0,
		totalCanhefei: 0,
		shop: {},
		//左侧打开默认选中第一个选项卡
		view: {
			Opacity: 1,
			Filter: 0,
			bgcolor: "#fff"
		},
		zongjiSymbolLeft: false,
		showCartGoods: false,
		blankHeight: "none",
		castListStyle: '',
		cartIconStyle: 0,
		curNavFood: [],
		//右侧打开默认选中
		curIndex: 0,
		//购物车
		cart: [],
		cartTotal: 0,
		selected: true,
		navList: [
		],
		curNav: 0,
		// dishesList:[
		// allFood :[],	
		foods: [
			{

			}

		],
		allfoods: []
	},

	onLoad: function (option) {
    wx.showLoading({
      title: '加载中',
    })
    app.getWindow(this);
		var id = option.id;
		// if (option.rt) {
		// 	wx.request({
    //     url: app.globalData.IP + "wx/shopdetail.do",
		// 		data: { 
    //       id: id ,
    //       userid: app.globalData.ID
    //     },
		// 		method: 'post',
		// 		success: function (res) {
    //       wx.hideLoading();
		// 			var time1 = res.data.time1;
		// 			var time2 = res.data.time2;
		// 			var time3 = res.data.time3;
		// 			var time4 = res.data.time4;
		// 			var time5 = res.data.time5;
		// 			var time6 = res.data.time6;
		// 			var print = '不在预定时间段内\t';
    //       console.log(time1 + ':' +time2+':'+time3+":"+time4)
		// 			print += time1 + "-" + time2 + ",";
		// 			if (time3 != time4)
		// 				print += time3 + "-" + time4 + ",";
		// 			if (time5 != time6)
		// 				print += time5 + "-" + time6 + "";
		// 			wx.showModal({
		// 				title: '提示',
		// 				content: print,
		// 				showCancel: false,
		// 				success: function (res) {
		// 					if (res.confirm) {
		// 						wx.navigateBack({
		// 							delta: 1, // 回退前 delta(默认为1) 页面
		// 						})
		// 					} else {
		// 						wx.navigateBack({
		// 							delta: 1, // 回退前 delta(默认为1) 页面
		// 						})
		// 					}
		// 				}
		// 			})
		// 		}
		// 	});

		// }else{
      
    // }
		that = this;
		wx.request({
			url: app.globalData.IP + "wx/shopdetail.do",
			data: { id: id , userid:app.globalData.ID},
			method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			// header: {}, // 设置请求的 header
			success: function (res) {
        wx.hideLoading();
				if (option.rt) {
					var time1 = res.data.time1;
					var time2 = res.data.time2;
					var time3 = res.data.time3;
					var time4 = res.data.time4;
					var time5 = res.data.time5;
					var time6 = res.data.time6;
					var print = '不在预定时间段内\t';
					print += time1 + "-" + res.data.time2 + ",";
					if (time3 != time4)
						print += time3 + "-" + res.data.time4 + ",";
					if (time5 != time6)
						print += time5 + "-" + res.data.time6 + "";
					wx.showModal({
						title: '提示',
						content: print,
						showCancel: false,
						success: function (res) {
							if (res.confirm) {
								wx.navigateBack({
									delta: 1, // 回退前 delta(默认为1) 页面
								})
							} else {
								wx.navigateBack({
									delta: 1, // 回退前 delta(默认为1) 页面
								})
							}
						}
					})
				}

        that.setData({
          zk:res.data.zk,
          startprice:res.data.startprice
        })
				var clist = res.data.myclasses;
				that.data.shop.name = res.data.name;
				that.data.shop.arrivetime = res.data.arrivetime;
				that.data.shop.startprice = res.data.startprice;
				that.data.shop.boxprice = res.data.boxprice;
				that.data.shop.psf = res.data.psf;
        that.data.shop.url = app.globalData.IP +'controller/' +res.data.imagec.url
				var nav = 0;
        that.data.navList.push({ id: -1, name: '折扣', index: 0 });
				for (var i = 0; i < clist.length; i++) {
					var item = { id: clist[i].id, name: clist[i].name, index: i+1 };
					that.data.navList.push(item);
          if (i == 0)
            nav = clist[i].id;
					for (var j = 0; j < clist[i].ps.length; j++) {
            var item2 = { discount: clist[i].ps[j].discount, dis: (clist[i].ps[j].discount * clist[i].ps[j].price + '').substring(0, (clist[i].ps[j].discount * clist[i].ps[j].price + '').indexOf('.')+2), id:clist[i].ps[j].id, parentId: clist[i].ps[j].classesid, name: clist[i].ps[j].name, price: clist[i].ps[j].price, sales: clist[i].ps[j].sales, type: clist[i].ps[j].type, img: '', num: 0 ,chf:clist[i].ps[j].number};
						if (clist[i].ps[j].imagec) {
							item2.img = app.globalData.IP + "controller/" + clist[i].ps[j].imagec.url;
						}
            item2.priced=(item2.price*(that.data.zk/10.0)).toFixed(1);
						that.data.allfoods.push(item2);
					}
					that.data.foods = [];
				}
        var foods = [];
        nav = -1;
				for (var i = 0; i < that.data.allfoods.length; i++) {
          if ( that.data.allfoods[i].discount < 1) {
						foods.push(that.data.allfoods[i]);
					}
				}

        if (foods.length == 0){
          foods = [];
          nav = 0;
          that.data.navList = [];
          for (var i = 0; i < clist.length; i++) {
            var item = { id: clist[i].id, name: clist[i].name, index: i + 1 };
            that.data.navList.push(item);
            if (i == 0)
              nav = clist[i].id;
          }
          
          for (var i = 0; i < that.data.allfoods.length; i++) {
            if (that.data.allfoods[i].parentId == nav) {
              foods.push(that.data.allfoods[i]);
            }
          }
        }


				that.setData({
					foods: foods,
          shop: that.data.shop
				})
				that.setData({
					navList: that.data.navList,
					dianming: res.data.name,
          phone:res.data.phone,
					allfoods: that.data.allfoods,
					curNav: nav,
					curIndex: 0,
				})
			},
		})

	},



	// 选择左侧选项框

	selectNav(event) {
		var id = event.target.dataset.id,
			index = parseInt(event.target.dataset.index);
		self = this;

		this.setData({
			curNav: id,
			curIndex: index,
		})
    that.data.foods = [];
    if(id == -1){
      for (var i = 0; i < that.data.allfoods.length; i++) {
        if (that.data.allfoods[i].discount < 1) {
          that.data.foods = that.data.foods.concat(that.data.allfoods[i]);
        }
      }
    }else{
      
      for (var i = 0; i < that.data.allfoods.length; i++) {
        if (that.data.allfoods[i].parentId == id) {
          that.data.foods = that.data.foods.concat(that.data.allfoods[i]);
        }
      }
    }

		
		that.setData({
			foods: that.data.foods
		})

	},
	//添加到购物车
	addCart(e) {
		//获取菜id和foods所在下标
		let index = e.currentTarget.dataset.index;
		let id = e.currentTarget.dataset.id;
		let name = e.currentTarget.dataset.name;
		
		let parentIndex = e.currentTarget.dataset.parentindex;
		//查看foods列表中食物价格
		var price = this.data.foods[index].priced;
		// obj 存储单个菜的数量，价格，标记
		var num = 0;
		var chf=this.data.foods[index].chf;
		let canhefei = this.data.shop.boxprice;
		var mark = 'a' + id + 'b' + parentIndex;
    var discount = this.data.foods[index].discount;
    var obj = { discount: discount, id: id, price: price, num: num + 1, mark: mark, name: name, canhefei: canhefei, chf: chf, sum: (discount * price).toFixed(2)};


		var cart1 = this.data.cart;
		var flag = false;
		for (var i = 0, len = cart1.length; i < len; i++) {
			if (id == cart1[i].id) {
				cart1[i].num++;
				flag = true;
			}
		}
		for (var i = 0; i < this.data.foods.length; i++) {
			if (id == this.data.foods[i].id) {
				this.data.foods[i].num++;
				this.setData({
					foods: this.data.foods
				})
				break;
			}
		}
		for (var i = 0; i < this.data.allfoods.length; i++) {
			if (id == this.data.allfoods[i].id) {
				this.data.allfoods[i].num++;
				this.setData({
					allfoods: this.data.allfoods
				})
				break;
			}
		}
		if (flag == false) {
			cart1.push(obj);
		}

		if (cart1.length < 1) {
			cart1.push(obj);
		}
		// console.log(this.data.cart);
		//判断obj是否在cart1中
		// console.log(cart1);
		this.setData({
			cart: cart1,
			foods: this.data.foods,
		});
		//增加购物车数量
		this.data.cartTotal += 1;
		this.calTotalPrice();
	},
	//计算总价和餐盒费
	calTotalPrice: function () {
		var cart = this.data.cart;
		var totalCount = 0;
		var totalPrice = 0;
		var totalCanhefei = 0;
		for (var i = 0, len = cart.length; i < len; i++) {
			//计算购物车所有商品总价和总数量
			totalPrice += cart[i].price * cart[i].num * cart[i].discount;
			totalCount += cart[i].num;
			if(cart[i].chf=='on')
			totalCanhefei += cart[i].canhefei * cart[i].num;

		}
    if (totalPrice.toFixed(2)>=that.data.startprice*1.00)
    {
		this.setData({
			totalPrice: totalPrice.toFixed(2),
			totalCount: totalCount,
			totalCanhefei: totalCanhefei,
      jscss:'jiesuan'
			//payDesc: this.payDesc()
		});
    }else
    {
      this.setData({
        totalPrice: totalPrice.toFixed(2),
        totalCount: totalCount,
        totalCanhefei: totalCanhefei,
        jscss: 'jiesuan2'
        //payDesc: this.payDesc()
      });
    }
		wx.setStorage({
			key: 'totalPrice',
			data: this.data.totalPrice
		});
		wx.setStorage({
			key: 'totalCanhefei',
			data: this.data.totalCanhefei
		})
	},



	//显示购物车商品
	showCartGoods: function () {
		console.log(that.data.cart.length);
		if (this.data.cart.length > 0) {
			if (this.data.showCartGoods == true) {
				this.setData({
					zongjiSymbolLeft: false,
					castListStyle: "none",
					cartIconStyle: 0,
				});
				this.data.showCartGoods = false;
				this.setData({
					zongjiSymbolLeft: false,
					castListStyle: "none",
					cartIconStyle: 0,
					blankHeight: "none"
				});
			} else {
				this.data.showCartGoods = true;
				this.setData({
					zongjiSymbolLeft: true,
					castListStyle: "block",
					cartIconStyle: "95rpx",
					blankHeight: "block"
				});
			}
		}


		console.log(this.data.showCartGoods);

	},
	minusGoods: function (e) {
		var cart2 = this.data.cart;
		var id = e.currentTarget.dataset.id;
		var len = cart2.length;
		for (var i = 0; i < len; i++) {
			if (id == cart2[i].id) {
				cart2[i].num--;
				if (cart2[i].num <= 0) {
					console.log(cart2[i].num);
					cart2.splice(i, 1);
				}
				break;
			}
		}
		for (var i = 0; i < this.data.foods.length; i++) {
			if (id == this.data.foods[i].id && this.data.foods[i].num > 0) {
				this.data.foods[i].num--;
				this.setData({
					foods: this.data.foods
				})
				break;
			}
		}
		for (var i = 0; i < this.data.allfoods.length; i++) {
			if (id == this.data.allfoods[i].id && this.data.allfoods[i].num > 0) {
				this.data.allfoods[i].num--;
				this.setData({
					allfoods: this.data.allfoods
				})
				break;
			}
		}
		this.setData({
			cart: cart2
		});
		// this.data.cart = cart2;
		wx.setStorage({
			key: 'cart',
			data: this.data.cart
		});
		console.log(this.data.cart);
		this.calTotalPrice();
		if (cart2.length <= 0) {
			this.clearCart();
		}
	},
	addGoods: function (e) {
		var cart2 = this.data.cart;
		var id = e.currentTarget.dataset.id;
		var len = cart2.length;
    var foods = this.data.foods;
    var allfoods = this.data.allfoods;
    for(var item in foods){
      if(foods[item].id == id)
        foods[item].num++
    }
    for(var item in allfoods){
      if(allfoods[item].id == id)
        allfoods[item].num++
    }
		for (var i = 0; i < len; i++) {
			if (id == cart2[i].id) {
				cart2[i].num++;
				break;
			}
		}
		this.setData({
			cart: cart2,
      foods:foods,
      allfoods:allfoods
		});
		wx.setStorage({
			key: 'cart',
			data: this.data.cart
		});
		this.calTotalPrice();
	},

	jiesuan: function () {
		var that = this;
    if(that.data.jscss=='jiesuan')
    {
		wx.setStorage({
			key: "cart",
			data: that.data.cart,
		});
		var ids = [];
		var counts = [];
		if (that.data.cart.length > 0) {
			for (var i = 0; i < that.data.cart.length; i++) {
				ids.push(that.data.cart[i].id);
				counts.push(that.data.cart[i].num);
			}
			wx.navigateTo({
				url: '/pages/menu/calculate/calculate?ids=' + ids.toString() + "&shopname=" + that.data.shop.name + "&arrivetime=" + that.data.shop.arrivetime + "&psf=" + that.data.shop.psf + "&boxprice=" + that.data.totalCanhefei + "&counts=" + counts.toString()+"&zk="+that.data.zk
			})
		} else {

		}
    }
	},

	clearCart: function () {
		this.setData({
			cart: []
		});
		wx.setStorage({
			key: 'cart',
			data: this.data.cart
		});
		this.calTotalPrice();
		this.setData({
			zongjiSymbolLeft: 434,
			castListStyle: "none",
			cartIconStyle: 0,
			blankHeight: 'none'
		});
		for (var i = 0; i < this.data.foods.length; i++) {
			this.data.foods[i].num = 0;
		}
		for (var i = 0; i < this.data.allfoods.length; i++) {
			this.data.allfoods[i].num = 0;
		}
		this.setData({
			foods: this.data.foods,
			allfoods: this.data.allfoods
		})
	},
	call:function(){
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
    })
  }
})