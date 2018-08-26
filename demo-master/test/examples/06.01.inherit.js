// inherit() returns a newly created object that inherits properties from the
// prototype object p.  It uses the ECMAScript 5 function Object.create() if
// it is defined, and otherwise falls back to an older technique.
function inherit(p) {
    if (p == null) throw TypeError(); // p must be a non-null object
    if (Object.create)                // If Object.create() is defined...
        return Object.create(p);      //    then just use it.
    var t = typeof p;                 // Otherwise do some more type checking
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {};                  // Define a dummy constructor function.
    f.prototype = p;                  // Set its prototype property to p.
    return new f();                   // Use f() to create an "heir" of p.
}

/*typeof
类型	结果
Undefined	"undefined"
Null	"object"（见下文）
Boolean	"boolean"
Number	"number"
String	"string"
Symbol （ECMAScript 6 新增）	"symbol"
宿主对象（由JS环境提供）	Implementation-dependent
函数对象（[[Call]] 在ECMA-262条款中实现了）	"function"
任何其他对象	"object"*/