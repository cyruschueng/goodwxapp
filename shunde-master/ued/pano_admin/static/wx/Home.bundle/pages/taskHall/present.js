module (function(){

    function P(success_fetch_tasks,error_fetch_tasks){

      this.fetch_tasks=function(sortBy,offset){
          var sb=sortBy?sortBy:"time";
          var of=offset?offset:0;
          util.http(util.baseUrl+"/task/searchAll?asc=0&limit=8&sortBy="+sb+"&offset="+of,function(response){//success
              success_fetch_tasks(response.data.total,response.data.rows);
          },function(response){//error
              error_fetch_tasks();
          });
      };

    }
    return P;

});
