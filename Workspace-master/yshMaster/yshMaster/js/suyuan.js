
	var fillForm = function ($form, json) {
	  var jsonObj = json;
	  if (typeof json === 'string') {
	    jsonObj = $.parseJSON(json);
	  }
	
	  for (var key in jsonObj) {  //遍历json字符串
	    var objtype = jsonObjType(jsonObj[key]); // 获取值类型
	
	     if (objtype === "array") { //如果是数组，一般都是数据库中多对多关系
	
	      var obj1 = jsonObj[key];
	      for (var arraykey in obj1) {
	        //alert(arraykey + jsonObj[arraykey]);
	        var arrayobj = obj1[arraykey];
	        for (var smallkey in arrayobj) {
	          setCkb(key, arrayobj[smallkey]);
	          break;
	        }
	      }
	    } else if (objtype === "object") { //如果是对象，啥都不错，大多数情况下，会有 xxxId 这样的字段作为外键表的id
	
	    } else if (objtype === "string") { //如果是字符串
	      var str = jsonObj[key];
	      var date = new Date(str);
	      if (date.getDay()) {  //这种判断日期是本人懒，不想写代码了，大家慎用。
	        $("[name=" + key + "]", $form).val(new Date(date).Format("yyyy-MM-dd hh:mm:ss"));
	        continue;
	      }
	
	      var tagobjs = $("[name=" + key + "]", $form);
	      if ($(tagobjs[0]).attr("type") == "radio") {//如果是radio控件 
	        $.each(tagobjs, function (keyobj,value) {
	          if ($(value).attr("val") == jsonObj[key]) {
	            value.checked = true;
	          }
	        });
	        continue;
	      }
	      
	      $("[name=" + key + "]", $form).val(jsonObj[key]);
	      
	    } else { //其他的直接赋值
	      $("[name=" + key + "]", $form).val(jsonObj[key]);
	    }
	
	  }
	}

	var setCkb = function(name, value) {
		//alert(name + " " + value);
		//$("[name=" + name + "][value=" + value + "]").attr("checked", "checked");  不知为何找不到具体标签;
		$("[name=" + name + "][val=" + value + "]").attr("checked", "checked");
	}
	var fillckb = function(name, json) {
		var jsonObj = json;
		if (typeof json === 'string') {
			jsonObj = $.parseJSON(json);
		}
		var str = jsonObj[name];
		if (typeof str === "string") {
			var array = str.split(",");
			$.each(array, function(key, value) {
				setCkb(name, value);
			});
		}
	}
	var jsonObjType = function(obj) {
		if (typeof obj === "object") {
			var teststr = JSON.stringify(obj);
			if (teststr[0] == '{' && teststr[teststr.length - 1] == '}') return "class";
			if (teststr[0] == '[' && teststr[teststr.length - 1] == ']') return "array";
		}
		return typeof obj;
	}
