/*globals jodajs*/
jodajs.DateTimeFormatterBuilder = function () {
    var parsers = [], formatters = [], self;

    function number(field, minPrinted, maxParsed) {
        parsers.push(function (obj) {

        });
        formatters.push(function (obj) {
            var res = '' + obj[field]();
            while (res.length < minPrinted) {
                res = '0' + res;
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
            return number('getMillisOfSecond', minDigits, 3);
        },
        secondOfMinute: function (minDigits) {
            return number('getSecondOfMinute', minDigits);
        },
        minuteOfHour: function (minDigits) {
            return number('getMinuteOfHour', minDigits);
        },
        hourOfDay: function (minDigits) {
            return number('getHourOfDay', minDigits);
        },
        dayOfMonth: function (minDigits) {
            return number('getDayOfMonth', minDigits);
        },
        dayOfWeek: function (minDigits) {
            return number('getDayOfWeek', minDigits);
        },
        dayOfYear: function (minDigits) {
            return number('getDayOfYear', minDigits);
        },
        monthOfYear: function (minDigits) {
            return number('getMonthOfYear', minDigits);
        },
        year: function (minDigits, maxDigits) {
            return number('getYear', minDigits, maxDigits);
        },
        literal: function (text) {
            return literal(text);
        },

        toFormatter: function () {
            return new jodajs.DateTimeFormatter(formatters);
        }
    };

    return self;
};