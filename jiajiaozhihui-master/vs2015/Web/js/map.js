function Map(){
  this._values = new Array();
  this._a = new Array();
}

Map.prototype.put = function (key, obj){
 var iKey=this.getKeyIndex(key);
 if(iKey>= 0){
  this._a[iKey] = key;
  this._values[iKey] = obj;
 } else {
		var len = this._a.length;
		if(len <0 ){
		len = 0;
		}
		this._a[len] = key;
		this._values[len] = obj;
 } 
}

Map.prototype.update = function (key, obj){
 var iKey=this.getKeyIndex(key);
 if(iKey>= 0){
  this._a[iKey] = key;
  this._values[iKey] = obj;
 } else {
	var len = this._a.length;
	if(len <0 ){
		len = 0;
	}
	this._a[len] = key;
	this._values[len] = obj;
 } 
}

Map.prototype.getObjByKey = function (key){
  var index = this.getKeyIndex(key);
  var obj = null;
  if(index != null && index < this._values.length && index>=0){
    var obj = this._values[index];
    if(obj instanceof RemovedObj){
        obj = null;
    }
  }
  return obj;
}
 
Map.prototype.getKeyIndex = function (key){
  var index =-1;
  for (var i = 0; i <this._a.length ;i++ )  {
     if(this._a[i] == key){
         index =  i;
         break;
      }
  }
  return index;
}

Map.prototype.get = function (key_index){
  var index = key_index;
  var obj = null;
  if(index != null && index < this._values.length && index>=0){
    var obj = this._values[index];
    if(obj instanceof RemovedObj){
        obj = null;
    }
  }
  return obj;
}

Map.prototype.getKeyValue = function(index){  
   var obj = null;
   if(index != null && index < this._a.length && index>=0)  {
    obj = this._a[index];
   }
  return obj;
}

Map.prototype.remove = function(key_index){  
   var obj = null;
   var index = this.getKeyIndex(key_index) ;
   if(index != null && index < this._values.length && index>=0)  {
    obj = this._values[index];
     this._values[index] = new RemovedObj();
   }
  return obj;
}

Map.prototype.removeByIndex = function(index){  
   var obj = null;
   if(index != null && index < this._values.length && index>=0)  {
    obj = this._values[index];
     this._values[index] = new RemovedObj();
   }
  return obj;
}

Map.prototype.size =function(){
    return this._values.length;
}

Map.prototype.values = function(){
  return getValues();
}

Map.prototype.getValues = function(){
  var a = new Array();
  for(var i=0; i<this._values.length; i++){
    if(!(this._values[i] instanceof RemovedObj)){
       a[a.length] = this._values[i];
    }
  }
  return a;
}

//**  *******************************
function RemovedObj(){
   this.label = "[被删除的对象]";
}

RemovedObj.prototype.toString = function(){
  return this.label;
}