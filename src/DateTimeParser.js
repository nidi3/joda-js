/*globals exports*/
exports.DateTimeParser = function (parsers, language, timeZoneOffset) {
    var DateTimeParser = exports.DateTimeParser,
        lang = language || 'en',
        offset = (timeZoneOffset !== undefined && timeZoneOffset !== null)
            ? new Date().getTimezoneOffset() * 60 * 1000 - timeZoneOffset
            : undefined;

    return {
        withLanguage: function (language) {
            return DateTimeParser(parsers, language, offset);
        },
        withTimeZoneOffset: function (offset) {
            return DateTimeParser(parsers, language, offset);
        },
        print: function (obj) {
            var i, res = '';
            if (offset !== undefined && obj.plusMillis) {
                obj = obj.plusMillis(offset);
            }
            for (i = 0; i < parsers.length; i += 1) {
                res += parsers[i](obj, lang);
            }
            return res;
        }
    };
};