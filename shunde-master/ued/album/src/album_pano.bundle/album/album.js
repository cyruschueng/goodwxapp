require('album.xml', '/common/cell.js', '/popup/popup.xml', '/common/localImgSrc.json', '/common/utils.js',
  function (pageRender, cellRender, popupRender, localImgSrc, utils) {
    var View = com.appengine.view.View
    var Platform = com.appengine.core.Platform
    var page = pageRender()
    var popup = popupRender()
    var panoView = page.$('panoView')
    var albumMenu = page.$('albumMenu')
    var infoArea = page.$('infoArea') // 所有信息层
    var autoPlayFlag = false
    var audioDom = document.getElementById('audioDom')
    var firstLoading = false
    var audioIcLoop
    var isPlay = false
    var hasHistory = false
    var authorTime = ''
    var ispc  = true
    var isAutoPlay = true
    var panoDetail = ''
    var floorIndex = 0
    var v_pano_text_scroll = page.$('pano_text_scroll')
    var v_pano_image_scroll = page.$('pano_image_scroll')
    var v_panScrollHistoryBottom = page.$('panScrollHistoryBottom')
    var v_goPano = page.$('goPano')
    var baseUrl, albumId, panoId
    v_goPano.clickKind = 'poiHistoryMiss'
    albumId = getUrlParam('albumId')
    panoId = getUrlParam('panoId')
    var v_swithIcon = page.$('swithIcon')

    function isPC () {
      var userAgentInfo = navigator.userAgent;
      var Agents = ['Android', 'iPhone',
        'SymbianOS', 'Windows Phone',
        'iPad', 'iPod'];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    }

    function toDate (timestamp) {
      var date = new Date(timestamp * 1000),
        Y = date.getFullYear() + '-',
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
        D = date.getDate() + ' '
      return Y + M + D
    }
    var createTextItem = function (data, albumName) {
      var cell = View.parse({
        width: 'wrap',
        height: '20dp',
        marginRight: '10dp',
        background: '#70000000',
        children: [
          {
            type: 'View',
            id: 'isActive',
            background: '#3faae7',
            visible: false
          },
          {
            type: 'TextView',
            text: albumName,
            width: 'wrap',
            height: 'wrap',
            fontColor: '#ffffff',
            fontSize: '14dp',
            contentGravity: 'center',
            gravity: 'center',
            marginLeft: '5dp',
            marginRight: '5dp',
          }
        ]
      })
      cell.info = data
      cell.setOnClick(function () {

      })
      return cell
    }
    //创建v_album_img_scroll的item
    var createImgItem = function (data, imgUrl, panoName, panoDate) {
      var da = new Date()
      var year = da.getFullYear()
      var month = da.getMonth() + 1
      var date = da.getDate()
      var time = [year, month, date].join('.')
      var cell = View.parse({
        width: '150dp',
        height: '90dp',
        marginRight: '10dp',
        borderCorner: '5dp',
        clipToBounds: true,
        children: [
          {
            type: 'View',
            id: 'isActiveView',
            background: '#3faae7',
            visible: false
          },
          {
            margin: '2dp',
            id: 'scrollView',
            contentGravity: 'center',
            children: [
              {
                id: 'poiImg',
                type: 'ImageView',
                height: 'match',
                gravity: 'center',
                background: '#32A0FC',
                src: imgUrl
              },
              {
                type: 'View',
                height: 'wrap',
                contentGravity: 'center',
                layout: 'vertical',
                children: [
                  {
                    id: 'textName',
                    type: 'TextView',
                    height: 'wrap',
                    fontSize: '14dp',
                    contentGravity: 'center',
                    fontColor: '#ffffff',
                    text: panoName
                  },
                  {
                    id: 'time',
                    type: 'TextView',
                    height: 'wrap',
                    fontSize: '12dp',
                    contentGravity: 'center',
                    marginTop: '5dp',
                    fontColor: '#ffffff',
                    text: time
                  },
                ]
              },
            ]
          }
        ]
      })
      cell.info = data
      cell.setOnClick(function () {
      })
      return cell
    }

    // getUrlByAlbum : function (albumId) {
    //     //http://pano.pingtan.visualbusiness.cn/pano-viewer-web/rest/album/view/248A46BA3EFD4633A96779AF7E977D6A?lang=
    //     return baseUrl + "/rest/album/view/" + albumId + "?lang=" + album.lang;//相册接口
    // },
    // getUrlByPano : function (panoId) {
    //     return baseUrl + "/rest/album?panoId=" + panoId + "&lang=" + album.lang;//相片接口
    // },

    // getUrlByAlbum : function (albumId) {
    //     return urlProvider('getUrlByAlbum') + albumId + "?lang=" + album.lang;//相册接口
    // },
    // getUrlByPano : function (panoId) {
    //     return urlProvider('getUrlByPano') + "?panoId=" + panoId + "&lang=" + album.lang;//相片接口
    // },

    // var getBaseUrl = function () {
    //     baseUrl = window.location.protocol + "//data.pano.visualbusiness.cn";
    //     //debug对应测试，albumSource参数强行改变环境
    //     if((window.location.href.indexOf("album_pano-debug") >= 0 && getUrlParam("albumSource") != "release")
    //         || getUrlParam("albumSource") == "test"){
    //         baseUrl = window.location.protocol + "//datatest.pano.visualbusiness.cn";
    //     }
    // };
    // getBaseUrl();

    page.resetMaxLine = function () {
      this.introTxt = null
      if (!this.introTxt) {
        this.switchLength = true
        this.introTxt = page.$('introTxt').getText()
      }
      // this.introTxt = page.$("introTxt").getText();
      var self = this
      setTimeout(function () {
        page.$('introTxt').setMaxLine(1)
        if (self.introTxt) {
          if (self.introTxt.length > 10) {
            page.$('introTxt').setText(self.introTxt.substr(0, self.introTxt.length - (self.switchLength ? 1 : 0)))
          } else {
            page.$('introTxt').setText(self.introTxt + ' ')
          }
        }
        self.switchLength = !self.switchLength
      }, 10)
    }

    var album = {
      data: {},
      lang: getUrlParam('lang') == 'en' ? getUrlParam('lang') : '',
      isGravity: false,
      isVR: false,
      addIndexOfMpano: function (marker) {
        if (marker.mtype != 'pano') {
          return marker
        }
        for (var aIndex = 0; aIndex < album.data.albumList.length; aIndex++) {
          if (marker.tIndex != null) {
            break
          }
          var panoList = album.data.albumList[aIndex].newPanoList
          for (var pIndex = 0; pIndex < panoList.length; pIndex++) {
            if (marker.tIndex != null) {
              break
            }
            var timePnaoList = panoList[pIndex].timePanoList
            for (var tIndex = 0; tIndex < timePnaoList.length; tIndex++) {
              if (marker.panoId == timePnaoList[tIndex].panoId) {
                marker.aIndex = aIndex
                marker.pIndex = pIndex
                marker.tIndex = tIndex
                break
              }
            }
          }
        }
        return marker
      },

      setLogo: function (logoflag) {
        if (logoflag == 'on') {
          page.$('logo').setGone(false)
        } else {
          page.$('logo').setGone(true)
        }
      },

      setVideo: function (fileId) {
        if (!fileId) {
          page.$('video').setGone(true)
          return
        }
        page.$('video').setGone(false)
        page.$('video').setOnClick(function () {
          popup.show('videoPopup', {fileId: fileId}, page)
        })
      },
      setCover: function (h5, pc) {
        var coverSrc
        if (ispc == false) {
          coverSrc = h5
        } else {
          coverSrc = pc
        }
        v_goPano.setGone(true)
        var date = toDate(album.data.updateTimeMillis)
        page.$('albumTitle').setText(album.data.albumName)
        if (album.data.features != null && album.data.features.cover_text != '') {
          page.$('bottomLabel').setText(album.data.features.cover_text)
        } else {
          page.$('bottomLabel').setText('顺德区国土城建和水利局')
        }
        authorTime = album.data.updateUser + '   ' + date
        page.$('bottomLabel').setGone(false)
        page.$('albumDate').setText(authorTime)
        page.$('titleInfo').setGone(false)
        page.$('intoAlbum').setGone(false)
        page.$('viewInfo').setGone(false)
        if (coverSrc && album.data.features.coverflag != 'false' && window.myIndexAlbum == 0) {
          page.$('coverContainer').setGone(false)
          page.$('coverBg').setSrc(coverSrc)
          alphaAnimation(page.$('coverBg'), 0, 1, 1000, function () {
            setTimeout(function () {
              alphaAnimation(page.$('coverBg'), 1, 0, 1000, function () {
                page.$('coverContainer').setGone(true)
              })
            }, 2000)
          })
          if (album.data.features.cover_logo_url) {
            page.$('panoLogo').setSrc(album.data.features.cover_logo_url)
          }
          page.$('tv1').setText(album.data.features.cover_text)
          page.$('skipCover').setOnClick(function () {
            page.$('coverBg').animation = null
            page.$('coverContainer').setGone(true)
            page.$('intoAlbum').setGone(false)
            page.$('viewInfo').setGone(false)
          })
        }
        page.$('intoAlbum').setOnClick(function () {
          if (album.data.albumList[0].panoList[0].markers) {
            album.setMarker(album.data.albumList[0].panoList[0].markers)
          }
          page.$('intoAlbum').setGone(true)
          page.$('viewInfo').setGone(true)
          page.$('titleInfo').setGone(true)
          page.$('bottomLabel').setGone(true)
          alphaAnimation(infoArea, 0, 0.99, 500)
          page.$('vrOff').setAlpha(1)
          page.$('coverContainer').setAlpha(1)
          panoView.panoViewInternal.setAutoplayEnable(autoPlayFlag)
          v_goPano.setGone(!hasHistory)
        })
        page.$('viewInfo').setOnClick(function () {
          popup.show('introPopup',
            {
              introInfo: '摘要:  ' + album.data.albumInfo,
              introName: album.data.albumName,
              introDetail: '详情:  ' + album.data.albumDetail,
              tips: album.data.tipsList.join('/')
            }, page)
        })

      },
      getMarkerCell: function (marker) {
        var markerCell
        heading = Number(marker.heading).toFixed(2).toString()
        pitch = Number(marker.pitch).toFixed(2).toString()
        page.isVR = album.isVR
        switch (marker.mtype) {
          case 'video':
            markerCell = cellRender.markerCell({
              heading: heading,
              pitch: pitch,
              imgSrc: localImgSrc.movieIc,
              text: marker.videoName
            })
            markerCell.setOnClick(function () {
              popup.show('videoPopup', marker, page)
            })
            break
          case 'radio':
            markerCell = cellRender.markerCell({
              heading: heading,
              pitch: pitch,
              imgSrc: localImgSrc.otherIc,
              text: marker.radioName
            })
            markerCell.setOnClick(function () {
              //等待交互形式
            })
            break
          case 'article':
            markerCell = cellRender.markerCell({
              heading: heading,
              pitch: pitch,
              imgSrc: localImgSrc.picIc,
              text: marker.articleName
            })
            markerCell.setOnClick(function () {
              popup.show('tuwenPopup', marker, page)
            })
            break
          case 'pano':
            markerCell = cellRender.markerCell({
              heading: heading,
              pitch: pitch,
              imgSrc: localImgSrc.scenicIc,
              text: marker.panoName
            })
            markerCell.setOnClick(function () {
              if (marker.tIndex == null) {
                //没找到对应全景时
                return
              }
              albumMenu.setSpaceJump(true)
              albumMenu.setIndex(marker.aIndex, marker.pIndex, marker.tIndex)
              albumMenu.setAlbumList(album.data.albumList, album.setPano, album.setTime)
            })
            break
          case 'url':
            markerCell = cellRender.markerCell({
              heading: heading,
              pitch: pitch,
              imgSrc: localImgSrc.otherIc,
              text: marker.urlName
            })
            markerCell.setOnClick(function () {
              // popup.setWebPop(page, markerData[index], infoArea);
              window.location.href = marker.url
            })
            break
          case 'label':
            markerCell = cellRender.markerCell({
              heading: heading,
              pitch: pitch,
              imgSrc: localImgSrc.otherIc,
              text: marker.label
            })
            break
          case 'html':
            markerCell = cellRender.markerCell({
              heading: heading,
              pitch: pitch,
              imgSrc: localImgSrc.picIc,
              text: marker.htmlName
            })
            markerCell.setOnClick(function () {
              popup.show('htmlPopup', marker, page)
            })
            break
        }
        return markerCell
      },

      setMarker: function (marker) {
        panoView.markerdata = marker
        panoView.setAdaptor({
          getView: function (index) {
            return album.getMarkerCell(album.addIndexOfMpano(panoView.markerdata[index]))
          },
          getCount: function () {
            if (panoView.markerdata == null) {
              return 0
            }
            return panoView.markerdata.length
          }
        })
      },

      setIntro: function (info, detail, title, tipList) {
        page.$('intro').setGone(false)
        if (getUrlParam('lang') == 'en') {
          if (title.length > 14) {
            page.$('introTxt').setText(title.substr(0, 14) + '...')
          } else {
            page.$('introTxt').setText(title)

          }
        } else {
          if (title.length > 6) {
            page.$('introTxt').setText(title.substr(0, 6) + '...')

          } else {
            page.$('introTxt').setText(title)
          }
        }
        if (info) {
          page.$('intro').setOnClick(function () {
            popup.show('introPopup',
              {
                authorTime: authorTime,
                introInfo: '摘要:  ' + ((info == '' || info == undefined || info == null) ? '暂无' : info),
                introName: title,
                tips: tipList,
                introDetail: '详情:  ' + ((detail == '' || detail == undefined || detail == null) ? '暂无' : detail)
              }, page)
          })
        } else {
        }
        page.resetMaxLine()
      },

      setPano: function (pano) {
        if (album.data.features == null || album.data.features.autoplayflag == null || album.data.features.autoplayflag == '0') {
          autoPlayFlag = false
        } else {
          autoPlayFlag = true
        }
        if (panoView.getPanoId() == pano.panoId) {
          return
        }
        var isTest = (baseUrl == window.location.protocol + '//datatest.pano.visualbusiness.cn' ? 1 : 0)
        var panoId = (isTest ? '[TT]' : '') + pano.panoId
        panoView.markerdata = null
        panoView.notifyDataChanged()
        panoDetail = pano.panoInfo
        album.setIntro((album.data.albumList[floorIndex].albumInfo == undefined || album.data.albumList[floorIndex].albumInfo == null) ? album.data.albumInfo : album.data.albumList[floorIndex].albumInfo, (panoDetail == undefined || panoDetail == null) ? '' : panoDetail, (album.data.albumList[floorIndex].albumName == undefined || album.data.albumList[floorIndex].albumName == null) ? album.data.albumName : album.data.albumList[floorIndex].albumName, album.data.albumList[floorIndex].tipsList.join('/'))
        collectData('pano', panoId)
        panoView.setPanoId(panoId, function () {
          if (firstLoading == false) {
            panoView.panoViewInternal.setAutoplayEnable(true)
            firstLoading = true
          } else {
            panoView.panoViewInternal.setAutoplayEnable(autoPlayFlag)
            if (pano.markers) {
              album.setMarker(pano.markers)
            }
          }
          setTimeout(function () {
            panoView.setHeading(pano.panoHeading)
            panoView.setPitch(pano.panoPitch)
          }, 0)
        })
        httpPost('http://shunde.vizen.cn/shunde/pano/selectPanoInfoByPanoIds?panoIds=' + pano.panoId, {},
          function (e) {
            hasHistory = true
            album.panoHistoryDataHandle(e.data)
          },
          function () {
            console.log('没找到全景对应的poi历史')
          })
      },
      panoHistoryDataHandle: function (data) {
        v_pano_text_scroll.clearViews()
        v_pano_image_scroll.clearViews()
        if (data) {
          var cell = createTextItem(data[0].poi, data[0].poi.name)
          cell.setOnClick(function () {

          })
          cell.$('isActive').setVisible(true)
          v_pano_text_scroll.addView(cell)
          for (var i in data[0].panoList) {
            var cell = createImgItem(data[0].panoList[i],
              data[0].panoList[i].thumbnail,
              data[0].panoList[i].name,
              data[0].panoList[i].name)
            v_pano_image_scroll.addView(cell)
            if (i == 0) {
              cell.$('isActiveView').setVisible(true)
            }
            cell.setOnClick(function () {
            })
          }
        } else {
          // v_swithIcon.setVisible(false)
        }
      },

      setTime: function (pano) {
        if (pano.timeIcon == 'time' && pano.timePanoList.length > 1) {
          page.$('time').setGone(false)
          page.$('timeIc').setVisible(true)
          page.$('dayIc').setVisible(false)
          page.$('nightIc').setVisible(false)
          page.$('time').setOnClick(function () {
            popup.show('tPopup',
              {
                curPano: pano,
                setPano: album.setPano
              }, page)
          })
        } else if (pano.timeIcon == 'dayNight') {
          page.$('time').setGone(false)
          page.$('timeIc').setVisible(false)
          page.$('dayIc').setVisible(false)
          page.$('nightIc').setVisible(true)
          page.$('time').setOnClick(function () {
            album.setPano(pano.timePanoList[1 - !page.$('nightIc').visible])
            page.$('dayIc').setVisible(!page.$('dayIc').visible)
            page.$('nightIc').setVisible(!page.$('nightIc').visible)
          })
        } else {
          page.$('time').setGone(true)
        }
      },

      setVR: function (vrflag) {
        if (vrflag != '1') {
          return
        }
        page.$('vrOn').setGone(false)
        page.$('vrOn').setOnClick(function () {
          album.isVR = true
          infoArea.setVisible(false)
          panoView.setVREnable(true)
          page.$('vrOff').setVisible(true)
          panoView.panoViewInternal.setGravityEnable(true)
          panoView.panoViewInternal.setAutoplayEnable(false)
        })

        page.$('vrOff').setOnClick(function () {
          album.isVR = false
          infoArea.setVisible(true)
          panoView.setVREnable(false)
          page.$('vrOff').setVisible(false)
          page.resetMaxLine()
          album.isGravity = false
          page.$('gravityOn').setVisible(true)
          page.$('gravityOff').setVisible(false)
          if (getUrlParam('panoAutoPlay') != 'false') {
            setTimeout(function () {
              panoView.panoViewInternal.setAutoplayEnable(autoPlayFlag)
            }, 500)
          }
        })
      },
      setAudio: function (audioflag) {
        if (audioflag == '0' || audioflag == null) {
          return
        }
        page.$('audio').setGone(false)
        audioDom.setAttribute('src', album.data.features.music_url)
        var self = this
        self.playAudio()
        page.$('audio').setOnClick(function () {
          self.playAudio()
        })
      },
      //设置是否有重力感应
      setHasGravity: function (gravityFlag) {
        if (gravityFlag == '0' || gravityFlag == null) {
          page.$('gravity').setGone(true)
          return
        }
        album.setGravity()
      },
      setGravity: function () {
        page.$('gravity').setOnClick(function () {
          album.isGravity = !album.isGravity
          if (album.isGravity) {
            panoView.panoViewInternal.setAutoplayEnable(false)
            page.$('gravityOn').setVisible(false)
            page.$('gravityOff').setVisible(true)
          } else {
            if (getUrlParam('panoAutoPlay') != 'false') {
              setTimeout(function () {
                panoView.panoViewInternal.setAutoplayEnable(autoPlayFlag)
              }, 500)
            }
            page.$('gravityOn').setVisible(true)
            page.$('gravityOff').setVisible(false)
          }
          panoView.panoViewInternal.setGravityEnable(album.isGravity)
        })
      },
      playAudio: function () {
        if (audioDom) {
          console.dir(audioDom)
          if (audioDom._isPlaying) {
            audioDom._isPlaying = false
            audioDom.pause()
            clearInterval(audioIcLoop)
            page.$('musicOff').setVisible(true)
            page.$('musicOn').setVisible(false)
          } else {
            audioDom._isPlaying = true
            audioDom.play()
            page.$('musicOff').setVisible(false)
            page.$('musicOn').setVisible(true)
          }
        }
      },

      init: function (data) {
        ispc = isPC()
        if(ispc == false){
          page.$('contentOperate').setMarginRight('25dp')
          page.$('titleInfo').setMarginLeft('25dp')
          page.$('albumTitle').setFontSize('22dp')
          page.$('albumDate').setFontSize('14dp')
          page.$('goPano').setMarginRight('25dp')
          page.$('goPano').setWidth('24dp')
          page.$('goPano').setHeight('24dp')
          page.$('inImg').setHeight('24dp')
          page.$('viewInfo').setHeight('24dp')
          page.$('intoTxt').setFontSize('8dp')
        }
        v_panScrollHistoryBottom.setGone(true)
        v_goPano.setOnClick(function () {
          switch (v_goPano.clickKind) {
            case 'poiHistoryShow':
              v_swithIcon.setSrc('images/history_off.png')
              v_panScrollHistoryBottom.setGone(true)
              page.$('bottom').setGone(false)
              v_goPano.clickKind = 'poiHistoryMiss'
              break
            case 'poiHistoryMiss':
              v_panScrollHistoryBottom.setGone(false)
              page.$('bottom').setGone(true)
              v_swithIcon.setSrc('images/history_on.png')
              v_goPano.clickKind = 'poiHistoryShow'
              break
            default :
              v_swithIcon.setSrc('images/history_on.png')
              page.$('bottom').setGone(true)
              v_goPano.clickKind = 'poiHistoryShow'
              break
          }

          // v_music.setVisible(true);
        }),
          data.albumName = data.albumName.replace('_big5', '')
        if (!data.albumList[0] || !data.albumList[0].newPanoList) {
          window.hideVizenLoading()
          log('相册数据有误')
          return
        }
        album.setHasGravity(data.features ? data.features.gravityflag : '1')

        album.setAudio(data.features ? data.features.musicflag : '0')
        if (isAutoPlay) {
          var funcPlay = this.playAudio
          audioDom.autoplay = true
          audioDom._isPlaying = true
          page.$('musicOff').setVisible(false)
          page.$('musicOn').setVisible(true)
        }
        if (album.data.albumList[0].tipsList == undefined) {
          album.data.albumList[0].tipsList = []
        }
        setWechartTitle(data.albumName)
        if (album.data.albumList != []) {
          album.setIntro((album.data.albumList[0].albumInfo == undefined || album.data.albumList[0].albumInfo == null) ? album.data.albumInfo : album.data.albumList[0].albumInfo, (panoDetail == undefined || panoDetail == null) ? '' : panoDetail, (album.data.albumList[0].albumName == undefined || album.data.albumList[0].albumName == null) ? album.data.albumName : album.data.albumList[0].albumName, album.data.albumList[0].tipsList.join('/'))
        } else {
          album.setIntro((album.data.albumInfo || album.data.albumInfo == null) ? '' : album.data.albumInfo, (panoDetail == undefined || panoDetail == null) ? '' : panoDetail, (album.data.albumList[0].albumName == undefined || album.data.albumList[0].albumName == null) ? '' : album.data.albumName, album.data.albumList[0].tipsList.join('/'))
        }
        getShareInfoSub(null, data.albumName, data.albumInfo, data.albumList[0].panoList[0].thumbnailUrl)
        album.setCover(data.features ? data.features.h5_cover_url : null, data.features ? data.features.pc_cover_url : null)
        album.setLogo(getUrlParam('logoflag'))
        albumMenu.setAlbumList(data.albumList, album.setPano, album.setTime)
        albumMenu.getSelected = function (index) {
          floorIndex = index
          page.$('introTxt').setText(album.data.albumList[index].albumName)
        }
        album.setVR(data.features.vrflag)
        panoView.setOnClick(function () {
          if (page.$('funMenu').animation == null && page.$('bottom').animation == null) {
            if (page.$('funMenu').translateY) {
              translateYAnimation(page.$('funMenu'), -page.$('funMenu').frame.height, 0, 300)
              translateYAnimation(page.$('bottom'), page.$('albumMenu').frame.height, 0, 300)
            } else {
              translateYAnimation(page.$('funMenu'), 0, -page.$('funMenu').frame.height, 300)
              translateYAnimation(page.$('bottom'), 0, page.$('albumMenu').frame.height, 300)
            }
          }
        })
        page.$('back').setGone(false)
        page.$('back').setOnClick(function () {
          window.myIndexAlbum = 1
          v_goPano.clickKind = 'poiHistoryMiss'
          albumMenu.setIndex(0, 0, 0)
          alphaAnimation(infoArea, 0.99, 0, 500)
          albumMenu.setAlbumList(data.albumList, album.setPano, album.setTime)
          panoView.panoViewInternal.setAutoplayEnable(true)
          album.setCover(data.features ? data.features.h5_cover_url : null, data.features ? data.features.pc_cover_url : null)
          album.setIntro((album.data.albumList[0].albumInfo == undefined || album.data.albumList[0].albumInfo == null) ? album.data.albumInfo : album.data.albumList[0].albumInfo, (panoDetail == undefined || panoDetail == null) ? '' : panoDetail, (album.data.albumList[0].albumName == undefined || album.data.albumList[0].albumName == null) ? album.data.albumName : album.data.albumList[0].albumName, album.data.albumList[0].tipsList.join('/'))
        })
      },
      getUrlByAlbum: function (albumId) {
        return urlProvider('getUrlByAlbum') + albumId + '?lang=' + album.lang//相册接口
      },
      getUrlByPano: function (panoId) {
        return urlProvider('getUrlByPano') + '?panoId=' + panoId + '&lang=' + album.lang//相片接口
      },
      enter: function () {
        var self = this

        if (!albumId && !panoId) {
          window.hideVizenLoading()
          alert('需参数albumId或者panoId')
          return
        }

        /**
         * 老版特殊逻辑兼容支持:
         * 1. 可支持albumId和panoId打开相册
         * 2. 如albumId有值,以相册接口取无数据,再以相片接口取数据
         * 3. 如panoId有值,以相片接口取无数据,再以相册接口取数据
         */
        if (albumId) {
          httpGet(self.getUrlByAlbum(albumId), function (data) {
            //httpGet('album_pano.bundle/testdata/data.json', function (data) {
            if (data.result != 0 && data != null && data.data == null) {
              httpGet(self.getUrlByPano(albumId), self.onSuccess, self.onError)
              return
            }
            collectData(null, albumId)
            self.onSuccess(data)
          }, self.onError)
        } else if (panoId) {
          httpGet(self.getUrlByPano(panoId), function (data) {
            if (data.result != 0 && data != null && data.data == null) {
              httpGet(self.getUrlByAlbum(panoId), self.onSuccess, self.onError)
              return
            }
            collectData('pano', panoId)
            self.onSuccess(data)
          }, self.onError)
        }
      },
      onSuccess: function (data) {
        window.hideVizenLoading()
        if (data.result != 0) {
          log(data.msg)
          return
        }
        if (data == null) {
          log('相册数据有误')
          return
        }
        if (data.data == null) {
          log('相册数据有误')
          return
        }
        album.data = utils.dataProcessor(data.data)
        page.onPageWillShown = function () {
          album.init(album.data)
        }
      },
      onError: function (XMLHttpRequest, textStatus, errorThrown) {
        window.hideVizenLoading()
        log(XMLHttpRequest.status)
        log(XMLHttpRequest.readyState)
        log(textStatus)
      }
    }

    if (Platform.appengineMobile) {
      log('该平台暂不支持全景引擎!!')
      window.hideVizenLoading()
      return
    } else {
      album.enter()
    }

    return page
  })
