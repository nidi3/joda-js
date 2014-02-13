/*globals jodajs*/
jodajs.LocalDate = function (year, month, dayOfMonth) {
    var LocalDate = this.constructor,
        DAY_IN_MILLIS = (1000 * 60 * 60 * 24);

    function normalizedDay(year, month, day) {
        var d = new LocalDate(year, month, day);
        return (d.getDayOfMonth() < day) ? d.minusDays(d.getDayOfMonth()) : d;
    }

    function endOfLastYearMillis(year) {
        return new LocalDate(year - 1, 12, 31).getLocalMillis();
    }

    function deltaMonths(localDate, dMonths) {
        var year = localDate.getYear(), month = localDate.getMonthOfYear() + dMonths;
        if (month < 1 || month > 12) {
            year += (month / 12);
            month = dMonths < 0 ? (12 - month % 12) : (month % 12);
        }
        return normalizedDay(year, month, localDate.getDayOfMonth());
    }

    function init(year, month, dayOfMonth) {
        var date = new Date(0);
        date.setUTCFullYear(year);
        date.setUTCMonth(month - 1);
        date.setUTCDate(dayOfMonth);
        return date;
    }

    return {
        date: init(year, month, dayOfMonth),

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
            return this.date.getUTCDate();
        },

        withDayOfMonth: function (dayOfMonth) {
            return new LocalDate(this.getYear(), this.getMonthOfYear(), dayOfMonth);
        },

        getDayOfWeek: function () {
            var day = this.date.getUTCDay();
            return day === 0 ? 7 : day;
        },
        withDayOfWeek: function (dayOfWeek) {
            return this.plusDays(dayOfWeek - this.getDayOfWeek());
        },

        getDayOfYear: function () {
            return (this.getLocalMillis() - endOfLastYearMillis(this.getYear())) / DAY_IN_MILLIS;
        },
        withDayOfYear: function (dayOfYear) {
            return LocalDate.fromMillisUTC(endOfLastYearMillis(this.getYear()) + dayOfYear * DAY_IN_MILLIS);
        },

        getYear: function () {
            return this.date.getUTCFullYear();
        },
        withYear: function (year) {
            return normalizedDay(year, this.getMonthOfYear(), this.getDayOfMonth());
        },

        getMonthOfYear: function () {
            return this.date.getUTCMonth() + 1;
        },
        withMonthOfYear: function (monthOfYear) {
            return normalizedDay(this.getYear(), monthOfYear, this.getDayOfMonth());
        },

        getLocalMillis: function () {
            return this.date.getTime();
        },

        plusDays: function (days) {
            return LocalDate.fromMillisUTC(this.getLocalMillis() + days * DAY_IN_MILLIS);
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
            return normalizedDay(this.getYear() + years, this.getMonthOfYear(), this.getDayOfMonth());
        },
        minusYears: function (years) {
            return this.plusYears(-years);
        },

        toDate: function () {
            return new Date(this.getYear(), this.getMonthOfYear() - 1, this.getDayOfMonth());
        }
    };
};

(function (LocalDate, DateTimeUtils) {
    LocalDate.fromDate = function (date) {
        return new LocalDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    };
    LocalDate.fromDateUTC = function (date) {
        return new LocalDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
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