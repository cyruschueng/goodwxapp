var util=require('util');
function Person(){
	this.name='marico';
	this.toString=function(){
		return this.name;
	}
}
var obj=new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj,true,2,true));