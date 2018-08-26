<template>
  <div id="map-all-container">
    <common-container
      :gridCode="gridCode"
      showSelect
      gap="0px"
      :open-shadow="openShadow"
      @exceptionClick="ec"
      @left-select-change="leftSelectChange"
      :exception-text="exceptionText"
      @cell-click="cc"
      :highLightImg="area.img"
      :exceptionIsSelected="!isRegular">
      <div id="new-roam">
        <div id="head">
          <h2 id="head-title">
            <template v-if="isRegular">
              <span v-if="!areaIdIsEmpty">区域-<span class="blue-span">{{area.name}}</span></span>
              <span v-if="!gridCodeIsEmpty">网格-<span class="blue-span">{{gridCode}}</span></span>
            </template>
          </h2>

          <el-select
            v-model="value9"
            filterable
            remote
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            @change="searchClick"
            :loading="loading">
            <el-option
              size="mini"
              v-for="item in options4"
              :key="item.id"
              :label="item.label"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="line"></div>
        <div class="cell-item-container">
          <cell-item :title="totalPoiCount" sub-title="Poi全景点数共计" class="space-cell-item"
                     icon="static/space/img/v1.png"></cell-item>
          <cell-item :title="skyPoiCount" sub-title="空中全景数量" class="space-cell-item"
                     icon="static/space/img/v2.png"></cell-item>
          <cell-item :title="groundPoiCount" sub-title="地面全景数量" class="space-cell-item"
                     icon="static/space/img/v3.png"></cell-item>
        </div>
        <div class="list-container">
          <item v-for="item in itemArray" :itemData="item" :panoId="item.panoId" :panoName="item.name"
                :panoType="item.cameraType"
                :imgUrl="item.thumbnail" @itemclick="itemClick"/>
        </div>
      </div>
    </common-container>
    <div class="pano-container3" v-loading.fullscreen.lock="fullScreenLoading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)" v-show="isShowPano">
      <div class="pano-container2">
        <div class="pano-container">
          <div id="pano-all-pc">
          </div>
        </div>
        <canvas id="edit-canvas"
                v-show="isCanvasExist"
                @mousedown.stop="mouseDownHandler($event)"
                @mousemove.stop="mouseMoveHandler($event)"
                @mouseup.stop="mouseUpHandler($event)"
                @mouseleave.stop="mouseOutHandler($event)"></canvas>
        <div class="pano-top">
          <div class="close" @click="closePano">
            <img class="close-icon" src="/static/back.png"/>
          </div>
          <div class="icon-container1">
            <div class="edit-bg" v-show="!isVr&&!isEdit&&!isCanvasExist" @click="playPano">
              <img class="play-icon" :src="playUrl"/>
            </div>
            <div class="canvas-bg" v-show="!isVr&&!isEdit" @click="editCanvasClick">
              <img class="canvas-icon" :src="canvasIconUrl"/>
            </div>
            <div class="edit-bg" v-show="!isVr&&!isCanvasExist" @click="editMarkerClick">
              <img class="edit-icon" :src="editUrl"/>
            </div>
            <div class="vr-bg" v-show="!isEdit&&!isCanvasExist" @click="vrClick">
              <img class="vr-icon" :src="vrUrl"/>
            </div>
            <div class="share-bg" @click="shareClick">
              分享链接
            </div>
          </div>
        </div>
        <div class="icon-container2" v-show="isEdit">
          <div class="edit-bg" @click="addMarker">
            添加
          </div>
          <div class="vr-bg" @click="commitList">
            提交
          </div>
        </div>
        <div class="icon-container3" v-show="isCanvasExist">
          <div class="edit-bg" @click="clearCanvasAll">
            取消
          </div>
          <div class="vr-bg" @click="saveCanvas">
            保存
          </div>
        </div>
        <div class="pano-name">
          {{panoName}}
        </div>
        <textarea id="copy-text" :value='copyUrl'></textarea>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogCanvasVisible"
      top="200px"
      width="300px">
      <span>是否要删除该划线部分</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="sureDeleteCanvas">确定</el-button>
    <el-button @click="dialogCanvasVisible=false">取消</el-button>
        </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      top="200px"
      width="300px">
      <span>选择你要进行的操作</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="chooseEditMarker">编辑</el-button>
    <el-button type="primary" @click="chooseDeleteMarker">删除</el-button>
  </span>

    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible2"
      top="200px"
      width="300px">
      <span>你确定要删除该marker点吗</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="sureDeleteMarker">确定</el-button>
      <el-button type="primary" @click="dialogVisible2 = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog top="200px" width="300px" title="编辑marker点" :visible.sync="dialogFormVisible">
      <el-form>
        <el-input v-model="markerName" auto-complete="off"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEditComplete">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import commonContainer from './commonContainer.vue'
  import cellItem from './cellItem.vue'
  import myDialog from './myDialog.vue'
  import poiArea from './poiArea.vue'
  import btn from '../btn.vue'
  import item from './panoCell.vue'
  let panoView = null
  let View = null
  let self = null
  let context = null
  let mCanvas = null
  let dummyMarker = null
  let ImageView = null
  export default {
    components: {commonContainer, cellItem, myDialog, poiArea, btn, item},
    created () {
      this.netRequests(false)
    },
    mounted () {
      self = this
      mCanvas = document.getElementById('edit-canvas')
      mCanvas.width = window.innerWidth
      mCanvas.height = window.innerHeight
      context = mCanvas.getContext('2d')
      this.initVizenEngine()
    },
    data () {
      return {
        itemArray: [],
        markerName: '',
        dialogVisible: false,
        dialogVisible2: false,
        dialogFormVisible: false,
        isShowPano: false,
        fullScreenLoading: false,
        dialogCanvasVisible: false,
        value9: [],
        loading: false,
        options4: [],
        pageTotal: 0,
        pageSize: this.$store.state.config.pageSize,
        poiSearchParam: {
          pageNum: 1,
          pageSize: this.$store.state.config.pageSize,
          areaId: '',
          gridCode: ''
        },
        errorPoiSearchParam: {
          pageNum: 1,
          pageSize: this.$store.state.config.pageSize
        },
        totalPoiCount: 0,
        skyPoiCount: 0,
        groundPoiCount: 0,
        openShadow: false,
        showAlert: false,
        selectedCell: '',
        allSelectHeadShow: false,
        poiClickTrigger: false,
        exceptionText: 0,
        allSelectCheckbox: false,
        pois: null,
        poiChecked: false,
        trueViews: [],
        truePois: [],
        pldeleteClass: 'delete-btn',
        searchInput: '',
        tags: [],
        tagContainerStyle: {
          overflow: 'visible'
        },
        jtFlag: true,
        isRegular: true,
        pageChange: false,
        poiList: [],
        isEdit: false,
        isPlay: false,
        isCanvasExist: false,
        isVr: false,
        panoList: [],
        currentPanoId: '',
        markerCommitList: [],
        markerList: [],
        currentMarker: null,
        panoName: '',
        isMouseDown: '',
        clickPoint: [],
        selectCanvasID: '',
        clickDrag: []
      }
    },
    computed: {
      copyUrl () {
        const sData = {
          panoId: this.currentPanoId,
          userName: this.$cookie.get('username')
        }
        return 'http://webapp.vizen.cn/shunde_pano_share_debug/index.html?sData=' + encodeURIComponent(JSON.stringify(sData))
      },
      editUrl () {
        return this.isEdit ? '/static/marker_off.png' : '/static/marker_on.png'
      },
      vrUrl () {
        return this.isVr ? '/static/vr_off.png' : '/static/vr_on.png'
      },
      playUrl () {
        return this.isPlay ? '/static/stop.png' : '/static/play.png'
      },
      canvasIconUrl () {
        return this.isCanvasExist ? '/static/canvas_off.png' : '/static/canvas_on.png'
      },
      area () {
        for (let i = 0; i < this.$store.state.config.shunDeCode.length; i++) {
          let code = this.$store.state.config.shunDeCode[i]
          if (code.code === this.areaId) {
            return {
              name: code.code === '' ? '' : code.name,
              img: code.img
            }
          }
        }
        return {
          name: '',
          img: ''
        }
      },
      gridCode: {
        get () {
          return this.poiSearchParam.gridCode
        },
        set (v) {
          this.poiSearchParam.gridCode = v
        }
      },
      gridCodeIsEmpty () {
        return this.$utils.isEmpty(this.gridCode)
      },
      errorPageNum: {
        get () {
          return this.errorPoiSearchParam.pageNum
        },
        set (v) {
          this.errorPoiSearchParam.pageNum = v
        }
      },
      areaId: {
        get () {
          return this.poiSearchParam.areaId
        },
        set (v) {
          this.poiSearchParam.areaId = v
        }
      },
      areaIdIsEmpty () {
        return this.$utils.isEmpty(this.areaId)
      }
    },
    watch: {
      poiSearchParam: {
        deep: true,
        handler (newValue, oldValue) {
          let showFlag = true
          if (this.areaIdIsEmpty && this.gridCodeIsEmpty && this.searchNameIsEmpty) {
            showFlag = false
          }
          if (!this.isRegular && this.areaIdIsEmpty && this.gridCodeIsEmpty && this.searchNameIsEmpty) {
          } else {
            this.isRegular = true
          }
          this.netRequests(showFlag, !this.pageChange)
          this.pageChange = false
        }
      },
      allSelectCheckbox (val) {
        this.poiChecked = val
      },
      isRegular (v) {
        if (!v) {
          this.gridCode = ''
          this.areaId = ''
          this.searchName = ''
        }
      },
      searchName (v) {
        this.searchInput = v
      }
    },
    methods: {
      clearCanvas () {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      },
      clearCanvasAll () {
        this.clearCanvas()
        this.clickPoint = []
      },
      sureDeleteCanvas () {
        this.dialogCanvasVisible = false
        this.$api.deleteCanvasData(self.selectCanvasID).then(res => {
          self.getMarkerData()
        }).catch(er => {
        })
      },
      getCanvasData () {
        let maxX = this.getArrMax(this.clickPoint, 'x')
        let minX = this.getArrMin(this.clickPoint, 'x')
        let maxY = this.getArrMax(this.clickPoint, 'y')
        let minY = this.getArrMin(this.clickPoint, 'y')
        let imgDataA = context.getImageData(minX, minY, maxX - minX + 2, maxY - minY + 2)
        let canvas1 = document.createElement('canvas')
        canvas1.setAttribute('width', maxX - minX + 2)
        canvas1.setAttribute('height', maxY - minY + 2)
        canvas1.setAttribute('id', 'canvas1')
        let context1 = canvas1.getContext('2d')
        context1.putImageData(imgDataA, 0, 0, 0, 0, maxX - minX + 2, maxY - minY + 2)
        let dataURL = canvas1.toDataURL('image/png')
        if (dummyMarker == null) {
          dummyMarker = new ImageView()
        }
        dummyMarker.setSrc(dataURL)
        dummyMarker.setWidth(maxX - minX + 2 + 'dp')
        dummyMarker.setHeight(maxY - minY + 2 + 'dp')
        dummyMarker.setAnchorX(0)
        dummyMarker.setAnchorY(0)
        let headingPitch = panoView.panoViewInternal.getHeadingPitchByXY(minX, minY, dummyMarker)
        return {
          image: dataURL.split(',')[1],
          width: maxX - minX + 2,
          height: maxY - minY + 2,
          heading: headingPitch.heading,
          pitch: headingPitch.pitch,
          panoId: this.currentPanoId
        }
      },
      createCanvasMarker (data) {
        let marker = new ImageView()
        marker._nativeView.div.style.zIndex = 100
        marker.canvasId = data.id
        marker.dragEnable = false
        marker.type = 2
        marker.canvasId = data.id
        marker.setSrc(data.imageUrl)
        marker.setWidth(data.width + 'dp')
        marker.setHeight(data.height + 'dp')
        marker.setAnchorX(0)
        marker.setAnchorY(0)
        marker.panoHeading = data.heading
        marker.panoPitch = data.pitch
        return marker
      },
      getMarkerData () {
        self.markerList = []
        this.$api.getCanvasData({panoId: self.currentPanoId}).then(res => {
          let list = res.data
          for (var i = 0; i < list.length; i++) {
            let cell = this.createCanvasMarker(list[i])
            self.markerList.push(cell)
          }
          panoView.setAdaptor({
            getView: function (index) {
              var cell = self.markerList[index]
              cell._nativeView.div.style.cursor = 'pointer'
              cell._nativeView.div.cell = cell
              cell.setOnClick(function () {
                if (this.type === 2) {
                  self.selectCanvasID = this.canvasId
                  self.dialogCanvasVisible = true
                } else {
                  if (!self.isEdit) {
                    return
                  }
                  self.dialogVisible = true
                  self.currentMarker = this._nativeView.div.cell
                }
              })
              if (cell) {
                return cell
              } else {
                return null
              }
            },
            getCount: function () {
              return self.markerList.length
            }
          })
        }).catch(er => {
        })
        this.$api.getMarkerData({
          panoId: self.currentPanoId
        }).then(res => {
          if (res.code !== 0) {
            return
          }
          let list = res.data
          for (var i = 0; i < list.length; i++) {
            var cell = View.parse({
              width: 'wrap',
              height: 'wrap',
              panoHeading: list[i].heading,
              panoPitch: list[i].pitch,
              children: [
                {
                  id: 'icon',
                  type: 'ImageView',
                  marginTop: '10dp',
                  width: '100dp',
                  height: 'wrap',
                  src: '../../static/icon-circle.png',
                  gravity: 'centerHorizontal'
                },
                {
                  layout: 'frame',
                  height: 'wrap',
                  width: '130dp',
                  contentGravity: 'centerHorizontal',
                  children: [{
                    type: 'ImageView',
                    width: '130dp',
                    height: 'wrap',
                    src: '../../static/icon-text-bg.png'
                  }, {
                    id: 'markerName',
                    type: 'TextView',
                    text: list[i].signName,
                    fontColor: '#ffffff',
                    width: 'fill',
                    marginLeft: '13dp',
                    marginRight: '13dp',
                    marginTop: '20dp',
                    height: 'wrap',
                    fontSize: '14px',
                    color: '#ffffff',
                    contentGravity: 'center'
                  }]
                }]
            })
            cell.name = list[i].signName
            self.markerList.push(cell)
          }
          panoView.setAdaptor({
            getView: function (index) {
              var cell = self.markerList[index]
              cell._nativeView.div.zIndex = 100
              cell._nativeView.div.style.cursor = 'pointer'
              cell._nativeView.div.cell = cell
              // cell._nativeView.div.addEventListener('click', function () {
              //   if (!self.isEdit) {
              //     return
              //   }
              //   self.dialogVisible = true
              //   self.currentMarker = this.cell
              // })
              cell.setOnClick(function () {
                if (this.type === 2) {
                  self.selectCanvasID = this.canvasId
                  self.dialogCanvasVisible = true
                } else {
                  if (!self.isEdit) {
                    return
                  }
                  self.dialogVisible = true
                  self.currentMarker = this._nativeView.div.cell
                }
              })
              if (cell) {
                return cell
              } else {
                return null
              }
            },
            getCount: function () {
              return self.markerList.length
            }
          })
        }).catch(res => {
        })
      },
      saveCanvas () {
        if (this.clickPoint.length === 0) {
          return
        }
        this.isCanvasExist = false
        this.$api.commitCanvasData(this.getCanvasData()).then(res => {
          self.clearCanvasAll()
          self.getMarkerData()
        }).catch(er => {
          self.clearCanvasAll()
        })
      },
      addClick (x, y, dragging) {
        this.clickPoint.push({x: x, y: y})
        this.clickDrag.push(dragging)
      },
      getArrMax (arr, property) {
        let max = arr[0][property]
        for (let i = 1; i < arr.length; i++) {
          if (arr[i][property] > max) {
            max = arr[i][property]
          }
        }
        return max
      },
      getArrMin (arr, property) {
        let min = arr[0][property]
        for (let i = 1; i < arr.length; i++) {
          if (arr[i][property] < min) {
            min = arr[i][property]
          }
        }
        return min
      },
      draw () {
        this.clearCanvas()
        for (let i = 0, len = this.clickPoint.length; i < len; i++) {
          context.beginPath()
          if (this.clickDrag[i] && i) {
            context.moveTo(this.clickPoint[i - 1].x, this.clickPoint[i - 1].y)
          } else {
            context.moveTo(this.clickPoint[i].x, this.clickPoint[i].y)
          }
          context.lineTo(this.clickPoint[i].x, this.clickPoint[i].y)
          context.closePath()
          context.strokeStyle = '#ff0000'
          context.lineJoin = 'round'
          context.lineWidth = '2px'
          context.stroke()
        }
        context.restore()
        context.globalAlpha = 1 // No IE support
      },
      mouseDownHandler (e) {
        this.isMouseDown = true
        let x = e.clientX
        let y = e.clientY
        this.addClick(x, y, false)
        this.draw()
      },
      mouseUpHandler () {
        this.isMouseDown = false
      },
      mouseMoveHandler (e) {
        if (this.isMouseDown) {
          let x = e.clientX
          let y = e.clientY
          this.addClick(x, y, true)
          this.draw()
        }
      },
      mouseOutHandler (e) {
        this.isMouseDown = false
      },
      vrClick () {
        this.isVr = !this.isVr
        this.isEdit = false
        this.isPlay = false
        if (this.currentPanoId) {
          if (panoView) {
            panoView.setVREnable(this.isVr)
            panoView.setAutoplayEnable(this.isPlay)
          }
        }
      },
      shareClick () {
        document.getElementById('copy-text').select()
        document.execCommand('Copy')
        this.$message.success('已复制好分享链接，可贴粘。')
      },
      editMarkerClick () {
        this.isEdit = !this.isEdit
        this.isPlay = false
        panoView.setAutoplayEnable(this.isPlay)
        panoView.setMarkerDragEnable(this.isEdit)
      },
      editCanvasClick () {
        this.isCanvasExist = !this.isCanvasExist
        this.isPlay = false
        panoView.setAutoplayEnable(this.isPlay)
        if (this.isCanvasExist) {
          this.clickPoint = []
        }
      },
      playPano () {
        this.isPlay = !this.isPlay
        panoView.setAutoplayEnable(this.isPlay)
      },
      itemClick (panoId, panoName) {
        if (panoId.trim() === '') {
          return
        }
        this.$api.panoStatistics({panoId: this.currentPanoId})
        this.currentPanoId = panoId
        this.panoName = panoName
        if (panoView) {
          this.isShowPano = true
          this.fullScreenLoading = true
          panoView.setPanoId(panoId, function () {
            self.fullScreenLoading = false
          })
          window.rootView.requestLayout()
          this.getMarkerData()
        }
      },
      closePano () {
        this.isShowPano = false
        this.isCanvasExist = false
      },
      chooseEditMarker () {
        this.dialogVisible = false
        this.dialogFormVisible = true
      },
      chooseDeleteMarker () {
        this.dialogVisible = false
        this.dialogVisible2 = true
      },
      sureEditComplete () {
        this.dialogFormVisible = false
        this.currentMarker.$('markerName').setText(self.markerName)
        this.currentMarker.name = self.markerName
      },
      sureDeleteMarker () {
        this.dialogVisible2 = false
        if (this.currentMarker) {
          for (var i = 0; i < this.markerList.length; i++) {
            if (this.currentMarker === this.markerList[i]) {
              this.markerList.splice(i, 1)
              break
            }
          }
          if (panoView) {
            panoView.setAdaptor(
              {
                getView: function (index) {
                  var cell = self.markerList[index]
                  cell._nativeView.div.zIndex = 100
                  cell._nativeView.div.style.cursor = 'pointer'
                  cell._nativeView.div.cell = cell
                  cell._nativeView.div.addEventListener('click', function () {
                    if (!self.isEdit) {
                      return
                    }
                    self.dialogVisible = true
                    self.currentMarker = this.cell
                  })
                  if (cell) {
                    return cell
                  } else {
                    return null
                  }
                },
                getCount: function () {
                  return self.markerList.length
                }
              })
          }
        }
      },
      addMarker () {
        var cell = View.parse({
          width: 'wrap',
          height: 'wrap',
          panoHeading: panoView.getHeading(),
          panoPitch: panoView.getPitch(),
          children: [
            {
              id: 'icon',
              type: 'ImageView',
              marginTop: '10dp',
              width: '100dp',
              height: 'wrap',
              src: '../../static/icon-circle.png',
              gravity: 'centerHorizontal'
            },
            {
              layout: 'frame',
              height: 'wrap',
              width: '130dp',
              contentGravity: 'centerHorizontal',
              children: [{
                type: 'ImageView',
                width: '130dp',
                height: 'wrap',
                src: '../../static/icon-text-bg.png'
              }, {
                id: 'markerName',
                type: 'TextView',
                text: '',
                fontColor: '#ffffff',
                width: 'fill',
                marginLeft: '13dp',
                marginRight: '13dp',
                marginTop: '20dp',
                height: 'wrap',
                fontSize: '14px',
                color: '#ffffff',
                contentGravity: 'center'
              }]
            }]
        })
        cell.dragEnable = true
        this.markerList.push(cell)
        if (View) {
          if (panoView) {
            panoView.setAdaptor({
              getView: function (index) {
                var cell = self.markerList[index]
                cell._nativeView.div.type = '1'
                cell._nativeView.div.zIndex = 100
                cell._nativeView.div.style.cursor = 'pointer'
                cell._nativeView.div.cell = cell
                // cell._nativeView.div.addEventListener('click', function () {
                //   if (!self.isEdit) {
                //     return
                //   }
                //   self.dialogVisible = true
                //   self.currentMarker = this.cell
                // })
                cell.setOnClick(function () {
                  if (this.type === 2) {
                    self.selectCanvasID = this.canvasId
                    self.dialogCanvasVisible = true
                  } else {
                    if (!self.isEdit) {
                      return
                    }
                    self.dialogVisible = true
                    self.currentMarker = this._nativeView.div.cell
                  }
                })
                if (cell) {
                  return cell
                } else {
                  return null
                }
              },
              getCount: function () {
                return self.markerList.length
              }
            })
          }
        }
      },
      commitList () {
        let data = []
        for (var i = 0; i < this.markerList.length; i++) {
          if (this.markerList[i].type !== 2) {
            var itemData = {
              signName: this.markerList[i].name,
              heading: this.markerList[i].panoHeading,
              pitch: this.markerList[i].panoPitch
            }
            data.push(itemData)
          }
        }
        data = JSON.stringify(data)
        this.$api.commitMarkerData({
          panoId: self.currentPanoId,
          data: data
        }).then(res => {
          if (res.code !== 0) {
            self.$message.error('保存失败')
            return
          }
          self.$message.success('保存成功')
        }).catch(res => {
          self.$message.error('保存失败')
        })
      },
      remoteMethod (str) {
        if (str.trim() === '') {
          return
        }
        this.$api.searchPoiListForPhone({
          searchName: str
        }).then(res => {
          if (res.code !== 0) {
            this.$message.error('获取数据失败')
            return
          }
          this.options4 = res.data
        }).catch(res => {
          this.$message.error('获取数据失败')
        })
      },
      searchClick (str) {
        if (str.trim() === '') {
          return
        }
        let poiId = ''
        for (var i = 0; i < this.options4.length; i++) {
          if (str.trim() === this.options4[i].name) {
            poiId = this.options4[i].id
            break
          }
        }
        this.itemArray = []
        this.gridCode = ''
        this.$api.getPanoListForPhone({poiId: poiId}).then(res => {
          if (res.code !== 0) {
            return
          } else {
            let list = res.data
            for (var i = 0; i < list.length; i++) {
              this.itemArray.push(list[i])
            }
          }
        })
      },
      initVizenEngine () {
        /* eslint-disable no-new */
        new window.com.vizengine.App(document.getElementById('pano-all-pc'), function () {
          panoView = new window.com.vizengine.view.PanoView()
          View = window.com.vizengine.view.View
          ImageView = window.com.vizengine.view.ImageView
          panoView.setVREnable(false)
          panoView.setMouseWheelEnable(false)
          panoView.panoViewInternal.setAutoplayEnable(false)
          panoView.setKeyEnable(false)
          panoView._nativeView.div.style.position = 'absolute'
          return panoView
        })
      },
      leftSelectChange (v) { // code是string
        this.areaId = v
      },
      dealTagsData (data) {
        data.splice(0, 0, {
          'isValid': 1,
          'tagId': '',
          'tagName': '全部'
        })
        return data
      },
      editOnePanoClick (poiData, panoData) {
        this.showUpdateRukuDialog = true
        this.dataUpdateRukuDialogPoi = poiData
        this.dataUpdateRukuDialogPano = panoData
      },
      ec (val) {
        this.isRegular = !val
        this.netRequestError(!this.isRegular)
      },
      tagJtClick () {
        if (this.tagContainerStyle.overflow === 'hidden') {
          this.tagContainerStyle.overflow = 'visible'
        } else {
          this.tagContainerStyle.overflow = 'hidden'
        }
      },
      cc (row, col, selectedCell, leftTopPoint, rightBottomPoint, isSelected) {
        this.gridCode = isSelected ? selectedCell : ''
        let self = this
        this.itemArray = []
        if (this.gridCode === '') {
          return
        }
        this.$api.getPoiListForPhone({gridCode: this.gridCode}).then(res => {
          if (res.code !== 0) {
            this.$message.error(res.msg ? res.msg : '获取数据失败')
            return
          } else {
            self.poiList = res.data
            for (var i = 0; i < self.poiList.length; i++) {
              self.$api.getPanoListForPhone({poiId: self.poiList[i].id}).then(res => {
                if (res.code !== 0) {
                  return
                } else {
                  let list = res.data
                  for (var i = 0; i < list.length; i++) {
                    self.itemArray.push(list[i])
                  }
                }
              })
            }
          }
        }).catch(res => {
          this.$message.error('获取数据失败')
        })
      },
      netRequests (showFlag, setPoisNull) {
        if (setPoisNull === undefined || setPoisNull === true) {
          this.pois = null
          this.pageTotal = 0
        }
        this.$api.getPanoInfoCensus(this.poiSearchParam).then(res => {
          this.totalPoiCount = res.data.poiCount
          this.skyPoiCount = res.data.skyCount
          this.groundPoiCount = res.data.groundCount
        }).catch(e => {
        })
        if (showFlag === undefined || showFlag === true) {
          this.$api.searchPoiPage(this.poiSearchParam).then(res => {
            this.pois = res.data.list
            this.pageTotal = res.data.total
          }).catch(er => {
          })
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  $head-height: 50px;
  $space-bg-color: #ffffff;
  $space-blue: #1bb1e6;
  #map-all-container {
    position: relative;
    margin-top: 100px;
    img {
      -webkit-user-drag: none;
    }
  }

  .pano-container3 {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .pano-container2 {
      position: relative;
      height: 100%;
      .pano-container {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        #pano-all-pc {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgb(255, 255, 255);
        }
      }
      #edit-canvas {
        position: absolute;
        display: block;
        z-index: 100;
        width: 100%;
        height: 100%;
      }
      .pano-top {
        position: absolute;
        width: 100%;
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .close {
        width: 50px;
        z-index: 120;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.5);
        padding: 8px 15px 8px 15px;
        height: 36px;
        border-radius: 2px;
        .close-icon {
          width: 20px;
          height: 20px;
        }
      }
      .icon-container1 {
        width: auto;
        top: 10px;
        right: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .vr-bg {
          z-index: 120;
          background: rgba(0, 0, 0, 0.5);
          margin-right: 20px;
          padding: 8px 15px 8px 15px;
          height: 36px;
          width: 50px;
          border-radius: 2px;
          .vr-icon {
            width: 20px;
            height: 20px;
          }
        }
        .share-bg {
          z-index: 120;
          background: rgba(0, 0, 0, 0.5);
          padding: 8px 15px 8px 15px;
          height: 36px;
          width: auto;
          border-radius: 2px;
          color: #ffffff;
          font-size: 10px;
        }
        .edit-bg {
          z-index: 120;
          width: 50px;
          margin-right: 20px;
          background: rgba(0, 0, 0, 0.5);
          padding: 8px 15px 8px 15px;
          height: 36px;
          border-radius: 2px;
          .edit-icon {
            width: 20px;
            height: 20px;
          }
          .play-icon {
            width: 20px;
            height: 20px;
          }
        }
        .canvas-bg {
          z-index: 120;
          width: 50px;
          margin-right: 20px;
          background: rgba(0, 0, 0, 0.5);
          padding: 8px 15px 8px 15px;
          height: 36px;
          border-radius: 2px;
          .canvas-icon {
            width: 20px;
            height: 20px;
          }
        }

      }
      .pano-name {
        position: absolute;
        bottom: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.5);
        padding: 3px 10px 5px;
        font-size: 14px;
        width: auto;
        color: white;
      }
      .copy-text {
        z-index: -1;
      }
      .icon-container2 {
        position: absolute;
        right: 10px;
        top: 70px;
        width: 120px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .vr-bg {
          z-index: 120;
          background: rgba(0, 0, 0, 0.5);
          height: 36px;
          width: 70px;
          font-size: 10px;
          text-align: center;
          color: white;
          padding-top: 10px;
          border-radius: 2px;
        }
        .edit-bg {
          z-index: 120;
          width: 70px;
          font-size: 10px;
          color: white;
          margin-right: 20px;
          background: rgba(0, 0, 0, 0.5);
          text-align: center;
          padding-top: 10px;
          height: 36px;
          border-radius: 2px;
        }
      }
      .icon-container3 {
        position: absolute;
        right: 10px;
        top: 70px;
        width: 120px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .vr-bg {
          z-index: 120;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.5);
          height: 36px;
          width: 70px;
          font-size: 10px;
          text-align: center;
          color: white;
          padding-top: 10px;
          border-radius: 2px;
        }
        .edit-bg {
          cursor: pointer;
          z-index: 120;
          width: 70px;
          font-size: 10px;
          color: white;
          margin-right: 20px;
          background: rgba(0, 0, 0, 0.5);
          text-align: center;
          padding-top: 10px;
          height: 36px;
          border-radius: 2px;
        }
      }
    }
  }

  #new-roam {
    position: relative;
    display: flex;
    background: #FFFFFF;
    height: 100%;
    flex-direction: column;
    .list-container {
      display: flex;
      flex-wrap: wrap;
      width: 88.5%;
      height: auto;
    }
  }

  .line {
    flex: 0 0 auto;
    height: 1px;
    background: #dedede;
    margin-bottom: 18px;
  }

  .dialog-poi {
    width: 700px;
    height: 700px;
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .dialog-poi-top {
      height: 50px;
      background: #ffffff;
      display: flex;
      align-items: center;
    }
  }

  #head {
    height: $head-height;
    display: flex;
    flex-direction: row;
    background: #ffffff;
    justify-content: space-between;
    align-items: center;
    .el-select {
      width: auto;
      min-width: 200px;
      margin-right: 10px;
    }
    #head-title {
      font-size: 21px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      margin: 0;
      letter-spacing: 1.1px;
      color: #373737;
      .blue-span {
        color: #1bb1e6
      }
    }
    #all-select-head {
      display: flex;
      align-items: center;

      label {
        color: #888;
        font-size: 13px;
        font-weight: 300;
      }
      .delete-btn {
        font-size: 11.5px;
        border: 1px solid #ccc;
        border-radius: 2px;
        padding: 1px 3px;
        color: #ccc;
        margin-left: 12px;
        cursor: default;
      }
      .delete-btn-active {
        border: 1px solid #ef4a4a;
        color: #ef4a4a;
        cursor: pointer;
      }
    }
  }

  .search-bar {
    flex: 0 0 auto;
    display: flex;
    margin-bottom: 20px;
    .left-search {
      flex: 0 0 auto;
      .search-input {
        width: 200px;
        margin-right: 30px;
      }
    }
    .right-tag {
      flex: 1 0 0;
      display: flex;
      align-items: center;
      height: 32px;
      .name {
        color: #888;
        font-size: 12.5px;
      }
      .tag-container {
        width: 350px;
        display: flex;
        flex-wrap: wrap;
        align-self: flex-start;
        align-items: flex-start;
        margin-top: 5px;
        .tag {
          color: #888;
          font-size: 12px;
          border: 1px solid #999;
          padding: 1px 1.5px;
          border-radius: 4px;
          margin-right: 8px;
          font-weight: 300;
          margin-bottom: 7.5px;
        }
        .active {
          background: $space-blue;
          color: #fff;
          border-color: $space-blue;
        }
      }
      .tag-jt {
        color: #999;
        font-size: 10px;
        border: 1px solid #999;
        border-radius: 2px;
        padding: 1px;
      }
      .rotate {
        transform: rotate(180deg);
      }
    }
    .overflow-hidden {
      overflow: hidden;
    }
  }

</style>
