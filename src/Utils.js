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


function forEach(fields, fn) {
    for (var i = 0; i < fields.length; i += 1) {
        fn(fields[i]);
    }
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