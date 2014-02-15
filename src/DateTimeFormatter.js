/*globals jodajs*/
jodajs.DateTimeFormatter = function (formatters) {
    return {
        print: function (obj) {
            if (typeof obj === 'number') {
                obj = jodajs.LocalDateTime.fromMillis(obj);
            }
            var i, res = '';
            for (i = 0; i < formatters.length; i += 1) {
                res += formatters[i](obj);
            }
            return res;
        }
    };
};