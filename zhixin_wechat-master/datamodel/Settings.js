class Settings {
    constructor() {
        // 存储信息
        this.Storage = new Storage();
        // 同步机制，枚举类型值
        // 取值包括：onAppLoad（启动时），onManual（手动），onValueChanged（数据改变时）
        this.SyncSetting = "onAppLoad";
    }
}

/**
 * 
 */
class Storage {
    constructor() {
        // 用户信息
        this.WeChatUser = new Record(0, "WeChatUser", "用户信息", true);
        // 用户个人身体测试数据
        this.UserProfile = new Record(1, "UserProfile", "身体指标", true);
        // 计划
        this.UserPlanSet = new Record(2, "UserPlanSet", "训练计划", true);
        // 每天记录
        this.RealitySet = new Record(3, "RealitySet", "训练记录", true);
        // 系统计划
        this.SystemPlanSet = new Record(4, "SystemPlanSet", "推荐计划", true);
        // 系统内部信息
        this.PartsWithActions = new Record(5, "PartsWithActions", "动作信息", true);
        // 同步标志
        this.Settings = new Record(6, "Settings", "同步标志", false);
    }
}

class Record {
    constructor(id, key, name, show) {
        this.id = id;
        this.key = key;
        this.name = name;
        this.show = show;
        this.syncedTag = true;
    }
}

/**
 * 同步标志
 * 标志为True，表示已经同步过了，False表示还未同步
 */
class SyncedTag {
    constructor() {
        // 用户基本信息
        this.UserInfo = true;
        // 用户个人身体测试数据
        this.UserProfile = true;
        // 用户计划
        this.UserPlanSet = true;
        // 每天记录
        this.RealitySet = true;
        // 推荐计划
        this.SystemPlanSet = true;
        // 系统内部信息
        this.PartsWithActions = true;
        // 同步标志
        this.SyncedTag = true;
    }
}

module.exports = {
    Settings: Settings,
};