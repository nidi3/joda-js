/*globals exports*/
exports.JsonFormatter = function (formats) {
    var DateTimeFormat = exports.DateTimeFormat,
        prop,
        defFormats = {
            LocalDateTime: "yyyy-MM-dd'T'HH:mm:ss.SSS",
            LocalDate: "yyyy-MM-dd",
            LocalTime: "HH:mm:ss.SSS",
            TimeZoneLocalDateTime: "yyyy-MM-dd'T'HH:mm:ss.SSS Z",
            TimeZoneLocalDate: "yyyy-MM-dd Z",
            TimeZoneLocalTime: "HH:mm:ss.SSS Z"
        };

    for (prop in defFormats) {
        defFormats[prop] = DateTimeFormat.forPattern((formats && formats[prop]) || defFormats[prop]);
    }

    return {
        beforeStringify: function (obj, keepLocal) {
            var prop, val, type;
            for (prop in obj) {
                val = obj[prop];
                type = val && val.type;
                if (type === 'LocalDateTime') {
                    obj[prop] = defFormats.LocalDateTime.print(val);
                } else if (type === 'LocalDate') {
                    obj[prop] = defFormats.LocalDate.print(val);
                } else if (type === 'LocalTime') {
                    obj[prop] = defFormats.LocalTime.print(val);
                } else if (val && typeof val === 'object') {
                    this.beforeStringify(val, keepLocal);
                }
            }
            return obj;
        }
    };
};

