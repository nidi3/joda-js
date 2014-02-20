/*globals exports*/
exports.DateTimePrinter = function (formatters, language, timeZoneOffset) {
    var DateTimePrinter = exports.DateTimePrinter,
        lang = language || 'en',
        offset = (timeZoneOffset !== undefined && timeZoneOffset !== null)
            ? new Date().getTimezoneOffset() * 60 * 1000 - timeZoneOffset
            : undefined;

    return {
        withLanguage: function (language) {
            return DateTimePrinter(formatters, language, offset);
        },
        withTimeZoneOffset: function (offset) {
            return DateTimePrinter(formatters, language, offset);
        },
        print: function (obj) {
            var i, res = '';
            if (offset !== undefined && obj.plusMillis) {
                obj = obj.plusMillis(offset);
            }
            for (i = 0; i < formatters.length; i += 1) {
                res += formatters[i](obj, lang);
            }
            return res;
        }
    };
};