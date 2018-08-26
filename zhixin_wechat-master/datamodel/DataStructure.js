/**
 * Inner Data Structure
 */

import DateTimeUtils from '../utils/DateTimeUtils'

/**
 * 用户信息汇总
 */
class WeChatUser {
    /**
     * 构造函数，创建数据项
     */
    constructor() {

        // UI 交互部分
        this.id = -1;  // (integer, optional),  （id，整形，可选，默认：-1）

        this.cnName = "";  // (string, optional),   （中文名，字符串，可选，默认：空），这三个必须要有一个
        this.enName = "";  // (string, optional),   （英文名，字符串，可选，默认：空）
        this.nickName = "";  // (string, optional), （昵称，字符串，可选，默认：空）

        this.username = "";  // (string, optional), （用户名，字符串，可选，默认：空），暂时不用，跟权限相关

        this.gender = "Unknown";  // (string, optional) = ['Unknown', 'Male', 'Female'],    （性别，字符串，必须，默认：Unknown）
        this.dateOfBirth = "";  // (Calendar, optional),    （生日，字符串，可选，默认：空）
        this.email = "";  // (string, optional),    （邮件地址，字符串，可选，默认：空）
        this.avatarUrl = "";  // (string, optional),    （头像地址，字符串，必须，默认：空），从微信头像获取
        this.mobileNumber = "";  // (string, optional), （手机号码，字符串，可选，默认：空）

        this.studentCourseSet = [];  // (Array[Course], optional),  （学生课程列表，数组，可选，默认：空）
        this.teacherCourseSet = [];  // (Array[Course], optional),  （老师课程列表，数组，可选，默认：空）

        this.userSetting = {};  // (UserSetting, optional), （用户设定，自定义类，可选，默认：空）

        this.noticeSet = [];  // (Array[Notice], optional), （通知列表，数组，可选，默认：空）
        this.parentSet = [];  // (Array[UserParent], optional), （家长列表，数组，可选，默认：空）

        this.authorities = [];  // (Array[GrantedAuthority], optional),     （权限字段，自定义类型，可选，默认：空）
        this.currentAuth = "";  // （当前角色，字符串，可选，默认：空）

        this.weChatInfo = {unionId: ""};  // (WeChatUserBasic, optional)    （用户微信基本账号信息，自定义类）

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


class UserParent {
    constructor() {
        this.parent = new WeChatUser();  // (WeChatUser, optional),
        this.relationshipFromChildToParent = "";  // (string, optional),    娃娃是长辈的女儿，还是儿子
    }
}

class UserChild {
    constructor() {
        this.child = new WeChatUser();  //  (WeChatUser, optional),
        this.relationshipFromParentToChild = "";  //  (string, optional)    长辈是娃娃的爹，妈

    }

}

/**
 * 学生表现类
 */
class StudentPerformance {
    constructor() {

        this.fileInfoSet = [];  // (Array[FileInfo], optional), （各种文件列表，数组，可选，默认：空）

        this.attention = "";  // (string, optional),    （注意事项、特别提醒，字符串，可选，默认：空）
        this.improvable = "";  // (string, optional),   （有待提高的地方，字符串，可选，默认：空）
        this.good = "";  // (string, optional), （表现好的地方，字符串，可选，默认：空）

        this.score = 0;  // (integer, optional),   （所得分数，整形，可选，默认：0）
        this.scoreType = "Five";  // (string, optional) = ['Five', 'Ten', 'Hundred'],   （打分制，字符串，可选，默认：空）

        this.description = "";  // (string, optional),    （总体评语，字符串，可选，默认：空），这部分是曾剑新增的，需要讨论

        this.id = -1;  // (integer, optional),  （id，整形，可选，默认：-1）

        // 由上级页面直接带入
        this.lesson = "";  // (Lesson, optional),   （具体一节课，自定义类，可选，默认：空）
        this.student = new WeChatUser();  // (WeChatUser, optional) （学生，自定义类，可选，默认：空），学生的信息
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

        //
        // this.teacherFunctionEnabled = false;  // (boolean, optional)    （启用老师功能，布尔值，可选，默认：false）
        // this.parentFunctionEnabled = false;  // (boolean, optional),    （启用家长功能，布尔值，可选，默认：false）
        // this.studentFunctionEnabled = false;  // (boolean, optional),   （启用学生功能，布尔值，可选，默认：false）

        this.id = -1;  // (integer, optional),  （id，整形，可选，默认：-1）

    }

}

class UserNotice {
    constructor() {
        this.claimedBy = new WeChatUser();  // (WeChatUser, optional),  领取者

        this.status = "";  // (string, optional) = ['Unread', 'Claimed'],   是否领取、读取，接收状态
        this.user = new WeChatUser();  // (WeChatUser, optional)    学生

    }

}

class GrantedAuthority {
    constructor() {
        this.authority = "";  // (string, optional)     Teacher，Parent，Student
    }

}

/**
 * 角色，微信基本用不到
 */
class Role {
    constructor() {
        this.authority = "";  // (string, optional),    Teacher，Parent，Student
        this.description = "";  // (string, optional),
        this.id = -1;  // (integer, optional),
        this.name = "";  // (string, optional),
        this.privilegeSet = [];  // (Array[Privilege], optional)

    }

}

/**
 * 一门课程
 */
class Course {
    constructor() {
        this.name = "";    //(string, optional),    （本课程名字，字符串，必须，默认：空）
        this.location = new Location(); // （本课程上课地址，字符串，必须，默认：空）

        this.startDate = "请选择";    //(Calendar, optional), （本课程开始日期，字符串，必须，默认：空）
        this.endDate = "请选择";    //(Calendar, optional),   （本课程结束日期，字符串，必须，默认：空）

        this.startTime = "09:00";    //(string, optional),   每一次课的开始时间，必须，比如晚上19:00
        this.duration = 45;    //(integer, optional), （一次课的时间，整形，必填，默认：空）

        this.recurringRule = "请选择";    //(string, optional),   （本课程周期重复的规则，整形，必须，默认：空）
        // this.recurringRuleString = "请选择";    // UI增加部分，仅作显示用
        this.recurringTimes = "";    //(integer, optional), （本课程重复的次数，整形，可选，默认：空）

        this.grade = "";    //(string, optional),   （本课程等级，字符串，可选，默认：空）

        this.description = "";    ////(string, optional),   （本课程描述，字符串，可选，默认：空）

        this.lessonSet = [];    //(Array[Lesson], optional),    （本课程每节课的安排，自定义类，可选，默认：空）

        this.status = "";    //(string, optional) = ['Preparing', 'Started', 'Closed', 'Finished'], （当前状态，字符串，必须，默认：空）

        this.totalStudentNumber = 10; // 整形，后台需要改，增加
        this.studentSet = [];    //(Array[WeChatUser], optional),   （学生列表，数组，可选，默认：空）
        this.teacherSet = [];    //(Array[WeChatUser], optional),   （教师列表，数组，可选，默认：空）
        this.scoreType = "";	// 分制，后台需要修改

        this.id = -1; // (integer, optional),  （id，整形，可选，默认：-1）

    }
}

/**
 * 位置信息，与微信保持一致
 */
class Location {
    constructor() {
        this.name = "";       // 位置名称
        this.address = "";    // 详细地址
        this.latitude = "";   // 纬度，浮点数，范围为-90~90，负数表示南纬
        this.longitude = "";   // 经度，浮点数，范围为-180~180，负数表示西经
        this.room = "";
    }

}

/**
 * 一节课
 */
class Lesson {
    constructor() {
        this.name = "";  // (string, optional), （本节课名字，字符串，可选，默认：课程名字）
        this.location = new Location();  // (string, optional),   （本节课上课地址，字符串，可选，默认：课程的地址）

        this.course = "";  // (Course, optional),   （本节课所属的课程，自定义类，可选，默认：空）

        this.dateTime = "";  // (Calendar, optional),   （本节课上课日期，字符串，可选，默认：空）2017-10-02 17:00

        this.duration = "";  // (integer, optional),    课程时长，暂时不显示

        this.description = "";  // (string, optional),     （本节课描述，字符串，可选，默认：继承课程的描述）

        this.homeworkSet = "";  // (Array[Homework], optional), （本节课作业，字符串，可选，默认：空）

        this.studentPerformanceSet = "";  // (Array[StudentPerformance], optional), （本节课的学生表现，字符串，可选，默认：空）
        this.teacher = "";  // (WeChatUser, optional),  （本节课老师，自定义类，可选，默认：空）

        this.id = -1; // (integer, optional),  （id，整形，可选，默认：-1）

    }
}

/**
 * 作业
 */
class Homework {
    constructor() {
        // 绑定到Lesson

        this.description = "";  // (string, optional),  （本作业内容描述，字符串，可选，默认：空）

        this.deadline = "";  // (Calendar, optional),   （本作业截止日期，字符串，必须，默认：空）

        this.contentFileInfoSet = [];   // 老师的作业内容描述文件，后台需要改

        this.resultFileInfoSet = [];  // (Array[FileInfo], optional), （本作业包含的文件，字符串，可选，默认：空）   学生作业结果描述文件，后台需要改

        // 评价
        this.attention = "";  // (string, optional),    （注意点，字符串，可选，默认：空）
        this.good = "";  // (string, optional), （亮点，字符串，可选，默认：空）
        this.improvable = "";  // (string, optional), （可提高部分，字符串，可选，默认：空），相当于差的地方，这部分后台需要改
        this.score = "";  // (integer, optional),   （本作业的分数，字符串，可选，默认：空）

        this.scoreType = "";  // (string, optional) = ['Five', 'Ten', 'Hundred'],   （本作业的打分制，字符串，可选，默认：空）

        this.student = "";  // (WeChatUser, optional),  （本作业的学生，自定义类，可选，默认：空）

        this.id = -1; // (integer, optional),  （id，整形，可选，默认：-1）
    }

}

/**
 * 通知
 */
class Notice {
    constructor() {

        // 核心内容
        this.subject = "";  // (string, optional),  （标题，字符串，可选，默认：空）
        this.deadline = ""; // (Calendar, optional),    （通知的截止日期，字符串，可选，默认：空）
        this.description = ""; // (string, optional),   （描述，字符串，可选，默认：空）
        this.contentFileInfoSet = "";  // (string, optional),   （内容文件，字符串，可选，默认：空）   通知内容，后台需要改

        this.priority = "";  // (string, optional) = ['Low', 'Medium', 'High'], （优先级，字符串，可选，默认：空）
        this.recipientNoticeSet = "";  // (Array[UserNotice], optional),    （接收者列表，字符串，可选，默认：空）

        this.sender = "";  // (WeChatUser, optional),   （发送者，字符串，可选，默认：空）

        this.id = -1; // (integer, optional),  （id，整形，可选，默认：-1）
    }

}

/**
 * 文件信息，并不存储文件，存储文件的一些信息
 */
class FileInfo {
    constructor() {
        // 核心内容
        this.id = -1;  // (integer, optional),  （id，整形，可选，默认：-1）

        this.name = "";  // (string, optional), （文件名，字符串，可选，默认：空）
        this.path = "";  // (string, optional), （文件路径，字符串，可选，默认：空） 后台确认
        this.fileSize = -1;  // (integer, optional),    （文件大小，按字节算，整形，可选，默认：-1）
        this.temporary = false;  // (boolean, optional),   （是否临时文件，布尔值，必选，默认：false）
        this.type = "";  // (string, optional) = ['Audio', 'Image', 'Video', 'Text'], （文件类型，字符串，可选，默认：空）
        this.time = "";
        this.timeLength = -1;    // 时间长度
        this.url = "";  // (string, optional)   （文件的链接，字符串，可选，默认：空）

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
    UserParent: UserParent,
    UserChild: UserChild,
    StudentPerformance: StudentPerformance,
    UserSetting: UserSetting,
    UserNotice: UserNotice,
    Course: Course,
    Lesson: Lesson,
    Homework: Homework,
    Notice: Notice,
    FileInfo: FileInfo,
    Location: Location
};