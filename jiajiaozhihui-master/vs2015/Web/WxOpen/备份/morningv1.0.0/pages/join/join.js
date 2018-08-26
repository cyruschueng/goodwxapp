Page({
    data:{
        path:'',
        query:'',
    },
    onLoad:function(options){
      console.log(options);
      this.setData({
        path: options.path,
        query: this.parseParam(JSON.parse(options.query) )
      })
    },
    parseParam:function(query){
      var search = '';
      if (query != null && query != undefined && typeof query == 'object') {
        for (var i in query) {
          search+='&'+i+'='+query[i];
        }
      }
      return '?'+search.substr(1);
    }
})
