/**
 * @Explain sqlHelper is an orm for My_sql Frame which Run in node_js
 * @Export init sample:
 global.sqlHelper.sql_Init(function (ret, err) {
    	ret ? console.log("---> SqlHelper init success") : console.log("---> SqlHelper init false :" + JSON.stringify(err))
	})
 * @Frame Feature :
 sql_Helper could Non essential to Maintain the Mapping_File that database_field to the server Object
 * @author 啸 2016-12-7
 * @Copyright is strictly prohibited for non learning purposes.
 */

exports.name = "sqlHelper"
var TableMay = [{
    baseName: ""
}]

/**
 * sqlHelper global Model
 * @Call sample:global.sqlHelper.sql_TableName("ysh_Wisdom",callback)
 * @param explain:
 dataBaseName:The DB name
 table_Name:The DB Table name
 object:SQL Parameters
 callback:The function to callback
 * @author 啸 2016-12-7
 */
exports.sqlHelper = {
    /**
     * @Explain:sqlHelper Initialization
     *    If sqlHelper initialization success callback(true)
     *    If sqlHelper initialization faile callback(false,SQL_ERROR)
     * @author 啸 2016-12-1
     */
    "sql_Init": function (callback) {
        return sqlHelper_Init(callback)
    },
    /**
     * @Explain:Get all tables by the dataBaseName
     * @author 啸 2016-12-1
     */
    "sql_TableName": function (dataBaseName, callback) {
        return getSQLTABLENAME(dataBaseName, callback)
    },
    /**
     * @Explain:Get tabledesc by the table_Name
     * @author 啸 2016-12-1
     */
    "sql_TableDesc": function (table_Name) {
        return getSQLTABLEDESC(table_Name)
    },
    /**
     * @Explain:Single table operation method
     * @param:
     search:
     object:{
				 "way": "select",
             	 "baseName": "ysh_Wisdom",
      		 	 "tableName": "DB_CMDS",
     		 	 "resultField": ["api", "sel"],
    		 	 "reName": {
        			"api": "app",
        			"sel": "selee"
    				},
    		 	 "searchKey": [{"Id": 2}, {"type": 0, "operator": "="}],
   			 	 "paging": {"pageNumber": 0, "pageCount": 2}
				}
     callback:callback(err, result, sql)
     insert:
     object(could not use the Primarykey):{
				 "way": "select",
             	 "baseName": "ysh_Wisdom",
      		 	 "tableName": "DB_CMDS",
        		 "data": {
           				"UserName": "熊啸天",
           				"Address": "四川成都",
           				"RoleType": "1",
           				"LiablePerson": "dd",
           				"PhoneNum": "18583621992",
           				"ServicePerson": "0",
           				"ServicePhoneNum": "56",
           				"Status": "1",
           				"IsDelete": "0",
           				"WxOpenId": "oZ53jvinEETg3JuwvfMGYo0clC-",
           				"ReginDate": "2016-12-01 16:18:41",
         				"SellerOrBuyer": "2"
     				},
				}

     updata:
     object(could not use the Primarykey):{
				 "way": "update",
                 "baseName": "ysh_Wisdom",
                 "tableName": "DB_USER",
                 "data":{
                    UserName:"熊啸天",
                    Address:"四川成都"
                    },
                  "searchKey": [{"UserName": "1"}, {"UserName": 11, "operator": "="}]
				}

     delete:
     object:{
        "way": "delete",
        "baseName": "ysh_Wisdom",
        "tableName": "DB_USER",
        "searchKey": [{"Id": 13}, {"UserName": "熊啸天", "operator": "="}]
    }
     * @author 啸 2016-12-1
     */
    "sql_TableQuery": function (object, callback) {
        return singleTableQuery(object, callback)
    },
    /**
     * DB_Map Object
     * @author 啸 2016-12-1
     */
    "sql_TableMay": TableMay
}

/*
 * @sqlHelper.sql_Init
 */
function sqlHelper_Init(callback) {
    var END_FLAG = 0
    var SQL_ERROR = global.ERROR.SQLHelperError
    global.db.databaseName.forEach(function (name) {
        getSQLTABLENAME(name, function (tableMap) {
            var base = {
                baseName: name,
                tableMap: tableMap
            }
            for (var num in TableMay) {
                if (TableMay[num].baseName == base.baseName) {
                    TableMay[num] = base
                } else {
                    TableMay.push(base)
                }
            }

            getSQLTABLEDESC(base, function (back, dataBaseName, tableName) {
                if (!back) {
                    SQL_ERROR.errMsg.push({
                        "dataBaseName": dataBaseName,
                        "tableName": tableName
                    })
                }
                END_FLAG++
                if (END_FLAG == global.db.databaseName.length) {
                    SQL_ERROR.errMsg.length <= 0 ? callback(true) : callback(false, SQL_ERROR)
                }
            })
        })
    });
}

/*
 * @sqlHelper.sql_TableName
 */
function getSQLTABLENAME(dataBaseName, callback) {
    var sql = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '" + dataBaseName + "'"
    global.db.getAll(sql, function (result, err) {
        if (!err.status) {
            result.dataBaseName = dataBaseName
            callback && callback(result)
        } else {
            callback && callback(false)
        }
    })
}

/*
 * @sqlHelper.sql_TableDesc
 */
function getSQLTABLEDESC(table_Name, callback) {
    var sql = ""
    var tempArray = []
    TableMay.forEach(function (baseName) {
        var temp = 0
        //console.log(baseName)
        if (baseName.baseName == table_Name.baseName) {
            table_Name.tableMap.forEach(function (name) {
                sql = "show full fields from  " + table_Name.baseName + "." + name.TABLE_NAME
                global.db.getAll(sql, function (result, err) {
                    temp++
                    if (!err.status) {
                        for (var num in baseName.tableMap) {
                            if (baseName.tableMap[num].TABLE_NAME == name.TABLE_NAME) {
                                name.TABLE_DESC = result
                                baseName.tableMap[num].TABLE_DESC = result
                                if (temp == table_Name.tableMap.length)
                                    callback && callback(true)
                            } else {
                                //暂不处理
                            }
                        }
                    } else {
                        callback && callback(false, table_Name.baseName, name.TABLE_NAME)
                    }
                })
            })
        } else {
            //暂不处理
        }
    })
}

/*
 * @sqlHelper.sql_TableQuery
 */
function singleTableQuery(object, callback) {
    var temp = checkParams(object)
    if (temp == "true") {
        var sql = MosaicSql(object)
        global.db.getAll(sql, function (result, err) {
            callback && callback(err, result, sql)
        })
    } else {
        callback && callback(temp)
    }
}

/**
 * @Explain check sqlHelper sql Object
 * @param {Object} obj:sqlHelper Object
 * @author 啸  2016-12-1
 */
function checkParams(obj) {
    var retrun_obj = {}
    var backObject = []
    obj.dataKey = []
    obj.dataValue = []
    var falg_count = {
        count: 0,
        state: false
    }
    var falg_DB_count = {
        count: 0,
        state: false
    }
    if (obj && obj.way && obj.way == "insert") {
        if (obj.data && obj != {}) {
            obj.resultField = []
            for (var key in obj.data) {
                obj.resultField.push(key)
            }
        } else {
            //提醒传入参数

        }
    }

    if (TableMay && TableMay instanceof Array && TableMay[0] && !TableMay[0].baseName)
        TableMay.shift()
    if (obj.baseName && obj.tableName && obj.way) {
        for (var base in TableMay) {
            falg_DB_count.count++
            if (TableMay[base].baseName == obj.baseName) {
                falg_DB_count.state = true
                for (var table in TableMay[base].tableMap) {
                    falg_count.count++
                    if (TableMay[base].tableMap[table].TABLE_NAME == obj.tableName) {
                        falg_count.state = true
                        var FIELD_KEY = {}
                        var tempMap = []
                        for (var desc in TableMay[base].tableMap[table].TABLE_DESC) {
                            if (TableMay[base].tableMap[table].TABLE_DESC[desc].Comment.indexOf("-") > 0) {
                                try {
                                    FIELD_KEY = TableMay[base].tableMap[table].TABLE_DESC[desc].Comment.split("-")

                                    if (obj.way == "select") {
                                        for (var number in obj.resultField) {
                                            if (obj.resultField[number] == FIELD_KEY[0]) {
                                                obj.resultField[number] = TableMay[base].tableMap[table].TABLE_DESC[desc].Field
                                            }
                                        }
                                    }
                                    if (obj.way == "insert" || obj.way == "update") {
                                        if (obj.data) {
                                            for (var key in obj.data) {
                                                if (key == FIELD_KEY[0]) {
                                                    obj.dataKey.push(TableMay[base].tableMap[table].TABLE_DESC[desc].Field)
                                                    obj.dataValue.push("'" + obj.data[key] + "'")
                                                }
                                            }
                                        } else {
                                            console.log("请传入插入参数")
                                        }
                                    }
                                    if (TableMay[base].tableMap[table].TABLE_DESC[desc].Key != "PRI") {
                                        tempMap.push(FIELD_KEY[0])
                                    } else {
                                        obj.PRI = FIELD_KEY[0]
                                    }
                                } catch (e) {
                                    //拆分失败
                                }
                            } else {
                                //注释格式不正确
                            }
                        }

                        if (obj.way == "insert") {
                            var temp_Key = []
                            for (var key in obj.data) {
                                temp_Key.push(key)
                            }
                            if (temp_Key.sort().toString() == tempMap.sort().toString()) {
                                return "true"
                            } else {
                                console.log("插锤子")
                            }
                        }

                        if (obj.way == "update") {
                            var count = 0
                            for (var key in obj.dataKey) {
                                if (obj.dataKey[key] == obj.PRI)
                                    count++
                            }
                            if (count == 0) {
                                return "true"
                            } else {
                                return "false"
                            }
                        }
                        if (obj.way == "delete") {
                            if (obj.searchKey.length > 0) {
                                return "true"
                            } else {
                                console.log("请传入删除约束")
                            }
                        }
                    } else {
                        //对没有找到的表进行处理
                        if (TableMay[base].tableMap.length == falg_count.count && !falg_count.state) {
                            retrun_obj = global.ERROR.SQLHelperTableUndefined
                            retrun_obj.errDB = obj.baseName
                            retrun_obj.errTABLE = obj.tableName
                            return retrun_obj
                        }
                    }
                }
                if (obj.way == "select")
                    return "true"
            }
            else {
                //sqlHelper没有初始化该DB
                if (TableMay.length == falg_DB_count.count && !falg_DB_count.state) {
                    retrun_obj = global.ERROR.SQLHelperDBUndefined
                    retrun_obj.errDB = obj.baseName
                    return retrun_obj
                }
            }
        }
    }
    else {
        return global.ERROR.SQLHelperParamsNull
    }
}

/**
 * @Explain mosaic sql
 * @param {Object} obj:sqlHelper Object
 * @author 啸  2016-12-1
 */
function MosaicSql(object) {
    var sql = ""
    var err = global.ERROR.SQLHelperOperatorError
    switch (object.way) {
        case "select":
            sql = "select "
            if (!object.resultField || object.resultField.length == 0) {
                sql += "* from "
            } else {
                if (object.reName) {
                    for (var key in object.reName) {
                        for (var name in object.resultField) {
                            if (object.resultField[name] == key)
                                object.resultField[name] += " as " + object.reName[key]
                        }
                    }
                }
                sql += object.resultField.join(",")
                sql += " from "
            }
            sql += object.baseName + "." + object.tableName
            if (!object.searchKey || object.searchKey.length == 0)
                return sql
            for (var num in object.searchKey) {
                for (var key in object.searchKey[num]) {
                    if (key != "operator") {
                        if (num == 0) {
                            if ((!object.searchKey[num].operator || object.searchKey[num].operator == "=")) {
                                sql += " where " + key + " = " + "'" + object.searchKey[num][key] + "'"
                            } else if (object.searchKey[num].operator == "!=") {
                                sql += " where " + key + " != " + "'" + object.searchKey[num][key] + "'"
                            } else {
                                err.errOperator = object.searchKey[num].operator
                                console.log(err)
                            }
                        } else {
                            if ((!object.searchKey[num].operator || object.searchKey[num].operator == "=")) {
                                sql += " and " + key + " = " + "'" + object.searchKey[num][key] + "'"
                            } else if (object.searchKey[num].operator == "!=") {
                                sql += " and " + key + " != " + "'" + object.searchKey[num][key] + "'"
                            } else {
                                err.errOperator = object.searchKey[num].operator
                                console.log(err)
                            }
                        }
                    }
                }
            }
            if (object.paging)
                sql += " Limit " + object.paging.pageNumber + "," + object.paging.pageCount
            return sql
            break;
        case "insert":
            var temp = []
            sql += "insert into "
            sql += object.baseName + "." + object.tableName + "(" + object.dataKey.join(",") + ")"
            sql += " values (" + object.dataValue.join(",") + ")"
            return sql
            break;
        case "update":
            var temp = []
            sql += "update "
            sql += object.baseName + "." + object.tableName + " SET "
            if (object.data) {
                for (var k = 0; k < object.dataKey.length; k++) {
                    temp.push(object.dataKey[k] + "=" + object.dataValue[k])
                    console.log("dataKey" + object.dataKey[k])
                    console.log("dataValue" + object.dataValue[k])
                }
                sql += temp.join(",")
            }
            for (var num in object.searchKey) {
                for (var key in object.searchKey[num]) {
                    if (key != "operator") {
                        if (num == 0) {
                            if ((!object.searchKey[num].operator || object.searchKey[num].operator == "=")) {
                                sql += " where " + key + " = " + "'" + object.searchKey[num][key] + "'"
                            } else if (object.searchKey[num].operator == "!=") {
                                sql += " where " + key + " != " + "'" + object.searchKey[num][key] + "'"
                            } else {
                                err.errOperator = object.searchKey[num].operator
                                console.log(err)
                            }
                        } else {
                            if ((!object.searchKey[num].operator || object.searchKey[num].operator == "=")) {
                                sql += " and " + key + " = " + "'" + object.searchKey[num][key] + "'"
                            } else if (object.searchKey[num].operator == "!=") {
                                sql += " and " + key + " != " + "'" + object.searchKey[num][key] + "'"
                            } else {
                                err.errOperator = object.searchKey[num].operator
                                console.log(err)
                            }
                        }
                    }
                }
            }
            return sql
            break;
        case "delete":
            sql += "delete FROM " + object.baseName + "." + object.tableName
            for (var num in object.searchKey) {
                for (var key in object.searchKey[num]) {
                    if (key != "operator") {
                        if (num == 0) {
                            if ((!object.searchKey[num].operator || object.searchKey[num].operator == "=")) {
                                sql += " where " + key + " = " + "'" + object.searchKey[num][key] + "'"
                            } else if (object.searchKey[num].operator == "!=") {
                                sql += " where " + key + " != " + "'" + object.searchKey[num][key] + "'"
                            } else {
                                err.errOperator = object.searchKey[num].operator
                                console.log(err)
                            }
                        } else {
                            if ((!object.searchKey[num].operator || object.searchKey[num].operator == "=")) {
                                sql += " and " + key + " = " + "'" + object.searchKey[num][key] + "'"
                            } else if (object.searchKey[num].operator == "!=") {
                                sql += " and " + key + " != " + "'" + object.searchKey[num][key] + "'"
                            } else {
                                err.errOperator = object.searchKey[num].operator
                                console.log(err)
                            }
                        }
                    }
                }
            }
            return sql
            break;
    }
}