/*globals exports,localFactory*/
exports.LocalTime = (function () {
    var chrono = exports.ISOChronology,
        LocalTime = function (hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
            var self, date = new Date(0);

            date.setUTCHours(hourOfDay);
            date.setUTCMinutes(minuteOfHour);
            date.setUTCSeconds(secondOfMinute || 0);
            date.setUTCMilliseconds(millisOfSecond || 0);

            self = {
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
                }
            };

            localFactory.addCons(LocalTime);
            localFactory.addBasic(self, date, chrono);
            localFactory.addTime(self, date, chrono, LocalTime.fromMillisUTC);

            return self;
        };


    LocalTime.fromDate = function (date) {
        return LocalTime(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };
    LocalTime.fromDateUTC = function (date) {
        return LocalTime(chrono.hourOfDay.get(date), chrono.minuteOfHour.get(date), chrono.secondOfMinute.get(date), chrono.millisOfSecond.get(date));
    };

    return LocalTime;
}());