/*globals jodajs*/
jodajs.LocalDate = function (year, month, dayOfMonth) {
    var DAY_IN_MILLIS = (1000 * 60 * 60 * 24);

    function normalizedDay(year, month, day) {
        var d = new jodajs.LocalDate(year, month, day);
        return (d.getDayOfMonth() < day) ? d.minusDays(d.getDayOfMonth()) : d;
    }

    function endOfLastYearMillis(year) {
        return new jodajs.LocalDate(year - 1, 12, 31).getLocalMillis();
    }

    this.date = new Date();
    this.date.setUTCFullYear(year);
    this.date.setUTCMonth(month - 1);
    this.date.setUTCDate(dayOfMonth);
    this.date.setUTCHours(0);
    this.date.setUTCMinutes(0);
    this.date.setUTCSeconds(0);
    this.date.setUTCMilliseconds(0);

    this.isEqual = function (other) {
        return this.compareTo(other) === 0;
    };
    this.isBefore = function (other) {
        return this.compareTo(other) < 0;
    };
    this.isAfter = function (other) {
        return this.compareTo(other) > 0;
    };
    this.compareTo = function (other) {
        var res = this.getYear() - other.getYear();
        if (res === 0) {
            res = this.getMonthOfYear() - other.getMonthOfYear();
        }
        if (res === 0) {
            res = this.getDayOfMonth() - other.getDayOfMonth();
        }
        return res;
    };

    this.getDayOfMonth = function () {
        return this.date.getUTCDate();
    };

    this.withDayOfMonth = function (dayOfMonth) {
        return new jodajs.LocalDate(this.getYear(), this.getMonthOfYear(), dayOfMonth);
    };

    this.getDayOfWeek = function () {
        var day = this.date.getUTCDay();
        return day === 0 ? 7 : day;
    };
    this.withDayOfWeek = function (dayOfWeek) {
        return this.plusDays(dayOfWeek - this.getDayOfWeek());
    };

    this.getDayOfYear = function () {
        return (this.getLocalMillis() - endOfLastYearMillis(this.getYear())) / DAY_IN_MILLIS;
    };
    this.withDayOfYear = function (dayOfYear) {
        return jodajs.LocalDate.fromMillis(endOfLastYearMillis(this.getYear()) + dayOfYear * DAY_IN_MILLIS);
    };

    this.getYear = function () {
        return this.date.getUTCFullYear();
    };
    this.withYear = function (year) {
        return normalizedDay(year, this.getMonthOfYear(), this.getDayOfMonth());
    };

    this.getMonthOfYear = function () {
        return this.date.getUTCMonth() + 1;
    };
    this.withMonthOfYear = function (monthOfYear) {
        return normalizedDay(this.getYear(), monthOfYear, this.getDayOfMonth());
    };

    this.getLocalMillis = function () {
        return this.date.getTime();
    };

    this.plusDays = function (days) {
        return jodajs.LocalDate.fromMillis(this.getLocalMillis() + days * DAY_IN_MILLIS);
    };
    this.minusDays = function (days) {
        return this.plusDays(-days);
    };

    this.plusWeeks = function (weeks) {
        return this.plusDays(7 * weeks);
    };
    this.minusWeeks = function (weeks) {
        return this.minusDays(7 * weeks);
    };

    this.plusMonths = function (months) {
        var year = this.getYear(), month, monthOver = this.getMonthOfYear() + months;
        if (monthOver <= 12) {
            month = monthOver;
        } else {
            year += (monthOver / 12);
            month = monthOver % 12;
        }
        return normalizedDay(year, month, this.getDayOfMonth());
    };
    this.minusMonths = function (months) {
        var year = this.getYear(), month, monthOver = this.getMonthOfYear() - months;
        if (monthOver >= 1) {
            month = monthOver;
        } else {
            year += (monthOver / 12);
            month = 12 - monthOver % 12;
        }
        return normalizedDay(year, month, this.getDayOfMonth());
    };

    this.plusYears = function (years) {
        return normalizedDay(this.getYear() + years, this.getMonthOfYear(), this.getDayOfMonth());
    };
    this.minusYears = function (years) {
        return this.plusYears(-years);
    };

    this.toDate = function () {
        return new Date(this.getYear(), this.getMonthOfYear() - 1, this.getDayOfMonth());
    };
};

jodajs.LocalDate.fromDate = function (date) {
    return new jodajs.LocalDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
};
jodajs.LocalDate.fromDateUTC = function (date) {
    return new jodajs.LocalDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
};
jodajs.LocalDate.fromMillis = function (millis) {
    return jodajs.LocalDate.fromDate(new Date(millis));
};
jodajs.LocalDate.fromMillisUTC = function (millis) {
    return jodajs.LocalDate.fromDateUTC(new Date(millis));
};
jodajs.LocalDate.now = function () {
    return jodajs.LocalDate.fromMillis(jodajs.DateTimeUtils.currentTimeMillis());
};
jodajs.LocalDate.nowUTC = function () {
    return jodajs.LocalDate.fromMillisUTC(jodajs.DateTimeUtils.currentTimeMillis());
};
