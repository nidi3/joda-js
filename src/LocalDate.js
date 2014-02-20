/*globals exports,localFactory*/
exports.LocalDate = (function () {
    var chrono = exports.DefaultChronology,
        LocalDate = function (year, monthOfYear, dayOfMonth) {
            var date = chrono.dateOfDate(year, monthOfYear, dayOfMonth),
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

            localFactory.addBasic(self, 'LocalDate', date, chrono, 'yyyy-MM-dd');
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