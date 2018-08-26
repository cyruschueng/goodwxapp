/**
 * API -- Location
 * 
 * 位置信息
 */

module.exports = {
  _get(opts) {
    const _opts = {
      type: 'String, 默认为：wgs84 返回gps坐标，gcj02返回用于wx.openLocation的坐标',
      altitude: 'Boolean, >=1.6.0, true会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度',
      success(res) {
        const _res = {
          latitude: '纬度，浮点数，范围：-90~90，负数表示南纬',
          longitude: '经度，浮点数，范围：-180~180，负数表示西经',
          speed: '速度，浮点数，单位：m/s',
          accuracy: '位置的精确度',
          altitude: '高度，单位：m',
          verticalAccurancy: '垂直精度，单位：m(Andriod无法获取，返回0)',
          horizontalAccurancy: '水平精度，单位m'
        }
      },
      fail(res) {},
      complete(res) {}
    }

    wx.getLocation(opts || _opts)
  },

  // 打开地图，选择位置，需要用户授权，scope.userLocation
  choose(opts) {
    const _opts = {
      success(res) {
        const _res = {
          name: '位置名称',
          address: '详细地址',
          latitude: '纬度，浮点数，范围：-90~90，负数为南纬',
          longitude: '经度，浮点数，范围：-180~180，负数为西经'
        }
      },
      fail(res) {},
      complete(res) {}
    }

    try {
      wx.chooseLocation(opts || _opts)
    } catch (error) {
      console.log('/location/choose/error', error)
    }

    return false
  },
  // 使用微信内置地图查看位置，需要授权 scope.userLocation
  open(opts) {
    const _opts = {
      latitude: 'Float, required, 纬度-90~90,负数为南纬',
      longitude: 'Float, required, 经度-180~180，负数为西经',
      scale: 'INT, 缩放比例，范围5~18,默认18',
      name: 'String, 位置名',
      address: 'String, 地址详细说明',
      success(res) {},
      fail(res) {},
      complete(res) {}
    }
  },

  // mapContext 对象
  context: {
    // 获取当前地图中心的经纬度，返回gcj02坐标系， 可用于wx.openLocation
    getCenterLocation(opts) {
      const _opts = {
        success(res) {
          const _res = {
            longitude: '经度',
            latitude:' 纬度'
          }
        },
        fail(res) {},
        complete(res) {}
      }
    },
    // 将地图中心点移动到当前定位点，需要配合map组件的show-location使用
    moveToLocation() {},
    // 平移marker,带动画
    translateMarker(opts) {
      const _opts = {
        markerId: 'Number, required, 指定marker',
        destination: 'Object, required, 指定marker移动到的目标点',
        autoRotate: 'Boolean, required, 移动过程中是否自动旋转marker',
        rotate: 'Number, required, marker旋转的角度',
        duration: 'Number, 动画持续时间，默认1000ms,平移和旋转分别计算',
        animationEnd(res) {},
        fail(res) {}
      }
    },
    // 缩放视野展示所有经纬度
    includePoints(opts) {
      const _opts = {
        points: 'Array, required, 要显示在可视区域的坐标点列表,[{latitude, longitude}]',
        padding: 'Array, 坐标点形成的矩形边缘到地图边缘的距离，单位：px。格式[上，右，下，左],安卓上只能识别数组第一项，上下左右的padding一致。'
      }
    },
    // 获取当前地图的视野范围
    getRegion(opts) {
      const _opts = {
        success(res) {},
        fail(res) {},
        complete(res) {}
      }
    },
    // 获取当前地图的缩放比例
    getScale(opts) {
      const _opts = {
        success(res) {},
        fail(res) {},
        complete(res) {}
      }
    }
  },
  // 组件<map/>控制
  create(mapId, scope) {
    return this.context = wx.createMapContext(mapId, scope || this)
  }
}