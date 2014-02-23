/*globals exports,localFactory,extend*/
exports.LocalDateTime = (function (chrono) {
    var LocalDateTime = extend(function (year, monthOfYear, dayOfMonth, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
        this.chrono = chrono;
        this.date = this.chrono.dateOfTime(chrono.dateOfDate(year, monthOfYear, dayOfMonth), hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond);
    }, {
        toDate: function () {
            return new Date(this.getYear(), this.getMonthOfYear() - 1, this.getDayOfMonth(), this.getHourOfDay(), this.getMinuteOfHour(), this.getSecondOfMinute(), this.getMillisOfSecond());
        },
        fromDate: function (date) {
            return LocalDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        }
    });

    localFactory.addBasic(LocalDateTime, chrono, 'LocalDateTime', "yyyy-MM-dd'T'HH:mm:ss.SSS", ['year', 'monthOfYear', 'dayOfMonth', 'hourOfDay', 'minuteOfHour', 'secondOfMinute', 'millisOfSecond']);
    localFactory.addDate(LocalDateTime);
    localFactory.addTime(LocalDateTime);

    return LocalDateTime;
}(exports.DefaultChronology));