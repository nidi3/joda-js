/*globals exports*/
exports.DateTimeFormatterBuilder = function () {
    var parsers = [], formatters = [], self;

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

    function number(field, minPrinted, maxParsed) {
        parsers.push(function (obj) {

        });
        formatters.push(function (obj) {
            var property = obj.getProperty(field),
                res = property.field.get(property.date);
            return padLeft(res, minPrinted);
        });
        return self;
    }

    function twoDigitYearNumber(field, pivot, lenientParse) {
        parsers.push(function (obj) {

        });
        formatters.push(function (obj) {
            var property = obj.getProperty(field),
                year = property.field.get(property.date),
                res = year < 0 ? -year : year;
            return padLeft(res % 100, 2);
        });
        return self;
    }

    function text(field, short) {
        parsers.push(function (obj) {

        });
        formatters.push(function (obj, language) {
            var property = obj.getProperty(field),
                res = property.field.getText(property.date, language, short);
            return res;
        });
        return self;
    }

    function timeZone(withSeparator) {
        parsers.push(function (obj) {

        });
        formatters.push(function (obj) {
            var property = obj.getProperty('timeZone'),
                res = property.field.get(property.date),
                absRes = Math.abs(res),
                h = padLeft(absRes / (60 * 60 * 1000), 2),
                m = padLeft(absRes % (60 * 1000), 2);
            return (res >= 0 ? '+' : '-') + h + (withSeparator ? ':' : '') + m;
        });
        return self;
    }

    function fraction(field, minDigits, maxDigits) {
        parsers.push(function (obj) {

        });
        formatters.push(function (obj) {
            var property = obj.getProperty(field),
                res = property.field.remainder(property.date);
            return padRight(cutRight(padLeft(res, 3), maxDigits), minDigits);
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

    function addNumber(target, field) {
        target[field] = function (minDigits) {
            return number(field, minDigits);
        };
    }

    function addText(target, field, short) {
        target[field + (short ? 'Short' : '') + 'Text'] = function () {
            return text(field, short);
        };
    }

    self = {
        millisOfSecond: function (minDigits) {
            return number('millisOfSecond', minDigits, 3);
        },
        fractionOfSecond: function (minDigits, maxDigits) {
            return fraction('millis', minDigits, maxDigits);
        },
        timeZoneOffset: function (withSeparator) {
            return timeZone(withSeparator);
        },
        twoDigitYear: function (pivot, lenientParse) {
            return twoDigitYearNumber('year', pivot, lenientParse);
        },
        twoDigitWeekyear: function (pivot, lenientParse) {
            return twoDigitYearNumber('weekyear', pivot, lenientParse);
        },
        literal: function (text) {
            return literal(text);
        },

        toFormatter: function () {
            return new exports.DateTimeFormatter(formatters);
        }
    };
    var i,
        numberFields = ['secondOfMinute', 'minuteOfHour', 'hourOfDay', 'clockhourOfDay', 'hourOfHalfday', 'clockhourOfHalfday', 'dayOfMonth', 'dayOfWeek', 'dayOfYear', 'monthOfYear', 'weekOfWeekyear', 'weekyear', 'year', 'yearOfEra', 'centuryOfEra'],
        textFields = [
            ['dayOfWeek', true],
            ['dayOfWeek', false],
            ['monthOfYear', true],
            ['monthOfYear', false],
            ['halfdayOfDay', false],
            ['timeZone', true],
            ['era', false]
        ];
    for (i = 0; i < numberFields.length; i += 1) {
        addNumber(self, numberFields[i]);
    }
    for (i = 0; i < textFields.length; i += 1) {
        addText(self, textFields[i][0], textFields[i][1]);
    }

    return self;
};