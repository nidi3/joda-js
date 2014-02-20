/*globals exports*/
exports.ISOChronology = (function () {
    var translations = exports.translations,
        SECOND_IN_MILLIS = 1000,
        MINUTE_IN_MILLIS = 60 * SECOND_IN_MILLIS,
        HOUR_IN_MILLIS = 60 * MINUTE_IN_MILLIS,
        DAY_IN_MILLIS = 24 * HOUR_IN_MILLIS,
        WEEK_IN_MILLIS = 7 * DAY_IN_MILLIS,
        MIN_DAYS_IN_FIRST_WEEK = 4,
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

    function getFirstWeekOfYearMillis(year) {
        var jan1 = startOfYear(year),
            jan1dayOfWeek = self.dayOfWeek.get(jan1);

        return jan1.getTime() + ((jan1dayOfWeek > (8 - MIN_DAYS_IN_FIRST_WEEK))
            ? (8 - jan1dayOfWeek) * DAY_IN_MILLIS
            : -(jan1dayOfWeek - 1) * DAY_IN_MILLIS);
    }

    function getWeeksInYear(year) {
        var firstWeekMillis1 = getFirstWeekOfYearMillis(year),
            firstWeekMillis2 = getFirstWeekOfYearMillis(year + 1);
        return Math.floor((firstWeekMillis2 - firstWeekMillis1) / WEEK_IN_MILLIS);
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
            getText: function (date, language, short) {
                return translations.get(language, 'month' + (short ? 'Short' : 'Long'))[self.monthOfYear.get(date) - 1];
            },
            set: function (date, month) {
                return withNormalizedDay(dateWithField(date, 'Month', month - 1), self.dayOfMonth.get(date));
            }
        },
        weekOfWeekyear: {
            get: function (date) {
                var year = self.year.get(date),
                    t = date.getTime(),
                    firstWeekMillis1 = getFirstWeekOfYearMillis(year),
                    firstWeekMillis2;
                if (t < firstWeekMillis1) {
                    return getWeeksInYear(year - 1);
                }
                firstWeekMillis2 = getFirstWeekOfYearMillis(year + 1);
                if (t >= firstWeekMillis2) {
                    return 1;
                }
                return Math.floor((t - firstWeekMillis1) / WEEK_IN_MILLIS) + 1;
            },
            set: function (date, weekOfWeekyear) {
                return new Date(date.getTime() + (weekOfWeekyear - this.get(date)) * WEEK_IN_MILLIS);
            }
        },
        weekyear: {
            get: function (date) {
                var d = date, week = self.weekOfWeekyear.get(date);
                if (week === 1) {
                    d = new Date(date.getTime() + WEEK_IN_MILLIS);
                } else if (week > 51) {
                    d = new Date(date.getTime() - 2 * WEEK_IN_MILLIS);
                }
                return self.year.get(d);
            },
            set: function (date, weekyear) {
                var thisWeekyear = this.get(date);
                if (thisWeekyear === weekyear) {
                    return date;
                }

                var thisDow = self.dayOfWeek.get(date),
                    weeksInFromYear = getWeeksInYear(thisWeekyear),
                    weeksInToYear = getWeeksInYear(weekyear),
                    maxOutWeeks = (weeksInToYear < weeksInFromYear) ? weeksInToYear : weeksInFromYear,
                    setToWeek = self.weekOfWeekyear.get(date);
                if (setToWeek > maxOutWeeks) {
                    setToWeek = maxOutWeeks;
                }

                var res = self.year.set(date, weekyear),
                    workWoyYear = this.get(res);
                if (workWoyYear < weekyear) {
                    res = new Date(res.getTime() + WEEK_IN_MILLIS);
                } else if (workWoyYear > weekyear) {
                    res = new Date(res.getTime() - WEEK_IN_MILLIS);
                }

                var currentWoyWeek = self.weekOfWeekyear.get(res);
                res = new Date(res.getTime() + (setToWeek - currentWoyWeek) * WEEK_IN_MILLIS);
                return self.dayOfWeek.set(res, thisDow);
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
            getText: function (date, language, short) {
                return translations.get(language, 'day' + (short ? 'Short' : 'Long'))[self.dayOfWeek.get(date) - 1];
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

        halfdayOfDay: {
            getText: function (date, language) {
                return translations.get(language, 'halfday')[self.hourOfDay.get(date) < 12 ? 0 : 1];
            }
        },

        clockhourOfDay: {
            get: function (date) {
                return self.hourOfDay.get(date) + 1;
            },
            set: function (date, clockhourOfDay) {
                return self.hourOfDay.set(date, clockhourOfDay - 1);
            }
        },
        hourOfHalfday: {
            get: function (date) {
                return self.hourOfDay.get(date) % 12;
            }
        },
        clockhourOfHalfday: {
            get: function (date) {
                var h = self.hourOfHalfday.get(date);
                return h === 0 ? 12 : h;
            }
        },

        timeZone: {
            get: function (date) {
                return date.getTimezoneOffset() * MINUTE_IN_MILLIS;
            },
            getText: function (date, language, short) {
                if (!short) {
                    return '';
                }
                var parse = /\((.+?)\)$/.exec(new Date().toString());
                return parse ? parse[1] : '';
            }
        },

        months: {
            add: function (date, months) {
                var d = new Date(date),
                    year = self.year.get(date),
                    month = self.monthOfYear.get(date) + months;
                if (month < 1 || month > 12) {
                    year += (month / 12);
                    month = (months < 0 ? 12 : 0) + month % 12;
                }
                d.setUTCFullYear(year);
                d.setUTCMonth(month - 1);
                return withNormalizedDay(d, self.dayOfMonth.get(date));
            }
        },
        weeks: {
            add: function (date, weeks) {
                return new Date(date.getTime() + weeks * WEEK_IN_MILLIS);
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
            },
            remainder: function (date) {
                return date % 1000;
            }
        }

    };

    return self;
}());