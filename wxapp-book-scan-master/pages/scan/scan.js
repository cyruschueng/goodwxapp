var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');

var title = "Title";
var subtitle = "Subtitle";
var author = ["Author"];
var translator = ["Translator"];
var isbn = "XXXXXX";
var binding = "无";
var series = "无";
var summary = "Summary";
var author_intro = "Author Intro";
var publisher = "Publisher";
var pages = "1";
var imageSource = "/image/default_book_pic.jpg";
var tags = [];
var rating = ["0.0", "0"];

Page({
  data: {
    articleTitle: title,
    articleAuthor: author,
    isbn: isbn,
    imageSource: imageSource,
    subtitle: subtitle,
    translator: translator,
    binding: binding,
    series: series,
    summary: summary,
    author_intro: author_intro,
    publisher: publisher,
    pages: pages,
    tags: tags,
    rating: rating,
    modalHidden: true,
    titleSearch: "",
    authorSearch: "",
    publisherSearch: "",
    isbnSearch: "",
  },

  onLoad: function (options) {

  },

  onScanButton: function () {
    var that = this;
    wx.scanCode({
      onlyFromCamera: false,
      success: function (res) {

        isbn = res.result;
        that.setData({
          isbn: isbn,
        });

        wx.request({
          url: 'https://api.douban.com/v2/book/isbn/' + isbn,
          data: {},
          method: 'GET',
          header: {
            "Content-Type": "json"
          },//Keep this in Development reference

          success: function (res) {
            if (res.statusCode == 200) {
              console.log(res);
              if (res.data.hasOwnProperty("title") && res.data.title) {
                title = res.data.title;
              }
              else {
                title = "无标题";
              }

              if (res.data.hasOwnProperty("subtitle") && res.data.subtitle) {
                subtitle = res.data.subtitle;
              }
              else {
                subtitle = "无副标题";
              }

              if (res.data.hasOwnProperty("author") && res.data.author.length) {
                author = res.data.author;
              }
              else {
                author = ["无作者"];
              }

              if (res.data.hasOwnProperty("translator") && res.data.translator.length) {
                translator = res.data.translator;
              }
              else {
                translator = ["无译者"];
              }

              if (res.data.hasOwnProperty("series")) {
                series = res.data.series.title;
              }
              else {
                series = "无系列信息";
              }

              if (res.data.hasOwnProperty("binding") && res.data.binding) {
                binding = res.data.binding;
              }
              else {
                binding = "无装裱信息";
              }

              if (res.data.hasOwnProperty("summary") && res.data.summary) {
                summary = res.data.summary;
                summary = summary.split("\n").join("");
              }
              else {
                summary = "无概要";
              }

              if (res.data.hasOwnProperty("author_intro") && res.data.author_intro) {
                author_intro = res.data.author_intro;
              }
              else {
                author_intro = "无作者简介";
              }

              if (res.data.hasOwnProperty("pages") && res.data.pages) {
                pages = res.data.pages;
              }
              else {
                pages = "0";
              }

              if (res.data.hasOwnProperty("publisher") && res.data.publisher) {
                publisher = res.data.publisher;
              }
              else {
                publisher = "无出版社信息";
              }

              if (res.data.images && res.data.images.large) {
                imageSource = res.data.images.large;
              }

              if (res.data.hasOwnProperty("tags") && res.data.tags) {
                tags = res.data.tags;
              }
              else {
                tags = [];
              }

              if (res.data.hasOwnProperty("rating") && res.data.rating) {
                rating[0] = res.data.rating.average;
                rating[1] = res.data.rating.numRaters.toString();
              }
              else {
                rating = ["0.0", "0"];
              }

              that.setData({
                articleTitle: title,
                articleAuthor: author,
                isbn: isbn,
                imageSource: imageSource,
                subtitle: subtitle,
                translator: translator,
                binding: binding,
                series: series,
                summary: summary,
                author_intro: author_intro,
                publisher: publisher,
                pages: pages,
                tags: tags,
                rating: rating
              });

              wx.showModal({
                title: '图书信息获取成功',
                content: '请点击确认键将图书信息上传到数据库中',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                    var Book = Bmob.Object.extend("book");
                    var query = new Bmob.Query(Book);
                    query.equalTo("isbn", isbn);
                    query.equalTo("title", title);
                    query.find({
                      success: function (Result) {
                        console.log(Result);
                        if (Result.length) {
                          var booknumber = Result[0].get("number");
                          Result[0].set("number", ++booknumber);
                          Result[0].save(null, {
                            success: function (r) {
                              console.log("number+1");
                              wx.showModal({
                                showCancel: false,
                                title: '提示',
                                content: '库里已有相同的书，已将对应的书籍数量进行增加',
                              });
                            },
                            error: function (r, error) {
                              console.log(error);
                            }
                          });
                        }
                        else {
                          var book = new Book();
                          console.log("ddddd");
                          book.set("number", 1);     //数量置1
                          book.set("isbn", isbn);   //isbn号
                          book.set("title", title);
                          book.set("subtitle", subtitle);
                          book.set("subtitle", subtitle);
                          book.set("author", author);
                          book.set("translator", translator);
                          book.set("binding", binding);
                          book.set("series", series);
                          book.set("summary", summary);
                          book.set("author_intro", author_intro);
                          book.set("publisher", publisher);
                          book.set("pages", pages);
                          book.set("image", imageSource);
                          book.set("tags", tags);
                          book.set("rating", rating);

                          book.save(null, {
                            success: function (r) {
                              console.log("保存成功");
                              wx.showModal({
                                title: '哦恭喜',
                                content: '成功新加入一本书',
                                showCancel: false,
                              });
                            },
                            error: function (r, error) {
                              console.log(error);
                              wx.showModal({
                                title: '妈耶',
                                content: '好像库炸了没加进去',
                                showCancel: false,
                              });
                            }
                          });
                        }
                      }
                    });
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                }
              })
            }
            else {
              if (res.statusCode == 404) {
                wx.showModal({
                  title: '妈耶',
                  content: '找不到这本书的信息，是否手动搜索？',
                  success: function (res) {
                    if (res.confirm) {
                      console.log("手动搜索");
                      that.setData({
                        modalHidden: false,
                      });
                    }
                  }
                });
              }
              else {
                if (res.data.code == 112) {
                  wx.showModal({
                    title: '妈耶',
                    content: 'API调用次数超了，IP被禁了',
                    showCancel: false,
                  });
                }
                else {
                  wx.showModal({
                    title: '妈耶',
                    content: '发生未知错误惹',
                    showCancel: false,
                  });
                }
              }
            }
          }
        })
      }
    });
  },

  onSearchButton: function () {
    var that = this;
    that.setData({
      modalHidden: false,
    });
  },

  onSearchConfirm: function () {
    var that = this;
    var titleSearch = that.data.titleSearch;
    var authorSearch = that.data.authorSearch;
    var publisherSearch = that.data.publisherSearch;
    var isbnSearch = that.data.isbnSearch;
    if (!titleSearch && !authorSearch && !publisherSearch && !isbnSearch) {
      that.setData({
        modalHidden: true,
      });
    }
    else {
      that.setData({
        titleSearch: "",
        authorSearch: "",
        publisherSearch: "",
        isbnSearch: "",
        modalHidden: true,
      });
      var key = titleSearch;
      if (authorSearch) {
        key = key + "%20" + authorSearch;
      }
      if (publisherSearch) {
        key = key + "%20" + publisherSearch;
      }
      if (isbnSearch) {
        key = key + "%20" + isbnSearch;
      }
      console.log(key);
      wx.request({
        url: 'https://api.douban.com/v2/book/search?q=' + key + '&count=1',
        data: {},
        method: 'GET',
        header: {
          "Content-Type": "json"
        },//Keep this in Development reference

        success: function (res) {
          if (res.statusCode == 200 && res.data.count) {
            if (res.data.books[0].hasOwnProperty("title") && res.data.books[0].title) {
              title = res.data.books[0].title;
            }
            else {
              title = "无标题";
            }

            if (res.data.books[0].hasOwnProperty("subtitle") && res.data.books[0].subtitle) {
              subtitle = res.data.books[0].subtitle;
            }
            else {
              subtitle = "无副标题";
            }

            if (res.data.books[0].hasOwnProperty("author") && res.data.books[0].author.length) {
              author = res.data.books[0].author;
            }
            else {
              author = ["无作者"];
            }

            if (res.data.books[0].hasOwnProperty("translator") && res.data.books[0].translator.length) {
              translator = res.data.books[0].translator;
            }
            else {
              translator = ["无译者"];
            }

            if (res.data.books[0].hasOwnProperty("series")) {
              series = res.data.books[0].series.title;
            }
            else {
              series = "无系列信息";
            }

            if (res.data.books[0].hasOwnProperty("binding") && res.data.books[0].binding) {
              binding = res.data.books[0].binding;
            }
            else {
              binding = "无装裱信息";
            }

            if (res.data.books[0].hasOwnProperty("summary") && res.data.books[0].summary) {
              summary = res.data.books[0].summary;
              summary = summary.split("\n").join("");
            }
            else {
              summary = "无概要";
            }

            if (res.data.books[0].hasOwnProperty("author_intro") && res.data.books[0].author_intro) {
              author_intro = res.data.books[0].author_intro;
            }
            else {
              author_intro = "无作者简介";
            }

            if (res.data.books[0].hasOwnProperty("pages") && res.data.books[0].pages) {
              pages = res.data.books[0].pages;
            }
            else {
              pages = "0";
            }

            if (res.data.books[0].hasOwnProperty("publisher") && res.data.books[0].publisher) {
              publisher = res.data.books[0].publisher;
            }
            else {
              publisher = "无出版社信息";
            }

            if (res.data.books[0].images && res.data.books[0].images.large) {
              imageSource = res.data.books[0].images.large;
            }

            if (res.data.books[0].hasOwnProperty("tags") && res.data.books[0].tags) {
              tags = res.data.books[0].tags;
            }
            else {
              tags = [];
            }

            if (res.data.books[0].hasOwnProperty("rating") && res.data.books[0].rating) {
              rating[0] = res.data.books[0].rating.average;
              rating[1] = res.data.books[0].rating.numRaters.toString();
            }
            else {
              rating = ["0.0", "0"];
            }

            if (res.data.books[0].hasOwnProperty("isbn13") && res.data.books[0].isbn13) {
              isbn = res.data.books[0].isbn13;
            }
            else {
              isbn = "XXXXXX";
            }

            that.setData({
              articleTitle: title,
              articleAuthor: author,
              isbn: isbn,
              imageSource: imageSource,
              subtitle: subtitle,
              translator: translator,
              binding: binding,
              series: series,
              summary: summary,
              author_intro: author_intro,
              publisher: publisher,
              pages: pages,
              tags: tags,
              rating: rating
            });

            wx.showModal({
              title: '图书信息获取成功',
              content: '请点击确认键将图书信息上传到数据库中',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                  var Book = Bmob.Object.extend("book");
                  var query = new Bmob.Query(Book);
                  query.equalTo("isbn", isbn);
                  query.equalTo("title", title);
                  query.find({
                    success: function (Result) {
                      console.log(Result);
                      if (Result.length) {
                        var booknumber = Result[0].get("number");
                        Result[0].set("number", ++booknumber);
                        Result[0].save(null, {
                          success: function (r) {
                            console.log("number+1");
                            wx.showModal({
                              showCancel: false,
                              title: '提示',
                              content: '库里已有相同的书，已将对应的书籍数量进行增加',
                            });
                          },
                          error: function (r, error) {
                            console.log(error);
                          }
                        });
                      }
                      else {
                        var book = new Book();
                        console.log("ddddd");
                        book.set("number", 1);     //数量置1
                        book.set("isbn", isbn);   //isbn号
                        book.set("title", title);
                        book.set("subtitle", subtitle);
                        book.set("subtitle", subtitle);
                        book.set("author", author);
                        book.set("translator", translator);
                        book.set("binding", binding);
                        book.set("series", series);
                        book.set("summary", summary);
                        book.set("author_intro", author_intro);
                        book.set("publisher", publisher);
                        book.set("pages", pages);
                        book.set("image", imageSource);
                        book.set("tags", tags);
                        book.set("rating", rating);

                        book.save(null, {
                          success: function (r) {
                            console.log("保存成功");
                            wx.showModal({
                              title: '哦恭喜',
                              content: '成功新加入一本书',
                              showCancel: false,
                            });
                          },
                          error: function (r, error) {
                            console.log(error);
                            wx.showModal({
                              title: '妈耶',
                              content: '好像库炸了没加进去',
                              showCancel: false,
                            });
                          }
                        });
                      }
                    }
                  });
                } else if (res.cancel) {
                  console.log('用户点击取消');
                }
              }
            })
          }
          else {
            if (res.statusCode == 404) {
              wx.showModal({
                title: '妈耶',
                content: '还是找不到这个书诶',
                showCancel: false,
              });
            }
            else {
              if (res.data.code == 112) {
                wx.showModal({
                  title: '妈耶',
                  content: 'API调用次数超了，IP被禁了',
                  showCancel: false,
                });
              }
              else {
                if (res.statusCode == 200 && res.data.count == 0) {
                  wx.showModal({
                    title: '妈耶',
                    content: '还是搜不到这本书诶',
                    showCancel: false,
                  });
                }
                else {
                  wx.showModal({
                    title: '妈耶',
                    content: '发生未知错误惹',
                    showCancel: false,
                  });
                }
              }
            }
          }
        }
      });
    }
  },

  getTitle: function (e) {
    var that = this;
    that.setData({
      titleSearch: e.detail.value,
    });
  },

  getAuthor: function (e) {
    var that = this;
    that.setData({
      authorSearch: e.detail.value,
    });
  },

  getPublisher: function (e) {
    var that = this;
    that.setData({
      publisherSearch: e.detail.value,
    });
  },

  getISBN: function (e) {
    var that = this;
    that.setData({
      isbnSearch: e.detail.value,
    });
  },

  onSearchCancel: function () {
    var that = this;
    that.setData({
      modalHidden: true,
      titleSearch: "",
      authorSearch: "",
      publisherSearch: "",
    });
  }

});