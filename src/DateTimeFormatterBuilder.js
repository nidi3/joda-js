/*globals exports*/
exports.DateTimeFormatterBuilder = function () {
    var parsers = [], formatters = [], self;

    function number(field, minPrinted, maxParsed) {
        parsers.push(function (obj) {

        });
        formatters.push(function (obj) {
            var property = obj.getProperty(field),
                res = '' + property.field.get(property.date);
            while (res.length < minPrinted) {
                res = '0' + res;
            }
            return res;
        });
        return self;
    }

    function text(field) {
        parsers.push(function (obj) {

        });
        formatters.push(function (obj, language) {
            var property = obj.getProperty(field),
                res = '' + property.field.get(property.date, language);
            return res;
        });
        return self;
    }

    function fraction(field, minPrinted, maxParsed) {
        parsers.push(function (obj) {

        });
        formatters.push(function (obj) {
            var property = obj.getProperty(field),
                res = '' + property.field.remainder(property.date);
            res = res.substring(0, minPrinted);
            while (res.length < minPrinted) {
                res += '0';
            }
            return res;
        });
        return self;
    }

    function literal(text) {
        parsers.push({});
        formatters.push(function (obj) {
            return text;
        });
        return self;
    }

    self = {
        millisOfSecond: function (minDigits) {
            return number('millisOfSecond', minDigits, 3);
        },
        fractionOfSecond: function (minDigits) {
            return fraction('millis', minDigits, 3);
        },
        secondOfMinute: function (minDigits) {
            return number('secondOfMinute', minDigits);
        },
        minuteOfHour: function (minDigits) {
            return number('minuteOfHour', minDigits);
        },
        hourOfDay: function (minDigits) {
            return number('hourOfDay', minDigits);
        },
        clockhourOfDay: function (minDigits) {
            return number('clockhourOfDay', minDigits);
        },
        hourOfHalfday: function (minDigits) {
            return number('hourOfHalfday', minDigits);
        },
        clockhourOfHalfday: function (minDigits) {
            return number('clockhourOfHalfday', minDigits);
        },
        dayOfMonth: function (minDigits) {
            return number('dayOfMonth', minDigits);
        },
        dayOfWeek: function (minDigits) {
            return number('dayOfWeek', minDigits);
        },
        dayOfWeekText: function () {
            return text('dayOfWeekText');
        },
        dayOfWeekShortText: function () {
            return text('dayOfWeekShortText');
        },
        dayOfYear: function (minDigits) {
            return number('dayOfYear', minDigits);
        },
        monthOfYear: function (minDigits) {
            return number('monthOfYear', minDigits);
        },
        monthOfYearText: function () {
            return text('monthOfYearText');
        },
        monthOfYearShortText: function () {
            return text('monthOfYearShortText');
        },
        weekOfWeekyear: function (minDigits, maxDigits) {
            return number('weekOfWeekyear', minDigits, maxDigits);
        },
        weekyear: function (minDigits, maxDigits) {
            return number('weekyear', minDigits, maxDigits);
        },
        year: function (minDigits, maxDigits) {
            return number('year', minDigits, maxDigits);
        },
        literal: function (text) {
            return literal(text);
        },
        halfdayOfDayText: function () {
            return text('halfdayOfDay');
        },

        toFormatter: function () {
            return new exports.DateTimeFormatter(formatters);
        }
    };

    return self;
};