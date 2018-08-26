// pages/index/detail/index.js
var Bmob = require('../../../utils/bmob.js');
var common = require('../../../utils/common.js');
Page({
  data: {
    rows: {},
    showTopTips: false,
    writeDiary: false,
    loading: false,
    windowHeight: 0,
    windowWidth: 0,
    limit: 10,
    bookList: [],
    modifyDiarys: false,
    objectid:0,
    categoryItems: [
      { name: '内容未分类', value: '0',checked:true},
      { name: '生活认知（刷牙，洗澡，如厕，逛街等日常行为）', value: '1' },
      { name: '生活认知（医院，学校，职业，家居等认知）', value: '2' },
      { name: '生活认知（生日，节日，习俗习惯）', value: '3' },
      { name: '生活认知（衣食住行，交通工具等）', value: '4' },
      { name: '人际交往（自我认同，如情绪管理，生病等等）', value: '5' },
      { name: '人际交往（亲情，如爸爸妈妈兄弟姐妹，祖孙，亲戚，离家出走，守法等等）', value: '6' },
      { name: '人际交往（友情，如朋友，社区，邻居，宠物等等）', value: '7' },
      { name: '人际交往（爱情，婚姻，两性等等）', value: '8' },
      { name: '人际交往（老师，君臣关系等）', value: '9' },
      { name: '人际交往（陌生人）', value: '10' },
      { name: '人际交往（其他）', value: '11' },
      { name: '科普百科（自然生态，如风云雨雪，雷电，四季，环境等）', value: '12' },
      { name: '科普百科（植物科普认知，如花，树，种子，草等）', value: '13' },
      { name: '科普百科（国家，城市，地理）', value: '14' },
      { name: '科普百科（动物，如昆虫，海洋动物，哺乳动物等）', value: '15' },
      { name: '科普百科（科学，如宇宙认知，物理世界认知，化学现象认知，海洋认知等等）', value: '16' },
      { name: '科普百科（健康医学，如身体，五官，生病）', value: '17' },
      { name: '科普百科（数学）', value: '18' },
      { name: '科普百科（概念认知，如时间，空间，方向）', value: '19' },
      { name: '科普百科（其他）', value: '20' },
      { name: '生命教育（成长，励志）', value: '21' },
      { name: '生命教育（怀孕，单亲，两性）', value: '22' },
      { name: '生命教育（生命，死亡，战争，人权等等）', value: '23' },
      { name: '生命教育（身心障碍，歧视，老年，生病）', value: '24' },
      { name: '生命教育（广泛的爱，希望）', value: '25' },
      { name: '生命教育（生活哲理）', value: '26' },
      { name: '生命教育（其他）', value: '27' },
      { name: '想象幻想（魔幻想象，如魔法，巫师，妖怪，精灵，幻想，做梦等等）', value: '28' },
      { name: '想象幻想（冒险，探险，推理等）', value: '29' },
      { name: '想象幻想（第三世界，异次元时空）', value: '30' },
      { name: '想象幻想（交叉想象，如动植物会说话，拟人化，但描述的是人的生活，讲一些小故事）', value: '31' },
      { name: '想象幻想（科幻类）', value: '32' },
      { name: '想象幻想（童话故事，寓言故事，故事集）', value: '33' },
      { name: '想象幻想（其他）', value: '34' },
      { name: '人文艺术（图书，阅读，写作，语言，英语）', value: '35' },
      { name: '人文艺术（音乐，美术，艺术，颜色，美感等）', value: '36' },
      { name: '人文艺术（其他）', value: '37' },
      { name: '历史文化（历史故事）', value: '38' },
      { name: '历史文化（人物传记，或者根据人物传记改编的作品）', value: '39' },
      { name: '历史文化（神话传说）', value: '40' },
      { name: '历史文化（其他）', value: '41' },
      { name: '学习工具（字典，图鉴，识字等）', value: '42' },
      { name: '益智游戏（找不同，视觉大发现，游戏书等）', value: '43' },
      { name: '益智游戏（无字书，纯图片想象）', value: '44' },
      { name: '以上分类都不合适', value: '45' },
    ],
    typeItems: [
      { name: '体裁未分类', value: '0',checked: true },
      { name: '图画文学（图画书，以图画为主，字数很少，适合2-6岁小朋友的）', value: '1' },
      { name: '图画文学（图画书，以图画为主，字数较多，有简单的故事情节）', value: '2' },
      { name: '童话寓言', value: '3' },
      { name: '诗歌童谣（儿歌，儿童诗，童谣）', value: '4' },
      { name: '儿童故事', value: '5' },
      { name: '儿童小说', value: '6' },
      { name: '儿童科学文艺类（科普，学科知识，生活认知等）', value: '7' },
      { name: '儿童散文', value: '8' },
      { name: '儿童曲艺戏剧', value: '9' },
      { name: '国学相关', value: '10' },
      { name: '成人小说', value: '11' },
      { name: '成人科学文艺类', value: '12' },
      { name: '其他', value: '13' },
      { name: '无字书，純图画的', value: '14' },
    ],
    themeItems: [
      { name: '主题未分类', value: '0',checked: true},
      { name: '快乐', value: '1' },
      { name: '分享与合作', value: '2' },
      { name: '关心与照顾', value: '3' },
      { name: '帮助别人与给予', value: '4' },
      { name: '尊重尊严', value: '5' },
      { name: '勇气', value: '6' },
      { name: '智慧', value: '7' },
      { name: '感恩', value: '8' },
      { name: '可爱纯真', value: '9' },
      { name: '哲理思辨', value: '10' },
      { name: '成长励志', value: '11' },
      { name: '爱与希望', value: '12' },
      { name: '悲伤，抑郁', value: '13' },
      { name: '客观描述，无大主题', value: '14' },
      { name: '童话或故事书，内容太多，无法分类', value: '15' },
    ],
    levelItems: [
      { name: '难度未分类', value: '0',checked:true },
      { name: '大班及以下（绘本与玩具书为主，大篇幅图画，字几乎没有，内容基本是重复一些话，故事情节非常简单）', value: '1' },
      { name: '一年级（绘本为主，大篇幅图画，字不多，有一定的故事和情节）', value: '2' },
      { name: '二年级（以绘本故事为主,有部分文字，图文并茂，但情节简单，主题直观，一些生活科普，常识科普都可以）', value: '3' },
      { name: '三年级（绘本辅以简短的故事书，字较多，故事情节较为复杂，主旨和意义不那么容易理解，一些科学性较强的书）', value: '4' },
      { name: '四年级（小的故事书，厚度不超过100页的，情节较长，故事教复杂）', value: '5' },
      { name: '五年级及以上（故事很复杂，篇幅很长，文字很多的）', value: '6' },
      { name: '所有年级都适合（比如一些玩具书，无字书等等）', value: '7' },
    ],
  },
  onLoad: function (e) {
    // 页面初始化 options为页面跳转所带来的参数
    var objectId = e.objectId;
    this.objectid = objectId;
    var that = this;
    // if (!e.objectId) {
    //   common.showTip("请重新进入", "loading");
    //   return false;
    // }

    var Book = Bmob.Object.extend("book");
    var query = new Bmob.Query(Book);

    query.get(objectId, {
      success: function (result) {
        that.setData({
          rows: result,
        })
        console.log(result);
        if (result.attributes.type){
          that.setData({
            typeItems: result.attributes.type,
          })
        }
        if (result.attributes.category) {
          that.setData({
            categoryItems: result.attributes.category,
          })
        }
        if (result.attributes.theme) {
          that.setData({
            themeItems: result.attributes.theme,
          })
        }
        if (result.attributes.level) {
          that.setData({
            levelItems: result.attributes.level,
          })
        }


        // The object was retrieved successfully.        
      },
      error: function (result, error) {
        console.log("查询失败");
      }
    });
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
  categoryChange: function (e) {
    console.log('category发生change事件，携带value值为：', e.detail.value);

    var categoryItems = this.data.categoryItems, values = e.detail.value;
    for (var i = 0, lenI = categoryItems.length; i < lenI; ++i) {
      categoryItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (categoryItems[i].value == values[j]) {
          categoryItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      categoryItems: categoryItems
    });
  },
  typeChange: function (e) {
    console.log('type发生change事件，携带value值为：', e.detail.value);

    var typeItems = this.data.typeItems, values = e.detail.value;
    for (var i = 0, lenI = typeItems.length; i < lenI; ++i) {
      typeItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (typeItems[i].value == values[j]) {
          typeItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      typeItems: typeItems
    });
  },
  levelChange: function (e) {
    console.log('level发生change事件，携带value值为：', e.detail.value);

    var levelItems = this.data.levelItems, values = e.detail.value;
    for (var i = 0, lenI = levelItems.length; i < lenI; ++i) {
      levelItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (levelItems[i].value == values[j]) {
          levelItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      levelItems: levelItems
    });
  },
  themeChange: function (e) {
    console.log('type发生change事件，携带value值为：', e.detail.value);

    var themeItems = this.data.themeItems, values = e.detail.value;
    for (var i = 0, lenI = themeItems.length; i < lenI; ++i) {
      themeItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (themeItems[i].value == values[j]) {
          themeItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      themeItems: themeItems
    });
  },
  modifyBook: function (event) {
    var objectId = this.objectid;
    console.log(objectId);
    var subtitle = event.detail.value.subtitle;
    var isbn = event.detail.value.isbn;
    var translator = [event.detail.value.translator];
    var publisher = event.detail.value.publisher;
    var ratingscore = event.detail.value.ratingscore;
    var ratingnumber = event.detail.value.ratingnumber;
    var rating = [ratingscore, ratingnumber];
    var booktype = this.data.typeItems;
    var booktheme = this.data.themeItems;
    var bookcategory = this.data.categoryItems;
    var booklevel = this.data.levelItems;
    var binding = event.detail.value.binding;
    var series = event.detail.value.series;
    var pages = event.detail.value.pages;
    var author_intro = event.detail.value.author_intro;
    var summary = event.detail.value.summary;
    var formId = event.detail.formId;
    var typeArray = new Array();
    for (var i = 0, j = 0, lenI = booktype.length; i < lenI; ++i) {
      if (booktype[i].checked == true) {
        typeArray[j] = booktype[i].name;
        j++;
      }
    }
    var themeArray = new Array();
    for (var i = 0,j = 0, lenI = booktheme.length; i < lenI; ++i){
      if (booktheme[i].checked == true){
        themeArray[j] = booktheme[i].name;
        j++;
      }
    }
    var categoryArray = new Array();
    for (var i = 0, j = 0, lenI = bookcategory.length; i < lenI; ++i) {
      if (bookcategory[i].checked == true) {
        categoryArray[j] = bookcategory[i].name;
        j++;
      }
    }
    var levelArray = new Array();
    for (var i = 0, j = 0, lenI = booklevel.length; i < lenI; ++i) {
      if (booklevel[i].checked == true) {
        levelArray[j] = booklevel[i].name;
        j++;
      }
    }
    var currentUser = Bmob.User.current();

    var User = Bmob.Object.extend("_User");
    var UserModel = new User();

    // var post = Bmob.Object.createWithoutData("_User", "594fdde53c");
    var Book = Bmob.Object.extend("book");
    var book = new Bmob.Query(Book);

    book.get(objectId, {
      success: function (result) {
        console.log(result);
        console.log(themeArray);
        console.log(levelArray);
        console.log(categoryArray);
        console.log(typeArray);
        // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
        result.set('subtitle', subtitle);
        result.set('isbn', isbn);
        result.set('translator', translator);
        result.set('publisher', publisher);
        result.set('rating', rating);
        result.set('binding', binding);
        result.set('series', series);
        result.set('type', booktype);
        result.set('theme', booktheme);
        result.set('category', bookcategory);
        result.set('level', booklevel);
        result.set('pages', pages);
        result.set('author_intro', author_intro);
        result.set('summary', summary);
        result.save();
        common.showTip('书籍修改成功', 'success', function () {
          wx.navigateBack({
            delta: 1
          })
        });

        // The object was retrieved successfully.
      },
      error: function (object, error) {
        common.showTip('书籍修改失败，请重新发布', 'loading');

      }
    })
  }
})