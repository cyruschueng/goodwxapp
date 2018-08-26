let app = getApp()
Page(Object.assign({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      iconPath: "/image/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
      anchor:{x:.5,y:0.8},
      title:'创意图',
      callout: { content:'创意图地标建筑'},
      label:{content:'起点'},
      alpha:0.5
    }, {
      iconPath: "/image/location.png",
      id: 0,
      latitude: 23.112600,
      longitude: 113.324520,
      width: 50,
      height: 50,
      anchor: { x: .5, y: 0.8 },
      label: { content: '终点' },
      alpha: 0.3,
      title:'河岸'
    }],
    circles: [{
      latitude: 23.099994,
      longitude: 113.324520,
      color: "#ff0000",
      fillColor: "#00000010",
      strokeWidth: 0,
      radius: 120
    }, {
      latitude: 23.112600,
      longitude: 113.324520,
      color: "#ff0000",
      fillColor: "#00000010",
      strokeWidth: 0,
      radius: 100
    }],
    polyline: [{
      points: [{
        latitude: 23.099994,
        longitude: 113.324520
      }, {
        latitude: 23.112600,
        longitude: 113.324520,
      }],
      color: "#ff0000",
      width: 3,
      dottedLine: true,
      arrowLine: true
    }]
  },
  onLoad() {
    this.setData({
      scale: 14
    })
  },
  onTap(e) {
    console.log(e)
  },
  changeLocation(e) {
    var location = e.currentTarget.dataset.location
    let markers = this.data.markers
    if (location == 1) {
      this.setData({
        latitude: markers[0].latitude,
        longitude: markers[0].longitude
      })
    } else {
      this.setData({
        latitude: markers[1].latitude,
        longitude: markers[1].longitude
      })
    }
  }
}, app.page))