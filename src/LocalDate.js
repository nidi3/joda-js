/*globals jodajs*/
jodajs.LocalDate = function (year, monthOfYear, dayOfMonth) {
    var date = new Date(0),
        LocalDate = this.constructor,
        chrono = jodajs.ISOChronology;

    date.setUTCFullYear(year);
    date.setUTCMonth(monthOfYear - 1);
    date.setUTCDate(dayOfMonth);

    function ofMillis(millis) {
        return LocalDate.fromMillisUTC(millis);
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
            return res;
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
            return new Date(this.getYear(), this.getMonthOfYear() - 1, this.getDayOfMonth());
        }

    };
};

(function (LocalDate, DateTimeUtils) {
    var chrono = jodajs.ISOChronology;

    LocalDate.fromDate = function (date) {
        return new LocalDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    };
    LocalDate.fromDateUTC = function (date) {
        return new LocalDate(chrono.year.get(date), chrono.monthOfYear.get(date), chrono.dayOfMonth.get(date));
    };
    LocalDate.fromMillis = function (millis) {
        return LocalDate.fromDate(new Date(millis));
    };
    LocalDate.fromMillisUTC = function (millis) {
        return LocalDate.fromDateUTC(new Date(millis));
    };
    LocalDate.now = function () {
        return LocalDate.fromMillis(DateTimeUtils.currentTimeMillis());
    };
    LocalDate.nowUTC = function () {
        return LocalDate.fromMillisUTC(DateTimeUtils.currentTimeMillis());
    };
}(jodajs.LocalDate, jodajs.DateTimeUtils));