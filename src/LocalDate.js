/*globals exports,localFactory,extend*/
exports.LocalDate = (function (chrono) {
    var LocalDate = extend(function (year, monthOfYear, dayOfMonth) {
        this.chrono = chrono;
        this.date = this.chrono.dateOfDate(year, monthOfYear, dayOfMonth);
    }, {
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
        },

        fromDate: function (date) {
            return LocalDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        },
        fromDateUTC: function (date) {
            return LocalDate(chrono.year.get(date), chrono.monthOfYear.get(date), chrono.dayOfMonth.get(date));
        }
    });

    localFactory.addStatic(LocalDate);
    localFactory.addBasic(LocalDate, 'LocalDate', 'yyyy-MM-dd');
    localFactory.addDate(LocalDate);

    return LocalDate;
}(exports.DefaultChronology));