/*globals exports,localFactory*/
exports.LocalTime = (function (chrono) {
    var LocalTime = function (hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
            if (!(this instanceof LocalTime)) {
                return new LocalTime(hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond);
            }
            this.chrono = chrono;
            this.date = this.chrono.dateOfTime(new Date(0), hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond);
        },
        proto = LocalTime.prototype;

    proto.compareTo = function (other) {
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
    };

    proto.toDate = function () {
        return new Date(70, 0, 1, this.getHourOfDay(), this.getMinuteOfHour(), this.getSecondOfMinute(), this.getMillisOfSecond());
    };

    proto.fromDate = LocalTime.fromDate = function (date) {
        return LocalTime(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };
    proto.fromDateUTC = LocalTime.fromDateUTC = function (date) {
        return LocalTime(chrono.hourOfDay.get(date), chrono.minuteOfHour.get(date), chrono.secondOfMinute.get(date), chrono.millisOfSecond.get(date));
    };

    localFactory.addStatic(LocalTime);
    localFactory.addBasic(proto, 'LocalTime', 'HH:mm:ss.SSS');
    localFactory.addTime(proto);

    return LocalTime;
}(exports.DefaultChronology));