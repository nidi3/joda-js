/*globals exports,localFactory,extend*/
exports.LocalDateTime = (function (chrono) {
    var LocalDateTime = extend(function (year, monthOfYear, dayOfMonth, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
        this.chrono = chrono;
        this.date = this.chrono.dateOfTime(chrono.dateOfDate(year, monthOfYear, dayOfMonth), hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond);
    }, {
        compareTo: function (other) {
            var res = this.getYear() - other.getYear();
            if (res === 0) {
                res = this.getMonthOfYear() - other.getMonthOfYear();
            }
            if (res === 0) {
                res = this.getDayOfMonth() - other.getDayOfMonth();
            }
            if (res === 0) {
                res = this.getHourOfDay() - other.getHourOfDay();
            }
            if (res === 0) {
                res = this.getMinuteOfHour() - other.getMinuteOfHour();
            }
            if (res === 0) {
                res = this.getSecondOfMinute() - other.getSecondOfMinute();
            }
            if (res === 0) {
                res = this.getMillisOfSecond() - other.getMillisOfSecond();
            }
            return res;
        },
        toDate: function () {
            return new Date(this.getYear(), this.getMonthOfYear() - 1, this.getDayOfMonth(), this.getHourOfDay(), this.getMinuteOfHour(), this.getSecondOfMinute(), this.getMillisOfSecond());
        },
        fromDate: function (date) {
            return LocalDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        },
        fromDateUTC: function (date) {
            return LocalDateTime(chrono.year.get(date), chrono.monthOfYear.get(date), chrono.dayOfMonth.get(date), chrono.hourOfDay.get(date), chrono.minuteOfHour.get(date), chrono.secondOfMinute.get(date), chrono.millisOfSecond.get(date));
        }
    });

    localFactory.addStatic(LocalDateTime);
    localFactory.addBasic(LocalDateTime, 'LocalDateTime', "yyyy-MM-dd'T'HH:mm:ss.SSS");
    localFactory.addDate(LocalDateTime);
    localFactory.addTime(LocalDateTime);

    return LocalDateTime;
}(exports.DefaultChronology));