/*globals exports*/
exports.LocalDateTime = (function (LocalFactory) {
    var chrono = exports.ISOChronology,
        LocalDateTime = function (year, monthOfYear, dayOfMonth, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
            var self, date = new Date(0);

            date.setUTCFullYear(year);
            date.setUTCMonth(monthOfYear - 1);
            date.setUTCDate(dayOfMonth);
            date.setUTCHours(hourOfDay || 0);
            date.setUTCMinutes(minuteOfHour || 0);
            date.setUTCSeconds(secondOfMinute || 0);
            date.setUTCMilliseconds(millisOfSecond || 0);

            self = {
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
                }
            };

            LocalFactory.addCons(LocalDateTime);
            LocalFactory.addBasic(self, date, chrono);
            LocalFactory.addDate(self, date, chrono, LocalDateTime.fromMillisUTC);
            LocalFactory.addTime(self, date, chrono, LocalDateTime.fromMillisUTC);

            return self;
        };


    LocalDateTime.fromDate = function (date) {
        return LocalDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };
    LocalDateTime.fromDateUTC = function (date) {
        return LocalDateTime(chrono.year.get(date), chrono.monthOfYear.get(date), chrono.dayOfMonth.get(date), chrono.hourOfDay.get(date), chrono.minuteOfHour.get(date), chrono.secondOfMinute.get(date), chrono.millisOfSecond.get(date));
    };

    return LocalDateTime;
}(exports.LocalFactory));