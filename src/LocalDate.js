/*globals exports,localFactory*/
exports.LocalDate = (function () {
    var chrono = exports.ISOChronology,
        LocalDate = function (year, monthOfYear, dayOfMonth) {
            var self, date = new Date(0);

            date.setUTCFullYear(year);
            date.setUTCMonth(monthOfYear - 1);
            date.setUTCDate(dayOfMonth);

            self = {
                compareTo: function (other) {
                    var res = this.getYear() - other.getYear();
                    if (res === 0) {
                        res = this.getMonthOfYear() - other.getMonthOfYear();
                    }
                    if (res === 0) {
                        res = this.getDayOfMonth() - other.getDayOfMonth();
                    }
                    return res;
                },

                toDate: function () {
                    return new Date(this.getYear(), this.getMonthOfYear() - 1, this.getDayOfMonth());
                }
            };

            localFactory.addBasic(self, date, chrono);
            localFactory.addDate(self, date, chrono, LocalDate.fromDateUTC);
            return self;
        };

    localFactory.addCons(LocalDate);

    LocalDate.fromDate = function (date) {
        return LocalDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    };
    LocalDate.fromDateUTC = function (date) {
        return LocalDate(chrono.year.get(date), chrono.monthOfYear.get(date), chrono.dayOfMonth.get(date));
    };

    return LocalDate;
}());