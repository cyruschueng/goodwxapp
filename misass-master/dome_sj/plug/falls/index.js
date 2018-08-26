/**
 * Created by xmg on 2016/12/13.
 */
window.onload = function () {
     // 1.实现瀑布流的布局
      waterFall('main', 'box');
     // 2. 滚动加载图片
     window.onscroll = function () {
         // 2.1 判断是否符合加载新图片
         if(checkWillLoadNewImage()){ // 加载图片
             // 造假数据
             var dataArr = [
                 {src: '1.jpg'},
                 {src: '2.jpg'},
                 {src: '3.jpg'},
                 {src: '4.jpg'},
                 {src: '5.jpg'},
                 {src: '6.jpg'},
                 {src: '7.jpg'},
                 {src: '8.jpg'},
                 {src: '9.jpg'},
                 {src: '10.jpg'},
                 {src: '11.jpg'},
                 {src: '12.jpg'},
                 {src: '7.jpg'},
                 {src: '3.jpg'},
                 {src: '10.jpg'},
                 {src: '19.jpg'},
                 {src: '11.jpg'},
                 {src: '10.jpg'},
                 {src: '30.jpg'},
                 {src: '5.jpg'},
                 {src: '7.jpg'}
             ];
             
             // 2.1.2 遍历数据数组,动态创建元素,插入父标签
             for(var i=0; i<dataArr.length; i++){
                 var newBox = document.createElement('div');
                 newBox.className = 'box';
                 $('main').appendChild(newBox);

                 var newPic = document.createElement('div');
                 newPic.className = 'pic';
                 newBox.appendChild(newPic);

                 var newImg = document.createElement('img');
                 newImg.src = '../images/img/' + dataArr[i].src;
                 newPic.appendChild(newImg);
             }
             // 3.重新布局
             waterFall('main', 'box');
         }
     }
};

/*
 * 实现瀑布流的布局
 */
function waterFall(parent, box) {
    // 1. 父盒子居中
    // 1.1 获取所有的子盒子
    var allBox = $(parent).getElementsByClassName(box);
    // 1.2 获取盒子的宽度
    var boxWidth = allBox[0].offsetWidth;
    // 1.3 获取屏幕的宽度
    var screenW = document.documentElement.clientWidth;
    // 1.4 计算列
    var cols = parseInt(screenW / boxWidth);
    // 1.5 父盒子居中
    $(parent).style.width = cols * boxWidth + 'px';
    $(parent).style.margin = '0 auto';

    // 2.子盒子居中
    // 2.1 定义高度数组
    var heightArr = [], boxHeight = 0, minBoxHeight=0, minBoxIndex=0;
    // 2.2 遍历盒子
    for(var i=0; i<allBox.length; i++){
        // 2.2.1 求出每一个盒子的高度
        boxHeight = allBox[i].offsetHeight;
        // 2.2.2 取出第一行的盒子的高度放入数组
        if(i < cols){ // 第一行
           heightArr.push(boxHeight);
        }else { // 剩余行
            // 1. 求出高度数组中最矮的盒子的高度
            minBoxHeight = _.min(heightArr);
            // 2. 求出最矮的盒子对应的索引
            minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);
            // 3. 子盒子定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.left = minBoxIndex * boxWidth + 'px';
            allBox[i].style.top = minBoxHeight + 'px';
            // 4.更新高度数组
            heightArr[minBoxIndex] += boxHeight;
        }

    }
    /*console.log(heightArr, minBoxHeight, minBoxIndex);*/
}

/*
 * 求出最矮的盒子对应的索引
 */
function getMinBoxIndex(arr, val) {
     for(var i=0; i<arr.length; i++){
         if(arr[i] == val){
             return i;
         }
     }
}

/*
 * 判断是否符合加载新图片
 * 返回值 true false
*/
function checkWillLoadNewImage() {
     // 1. 获取最后一个盒子
     var allBox = document.getElementsByClassName('box');
     var lastBox = allBox[allBox.length - 1];
     // 2. 求出最后一个盒子高度的一半 + 头部偏离的高度
     var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;
     // 3.求出屏幕的高度
     var screenH = document.body.clientHeight || document.documentElement.clientHeight;
     // 4. 求出页面偏离浏览器的高度
     var scrollTop = scroll().top;
    console.log(lastBoxDis, screenH, scrollTop);
     return lastBoxDis <= screenH + scrollTop;


}

