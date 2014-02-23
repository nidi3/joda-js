/*globals exports*/
exports.translations = (function () {
    var defaultLang,
        translations = {},
        self = {
            setDefault: function (language) {
                defaultLang = language;
            },
            register: function (language, texts) {
                translations[language] = texts;
                if (!defaultLang) {
                    defaultLang = language;
                }
            },
            get: function (language, key) {
                var texts = translations[language] || translations[defaultLang];
                return texts[key];
            }
        };

    return self;
}());