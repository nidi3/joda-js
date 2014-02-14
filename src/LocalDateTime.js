/*globals jodajs*/
jodajs.LocalDateTime = function (year, monthOfYear, dayOfMonth, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
    var LocalDateTime = this.constructor,
        SECOND_IN_MILLIS = 1000,
        MINUTE_IN_MILLIS = 1000 * 60,
        HOUR_IN_MILLIS = 1000 * 60 * 60,
        DAY_IN_MILLIS = 1000 * 60 * 60 * 24;

    function normalizedDay(ldt, day) {
        return (ldt.getDayOfMonth() < day) ? ldt.minusDays(ldt.getDayOfMonth()) : ldt;
    }

    function deltaMonths(ldt, dMonths) {
        var year = ldt.getYear(), month = ldt.getMonthOfYear() + dMonths;
        if (month < 1 || month > 12) {
            year += (month / 12);
            month = dMonths < 0 ? (12 - month % 12) : (month % 12);
        }
        return normalizedDay(ldt.withField(0, year).withField(1, month), ldt.getDayOfMonth());
    }


    function init() {
        var date = new Date(0);
        date.setUTCFullYear(year);
        date.setUTCMonth(monthOfYear - 1);
        date.setUTCDate(dayOfMonth);
        date.setUTCHours(hourOfDay || 0);
        date.setUTCMinutes(minuteOfHour || 0);
        date.setUTCSeconds(secondOfMinute || 0);
        date.setUTCMilliseconds(millisOfSecond || 0);
        return date;
    }

    return {
        date: init(),

        isEqual: function (other) {
            return this.compareTo(other) === 0;
        },
        isBefore: function (other) {
            return this.compareTo(other) < 0;
        },
        isAfter: function (other) {
            return this.compareTo(other) > 0;
        },
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

        withField: function (index, value) {
            var args = [this.getYear(), this.getMonthOfYear(), this.getDayOfMonth(), this.getHourOfDay(), this.getMinuteOfHour(), this.getSecondOfMinute(), this.getMillisOfSecond()];
            args[index] = value;
            return LocalDateTime.apply(LocalDateTime.prototype, args);
        },

        getMillisOfSecond: function () {
            return this.date.getUTCMilliseconds();
        },
        withMillisOfSecond: function (millis) {
            return this.withField(6, millis);
        },

        getSecondOfMinute: function () {
            return this.date.getUTCSeconds();
        },
        withSecondOfMinute: function (secondOfMinute) {
            return this.withField(5, secondOfMinute);
        },

        getMinuteOfHour: function () {
            return this.date.getUTCMinutes();
        },
        withMinuteOfHour: function (minuteOfHour) {
            return this.withField(4, minuteOfHour);
        },

        getHourOfDay: function () {
            return this.date.getUTCHours();
        },
        withHourOfDay: function (hourOfDay) {
            return this.withField(3, hourOfDay);
        },

        getDayOfMonth: function () {
            return this.date.getUTCDate();
        },
        withDayOfMonth: function (dayOfMonth) {
            return this.withField(2, dayOfMonth);
        },

        getDayOfWeek: function () {
            var day = this.date.getUTCDay();
            return day === 0 ? 7 : day;
        },
        withDayOfWeek: function (dayOfWeek) {
            return this.plusDays(dayOfWeek - this.getDayOfWeek());
        },

        getDayOfYear: function () {
            return 1 + (this.getLocalMillis() - new LocalDateTime(this.getYear(), 1, 1).getLocalMillis()) / DAY_IN_MILLIS;
        },
        withDayOfYear: function (dayOfYear) {
            return LocalDateTime.fromMillisUTC(this.withMonthOfYear(1).withDayOfMonth(1).getLocalMillis() + (dayOfYear - 1) * DAY_IN_MILLIS);
        },

        getYear: function () {
            return this.date.getUTCFullYear();
        },
        withYear: function (year) {
            return normalizedDay(this.withField(0, year), this.getDayOfMonth());
        },

        getMonthOfYear: function () {
            return this.date.getUTCMonth() + 1;
        },
        withMonthOfYear: function (monthOfYear) {
            return normalizedDay(this.withField(1, monthOfYear), this.getDayOfMonth());
        },

        getLocalMillis: function () {
            return this.date.getTime();
        },

        plusMillis: function (millis) {
            return LocalDateTime.fromMillisUTC(this.getLocalMillis() + millis);
        },
        minusMillis: function (millis) {
            return this.plusMillis(-millis);
        },

        plusSeconds: function (seconds) {
            return this.plusMillis(seconds * SECOND_IN_MILLIS);
        },
        minusSeconds: function (seconds) {
            return this.plusSeconds(-seconds);
        },

        plusMinutes: function (minutes) {
            return this.plusMillis(minutes * MINUTE_IN_MILLIS);
        },
        minusMinutes: function (minutes) {
            return this.plusMinutes(-minutes);
        },

        plusHours: function (hours) {
            return this.plusMillis(hours * HOUR_IN_MILLIS);
        },
        minusHours: function (hours) {
            return this.plusHours(-hours);
        },

        plusDays: function (days) {
            return this.plusMillis(days * DAY_IN_MILLIS);
        },
        minusDays: function (days) {
            return this.plusDays(-days);
        },

        plusWeeks: function (weeks) {
            return this.plusDays(7 * weeks);
        },
        minusWeeks: function (weeks) {
            return this.minusDays(7 * weeks);
        },

        plusMonths: function (months) {
            return deltaMonths(this, months);
        },
        minusMonths: function (months) {
            return deltaMonths(this, -months);
        },

        plusYears: function (years) {
            return normalizedDay(this.withField(0, this.getYear() + years), this.getDayOfMonth());
        },
        minusYears: function (years) {
            return this.plusYears(-years);
        },

        toDate: function () {
            return new Date(this.getYear(), this.getMonthOfYear() - 1, this.getDayOfMonth(), this.getHourOfDay(), this.getMinuteOfHour(), this.getSecondOfMinute(), this.getMillisOfSecond());
        }
    };
};

(function (LocalDateTime, DateTimeUtils) {
    LocalDateTime.fromDate = function (date) {
        return new LocalDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };
    LocalDateTime.fromDateUTC = function (date) {
        return new LocalDateTime(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
    };
    LocalDateTime.fromMillis = function (millis) {
        return LocalDateTime.fromDate(new Date(millis));
    };
    LocalDateTime.fromMillisUTC = function (millis) {
        return LocalDateTime.fromDateUTC(new Date(millis));
    };
    LocalDateTime.now = function () {
        return LocalDateTime.fromMillis(DateTimeUtils.currentTimeMillis());
    };
    LocalDateTime.nowUTC = function () {
        return LocalDateTime.fromMillisUTC(DateTimeUtils.currentTimeMillis());
    };
}(jodajs.LocalDateTime, jodajs.DateTimeUtils));