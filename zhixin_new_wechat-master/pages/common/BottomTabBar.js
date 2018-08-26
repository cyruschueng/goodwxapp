// pages/ui/tabbar.js
// 动态Tab的控制类
import StorageUtils from '../../utils/StorageUtils'

class BottomTabBar {
    constructor() {

        this.color = "#9E9E9E";
        this.selectedColor = "#f00";
        this.backgroundColor = "#fff";
        this.borderStyle = "#ccc";
        this.list = this.makeList();

    }

    makeList() {
        let userInfo = StorageUtils.loadUserInfo();
        let list = [];

        // 根据总的角色来决定宽度
        let width = 100 / (userInfo.roleSet.length + 1) + "%";
        for (let auth of userInfo.roleSet) {
            switch (auth.id) {
                case 2:
                    list.push({
                        pagePath: "/pages/tabpages/teacher/index",
                        name: "Teacher",
                        text: "老师",
                        iconPath: "/pages/image/tabbar_home_unselected.png",
                        selectedIconPath: "/pages/image/tabbar_home_selected.png",
                        class: "menu-item",
                        width: width,
                        selectedColor: "black",
                        active: false
                    });
                    break;
                case 3:
                    list.push({
                        pagePath: "/pages/tabpages/student/index",
                        name: "Student",
                        text: "学生",
                        iconPath: "/pages/image/tabbar_home_unselected.png",
                        selectedIconPath: "/pages/image/tabbar_home_selected.png",
                        class: "menu-item",
                        width: width,
                        selectedColor: "black",
                        active: false
                    });
                    break;
                case 4:
                    list.push({
                        pagePath: "/pages/tabpages/parent/index",
                        name: "Parent",
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

        list.push({
            pagePath: "/pages/tabpages/setting/setting",
            name: "me",
            text: "我的",
            iconPath: "/pages/image/tabbar_me_unselected.png",
            selectedIconPath: "/pages/image/tabbar_me_selected.png",
            class: "menu-item",
            width: width,
            selectedColor: "black",
            active: false
        });

        // 默认选中第一个
        list[0].active = true;

        console.log("current tabs:", list);

        return list;
    }

    reload() {
        delete this.list;
        console.log("tabBar reload!");
        this.list = this.makeList();

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

    }

    /**
     *
     * @param role
     * @returns {string}
     */
    changeTabByRole(role) {
        this.reload();
        let pagePath = "";
        for (let item of this.list) {
            item.active = item.name === role;
            if (item.active) {
                pagePath = item.pagePath;
            }
        }
        // console.log("this.list:", this.list);
        // console.log("role is:", role, "path:", pagePath);
        return pagePath;
    }

    getTabPathByRole(role) {
        for (let item of this.list) {
            if (item.name === role)
                return item.pagePath;
        }
    }

}

module.exports = {
    BottomTabBar: BottomTabBar
}