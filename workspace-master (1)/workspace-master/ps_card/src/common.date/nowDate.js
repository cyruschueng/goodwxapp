define(function(require,exports,module){
	var myDate = new Date();

    var getDate = {
        formatterDate: function(t){
            return (t<10) ? "0"+t : t;
        },
        getFullYear: function(){
            var me = this;
            var str = myDate.getFullYear();
            
            return str;
        },
        getMonth: function(dateType){
            var me = this;
            var str = myDate.getFullYear() + "-" + me.formatterDate((myDate.getMonth())+1);
            return str;
        },
        getDate: function(dateType){
            var me = this;
            var str = me.getMonth() + "-" + me.formatterDate(myDate.getDate()); //+ " " + me.formatterDate(myDate.getHours())+":" + me.formatterDate(myDate.getMinutes())+ ":" + me.formatterDate(myDate.getSeconds());
            
            return str;
        },
        toDate: function(str){
            var me = this;
            var myDate = new Date(str);
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            return year + '-' + me.formatterDate(month) + '-' + me.formatterDate(day);
        },
    };

	module.exports = getDate;

});