/*globals jodajs*/
jodajs.DateTimeFormatterBuilder = function () {
    var parsers = [], formatters = [];

    function number(field, minPrinted, maxParsed) {
        parsers.push({});
        formatters.push(function (obj) {
            var res = '' + obj[field]();
            while (res.length < minPrinted) {
                res = '0' + res;
            }
            return res;
        });
    }

    function literal(text) {
        parsers.push({});
        formatters.push(function (obj) {
            return text;
        });
    }

    return {
        millisOfSecond: function (minDigits) {
            number('getMillisOfSecond', minDigits);
            return this;
        },
        secondOfMinute: function (minDigits) {
            number('getSecondOfMinute', minDigits);
            return this;
        },
        minuteOfHour: function (minDigits) {
            number('getMinuteOfHour', minDigits);
            return this;
        },
        hourOfDay: function (minDigits) {
            number('getHourOfDay', minDigits);
            return this;
        },
        dayOfMonth: function (minDigits) {
            number('getDayOfMonth', minDigits);
            return this;
        },
        dayOfWeek: function (minDigits) {
            number('getDayOfWeek', minDigits);
            return this;
        },
        dayOfYear: function (minDigits) {
            number('getDayOfYear', minDigits);
            return this;
        },
        monthOfYear: function (minDigits) {
            number('getMonthOfYear', minDigits);
            return this;
        },
        year: function (minDigits, maxDigits) {
            number('getYear', minDigits, maxDigits);
            return this;
        },
        literal: function (text) {
            literal(text);
            return this;
        },

        toFormatter: function () {
            return new jodajs.DateTimeFormatter(formatters);
        }
    };
};