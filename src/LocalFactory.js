/*globals exports*/
var localFactory = (function (DateTimeUtils, DateTimeFormat) {
    function accessor(name, field) {
        return name + field.substring(0, 1).toUpperCase() + field.substring(1);
    }

    function addGetAndWith(target, field, date, chrono, fromDate) {
        target[accessor('get', field)] = function () {
            return chrono[field].get(date);
        };
        target[accessor('with', field)] = function (value) {
            return fromDate(chrono[field].set(date, value));
        };
    }

    function addPlusAndMinus(target, field, date, chrono, fromDate) {
        target[accessor('plus', field)] = function (value) {
            return fromDate(chrono[field].add(date, value));
        };
        target[accessor('minus', field)] = function (value) {
            return fromDate(chrono[field].add(date, -value));
        };
    }

    function forEach(fields, fn) {
        for (var i = 0; i < fields.length; i += 1) {
            fn(fields[i]);
        }
    }

    return {
        addBasic: function (target, type, date, chrono, defaultPattern) {
            var defaultFormat = DateTimeFormat.forPattern(defaultPattern);

            target.type = type;
            target.getProperty = function (name) {
                return {date: date, field: chrono[name]};
            };
            target.isEqual = function (other) {
                return target.compareTo(other) === 0;
            };
            target.isBefore = function (other) {
                return target.compareTo(other) < 0;
            };
            target.isAfter = function (other) {
                return target.compareTo(other) > 0;
            };
            target.toString = function (pattern, language) {
                var format = defaultFormat;
                if (pattern) {
                    format = DateTimeFormat.forPattern(pattern);
                    if (language) {
                        format = format.withLanguage(language);
                    }
                }
                return format.print(target);
            };
        },
        addCons: function (target) {
            target.fromMillis = function (millis) {
                return target.fromDate(new Date(millis));
            };
            target.fromMillisUTC = function (millis) {
                return target.fromDateUTC(new Date(millis));
            };
            target.now = function () {
                return target.fromMillis(DateTimeUtils.currentTimeMillis());
            };
            target.nowUTC = function () {
                return target.fromMillisUTC(DateTimeUtils.currentTimeMillis());
            };
        },
        addDate: function (target, date, chrono, fromDate) {
            forEach(['dayOfMonth', 'dayOfWeek', 'dayOfYear', 'weekOfWeekyear', 'weekyear', 'monthOfYear', 'year'], function (field) {
                addGetAndWith(target, field, date, chrono, fromDate);
            });
            forEach(['days', 'weeks', 'months', 'years'], function (field) {
                addPlusAndMinus(target, field, date, chrono, fromDate);
            });
        },
        addTime: function (target, date, chrono, fromDate) {
            forEach(['millisOfSecond', 'secondOfMinute', 'minuteOfHour', 'hourOfDay'], function (field) {
                addGetAndWith(target, field, date, chrono, fromDate);
            });
            forEach(['millis', 'seconds', 'minutes', 'hours'], function (field) {
                addPlusAndMinus(target, field, date, chrono, fromDate);
            });
        }
    };
}(exports.DateTimeUtils, exports.DateTimeFormat));

