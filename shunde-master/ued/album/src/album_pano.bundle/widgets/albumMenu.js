require('/common/cell.js', function (cells) {
  var View = com.appengine.view.View
  var ListView = com.appengine.view.ListView
  View.extend('com.album.widgets.AlbumMenu', {
    getSelected: function (index) {

    },
    init: function () {
      View.prototype.init.apply(this, arguments)
      this.curAIndex = 0
      this.curPIndex = 0
      this.curTIndex = 0
      this.panoCellWidth = 152
      this.activeCell = null//被选中的全景菜单,针对listView复用情况
      this.spaceJump = false
    },
    setSpaceJump: function (spaceJump) {
      this.spaceJump = spaceJump
    },
    setIndex: function (aIndex, pIndex, tIndex) {
      this.curAIndex = aIndex
      this.curPIndex = pIndex
      this.curTIndex = tIndex
    },
    getIndex: function () {
      return {
        aIndex: this.curAIndex,
        pIndex: this.curPIndex,
        tIndex: this.curTIndex
      }
    },
    /**
     * [setAlbumList description]
     * @param {[type]} albumList [description]
     * @param {function} setPano   设置全景
     * @param {function} setTime  设置全景的时间选择
     */
    setAlbumList: function (albumList, setPano, setTime) {
      var self = this
      if (self.spaceJump == true) {

      } else {
        self.$('albumList').clearViews()
      }
      // self.getSelected = null
      if (albumList[0].type && albumList[0].type == 'one' || albumList.length < 2) {
        self.setPanoList(albumList[self.curAIndex].newPanoList, setPano, setTime)
        return
      }
      if (self.spaceJump) {
        for (var i = 0; i < self.$("albumList").subViews.length; i++) {
          if (i == self.curAIndex) {
            self.$('albumList').subViews[i].$('active').setVisible(true)
            self.getSelected(i);
          } else {
            self.$('albumList').subViews[i].$('active').setVisible(false)
          }
        }
      } else {
        albumList.forEach(function (item, index) {
          if (item.newPanoList.length <= 0) {
            return
          }
          var albumListCell = cells.albumListCell(item.albumName)

          if (index == self.curAIndex) {
            albumListCell.$('active').setVisible(true)
          }

          self.$('albumList').addView(albumListCell);

          (function (aIndex) {
            albumListCell.setOnClick(function () {
              if (aIndex != self.curAIndex) {

                self.getSelected(aIndex)

                self.$('albumList').subViews[self.curAIndex].$('active').setVisible(false)
                self.curAIndex = aIndex
                self.curPIndex = 0
                self.$('albumList').subViews[self.curAIndex].$('active').setVisible(true)
                self.setPanoList(item.newPanoList, setPano, setTime)
              }
            })
          })(index)
        })
      }

      self.setPanoList(albumList[self.curAIndex].newPanoList, setPano, setTime)
    },
    setPanoList: function (panoList, setPano, setTime) {
      var self = this
      var animation = new com.appengine.animation.AlphaAnimation()
      animation.fromAlpha = 0
      animation.toAlpha = 1
      animation.duration = 200
      var panoListView = View.parse({
        id: 'panoList',
        type: 'ListView',
        height: '84dp',
        width: 'match',
        marginTop: '10dp',
        layout: 'horizontal'
      })

      if (self.$('panoList')) {
        self.removeViewAt(1)
      }

      if (self.spaceJump) {
        self.activeCell.$('active').setVisible(false)
      }

      self.addView(panoListView)

      panoListView.setAdaptor({
        getCellView: function (reuseView, index) {
          if (reuseView == null) {
            reuseView = cells.panoListCell()
          }
          reuseView.$('img').setSrc(panoList[index].timePanoList[0].thumbnailUrl)
          var name = panoList[index].timePanoList[self.curTIndex].panoName
          reuseView.$('text').setText(name)
          if (reuseView.$('text').animation) {
            reuseView.$('text').animation = null
          }
          reuseView.$('text').setMaxLine(1)
          reuseView.$('text').startAnimation(animation)

          if (index == self.curPIndex) {
            if (self.activeCell) {
              self.activeCell.$('active').setVisible(false)

            }
            reuseView.$('active').setVisible(true)
            self.activeCell = reuseView
          } else {
            reuseView.$('active').setVisible(false)
          }
          (function (pIndex) {
            reuseView.setOnClick(function () {
              self.activeCell.$('active').setVisible(false)
              this.$('active').setVisible(true)
              self.activeCell = this
              self.curPIndex = pIndex
              setPano(panoList[self.curPIndex].timePanoList[0])
              setTime(panoList[self.curPIndex])
            })
          })(index)
          return reuseView
        },
        getCount: function () {
          return panoList.length
        }
      })

      if (panoList[self.curPIndex]) {
        setPano(panoList[self.curPIndex].timePanoList[self.curTIndex])
        setTime(panoList[self.curPIndex])
      }

      if (self.spaceJump && self.curPIndex > 1) {
        var transX = -self.curPIndex * self.panoCellWidth
        if (self.curPIndex > panoList.length - 3) {
          transX = transX + self.panoCellWidth
        }
        panoListView.setTranslateX(transX)
        panoListView.notifyDataChanged()
      }
      self.spaceJump = false
    }
  })
})