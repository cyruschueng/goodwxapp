/**
 * Inner Data Structure
 */

/**
 * 用户信息汇总
 */
class WeChatUser {
    /**
     * 构造函数，创建数据项
     */
    constructor() {

        // UI 交互部分
        this.cnName = "";  // (string, optional),   （中文名，字符串，可选，默认：空），这里需要讨论一下，有必要这么名字么？
        this.enName = "";  // (string, optional),   （英文名，字符串，可选，默认：空）
        this.username = "";  // (string, optional), （用户名，字符串，可选，默认：空）
        this.gender = "Unknown";  // (string, optional) = ['Unknown', 'Male', 'Female'],    （，字符串，可选，默认：Unknown）
        this.dateOfBirth = "";  // (Calendar, optional),    （生日，字符串，可选，默认：空）
        this.email = "";  // (string, optional),    （邮件地址，字符串，可选，默认：空）
        this.avatarUrl = "";  // (string, optional),    （头像地址，字符串，可选，默认：空）
        this.mobileNumber = "";  // (string, optional), （手机号码，字符串，可选，默认：空）
        this.nickName = "";  // (string, optional), （昵称，字符串，可选，默认：空）
        this.roleSet = [];  // (Array[Role], optional), （角色列表，数组，可选，默认：空）

        this.childSet = [];  // (Array[UserChild], optional),   （子女列表，数组，可选，默认：空）
        this.studentCourseSet = [];  // (Array[Course], optional),  （学生课程列表，数组，可选，默认：空）
        this.teacherCourseSet = [];  // (Array[Course], optional),  （老师课程列表，数组，可选，默认：空）
        this.userSetting = "";  // (UserSetting, optional), （用户设定，自定义类，可选，默认：空）

        this.noticeSet = [];  // (Array[Notice], optional), （通知列表，数组，可选，默认：空）
        this.parentSet = [];  // (Array[UserParent], optional), （家长列表，数组，可选，默认：空）

        // UI不需要展示的部分
        this.accountNonExpired = false;  // (boolean, optional),    （账户是否过期，布尔值，可选，默认：false）
        this.accountNonLocked = false;  // (boolean, optional),    （账户是否锁定，布尔值，可选，默认：false）
        this.authorities = [];  // (Array[GrantedAuthority], optional),     （权限字段，自定义类型，可选，默认：空）

        this.credentialsNonExpired = false;  // (boolean, optional),   （证书过期，布尔值，可选，默认：false）

        this.enabled = true;  // (boolean, optional),   （是否激活，布尔值，可选，默认：true）

        this.id = -1;  // (integer, optional),  （序号，整形，可选，默认：-1）
        this.createdBy = "";  // (string, optional),    （创建者，字符串，可选，默认：空）
        this.createdDate = "";  // (Calendar, optional),    （创建日期，字符串，可选，默认：空）
        this.lastModifiedBy = "";  // (string, optional),   （最后修改者，字符串，可选，默认：空）
        this.lastModifiedDate = "";  // (Calendar, optional),   （最后修改日期，字符串，可选，默认：空）

        this.password = "password";  // (string, optional), （密码，数组，可选，默认：password）

        this.weChatInfo = new WeChatUserBasic();  // (WeChatUserBasic, optional)    （用户微信基本账号信息，自定义类）

    }

    /**
     * 从本地存储初始化
     */
    initFromStorage() {
        let source = wx.getStorageSync();
        cloneDataFrom(this, source);
    }

    /**
     *
     */
    post2Server() {

    }

    put2Server() {

    }

    delete() {

    }

    cloneDataFrom(source) {
        cloneDataFrom(this, source);
    }

    validate() {
        if (this.gender === "Unknown")
            return;
        validate(this);
    }

}

/**
 * 用户微信账号相关信息
 * mpOpenId，用户使用小程序的OpenId
 * oaOpenId，用户关注公众号的OpenId
 * unionId，用户同时关注公众号和使用小程序，会有unionId
 */
class WeChatUserBasic {
    constructor() {
        this.mpOpenId = "";  // (string, optional), 用户使用小程序的OpenId
        this.oaOpenId = "";  // (string, optional), 用户关注公众号的OpenId
        this.unionId = "";  // (string, optional),  用户同时关注公众号和使用小程序，会有unionId
    }

    /**
     * 从本地存储初始化
     */
    initFromStorage() {
        let source = wx.getStorageSync();
        cloneDataFrom(this, source);
    }

    cloneDataFrom(source) {
        cloneDataFrom(this, source);
    }

    validate() {
        let errMsg = "";

        if (this.mpOpenId === "Unknown") {
            errMsg = "Error Wechat OpenId."
        }

        return errMsg;
    }

}

class UserParent {
    constructor() {
        this.parent = new WeChatUser();  // (WeChatUser, optional),
        this.relationshipFromChildToParent = "";  // (string, optional)

        this.createdBy = "";  // (string, optional),
        this.createdDate = "";  // (Calendar, optional),
        this.lastModifiedBy = "";  // (string, optional),
        this.lastModifiedDate = "";  // (Calendar, optional),
    }
}

class UserChild {
    constructor() {
        this.child = new WeChatUser();  //  (WeChatUser, optional),
        this.relationshipFromParentToChild = "";  //  (string, optional)

        this.createdBy = "";  //  (string, optional),
        this.createdDate = "";  //  (Calendar, optional),
        this.lastModifiedBy = "";  //  (string, optional),
        this.lastModifiedDate = "";  //  (Calendar, optional),
    }

}

/**
 * 学生表现类
 */
class StudentPerformance {
    constructor() {

        // UI  交互部分
        this.attention = "";  // (string, optional),    （出勤，字符串，可选，默认：空）
        this.fileInfoSet = [];  // (Array[FileInfo], optional), （文件列表，数组，可选，默认：空）

        this.improvable = "";  // (string, optional),   （？？，字符串，可选，默认：空）
        this.good = "";  // (string, optional), （？？，字符串，可选，默认：空）
        this.score = 0;  // (integer, optional),   （所得分数，整形，可选，默认：0）
        this.scoreType = "Five";  // (string, optional) = ['Five', 'Ten', 'Hundred'],   （打分制，字符串，可选，默认：空）
        this.description = "";  // (string, optional),    （评语，字符串，可选，默认：空），这部分是曾剑新增的，需要讨论
        this.fileInfoSet = [];  // (Array[FileInfo], optional), （文件列表，数组，可选，默认：空）

        // 后台生成的数据
        this.id = -1;  // (integer, optional),  （序号，整形，可选，默认：-1）
        this.createdBy = "";  // (string, optional),    （创建者，字符串，可选，默认：空）
        this.createdDate = "";  // (Calendar, optional),    （创建日期，字符串，可选，默认：空）
        this.lastModifiedBy = "";  // (string, optional),   （最后修改者，字符串，可选，默认：空）
        this.lastModifiedDate = "";  // (Calendar, optional),   （最后修改日期，字符串，可选，默认：空）

        // 由上级页面直接带入
        this.lesson = "";  // (Lesson, optional),   （该课程，自定义类，可选，默认：空）
        this.student = new WeChatUser();  // (WeChatUser, optional) （学生，自定义类，可选，默认：空）
    }

}

/**
 * 用户个人设置
 */
class UserSetting {
    constructor() {
        this.courseReminderRule = "";  // (string, optional),   （课程提醒规则，字符串，可选，默认：空）
        this.lessonReminderRule = "";  // (string, optional),   （单节课提醒规则，字符串，可选，默认：空）
        this.noticeReminderRule = "";  // (string, optional),   （通知提醒规则，字符串，可选，默认：空）

        this.teacherFunctionEnabled = false;  // (boolean, optional)    （启用老师功能，布尔值，可选，默认：false）
        this.parentFunctionEnabled = false;  // (boolean, optional),    （启用家长功能，布尔值，可选，默认：false）
        this.studentFunctionEnabled = false;  // (boolean, optional),   （启用学生功能，布尔值，可选，默认：false）

        this.id = -1;  // (integer, optional),  （序号，整形，可选，默认：-1）
        this.createdBy = "";  // (string, optional),    （创建者，字符串，可选，默认：空）
        this.createdDate = "";  // (Calendar, optional),    （创建日期，字符串，可选，默认：空）
        this.lastModifiedBy = "";  // (string, optional),   （最后修改者，字符串，可选，默认：空）
        this.lastModifiedDate = "";  // (Calendar, optional),   （最后修改日期，字符串，可选，默认：空）
    }

}

class UserNotice {
    constructor() {
        this.claimedBy = new WeChatUser();  // (WeChatUser, optional),

        this.status = "";  // (string, optional) = ['Unread', 'Claimed'],
        this.user = new WeChatUser();  // (WeChatUser, optional)

        this.createdBy = "";  // (string, optional),    （创建者，字符串，可选，默认：空）
        this.createdDate = "";  // (Calendar, optional),    （创建日期，字符串，可选，默认：空）
        this.lastModifiedBy = "";  // (string, optional),   （最后修改者，字符串，可选，默认：空）
        this.lastModifiedDate = "";  // (Calendar, optional),   （最后修改日期，字符串，可选，默认：空）
    }

}

class GrantedAuthority {
    constructor() {
        this.authority = "";  // (string, optional)
    }

}

/**
 * 角色
 */
class Role {
    constructor() {
        this.authority = "";  // (string, optional),
        this.description = "";  // (string, optional),
        this.id = -1;  // (integer, optional),
        this.name = "";  // (string, optional),
        this.privilegeSet = [];  // (Array[Privilege], optional)

        this.createdBy = "";  // (string, optional),    （创建者，字符串，可选，默认：空）
        this.createdDate = "";  // (Calendar, optional),    （创建日期，字符串，可选，默认：空）
        this.lastModifiedBy = "";  // (string, optional),   （最后修改者，字符串，可选，默认：空）
        this.lastModifiedDate = "";  // (Calendar, optional),   （最后修改日期，字符串，可选，默认：空）
    }

}

/**
 * 权限设置
 */
class Privilege {
    constructor() {
        this.permission = "";  // (string, optional) = ['All', 'Create', 'Retrieve', 'Update', 'Delete'],
        this.targetDomain = "";  // (string, optional) = ['All', 'DataStructure', 'Role', 'Privilege']

        this.id = -1;  // (integer, optional),
        this.createdBy = "";  // (string, optional),    （创建者，字符串，可选，默认：空）
        this.createdDate = "";  // (Calendar, optional),    （创建日期，字符串，可选，默认：空）
        this.lastModifiedBy = "";  // (string, optional),   （最后修改者，字符串，可选，默认：空）
        this.lastModifiedDate = "";  // (Calendar, optional),   （最后修改日期，字符串，可选，默认：空）
    }

}

/**
 * 一门课程
 */
class Course {
    constructor() {
        this.name = "";    //(string, optional),    （本课程名字，字符串，可选，默认：空）
        this.address = "";  //(string, optional),   （本课程上课地址，字符串，可选，默认：空）
        this.grade = "";    //(string, optional),   （本课程等级，字符串，可选，默认：空）

        this.startDate = "";    //(Calendar, optional), （本课程开始日期，字符串，可选，默认：空）
        this.endDate = "";    //(Calendar, optional),   （本课程结束日期，字符串，可选，默认：空）
        this.duration = -1;    ////(integer, optional), （本课程开始日期，整形，可选，默认：空）

        this.recurringRule = "";    //(string, optional),   （本课程周期重复的规则，整形，可选，默认：空）
        this.recurringTimes = "";    //(integer, optional), （本课程重复的次数，整形，可选，默认：空）

        this.description = "";    ////(string, optional),   （本课程描述，字符串，可选，默认：空）

        this.lessonSet = [];    //(Array[Lesson], optional),    （本课程每节课的安排，自定义类，可选，默认：空）

        this.startTime = "";    //(string, optional),
        this.status = "";    //(string, optional) = ['Preparing', 'Started', 'Closed', 'Finished'], （当前状态，数组，可选，默认：空）

        this.studentSet = [];    //(Array[WeChatUser], optional),   （学生列表，数组，可选，默认：空）
        this.teacherSet = [];    //(Array[WeChatUser], optional),   （教师列表，数组，可选，默认：空）

        this.id = -1; // (integer, optional),  （序号，整形，可选，默认：-1）
        this.createdBy = "";  // (string, optional),    （创建者，字符串，可选，默认：空）
        this.createdDate = "";  // (Calendar, optional),    （创建日期，字符串，可选，默认：空）
        this.lastModifiedBy = "";  // (string, optional),   （最后修改者，字符串，可选，默认：空）
        this.lastModifiedDate = "";  // (Calendar, optional),   （最后修改日期，字符串，可选，默认：空）
    }
}

/**
 * 一节课
 */
class Lesson {
    constructor() {
        this.name = "";  // (string, optional), （本节课名字，字符串，可选，默认：空）
        this.address = "";  // (string, optional),   （本节课上课地址，字符串，可选，默认：空）
        this.course = "";  // (Course, optional),   （本节课所属的课程，自定义类，可选，默认：空）
        this.dateTime = "";  // (Calendar, optional),   （本节课上课日期，字符串，可选，默认：空）
        this.date = ""; // 曾剑添加，需要讨论，本节课的上课日期
        this.statTime = ""; // 曾剑添加，需要讨论，本节课的上课时间
        this.endTime = "";  // 曾剑添加，需要讨论，本节课的下课时间
        this.description = "";  // (string, optional),     （本节课描述，字符串，可选，默认：空）
        this.duration = "";  // (integer, optional),
        this.homeworkSet = "";  // (Array[Homework], optional), （本节课作业，字符串，可选，默认：空）

        this.studentPerformanceSet = "";  // (Array[StudentPerformance], optional), （本节课的学生表现，字符串，可选，默认：空）
        this.teacher = "";  // (WeChatUser, optional),  （本节课老师，自定义类，可选，默认：空）

        this.id = -1; // (integer, optional),  （序号，整形，可选，默认：-1）
        this.createdBy = "";  // (string, optional),    （创建者，字符串，可选，默认：空）
        this.createdDate = "";  // (Calendar, optional),    （创建日期，字符串，可选，默认：空）
        this.lastModifiedBy = "";  // (string, optional),   （最后修改者，字符串，可选，默认：空）
        this.lastModifiedDate = "";  // (Calendar, optional),   （最后修改日期，字符串，可选，默认：空）
    }
}

/**
 * 作业
 */
class Homework {
    constructor() {
        this.attention = "";  // (string, optional),    （？？，字符串，可选，默认：空）
        this.date = ""; // 曾剑添加，需要讨论，本作业的日期
        this.deadline = "";  // (Calendar, optional),   （本作业截止日期，字符串，可选，默认：空）
        this.content = "";  // (string, optional),   （内容，字符串，可选，默认：空）   曾剑添加，这需要讨论
        this.description = "";  // (string, optional),  （本作业描述，字符串，可选，默认：空）
        this.fileInfoSet = "";  // (Array[FileInfo], optional), （本作业包含的文件，字符串，可选，默认：空）   曾剑添加，这需要讨论
        this.good = "";  // (string, optional), （？？，字符串，可选，默认：空）
        this.poor = "";  // (string, optional), （？？，字符串，可选，默认：空）
        this.score = "";  // (integer, optional),   （本作业的分数，字符串，可选，默认：空）
        this.scoreType = "";  // (string, optional) = ['Five', 'Ten', 'Hundred'],   （本作业的打分制，字符串，可选，默认：空）
        this.student = "";  // (WeChatUser, optional),  （本作业的学生，自定义类，可选，默认：空）

        this.id = -1; // (integer, optional),  （序号，整形，可选，默认：-1）
        this.createdBy = "";  // (string, optional),    （创建者，字符串，可选，默认：空）
        this.createdDate = "";  // (Calendar, optional),    （创建日期，字符串，可选，默认：空）
        this.lastModifiedBy = "";  // (string, optional),   （最后修改者，字符串，可选，默认：空）
        this.lastModifiedDate = "";  // (Calendar, optional),   （最后修改日期，字符串，可选，默认：空）
    }

}

/**
 * 通知
 */
class Notice {
    constructor() {

        // 核心内容
        this.deadline = ""; // (Calendar, optional),    （通知的截止日期，字符串，可选，默认：空）
        this.description = ""; // (string, optional),   （描述，字符串，可选，默认：空）
        this.content = "";  // (string, optional),   （内容，字符串，可选，默认：空）   曾剑添加，这需要讨论
        this.priority = "";  // (string, optional) = ['Low', 'Medium', 'High'], （优先级，字符串，可选，默认：空）
        this.recipientNoticeSet = "";  // (Array[UserNotice], optional),    （接收者列表，字符串，可选，默认：空）
        this.sender = "";  // (WeChatUser, optional),   （发送者，字符串，可选，默认：空）
        this.subject = "";  // (string, optional),  （？？，字符串，可选，默认：空）

        this.id = -1; // (integer, optional),  （序号，整形，可选，默认：-1）
        this.createdBy = "";  // (string, optional),    （创建者，字符串，可选，默认：空）
        this.createdDate = "";  // (Calendar, optional),    （创建日期，字符串，可选，默认：空）
        this.lastModifiedBy = "";  // (string, optional),   （最后修改者，字符串，可选，默认：空）
        this.lastModifiedDate = "";  // (Calendar, optional),   （最后修改日期，字符串，可选，默认：空）
    }

}

/**
 * 文件信息，并不存储文件，存储文件的一些信息
 */
class FileInfo {
    constructor() {

        // 核心内容
        this.name = "";  // (string, optional), （文件名，字符串，可选，默认：空）
        this.path = "";  // (string, optional), （文件路径，字符串，可选，默认：空）
        this.fileSize = -1;  // (integer, optional),    （文件大小，整形，可选，默认：-1）
        this.temporary = false;  // (boolean, optional),   （是否临时文件，布尔值，可选，默认：false）
        this.type = "";  // (string, optional) = ['Audio', 'Picture', 'Video', 'Text'], （文件类型，字符串，可选，默认：空）
        this.url = "";  // (string, optional)   （文件的链接，字符串，可选，默认：空）

        this.id = -1;  // (integer, optional),  （序号，整形，可选，默认：-1）
        this.createdBy = "";  // (string, optional),    （创建者，字符串，可选，默认：空）
        this.createdDate = "";  // (Calendar, optional),    （创建日期，字符串，可选，默认：空）
        this.lastModifiedBy = "";  // (string, optional),   （最后修改者，字符串，可选，默认：空）
        this.lastModifiedDate = "";  // (Calendar, optional),   （最后修改日期，字符串，可选，默认：空）

    }

}

/**
 * 从一个对象复制数据过来，保留本对象的方法
 * @param target
 * @param source
 */
function cloneDataFrom(target, source) {
    // 递归
    console.log("clone Data");
    for (let item in source) {
        if (source.hasOwnProperty(item)) {
            target[item] = typeof source[item] === "object" ? deepClone(source[item]) : source[item];
        }
    }
}

/**
 * 深度克隆数据的方法
 * @param obj
 * @returns {*}
 */
function deepClone(obj) {
    console.log("deepClone Data");
    console.log(obj.constructor);
    let clone = obj.constructor === Array ? [] : {};

    // 递归
    for (let item in obj) {
        if (obj.hasOwnProperty(item)) {
            clone[item] = typeof obj[item] === "object" ? deepClone(obj[item]) : obj[item];
        }
    }

    return clone;
}

/**
 * 表单验证
 * 返回验证错误信息，如果验证错误信息为空，则表示通过验证
 */
function validate(obj) {
    let errMsg = "";
    // 递归
    for (let item in obj) {
        if (item.hasOwnProperty("validate")) {
            item.validate();
        } else {
            // console.log(item);
        }
    }
}

module.exports = {
    WeChatUser: WeChatUser,
    WeChatUserBasic: WeChatUserBasic,
    UserParent: UserParent,
    UserChild: UserChild,
    StudentPerformance: StudentPerformance,
    UserSetting: UserSetting,
    UserNotice: UserNotice,
    Course: Course,
    Lesson: Lesson,
    Homework: Homework,
    Notice: Notice,
    FileInfo: FileInfo
};