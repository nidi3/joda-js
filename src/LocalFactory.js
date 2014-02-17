/*globals exports*/
var localFactory = (function (DateTimeUtils) {
    return {
        addBasic: function (target, date, chrono) {
            target.getProperty = function (name) {
                return {date: date, field: chrono[name]};
            };
            target.isEqual = function (other) {
                return target.compareTo(other) === 0;
            };
            target.isBefore = function (other) {
                return target.compareTo(other) < 0;
            };
            target.isAfter = function (other) {
                return target.compareTo(other) > 0;
            };
        },
        addCons: function (target) {
            target.fromMillis = function (millis) {
                return target.fromDate(new Date(millis));
            };
            target.fromMillisUTC = function (millis) {
                return target.fromDateUTC(new Date(millis));
            };
            target.now = function () {
                return target.fromMillis(DateTimeUtils.currentTimeMillis());
            };
            target.nowUTC = function () {
                return target.fromMillisUTC(DateTimeUtils.currentTimeMillis());
            };
        },
        addDate: function (target, date, chrono, fromDate) {
            target.getDayOfMonth = function () {
                return chrono.dayOfMonth.get(date);
            };
            target.withDayOfMonth = function (dayOfMonth) {
                return fromDate(chrono.dayOfMonth.set(date, dayOfMonth));
            };

            target.getDayOfWeek = function () {
                return chrono.dayOfWeek.get(date);
            };
            target.withDayOfWeek = function (dayOfWeek) {
                return fromDate(chrono.dayOfWeek.set(date, dayOfWeek));
            };

            target.getDayOfYear = function () {
                return chrono.dayOfYear.get(date);
            };
            target.withDayOfYear = function (dayOfYear) {
                return fromDate(chrono.dayOfYear.set(date, dayOfYear));
            };

            target.getYear = function () {
                return chrono.year.get(date);
            };
            target.withYear = function (year) {
                return fromDate(chrono.year.set(date, year));
            };

            target.getMonthOfYear = function () {
                return chrono.monthOfYear.get(date);
            };
            target.withMonthOfYear = function (monthOfYear) {
                return fromDate(chrono.monthOfYear.set(date, monthOfYear));
            };

            target.plusDays = function (days) {
                return fromDate(chrono.days.add(date, days));
            };
            target.minusDays = function (days) {
                return fromDate(chrono.days.add(date, -days));
            };

            target.plusWeeks = function (weeks) {
                return fromDate(chrono.weeks.add(date, weeks));
            };
            target.minusWeeks = function (weeks) {
                return fromDate(chrono.weeks.add(date, -weeks));
            };

            target.plusMonths = function (months) {
                return fromDate(chrono.months.add(date, months));
            };
            target.minusMonths = function (months) {
                return fromDate(chrono.months.add(date, -months));
            };

            target.plusYears = function (years) {
                return fromDate(chrono.year.add(date, years));
            };
            target.minusYears = function (years) {
                return fromDate(chrono.year.add(date, -years));
            };
        },
        addTime: function (target, date, chrono, fromDate) {
            target.getMillisOfSecond = function () {
                return chrono.millisOfSecond.get(date);
            };
            target.withMillisOfSecond = function (millis) {
                return fromDate(chrono.millisOfSecond.set(date, millis));
            };

            target.getSecondOfMinute = function () {
                return chrono.secondOfMinute.get(date);
            };
            target.withSecondOfMinute = function (secondOfMinute) {
                return fromDate(chrono.secondOfMinute.set(date, secondOfMinute));
            };

            target.getMinuteOfHour = function () {
                return chrono.minuteOfHour.get(date);
            };
            target.withMinuteOfHour = function (minuteOfHour) {
                return fromDate(chrono.minuteOfHour.set(date, minuteOfHour));
            };

            target.getHourOfDay = function () {
                return chrono.hourOfDay.get(date);
            };
            target.withHourOfDay = function (hourOfDay) {
                return fromDate(chrono.hourOfDay.set(date, hourOfDay));
            };

            target.plusMillis = function (millis) {
                return fromDate(chrono.millis.add(date, millis));
            };
            target.minusMillis = function (millis) {
                return fromDate(chrono.millis.add(date, -millis));
            };

            target.plusSeconds = function (seconds) {
                return fromDate(chrono.seconds.add(date, seconds));
            };
            target.minusSeconds = function (seconds) {
                return fromDate(chrono.seconds.add(date, -seconds));
            };

            target.plusMinutes = function (minutes) {
                return fromDate(chrono.minutes.add(date, minutes));
            };
            target.minusMinutes = function (minutes) {
                return fromDate(chrono.minutes.add(date, -minutes));
            };

            target.plusHours = function (hours) {
                return fromDate(chrono.hours.add(date, hours));
            };
            target.minusHours = function (hours) {
                return fromDate(chrono.hours.add(date, -hours));
            };
        }
    };
}(exports.DateTimeUtils));

