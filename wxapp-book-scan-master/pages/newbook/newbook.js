var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp();
var that;
Page({
  data: {
    showTopTips: false,
    writeDiary: false,
    loading: false,
    windowHeight: 0,
    windowWidth: 0,
    limit: 10,
    bookList: [],
    modifyDiarys: false
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  addBook: function (event) {
    var title = event.detail.value.title;
    var subtitle = event.detail.value.subtitle;
    var isbn = event.detail.value.isbn;
    var author = [event.detail.value.author];
    var translator = [event.detail.value.translator];
    var publisher = event.detail.value.publisher;
    var ratingscore = event.detail.value.ratingscore;
    var ratingnumber = event.detail.value.ratingnumber;
    var rating = [ratingscore, ratingnumber];
    var binding = event.detail.value.binding;
    var series = event.detail.value.series;
    var pages = event.detail.value.pages;
    var author_intro = event.detail.value.author_intro;
    var summary = event.detail.value.summary;
    var formId = event.detail.formId;
    console.log("event", event)
    if (!title) {
      common.showTip("标题不能为空", "loading");
    }
    else if (!author) {
      common.showTip("作者不能为空", "loading");
    }
    else {
      var currentUser = Bmob.User.current();

      var User = Bmob.Object.extend("_User");
      var UserModel = new User();

      // var post = Bmob.Object.createWithoutData("_User", "594fdde53c");
      var Book = Bmob.Object.extend("book");
      var book = new Book();

      //增加日记
      book.set("title", title);
      book.set("subtitle", subtitle);
      book.set("isbn", isbn);
      book.set("author", author);
      book.set("translator", translator);
      book.set("publisher", publisher);
      book.set("rating", rating);
      book.set("binding", binding);
      book.set("series", series);
      book.set("pages", pages);
      book.set("author_intro", author_intro);
      book.set("summary", summary);
      if (currentUser) {
        UserModel.id = currentUser.id;
        book.set("own", UserModel);
      }
      //添加数据，第一个入口参数是null
      book.save(null, {
        success: function (result) {
          // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
          common.showTip('添加书籍成功');
          var currentUser = Bmob.User.current();
          wx.navigateBack({
            delta: 1
          })
        },
        error: function (result, error) {
          // 添加失败
          common.showTip('添加书籍失败，请重新发布', 'loading');

        }
      });
    }

  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  }
});