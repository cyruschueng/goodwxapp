/**
 * Created by Drzhang on 2017/8/14.
 */
module("CustomerTaskDetailPage.xml", function (render) {
    return function () {
        var page = render();

        //摄影师信息模块
        var btnBack = page.$("btnBack");
        var taskName = page.$("taskName");
        var facilityCount = page.$("facilityCount");
        var photographStatus = page.$("photographStatus");
        var completePhotographBtn = page.$("completePhotographBtn");
        var photographBtnCover = page.$("photographBtnCover");
        var customerTaskName = page.$("customerTaskName");
        var customerTaskAddress = page.$("customerTaskAddress");
        var customerPhotographerName = page.$("customerPhotographerName");
        var customerPhotographerPhone = page.$("customerPhotographerPhone");

        //二维码模块
        var qrcodeDialog = page.$("qrcodeDialog");
        var qrTaskName = page.$("qrTaskName");
        var qrTaskAddress = page.$("qrTaskAddress");
        var qrImg = page.$("qrImg");
        var qrClose = page.$("qrClose");
        var qrcodeDialogCover = page.$("qrcodeDialogCover");

        //完成拍摄模块
        var confirmDialog = page.$("confirmDialog");
        var confirmCompletedBtn = page.$("confirmCompletedBtn");
        var cancelBtn = page.$("cancelBtn");
        var confirmDialogCover = page.$("confirmDialogCover");

        var statusFlag = false;

        function initOnClickEvent() {
            btnBack.setOnClick(function(){
                page.backward();
            });

            completePhotographBtn.setOnClick(function(){
                if(photographBtnCover.visible){  //已经拍摄完成
                    qrcodeDialog.setVisible(true);
                    return;
                }
                confirmDialog.setVisible(true);
            });

            qrClose.setOnClick(function(){
                qrcodeDialog.setVisible(false);
            });

            confirmCompletedBtn.setOnClick(function(){
                //确认拍摄完成  ---确认完成，生成二维码
                if(1 == 1){
                    page.forwardTo("ConfirmSuccessPage.js");

                    statusFlag = true;
                    confirmDialog.setVisible(false);
                    photographStatus.setText("已完成拍摄");
                    photographBtnCover.setVisible(true);
                }
            });

            cancelBtn.setOnClick(function(){
                confirmDialog.setVisible(false);
            });
            
            confirmDialogCover.setOnClick(function () {
                //阻止事件穿透
            })
            qrcodeDialogCover.setOnClick(function(){
                //阻止事件穿透
            });
        }

        function initView() {
            // taskName.setText("瑞吉酒店");
            // facilityCount.setText();
            // customerTaskName.setText("");
            // customerTaskAddress.setText("");
            // customerPhotographerName.setText("");
            // customerPhotographerPhone.setText("");
            
            if(!statusFlag){
                photographStatus.setText("完成拍摄");
                photographBtnCover.setVisible(false);
            }else {
                photographStatus.setText("已完成拍摄");
                photographBtnCover.setVisible(true);
            }
            
        }

        document.title="需求详情";
        initView();
        initOnClickEvent();

        return page;
    }
})