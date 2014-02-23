/*globals exports,accessor,forEach,padLeft,padRight,cutRight,extend*/
exports.DateTimeFormatterBuilder = (function () {
    var proto = {
            appendNumberFormatter: function (field, minPrinted, maxParsed) {
                this.parsers.push(function (obj) {

                });
                this.printers.push(function (obj) {
                    var res = obj.chrono[field].get(obj.date);
                    return padLeft(res, minPrinted);
                });
                return this;
            },
            appendFractionFormatter: function (field, minDigits, maxDigits) {
                this.parsers.push(function (obj) {

                });
                this.printers.push(function (obj) {
                    var res = obj.chrono[field].remainder(obj.date);
                    return padRight(cutRight(padLeft(res, 3), maxDigits), minDigits);
                });
                return this;
            },
            appendTwoDigitYearFormatter: function (field, pivot, lenientParse) {
                this.parsers.push(function (obj) {

                });
                this.printers.push(function (obj) {
                    var year = obj.chrono[field].get(obj.date),
                        res = year < 0 ? -year : year;
                    return padLeft(res % 100, 2);
                });
                return this;
            },
            appendTextFormatter: function (field, short) {
                this.parsers.push(function (obj) {

                });
                this.printers.push(function (obj, language) {
                    var res = obj.chrono[field].getText(obj.date, language, short);
                    return res;
                });
                return this;
            },
            appendMillisOfSecond: function (minDigits) {
                return this.appendNumberFormatter('millisOfSecond', minDigits, 3);
            },
            appendFractionOfSecond: function (minDigits, maxDigits) {
                return this.appendFractionFormatter('millis', minDigits, maxDigits);
            },
            appendTimeZoneOffset: function (withSeparator) {
                this.parsers.push(function (obj) {

                });
                this.printers.push(function (obj) {
                    var res = obj.chrono['timeZone'].get(obj.date),
                        absRes = Math.abs(res),
                        h = padLeft(absRes / (60 * 60 * 1000), 2),
                        m = padLeft(absRes % (60 * 1000), 2);
                    return (res >= 0 ? '+' : '-') + h + (withSeparator ? ':' : '') + m;
                });
                return this;
            },
            appendTwoDigitYear: function (pivot, lenientParse) {
                return this.appendTwoDigitYearFormatter('year', pivot, lenientParse);
            },
            appendTwoDigitWeekyear: function (pivot, lenientParse) {
                return this.appendTwoDigitYearFormatter('weekyear', pivot, lenientParse);
            },
            appendLiteral: function (text) {
                this.parsers.push({});
                this.printers.push(function () {
                    return text;
                });
                return this;
            },

            toFormatter: function () {
                return exports.DateTimePrinter(this.printers);
            },

            toParser: function () {
                return exports.DateTimeParser(this.parsers);
            }
        },
        DateTimeFormatterBuilder = extend(function () {
            this.parsers = [];
            this.printers = [];
        }, proto);

    function addText(target, field, short) {
        target[accessor('append', field + (short ? 'Short' : '') + 'Text')] = function () {
            return this.appendTextFormatter(field, short);
        };
    }

    forEach(['secondOfMinute', 'minuteOfHour', 'hourOfDay', 'clockhourOfDay', 'hourOfHalfday', 'clockhourOfHalfday', 'dayOfMonth', 'dayOfWeek', 'dayOfYear', 'monthOfYear', 'weekOfWeekyear', 'weekyear', 'year', 'yearOfEra', 'centuryOfEra'], function (field) {
        proto[accessor('append', field)] = function (minDigits) {
            return this.appendNumberFormatter(field, minDigits);
        };
    });
    forEach([
        ['dayOfWeek', true],
        ['dayOfWeek', false],
        ['monthOfYear', true],
        ['monthOfYear', false],
        ['halfdayOfDay', false],
        ['timeZone', true],
        ['era', false]
    ], function (fieldAndLen) {
        addText(proto, fieldAndLen[0], fieldAndLen[1]);
    });

    return DateTimeFormatterBuilder;

}());