/*globals exports*/
exports.JsonFormatter = function (formats) {
    var DateTimeFormat = exports.DateTimeFormat,
        prop,
        defFormats = {
            LocalDateTime: "yyyy-MM-dd'T'HH:mm:ss.SSS",
            LocalDate: "yyyy-MM-dd",
            LocalTime: "HH:mm:ss.SSS"
        };

    for (prop in defFormats) {
        defFormats[prop] = DateTimeFormat.forPattern((formats && formats[prop]) || defFormats[prop]);
        defFormats[prop + 'UTC'] = defFormats[prop].withTimeZoneOffset(0);
    }

    function isArray(obj) {
        var ts = {}.toString;
        return ts.call(obj) === '[object Array]';
    }

    function format(value, inUTC) {
        var type = value && value.type;
        if (type === 'LocalDateTime' || type === 'LocalDate' || type === 'LocalTime') {
            return defFormats[type + (inUTC ? 'UTC' : '')].print(value);
        }
        if (value && typeof value === 'object') {
            return beforeStringify(value, isArray(value) ? [] : {}, inUTC);
        }
        return value;
    }

    function beforeStringify(obj, target, inUTC) {
        for (var prop in obj) {
            target[prop] = format(obj[prop], inUTC);
        }
        return target;
    }

    return {
        beforeStringify: function (obj, inUTC) {
            return beforeStringify(obj, {}, inUTC);
        }
    };
};

