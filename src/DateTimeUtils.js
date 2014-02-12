stni.jodajs.DateTimeUtils = function () {
    var systemMillisProvider = {
            getMillis: function () {
                return new Date().getTime();
            }
        },
        offsetMillisProvider = function (offset) {
            return {
                getMillis: function () {
                    return systemMillisProvider.getMillis() + offset;
                }
            };
        },
        fixedMillisProvider = function (millis) {
            return {
                getMillis: function () {
                    return millis;
                }
            };
        },
        cMillisProvider = systemMillisProvider;

    return {
        currentTimeMillis: function () {
            return cMillisProvider.getMillis();
        },
        setCurrentMillisSystem: function () {
            cMillisProvider = systemMillisProvider;
        },
        setCurrentMillisOffset: function (offset) {
            cMillisProvider = offsetMillisProvider(offset);
        },
        setCurrentMillisFixed: function (fixed) {
            cMillisProvider = fixedMillisProvider(fixed);
        },
        setCurrentMillsProvider: function (provider) {
            cMillisProvider = provider;
        }
    };
}();