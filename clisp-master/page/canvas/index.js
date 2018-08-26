// 界面颜色及尺寸
let _width; // 屏幕宽度
let _height; // 屏幕宽度
let ctx;    // 画布操作对象
let center; // 画布中心坐标
let offsetTop;
const strokeWidth = 10; // 绘图宽度
const allColors = "Tomato,Turquoise,SteelBlue,Gold,BlueViolet,CornflowerBlue,Crimson,DarkCyan,DarkMagenta,DeepPink,DodgerBlue,ForestGreen,DarkOrange,LightSalmon,LightSeaGreen,Chocolate,MediumSlateBlue,Orange,OrangeRed,OliveDrab,Purple,PaleVioletRed,RoyalBlue,Salmon,SeaGreen,SandyBrown,SlateBlue,YellowGreen".split(','); // 可供选择的所有颜色
let colors = []; // 当前实际展示的颜色
const bgColor = '#ffffff';
const radiusScale = 0.7;  // 圆形区域尺寸所占比例

// 动画相关变量
let drawAnimation; // 动画定时器
let _gameLevel;
let _gameTap;
let _angle = 0; // 当前旋转角度
let curColor;   // 当前指针颜色
let speed = 0;  // 当前旋转速度
let catchMatchColor; // 是否开始记录错失区域
let levelUpLimit = 3; // 成功 n+1 次升级
let direction = 1; // 旋转方向 1 顺时针 -1 逆时针
const initSpeed = 6;
const drawTimeStop = 16.666;

// 游戏数据
const actionData = [];
let gameStartTime;
let gameEndTime;
let mockPlaying;
let endGameAction;
let canStartGame = true;

const hanzs = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '7': '七',
  '8': '八',
  '9': '九',
  '10': '十'
}

const pokerColorsArr = [{ "colorName": "AliceBlue", "colorNum": "#F0F8FF", "colorNameCN": "爱丽丝蓝" }, { "colorName": "AntiqueWhite", "colorNum": "#FAEBD7", "colorNameCN": "古代的白色" }, { "colorName": "Aqua", "colorNum": "#00FFFF", "colorNameCN": "水绿色" }, { "colorName": "Aquamarine", "colorNum": "#7FFFD4" }, { "colorName": "Azure", "colorNum": "#F0FFFF", "colorNameCN": "蔚蓝色" }, { "colorName": "Beige", "colorNum": "#F5F5DC" }, { "colorName": "Bisque", "colorNum": "#FFE4C4", "colorNameCN": "(浓汤)乳脂,番茄等" }, { "colorName": "Black", "colorNum": "#000000", "colorNameCN": "纯黑" }, { "colorName": "BlanchedAlmond", "colorNum": "#FFEBCD", "colorNameCN": "漂白的杏仁" }, { "colorName": "Blue", "colorNum": "#0000FF", "colorNameCN": "纯蓝" }, { "colorName": "BlueViolet", "colorNum": "#8A2BE2", "colorNameCN": "深紫罗兰的蓝色" }, { "colorName": "Brown", "colorNum": "#A52A2A", "colorNameCN": "棕色" }, { "colorName": "BurlyWood", "colorNum": "#DEB887", "colorNameCN": "结实的树" }, { "colorName": "CadetBlue", "colorNum": "#5F9EA0", "colorNameCN": "军校蓝" }, { "colorName": "Chartreuse", "colorNum": "#7FFF00", "colorNameCN": "查特酒绿" }, { "colorName": "Chocolate", "colorNum": "#D2691E", "colorNameCN": "巧克力" }, { "colorName": "Coral", "colorNum": "#FF7F50", "colorNameCN": "珊瑚" }, { "colorName": "CornflowerBlue", "colorNum": "#6495ED", "colorNameCN": "矢车菊的蓝色" }, { "colorName": "Cornsilk", "colorNum": "#FFF8DC", "colorNameCN": "玉米色" }, { "colorName": "Crimson", "colorNum": "#DC143C", "colorNameCN": "猩红" }, { "colorName": "Cyan", "colorNum": "#00FFFF", "colorNameCN": "水绿色" }, { "colorName": "DarkBlue", "colorNum": "#00008B", "colorNameCN": "深蓝色" }, { "colorName": "DarkCyan", "colorNum": "#008B8B", "colorNameCN": "深青色" }, { "colorName": "DarkGoldenRod", "colorNum": "#B8860B" }, { "colorName": "DarkGray", "colorNum": "#A9A9A9", "colorNameCN": "深灰色" }, { "colorName": "DarkGrey", "colorNum": "#A9A9A9", "colorNameCN": "深灰色" }, { "colorName": "DarkGreen", "colorNum": "#006400", "colorNameCN": "深绿色" }, { "colorName": "DarkKhaki", "colorNum": "#BDB76B", "colorNameCN": "深卡其布" }, { "colorName": "DarkMagenta", "colorNum": "#8B008B", "colorNameCN": "深洋红色" }, { "colorName": "DarkOliveGreen", "colorNum": "#556B2F", "colorNameCN": "橄榄土褐色" }, { "colorName": "DarkOrange", "colorNum": "#FF8C00", "colorNameCN": "深橙色" }, { "colorName": "DarkOrchid", "colorNum": "#9932CC", "colorNameCN": "深兰花紫" }, { "colorName": "DarkRed", "colorNum": "#8B0000", "colorNameCN": "深红色" }, { "colorName": "DarkSalmon", "colorNum": "#E9967A", "colorNameCN": "深鲜肉(鲑鱼)色" }, { "colorName": "DarkSeaGreen", "colorNum": "#8FBC8F", "colorNameCN": "深海洋绿" }, { "colorName": "DarkSlateBlue", "colorNum": "#483D8B", "colorNameCN": "深岩暗蓝灰色" }, { "colorName": "DarkSlateGray", "colorNum": "#2F4F4F", "colorNameCN": "深石板灰" }, { "colorName": "DarkSlateGrey", "colorNum": "#2F4F4F", "colorNameCN": "深石板灰" }, { "colorName": "DarkTurquoise", "colorNum": "#00CED1", "colorNameCN": "深绿宝石" }, { "colorName": "DarkViolet", "colorNum": "#9400D3", "colorNameCN": "深紫罗兰色" }, { "colorName": "DeepPink", "colorNum": "#FF1493", "colorNameCN": "深粉色" }, { "colorName": "DeepSkyBlue", "colorNum": "#00BFFF", "colorNameCN": "深天蓝" }, { "colorName": "DimGray", "colorNum": "#696969", "colorNameCN": "暗淡的灰色" }, { "colorName": "DimGrey", "colorNum": "#696969", "colorNameCN": "暗淡的灰色" }, { "colorName": "DodgerBlue", "colorNum": "#1E90FF", "colorNameCN": "道奇蓝" }, { "colorName": "FireBrick", "colorNum": "#B22222", "colorNameCN": "耐火砖" }, { "colorName": "FloralWhite", "colorNum": "#FFFAF0", "colorNameCN": "花的白色" }, { "colorName": "ForestGreen", "colorNum": "#228B22", "colorNameCN": "森林绿" }, { "colorName": "Fuchsia", "colorNum": "#FF00FF", "colorNameCN": "灯笼海棠(紫红色)" }, { "colorName": "Gainsboro", "colorNum": "#DCDCDC", "colorNameCN": "Gainsboro" }, { "colorName": "GhostWhite", "colorNum": "#F8F8FF", "colorNameCN": "幽灵的白色" }, { "colorName": "Gold", "colorNum": "#FFD700", "colorNameCN": "金" }, { "colorName": "GoldenRod", "colorNum": "#DAA520", "colorNameCN": "秋麒麟" }, { "colorName": "Gray", "colorNum": "#808080", "colorNameCN": "灰色" }, { "colorName": "Grey", "colorNum": "#808080", "colorNameCN": "灰色" }, { "colorName": "Green", "colorNum": "#008000", "colorNameCN": "纯绿" }, { "colorName": "GreenYellow", "colorNum": "#ADFF2F", "colorNameCN": "绿黄色" }, { "colorName": "HoneyDew", "colorNum": "#F0FFF0", "colorNameCN": "蜂蜜" }, { "colorName": "HotPink", "colorNum": "#FF69B4", "colorNameCN": "热情的粉红" }, { "colorName": "IndianRed", "colorNum": "#CD5C5C", "colorNameCN": "印度红" }, { "colorName": "Indigo", "colorNum": "#4B0082", "colorNameCN": "靛青" }, { "colorName": "Ivory", "colorNum": "#FFFFF0", "colorNameCN": "象牙" }, { "colorName": "Khaki", "colorNum": "#F0E68C", "colorNameCN": "卡其布" }, { "colorName": "Lavender", "colorNum": "#E6E6FA", "colorNameCN": "熏衣草花的淡紫色" }, { "colorName": "LavenderBlush", "colorNum": "#FFF0F5", "colorNameCN": "脸红的淡紫色" }, { "colorName": "LawnGreen", "colorNum": "#7CFC00", "colorNameCN": "草坪绿" }, { "colorName": "LemonChiffon", "colorNum": "#FFFACD", "colorNameCN": "柠檬薄纱" }, { "colorName": "LightBlue", "colorNum": "#ADD8E6", "colorNameCN": "淡蓝" }, { "colorName": "LightCoral", "colorNum": "#F08080", "colorNameCN": "淡珊瑚色" }, { "colorName": "LightCyan", "colorNum": "#E0FFFF" }, { "colorName": "LightGoldenRodYellow", "colorNum": "#FAFAD2", "colorNameCN": "浅秋麒麟黄" }, { "colorName": "LightGray", "colorNum": "#D3D3D3", "colorNameCN": "浅灰色" }, { "colorName": "LightGrey", "colorNum": "#D3D3D3", "colorNameCN": "浅灰色" }, { "colorName": "LightGreen", "colorNum": "#90EE90", "colorNameCN": "淡绿色" }, { "colorName": "LightPink", "colorNum": "#FFB6C1", "colorNameCN": "浅粉红" }, { "colorName": "LightSalmon", "colorNum": "#FFA07A", "colorNameCN": "浅鲜肉(鲑鱼)色" }, { "colorName": "LightSeaGreen", "colorNum": "#20B2AA", "colorNameCN": "浅海洋绿" }, { "colorName": "LightSkyBlue", "colorNum": "#87CEFA", "colorNameCN": "淡蓝色" }, { "colorName": "LightSlateGray", "colorNum": "#778899", "colorNameCN": "浅石板灰" }, { "colorName": "LightSlateGrey", "colorNum": "#778899", "colorNameCN": "浅石板灰" }, { "colorName": "LightSteelBlue", "colorNum": "#B0C4DE", "colorNameCN": "淡钢蓝" }, { "colorName": "LightYellow", "colorNum": "#FFFFE0", "colorNameCN": "浅黄色" }, { "colorName": "Lime", "colorNum": "#00FF00", "colorNameCN": "酸橙色" }, { "colorName": "LimeGreen", "colorNum": "#32CD32", "colorNameCN": "酸橙绿" }, { "colorName": "Linen", "colorNum": "#FAF0E6", "colorNameCN": "亚麻布" }, { "colorName": "Magenta", "colorNum": "#FF00FF", "colorNameCN": "灯笼海棠(紫红色)" }, { "colorName": "Maroon", "colorNum": "#800000", "colorNameCN": "栗色" }, { "colorName": "MediumAquaMarine", "colorNum": "#66CDAA" }, { "colorName": "MediumBlue", "colorNum": "#0000CD", "colorNameCN": "适中的蓝色" }, { "colorName": "MediumOrchid", "colorNum": "#BA55D3", "colorNameCN": "适中的兰花紫" }, { "colorName": "MediumPurple", "colorNum": "#9370DB", "colorNameCN": "适中的紫色" }, { "colorName": "MediumSeaGreen", "colorNum": "#3CB371", "colorNameCN": "春天的绿色" }, { "colorName": "MediumSlateBlue", "colorNum": "#7B68EE", "colorNameCN": "适中的板岩暗蓝灰色" }, { "colorName": "MediumSpringGreen", "colorNum": "#00FA9A", "colorNameCN": "适中的碧绿色" }, { "colorName": "MediumTurquoise", "colorNum": "#48D1CC", "colorNameCN": "适中的绿宝石" }, { "colorName": "MediumVioletRed", "colorNum": "#C71585", "colorNameCN": "适中的紫罗兰红色" }, { "colorName": "MidnightBlue", "colorNum": "#191970", "colorNameCN": "午夜的蓝色" }, { "colorName": "MintCream", "colorNum": "#F5FFFA", "colorNameCN": "适中的春天的绿色" }, { "colorName": "MistyRose", "colorNum": "#FFE4E1", "colorNameCN": "薄雾玫瑰" }, { "colorName": "Moccasin", "colorNum": "#FFE4B5", "colorNameCN": "鹿皮鞋" }, { "colorName": "NavajoWhite", "colorNum": "#FFDEAD", "colorNameCN": "Navajo白" }, { "colorName": "Navy", "colorNum": "#000080", "colorNameCN": "海军蓝" }, { "colorName": "OldLace", "colorNum": "#FDF5E6", "colorNameCN": "老饰带" }, { "colorName": "Olive", "colorNum": "#808000", "colorNameCN": "橄榄" }, { "colorName": "OliveDrab", "colorNum": "#6B8E23", "colorNameCN": "米色(浅褐色)" }, { "colorName": "Orange", "colorNum": "#FFA500", "colorNameCN": "橙色" }, { "colorName": "OrangeRed", "colorNum": "#FF4500", "colorNameCN": "橙红色" }, { "colorName": "Orchid", "colorNum": "#DA70D6", "colorNameCN": "兰花的紫色" }, { "colorName": "PaleGoldenRod", "colorNum": "#EEE8AA", "colorNameCN": "灰秋麒麟" }, { "colorName": "PaleGreen", "colorNum": "#98FB98", "colorNameCN": "苍白的绿色" }, { "colorName": "PaleTurquoise", "colorNum": "#AFEEEE", "colorNameCN": "苍白的绿宝石" }, { "colorName": "PaleVioletRed", "colorNum": "#DB7093", "colorNameCN": "苍白的紫罗兰红色" }, { "colorName": "PapayaWhip", "colorNum": "#FFEFD5", "colorNameCN": "番木瓜" }, { "colorName": "PeachPuff", "colorNum": "#FFDAB9", "colorNameCN": "桃色" }, { "colorName": "Peru", "colorNum": "#CD853F", "colorNameCN": "秘鲁" }, { "colorName": "Pink", "colorNum": "#FFC0CB", "colorNameCN": "粉红" }, { "colorName": "Plum", "colorNum": "#DDA0DD", "colorNameCN": "李子" }, { "colorName": "PowderBlue", "colorNum": "#B0E0E6", "colorNameCN": "火药蓝" }, { "colorName": "Purple", "colorNum": "#800080", "colorNameCN": "紫色" }, { "colorName": "RebeccaPurple", "colorNum": "#663399" }, { "colorName": "Red", "colorNum": "#FF0000", "colorNameCN": "纯红" }, { "colorName": "RosyBrown", "colorNum": "#BC8F8F", "colorNameCN": "玫瑰棕色" }, { "colorName": "RoyalBlue", "colorNum": "#4169E1", "colorNameCN": "皇军蓝" }, { "colorName": "SaddleBrown", "colorNum": "#8B4513", "colorNameCN": "马鞍棕色" }, { "colorName": "Salmon", "colorNum": "#FA8072", "colorNameCN": "鲜肉(鲑鱼)色" }, { "colorName": "SandyBrown", "colorNum": "#F4A460", "colorNameCN": "沙棕色" }, { "colorName": "SeaGreen", "colorNum": "#2E8B57", "colorNameCN": "海洋绿" }, { "colorName": "SeaShell", "colorNum": "#FFF5EE", "colorNameCN": "海贝壳" }, { "colorName": "Sienna", "colorNum": "#A0522D", "colorNameCN": "黄土赭色" }, { "colorName": "Silver", "colorNum": "#C0C0C0", "colorNameCN": "银白色" }, { "colorName": "SkyBlue", "colorNum": "#87CEEB", "colorNameCN": "天蓝色" }, { "colorName": "SlateBlue", "colorNum": "#6A5ACD", "colorNameCN": "板岩暗蓝灰色" }, { "colorName": "SlateGray", "colorNum": "#708090", "colorNameCN": "石板灰" }, { "colorName": "SlateGrey", "colorNum": "#708090", "colorNameCN": "石板灰" }, { "colorName": "Snow", "colorNum": "#FFFAFA", "colorNameCN": "雪" }, { "colorName": "SpringGreen", "colorNum": "#00FF7F", "colorNameCN": "薄荷奶油" }, { "colorName": "SteelBlue", "colorNum": "#4682B4", "colorNameCN": "钢蓝" }, { "colorName": "Tan", "colorNum": "#D2B48C", "colorNameCN": "晒黑" }, { "colorName": "Teal", "colorNum": "#008080", "colorNameCN": "水鸭色" }, { "colorName": "Thistle", "colorNum": "#D8BFD8", "colorNameCN": "蓟" }, { "colorName": "Tomato", "colorNum": "#FF6347", "colorNameCN": "番茄" }, { "colorName": "Turquoise", "colorNum": "#40E0D0", "colorNameCN": "绿宝石" }, { "colorName": "Violet", "colorNum": "#EE82EE", "colorNameCN": "紫罗兰" }, { "colorName": "Wheat", "colorNum": "#F5DEB3", "colorNameCN": "小麦色" }, { "colorName": "White", "colorNum": "#FFFFFF", "colorNameCN": "纯白" }, { "colorName": "WhiteSmoke", "colorNum": "#F5F5F5", "colorNameCN": "白烟" }, { "colorName": "Yellow", "colorNum": "#FFFF00", "colorNameCN": "纯黄" }, { "colorName": "YellowGreen", "colorNum": "#9ACD32" }]

// 游戏动画
function draw() {
  if (!ctx) return;

  const colorNum = colors.length;
  const arcAngle = _angle / 360 * Math.PI            // 旋转弧度
  const radius = center * radiusScale;               // 外圈半径
  const needleLength = radius * 3 / 4;               // 指针长度
  const spaceAngle = 10 / 360;                       // 外圈间隔
  const stepAngle = (2 * Math.PI) / colorNum;        // 外圈分布弧长
  let startAngle = 0 - (stepAngle / 2);              // 起点x轴对称

  // 设置绘图宽度
  ctx.setLineWidth(strokeWidth)

  // 背景圈
  ctx.beginPath()
  ctx.setFillStyle(bgColor)
  ctx.arc(center, center + offsetTop, radius, 0, Math.PI * 2)
  ctx.fill();

  // 显示分数
  let _level = 2 + Math.floor((actionData.length + 1 - 2) / (levelUpLimit + 1)) // 缺少endData
  let _score = actionData.length + 1
  let _scoreLevel_ = _level > 2 ? ((hanzs[_level - 2] ? hanzs[_level - 2] : _level - 2) + '阶' + hanzs[(_score - 2) % 4 + 1] + '段') : '✦✦✦✦'
  // ctx.setFillStyle('#cccccc')
  // ctx.setFontSize(12)
  // ctx.setTextAlign('right')
  // ctx.fillText(, _width - 20, _width - 20)

  // 画外圈
  let index = 0;
  while (index < colorNum) {
    ctx.beginPath()
    ctx.setStrokeStyle(colors[index])
    ctx.arc(center, center + offsetTop, radius * 6 / 7, startAngle + spaceAngle, startAngle + stepAngle - spaceAngle)
    startAngle += stepAngle;

    // ctx.setFillStyle(colors[index])
    // ctx.fillRect(index * _width / colors.length, 0, _width / colors.length, 2 * strokeWidth)

    index += 1;
    ctx.stroke();
  }

  // 内部指针
  ctx.beginPath()
  ctx.setStrokeStyle(curColor)
  ctx.moveTo(center, center + offsetTop)
  ctx.lineTo(center + Math.cos(arcAngle) * needleLength, center + offsetTop + Math.sin(arcAngle) * needleLength)
  ctx.stroke()

  // 文字提示
  if (canStartGame) {
    ctx.setFillStyle(curColor)
    ctx.setFontSize(15)
    ctx.setTextAlign('center')
    ctx.fillText('Touch to start..', center, center - offsetTop * 1)
  }
  ctx.setFillStyle('#ffffff')
  ctx.setFontSize(15)
  ctx.setTextAlign('center')
  let infoText = speed ? _scoreLevel_ : (mockPlaying ? '游戏画面重放' : '指针进入同色弧形区域时点击')
  ctx.fillText(infoText, center, 2 * center + offsetTop * 1.8)

  // 计算当前指针位置对应外圈颜色序号
  let matchIndex = (Math.floor((arcAngle + stepAngle / 2) / stepAngle) % colorNum + colorNum) % colorNum;

  // 错过匹配颜色范围，停止转动
  if (catchMatchColor && colors[matchIndex] != curColor) speed = 0;

  // 当旋转到同色区域，开始捕获
  catchMatchColor = colors[matchIndex] == curColor

  // 旋转角递增
  _angle = (_angle + (direction * speed))

  // 停止动画
  if (!speed) {
    gameEndTime && actionData.push({
      _angle: _angle,
      stop: true
    })
    if (_angle) {
      let gameOverTextColor = getNewColor(curColor)
      ctx.setFillStyle(gameOverTextColor)
      ctx.setFontSize(15)
      ctx.setTextAlign('center')
      ctx.setShadow(0, 0, 3, '#ffffff')
      ctx.fillText('Oops, game over..', center, center - offsetTop * 2)
      ctx.fillText('Touch to restart..', center, center - offsetTop * 3.3)
    }
    endGame();
  }

  // 绘图  
  ctx.draw()
}

function getNewColor(curColor) {
  const newColor = colors[Math.floor(Math.random() * colors.length)];
  if (curColor == newColor) {
    return getNewColor(curColor);
  }
  return newColor;
}

function startGame() {
  gameStartTime = +new Date;
  drawAnimation = setInterval(draw, drawTimeStop);
}

function endGame() {
  if (gameStartTime) {
    !mockPlaying && endGameAction && endGameAction(+new Date - gameStartTime);
    gameStartTime = 0;
  }
  mockPlaying = false;
  actionData.length = 0;
  gameEndTime = +new Date;
  clearInterval(drawAnimation);
}

// 获取屏幕宽度
wx.getSystemInfo({
  success: (res) => {
    _width = res.screenWidth;
    _height = res.windowHeight;
    center = Math.floor(_width / 2);
    offsetTop = -0.04 * _width;
  },
});

const mockListScore = [
  // {
  //   user: {
  //     nickName: '曹帅', avatarUrl: 'http://p1.music.126.net/PRSSBKKHVXqg9dEonAnwoQ==/109951162954605499.jpg?param=140y140', country: 'CN', province: 'Shanghai', city: 'Pudong', _id: 1
  //   },
  //   level: 2 + Math.floor((9 - 2) / (levelUpLimit + 1)),
  //   score: 9
  // },{
  //   user: {
  //     nickName: '曹帅', avatarUrl: 'http://p1.music.126.net/PRSSBKKHVXqg9dEonAnwoQ==/109951162954605499.jpg?param=140y140', country: 'CN', province: 'Shanghai', city: 'Pudong', _id: 1
  //   },
  //   level: 2 + Math.floor((8 - 2) / (levelUpLimit + 1)),
  //   score: 8
  // },
  // {
  //   user: {
  //     nickName: '没撒的撒', avatarUrl: 'http://p1.music.126.net/lbJCfzq6Jm60K6kzP_LtlQ==/18953381439796470.jpg?param=140y140', country: 'CN', province: 'Jiangsu', city: 'Nanjing', _id: 2
  //   },
  //   level: 2 + Math.floor((7 - 2) / (levelUpLimit + 1)),
  //   score: 7
  // },
  // {
  //   user: {
  //     nickName: 'micks', avatarUrl: 'http://p1.music.126.net/LOEH8DU92vx2GJc0tX1xsA==/109951162971666277.jpg?param=140y140', country: 'CN', province: 'Hebei', city: 'Wuhan', _id: 3
  //   },
  //   level: 2 + Math.floor((6 - 2) / (levelUpLimit + 1)),
  //   score: 6
  // }
]


function getSuggest() {
  let _c;
  const _s = [];
  while(_s.length < 12) {
    _c = Math.floor(Math.random() * pokerColorsArr.length)
    _s.indexOf(_c) == -1 && _s.push(_c)
  }
  return _s;
}

// 定义页面内容
Page({
  data: {
    level: 1,
    tapTimes: 0,
    showGame: wx.getStorageSync('showGame'),
    allColors: allColors,
    listScore: mockListScore,
    scrollHeight: _height - _width,
    levelInChinese: hanzs,
    coverView: wx.canIUse('cover-view'),
    pokerColors: pokerColorsArr,
    pokerColorsMatchs: getSuggest(),
    pokerColorsIndex: '',
    bgImageSrc: ''
  },
  filterColor(e) {
    const inputValue = e.detail && e.detail.value && e.detail.value.trim()
    if (!inputValue) {
      this.setData({
        searchKey: '',
        pokerColorsMatchs: getSuggest()
      })
      return
    }
    const matchs = []
    pokerColorsArr.map((colorObj, index) => {
      const matchName = colorObj.colorName && colorObj.colorName.toLowerCase().indexOf(inputValue.toLowerCase()) != -1;
      const matchNameCN = colorObj.colorNameCN && colorObj.colorNameCN.indexOf(inputValue) != -1;
      if (matchName || matchNameCN) {
        matchs.push(index)
      }
    })
    this.setData({
      searchKey: inputValue,
      pokerColorsMatchs: matchs
    })
  },
  randomNew() {
    this.setData({
      pokerColorsMatchs: getSuggest()
    })
  },
  swipeColor(e) {
    return;
    let index = e && e.target && e.target.id || ''
    this.setData({
      pokerColorsIndex: index
    });
  },
  tap(e) {
    // 重现游戏中
    if (mockPlaying) return;
    // 点击开始游戏
    if (speed == 0 && canStartGame) {
      canStartGame = false
      return this.newGame()
    }
    // 准备重新开始
    if (speed == 0 && !canStartGame && +new Date - gameEndTime > 1000) {
      this.freeStart();
    }

    this.reverse();
  },
  freeStart() {
    // 设置开始游戏准备,但不开始游戏
    canStartGame = true
    this.newGame()
    curColor = allColors[0]
    speed = 0
  },
  reverse() {
    if (!speed) return;

    // 非反转区域
    if (!catchMatchColor) {
      this.updateScore();
      speed = 0;
      return
    }

    // 可以反向，重置部分变量
    catchMatchColor = false;
    curColor = getNewColor(curColor);

    // 达到升级次数设置升级，如果所有颜色都已经展示，无限计数点击次数
    if (this.data.tapTimes == levelUpLimit && this.data.level < allColors.length - 2) {
      _gameLevel = this.data.level += 1;
      _gameTap = this.data.tapTimes = 0;
    } else {
      _gameTap = this.data.tapTimes += 1
    }

    // 升级增加外圈颜色，避免切换到同色
    if (this.data.tapTimes == 0) {
      const colorNum = this.data.level + 2;
      colors = allColors.slice(0, colorNum);
      const arcAngle = _angle / 360 * Math.PI
      const stepAngle = (2 * Math.PI) / colorNum;
      const matchIndex = ((Math.floor((arcAngle + stepAngle / 2) / stepAngle) % colorNum) + colorNum) % colorNum;
      curColor = getNewColor(colors[matchIndex]); // 排除指针在当前角度指向的新颜色
    }
    direction = direction * -1; // 改变旋转方向

    // 记录游戏数据
    actionData.push({
      colors: JSON.parse(JSON.stringify(colors)),
      curColor: curColor,
      _angle: _angle
    });
  },
  newGame() {
    // 重置动画变量
    speed = initSpeed;
    _angle = 0;
    direction = 1;
    catchMatchColor = false;
    colors = allColors.slice(0, 3);
    curColor = getNewColor(colors[0]);
    mockPlaying = false;

    endGame();
    startGame();

    // 设置显示数据
    _gameLevel = 1;
    _gameTap = 0;
    this.data.tapTimes = 0;
    this.data.level = 1;
    // 记录游戏数据
    actionData.length = 0;
    actionData.push({
      colors: JSON.parse(JSON.stringify(colors)),
      curColor: curColor,
      _angle: _angle
    });
  },
  playShow() {
    // const _this = this;
    // const bestScoreStr = wx.getStorageSync('bestScore');
    // const _actionData = bestScoreStr && JSON.parse(bestScoreStr) || [];
    // actionData.length = 0;
    // _actionData.map(_ => actionData.push(_));
    // if (actionData.length < 2 || speed) return;
    // // 重置动画变量
    // speed = initSpeed;
    // _angle = 0;
    // direction = 1;
    // catchMatchColor = false;
    // colors = actionData[0].colors;
    // curColor = actionData[0].curColor;
    // mockPlaying = true; // 阻止点击影响重现
    // clearInterval(mockPlay);
    // startGame();
    // _gameLevel = 1;
    // _gameTap = 0;
    // let mockIndex = 1;
    // let mockPlay = setInterval(() => {
    //   if (!actionData[mockIndex]) {
    //     clearInterval(mockPlay);
    //     return
    //   }
    //   const stopMock = actionData[mockIndex].stop;
    //   const matchAngle = _angle == actionData[mockIndex]._angle;
    //   // 模拟反转
    //   if (actionData[mockIndex] && matchAngle && !stopMock) {
    //     direction *= -1;
    //     catchMatchColor = false;
    //     colors = actionData[mockIndex].colors;
    //     curColor = actionData[mockIndex].curColor;
    //     _gameLevel = Math.floor(mockIndex / (levelUpLimit + 1)) + 1;
    //     _gameTap = mockIndex % (levelUpLimit + 1);
    //     mockIndex += 1;
    //   }
    //   // 模拟停止
    //   if (speed == 0 || matchAngle && stopMock) {
    //     speed = 0;
    //     endGame();
    //     clearInterval(mockPlay);
    //   }
    // }, drawTimeStop);
  },
  updateScore(timeTake) {
    const lastScore = wx.getStorageSync('score')
    const appInfo = getApp().globalData
    const user = appInfo.user
    // 分数太低、无个人信息
    if (!user || actionData.length < 4) {
      _angle && this.setData({
        showReInstall: !user,
        showComeOn: user && actionData.length < 4,
        showGreat: false,
        showWelcome: false
      });
      return;
    }
    // 展示鼓励分享按钮
    this.setData({
      showComeOn: false,
      showGreat: actionData.length > lastScore,
      showWelcome: false
    });
    // 低于以往最佳成绩，更新群成绩
    if (actionData.length < lastScore) {
      _angle && appInfo.openGId && this.getGroupScore(appInfo.openGId);
      return;
    }
    wx.setStorageSync('score', actionData.length);
    // 上传得分、更新成绩
    const updateUrl = 'https://bala.so/wxapp/updateScore'
    user && wx.request({
      url: updateUrl,
      method: 'POST',
      data: {
        data: actionData,
        user: user
      },
      success: (res) => {
        // 更新最好成绩
        if (!res || !res.data || !res.data.data) return;
        wx.setStorageSync('score', res.data.data.length)
        // wx.setStorage({
        //   key: 'bestScore',
        //   data: JSON.stringify(res.data.data),
        // })
        // appInfo.bestScore = res.data.data
        // 一个人玩
        !this.data.shareUserId && user && this.getCurUserScore() && this.setData({
          listScore: [this.getCurUserScore()]
        });
      },
      complete: () => {
        // 获取最新排名
        appInfo.openGId ? this.getGroupScore(appInfo.openGId) : this.data.shareUserId && this.getShareInfo(this.data.shareUserId)
      }
    });
    // 一个人玩
    !this.data.shareUserId && user && this.getCurUserScore() && this.setData({
      listScore: [this.getCurUserScore()]
    });
  },
  getCurUserScore() {
    const appInfo = getApp().globalData
    const lastScore = wx.getStorageSync('score')
    const mockUserScore = lastScore && {
      user: appInfo.user,
      level: lastScore && (2 + Math.floor((lastScore - 2) / (levelUpLimit + 1))),
      score: lastScore
    }
    return appInfo.user ? mockUserScore : null
  },
  onLoad(option) {
    const appInfo = getApp().globalData
    const shareUserId = option && option.id
    const setCurUserBest = () => {
      this.getCurUserScore() ? this.setData({
        listScore: [this.getCurUserScore()]
      }) : this.setData({
        showWelcome: true
      })
    }
    this.data.shareUserId = shareUserId
    this.data.openGId = appInfo.openGId
    // bind updateScore when endGame
    endGameAction = this.updateScore && this.updateScore.bind(this)
    // get shareInfo or local user data
    shareUserId ? this.getShareInfo(shareUserId) : appInfo.user ? setCurUserBest() : appInfo.getInfoWithUserId = setCurUserBest
    // openGId 直接获取，不然等到获取信息后在获取
    appInfo.openGId ? this.getGroupScore(appInfo.openGId) : appInfo.getInfoWithGId = this.getGroupScore.bind(this)
    // 指定标记分享
    wx.showShareMenu && wx.showShareMenu({
      withShareTicket: true
    })
    // 初始化游戏数据
    ctx = wx.createCanvasContext('myCanvas')
    this.freeStart()
    this.trySmileFromServer();
    // 初始化标题
    wx.getStorageSync('showGame') && wx.setNavigationBarTitle({
      title: '眼疾手快'
    })
  },
  // 从服务器获取是否展示game
  trySmileFromServer() {
    const user = getApp().globalData.user
    wx.request({
      url: 'https://bala.so/wxapp/initData',
      success: (res) => {
        if (!res || !res.data) return;
        const showGame = user && user.avatarUrl && res.data.showGame
        wx.setStorageSync('showGame', showGame)
        this.setData({
          showGame: res.data.showGame,
          greatSrc: res.data.greatSrc,
          comeOnSrc: res.data.comeOnSrc,
          bgImageSrc: res.data.bgImageSrc
        })
        showGame && wx.setNavigationBarTitle({
          title: '眼疾手快'
        })
      },
      fail:(res) => {}
    })
  },
  // 根据shareUserID获取分享人的分数
  getShareInfo(id) {
    const reqUrl = 'https://bala.so/wxapp/getScoreByUser?userId=' + id
    wx.request({
      url: reqUrl,
      success: (res) => {
        const _this = this;
        let _endGameAction = endGameAction
        if (!res.data) return;
        if (gameStartTime) {
          // 防止游戏过程中渲染页面，导致卡顿
          endGameAction = () => {
            _endGameAction && _endGameAction();
            showShareScore();
            endGameAction = _endGameAction;
          }
        } else {
          showShareScore();
        }

        function showShareScore() {
          const curUserScore = _this.getCurUserScore()
          const diffUser = curUserScore && curUserScore.user._id != res.data.user._id
          res.data.user && (res.data.level = 2 + Math.floor((res.data.score - 2) / (levelUpLimit + 1)))
          const listScores = [res.data];
          diffUser && curUserScore && listScores.push(curUserScore);
          listScores.map(_ => {
            _.user && (_.level = 2 + Math.floor((_.score - 2) / (levelUpLimit + 1)))
          });
          listScores.sort((b, a) => {
            return a.score - b.score > 0 ? 1 : -1
          });
          !_this.data.openGId && _this.setData({
            listScore: listScores
          });
        }
      }
    })
  },
  // 根据openId获取群聊游戏成绩
  getGroupScore(groupId) {
    this.setData({ "xxxxxx": groupId });
    const lastReqTime = this.getGroupScore.lastReqTime;
    if (+new Date - lastReqTime < 3 * 1000) return;
    this.getGroupScore.lastReqTime = +new Date;
    const reqUrl = 'https://bala.so/wxapp/getScoreByGroup?groupId=' + groupId
    wx.request({
      url: reqUrl,
      success: (res) => {
        if (!res.data || !res.data.length) return;
        const _this = this;
        let _endGameAction = endGameAction
        if (gameStartTime) {
          // 防止游戏过程中渲染页面，导致卡顿
          endGameAction = () => {
            _endGameAction && _endGameAction();
            showGroupScores();
            endGameAction = _endGameAction;
          }
        } else {
          showGroupScores();
        }

        function showGroupScores() {
          const sortList = res.data.sort((b, a) => {
            return a.score - b.score > 0 ? 1 : -1
          });
          sortList.map(_ => {
            _.user && (_.level = 2 + Math.floor((_.score - 2) / (levelUpLimit + 1)))
          });
          _this.setData({
            listScore: sortList
          });
        }
      }
    })
  },
  onShareAppMessage(res) {
    const user = getApp().globalData.user
    let shareTitle = this.data.showGame ? "来，一起挑战《眼疾手快》" : "设计师常用颜色查询";
    return {
      title: shareTitle,
      path: '/page/canvas/index?id=' + (user && user._id || ''),
      success: (res) => {
        const saveTicketUrl = 'https://bala.so/wxapp/saveShareTicket'
        const shareTicket = res && res.shareTickets && res.shareTickets[0]
        if (!shareTicket) return
        wx.request({
          url: saveTicketUrl,
          method: 'POST',
          data: {
            userId: user._id,
            shareTicket: shareTicket
          },
          success: (res) => { }
        })
      },
      fail: (res) => { }
    }
  },
  sharePrevent() {
    if (wx.canIUse('button.open-type.share')) return
    wx.showModal({
      title: '温馨提示',
      content: '　　你所使用微信版本暂不支持直接分享，请点击右上角分享或更新微信。',
      showCancel: false
    });
  },
  notifyInfo: function (e) {
    const form_id = e.detail.formId
    const notifyUrl = 'https://bala.so/wxapp/notify'
    const user = getApp().globalData.user
    form_id && user && wx.request({
      url: notifyUrl,
      method: 'POST',
      data: {
        page: '/page/canvas/index',
        user: user,
        formId: form_id
      },
      success: (res) => {
        this.setData({
          showGreat: false,
          showComeOn: false
        })
      }
    })
  },
  onUnload() {
    ctx = null;
    endGameAction = null;
    endGame();
  },
  noop(e) { }
})
