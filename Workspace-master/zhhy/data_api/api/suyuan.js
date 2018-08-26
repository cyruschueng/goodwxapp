var bunyan=require('bunyan');
var querystring=require('querystring');
var md5=require('../lib/md5');

var log=bunyan.createLogger({
	name:'API',
	streams: [
    {
      level: 'info',
      path: './logs/info.log'
    },
    {
      level: 'error',
      path: './logs/error.log'
    }
  ]
});


exports.sy_get=function (req,res,next){
	info="get data ok ;cmd="+req.query();
	log.info(req);
	
	sql="select syinfo as ticket from ysh_goods where "+req.query();
	 global.db.getOne(sql,function(rdata){
		res.setHeader('Access-Control-Allow-Origin','*');
		res.setHeader('Content-Type','text/json');	 	
	        	res.send(rdata);
        });

	
	next();
}

exports.sy_post=function (req,res,next){

	var cmd=req.params.cmd;
      console.log(cmd);
	
	
	var info ='';

    req.addListener('data', function(chunk){
        info += chunk;
     })

    .addListener('end', function(){
       info1 = querystring.parse(info);
        console.log(info1);
        if(!info1.productNum)
        	res.send("productNum error");
 
 		json=JSON.stringify(info1);
        sql="update ysh_goods set syinfo='"+json+"' where goods_id="+info1.productNum;
        
        global.db.conn.query(sql,function(err,rows,fields){
        	if(err){
        		res.send("save false");
        	}else{
        		res.writeHead(302, {'Location': 'http://10.2.5.45:3000/success'});
        	}
        	res.end();
        });

      //   //验证
      //   sql="select count(*) as ticket from ysh_admin_user where user_name='"+info.user+"' "+
   			// " and password='"+md5.md5(info.password)+"'";   
   			// console.log(sql);  
      //   global.db.getOne(sql,function(rdata){
      //   	if(rdata<=0){
      //   		res.send("login false");
      //   	}else{
      //   		res.send("login ok");
      //   	}
      //   });

		
      });


	next();
}

exports.sy_post111=function (req,res,next){
      console.log(req.session);

	var cmd=req.params.cmd;
	if(cmd=='admin_login'){



	var info ='';

    req.addListener('data', function(chunk){
        info += chunk;
     })

    .addListener('end', function(){
       info = querystring.parse(info);
        console.log(info);
        

        //验证
        sql="select count(*) as ticket from ysh_admin_user where user_name='"+info.user+"' "+
   			" and password='"+md5.md5(info.password)+"'";   
   			console.log(sql);  
        global.db.getOne(sql,function(rdata){
        	if(rdata<=0){
        		res.send("login false");
        	}else{
        		res.send("login ok");
        	}
        });

      });


	}else{
		res.send("cmd error");
	}

	
	next();
}