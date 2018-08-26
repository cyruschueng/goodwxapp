/**
 * API -- Bluebooth
 * 
 * 蓝牙
 * 
 * >= 1.1.0, iOS client >= 6.5.6, Andriod client >= 6.5.7
 * 
 * 不支持开发者工具上调试，请使用真机测试
 * 
 * 错误码：
 * 
 * Code   desc
 * 0      正常
 * 10000  未初始化蓝牙适配器
 * 10001  当前蓝牙适配器不可用
 * 10002  没有找到指定设备
 * 10003  连接失败
 * 10004  没有找到指定服务
 * 10005  没有找到指定特征值
 * 10006  当前连接已断开
 * 10007  当前特征值不支持此操作
 * 10008  其余所有系统上报的异常
 * 10009  Andriod 系统特有，系统版本低于4.3不支持BLE
 */

// device 对象
const moocDeviceObject = {
  name: 'String, 蓝牙设备名称， 某些设备可能没有',
  deviceId: 'String, 用于区分设备的id',
  RSSI: 'Number, 当前蓝牙设备的信号强度',
  advertisData: 'ArrayBuffer, 当前蓝牙设备的广播数据段中的ManufacturerData(注意：vConsole无法打印出arrayBuffer类型数据)',
  advertisServiceUUIDs: 'Array, 当前蓝牙设备的广播数据段中的ServiceUUIDs数据段',
  localName: 'String, 当前蓝牙设备的广播数据段中的LocalName数据段',
  serviceData: 'ArrayBuffer, 当前蓝牙设备的广播数据段中的ServiceData数据段'
}

const TIP = require('../uis/tip')

module.exports = {

  /**
   * 初始化蓝牙模块
   * 
   * 声明周期：open -> close 或小程序被销毁,
   * 
   * 下面所有的蓝牙模块api，只有在调用了 open 之后，才能正常使用，否则会返回错误：10000
   */
  open(opts) {
    const _opts = {
      success(res) { },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.openBluetoothAdapter) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.openBluetoothAdapter(opts)
  },

  /**
   * 关闭蓝牙模块，并释放系统资源，和 open 成对使用
   */
  close(opts) {
    const _opts = {
      success(res) { },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.closeBluetoothAdapter) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.closeBluetoothAdapter(opts)
  },

  // 获取本机蓝牙适配器状态
  getState(opts) {
    const _opts = {
      success(res) { 
        const _res = {
          discovering: 'Boolean, 是否正在搜索设备',
          available: 'Boolean, 蓝牙适配器是否可用',
          errMsg: 'String, 成功：ok, 错误：详细信息'
        }
      },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.getBluetoothAdapterState) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.getBluetoothAdapterState(opts)
  },

  // 开始搜索附近的蓝牙外围设备，耗资源，请在搜索并连接到设备后调用 stop 方法停止搜索
  search(opts) { 
    const _opts = {
      services: 'Array, 蓝牙设备主service的uuid列表',
      allowDuplicatesKey: 'Boolean, 是否允许重复上报同一设备，如果允许重复上百，则onDeviceFound方法会多次上报同一设备，但是RSSI值会有不同',
      interval: 'Number, 上报设备的间隔，默认：0，意思是找到新设备立即上报，否则根据传入的间隔上报',
      success(res) {
        const _res = {
          errMsg: 'String, 成功：ok, 错误：详细信息'
        }
      },
      fail(res) {},
      complete(res) {}
    }

    if (!wx.startBluetoothDevicesDiscovery) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.startBluetoothDevicesDiscovery(opts)
  },

  // 停止搜索
  stop(opts) { 
    const _opts = {
      success(res) {
        const _res = {
          errMsg: 'String, 成功：ok，错误：详细信息'
        }
      },
      fail(res) {},
      complete(res) {}
    }

    if (!wx.stopBluetoothDevicesDiscovery) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.stopBluetoothDevicesDiscovery(opts)
  },

  /**
   * 获取所有已发现的蓝牙设备
   */
  getDevices(opts) { 
    const _opts = {
      success(res) {
        const _res = {
          devices: 'Array, uuid 对应的已连接设备列表',
          errMsg: 'String, 成功：ok，错误：详细信息'
        }
      },
      fail(res) {},
      complete(res) {}
    }
  },

  /**
   * 根据 uuid 获取处于连接状态的设备
   */
  getConnected(opts) { 
    const _opts = {
      services: 'Array, required, 蓝牙设备主service的uuid列表',
      success(res) {
        const _res = {
          // Array, 搜索到的设备列表
          devices: [{
            name: 'String, 蓝牙设备名称，某些设备可能没有',
            // tool & andriod is MAC, iOS is uuid
            deviceId: 'String, 用于区分设备的id'
          }],
          errMsg: 'String, 成功：ok, 错误：详细信息'
        }
      },
      fail(res) {},
      complete(res) {}
    }
  },

  on: {
    stateChange(callback) { 
      const _callback = res => {
        const _res = {
          available: 'Boolean, 蓝牙适配器是否可用',
          discovering: 'Boolean, 蓝牙适配器是否处于搜索状态'
        }
      }
    },

    // 监听寻找到的新设备事件
    deviceFound(callback) { 
      const _callback = res => {
        const _res = {
          devices: 'Array, 新搜索到的设备列表'
        }
      }

      if (!wx.onBluetoothDeviceFound) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.onBluetoothDeviceFound(res => {
        if (callback) {
          callback(res)
        }
      })
    }


  },

  /**
   * 低功耗蓝牙设备
   * 
   * 1. connect
   * 2. getServices
   * 3. getCharateristics
   * 4. ... other api operator
   * 
   * 连接之后请首先调用 getServices 和 getCharateristics 去获取服务id和特征值，因为后面的
   * 接口都需要使用到 charateristicId 和 serviceId
   */
  ble: {
    // 连接低功耗蓝牙设备
    connect(opts) { 
      const _opts = {
        deviceId: 'String, required, 蓝牙设备ID，参考getDevices接口',
        success(res) {
          const _res = {
            errMsg: 'String, 成功：ok, 错误：详细错误信息'
          }
        },
        fail(res) {},
        complete(res) {}
      }

      if (!wx.createBLEConnection) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.createBLEConnection(opts)
    },

    // 断开与低功耗蓝牙设备的连接
    close(opts) { 
      const _opts = {
        deviceId: 'String, required, 蓝牙设备id，参考getDevices接口',
        success(res) {
          const _res = {
            errMsg: 'String, 成功：ok, 错误：详细信息'
          }
        },
        fail(res) {},
        complete(res) {}
      }

      if (!wx.closeBLECOnnection) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.closeBLEConnection(opts)
    },

    // 获取蓝牙设备所有服务
    getServices(opts) {
      const _opts = {
        deviceId: 'String, required, 蓝牙设备id，参考getDevices接口',
        success(res) {
          const _res = {
            services: [{
              uuid: 'String, 蓝牙设备服务的uuid',
              isPrimary: 'Boolean，该服务是否为主服务'
            }],
            errMsg: 'String, 成功ok，错误：详细信息'
          } 
        },
        fail(res) {},
        complete(res) {}
      }

      if (!wx.getBLEDeviceServices) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.getBLEDeviceServices(opts)
    },

    // 获取蓝牙设备某个服务中的所有特征值
    getCharacteristics(opts) { 
      const _opts = {
        deviceId: 'String, required, 蓝牙设备id，参考device对象',
        serviceId: 'String, required, 蓝牙服务uuid',
        success(res) {
          const _res = {
            // Array, 设备特征值列表
            characteristics: [{
              uuid: 'String, 蓝牙设备特征值的uuid',
              // Object, 该特征值支持的操作类型
              properties: {
                read: 'Boolean, 该特征值是否支持 read 操作',
                write: 'Boolean, ... 是否支持 write 操作',
                notify: 'Boolean, ... 是否支持 notify 操作',
                indicate: 'Boolean, ... 是否支持 indicate 操作'
              }
            }],
            errMsg: 'String, 成功ok，错误：详细信息'
          }
        },
        fail(res) {},
        complete(res) {}
      }
    },

    // 读取低功耗蓝牙设备的特征值的二进制数据值
    read(opts) {
      const _opts = {
        deviceId: 'String, required, 蓝牙设备id',
        serviceId: 'String, required, 蓝牙特征值对应的服务uuid',
        charateristicId: 'String, required, 蓝牙特征值uuid',
        success(res) {
          const _res = {
            errCode: 'Number, 错误码',
            errMsg: 'String, 成功OK，错误：详细信息'
          }
        },
        fail(res) {},
        complete(res) {}
      }

      if (!wx.readBLECharacteristicValue) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.readBLECharacteristicValue(opts)
    },

    /**
     * 向低功耗蓝牙设备特征值中写入二进制数据
     * 
     * TIP:
     *  1. 并行调用有可能失败
     *  2. 建议每次写入不超过20字节
     *  3. 安卓上，调用notify成功后立即调用write，部分机型上会发生10008系统错误
     *  4. 若单词写入数据过长，iOS平台上存在系统不会有任何回调的情况
     */
    write(opts) { 
      const _opts = {
        deviceId: 'String, required, 蓝牙设备ID',
        serviceId: 'String, required, 蓝牙特征值对应的服务的uuid',
        characteristicId: 'String, required, 蓝牙特征值的uuid',
        value: 'ArrayBuffer, required, 蓝牙设备特征值对应的二进制值',
        success(res) {
          const _res = {
            errMsg: 'String, 成功ok，错误：详细信息'
          }
        },
        fail(res) {},
        complete(res) {}
      }

      if (!wx.writeBLECharacteristicValue) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.writeBLECharacteristicValue(opts)
    },

    /**
     * 启用低功耗蓝牙设备特征值变化时 notify 功能，订阅特征值，必须先启用 notify
     * 
     * TIP:
     *  1. 订阅操作成功后需要设备主动更新特征值的value，才会触发 valueChange 事件回调
     *  2. 安卓上，调用 notify 成功后立刻调用 write 部分机型上会发生 10008 系统错误
     */
    notify(opts) { 
      const _opts = {
        deviceId: 'String, required, 蓝牙设备id',
        serviceId: 'String, required, 蓝牙特征值对应服务的uuid',
        characteristicId: 'String, required, 蓝牙特征值uuid',
        state: 'Boolean, required, true:启用notify, false:停用notify',
        success(res) {
          const _res = {
            errMsg: 'String, 成功ok, 错误：详细信息'
          }
        },
        fail(res) {},
        complete(res) {}
      }

      if (!wx.notifyBLECharacteristicValueChange) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.notifyBLECharacteristicValueChange(opts)
    },

    on: {
      // 监听低功率蓝牙特征值变化，必须先启用 notify 接口才能接受到设备推送的 notification
      valueChange(callback) { 
        const _callback = res => {
          const _res = {
            deviceId: 'String, 蓝牙设备id',
            serviceId: 'String, 特征值所属服务uuid',
            characteristicId: 'String, 特征值uuid',
            value: 'ArrayBuffer, 特征值最新的值'
          }
        }

        if (!wx.onBLECharacteristicValueChange) {
          TIP.modal.show({ type: 'low_version' })
          return false
        }

        wx.onBLECharacteristicValueChange(res => {
          if (callback) {
            callback(res)
          }
        })
      },
      // 监听低功耗蓝牙连接错误事件，包括设备丢失，连接异常断开等
      stateChange(callback) { 
        const _callback = res => {
          const _res = {
            deviceId: 'String, 蓝牙设备id，参考device对象',
            connected: 'Boolean, 连接状态'
          }
        }

        if (!wx.onBLECOnnectionStateChange) {
          TIP.modal.show({ type: 'low_version' })
          return false
        }

        wx.onBLEConnectionStateChange(res => {
          if (callback) {
            callback(res)
          }
        })
      }
    }
  }
}

