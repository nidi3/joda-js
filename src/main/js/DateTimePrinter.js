/*globals exports,extend*/
exports.DateTimePrinter = (function () {
    var DateTimePrinter = extend(function (formatters, language, timeZoneOffset) {
        this.formatters = formatters;
        this.language = language || 'en';
        this.offset = (timeZoneOffset !== undefined && timeZoneOffset !== null)
            ? new Date().getTimezoneOffset() * 60 * 1000 - timeZoneOffset
            : undefined;
    }, {
        withLanguage: function (language) {
            return DateTimePrinter(this.formatters, language, this.offset);
        },
        withTimeZoneOffset: function (offset) {
            return DateTimePrinter(this.formatters, this.language, offset);
        },
        print: function (obj) {
            var i, res = '';
            if (this.offset !== undefined && obj.plusMillis) {
                obj = obj.plusMillis(this.offset);
            }
            for (i = 0; i < this.formatters.length; i += 1) {
                res += this.formatters[i](obj, this.language);
            }
            return res;
        }
    });

    return DateTimePrinter;
}());