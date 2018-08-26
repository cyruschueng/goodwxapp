var userinfo = cc.Class({
    extends : cc.Object,

    ctor : function() {
        this.mLogined = false;
    },

    parseUserInfoMsg : function(result) {
        var arr = (result.loc || '').split('.');
        if (arr[0] == fr.config.gameId) {
            this.mLastRoomId = parseInt(arr[1]);
            this.mLastTableId = parseInt(arr[2]);
            this.mLastSeatId = parseInt(arr[3]);
        }

        this.mUserName = result.udata.name;

        this.mCouponRate = result.udata.assetRate['user:coupon'];
        this.mCashExchangeTotal = result.udata.coupon + result.udata.exchangedCoupon;
        this.mCashCurrent = result.udata.coupon;

        this.mCashExchangeTotal = this.mCashExchangeTotal / this.mCouponRate;
        this.mCashCurrent = this.mCashCurrent / this.mCouponRate;

        // this.mCashExchangeTotal = 10.56;
        // this.mCashCurrent = 3.00;
    },

    parseSnsData : function(data) {
        this.mAuthcode = data.authInfo.authcode;
        this.mUserId = data.userId;
        this.mHeartBeatInterval = data.heartBeat;
        this.mServerIp = data.tcpsrv.ip;
        this.mServerPort = data.tcpsrv.wsport;
        this.mAuthorCode = data.authorCode;

        this.mSocketUrl = 'ws://' + this.mServerIp.toString() + ':' + this.mServerPort.toString() + '/';
    },

    leaveTable : function() {
        this.mLastRoomId = null;
        this.mLastTableId = null;
        this.mLastSeatId = null;
    },
});

module.exports = userinfo;
