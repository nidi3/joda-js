/*globals jodajs*/
jodajs.LocalDateTime = function (year, monthOfYear, dayOfMonth, hourOfDay, minuteOfHour, secondOfMinute, millisOfSecond) {
    var date = new Date(0),
        LocalDateTime = this.constructor,
        chrono = jodajs.ISOChronology;

    date.setUTCFullYear(year);
    date.setUTCMonth(monthOfYear - 1);
    date.setUTCDate(dayOfMonth);
    date.setUTCHours(hourOfDay || 0);
    date.setUTCMinutes(minuteOfHour || 0);
    date.setUTCSeconds(secondOfMinute || 0);
    date.setUTCMilliseconds(millisOfSecond || 0);

    function ofMillis(millis) {
        return LocalDateTime.fromMillisUTC(millis);
    }

    return {
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

        getMillisOfSecond: function () {
            return chrono.millisOfSecond.get(date);
        },
        withMillisOfSecond: function (millis) {
            return ofMillis(chrono.millisOfSecond.set(date, millis));
        },

        getSecondOfMinute: function () {
            return chrono.secondOfMinute.get(date);
        },
        withSecondOfMinute: function (secondOfMinute) {
            return ofMillis(chrono.secondOfMinute.set(date, secondOfMinute));
        },

        getMinuteOfHour: function () {
            return chrono.minuteOfHour.get(date);
        },
        withMinuteOfHour: function (minuteOfHour) {
            return ofMillis(chrono.minuteOfHour.set(date, minuteOfHour));
        },

        getHourOfDay: function () {
            return chrono.hourOfDay.get(date);
        },
        withHourOfDay: function (hourOfDay) {
            return ofMillis(chrono.hourOfDay.set(date, hourOfDay));
        },

        getDayOfMonth: function () {
            return chrono.dayOfMonth.get(date);
        },
        withDayOfMonth: function (dayOfMonth) {
            return ofMillis(chrono.dayOfMonth.set(date, dayOfMonth));
        },

        getDayOfWeek: function () {
            return chrono.dayOfWeek.get(date);
        },
        withDayOfWeek: function (dayOfWeek) {
            return ofMillis(chrono.dayOfWeek.set(date, dayOfWeek));
        },

        getDayOfYear: function () {
            return chrono.dayOfYear.get(date);
        },
        withDayOfYear: function (dayOfYear) {
            return ofMillis(chrono.dayOfYear.set(date, dayOfYear));
        },

        getYear: function () {
            return chrono.year.get(date);
        },
        withYear: function (year) {
            return ofMillis(chrono.year.set(date, year));
        },

        getMonthOfYear: function () {
            return chrono.monthOfYear.get(date);
        },
        withMonthOfYear: function (monthOfYear) {
            return ofMillis(chrono.monthOfYear.set(date, monthOfYear));
        },

        plusMillis: function (millis) {
            return ofMillis(chrono.millis.add(date, millis));
        },
        minusMillis: function (millis) {
            return ofMillis(chrono.millis.add(date, -millis));
        },

        plusSeconds: function (seconds) {
            return ofMillis(chrono.seconds.add(date, seconds));
        },
        minusSeconds: function (seconds) {
            return ofMillis(chrono.seconds.add(date, -seconds));
        },

        plusMinutes: function (minutes) {
            return ofMillis(chrono.minutes.add(date, minutes));
        },
        minusMinutes: function (minutes) {
            return ofMillis(chrono.minutes.add(date, -minutes));
        },

        plusHours: function (hours) {
            return ofMillis(chrono.hours.add(date, hours));
        },
        minusHours: function (hours) {
            return ofMillis(chrono.hours.add(date, -hours));
        },

        plusDays: function (days) {
            return ofMillis(chrono.days.add(date, days));
        },
        minusDays: function (days) {
            return ofMillis(chrono.days.add(date, -days));
        },

        plusWeeks: function (weeks) {
            return ofMillis(chrono.weeks.add(date, weeks));
        },
        minusWeeks: function (weeks) {
            return ofMillis(chrono.weeks.add(date, -weeks));
        },

        plusMonths: function (months) {
            return ofMillis(chrono.months.add(date, months));
        },
        minusMonths: function (months) {
            return ofMillis(chrono.months.add(date, -months));
        },

        plusYears: function (years) {
            return ofMillis(chrono.year.add(date, years));
        },
        minusYears: function (years) {
            return ofMillis(chrono.year.add(date, -years));
        },

        toDate: function () {
            return new Date(this.getYear(), this.getMonthOfYear() - 1, this.getDayOfMonth(), this.getHourOfDay(), this.getMinuteOfHour(), this.getSecondOfMinute(), this.getMillisOfSecond());
        }
    };
};

(function (LocalDateTime, DateTimeUtils) {
    var chrono = jodajs.ISOChronology;

    LocalDateTime.fromDate = function (date) {
        return new LocalDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };
    LocalDateTime.fromDateUTC = function (date) {
        return new LocalDateTime(chrono.year.get(date), chrono.monthOfYear.get(date), chrono.dayOfMonth.get(date), chrono.hourOfDay.get(date), chrono.minuteOfHour.get(date), chrono.secondOfMinute.get(date), chrono.millisOfSecond.get(date));
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