require('/common/localImgSrc.json', '/common/cell.js',
  function (localImgSrc, cells) {

    return function (view) {
      var page;

      var alphaAnimation = function (fromAlpha, toAlpha, duration) {
        var animation = new com.appengine.animation.AlphaAnimation();
        animation.fromAlpha = fromAlpha;
        animation.toAlpha = toAlpha;
        animation.duration = duration;
        return animation;
      }
      var hidePop = function (popupType) {
        var playContainer = document.getElementById('id_video_container')
        while (playContainer.hasChildNodes()) {
          playContainer.removeChild(playContainer.firstChild);
        }
        page.$(popupType).setGone(true);
        page.$(popupType).setAlpha(0);
        page.removeView(view);
        page.$('panoView').$('leftEye').setVisible(true);
        if (!page.isVR) {
          page.$('infoArea').setVisible(true);
        }
        page.resetMaxLine();
      };

      var setIntroPop = function (data) {
        view.$('close').setVisible(false);
        // view.$('authorTime').setText(data.authorTime);
        view.$('tips').setText(data.tips);
        view.$('introTxtAll').setText(data.introInfo);
        view.$('introDetail').setText(data.introDetail);
        view.$('introName').setText(data.introName);
        view.$('closeIntro').setOnClick(function () {
          view.$('introPopup').setGone(true);
          view.$('introPopup').setAlpha(0);
          view.$('close').setVisible(true);
          page.$('introTxt').setMaxLine(1);
          page.removeView(view);
          page.$('panoView').$('leftEye').setVisible(true);
          if (!page.isVR) {
            page.$('infoArea').setVisible(true);
          }
          page.resetMaxLine();
        });
      };

      var setTimePop = function (data) {
        if (data.curPano.timePanoList.length > 2) {
          view.$('timeContainer').setWidth('258dp')
        }

        view.$('timeContainer').clearViews()

        for (var i = 0; i < data.curPano.timePanoList.length; i++) {
          var src

          if (data.curPano.timeIcon == 'time') {
            switch (data.curPano.timePanoList[i].time) {
              case 11:
                src = localImgSrc.springIc
                break
              case 21:
                src = localImgSrc.summerIc
                break
              case 31:
                src = localImgSrc.fullIc
                break
              case 41:
                src = localImgSrc.winterIc
                break
              case 12:
                src = localImgSrc.nightIc
                break
              case 22:
                src = localImgSrc.nightIc
                break
              case 32:
                src = localImgSrc.nightIc
                break
              case 42:
                src = localImgSrc.nightIc
                break
              case 1:
                src = localImgSrc.dayIc
                break
              case 2:
                src = localImgSrc.nightIc
                break
            }
          }

          var timeCell = cells.timeCell(src)
          view.$('timeContainer').addView(timeCell);

          (function (index) {
            timeCell.setOnClick(function () {
              view.$('tPopup').setAlpha(0)
              data.setPano(data.curPano.timePanoList[index])
              page.$('panoView').$('leftEye').setVisible(true)
              page.$('infoArea').setVisible(true)
              page.resetMaxLine()
              page.removeView(view)
            })
          })(i)
        }
      }

      var setTuwenPop = function (data) {
        view.$('tuwen').frame.height = page.frame.height
        view.$('tuwen').frame.width = page.frame.width
        view.$('tuwen').img = data.imgUrl
        view.$('tuwen').title = data.articleName
        view.$('tuwen').detail = data.textStr
        view.$('tuwen').whenRender()
        view.$('scrollText').setOnClick(function () {
          view.$('scrollText').setVisible(false)
        })

        view.$('tuwen').setOnClick(function () {
          view.$('scrollText').setVisible(true)
        })
      }

      var setHtmlPop = function (data) {
        var html = decodeURI(data.htmlStr)
        view.$('html').setData(html)
      }

      var setVideoPopup = function (data) {
        var option = {
          'auto_play': '1',
          // "third_video": {
          //      "urls":{
          //              20 : data.video//演示地址，请替换实际地址
          //      }
          //  },
          'app_id': '1251448083',
          'file_id': data.fileId,
          'width': view.frame.width,
          'height': 210,
          'stretch_patch': true,
          'hide_h5_setting': true,
          'disable_drag': 1,
          'stretch_full': 1
        }
        /*调用播放器进行播放*/
        player = new qcVideo.Player('id_video_container', option)
      }

      //阻止点击事件传播
      view.setOnClick(function () {})

      view.show = function (popupType, data, parentPage) {
        var animation = alphaAnimation(0, 1, 500)
        page = parentPage
        page.addView(view)
        page.setVisible(true)
        page.$('infoArea').setVisible(false)
        switch (popupType) {
          case 'introPopup':
            setIntroPop(data)
            break
          case 'tPopup':
            setTimePop(data)
            break
          case 'tuwenPopup':
            setTuwenPop(data)
            break
          case 'htmlPopup':
            setHtmlPop(data)
            break
          case 'videoPopup':
            setVideoPopup(data)
            break
        }
        page.$(popupType).setGone(false)
        page.$(popupType).startAnimation(animation)
        page.$('close').setOnClick(function () {
          hidePop(popupType)
        })
        if (!page.isVR) {
          page.$('panoView').$('leftEye').setVisible(false)
        }
      }

    }
  })