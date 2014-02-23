/*global beforeEach,jasmine,jodajs*/
var timeZone = new Date().getTimezoneOffset() * 60 * 1000,

    littleBefore = function (time) {
        return time - 10;
    },
    almostDayAfter = function (time) {
        return time + 24 * 60 * 60 * 1000 - 10;
    },
    goodDayAfter = function (time) {
        return time + 24 * 60 * 60 * 1000 + 10;
    },

    stdDate = function (y, m, d, h, mi, s, ms) {
        return new Date(y, m, d, h, mi, s, ms);
    },

    DateTimeUtils = jodajs.DateTimeUtils,
    DateTimeFormatterBuilder = jodajs.DateTimeFormatterBuilder,
    DateTimeFormat = jodajs.DateTimeFormat,
    JsonFormatter = jodajs.JsonFormatter,
    LocalDateTime = jodajs.LocalDateTime,
    LocalTime = jodajs.LocalTime,
    LocalDate = jodajs.LocalDate;

beforeEach(function () {
    this.addMatchers({
        toEq: function (expected) {
            if (typeof this.actual.isEqual !== 'function') {
                this.message = function (expected) {
                    return this.actual + ' does not have an isEqual function';
                };
                return false;
            }
            if (!this.actual.isEqual(expected)) {
                this.message = function (expected) {
                    return this.actual.toDate().toUTCString() + ' is expected to be equal ' + expected.toDate().toUTCString();
                };
                return false;
            }
            return true;
        },
        toMatch: function (expected) {
            var regex = expected.test ? expected : new RegExp('^' + expected + '$');
            if (!this.actual.match(regex)) {
                return false;
            }
            return true;
        }
    });
});