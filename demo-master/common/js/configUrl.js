(function(win) {
    win.base_url = {
        site_url : 'http://192.168.40.119:9999'
    };

    win.api_url = {
    	GET_SERVICE_DATA_MAIN:"/getServiceData/main",//服务主页(TYPE=1，2，3)
    	GET_MENU_DATA_MENU:"/getMenuData/menu",//专业服务支持,菜单nav
    	GET_Detal_DATA_DETAL:"/getDetalData/detal",//专业服务支持,详情list
    	GET_SERVICE_DATA_DETAL:"/getDetalService/detal",//专业服务支持,详情查看
    	GET_SALES_DATA_DATA:"/getSalesData/data",//售后客服
    	GET_COOPDATA_DATA_DATA:"/getCoopData/data",//合作伙伴
        GET_COOPDATA_DATAS_DATAS:"/getCoopDatas/datas",//合作伙伴全部
    	BSERVICE_SEARCH_DATA:"/bservice/searchdata",//搜索
    }

})(win=window.win||{});