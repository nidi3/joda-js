/*globals jodajs*/
jodajs.ISOChronology = (function () {
    var SECOND_IN_MILLIS = 1000,
        MINUTE_IN_MILLIS = 1000 * 60,
        HOUR_IN_MILLIS = 1000 * 60 * 60,
        DAY_IN_MILLIS = 1000 * 60 * 60 * 24,
        self;

    function dateWithField(init, field, value) {
        var d = new Date(init);
        d['setUTC' + field](value);
        return d;
    }

    function startOfYear(year) {
        return dateWithField(0, 'FullYear', year);
    }

    function withNormalizedDay(date, day) {
        var dayOfMonth = self.dayOfMonth.get(date);
        return new Date(date.getTime() - ((dayOfMonth < day) ? DAY_IN_MILLIS * dayOfMonth : 0));
    }

    self = {
        year: {
            get: function (date) {
                return date.getUTCFullYear();
            },
            set: function (date, year) {
                return withNormalizedDay(dateWithField(date, 'FullYear', year), self.dayOfMonth.get(date));
            },
            add: function (date, years) {
                return this.set(date, this.get(date) + years);
            }
        },
        monthOfYear: {
            get: function (date) {
                return date.getUTCMonth() + 1;
            },
            set: function (date, month) {
                return withNormalizedDay(dateWithField(date, 'Month', month - 1), self.dayOfMonth.get(date));
            }
        },
        dayOfMonth: {
            get: function (date) {
                return date.getUTCDate();
            },
            set: function (date, dayOfMonth) {
                return dateWithField(date, 'Date', dayOfMonth);
            }
        },
        dayOfWeek: {
            get: function (date) {
                var day = date.getUTCDay();
                return day === 0 ? 7 : day;
            },
            set: function (date, dayOfWeek) {
                return new Date(date.getTime() + (dayOfWeek - this.get(date)) * DAY_IN_MILLIS);
            }
        },
        dayOfYear: {
            get: function (date) {
                return 1 + Math.floor((date.getTime() - startOfYear(self.year.get(date)).getTime()) / DAY_IN_MILLIS);
            },
            set: function (date, dayOfYear) {
                return new Date(self.dayOfMonth.set(self.monthOfYear.set(date, 1), 1).getTime() + (dayOfYear - 1) * DAY_IN_MILLIS);
            }
        },
        hourOfDay: {
            get: function (date) {
                return date.getUTCHours();
            },
            set: function (date, hourOfDay) {
                return dateWithField(date, 'Hours', hourOfDay);
            }
        },
        minuteOfHour: {
            get: function (date) {
                return date.getUTCMinutes();
            },
            set: function (date, minuteOfHour) {
                return dateWithField(date, 'Minutes', minuteOfHour);
            }
        },
        secondOfMinute: {
            get: function (date) {
                return date.getUTCSeconds();
            },
            set: function (date, secondOfMinute) {
                return dateWithField(date, 'Seconds', secondOfMinute);
            }
        },
        millisOfSecond: {
            get: function (date) {
                return date.getUTCMilliseconds();
            },
            set: function (date, millisOfSecond) {
                return dateWithField(date, 'Milliseconds', millisOfSecond);
            }
        },
        months: {
            add: function (date, months) {
                var d = new Date(date),
                    year = self.year.get(date),
                    month = self.monthOfYear.get(date) + months;
                if (month < 1 || month > 12) {
                    year += (month / 12);
                    month = months < 0 ? (12 - month % 12) : (month % 12);
                }
                d.setUTCFullYear(year);
                d.setUTCMonth(month - 1);
                return withNormalizedDay(d, self.dayOfMonth.get(date));
            }
        },
        weeks: {
            add: function (date, weeks) {
                return new Date(date.getTime() + weeks * 7 * DAY_IN_MILLIS);
            }
        },
        days: {
            add: function (date, days) {
                return new Date(date.getTime() + days * DAY_IN_MILLIS);
            }
        },
        hours: {
            add: function (date, hours) {
                return new Date(date.getTime() + hours * HOUR_IN_MILLIS);
            }
        },
        minutes: {
            add: function (date, minutes) {
                return new Date(date.getTime() + minutes * MINUTE_IN_MILLIS);
            }
        },
        seconds: {
            add: function (date, seconds) {
                return new Date(date.getTime() + seconds * SECOND_IN_MILLIS);
            }
        },
        millis: {
            add: function (date, millis) {
                return new Date(date.getTime() + millis);
            }
        }

    };

    return self;
}());