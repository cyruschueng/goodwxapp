import settings from "../datamodel/Settings";
import DataStructure from "../datamodel/DataStructure";

const Course = new DataStructure.Course();

const Settings = new settings.Settings();

/**
 * 功能：从选中的日期读取指定内容
 * 参数1：key，要读取的数据
 * 参数2：dataType，数据类型（Storage）
 * 返回：请求类型的数据
 * 调用关系：外部函数，开放接口
 */
function loadData(dataType) {
    // 读取该类型数据已存储的内容
    try {
        let readInData = wx.getStorageSync(dataType.key);
        // 当天请求的数据
        let requestData = '';

        // 根据类型来抽取需要的数据
        // 如果没有这个记录，取的会是空值，则新建一个对应的项
        if (readInData !== '') {
            requestData = readInData;
        } else {
            switch (dataType.id) {
                case 0:
                    // 0. UserInfo
                    requestData = new DataStructure.WeChatUser();
                    break;
                case 1:
                    // 1. UserProfile
                    requestData = [];
                    break;
                case 2:
                    // 2. UserPlanSet
                    requestData = [];

                    break;
                case 3:
                    // 3. RealitySet
                    requestData = [];
                    break;
                case 4:
                    // 4. SystemPlanSet
                    requestData = [];
                    break;
                case 5:
                    // 5. PartsWithActions
                    // requestData = new DataStructure.artsWithActions();
                    break;
                case 6:
                    // 6. SyncedTag
                    requestData = new settings.Settings();
                    break;
                default:
                    break;
            }
        }

        return requestData;
    } catch (e) {
        loadData(dataType);
    }

}

/**
 * 功能：存储数据
 * 参数1：dataType，数据类型（StorageType）
 * 参数2：dataToSave，要存储的数据
 * 调用关系：外部函数，开放接口
 */
function saveData(dataType, dataToSave) {
    // 根据类型来判断是否需要替换其中的数据，还是直接覆盖
    try {
        console.log("in saveData, targetToSave: ", dataToSave);
        wx.setStorageSync(dataType.key, dataToSave);
    } catch (e) {
        saveData(dataType, dataToSave);
    }

}

function loadUserInfo() {
    return loadData(Settings.Storage.WeChatUser);
}

function saveUserInfo(dataToSave) {
    saveData(Settings.Storage.WeChatUser, dataToSave);
}

module.exports = {
    loadData: loadData,
    saveData: saveData,
    loadUserInfo: loadUserInfo,
    saveUserInfo: saveUserInfo,

};