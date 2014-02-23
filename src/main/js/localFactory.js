/*globals exports,forEach,map*/
var localFactory = (function (DateTimeUtils, DateTimeFormat) {

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

    return {
        addBasic: function (target, chrono, type, defaultPattern, fields) {
            var defaultFormat = DateTimeFormat.forPattern(defaultPattern),
                proto = target.prototype;

            proto.chrono = chrono;
            target.fromDateUTC = proto.fromDateUTC = function (date) {
                var chrono = this.chrono || this.prototype.chrono;
                return target.apply(null, map(fields, function (f) {
                    return chrono[f].get(date);
                }));
            };

            target.fromDate = proto.fromDate;

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


            proto.type = type;
            proto.compareTo = function (other) {
                var i, res, acc;
                for (i = 0; i < fields.length; i += 1) {
                    acc = accessor('get', fields[i]);
                    res = this[acc]() - other[acc]();
                    if (res !== 0) {
                        return res;
                    }
                }
                return 0;
            };
            proto.isEqual = function (other) {
                return this.compareTo(other) === 0;
            };
            proto.isBefore = function (other) {
                return this.compareTo(other) < 0;
            };
            proto.isAfter = function (other) {
                return this.compareTo(other) > 0;
            };
            proto.toString = function (pattern, language) {
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
        addDate: function (target) {
            target = target.prototype;

            forEach(['dayOfMonth', 'dayOfWeek', 'dayOfYear', 'weekOfWeekyear', 'weekyear', 'monthOfYear', 'year'], function (field) {
                addGetAndWith(target, field);
            });
            forEach(['days', 'weeks', 'months', 'years'], function (field) {
                addPlusAndMinus(target, field);
            });
        },
        addTime: function (target) {
            target = target.prototype;

            forEach(['millisOfSecond', 'secondOfMinute', 'minuteOfHour', 'hourOfDay'], function (field) {
                addGetAndWith(target, field);
            });
            forEach(['millis', 'seconds', 'minutes', 'hours'], function (field) {
                addPlusAndMinus(target, field);
            });
        }
    };
}(exports.DateTimeUtils, exports.DateTimeFormat));

