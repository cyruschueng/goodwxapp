var autocurry = function(fn) {
    var numargs = fn.length;
    return createRecurser([]);

    function createRecurser(acc) {
        return function() {
            var args = [].slice.call(arguments);
            return recurse(acc, args);
        };
    }

    function recurse(acc, args) {
        var newacc = acc.concat(args);
        if (newacc.length < numargs) {
            return createRecurser(newacc);
        } else {
            return fn.apply(this, newacc);
        }
    }
}
var add = autocurry(function(a, b) {
    return a + b;
});
console.log(add(1, 2)); => 3
console.log(add(1)(3)); => 4


// 函数柯里化定义

// 柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，
// 并且返回接受余下的参数且返回结果的新函数的技术。