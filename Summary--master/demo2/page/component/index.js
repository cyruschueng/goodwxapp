Page({
  data: {
    chapters:[
      {
        title:"小程序组件√",
        list: [
          {
            id: 'view',
            name: '视图容器√',
            no:'11.1',
            open: false,
            pages: ['view', 'scroll-view', 'swiper', 'movable-view','cover-view']
          }, {
            id: 'content',
            name: '基础组件√',
            no: '11.2',
            open: false,
            pages: ['icon', 'text', 'rich-text', 'progress']
          }, {
            id: 'form',
            name: '表单组件√',
            no: '11.3',
            open: false,
            pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'picker-view','radio', 'slider', 'switch', 'textarea']
          }, {
            id: 'nav',
            name: '其它组件（导航/媒体组件/地图/画布）√',
            no: '11.4',
            open: false,
            pages: ['navigator', 'image', 'audio', 'video', 'map', 'canvas']
          }
        ]
      },
      {
        title:"第12章",
        list: [
          {
            id: 'view',
            name: '视图容器',
            no:'12.1',
            open: false,
            pages: ['view', 'scroll-view', 'swiper']
          }, {
            id: 'content',
            name: '基础内容',
            no: '11.1',
            open: false,
            pages: ['text', 'icon', 'progress']
          }, {
            id: 'form',
            name: '表单组件',
            no: '11.1',
            open: false,
            pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'radio', 'slider', 'switch', 'textarea']
          }, {
            id: 'nav',
            name: '导航',
            no: '11.1',
            open: false,
            pages: ['navigator']
          }, {
            id: 'media',
            name: '媒体组件',
            no: '11.1',
            open: false,
            pages: ['image', 'audio', 'video']
          }, {
            id: 'map',
            name: '地图',
            no: '11.1',
            pages: ['map']
          }, {
            id: 'canvas',
            name: '画布',
            no: '11.1',
            pages: ['canvas']
          }
        ]
      }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id
    var chapterIndex = e.currentTarget.dataset.chapterindex
    var listIndex = e.currentTarget.dataset.listindex

    var chapter = this.data.chapters[chapterIndex]
    var list = chapter.list

    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      chapters: this.data.chapters
    });
  }
})

