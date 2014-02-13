/*global jasmine*/
var matchers = {
    toEq: function (expected) {
        if (typeof this.actual.isEqual !== 'function') {
            return false;//{pass: false, message: 'Expected ' + actual + ' to have an equals function'};
        }
        if (!this.actual.isEqual(expected)) {
            return false;//{pass: false, message: 'Expected that ' + actual + ' equals ' + expected};
        }
        return true;//{pass: true};
    }
};