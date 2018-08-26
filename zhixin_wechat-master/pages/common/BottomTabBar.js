// pages/ui/tabbar.js
// 动态Tab的控制类
import StorageUtils from '../../utils/StorageUtils'

class BottomTabBar {
    constructor() {

        this.color = "#9E9E9E";
        this.selectedColor = "#f00";
        this.backgroundColor = "#fff";
        this.borderStyle = "#ccc";
        this.list = [];


        let userInfo = StorageUtils.loadUserInfo();

        // 根据总的角色来决定宽度
        let width = 100 / (userInfo.authorities.length + 1) + "%";
        for (let auth of userInfo.authorities) {

            switch (auth) {
                case "teacher":
                    this.list.push({
                        pagePath: "/pages/tabpages/teacher/index",
                        text: "老师",
                        iconPath: "/pages/image/tabbar_home_unselected.png",
                        selectedIconPath: "/pages/image/tabbar_home_selected.png",
                        class: "menu-item",
                        width: width,
                        selectedColor: "black",
                        active: false
                    });
                    break;
                case "student":
                    this.list.push({
                        pagePath: "/pages/tabpages/student/index",
                        text: "学生",
                        iconPath: "/pages/image/tabbar_home_unselected.png",
                        selectedIconPath: "/pages/image/tabbar_home_selected.png",
                        class: "menu-item",
                        width: width,
                        selectedColor: "black",
                        active: false
                    });
                    break;
                case "parent":
                    this.list.push({
                        pagePath: "/pages/tabpages/parent/index",
                        text: "家长",
                        iconPath: "/pages/image/tabbar_home_unselected.png",
                        selectedIconPath: "/pages/image/tabbar_home_selected.png",
                        class: "menu-item",
                        width: width,
                        selectedColor: "black",
                        active: false
                    });
                    break;
                default:
                    break;
            }
        }

        this.list.push({
            pagePath: "/pages/tabpages/setting/setting",
            text: "我的",
            iconPath: "/pages/image/tabbar_me_unselected.png",
            selectedIconPath: "/pages/image/tabbar_me_selected.png",
            class: "menu-item",
            width: width,
            selectedColor: "black",
            active: false
        });

        // 默认选中第一个
        this.list[0].active = true;

        console.log("tabs", this);
    }

    /**
     * 切换底部Tab标签的状态
     */
    changeTab() {
        // 获取当前页面栈
        let curPageArr = getCurrentPages();
        // console.log(curPageArr);

        // 当前页面为页面栈最后的页面
        let curPage = curPageArr[curPageArr.length - 1];

        let pagePath = curPage.__route__;

        if (pagePath.indexOf('/') !== 0) {
            pagePath = '/' + pagePath;
        }

        // 重置tab的状态
        for (let idx = 0; idx < this.list.length; idx++) {
            this.list[idx].active = this.list[idx].pagePath === pagePath;
        }
        // _curPage.setData({
        //     tabBar: tabBar
        // });
    }

}

module.exports = {
    BottomTabBar: BottomTabBar
}