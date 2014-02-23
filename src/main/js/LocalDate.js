/*globals exports,localFactory,extend*/
exports.LocalDate = (function (chrono) {
    var LocalDate = extend(function (year, monthOfYear, dayOfMonth) {
        this.chrono = chrono;
        this.date = this.chrono.dateOfDate(year, monthOfYear, dayOfMonth);
    }, {
        toDate: function () {
            return new Date(this.getYear(), this.getMonthOfYear() - 1, this.getDayOfMonth());
        },

        fromDate: function (date) {
            return LocalDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        }
    });

    localFactory.addBasic(LocalDate,chrono, 'LocalDate', 'yyyy-MM-dd', ['year', 'monthOfYear', 'dayOfMonth']);
    localFactory.addDate(LocalDate);

    return LocalDate;
}(exports.DefaultChronology));