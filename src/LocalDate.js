/*globals exports,localFactory*/
exports.LocalDate = (function (chrono) {
    var LocalDate = function (year, monthOfYear, dayOfMonth) {
            if (!(this instanceof LocalDate)) {
                return new LocalDate(year, monthOfYear, dayOfMonth);
            }
            this.chrono = chrono;
            this.date = this.chrono.dateOfDate(year, monthOfYear, dayOfMonth);
        },
        proto = LocalDate.prototype;

    proto.compareTo = function (other) {
        var res = this.getYear() - other.getYear();
        if (res === 0) {
            res = this.getMonthOfYear() - other.getMonthOfYear();
        }
        if (res === 0) {
            res = this.getDayOfMonth() - other.getDayOfMonth();
        }
        return res;
    };

    proto.toDate = function () {
        return new Date(this.getYear(), this.getMonthOfYear() - 1, this.getDayOfMonth());
    };

    proto.fromDate = LocalDate.fromDate = function (date) {
        return LocalDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    };
    proto.fromDateUTC = LocalDate.fromDateUTC = function (date) {
        return LocalDate(chrono.year.get(date), chrono.monthOfYear.get(date), chrono.dayOfMonth.get(date));
    };

    localFactory.addStatic(LocalDate);
    localFactory.addBasic(proto,'LocalDate', 'yyyy-MM-dd');
    localFactory.addDate(proto);

    return LocalDate;
}(exports.DefaultChronology));