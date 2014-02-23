/*globals exports*/
exports.DateTimeParser = (function () {
    var DateTimeParser = function (parsers, language, timeZoneOffset) {
        var lang = language || 'en',
            offset = (timeZoneOffset !== undefined && timeZoneOffset !== null)
                ? new Date().getTimezoneOffset() * 60 * 1000 - timeZoneOffset
                : undefined;

        return {
            withLanguage: function (language) {
                return DateTimeParser(parsers, language, offset);
            },
            withTimeZoneOffset: function (offset) {
                return DateTimeParser(parsers, language, offset);
            }

        };
    };
    return DateTimeParser;
}());