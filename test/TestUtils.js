/*global beforeEach,jasmine*/
var timeZone = new Date().getTimezoneOffset() * 60 * 1000,

    littleBefore = function (time) {
        return time - 10;
    },
    almostDayAfter = function (time) {
        return time + 24 * 60 * 60 * 1000 - 10;
    },
    goodDayAfter = function (time) {
        return time + 24 * 60 * 60 * 1000 + 10;
    };

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
        }
    });
});