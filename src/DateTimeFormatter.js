/*globals exports*/
exports.DateTimeFormatter = function (formatters, language) {
    var DateTimeFormatter = exports.DateTimeFormatter,
        lang = language || 'en';

    return {
        withLanguage: function (language) {
            return DateTimeFormatter(formatters, language);
        },
        print: function (obj) {
            var i, res = '';
            for (i = 0; i < formatters.length; i += 1) {
                res += formatters[i](obj, lang);
            }
            return res;
        }
    };
};