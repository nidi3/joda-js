/*global timeZone,littleBefore,almostDayAfter,goodDayAfter,matchers,jodajs,beforeEach,describe,it,expect,window*/
describe('LocalTime', function () {
    var LocalTime = jodajs.LocalTime,
        DateTimeUtils = jodajs.DateTimeUtils,
        t10_15 = new Date(2014, 1, 3, 10, 15, 2, 100).getTime();

    describe('init', function () {
        it('should construct a LocalTime with given fields', function () {
            var d = LocalTime(10, 15, 2, 3);
            expect(d.getHourOfDay()).toBe(10);
            expect(d.getMinuteOfHour()).toBe(15);
            expect(d.getSecondOfMinute()).toBe(2);
            expect(d.getMillisOfSecond()).toBe(3);
        });

        it('should construct a LocalTime with given fields, not given time fields should be 0', function () {
            expect(LocalTime(10, 15, 2).getMillisOfSecond()).toBe(0);
            expect(LocalTime(10, 15).getSecondOfMinute()).toBe(0);
        });

        it('should be usable with or without "new"', function () {
            var d1, d2;
            d1 = new LocalTime(10, 15);
            expect(window.LocalTime).toBeUndefined();

            d2 = LocalTime(10, 15);
            expect(window.LocalTime).toBeUndefined();

            expect(d1).toEq(d2);
        });
    });

    describe('fromDate', function () {
        it('should construct a LocalTime from the given Date in the current timezone', function () {
            expect(LocalTime.fromDate(new Date(littleBefore(t10_15)))).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromDate(new Date(t10_15))).toEq(LocalTime(10, 15, 2, 100));
            expect(LocalTime.fromDate(new Date(almostDayAfter(t10_15)))).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromDate(new Date(goodDayAfter(t10_15)))).toEq(LocalTime(10, 15, 2, 110));
        });
    });

    describe('fromDateUTC', function () {
        it('should construct a LocalTime from the given Date in UTC', function () {
            expect(LocalTime.fromDateUTC(new Date(littleBefore(t10_15) - timeZone))).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromDateUTC(new Date(t10_15 - timeZone))).toEq(LocalTime(10, 15, 2, 100));
            expect(LocalTime.fromDateUTC(new Date(almostDayAfter(t10_15 - timeZone)))).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromDateUTC(new Date(goodDayAfter(t10_15 - timeZone)))).toEq(LocalTime(10, 15, 2, 110));
        });
    });

    describe('fromMillis', function () {
        it('should construct a LocalTime from the given millis in the current timezone', function () {
            expect(LocalTime.fromMillis(littleBefore(t10_15))).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromMillis(t10_15)).toEq(LocalTime(10, 15, 2, 100));
            expect(LocalTime.fromMillis(almostDayAfter(t10_15))).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromMillis(goodDayAfter(t10_15))).toEq(LocalTime(10, 15, 2, 110));
        });
    });

    describe('fromMillisUTC', function () {
        it('should construct a LocalTime from the given millis in UTC', function () {
            expect(LocalTime.fromMillisUTC(littleBefore(t10_15) - timeZone)).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromMillisUTC(t10_15 - timeZone)).toEq(LocalTime(10, 15, 2, 100));
            expect(LocalTime.fromMillisUTC(almostDayAfter(t10_15) - timeZone)).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromMillisUTC(goodDayAfter(t10_15) - timeZone)).toEq(LocalTime(10, 15, 2, 110));
        });
    });

    describe('now', function () {
        it('should construct a LocalTime from now in the current timezone', function () {
            DateTimeUtils.setCurrentMillisFixed(littleBefore(t10_15));
            expect(LocalTime.now()).toEq(LocalTime(10, 15, 2, 90));

            DateTimeUtils.setCurrentMillisFixed(t10_15);
            expect(LocalTime.now()).toEq(LocalTime(10, 15, 2, 100));

            DateTimeUtils.setCurrentMillisFixed(almostDayAfter(t10_15));
            expect(LocalTime.now()).toEq(LocalTime(10, 15, 2, 90));

            DateTimeUtils.setCurrentMillisFixed(goodDayAfter(t10_15));
            expect(LocalTime.now()).toEq(LocalTime(10, 15, 2, 110));
        });
    });

    describe('nowUTC', function () {
        it('should construct a LocalTime from now in UTC', function () {
            DateTimeUtils.setCurrentMillisFixed(littleBefore(t10_15) - timeZone);
            expect(LocalTime.nowUTC()).toEq(LocalTime(10, 15, 2, 90));

            DateTimeUtils.setCurrentMillisFixed(t10_15 - timeZone);
            expect(LocalTime.nowUTC()).toEq(LocalTime(10, 15, 2, 100));

            DateTimeUtils.setCurrentMillisFixed(almostDayAfter(t10_15) - timeZone);
            expect(LocalTime.nowUTC()).toEq(LocalTime(10, 15, 2, 90));

            DateTimeUtils.setCurrentMillisFixed(goodDayAfter(t10_15) - timeZone);
            expect(LocalTime.nowUTC()).toEq(LocalTime(10, 15, 2, 110));
        });
    });

    describe('isEqual', function () {
        it('should return true if all fields are equal', function () {
            var lt = LocalTime(10, 15, 2, 3);
            expect(lt.isEqual(LocalTime(10, 15, 2, 3))).toBeTruthy();
            expect(lt.isEqual(LocalTime(10, 15, 2, 4))).toBeFalsy();
            expect(lt.isEqual(LocalTime(10, 15, 3, 3))).toBeFalsy();
            expect(lt.isEqual(LocalTime(10, 16, 2, 3))).toBeFalsy();
            expect(lt.isEqual(LocalTime(11, 15, 2, 3))).toBeFalsy();
        });
    });

    describe('isBefore', function () {
        it('should return true if a LocalTime is before another', function () {
            var lt = LocalTime(10, 15, 2, 3);
            expect(lt.isBefore(LocalTime(10, 15, 2, 4))).toBeTruthy();
            expect(lt.isBefore(LocalTime(10, 15, 2, 3))).toBeFalsy();
            expect(lt.isBefore(LocalTime(10, 15, 1, 3))).toBeFalsy();
            expect(lt.isBefore(LocalTime(10, 14, 1, 3))).toBeFalsy();
            expect(lt.isBefore(LocalTime(9, 15, 1, 3))).toBeFalsy();
        });
    });

    describe('isAfter', function () {
        it('should return true if a LocalTime is after another', function () {
            var lt = LocalTime(10, 15, 2, 3);
            expect(lt.isAfter(LocalTime(10, 15, 2, 2))).toBeTruthy();
            expect(lt.isAfter(LocalTime(10, 15, 2, 3))).toBeFalsy();
            expect(lt.isAfter(LocalTime(10, 15, 3, 3))).toBeFalsy();
            expect(lt.isAfter(LocalTime(10, 16, 2, 3))).toBeFalsy();
            expect(lt.isAfter(LocalTime(11, 15, 2, 3))).toBeFalsy();
        });
    });

    describe('getMillisOfSecond', function () {
        it('should return millis of second', function () {
            expect(LocalTime(10, 15, 2, 3).getMillisOfSecond()).toBe(3);
        });
    });
    describe('withMillisOfSecond', function () {
        it('should return a new LocalTime with given millis of second', function () {
            expect(LocalTime(10, 15, 2, 3).withMillisOfSecond(100)).toEq(LocalTime(10, 15, 2, 100));
        });
    });

    describe('getSecondOfMinute', function () {
        it('should return second of minute', function () {
            expect(LocalTime(10, 15, 2, 3).getSecondOfMinute()).toBe(2);
        });
    });
    describe('withSecondOfMinute', function () {
        it('should return a new LocalTime with given second of minute', function () {
            expect(LocalTime(10, 15, 2, 3).withSecondOfMinute(20)).toEq(LocalTime(10, 15, 20, 3));
        });
    });

    describe('getMinuteOfHour', function () {
        it('should return minute of hour', function () {
            expect(LocalTime(10, 15, 2, 3).getMinuteOfHour()).toBe(15);
        });
    });
    describe('withMinuteOfHour', function () {
        it('should return a new LocalTime with given minute of hour', function () {
            expect(LocalTime(10, 15, 2, 3).withMinuteOfHour(20)).toEq(LocalTime(10, 20, 2, 3));
        });
    });

    describe('getHourOfDay', function () {
        it('should return hour of day', function () {
            expect(LocalTime(10, 15, 2, 3).getHourOfDay()).toBe(10);
        });
    });
    describe('withHourOfDay', function () {
        it('should return a new LocalTime with given hour of day', function () {
            expect(LocalTime(10, 15, 2, 3).withHourOfDay(30)).toEq(LocalTime(30, 15, 2, 3));
        });
    });

    describe('plusMillis', function () {
        it('should return a new LocalTime at the given amount of millis after', function () {
            expect(LocalTime(3, 4, 5, 6).plusMillis(1)).toEq(LocalTime(3, 4, 5, 7));
            expect(LocalTime(3, 4, 5, 6).plusMillis(1000)).toEq(LocalTime(3, 4, 6, 6));
            expect(LocalTime(3, 4, 5, 6).plusMillis(60 * 1000)).toEq(LocalTime(3, 5, 5, 6));
        });
    });

    describe('minusMillis', function () {
        it('should return a new LocalTime at the given amount of millis before', function () {
            expect(LocalTime(3, 4, 5, 6).minusMillis(1)).toEq(LocalTime(3, 4, 5, 5));
            expect(LocalTime(3, 4, 5, 6).minusMillis(1000)).toEq(LocalTime(3, 4, 4, 6));
            expect(LocalTime(3, 4, 5, 6).minusMillis(60 * 1000)).toEq(LocalTime(3, 3, 5, 6));
        });
    });

    describe('plusSeconds', function () {
        it('should return a new LocalTime at the given amount of seconds after', function () {
            expect(LocalTime(3, 4, 5, 6).plusSeconds(1)).toEq(LocalTime(3, 4, 6, 6));
            expect(LocalTime(3, 4, 5, 6).plusSeconds(61)).toEq(LocalTime(3, 5, 6, 6));
            expect(LocalTime(3, 4, 5, 6).plusSeconds(60 * 60 + 1)).toEq(LocalTime(4, 4, 6, 6));
        });
    });

    describe('minusSeconds', function () {
        it('should return a new LocalTime at the given amount of seconds before', function () {
            expect(LocalTime(3, 4, 5, 6).minusSeconds(1)).toEq(LocalTime(3, 4, 4, 6));
            expect(LocalTime(3, 4, 5, 6).minusSeconds(61)).toEq(LocalTime(3, 3, 4, 6));
            expect(LocalTime(3, 4, 5, 6).minusSeconds(60 * 60 + 1)).toEq(LocalTime(2, 4, 4, 6));
        });
    });

    describe('plusMinutes', function () {
        it('should return a new LocalTime at the given amount of minutes after', function () {
            expect(LocalTime(3, 4, 5, 6).plusMinutes(1)).toEq(LocalTime(3, 5, 5, 6));
            expect(LocalTime(3, 4, 5, 6).plusMinutes(61)).toEq(LocalTime(4, 5, 5, 6));
            expect(LocalTime(3, 4, 5, 6).plusMinutes(60 * 24 + 1)).toEq(LocalTime(3, 5, 5, 6));
        });
    });

    describe('minusMinutes', function () {
        it('should return a new LocalTime at the given amount of minutes before', function () {
            expect(LocalTime(3, 4, 5, 6).minusMinutes(1)).toEq(LocalTime(3, 3, 5, 6));
            expect(LocalTime(3, 4, 5, 6).minusMinutes(61)).toEq(LocalTime(2, 3, 5, 6));
            expect(LocalTime(3, 4, 5, 6).minusMinutes(60 * 24 + 1)).toEq(LocalTime(3, 3, 5, 6));
        });
    });

    describe('plusHours', function () {
        it('should return a new LocalTime at the given amount of hours after', function () {
            expect(LocalTime(3, 4, 5, 6).plusHours(1)).toEq(LocalTime(4, 4, 5, 6));
            expect(LocalTime(3, 4, 5, 6).plusHours(25)).toEq(LocalTime(4, 4, 5, 6));
        });
    });

    describe('minusHours', function () {
        it('should return a new LocalTime at the given amount of hours before', function () {
            expect(LocalTime(3, 4, 5, 6).minusHours(1)).toEq(LocalTime(2, 4, 5, 6));
            expect(LocalTime(3, 4, 5, 6).minusHours(25)).toEq(LocalTime(2, 4, 5, 6));
        });
    });

    describe('toDate', function () {
        it('should return a Date with the same fields as the LocalTime (date fields undefined)', function () {
            expect(LocalTime(3, 4, 5, 6).toDate().getHours()).toEqual(new Date(2000, 1, 1, 3, 4, 5, 6).getHours());
            expect(LocalTime(3, 4, 5, 6).toDate().getMinutes()).toEqual(new Date(2000, 1, 1, 3, 4, 5, 6).getMinutes());
            expect(LocalTime(3, 4, 5, 6).toDate().getSeconds()).toEqual(new Date(2000, 1, 1, 3, 4, 5, 6).getSeconds());
            expect(LocalTime(3, 4, 5, 6).toDate().getMilliseconds()).toEqual(new Date(2000, 1, 1, 3, 4, 5, 6).getMilliseconds());
        });
    });

});