/*globals */
function extend(constructorFn, proto) {
    var fn = function () {
        var args = arguments,
            F = function () {
                return constructorFn.apply(this, args);
            };
        F.prototype = proto;
        return new F();
    };
    fn.prototype = proto;
    return fn;
}


function forEach(arr, fn) {
    for (var i = 0; i < arr.length; i += 1) {
        fn(arr[i]);
    }
}
function map(arr, fn) {
    var i, res = [];
    for (i = 0; i < arr.length; i += 1) {
        res[i] = fn(arr[i]);
    }
    return res;
}

function pad(value, len, fn) {
    value = '' + value;
    while (value.length < len) {
        value = fn(value);
    }
    return value;
}

function padLeft(value, len) {
    return pad(value, len, function (value) {
        return '0' + value;
    });
}

function padRight(value, len) {
    return pad(value, len, function (value) {
        return value + '0';
    });
}

function cutRight(value, len) {
    return value.substring(0, len);
}