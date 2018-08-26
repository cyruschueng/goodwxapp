module.exports = (function() {
    /* 所有emoji转化为span组成的数组 */
    var emojiHtmls = []; 
    /* 所有emoji的名称，语言为init中设置的语言 */
    var emojiSymbols = [];
    /* 所有emoji的具体信息，包括tag, en, zh, name, html */
    var emojiDetails = [];

    var emojiFactory = {
        "u1F600": { "en": "grinning", "zh": "大笑", "tag": "\uD83D\uDE00", "position": "0px 0px" },
        "u1F601": { "en": "grin", "zh": "露齿而笑", "tag": "\uD83D\uDE01", "position": "-25px 0px" },
        "u1F602": { "en": "joy", "zh": "欢乐", "tag": "\uD83D\uDE02", "position": "-50px 0px" },
        "u1F603": { "en": "smile", "zh": "微笑", "tag": "\uD83D\uDE03", "position": "-75px 0px" },
        "u1F605": { "en": "sweat_smile", "zh": "赔笑", "tag": "\uD83D\uDE05", "position": "-100px 0px" },
        "u1F606": { "en": "satisfied", "zh": "满意", "tag": "\uD83D\uDE06", "position": "-125px 0px" },
        "u1F607": { "en": "innocent", "zh": "无辜", "tag": "\uD83D\uDE07", "position": "-150px 0px" },
        "u1F608": { "en": "smiling_imp", "zh": "坏笑", "tag": "\uD83D\uDE08", "position": "-175px 0px" },
        "u1F609": { "en": "wink", "zh": "眨眼", "tag": "\uD83D\uDE09", "position": "-200px 0px" },
        "u1F611": { "en": "expressionless", "zh": "面无表情", "tag": "\uD83D\uDE11", "position": "-225px 0px" },
        "u1F612": { "en": "unamused", "zh": "一脸不快", "tag": "\uD83D\uDE12", "position": "-250px 0px" },
        "u1F613": { "en": "sweat", "zh": "汗", "tag": "\uD83D\uDE13", "position": "-275px 0px" },
        "u1F614": { "en": "pensive", "zh": "哀思", "tag": "\uD83D\uDE14", "position": "-300px 0px" },
        "u1F615": { "en": "confused", "zh": "迷茫", "tag": "\uD83D\uDE15", "position": "-325px 0px" },
        "u1F616": { "en": "confounded", "zh": "困惑的", "tag": "\uD83D\uDE16", "position": "-350px 0px" },
        "u1F618": { "en": "kissing_heart", "zh": "亲一个", "tag": "\uD83D\uDE18", "position": "-375px 0px" },
        "u1F621": { "en": "rage", "zh": "愤怒", "tag": "\uD83D\uDE21", "position": "-400px 0px" },
        "u1F622": { "en": "cry", "zh": "哭", "tag": "\uD83D\uDE22", "position": "-2075px 0px" },
        "u1F623": { "en": "persevere", "zh": "使劲", "tag": "\uD83D\uDE23", "position": "-450px 0px" },
        "u1F624": { "en": "triumph", "zh": "生气", "tag": "\uD83D\uDE24", "position": "-475px 0px" },
        "u1F628": { "en": "fearful", "zh": "可怕", "tag": "\uD83D\uDE28", "position": "-500px 0px" },
        "u1F629": { "en": "weary", "zh": "厌倦", "tag": "\uD83D\uDE29", "position": "-525px 0px" },
        "u1F630": { "en": "cold_sweat", "zh": "冷汗", "tag": "\uD83D\uDE30", "position": "-550px 0px" },
        "u1F631": { "en": "scream", "zh": "惊叫", "tag": "\uD83D\uDE31", "position": "-575px 0px" },
        "u1F632": { "en": "astonished", "zh": "惊讶", "tag": "\uD83D\uDE32", "position": "-600px 0px" },
        "u1F633": { "en": "flushed", "zh": "呆住", "tag": "\uD83D\uDE33", "position": "-625px 0px" },
        "u1F634": { "en": "sleeping", "zh": "睡眠", "tag": "\uD83D\uDE34", "position": "-650px 0px" },
        "u1F635": { "en": "dizzy_face", "zh": "断电了", "tag": "\uD83D\uDE35", "position": "-675px 0px" },
        "u1F636": { "en": "no_mouth", "zh": "无口", "tag": "\uD83D\uDE36", "position": "-700px 0px" },
        "u1F637": { "en": "mask", "zh": "病了", "tag": "\uD83D\uDE37", "position": "-725px 0px" },
        "u1F3A4": { "en": "microphone", "zh": "KTV", "tag": "\uD83C\uDFA4", "position": "-750px 0px" },
        "u1F3B2": { "en": "game_die", "zh": "色子", "tag": "\uD83C\uDFB2", "position": "-775px 0px" },
        "u1F3B5": { "en": "musical_note", "zh": "音乐", "tag": "\uD83C\uDFB5", "position": "-800px 0px" },
        "u1F3C0": { "en": "basketball", "zh": "篮球", "tag": "\uD83C\uDFC0", "position": "-825px 0px" },
        "u1F3C2": { "en": "snowboarder", "zh": "单板滑雪", "tag": "\uD83C\uDFC2", "position": "-850px 0px" },
        "u1F3E1": { "en": "house_with_garden", "zh": "房子", "tag": "\uD83C\uDFE1", "position": "-875px 0px" },
        "u1F004": { "en": "mahjong", "zh": "麻将", "tag": "\uD83C\uDC04", "position": "-900px 0px" },
        "u1F4A1": { "en": "bulb", "zh": "灯泡", "tag": "\uD83D\uDCA1", "position": "-925px 0px" },
        "u1F4A2": { "en": "anger", "zh": "爆筋", "tag": "\uD83D\uDCA2", "position": "-950px 0px" },
        "u1F4A3": { "en": "bomb", "zh": "炸弹", "tag": "\uD83D\uDCA3", "position": "-975px 0px" },
        "u1F4A4": { "en": "zzz", "zh": "ZZZ", "tag": "\uD83D\uDCA4", "position": "-1000px 0px" },
        "u1F4A9": { "en": "shit", "zh": "狗屁", "tag": "\uD83D\uDCA9", "position": "-1025px 0px" },
        "u1F4AA": { "en": "muscle", "zh": "肌肉", "tag": "\uD83D\uDCAA", "position": "-1050px 0px" },
        "u1F4B0": { "en": "moneybag", "zh": "钱袋", "tag": "\uD83D\uDCB0", "position": "-1075px 0px" },
        "u1F4DA": { "en": "books", "zh": "书籍", "tag": "\uD83D\uDCDA", "position": "-1100px 0px" },
        "u1F4DE": { "en": "telephone_receiver", "zh": "电话", "tag": "\uD83D\uDCDE", "position": "-1125px 0px" },
        "u1F4E2": { "en": "loudspeaker", "zh": "扩音器", "tag": "\uD83D\uDCE2", "position": "-1150px 0px" },
        "u1F6AB": { "en": "stop", "zh": "停止", "tag": "\uD83D\uDEAB", "position": "-1175px 0px" },
        "u1F6BF": { "en": "shower", "zh": "淋浴", "tag": "\uD83D\uDEBF", "position": "-1200px 0px" },
        "u1F30F": { "en": "earth_asia", "zh": "土", "tag": "\uD83C\uDF0F", "position": "-1225px 0px" },
        "u1F33B": { "en": "sunflower", "zh": "向日葵", "tag": "\uD83C\uDF3B", "position": "-1250px 0px" },
        "u1F35A": { "en": "rice", "zh": "饭", "tag": "\uD83C\uDF5A", "position": "-1275px 0px" },
        "u1F36B": { "en": "chocolate_bar", "zh": "巧克力", "tag": "\uD83C\uDF6B", "position": "-1300px 0px" },
        "u1F37B": { "en": "beers", "zh": "啤酒", "tag": "\uD83C\uDF7B", "position": "-1325px 0px" },
        "u270A": { "en": "fist", "zh": "拳头", "tag": "\u270A", "position": "-1350px 0px" },
        "u1F44C": { "en": "ok_hand", "zh": "没问题", "tag": "\uD83D\uDC4C", "position": "-1375px 0px" },
        "u1F44D": { "en": "1", "zh": "1", "tag": "\uD83D\uDC4D", "position": "-1400px 0px" },
        "u1F44E": { "en": "-1", "zh": "-1", "tag": "\uD83D\uDC4E", "position": "-1425px 0px" },
        "u1F44F": { "en": "clap", "zh": "拍", "tag": "\uD83D\uDC4F", "position": "-1450px 0px" },
        "u1F46A": { "en": "family", "zh": "家庭", "tag": "\uD83D\uDC6A", "position": "-1475px 0px" },
        "u1F46B": { "en": "couple", "zh": "情侣", "tag": "\uD83D\uDC6B", "position": "-1500px 0px" },
        "u1F47B": { "en": "ghost", "zh": "鬼", "tag": "\uD83D\uDC7B", "position": "-2050px 0px" },
        "u1F62C": { "en": "grimacing", "zh": "鬼脸", "tag": "\uD83D\uDE2C", "position": "-1525px 0px" },
        "u1F47C": { "en": "angel", "zh": "天使", "tag": "\uD83D\uDC7C", "position": "-1550px 0px" },
        "u1F47D": { "en": "alien", "zh": "外星人", "tag": "\uD83D\uDC7D", "position": "-1575px 0px" },
        "u1F47F": { "en": "imp", "zh": "恶魔", "tag": "\uD83D\uDC7F", "position": "-1600px 0px" },
        "u1F48A": { "en": "pill", "zh": "药", "tag": "\uD83D\uDC8A", "position": "-1625px 0px" },
        "u1F48B": { "en": "kiss", "zh": "吻", "tag": "\uD83D\uDC8B", "position": "-1650px 0px" },
        "u1F48D": { "en": "ring", "zh": "戒指", "tag": "\uD83D\uDC8D", "position": "-1675px 0px" },
        "u1F52B": { "en": "gun", "zh": "枪", "tag": "\uD83D\uDD2B", "position": "-1700px 0px" },
        "u1F60A": { "en": "blush", "zh": "脸红", "tag": "\uD83D\uDE0A", "position": "-1725px 0px" },
        "u1F60B": { "en": "yum", "zh": "馋", "tag": "\uD83D\uDE0B", "position": "-1750px 0px" },
        "u1F60C": { "en": "relieved", "zh": "安心", "tag": "\uD83D\uDE0C", "position": "-1775px 0px" },
        "u1F60D": { "en": "heart_eyes", "zh": "色色", "tag": "\uD83D\uDE0D", "position": "-1800px 0px" },
        "u1F60E": { "en": "sunglasses", "zh": "墨镜", "tag": "\uD83D\uDE0E", "position": "-1825px 0px" },
        "u1F60F": { "en": "smirk", "zh": "傻笑", "tag": "\uD83D\uDE0F", "position": "-1850px 0px" },
        "u1F61A": { "en": "kissing_closed_eyes", "zh": "接吻", "tag": "\uD83D\uDE1A", "position": "-1875px 0px" },
        "u1F61C": { "en": "stuck_out_tongue_winking_eye", "zh": "搞怪", "tag": "\uD83D\uDE1C", "position": "-1900px 0px" },
        "u1F61D": { "en": "stuck_out_tongue_closed_eyes", "zh": "恶作剧", "tag": "\uD83D\uDE1D", "position": "-1925px 0px" },
        "u1F61E": { "en": "disappointed", "zh": "失望的", "tag": "\uD83D\uDE1E", "position": "-1950px 0px" },
        "u1F61F": { "en": "anguished", "zh": "苦涩", "tag": "\uD83D\uDE1F", "position": "-1975px 0px" },
        "u1F62A": { "en": "sleepy", "zh": "困", "tag": "\uD83D\uDE2A", "position": "-2000px 0px" },
        "u1F62B": { "en": "tired_face", "zh": "抓狂", "tag": "\uD83D\uDE2B", "position": "-2025px 0px" },
        "u1F62D": { "en": "sob", "zh": "哭泣", "tag": "\uD83D\uDE2D", "position": "-425px 0px" },
        "u1F62F": { "en": "hushed", "zh": "寂静", "tag": "\uD83D\uDE2F", "position": "-2100px 0px" },
        "u1F64A": { "en": "speak_no_evil", "zh": "不说话", "tag": "\uD83D\uDE4A", "position": "-2125px 0px" },
        "u1F64F": { "en": "pray", "zh": "祈祷", "tag": "\uD83D\uDE4F", "position": "-2150px 0px" },
        "u1F319": { "en": "moon", "zh": "月亮", "tag": "\uD83C\uDF19", "position": "-2175px 0px" },
        "u1F332": { "en": "evergreen_tree", "zh": "树", "tag": "\uD83C\uDF32", "position": "-2200px 0px" },
        "u1F339": { "en": "rose", "zh": "玫瑰", "tag": "\uD83C\uDF39", "position": "-2225px 0px" },
        "u1F349": { "en": "watermelon", "zh": "西瓜", "tag": "\uD83C\uDF49", "position": "-2250px 0px" },
        "u1F356": { "en": "meat_on_bone", "zh": "肉", "tag": "\uD83C\uDF56", "position": "-2275px 0px" },
        "u1F366": { "en": "icecream", "zh": "冰淇淋", "tag": "\uD83C\uDF66", "position": "-2300px 0px" },
        "u1F377": { "en": "wine_glass", "zh": "酒", "tag": "\uD83C\uDF77", "position": "-2325px 0px" },
        "u1F381": { "en": "gift", "zh": "礼物", "tag": "\uD83C\uDF81", "position": "-2350px 0px" },
        "u1F382": { "en": "birthday", "zh": "生日", "tag": "\uD83C\uDF82", "position": "-2375px 0px" },
        "u1F384": { "en": "christmas_tree", "zh": "圣诞", "tag": "\uD83C\uDF84", "position": "-2400px 0px" },
        "u1F389": { "en": "tada", "zh": "礼花", "tag": "\uD83C\uDF89", "position": "-2425px 0px" },
        "u1F393": { "en": "mortar_board", "zh": "毕业", "tag": "\uD83C\uDF93", "position": "-2450px 0px" },
        "u1F434": { "en": "horse", "zh": "马", "tag": "\uD83D\uDC34", "position": "-2475px 0px" },
        "u1F436": { "en": "dog", "zh": "狗", "tag": "\uD83D\uDC36", "position": "-2500px 0px" },
        "u1F437": { "en": "pig", "zh": "猪", "tag": "\uD83D\uDC37", "position": "-2525px 0px" },
        "u1F451": { "en": "crown", "zh": "王冠", "tag": "\uD83D\uDC51", "position": "-2550px 0px" },
        "u1F484": { "en": "lipstick", "zh": "口红", "tag": "\uD83D\uDC84", "position": "-2575px 0px" },
        "u1F494": { "en": "broken_heart", "zh": "伤心", "tag": "\uD83D\uDC94", "position": "-2600px 0px" },
        "u1F525": { "en": "fire", "zh": "火了", "tag": "\uD83D\uDD25", "position": "-2625px 0px" },
        "u1F556": { "en": "time", "zh": "时间", "tag": "\uD83D\uDD56", "position": "-2650px 0px" },
        "u1F648": { "en": "see_no_evil", "zh": "不看", "tag": "\uD83D\uDE48", "position": "-2675px 0px" },
        "u1F649": { "en": "hear_no_evil", "zh": "不听", "tag": "\uD83D\uDE49", "position": "-2700px 0px" },
        "u1F680": { "en": "rocket", "zh": "火箭", "tag": "\uD83D\uDE80", "position": "-2725px 0px" },
        "u2B50": { "en": "star", "zh": "星星", "tag": "\u2B50", "position": "-2750px 0px" },
        "u23F0": { "en": "alarm_clock", "zh": "钟表", "tag": "\u23F0", "position": "-2775px 0px" },
        "u23F3": { "en": "hourglass_flowing_sand", "zh": "沙漏", "tag": "\u23F3", "position": "-2800px 0px" },
        "u26A1": { "en": "zap", "zh": "闪电", "tag": "\u26A1", "position": "-2825px 0px" },
        "u26BD": { "en": "soccer", "zh": "足球", "tag": "\u26BD", "position": "-2850px 0px" },
        "u26C4": { "en": "snowman", "zh": "雪人", "tag": "\u26C4", "position": "-2875px 0px" },
        "u26C5": { "en": "partly_sunny", "zh": "多云", "tag": "\u26C5", "position": "-2900px 0px" },
        "u261D": { "en": "point_up", "zh": "第一", "tag": "\u261D", "position": "-2925px 0px" },
        "u263A": { "en": "relaxed", "zh": "轻松", "tag": "\u263A", "position": "-2950px 0px" },
        "u1F44A": { "en": "punch", "zh": "拳", "tag": "\uD83D\uDC4A", "position": "-2975px 0px" },
        "u270B": { "en": "hand", "zh": "手", "tag": "\u270B", "position": "-3000px 0px" },
        "u270C": { "en": "v", "zh": "v", "tag": "\u270C", "position": "-3025px 0px" },
        "u270F": { "en": "pencil2", "zh": "笔", "tag": "\u270F", "position": "-3050px 0px" },
        "u2600": { "en": "sunny", "zh": "晴朗", "tag": "\u2600", "position": "-3075px 0px" },
        "u2601": { "en": "cloud", "zh": "云", "tag": "\u2601", "position": "-3100px 0px" },
        "u2614": { "en": "umbrella", "zh": "伞", "tag": "\u2614", "position": "-3125px 0px" },
        "u2615": { "en": "coffee", "zh": "咖啡", "tag": "\u2615", "position": "-3150px 0px" },
        "u2744": { "en": "snowflake", "zh": "雪花", "tag": "\u2744", "position": "-3175px 0px" }
    };

    /*
    config
    emoji unicode: http://unicode.org/emoji/index.htmls
    */
    var configs = {
        lang: "zh",
        reg: /\uf476\uf3fb|\uf476\uf3fc|\uf476\uf3fd|\uf476\uf3fe|\uf476\uf3ff|\uf9d2\uf3fb|\uf9d2\uf3fc|\uf9d2\uf3fd|\uf9d2\uf3fe|\uf9d2\uf3ff|\uf466\uf3fb|\uf466\uf3fc|\uf466\uf3fd|\uf466\uf3fe|\uf466\uf3ff|\uf467\uf3fb|\uf467\uf3fc|\uf467\uf3fd|\uf467\uf3fe|\uf467\uf3ff|\uf9d1\uf3fb|\uf9d1\uf3fc|\uf9d1\uf3fd|\uf9d1\uf3fe|\uf9d1\uf3ff|\uf468\uf3fb|\uf468\uf3fc|\uf468\uf3fd|\uf468\uf3fe|\uf468\uf3ff|\uf469\uf3fb|\uf469\uf3fc|\uf469\uf3fd|\uf469\uf3fe|\uf469\uf3ff|\uf9d3\uf3fb|\uf9d3\uf3fc|\uf9d3\uf3fd|\uf9d3\uf3fe|\uf9d3\uf3ff|\uf474\uf3fb|\uf474\uf3fc|\uf474\uf3fd|\uf474\uf3fe|\uf474\uf3ff|\uf475\uf3fb|\uf475\uf3fc|\uf475\uf3fd|\uf475\uf3fe|\uf475\uf3ff|\uf468\uf3fb\u200d\u2695\ufe0f|\uf468\uf3fc\u200d\u2695\ufe0f|\uf468\uf3fd\u200d\u2695\ufe0f|\uf468\uf3fe\u200d\u2695\ufe0f|\uf468\uf3ff\u200d\u2695\ufe0f|\uf469\uf3fb\u200d\u2695\ufe0f|\uf469\uf3fc\u200d\u2695\ufe0f|\uf469\uf3fd\u200d\u2695\ufe0f|\uf469\uf3fe\u200d\u2695\ufe0f|\uf469\uf3ff\u200d\u2695\ufe0f|\uf468\uf3fb\u200d\uf393|\uf468\uf3fc\u200d\uf393|\uf468\uf3fd\u200d\uf393|\uf468\uf3fe\u200d\uf393|\uf468\uf3ff\u200d\uf393|\uf469\uf3fb\u200d\uf393|\uf469\uf3fc\u200d\uf393|\uf469\uf3fd\u200d\uf393|\uf469\uf3fe\u200d\uf393|\uf469\uf3ff\u200d\uf393|\uf468\uf3fb\u200d\uf3eb|\uf468\uf3fc\u200d\uf3eb|\uf468\uf3fd\u200d\uf3eb|\uf468\uf3fe\u200d\uf3eb|\uf468\uf3ff\u200d\uf3eb|\uf469\uf3fb\u200d\uf3eb|\uf469\uf3fc\u200d\uf3eb|\uf469\uf3fd\u200d\uf3eb|\uf469\uf3fe\u200d\uf3eb|\uf469\uf3ff\u200d\uf3eb|\uf468\uf3fb\u200d\u2696\ufe0f|\uf468\uf3fc\u200d\u2696\ufe0f|\uf468\uf3fd\u200d\u2696\ufe0f|\uf468\uf3fe\u200d\u2696\ufe0f|\uf468\uf3ff\u200d\u2696\ufe0f|\uf469\uf3fb\u200d\u2696\ufe0f|\uf469\uf3fc\u200d\u2696\ufe0f|\uf469\uf3fd\u200d\u2696\ufe0f|\uf469\uf3fe\u200d\u2696\ufe0f|\uf469\uf3ff\u200d\u2696\ufe0f|\uf468\uf3fb\u200d\uf33e|\uf468\uf3fc\u200d\uf33e|\uf468\uf3fd\u200d\uf33e|\uf468\uf3fe\u200d\uf33e|\uf468\uf3ff\u200d\uf33e|\uf469\uf3fb\u200d\uf33e|\uf469\uf3fc\u200d\uf33e|\uf469\uf3fd\u200d\uf33e|\uf469\uf3fe\u200d\uf33e|\uf469\uf3ff\u200d\uf33e|\uf468\uf3fb\u200d\uf373|\uf468\uf3fc\u200d\uf373|\uf468\uf3fd\u200d\uf373|\uf468\uf3fe\u200d\uf373|\uf468\uf3ff\u200d\uf373|\uf469\uf3fb\u200d\uf373|\uf469\uf3fc\u200d\uf373|\uf469\uf3fd\u200d\uf373|\uf469\uf3fe\u200d\uf373|\uf469\uf3ff\u200d\uf373|\uf468\uf3fb\u200d\uf527|\uf468\uf3fc\u200d\uf527|\uf468\uf3fd\u200d\uf527|\uf468\uf3fe\u200d\uf527|\uf468\uf3ff\u200d\uf527|\uf469\uf3fb\u200d\uf527|\uf469\uf3fc\u200d\uf527|\uf469\uf3fd\u200d\uf527|\uf469\uf3fe\u200d\uf527|\uf469\uf3ff\u200d\uf527|\uf468\uf3fb\u200d\uf3ed|\uf468\uf3fc\u200d\uf3ed|\uf468\uf3fd\u200d\uf3ed|\uf468\uf3fe\u200d\uf3ed|\uf468\uf3ff\u200d\uf3ed|\uf469\uf3fb\u200d\uf3ed|\uf469\uf3fc\u200d\uf3ed|\uf469\uf3fd\u200d\uf3ed|\uf469\uf3fe\u200d\uf3ed|\uf469\uf3ff\u200d\uf3ed|\uf468\uf3fb\u200d\uf4bc|\uf468\uf3fc\u200d\uf4bc|\uf468\uf3fd\u200d\uf4bc|\uf468\uf3fe\u200d\uf4bc|\uf468\uf3ff\u200d\uf4bc|\uf469\uf3fb\u200d\uf4bc|\uf469\uf3fc\u200d\uf4bc|\uf469\uf3fd\u200d\uf4bc|\uf469\uf3fe\u200d\uf4bc|\uf469\uf3ff\u200d\uf4bc|\uf468\uf3fb\u200d\uf52c|\uf468\uf3fc\u200d\uf52c|\uf468\uf3fd\u200d\uf52c|\uf468\uf3fe\u200d\uf52c|\uf468\uf3ff\u200d\uf52c|\uf469\uf3fb\u200d\uf52c|\uf469\uf3fc\u200d\uf52c|\uf469\uf3fd\u200d\uf52c|\uf469\uf3fe\u200d\uf52c|\uf469\uf3ff\u200d\uf52c|\uf468\uf3fb\u200d\uf4bb|\uf468\uf3fc\u200d\uf4bb|\uf468\uf3fd\u200d\uf4bb|\uf468\uf3fe\u200d\uf4bb|\uf468\uf3ff\u200d\uf4bb|\uf469\uf3fb\u200d\uf4bb|\uf469\uf3fc\u200d\uf4bb|\uf469\uf3fd\u200d\uf4bb|\uf469\uf3fe\u200d\uf4bb|\uf469\uf3ff\u200d\uf4bb|\uf468\uf3fb\u200d\uf3a4|\uf468\uf3fc\u200d\uf3a4|\uf468\uf3fd\u200d\uf3a4|\uf468\uf3fe\u200d\uf3a4|\uf468\uf3ff\u200d\uf3a4|\uf469\uf3fb\u200d\uf3a4|\uf469\uf3fc\u200d\uf3a4|\uf469\uf3fd\u200d\uf3a4|\uf469\uf3fe\u200d\uf3a4|\uf469\uf3ff\u200d\uf3a4|\uf468\uf3fb\u200d\uf3a8|\uf468\uf3fc\u200d\uf3a8|\uf468\uf3fd\u200d\uf3a8|\uf468\uf3fe\u200d\uf3a8|\uf468\uf3ff\u200d\uf3a8|\uf469\uf3fb\u200d\uf3a8|\uf469\uf3fc\u200d\uf3a8|\uf469\uf3fd\u200d\uf3a8|\uf469\uf3fe\u200d\uf3a8|\uf469\uf3ff\u200d\uf3a8|\uf468\uf3fb\u200d\u2708\ufe0f|\uf468\uf3fc\u200d\u2708\ufe0f|\uf468\uf3fd\u200d\u2708\ufe0f|\uf468\uf3fe\u200d\u2708\ufe0f|\uf468\uf3ff\u200d\u2708\ufe0f|\uf469\uf3fb\u200d\u2708\ufe0f|\uf469\uf3fc\u200d\u2708\ufe0f|\uf469\uf3fd\u200d\u2708\ufe0f|\uf469\uf3fe\u200d\u2708\ufe0f|\uf469\uf3ff\u200d\u2708\ufe0f|\uf468\uf3fb\u200d\uf680|\uf468\uf3fc\u200d\uf680|\uf468\uf3fd\u200d\uf680|\uf468\uf3fe\u200d\uf680|\uf468\uf3ff\u200d\uf680|\uf469\uf3fb\u200d\uf680|\uf469\uf3fc\u200d\uf680|\uf469\uf3fd\u200d\uf680|\uf469\uf3fe\u200d\uf680|\uf469\uf3ff\u200d\uf680|\uf468\uf3fb\u200d\uf692|\uf468\uf3fc\u200d\uf692|\uf468\uf3fd\u200d\uf692|\uf468\uf3fe\u200d\uf692|\uf468\uf3ff\u200d\uf692|\uf469\uf3fb\u200d\uf692|\uf469\uf3fc\u200d\uf692|\uf469\uf3fd\u200d\uf692|\uf469\uf3fe\u200d\uf692|\uf469\uf3ff\u200d\uf692|\uf46e\uf3fb|\uf46e\uf3fc|\uf46e\uf3fd|\uf46e\uf3fe|\uf46e\uf3ff|\uf46e\uf3fb\u200d\u2642\ufe0f|\uf46e\uf3fc\u200d\u2642\ufe0f|\uf46e\uf3fd\u200d\u2642\ufe0f|\uf46e\uf3fe\u200d\u2642\ufe0f|\uf46e\uf3ff\u200d\u2642\ufe0f|\uf46e\uf3fb\u200d\u2640\ufe0f|\uf46e\uf3fc\u200d\u2640\ufe0f|\uf46e\uf3fd\u200d\u2640\ufe0f|\uf46e\uf3fe\u200d\u2640\ufe0f|\uf46e\uf3ff\u200d\u2640\ufe0f|\uf575\uf3fb|\uf575\uf3fc|\uf575\uf3fd|\uf575\uf3fe|\uf575\uf3ff|\uf575\uf3fb\u200d\u2642\ufe0f|\uf575\uf3fc\u200d\u2642\ufe0f|\uf575\uf3fd\u200d\u2642\ufe0f|\uf575\uf3fe\u200d\u2642\ufe0f|\uf575\uf3ff\u200d\u2642\ufe0f|\uf575\uf3fb\u200d\u2640\ufe0f|\uf575\uf3fc\u200d\u2640\ufe0f|\uf575\uf3fd\u200d\u2640\ufe0f|\uf575\uf3fe\u200d\u2640\ufe0f|\uf575\uf3ff\u200d\u2640\ufe0f|\uf482\uf3fb|\uf482\uf3fc|\uf482\uf3fd|\uf482\uf3fe|\uf482\uf3ff|\uf482\uf3fb\u200d\u2642\ufe0f|\uf482\uf3fc\u200d\u2642\ufe0f|\uf482\uf3fd\u200d\u2642\ufe0f|\uf482\uf3fe\u200d\u2642\ufe0f|\uf482\uf3ff\u200d\u2642\ufe0f|\uf482\uf3fb\u200d\u2640\ufe0f|\uf482\uf3fc\u200d\u2640\ufe0f|\uf482\uf3fd\u200d\u2640\ufe0f|\uf482\uf3fe\u200d\u2640\ufe0f|\uf482\uf3ff\u200d\u2640\ufe0f|\uf477\uf3fb|\uf477\uf3fc|\uf477\uf3fd|\uf477\uf3fe|\uf477\uf3ff|\uf477\uf3fb\u200d\u2642\ufe0f|\uf477\uf3fc\u200d\u2642\ufe0f|\uf477\uf3fd\u200d\u2642\ufe0f|\uf477\uf3fe\u200d\u2642\ufe0f|\uf477\uf3ff\u200d\u2642\ufe0f|\uf477\uf3fb\u200d\u2640\ufe0f|\uf477\uf3fc\u200d\u2640\ufe0f|\uf477\uf3fd\u200d\u2640\ufe0f|\uf477\uf3fe\u200d\u2640\ufe0f|\uf477\uf3ff\u200d\u2640\ufe0f|\uf934\uf3fb|\uf934\uf3fc|\uf934\uf3fd|\uf934\uf3fe|\uf934\uf3ff|\uf478\uf3fb|\uf478\uf3fc|\uf478\uf3fd|\uf478\uf3fe|\uf478\uf3ff|\uf473\uf3fb|\uf473\uf3fc|\uf473\uf3fd|\uf473\uf3fe|\uf473\uf3ff|\uf473\uf3fb\u200d\u2642\ufe0f|\uf473\uf3fc\u200d\u2642\ufe0f|\uf473\uf3fd\u200d\u2642\ufe0f|\uf473\uf3fe\u200d\u2642\ufe0f|\uf473\uf3ff\u200d\u2642\ufe0f|\uf473\uf3fb\u200d\u2640\ufe0f|\uf473\uf3fc\u200d\u2640\ufe0f|\uf473\uf3fd\u200d\u2640\ufe0f|\uf473\uf3fe\u200d\u2640\ufe0f|\uf473\uf3ff\u200d\u2640\ufe0f|\uf472\uf3fb|\uf472\uf3fc|\uf472\uf3fd|\uf472\uf3fe|\uf472\uf3ff|\uf9d5\uf3fb|\uf9d5\uf3fc|\uf9d5\uf3fd|\uf9d5\uf3fe|\uf9d5\uf3ff|\uf9d4\uf3fb|\uf9d4\uf3fc|\uf9d4\uf3fd|\uf9d4\uf3fe|\uf9d4\uf3ff|\uf471\uf3fb|\uf471\uf3fc|\uf471\uf3fd|\uf471\uf3fe|\uf471\uf3ff|\uf471\uf3fb\u200d\u2642\ufe0f|\uf471\uf3fc\u200d\u2642\ufe0f|\uf471\uf3fd\u200d\u2642\ufe0f|\uf471\uf3fe\u200d\u2642\ufe0f|\uf471\uf3ff\u200d\u2642\ufe0f|\uf471\uf3fb\u200d\u2640\ufe0f|\uf471\uf3fc\u200d\u2640\ufe0f|\uf471\uf3fd\u200d\u2640\ufe0f|\uf471\uf3fe\u200d\u2640\ufe0f|\uf471\uf3ff\u200d\u2640\ufe0f|\uf935\uf3fb|\uf935\uf3fc|\uf935\uf3fd|\uf935\uf3fe|\uf935\uf3ff|\uf470\uf3fb|\uf470\uf3fc|\uf470\uf3fd|\uf470\uf3fe|\uf470\uf3ff|\uf930\uf3fb|\uf930\uf3fc|\uf930\uf3fd|\uf930\uf3fe|\uf930\uf3ff|\uf931\uf3fb|\uf931\uf3fc|\uf931\uf3fd|\uf931\uf3fe|\uf931\uf3ff|\uf47c\uf3fb|\uf47c\uf3fc|\uf47c\uf3fd|\uf47c\uf3fe|\uf47c\uf3ff|\uf385\uf3fb|\uf385\uf3fc|\uf385\uf3fd|\uf385\uf3fe|\uf385\uf3ff|\uf936\uf3fb|\uf936\uf3fc|\uf936\uf3fd|\uf936\uf3fe|\uf936\uf3ff|\uf9d9\uf3fb|\uf9d9\uf3fc|\uf9d9\uf3fd|\uf9d9\uf3fe|\uf9d9\uf3ff|\uf9d9\uf3fb\u200d\u2640\ufe0f|\uf9d9\uf3fc\u200d\u2640\ufe0f|\uf9d9\uf3fd\u200d\u2640\ufe0f|\uf9d9\uf3fe\u200d\u2640\ufe0f|\uf9d9\uf3ff\u200d\u2640\ufe0f|\uf9d9\uf3fb\u200d\u2642\ufe0f|\uf9d9\uf3fc\u200d\u2642\ufe0f|\uf9d9\uf3fd\u200d\u2642\ufe0f|\uf9d9\uf3fe\u200d\u2642\ufe0f|\uf9d9\uf3ff\u200d\u2642\ufe0f|\uf9da\uf3fb|\uf9da\uf3fc|\uf9da\uf3fd|\uf9da\uf3fe|\uf9da\uf3ff|\uf9da\uf3fb\u200d\u2640\ufe0f|\uf9da\uf3fc\u200d\u2640\ufe0f|\uf9da\uf3fd\u200d\u2640\ufe0f|\uf9da\uf3fe\u200d\u2640\ufe0f|\uf9da\uf3ff\u200d\u2640\ufe0f|\uf9da\uf3fb\u200d\u2642\ufe0f|\uf9da\uf3fc\u200d\u2642\ufe0f|\uf9da\uf3fd\u200d\u2642\ufe0f|\uf9da\uf3fe\u200d\u2642\ufe0f|\uf9da\uf3ff\u200d\u2642\ufe0f|\uf9db\uf3fb|\uf9db\uf3fc|\uf9db\uf3fd|\uf9db\uf3fe|\uf9db\uf3ff|\uf9db\uf3fb\u200d\u2640\ufe0f|\uf9db\uf3fc\u200d\u2640\ufe0f|\uf9db\uf3fd\u200d\u2640\ufe0f|\uf9db\uf3fe\u200d\u2640\ufe0f|\uf9db\uf3ff\u200d\u2640\ufe0f|\uf9db\uf3fb\u200d\u2642\ufe0f|\uf9db\uf3fc\u200d\u2642\ufe0f|\uf9db\uf3fd\u200d\u2642\ufe0f|\uf9db\uf3fe\u200d\u2642\ufe0f|\uf9db\uf3ff\u200d\u2642\ufe0f|\uf9dc\uf3fb|\uf9dc\uf3fc|\uf9dc\uf3fd|\uf9dc\uf3fe|\uf9dc\uf3ff|\uf9dc\uf3fb\u200d\u2640\ufe0f|\uf9dc\uf3fc\u200d\u2640\ufe0f|\uf9dc\uf3fd\u200d\u2640\ufe0f|\uf9dc\uf3fe\u200d\u2640\ufe0f|\uf9dc\uf3ff\u200d\u2640\ufe0f|\uf9dc\uf3fb\u200d\u2642\ufe0f|\uf9dc\uf3fc\u200d\u2642\ufe0f|\uf9dc\uf3fd\u200d\u2642\ufe0f|\uf9dc\uf3fe\u200d\u2642\ufe0f|\uf9dc\uf3ff\u200d\u2642\ufe0f|\uf9dd\uf3fb|\uf9dd\uf3fc|\uf9dd\uf3fd|\uf9dd\uf3fe|\uf9dd\uf3ff|\uf9dd\uf3fb\u200d\u2640\ufe0f|\uf9dd\uf3fc\u200d\u2640\ufe0f|\uf9dd\uf3fd\u200d\u2640\ufe0f|\uf9dd\uf3fe\u200d\u2640\ufe0f|\uf9dd\uf3ff\u200d\u2640\ufe0f|\uf9dd\uf3fb\u200d\u2642\ufe0f|\uf9dd\uf3fc\u200d\u2642\ufe0f|\uf9dd\uf3fd\u200d\u2642\ufe0f|\uf9dd\uf3fe\u200d\u2642\ufe0f|\uf9dd\uf3ff\u200d\u2642\ufe0f|\uf64d\uf3fb|\uf64d\uf3fc|\uf64d\uf3fd|\uf64d\uf3fe|\uf64d\uf3ff|\uf64d\uf3fb\u200d\u2642\ufe0f|\uf64d\uf3fc\u200d\u2642\ufe0f|\uf64d\uf3fd\u200d\u2642\ufe0f|\uf64d\uf3fe\u200d\u2642\ufe0f|\uf64d\uf3ff\u200d\u2642\ufe0f|\uf64d\uf3fb\u200d\u2640\ufe0f|\uf64d\uf3fc\u200d\u2640\ufe0f|\uf64d\uf3fd\u200d\u2640\ufe0f|\uf64d\uf3fe\u200d\u2640\ufe0f|\uf64d\uf3ff\u200d\u2640\ufe0f|\uf64e\uf3fb|\uf64e\uf3fc|\uf64e\uf3fd|\uf64e\uf3fe|\uf64e\uf3ff|\uf64e\uf3fb\u200d\u2642\ufe0f|\uf64e\uf3fc\u200d\u2642\ufe0f|\uf64e\uf3fd\u200d\u2642\ufe0f|\uf64e\uf3fe\u200d\u2642\ufe0f|\uf64e\uf3ff\u200d\u2642\ufe0f|\uf64e\uf3fb\u200d\u2640\ufe0f|\uf64e\uf3fc\u200d\u2640\ufe0f|\uf64e\uf3fd\u200d\u2640\ufe0f|\uf64e\uf3fe\u200d\u2640\ufe0f|\uf64e\uf3ff\u200d\u2640\ufe0f|\uf645\uf3fb|\uf645\uf3fc|\uf645\uf3fd|\uf645\uf3fe|\uf645\uf3ff|\uf645\uf3fb\u200d\u2642\ufe0f|\uf645\uf3fc\u200d\u2642\ufe0f|\uf645\uf3fd\u200d\u2642\ufe0f|\uf645\uf3fe\u200d\u2642\ufe0f|\uf645\uf3ff\u200d\u2642\ufe0f|\uf645\uf3fb\u200d\u2640\ufe0f|\uf645\uf3fc\u200d\u2640\ufe0f|\uf645\uf3fd\u200d\u2640\ufe0f|\uf645\uf3fe\u200d\u2640\ufe0f|\uf645\uf3ff\u200d\u2640\ufe0f|\uf646\uf3fb|\uf646\uf3fc|\uf646\uf3fd|\uf646\uf3fe|\uf646\uf3ff|\uf646\uf3fb\u200d\u2642\ufe0f|\uf646\uf3fc\u200d\u2642\ufe0f|\uf646\uf3fd\u200d\u2642\ufe0f|\uf646\uf3fe\u200d\u2642\ufe0f|\uf646\uf3ff\u200d\u2642\ufe0f|\uf646\uf3fb\u200d\u2640\ufe0f|\uf646\uf3fc\u200d\u2640\ufe0f|\uf646\uf3fd\u200d\u2640\ufe0f|\uf646\uf3fe\u200d\u2640\ufe0f|\uf646\uf3ff\u200d\u2640\ufe0f|\uf481\uf3fb|\uf481\uf3fc|\uf481\uf3fd|\uf481\uf3fe|\uf481\uf3ff|\uf481\uf3fb\u200d\u2642\ufe0f|\uf481\uf3fc\u200d\u2642\ufe0f|\uf481\uf3fd\u200d\u2642\ufe0f|\uf481\uf3fe\u200d\u2642\ufe0f|\uf481\uf3ff\u200d\u2642\ufe0f|\uf481\uf3fb\u200d\u2640\ufe0f|\uf481\uf3fc\u200d\u2640\ufe0f|\uf481\uf3fd\u200d\u2640\ufe0f|\uf481\uf3fe\u200d\u2640\ufe0f|\uf481\uf3ff\u200d\u2640\ufe0f|\uf64b\uf3fb|\uf64b\uf3fc|\uf64b\uf3fd|\uf64b\uf3fe|\uf64b\uf3ff|\uf64b\uf3fb\u200d\u2642\ufe0f|\uf64b\uf3fc\u200d\u2642\ufe0f|\uf64b\uf3fd\u200d\u2642\ufe0f|\uf64b\uf3fe\u200d\u2642\ufe0f|\uf64b\uf3ff\u200d\u2642\ufe0f|\uf64b\uf3fb\u200d\u2640\ufe0f|\uf64b\uf3fc\u200d\u2640\ufe0f|\uf64b\uf3fd\u200d\u2640\ufe0f|\uf64b\uf3fe\u200d\u2640\ufe0f|\uf64b\uf3ff\u200d\u2640\ufe0f|\uf647\uf3fb|\uf647\uf3fc|\uf647\uf3fd|\uf647\uf3fe|\uf647\uf3ff|\uf647\uf3fb\u200d\u2642\ufe0f|\uf647\uf3fc\u200d\u2642\ufe0f|\uf647\uf3fd\u200d\u2642\ufe0f|\uf647\uf3fe\u200d\u2642\ufe0f|\uf647\uf3ff\u200d\u2642\ufe0f|\uf647\uf3fb\u200d\u2640\ufe0f|\uf647\uf3fc\u200d\u2640\ufe0f|\uf647\uf3fd\u200d\u2640\ufe0f|\uf647\uf3fe\u200d\u2640\ufe0f|\uf647\uf3ff\u200d\u2640\ufe0f|\uf926\uf3fb|\uf926\uf3fc|\uf926\uf3fd|\uf926\uf3fe|\uf926\uf3ff|\uf926\uf3fb\u200d\u2642\ufe0f|\uf926\uf3fc\u200d\u2642\ufe0f|\uf926\uf3fd\u200d\u2642\ufe0f|\uf926\uf3fe\u200d\u2642\ufe0f|\uf926\uf3ff\u200d\u2642\ufe0f|\uf926\uf3fb\u200d\u2640\ufe0f|\uf926\uf3fc\u200d\u2640\ufe0f|\uf926\uf3fd\u200d\u2640\ufe0f|\uf926\uf3fe\u200d\u2640\ufe0f|\uf926\uf3ff\u200d\u2640\ufe0f|\uf937\uf3fb|\uf937\uf3fc|\uf937\uf3fd|\uf937\uf3fe|\uf937\uf3ff|\uf937\uf3fb\u200d\u2642\ufe0f|\uf937\uf3fc\u200d\u2642\ufe0f|\uf937\uf3fd\u200d\u2642\ufe0f|\uf937\uf3fe\u200d\u2642\ufe0f|\uf937\uf3ff\u200d\u2642\ufe0f|\uf937\uf3fb\u200d\u2640\ufe0f|\uf937\uf3fc\u200d\u2640\ufe0f|\uf937\uf3fd\u200d\u2640\ufe0f|\uf937\uf3fe\u200d\u2640\ufe0f|\uf937\uf3ff\u200d\u2640\ufe0f|\uf486\uf3fb|\uf486\uf3fc|\uf486\uf3fd|\uf486\uf3fe|\uf486\uf3ff|\uf486\uf3fb\u200d\u2642\ufe0f|\uf486\uf3fc\u200d\u2642\ufe0f|\uf486\uf3fd\u200d\u2642\ufe0f|\uf486\uf3fe\u200d\u2642\ufe0f|\uf486\uf3ff\u200d\u2642\ufe0f|\uf486\uf3fb\u200d\u2640\ufe0f|\uf486\uf3fc\u200d\u2640\ufe0f|\uf486\uf3fd\u200d\u2640\ufe0f|\uf486\uf3fe\u200d\u2640\ufe0f|\uf486\uf3ff\u200d\u2640\ufe0f|\uf487\uf3fb|\uf487\uf3fc|\uf487\uf3fd|\uf487\uf3fe|\uf487\uf3ff|\uf487\uf3fb\u200d\u2642\ufe0f|\uf487\uf3fc\u200d\u2642\ufe0f|\uf487\uf3fd\u200d\u2642\ufe0f|\uf487\uf3fe\u200d\u2642\ufe0f|\uf487\uf3ff\u200d\u2642\ufe0f|\uf487\uf3fb\u200d\u2640\ufe0f|\uf487\uf3fc\u200d\u2640\ufe0f|\uf487\uf3fd\u200d\u2640\ufe0f|\uf487\uf3fe\u200d\u2640\ufe0f|\uf487\uf3ff\u200d\u2640\ufe0f|\uf6b6\uf3fb|\uf6b6\uf3fc|\uf6b6\uf3fd|\uf6b6\uf3fe|\uf6b6\uf3ff|\uf6b6\uf3fb\u200d\u2642\ufe0f|\uf6b6\uf3fc\u200d\u2642\ufe0f|\uf6b6\uf3fd\u200d\u2642\ufe0f|\uf6b6\uf3fe\u200d\u2642\ufe0f|\uf6b6\uf3ff\u200d\u2642\ufe0f|\uf6b6\uf3fb\u200d\u2640\ufe0f|\uf6b6\uf3fc\u200d\u2640\ufe0f|\uf6b6\uf3fd\u200d\u2640\ufe0f|\uf6b6\uf3fe\u200d\u2640\ufe0f|\uf6b6\uf3ff\u200d\u2640\ufe0f|\uf3c3\uf3fb|\uf3c3\uf3fc|\uf3c3\uf3fd|\uf3c3\uf3fe|\uf3c3\uf3ff|\uf3c3\uf3fb\u200d\u2642\ufe0f|\uf3c3\uf3fc\u200d\u2642\ufe0f|\uf3c3\uf3fd\u200d\u2642\ufe0f|\uf3c3\uf3fe\u200d\u2642\ufe0f|\uf3c3\uf3ff\u200d\u2642\ufe0f|\uf3c3\uf3fb\u200d\u2640\ufe0f|\uf3c3\uf3fc\u200d\u2640\ufe0f|\uf3c3\uf3fd\u200d\u2640\ufe0f|\uf3c3\uf3fe\u200d\u2640\ufe0f|\uf3c3\uf3ff\u200d\u2640\ufe0f|\uf483\uf3fb|\uf483\uf3fc|\uf483\uf3fd|\uf483\uf3fe|\uf483\uf3ff|\uf57a\uf3fb|\uf57a\uf3fc|\uf57a\uf3fd|\uf57a\uf3fe|\uf57a\uf3ff|\uf9d6\uf3fb|\uf9d6\uf3fc|\uf9d6\uf3fd|\uf9d6\uf3fe|\uf9d6\uf3ff|\uf9d6\uf3fb\u200d\u2640\ufe0f|\uf9d6\uf3fc\u200d\u2640\ufe0f|\uf9d6\uf3fd\u200d\u2640\ufe0f|\uf9d6\uf3fe\u200d\u2640\ufe0f|\uf9d6\uf3ff\u200d\u2640\ufe0f|\uf9d6\uf3fb\u200d\u2642\ufe0f|\uf9d6\uf3fc\u200d\u2642\ufe0f|\uf9d6\uf3fd\u200d\u2642\ufe0f|\uf9d6\uf3fe\u200d\u2642\ufe0f|\uf9d6\uf3ff\u200d\u2642\ufe0f|\uf9d7\uf3fb|\uf9d7\uf3fc|\uf9d7\uf3fd|\uf9d7\uf3fe|\uf9d7\uf3ff|\uf9d7\uf3fb\u200d\u2640\ufe0f|\uf9d7\uf3fc\u200d\u2640\ufe0f|\uf9d7\uf3fd\u200d\u2640\ufe0f|\uf9d7\uf3fe\u200d\u2640\ufe0f|\uf9d7\uf3ff\u200d\u2640\ufe0f|\uf9d7\uf3fb\u200d\u2642\ufe0f|\uf9d7\uf3fc\u200d\u2642\ufe0f|\uf9d7\uf3fd\u200d\u2642\ufe0f|\uf9d7\uf3fe\u200d\u2642\ufe0f|\uf9d7\uf3ff\u200d\u2642\ufe0f|\uf9d8\uf3fb|\uf9d8\uf3fc|\uf9d8\uf3fd|\uf9d8\uf3fe|\uf9d8\uf3ff|\uf9d8\uf3fb\u200d\u2640\ufe0f|\uf9d8\uf3fc\u200d\u2640\ufe0f|\uf9d8\uf3fd\u200d\u2640\ufe0f|\uf9d8\uf3fe\u200d\u2640\ufe0f|\uf9d8\uf3ff\u200d\u2640\ufe0f|\uf9d8\uf3fb\u200d\u2642\ufe0f|\uf9d8\uf3fc\u200d\u2642\ufe0f|\uf9d8\uf3fd\u200d\u2642\ufe0f|\uf9d8\uf3fe\u200d\u2642\ufe0f|\uf9d8\uf3ff\u200d\u2642\ufe0f|\uf6c0\uf3fb|\uf6c0\uf3fc|\uf6c0\uf3fd|\uf6c0\uf3fe|\uf6c0\uf3ff|\uf6cc\uf3fb|\uf6cc\uf3fc|\uf6cc\uf3fd|\uf6cc\uf3fe|\uf6cc\uf3ff|\uf574\uf3fb|\uf574\uf3fc|\uf574\uf3fd|\uf574\uf3fe|\uf574\uf3ff|\uf3c7\uf3fb|\uf3c7\uf3fc|\uf3c7\uf3fd|\uf3c7\uf3fe|\uf3c7\uf3ff|\uf3c2\uf3fb|\uf3c2\uf3fc|\uf3c2\uf3fd|\uf3c2\uf3fe|\uf3c2\uf3ff|\uf3cc\uf3fb|\uf3cc\uf3fc|\uf3cc\uf3fd|\uf3cc\uf3fe|\uf3cc\uf3ff|\uf3cc\uf3fb\u200d\u2642\ufe0f|\uf3cc\uf3fc\u200d\u2642\ufe0f|\uf3cc\uf3fd\u200d\u2642\ufe0f|\uf3cc\uf3fe\u200d\u2642\ufe0f|\uf3cc\uf3ff\u200d\u2642\ufe0f|\uf3cc\uf3fb\u200d\u2640\ufe0f|\uf3cc\uf3fc\u200d\u2640\ufe0f|\uf3cc\uf3fd\u200d\u2640\ufe0f|\uf3cc\uf3fe\u200d\u2640\ufe0f|\uf3cc\uf3ff\u200d\u2640\ufe0f|\uf3c4\uf3fb|\uf3c4\uf3fc|\uf3c4\uf3fd|\uf3c4\uf3fe|\uf3c4\uf3ff|\uf3c4\uf3fb\u200d\u2642\ufe0f|\uf3c4\uf3fc\u200d\u2642\ufe0f|\uf3c4\uf3fd\u200d\u2642\ufe0f|\uf3c4\uf3fe\u200d\u2642\ufe0f|\uf3c4\uf3ff\u200d\u2642\ufe0f|\uf3c4\uf3fb\u200d\u2640\ufe0f|\uf3c4\uf3fc\u200d\u2640\ufe0f|\uf3c4\uf3fd\u200d\u2640\ufe0f|\uf3c4\uf3fe\u200d\u2640\ufe0f|\uf3c4\uf3ff\u200d\u2640\ufe0f|\uf6a3\uf3fb|\uf6a3\uf3fc|\uf6a3\uf3fd|\uf6a3\uf3fe|\uf6a3\uf3ff|\uf6a3\uf3fb\u200d\u2642\ufe0f|\uf6a3\uf3fc\u200d\u2642\ufe0f|\uf6a3\uf3fd\u200d\u2642\ufe0f|\uf6a3\uf3fe\u200d\u2642\ufe0f|\uf6a3\uf3ff\u200d\u2642\ufe0f|\uf6a3\uf3fb\u200d\u2640\ufe0f|\uf6a3\uf3fc\u200d\u2640\ufe0f|\uf6a3\uf3fd\u200d\u2640\ufe0f|\uf6a3\uf3fe\u200d\u2640\ufe0f|\uf6a3\uf3ff\u200d\u2640\ufe0f|\uf3ca\uf3fb|\uf3ca\uf3fc|\uf3ca\uf3fd|\uf3ca\uf3fe|\uf3ca\uf3ff|\uf3ca\uf3fb\u200d\u2642\ufe0f|\uf3ca\uf3fc\u200d\u2642\ufe0f|\uf3ca\uf3fd\u200d\u2642\ufe0f|\uf3ca\uf3fe\u200d\u2642\ufe0f|\uf3ca\uf3ff\u200d\u2642\ufe0f|\uf3ca\uf3fb\u200d\u2640\ufe0f|\uf3ca\uf3fc\u200d\u2640\ufe0f|\uf3ca\uf3fd\u200d\u2640\ufe0f|\uf3ca\uf3fe\u200d\u2640\ufe0f|\uf3ca\uf3ff\u200d\u2640\ufe0f|\uf3cb\uf3fb|\uf3cb\uf3fc|\uf3cb\uf3fd|\uf3cb\uf3fe|\uf3cb\uf3ff|\uf3cb\uf3fb\u200d\u2642\ufe0f|\uf3cb\uf3fc\u200d\u2642\ufe0f|\uf3cb\uf3fd\u200d\u2642\ufe0f|\uf3cb\uf3fe\u200d\u2642\ufe0f|\uf3cb\uf3ff\u200d\u2642\ufe0f|\uf3cb\uf3fb\u200d\u2640\ufe0f|\uf3cb\uf3fc\u200d\u2640\ufe0f|\uf3cb\uf3fd\u200d\u2640\ufe0f|\uf3cb\uf3fe\u200d\u2640\ufe0f|\uf3cb\uf3ff\u200d\u2640\ufe0f|\uf6b4\uf3fb|\uf6b4\uf3fc|\uf6b4\uf3fd|\uf6b4\uf3fe|\uf6b4\uf3ff|\uf6b4\uf3fb\u200d\u2642\ufe0f|\uf6b4\uf3fc\u200d\u2642\ufe0f|\uf6b4\uf3fd\u200d\u2642\ufe0f|\uf6b4\uf3fe\u200d\u2642\ufe0f|\uf6b4\uf3ff\u200d\u2642\ufe0f|\uf6b4\uf3fb\u200d\u2640\ufe0f|\uf6b4\uf3fc\u200d\u2640\ufe0f|\uf6b4\uf3fd\u200d\u2640\ufe0f|\uf6b4\uf3fe\u200d\u2640\ufe0f|\uf6b4\uf3ff\u200d\u2640\ufe0f|\uf6b5\uf3fb|\uf6b5\uf3fc|\uf6b5\uf3fd|\uf6b5\uf3fe|\uf6b5\uf3ff|\uf6b5\uf3fb\u200d\u2642\ufe0f|\uf6b5\uf3fc\u200d\u2642\ufe0f|\uf6b5\uf3fd\u200d\u2642\ufe0f|\uf6b5\uf3fe\u200d\u2642\ufe0f|\uf6b5\uf3ff\u200d\u2642\ufe0f|\uf6b5\uf3fb\u200d\u2640\ufe0f|\uf6b5\uf3fc\u200d\u2640\ufe0f|\uf6b5\uf3fd\u200d\u2640\ufe0f|\uf6b5\uf3fe\u200d\u2640\ufe0f|\uf6b5\uf3ff\u200d\u2640\ufe0f|\uf938\uf3fb|\uf938\uf3fc|\uf938\uf3fd|\uf938\uf3fe|\uf938\uf3ff|\uf938\uf3fb\u200d\u2642\ufe0f|\uf938\uf3fc\u200d\u2642\ufe0f|\uf938\uf3fd\u200d\u2642\ufe0f|\uf938\uf3fe\u200d\u2642\ufe0f|\uf938\uf3ff\u200d\u2642\ufe0f|\uf938\uf3fb\u200d\u2640\ufe0f|\uf938\uf3fc\u200d\u2640\ufe0f|\uf938\uf3fd\u200d\u2640\ufe0f|\uf938\uf3fe\u200d\u2640\ufe0f|\uf938\uf3ff\u200d\u2640\ufe0f|\uf93d\uf3fb|\uf93d\uf3fc|\uf93d\uf3fd|\uf93d\uf3fe|\uf93d\uf3ff|\uf93d\uf3fb\u200d\u2642\ufe0f|\uf93d\uf3fc\u200d\u2642\ufe0f|\uf93d\uf3fd\u200d\u2642\ufe0f|\uf93d\uf3fe\u200d\u2642\ufe0f|\uf93d\uf3ff\u200d\u2642\ufe0f|\uf93d\uf3fb\u200d\u2640\ufe0f|\uf93d\uf3fc\u200d\u2640\ufe0f|\uf93d\uf3fd\u200d\u2640\ufe0f|\uf93d\uf3fe\u200d\u2640\ufe0f|\uf93d\uf3ff\u200d\u2640\ufe0f|\uf93e\uf3fb|\uf93e\uf3fc|\uf93e\uf3fd|\uf93e\uf3fe|\uf93e\uf3ff|\uf93e\uf3fb\u200d\u2642\ufe0f|\uf93e\uf3fc\u200d\u2642\ufe0f|\uf93e\uf3fd\u200d\u2642\ufe0f|\uf93e\uf3fe\u200d\u2642\ufe0f|\uf93e\uf3ff\u200d\u2642\ufe0f|\uf93e\uf3fb\u200d\u2640\ufe0f|\uf93e\uf3fc\u200d\u2640\ufe0f|\uf93e\uf3fd\u200d\u2640\ufe0f|\uf93e\uf3fe\u200d\u2640\ufe0f|\uf93e\uf3ff\u200d\u2640\ufe0f|\uf939\uf3fb|\uf939\uf3fc|\uf939\uf3fd|\uf939\uf3fe|\uf939\uf3ff|\uf939\uf3fb\u200d\u2642\ufe0f|\uf939\uf3fc\u200d\u2642\ufe0f|\uf939\uf3fd\u200d\u2642\ufe0f|\uf939\uf3fe\u200d\u2642\ufe0f|\uf939\uf3ff\u200d\u2642\ufe0f|\uf939\uf3fb\u200d\u2640\ufe0f|\uf939\uf3fc\u200d\u2640\ufe0f|\uf939\uf3fd\u200d\u2640\ufe0f|\uf939\uf3fe\u200d\u2640\ufe0f|\uf939\uf3ff\u200d\u2640\ufe0f|\uf933\uf3fb|\uf933\uf3fc|\uf933\uf3fd|\uf933\uf3fe|\uf933\uf3ff|\uf4aa\uf3fb|\uf4aa\uf3fc|\uf4aa\uf3fd|\uf4aa\uf3fe|\uf4aa\uf3ff|\uf448\uf3fb|\uf448\uf3fc|\uf448\uf3fd|\uf448\uf3fe|\uf448\uf3ff|\uf449\uf3fb|\uf449\uf3fc|\uf449\uf3fd|\uf449\uf3fe|\uf449\uf3ff|\uf446\uf3fb|\uf446\uf3fc|\uf446\uf3fd|\uf446\uf3fe|\uf446\uf3ff|\uf595\uf3fb|\uf595\uf3fc|\uf595\uf3fd|\uf595\uf3fe|\uf595\uf3ff|\uf447\uf3fb|\uf447\uf3fc|\uf447\uf3fd|\uf447\uf3fe|\uf447\uf3ff|\uf91e\uf3fb|\uf91e\uf3fc|\uf91e\uf3fd|\uf91e\uf3fe|\uf91e\uf3ff|\uf596\uf3fb|\uf596\uf3fc|\uf596\uf3fd|\uf596\uf3fe|\uf596\uf3ff|\uf918\uf3fb|\uf918\uf3fc|\uf918\uf3fd|\uf918\uf3fe|\uf918\uf3ff|\uf919\uf3fb|\uf919\uf3fc|\uf919\uf3fd|\uf919\uf3fe|\uf919\uf3ff|\uf590\uf3fb|\uf590\uf3fc|\uf590\uf3fd|\uf590\uf3fe|\uf590\uf3ff|\uf44c\uf3fb|\uf44c\uf3fc|\uf44c\uf3fd|\uf44c\uf3fe|\uf44c\uf3ff|\uf44d\uf3fb|\uf44d\uf3fc|\uf44d\uf3fd|\uf44d\uf3fe|\uf44d\uf3ff|\uf44e\uf3fb|\uf44e\uf3fc|\uf44e\uf3fd|\uf44e\uf3fe|\uf44e\uf3ff|\uf44a\uf3fb|\uf44a\uf3fc|\uf44a\uf3fd|\uf44a\uf3fe|\uf44a\uf3ff|\uf91b\uf3fb|\uf91b\uf3fc|\uf91b\uf3fd|\uf91b\uf3fe|\uf91b\uf3ff|\uf91c\uf3fb|\uf91c\uf3fc|\uf91c\uf3fd|\uf91c\uf3fe|\uf91c\uf3ff|\uf91a\uf3fb|\uf91a\uf3fc|\uf91a\uf3fd|\uf91a\uf3fe|\uf91a\uf3ff|\uf44b\uf3fb|\uf44b\uf3fc|\uf44b\uf3fd|\uf44b\uf3fe|\uf44b\uf3ff|\uf91f\uf3fb|\uf91f\uf3fc|\uf91f\uf3fd|\uf91f\uf3fe|\uf91f\uf3ff|\uf44f\uf3fb|\uf44f\uf3fc|\uf44f\uf3fd|\uf44f\uf3fe|\uf44f\uf3ff|\uf450\uf3fb|\uf450\uf3fc|\uf450\uf3fd|\uf450\uf3fe|\uf450\uf3ff|\uf64c\uf3fb|\uf64c\uf3fc|\uf64c\uf3fd|\uf64c\uf3fe|\uf64c\uf3ff|\uf932\uf3fb|\uf932\uf3fc|\uf932\uf3fd|\uf932\uf3fe|\uf932\uf3ff|\uf64f\uf3fb|\uf64f\uf3fc|\uf64f\uf3fd|\uf64f\uf3fe|\uf64f\uf3ff|\uf485\uf3fb|\uf485\uf3fc|\uf485\uf3fd|\uf485\uf3fe|\uf485\uf3ff|\uf442\uf3fb|\uf442\uf3fc|\uf442\uf3fd|\uf442\uf3fe|\uf442\uf3ff|\uf443\uf3fb|\uf443\uf3fc|\uf443\uf3fd|\uf443\uf3fe|\uf443\uf3ff|\uf1e6\uf1e8|\uf1e6\uf1e9|\uf1e6\uf1ea|\uf1e6\uf1eb|\uf1e6\uf1ec|\uf1e6\uf1ee|\uf1e6\uf1f1|\uf1e6\uf1f2|\uf1e6\uf1f4|\uf1e6\uf1f6|\uf1e6\uf1f7|\uf1e6\uf1f8|\uf1e6\uf1f9|\uf1e6\uf1fa|\uf1e6\uf1fc|\uf1e6\uf1fd|\uf1e6\uf1ff|\uf1e7\uf1e6|\uf1e7\uf1e7|\uf1e7\uf1e9|\uf1e7\uf1ea|\uf1e7\uf1eb|\uf1e7\uf1ec|\uf1e7\uf1ed|\uf1e7\uf1ee|\uf1e7\uf1ef|\uf1e7\uf1f1|\uf1e7\uf1f2|\uf1e7\uf1f3|\uf1e7\uf1f4|\uf1e7\uf1f6|\uf1e7\uf1f7|\uf1e7\uf1f8|\uf1e7\uf1f9|\uf1e7\uf1fb|\uf1e7\uf1fc|\uf1e7\uf1fe|\uf1e7\uf1ff|\uf1e8\uf1e6|\uf1e8\uf1e8|\uf1e8\uf1e9|\uf1e8\uf1eb|\uf1e8\uf1ec|\uf1e8\uf1ed|\uf1e8\uf1ee|\uf1e8\uf1f0|\uf1e8\uf1f1|\uf1e8\uf1f2|\uf1e8\uf1f3|\uf1e8\uf1f4|\uf1e8\uf1f5|\uf1e8\uf1f7|\uf1e8\uf1fa|\uf1e8\uf1fb|\uf1e8\uf1fc|\uf1e8\uf1fd|\uf1e8\uf1fe|\uf1e8\uf1ff|\uf1e9\uf1ea|\uf1e9\uf1ec|\uf1e9\uf1ef|\uf1e9\uf1f0|\uf1e9\uf1f2|\uf1e9\uf1f4|\uf1e9\uf1ff|\uf1ea\uf1e6|\uf1ea\uf1e8|\uf1ea\uf1ea|\uf1ea\uf1ec|\uf1ea\uf1ed|\uf1ea\uf1f7|\uf1ea\uf1f8|\uf1ea\uf1f9|\uf1ea\uf1fa|\uf1eb\uf1ee|\uf1eb\uf1ef|\uf1eb\uf1f0|\uf1eb\uf1f2|\uf1eb\uf1f4|\uf1eb\uf1f7|\uf1ec\uf1e6|\uf1ec\uf1e7|\uf1ec\uf1e9|\uf1ec\uf1ea|\uf1ec\uf1eb|\uf1ec\uf1ec|\uf1ec\uf1ed|\uf1ec\uf1ee|\uf1ec\uf1f1|\uf1ec\uf1f2|\uf1ec\uf1f3|\uf1ec\uf1f5|\uf1ec\uf1f6|\uf1ec\uf1f7|\uf1ec\uf1f8|\uf1ec\uf1f9|\uf1ec\uf1fa|\uf1ec\uf1fc|\uf1ec\uf1fe|\uf1ed\uf1f0|\uf1ed\uf1f2|\uf1ed\uf1f3|\uf1ed\uf1f7|\uf1ed\uf1f9|\uf1ed\uf1fa|\uf1ee\uf1e8|\uf1ee\uf1e9|\uf1ee\uf1ea|\uf1ee\uf1f1|\uf1ee\uf1f2|\uf1ee\uf1f3|\uf1ee\uf1f4|\uf1ee\uf1f6|\uf1ee\uf1f7|\uf1ee\uf1f8|\uf1ee\uf1f9|\uf1ef\uf1ea|\uf1ef\uf1f2|\uf1ef\uf1f4|\uf1ef\uf1f5|\uf1f0\uf1ea|\uf1f0\uf1ec|\uf1f0\uf1ed|\uf1f0\uf1ee|\uf1f0\uf1f2|\uf1f0\uf1f3|\uf1f0\uf1f5|\uf1f0\uf1f7|\uf1f0\uf1fc|\uf1f0\uf1fe|\uf1f0\uf1ff|\uf1f1\uf1e6|\uf1f1\uf1e7|\uf1f1\uf1e8|\uf1f1\uf1ee|\uf1f1\uf1f0|\uf1f1\uf1f7|\uf1f1\uf1f8|\uf1f1\uf1f9|\uf1f1\uf1fa|\uf1f1\uf1fb|\uf1f1\uf1fe|\uf1f2\uf1e6|\uf1f2\uf1e8|\uf1f2\uf1e9|\uf1f2\uf1ea|\uf1f2\uf1eb|\uf1f2\uf1ec|\uf1f2\uf1ed|\uf1f2\uf1f0|\uf1f2\uf1f1|\uf1f2\uf1f2|\uf1f2\uf1f3|\uf1f2\uf1f4|\uf1f2\uf1f5|\uf1f2\uf1f6|\uf1f2\uf1f7|\uf1f2\uf1f8|\uf1f2\uf1f9|\uf1f2\uf1fa|\uf1f2\uf1fb|\uf1f2\uf1fc|\uf1f2\uf1fd|\uf1f2\uf1fe|\uf1f2\uf1ff|\uf1f3\uf1e6|\uf1f3\uf1e8|\uf1f3\uf1ea|\uf1f3\uf1eb|\uf1f3\uf1ec|\uf1f3\uf1ee|\uf1f3\uf1f1|\uf1f3\uf1f4|\uf1f3\uf1f5|\uf1f3\uf1f7|\uf1f3\uf1fa|\uf1f3\uf1ff|\uf1f4\uf1f2|\uf1f5\uf1e6|\uf1f5\uf1ea|\uf1f5\uf1eb|\uf1f5\uf1ec|\uf1f5\uf1ed|\uf1f5\uf1f0|\uf1f5\uf1f1|\uf1f5\uf1f2|\uf1f5\uf1f3|\uf1f5\uf1f7|\uf1f5\uf1f8|\uf1f5\uf1f9|\uf1f5\uf1fc|\uf1f5\uf1fe|\uf1f6\uf1e6|\uf1f7\uf1ea|\uf1f7\uf1f4|\uf1f7\uf1f8|\uf1f7\uf1fa|\uf1f7\uf1fc|\uf1f8\uf1e6|\uf1f8\uf1e7|\uf1f8\uf1e8|\uf1f8\uf1e9|\uf1f8\uf1ea|\uf1f8\uf1ec|\uf1f8\uf1ed|\uf1f8\uf1ee|\uf1f8\uf1ef|\uf1f8\uf1f0|\uf1f8\uf1f1|\uf1f8\uf1f2|\uf1f8\uf1f3|\uf1f8\uf1f4|\uf1f8\uf1f7|\uf1f8\uf1f8|\uf1f8\uf1f9|\uf1f8\uf1fb|\uf1f8\uf1fd|\uf1f8\uf1fe|\uf1f8\uf1ff|\uf1f9\uf1e6|\uf1f9\uf1e8|\uf1f9\uf1e9|\uf1f9\uf1eb|\uf1f9\uf1ec|\uf1f9\uf1ed|\uf1f9\uf1ef|\uf1f9\uf1f0|\uf1f9\uf1f1|\uf1f9\uf1f2|\uf1f9\uf1f3|\uf1f9\uf1f4|\uf1f9\uf1f7|\uf1f9\uf1f9|\uf1f9\uf1fb|\uf1f9\uf1fc|\uf1f9\uf1ff|\uf1fa\uf1e6|\uf1fa\uf1ec|\uf1fa\uf1f2|\uf1fa\uf1f3|\uf1fa\uf1f8|\uf1fa\uf1fe|\uf1fa\uf1ff|\uf1fb\uf1e6|\uf1fb\uf1e8|\uf1fb\uf1ea|\uf1fb\uf1ec|\uf1fb\uf1ee|\uf1fb\uf1f3|\uf1fb\uf1fa|\uf1fc\uf1eb|\uf1fc\uf1f8|\uf1fd\uf1f0|\uf1fe\uf1ea|\uf1fe\uf1f9|\uf1ff\uf1e6|\uf1ff\uf1f2|\uf1ff\uf1fc|\uf004|\uf0cf|[\uf170-\uf171]|[\uf17e-\uf17f]|\uf18e|[\uf191-\uf19a]|[\uf201-\uf202]|\uf21a|\uf22f|[\uf232-\uf23a]|[\uf250-\uf251]|[\uf300-\uf321]|[\uf324-\uf393]|[\uf396-\uf397]|[\uf399-\uf39b]|[\uf39e-\uf3f0]|[\uf3f3-\uf3f5]|[\uf3f7-\uf3fa]|[\uf400-\uf4fd]|[\uf4ff-\uf53d]|[\uf549-\uf54e]|[\uf550-\uf567]|[\uf56f-\uf570]|[\uf573-\uf57a]|\uf587|[\uf58a-\uf58d]|\uf590|[\uf595-\uf596]|[\uf5a4-\uf5a5]|\uf5a8|[\uf5b1-\uf5b2]|\uf5bc|[\uf5c2-\uf5c4]|[\uf5d1-\uf5d3]|[\uf5dc-\uf5de]|\uf5e1|\uf5e3|\uf5e8|\uf5ef|\uf5f3|[\uf5fa-\uf64f]|[\uf680-\uf6c5]|[\uf6cb-\uf6d2]|[\uf6e0-\uf6e5]|\uf6e9|[\uf6eb-\uf6ec]|\uf6f0|[\uf6f3-\uf6f8]|[\uf910-\uf93a]|[\uf93c-\uf93e]|[\uf940-\uf945]|[\uf947-\uf94c]|[\uf950-\uf96b]|[\uf980-\uf997]|\uf9c0|[\uf9d0-\uf9e6]/g
    };
    // 错杀部分  /\uf004|\uf0cf|[\uf170-\uf171]|[\uf17e-\uf17f]|\uf18e|[\uf191-\uf19a]|[\uf1e6-\uf1ff]|[\uf201-\uf202]|\uf21a|\uf22f|[\uf232-\uf23a]|[\uf250-\uf251]|[\uf300-\uf321]|[\uf324-\uf33e]|[\uf33e-\uf373]|[\uf373-\uf393]|\uf393|[\uf396-\uf397]|[\uf399-\uf39b]|[\uf39e-\uf3a4]|[\uf3a4-\uf3a8]|[\uf3a8-\uf3eb]|[\uf3eb-\uf3ed]|[\uf3ed-\uf3f0]|[\uf3f3-\uf3f5]|[\uf3f7-\uf48b]|[\uf48b-\uf4bb]|[\uf4bb-\uf4bc]|[\uf4bc-\uf4fd]|[\uf4ff-\uf527]|[\uf527-\uf52c]|[\uf52c-\uf53d]|[\uf549-\uf54e]|[\uf550-\uf567]|[\uf56f-\uf570]|[\uf573-\uf57a]|\uf587|[\uf58a-\uf58d]|\uf590|[\uf595-\uf596]|[\uf5a4-\uf5a5]|\uf5a8|[\uf5b1-\uf5b2]|\uf5bc|[\uf5c2-\uf5c4]|[\uf5d1-\uf5d3]|[\uf5dc-\uf5de]|\uf5e1|\uf5e3|\uf5e8|\uf5e8|\uf5ef|\uf5f3|[\uf5fa-\uf64f]|\uf680|[\uf680-\uf692]|[\uf692-\uf6c5]|[\uf6cb-\uf6d2]|[\uf6e0-\uf6e5]|\uf6e9|[\uf6eb-\uf6ec]|\uf6f0|[\uf6f3-\uf6f8]|[\uf910-\uf93a]|[\uf93c-\uf93e]|[\uf940-\uf945]|[\uf947-\uf94c]|[\uf950-\uf96b]|[\uf980-\uf997]|\uf9c0|[\uf9d0-\uf9e6]/g;

    var supportLanguage = [ "en" ,"zh" ];

    /* 用于 emoji 正则匹配 */
    var regExpTag;

    /* 判断是否支持emoji的渲染 */
    var isSupportEmoji = true;

    var names = [];
    var emojis = [];

    /**
     * 初始化
     * @param  {object} emoji  可选，包含dataSource和url。 dataSource包含扩展的表情信息, key为标识表情的unicode码
     * @param  {object} config 可选，包括size, lang, url, regExp 四个可选属性。分别表示html大小，输出语言，图片背景图，匹配unicode码的正则表达式
     */
    var init = function(newEmojis, opt) {
        configs = extend(configs, opt);

        var newEmojiFactory = getNewEmojiFactory(newEmojis, configs);
        emojiFactory = extend(emojiFactory, newEmojiFactory);

        setupEmojiRegExp(emojiFactory);
    };

    var extend = function() {
        if (arguments.length === 0) {
            return;
        }
        var obj = arguments[0];
        for (var i = 1, len = arguments.length; i < len; i++) {
            var other = arguments[i];
            for (var item in other) {
                obj[item] = other[item];
            }
        }
        return obj;
    };

    var getNewEmojiFactory = function(newEmojis, opt) {
        var newEmojiFactory = {};
        if (newEmojis) {
            var _emojiFactory = newEmojis.dataSource;
            var _url = newEmojis.url || opt.url;
            for (var key in _emojiFactory) {
                _emojiFactory[key]["background"] = _url;
                newEmojiFactory[key] = _emojiFactory[key];
            }
        }
        return newEmojiFactory;
    }

    var setupEmojiRegExp = function(emojiFac ,tagReg) {
        emojiSymbols.length = 0;
        emojiHtmls.length = 0;

        var tags = [];
        var lang = configs.lang;
        for (var key in emojiFac) {
            var emoji = emojiFac[key];
            tags.push(escape(emoji.tag));
            setupEmojiDetail(emoji);
        }
        tags = tags.join("|");
        var regExp = new RegExp("%", "g");
        tags = tags.replace(regExp, function (x) { return "\\"; });
        regExpTag = new RegExp("(" + tags + ")", "g");
    };

    function setupEmojiDetail(emoji) {
        var lang = configs.lang;
        emojiSymbols.push(emoji[lang]);
        emojiDetails.push({
            "name": "[" + emoji[lang] + "]",
            "emoji": emoji.tag,
            "zh": emoji.zh,
            "en": emoji.en
        });
        names.push("[" + emoji[lang] + "]");
        emojis.push(emoji.tag);
    }

    var calculateUTF = function (char) {
        char = escape(char);
        var unicodes = char.split('%u');
        unicodes = unicodes.filter(function(code) {
            return code !== '';
        });
        return unicodes.map(function(code) {
            if (code.indexOf('f') !== -1 || code.indexOf('F') !== -1) {
                return String.fromCodePoint('0x1' + code);
            } else {
                return String.fromCodePoint('0x' + code);
            }
        }).join('');

        // if (61440 < nativeEmoji.charCodeAt(0)) {
        //     var emojiUnicodeKey = escape(nativeEmoji).replace("%u", "u1");
        //     var emoji = emojiFactory[emojiUnicodeKey];
        //     if (emoji){
        //         return emoji.tag;
        //     }
        // }
        // return nativeEmoji;
    };

    var getEmojiBySymbol = function(symbol) {
        var temp = symbol.slice(1, symbol.length - 1);
        for (var i = 0; i < emojiDetails.length; i++) {
            var lang = configs.lang;
            var emoji = emojiDetails[i];
            if(emoji[lang] === temp) {
                return emoji.emoji;
            }
        }
        return "[" + symbol + "]";
    };


    /**
     * 将字符串中的unicode码转化为可以显示的原生emoji字符
     * @param  {string} emoji 必填，需要转化的字符串
     * @param  {regExp} reg      可选，标识unicode码的匹配范围。默认为init时设置的regExp，如果不设置，默认为/[\uf000-\uf700]/g
     * @return {string}          转化后的字符串
     */
    var emojiDecode = function(emojis, reg) {
        reg = reg || configs.reg;
        return emojis.replace(reg, function(emoji) {
            return calculateUTF(emoji) || emoji;
        });
    };

    /**
     * 将字符串中的原生emoji字符转化为 对应的文字标识
     * @param  {string} emojis 必填，需要转化的字符串
     * @param  {regExp} reg      可选，匹配的正则表达式
     * @return {string}          转化后的字符串
     */
    var emojiToSymbol = function(emojis, reg) {
        emojis = emojiDecode(emojis, reg);
        var emojiSymbol = {};
        emojiSymbol = emojis.replace(regExpTag, function(emojiTag) {
            var lang = configs.lang;
            for (var emojiKey in emojiFactory) {
                if (emojiFactory[emojiKey].tag == emojiTag) {
                    return "[" + emojiFactory[emojiKey][lang] + "]";
                }
            }
        });
        return emojiSymbol;
    };

    /**
     * 将字符串中的 对应文字标识 转化为原生emoji
     * @param  {string} symbols 必填
     * @return {string}           
     */
    var symbolToEmoji = function(symbols) {
        return symbols.replace(/\[([^\[\]]+?)\]/g, function(symbol) {
            return getEmojiBySymbol(symbol);
        });
    };

    /**
     * 获取所有emoji的详情
     * @return {array} 包含多个object，每个object包括tag, en, zh, name, html
     */
    var getAllEmoji = function() {
        return emojiDetails;
    };

    return {
        init: init,
        supportLanguage: supportLanguage,
        names : names,
        emojis: emojis,
        data: getAllEmoji(),
        emojiToSymbol: emojiToSymbol,
        symbolToEmoji: symbolToEmoji,
        unicodeToEmoji: emojiDecode
    };
})();