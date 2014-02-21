/*globals exports,forEach,padLeft,padRight,cutRight,extend*/
exports.DateTimeFormatterBuilder = (function () {
    var proto = {
            numberFormatter: function (field, minPrinted, maxParsed) {
                this.parsers.push(function (obj) {

                });
                this.printers.push(function (obj) {
                    var res = obj.chrono[field].get(obj.date);
                    return padLeft(res, minPrinted);
                });
                return this;
            },
            fractionFormatter: function (field, minDigits, maxDigits) {
                this.parsers.push(function (obj) {

                });
                this.printers.push(function (obj) {
                    var res = obj.chrono[field].remainder(obj.date);
                    return padRight(cutRight(padLeft(res, 3), maxDigits), minDigits);
                });
                return this;
            },
            twoDigitYearFormatter: function (field, pivot, lenientParse) {
                this.parsers.push(function (obj) {

                });
                this.printers.push(function (obj) {
                    var year = obj.chrono[field].get(obj.date),
                        res = year < 0 ? -year : year;
                    return padLeft(res % 100, 2);
                });
                return this;
            },
            textFormatter: function (field, short) {
                this.parsers.push(function (obj) {

                });
                this.printers.push(function (obj, language) {
                    var res = obj.chrono[field].getText(obj.date, language, short);
                    return res;
                });
                return this;
            },
            millisOfSecond: function (minDigits) {
                return this.numberFormatter('millisOfSecond', minDigits, 3);
            },
            fractionOfSecond: function (minDigits, maxDigits) {
                return this.fractionFormatter('millis', minDigits, maxDigits);
            },
            timeZoneOffset: function (withSeparator) {
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
            twoDigitYear: function (pivot, lenientParse) {
                return this.twoDigitYearFormatter('year', pivot, lenientParse);
            },
            twoDigitWeekyear: function (pivot, lenientParse) {
                return this.twoDigitYearFormatter('weekyear', pivot, lenientParse);
            },
            literal: function (text) {
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
        target[field + (short ? 'Short' : '') + 'Text'] = function () {
            return this.textFormatter(field, short);
        };
    }

    forEach(['secondOfMinute', 'minuteOfHour', 'hourOfDay', 'clockhourOfDay', 'hourOfHalfday', 'clockhourOfHalfday', 'dayOfMonth', 'dayOfWeek', 'dayOfYear', 'monthOfYear', 'weekOfWeekyear', 'weekyear', 'year', 'yearOfEra', 'centuryOfEra'], function (field) {
        proto[field] = function (minDigits) {
            return this.numberFormatter(field, minDigits);
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