/*globals exports*/
var localFactory = (function (DateTimeUtils, DateTimeFormat) {
    function accessor(name, field) {
        return name + field.substring(0, 1).toUpperCase() + field.substring(1);
    }

    function addGetAndWith(target, field) {
        target[accessor('get', field)] = function () {
            return this.chrono[field].get(this.date);
        };
        target[accessor('with', field)] = function (value) {
            return this.fromDateUTC(this.chrono[field].set(this.date, value));
        };
    }

    function addPlusAndMinus(target, field) {
        target[accessor('plus', field)] = function (value) {
            return this.fromDateUTC(this.chrono[field].add(this.date, value));
        };
        target[accessor('minus', field)] = function (value) {
            return this.fromDateUTC(this.chrono[field].add(this.date, -value));
        };
    }

    function forEach(fields, fn) {
        for (var i = 0; i < fields.length; i += 1) {
            fn(fields[i]);
        }
    }

    return {
        addBasic: function (target, type, defaultPattern) {
            var defaultFormat = DateTimeFormat.forPattern(defaultPattern);

            target.type = type;
            target.isEqual = function (other) {
                return this.compareTo(other) === 0;
            };
            target.isBefore = function (other) {
                return this.compareTo(other) < 0;
            };
            target.isAfter = function (other) {
                return this.compareTo(other) > 0;
            };
            target.toString = function (pattern, language) {
                var format = defaultFormat;
                if (pattern) {
                    format = DateTimeFormat.forPattern(pattern);
                    if (language) {
                        format = format.withLanguage(language);
                    }
                }
                return format.print(this);
            };
        },
        addStatic: function (target) {
            target.fromMillis = function (millis) {
                return this.fromDate(new Date(millis));
            };
            target.fromMillisUTC = function (millis) {
                return this.fromDateUTC(new Date(millis));
            };
            target.now = function () {
                return this.fromMillis(DateTimeUtils.currentTimeMillis());
            };
            target.nowUTC = function () {
                return this.fromMillisUTC(DateTimeUtils.currentTimeMillis());
            };
        },
        addDate: function (target) {
            forEach(['dayOfMonth', 'dayOfWeek', 'dayOfYear', 'weekOfWeekyear', 'weekyear', 'monthOfYear', 'year'], function (field) {
                addGetAndWith(target, field);
            });
            forEach(['days', 'weeks', 'months', 'years'], function (field) {
                addPlusAndMinus(target, field);
            });
        },
        addTime: function (target) {
            forEach(['millisOfSecond', 'secondOfMinute', 'minuteOfHour', 'hourOfDay'], function (field) {
                addGetAndWith(target, field);
            });
            forEach(['millis', 'seconds', 'minutes', 'hours'], function (field) {
                addPlusAndMinus(target, field);
            });
        }
    };
}(exports.DateTimeUtils, exports.DateTimeFormat));

