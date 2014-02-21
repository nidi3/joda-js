/*globals exports,localFactory,extend*/
exports.LocalTime = (function (chrono) {
    var LocalTime = extend(function (hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
        this.chrono = chrono;
        this.date = this.chrono.dateOfTime(new Date(0), hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond);
    }, {
        toDate: function () {
            return new Date(70, 0, 1, this.getHourOfDay(), this.getMinuteOfHour(), this.getSecondOfMinute(), this.getMillisOfSecond());
        },
        fromDate: function (date) {
            return LocalTime(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        }
    });

    localFactory.addBasic(LocalTime, chrono, 'LocalTime', 'HH:mm:ss.SSS', ['hourOfDay', 'minuteOfHour', 'secondOfMinute', 'millisOfSecond']);
    localFactory.addTime(LocalTime);

    return LocalTime;
}(exports.DefaultChronology));