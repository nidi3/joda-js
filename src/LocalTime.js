/*globals exports,localFactory,extend*/
exports.LocalTime = (function (chrono) {
    var LocalTime = extend(function (hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
        this.chrono = chrono;
        this.date = this.chrono.dateOfTime(new Date(0), hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond);
    }, {
        compareTo: function (other) {
            var res = this.getHourOfDay() - other.getHourOfDay();
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
            return new Date(70, 0, 1, this.getHourOfDay(), this.getMinuteOfHour(), this.getSecondOfMinute(), this.getMillisOfSecond());
        },
        fromDate: function (date) {
            return LocalTime(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        },
        fromDateUTC: function (date) {
            return LocalTime(chrono.hourOfDay.get(date), chrono.minuteOfHour.get(date), chrono.secondOfMinute.get(date), chrono.millisOfSecond.get(date));
        }
    });

    localFactory.addStatic(LocalTime);
    localFactory.addBasic(LocalTime, 'LocalTime', 'HH:mm:ss.SSS');
    localFactory.addTime(LocalTime);

    return LocalTime;
}(exports.DefaultChronology));