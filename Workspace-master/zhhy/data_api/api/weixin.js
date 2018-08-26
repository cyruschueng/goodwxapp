exports.getTicket=function(req1,res1,next){


var http=require('http');
var qs=require('querystring');
 
var post_data={a:123,time:new Date().getTime()};//这是需要提交的数据
var content=qs.stringify(post_data);
 var url=require('url');
 // var ss=url.parse('http://localhost:3090/api/ditui/user_id=1041');
 var ss=url.parse('https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=CHP45boUS12kK7r1zLkjjzqOIyzVitjRBoHStyiPDcYnC8ZB8AxJNgzkbZz8CEY-RbxuJ1TRoO4r2C4e582XcHRwyf7BX2giiJ3Dsn9g_IkXWGeACARQA');
 console.log(ss);
var options = {
  host: ss.hostname,
  port: ss.port,
  path: ss.path,
  // href:'http://localhost:3090/hello/aa',
  // href:'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=43242',
  method: 'POST',
  headers:{
  'Content-Type':'application/x-www-form-urlencoded',
  'Content-Length':content.length
  }
};
console.log("post options:\n",options);
console.log("content:",content);
console.log("\n");
 
var req = http.request(options, function(res) {
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);
  var _data='';
  res.on('data', function(chunk){
     _data += chunk;
  });
  res.on('end', function(){
     console.log("\n--->>\nresult:",_data)

     res1.send(_data);
   });
  
});
 
req.write(content);
req.end();
next();
}