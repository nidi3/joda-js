/*global matchers,jodajs,beforeEach,describe,it,expect*/
describe('LocalDateTime', function () {
    var LocalDateTime = jodajs.LocalDateTime,
        DateTimeUtils = jodajs.DateTimeUtils,
        zone = new Date().getTimezoneOffset() * 60 * 1000,
        t2014_2_3 = new Date(2014, 1, 3, 5, 6, 7, 100).getTime(),
        littleBefore = function (time) {
            return time - 10;
        },
        almostDayAfter = function (time) {
            return time + 24 * 60 * 60 * 1000 - 10;
        },
        dayAfter = function (time) {
            return time + 24 * 60 * 60 * 1000 + 10;
        };

    beforeEach(function () {
        this.addMatchers(matchers);
    });

    describe('init', function () {
        it('should construct a LocalDateTime with given fields', function () {
            var d = new LocalDateTime(2014, 2, 3, 4, 5, 6, 7);
            expect(d.getYear()).toBe(2014);
            expect(d.getMonthOfYear()).toBe(2);
            expect(d.getDayOfMonth()).toBe(3);
            expect(d.getHourOfDay()).toBe(4);
            expect(d.getMinuteOfHour()).toBe(5);
            expect(d.getSecondOfMinute()).toBe(6);
            expect(d.getMillisOfSecond()).toBe(7);
        });
        it('should construct a LocalDateTime with given fields, not given time fields should be 0', function () {
            expect(new LocalDateTime(2014, 2, 3, 4, 5, 6).getMillisOfSecond()).toBe(0);
            expect(new LocalDateTime(2014, 2, 3, 4, 5).getSecondOfMinute()).toBe(0);
            expect(new LocalDateTime(2014, 2, 3, 4).getMinuteOfHour()).toBe(0);
            expect(new LocalDateTime(2014, 2, 3).getHourOfDay()).toBe(0);
        });
    });

    describe('fromDate', function () {
        it('should construct a LocalDateTime from the given Date in the current timezone', function () {
            expect(LocalDateTime.fromDate(new Date(littleBefore(t2014_2_3)))).toEq(new LocalDateTime(2014, 2, 3, 5, 6, 7, 90));
            expect(LocalDateTime.fromDate(new Date(t2014_2_3))).toEq(new LocalDateTime(2014, 2, 3, 5, 6, 7, 100));
            expect(LocalDateTime.fromDate(new Date(almostDayAfter(t2014_2_3)))).toEq(new LocalDateTime(2014, 2, 4, 5, 6, 7, 90));
            expect(LocalDateTime.fromDate(new Date(dayAfter(t2014_2_3)))).toEq(new LocalDateTime(2014, 2, 4, 5, 6, 7, 110));
        });
    });

    describe('fromDateUTC', function () {
        it('should construct a LocalDateTime from the given Date in UTC', function () {
            expect(LocalDateTime.fromDateUTC(new Date(littleBefore(t2014_2_3) - zone))).toEq(new LocalDateTime(2014, 2, 3, 5, 6, 7, 90));
            expect(LocalDateTime.fromDateUTC(new Date(t2014_2_3 - zone))).toEq(new LocalDateTime(2014, 2, 3, 5, 6, 7, 100));
            expect(LocalDateTime.fromDateUTC(new Date(almostDayAfter(t2014_2_3) - zone))).toEq(new LocalDateTime(2014, 2, 4, 5, 6, 7, 90));
            expect(LocalDateTime.fromDateUTC(new Date(dayAfter(t2014_2_3) - zone))).toEq(new LocalDateTime(2014, 2, 4, 5, 6, 7, 110));

        });
    });

    describe('fromMillis', function () {
        it('should construct a LocalDateTime from the given millis in the current timezone', function () {
            expect(LocalDateTime.fromMillis(littleBefore(t2014_2_3))).toEq(new LocalDateTime(2014, 2, 3, 5, 6, 7, 90));
            expect(LocalDateTime.fromMillis(t2014_2_3)).toEq(new LocalDateTime(2014, 2, 3, 5, 6, 7, 100));
            expect(LocalDateTime.fromMillis(almostDayAfter(t2014_2_3))).toEq(new LocalDateTime(2014, 2, 4, 5, 6, 7, 90));
            expect(LocalDateTime.fromMillis(dayAfter(t2014_2_3))).toEq(new LocalDateTime(2014, 2, 4, 5, 6, 7, 110));
        });
    });

    describe('fromMillisUTC', function () {
        it('should construct a LocalDateTime from the given millis in UTC', function () {
            expect(LocalDateTime.fromMillisUTC(littleBefore(t2014_2_3) - zone)).toEq(new LocalDateTime(2014, 2, 3, 5, 6, 7, 90));
            expect(LocalDateTime.fromMillisUTC(t2014_2_3 - zone)).toEq(new LocalDateTime(2014, 2, 3, 5, 6, 7, 100));
            expect(LocalDateTime.fromMillisUTC(almostDayAfter(t2014_2_3) - zone)).toEq(new LocalDateTime(2014, 2, 4, 5, 6, 7, 90));
            expect(LocalDateTime.fromMillisUTC(dayAfter(t2014_2_3) - zone)).toEq(new LocalDateTime(2014, 2, 4, 5, 6, 7, 110));

        });
    });

    describe('now', function () {
        it('should construct a LocalDateTime from now in the current timezone', function () {
            DateTimeUtils.setCurrentMillisFixed(littleBefore(t2014_2_3));
            expect(LocalDateTime.now()).toEq(new LocalDateTime(2014, 2, 3, 5, 6, 7, 90));

            DateTimeUtils.setCurrentMillisFixed(t2014_2_3);
            expect(LocalDateTime.now()).toEq(new LocalDateTime(2014, 2, 3, 5, 6, 7, 100));

            DateTimeUtils.setCurrentMillisFixed(almostDayAfter(t2014_2_3));
            expect(LocalDateTime.now()).toEq(new LocalDateTime(2014, 2, 4, 5, 6, 7, 90));

            DateTimeUtils.setCurrentMillisFixed(dayAfter(t2014_2_3));
            expect(LocalDateTime.now()).toEq(new LocalDateTime(2014, 2, 4, 5, 6, 7, 110));
        });
    });

    describe('nowUTC', function () {
        it('should construct a LocalDateTime from now in UTC', function () {
            DateTimeUtils.setCurrentMillisFixed(littleBefore(t2014_2_3) - zone);
            expect(LocalDateTime.nowUTC()).toEq(new LocalDateTime(2014, 2, 3, 5, 6, 7, 90));

            DateTimeUtils.setCurrentMillisFixed(t2014_2_3 - zone);
            expect(LocalDateTime.nowUTC()).toEq(new LocalDateTime(2014, 2, 3, 5, 6, 7, 100));

            DateTimeUtils.setCurrentMillisFixed(almostDayAfter(t2014_2_3) - zone);
            expect(LocalDateTime.nowUTC()).toEq(new LocalDateTime(2014, 2, 4, 5, 6, 7, 90));

            DateTimeUtils.setCurrentMillisFixed(dayAfter(t2014_2_3) - zone);
            expect(LocalDateTime.nowUTC()).toEq(new LocalDateTime(2014, 2, 4, 5, 6, 7, 110));
        });
    });

    describe('isEqual', function () {
        it('should return true if all fields are equal', function () {
            var ldt = new LocalDateTime(2014, 2, 3, 4, 5, 6, 7);
            expect(ldt.isEqual(new LocalDateTime(2014, 2, 3, 4, 5, 6, 7))).toBeTruthy();
            expect(ldt.isEqual(new LocalDateTime(2014, 2, 3, 4, 5, 6, 8))).toBeFalsy();
            expect(ldt.isEqual(new LocalDateTime(2014, 3, 3, 4, 5, 7, 7))).toBeFalsy();
            expect(ldt.isEqual(new LocalDateTime(2014, 2, 3, 4, 6, 6, 7))).toBeFalsy();
            expect(ldt.isEqual(new LocalDateTime(2014, 2, 3, 5, 5, 6, 7))).toBeFalsy();
            expect(ldt.isEqual(new LocalDateTime(2014, 2, 4, 4, 5, 6, 7))).toBeFalsy();
            expect(ldt.isEqual(new LocalDateTime(2014, 3, 3, 4, 5, 6, 7))).toBeFalsy();
            expect(ldt.isEqual(new LocalDateTime(2015, 2, 3, 4, 5, 6, 7))).toBeFalsy();
        });
    });

    describe('isBefore', function () {
        it('should return true if a LocalDateTime is before another', function () {
            var ldt = new LocalDateTime(2014, 2, 3, 4, 5, 6, 7);
            expect(ldt.isBefore(new LocalDateTime(2014, 2, 3, 4, 5, 6, 8))).toBeTruthy();
            expect(ldt.isBefore(new LocalDateTime(2014, 2, 3, 4, 5, 6, 7))).toBeFalsy();
            expect(ldt.isBefore(new LocalDateTime(2014, 2, 3, 4, 5, 5, 7))).toBeFalsy();
            expect(ldt.isBefore(new LocalDateTime(2014, 2, 3, 4, 4, 6, 7))).toBeFalsy();
            expect(ldt.isBefore(new LocalDateTime(2014, 2, 3, 3, 5, 6, 7))).toBeFalsy();
            expect(ldt.isBefore(new LocalDateTime(2014, 2, 2, 4, 5, 6, 7))).toBeFalsy();
            expect(ldt.isBefore(new LocalDateTime(2014, 1, 3, 4, 5, 6, 7))).toBeFalsy();
            expect(ldt.isBefore(new LocalDateTime(2013, 2, 3, 4, 5, 6, 7))).toBeFalsy();
        });
    });

    describe('isAfter', function () {
        it('should return true if a LocalDateTime is after another', function () {
            var ldt = new LocalDateTime(2014, 2, 3, 4, 5, 6, 7);
            expect(ldt.isAfter(new LocalDateTime(2014, 2, 3, 4, 5, 6, 6))).toBeTruthy();
            expect(ldt.isAfter(new LocalDateTime(2014, 2, 3, 4, 5, 6, 7))).toBeFalsy();
            expect(ldt.isAfter(new LocalDateTime(2014, 2, 3, 4, 5, 7, 7))).toBeFalsy();
            expect(ldt.isAfter(new LocalDateTime(2014, 2, 3, 4, 6, 6, 7))).toBeFalsy();
            expect(ldt.isAfter(new LocalDateTime(2014, 2, 3, 5, 5, 6, 7))).toBeFalsy();
            expect(ldt.isAfter(new LocalDateTime(2014, 2, 4, 4, 5, 6, 7))).toBeFalsy();
            expect(ldt.isAfter(new LocalDateTime(2014, 3, 3, 4, 5, 6, 7))).toBeFalsy();
            expect(ldt.isAfter(new LocalDateTime(2015, 2, 3, 4, 5, 6, 7))).toBeFalsy();
        });
    });

    describe('getMillisOfSecond', function () {
        it('should return millis of second', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).getMillisOfSecond()).toBe(6);
        });
    });
    describe('withMillisOfSecond', function () {
        it('should return a new LocalDateTime with given millis of second', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).withMillisOfSecond(100)).toEq(new LocalDateTime(2000, 1, 2, 3, 4, 5, 100));
        });
    });

    describe('getSecondOfMinute', function () {
        it('should return second of minute', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).getSecondOfMinute()).toBe(5);
        });
    });
    describe('withSecondOfMinute', function () {
        it('should return a new LocalDateTime with given second of minute', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).withSecondOfMinute(10)).toEq(new LocalDateTime(2000, 1, 2, 3, 4, 10, 6));
        });
    });

    describe('getMinuteOfHour', function () {
        it('should return minute of hour', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).getMinuteOfHour()).toBe(4);
        });
    });
    describe('withMinuteOfHour', function () {
        it('should return a new LocalDateTime with given minute of hour', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).withMinuteOfHour(10)).toEq(new LocalDateTime(2000, 1, 2, 3, 10, 5, 6));
        });
    });

    describe('getHourOfDay', function () {
        it('should return hour of day', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).getHourOfDay()).toBe(3);
        });
    });
    describe('withHourOfDay', function () {
        it('should return a new LocalDateTime with given hour of day', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).withHourOfDay(10)).toEq(new LocalDateTime(2000, 1, 2, 10, 4, 5, 6));
        });
    });

    describe('getDayOfMonth', function () {
        it('should return day of month', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).getDayOfMonth()).toBe(2);
        });
    });

    describe('withDayOfMonth', function () {
        it('should return a new LocalDateTime with the given day of month', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).withDayOfMonth(3)).toEq(new LocalDateTime(2000, 1, 3, 3, 4, 5, 6));
        });
    });

    describe('getDayOfWeek', function () {
        it('should return day of week (1=monday,...,7=sunday)', function () {
            expect(new LocalDateTime(2014, 2, 10, 3, 4, 5, 6).getDayOfWeek()).toBe(1);
            expect(new LocalDateTime(2014, 2, 11, 3, 4, 5).getDayOfWeek()).toBe(2);
            expect(new LocalDateTime(2014, 2, 12, 3, 4).getDayOfWeek()).toBe(3);
            expect(new LocalDateTime(2014, 2, 13, 3).getDayOfWeek()).toBe(4);
            expect(new LocalDateTime(2014, 2, 14).getDayOfWeek()).toBe(5);
            expect(new LocalDateTime(2014, 2, 15).getDayOfWeek()).toBe(6);
            expect(new LocalDateTime(2014, 2, 16).getDayOfWeek()).toBe(7);
            expect(new LocalDateTime(2014, 2, 17).getDayOfWeek()).toBe(1);
        });
    });

    describe('withDayOfWeek', function () {
        it('should return a new LocalDateTime with the given day of week', function () {
            expect(new LocalDateTime(2014, 2, 13, 3, 4, 5, 6).withDayOfWeek(1)).toEq(new LocalDateTime(2014, 2, 10, 3, 4, 5, 6));
            expect(new LocalDateTime(2014, 2, 13).withDayOfWeek(7)).toEq(new LocalDateTime(2014, 2, 16, 0, 0, 0, 0));
        });
    });


    describe('getDayOfYear', function () {
        it('should return day of year', function () {
            expect(new LocalDateTime(2014, 1, 1, 3, 4, 5, 6).getDayOfYear()).toBe(1);
            expect(new LocalDateTime(2014, 2, 1).getDayOfYear()).toBe(32);
            expect(new LocalDateTime(2014, 2, 28).getDayOfYear()).toBe(59);
            expect(new LocalDateTime(2014, 3, 1).getDayOfYear()).toBe(60);
            expect(new LocalDateTime(2014, 12, 31).getDayOfYear()).toBe(365);
            expect(new LocalDateTime(2016, 12, 31).getDayOfYear()).toBe(366);
        });
    });

    describe('withDayOfYear', function () {
        it('should return a new LocalDateTime with the given day of year', function () {
            expect(new LocalDateTime(2001, 5, 16, 3, 4, 5, 6).withDayOfYear(2)).toEq(new LocalDateTime(2001, 1, 2, 3, 4, 5, 6));
            expect(new LocalDateTime(2001, 10, 7).withDayOfYear(364)).toEq(new LocalDateTime(2001, 12, 30));
        });
    });


    describe('getMonthOfYear', function () {
        it('should return month of year', function () {
            expect(new LocalDateTime(2014, 1, 1, 3, 4, 5, 6).getMonthOfYear()).toBe(1);
            expect(new LocalDateTime(2014, 12, 31).getMonthOfYear()).toBe(12);
        });
    });

    describe('withMonthOfYear', function () {
        it('should return a new LocalDateTime with the given month of year', function () {
            expect(new LocalDateTime(2001, 6, 16, 3, 4, 5, 6).withMonthOfYear(2)).toEq(new LocalDateTime(2001, 2, 16, 3, 4, 5, 6));
            expect(new LocalDateTime(2001, 1, 31).withMonthOfYear(2)).toEq(new LocalDateTime(2001, 2, 28));
        });
    });

    describe('getYear', function () {
        it('should return year', function () {
            expect(new LocalDateTime(2014, 1, 1, 3, 4, 5, 6).getYear()).toBe(2014);
            expect(new LocalDateTime(2014, 12, 31).getYear()).toBe(2014);
        });
    });

    describe('withYear', function () {
        it('should return a new LocalDateTime with the given year', function () {
            expect(new LocalDateTime(2004, 2, 29, 3, 4, 5, 6).withYear(2008)).toEq(new LocalDateTime(2008, 2, 29, 3, 4, 5, 6));
            expect(new LocalDateTime(2004, 2, 29).withYear(2005)).toEq(new LocalDateTime(2005, 2, 28));
        });
    });

    describe('plusMillis', function () {
        it('should return a new LocalDateTime at the given amount of millis after', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusMillis(1)).toEq(new LocalDateTime(2000, 1, 2, 3, 4, 5, 7));
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusMillis(1000)).toEq(new LocalDateTime(2000, 1, 2, 3, 4, 6, 6));
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusMillis(60 * 1000)).toEq(new LocalDateTime(2000, 1, 2, 3, 5, 5, 6));
        });
    });

    describe('minusMillis', function () {
        it('should return a new LocalDateTime at the given amount of millis before', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusMillis(1)).toEq(new LocalDateTime(2000, 1, 2, 3, 4, 5, 5));
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusMillis(1000)).toEq(new LocalDateTime(2000, 1, 2, 3, 4, 4, 6));
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusMillis(60 * 1000)).toEq(new LocalDateTime(2000, 1, 2, 3, 3, 5, 6));
        });
    });

    describe('plusSeconds', function () {
        it('should return a new LocalDateTime at the given amount of seconds after', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusSeconds(1)).toEq(new LocalDateTime(2000, 1, 2, 3, 4, 6, 6));
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusSeconds(61)).toEq(new LocalDateTime(2000, 1, 2, 3, 5, 6, 6));
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusSeconds(60 * 60 + 1)).toEq(new LocalDateTime(2000, 1, 2, 4, 4, 6, 6));
        });
    });

    describe('minusSeconds', function () {
        it('should return a new LocalDateTime at the given amount of seconds before', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusSeconds(1)).toEq(new LocalDateTime(2000, 1, 2, 3, 4, 4, 6));
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusSeconds(61)).toEq(new LocalDateTime(2000, 1, 2, 3, 3, 4, 6));
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusSeconds(60 * 60 + 1)).toEq(new LocalDateTime(2000, 1, 2, 2, 4, 4, 6));
        });
    });

    describe('plusMinutes', function () {
        it('should return a new LocalDateTime at the given amount of minutes after', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusMinutes(1)).toEq(new LocalDateTime(2000, 1, 2, 3, 5, 5, 6));
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusMinutes(61)).toEq(new LocalDateTime(2000, 1, 2, 4, 5, 5, 6));
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusMinutes(60 * 24 + 1)).toEq(new LocalDateTime(2000, 1, 3, 3, 5, 5, 6));
        });
    });

    describe('minusMinutes', function () {
        it('should return a new LocalDateTime at the given amount of minutes before', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusMinutes(1)).toEq(new LocalDateTime(2000, 1, 2, 3, 3, 5, 6));
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusMinutes(61)).toEq(new LocalDateTime(2000, 1, 2, 2, 3, 5, 6));
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusMinutes(60 * 24 + 1)).toEq(new LocalDateTime(2000, 1, 1, 3, 3, 5, 6));
        });
    });

    describe('plusHours', function () {
        it('should return a new LocalDateTime at the given amount of hours after', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusHours(1)).toEq(new LocalDateTime(2000, 1, 2, 4, 4, 5, 6));
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusHours(25)).toEq(new LocalDateTime(2000, 1, 3, 4, 4, 5, 6));
        });
    });

    describe('minusHours', function () {
        it('should return a new LocalDateTime at the given amount of hours before', function () {
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusHours(1)).toEq(new LocalDateTime(2000, 1, 2, 2, 4, 5, 6));
            expect(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusHours(25)).toEq(new LocalDateTime(2000, 1, 1, 2, 4, 5, 6));
        });
    });

    describe('plusDays', function () {
        it('should return a new LocalDateTime at the given amount of days after', function () {
            expect(new LocalDateTime(2014, 2, 2, 3, 4, 5, 6).plusDays(1)).toEq(new LocalDateTime(2014, 2, 3, 3, 4, 5, 6));
            expect(new LocalDateTime(2014, 2, 2).plusDays(30)).toEq(new LocalDateTime(2014, 3, 4));
            expect(new LocalDateTime(2014, 11, 29).plusDays(33)).toEq(new LocalDateTime(2015, 1, 1));
        });
    });
    describe('minusDays', function () {
        it('should return a new LocalDateTime at the given amount of days before', function () {
            expect(new LocalDateTime(2014, 2, 2, 3, 4, 5, 6).minusDays(1)).toEq(new LocalDateTime(2014, 2, 1, 3, 4, 5, 6));
            expect(new LocalDateTime(2014, 2, 2).minusDays(2)).toEq(new LocalDateTime(2014, 1, 31));
            expect(new LocalDateTime(2014, 2, 2).minusDays(33)).toEq(new LocalDateTime(2013, 12, 31));
        });
    });

    describe('plusWeeks', function () {
        it('should return a new LocalDateTime at 7 times the given amount of days after', function () {
            expect(new LocalDateTime(2014, 2, 9, 3, 4, 5, 6).plusWeeks(1)).toEq(new LocalDateTime(2014, 2, 16, 3, 4, 5, 6));
            expect(new LocalDateTime(2014, 2, 9).plusWeeks(3)).toEq(new LocalDateTime(2014, 3, 2));
            expect(new LocalDateTime(2014, 11, 29).plusWeeks(5)).toEq(new LocalDateTime(2015, 1, 3));
        });
    });

    describe('minusWeeks', function () {
        it('should return a new LocalDateTime at 7 times the given amount of days before', function () {
            expect(new LocalDateTime(2014, 2, 9, 3, 4, 5, 6).minusWeeks(1)).toEq(new LocalDateTime(2014, 2, 2, 3, 4, 5, 6));
            expect(new LocalDateTime(2014, 2, 9).minusWeeks(2)).toEq(new LocalDateTime(2014, 1, 26));
            expect(new LocalDateTime(2014, 2, 9).minusWeeks(6)).toEq(new LocalDateTime(2013, 12, 29));
        });
    });

    describe('plusMonths', function () {
        it('should return a new LocalDateTime at the given amount of months after', function () {
            expect(new LocalDateTime(2014, 1, 29, 3, 4, 5, 6).plusMonths(2)).toEq(new LocalDateTime(2014, 3, 29, 3, 4, 5, 6));
            expect(new LocalDateTime(2014, 1, 29).plusMonths(1)).toEq(new LocalDateTime(2014, 2, 28));
            expect(new LocalDateTime(2016, 1, 29).plusMonths(1)).toEq(new LocalDateTime(2016, 2, 29));
        });
    });
    describe('minusMonths', function () {
        it('should return a new LocalDateTime at the given amount of months before', function () {
            expect(new LocalDateTime(2014, 3, 29, 3, 4, 5, 6).minusMonths(1)).toEq(new LocalDateTime(2014, 2, 28, 3, 4, 5, 6));
            expect(new LocalDateTime(2014, 3, 29).minusMonths(2)).toEq(new LocalDateTime(2014, 1, 29));
            expect(new LocalDateTime(2016, 3, 29).minusMonths(1)).toEq(new LocalDateTime(2016, 2, 29));
        });
    });

    describe('plusYears', function () {
        it('should return a new LocalDateTime at the given amount of years after', function () {
            expect(new LocalDateTime(2014, 2, 9, 3, 4, 5, 6).plusYears(1)).toEq(new LocalDateTime(2015, 2, 9, 3, 4, 5, 6));
            expect(new LocalDateTime(2016, 2, 29).plusYears(1)).toEq(new LocalDateTime(2017, 2, 28));
            expect(new LocalDateTime(2016, 2, 29).plusYears(4)).toEq(new LocalDateTime(2020, 2, 29));
        });
    });

    describe('minusYears', function () {
        it('should return a new LocalDateTime at the given amount of years before', function () {
            expect(new LocalDateTime(2014, 2, 9, 3, 4, 5, 6).minusYears(1)).toEq(new LocalDateTime(2013, 2, 9, 3, 4, 5, 6));
            expect(new LocalDateTime(2016, 2, 29).minusYears(1)).toEq(new LocalDateTime(2015, 2, 28));
            expect(new LocalDateTime(2016, 2, 29).minusYears(4)).toEq(new LocalDateTime(2012, 2, 29));
        });
    });

    describe('toDate', function () {
        it('should return a Date with the same fields as the LocalDateTime', function () {
            expect(new LocalDateTime(2014, 2, 9, 3, 4, 5, 6).toDate()).toEqual(new Date(2014, 1, 9, 3, 4, 5, 6));
        });
    });
});