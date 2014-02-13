/*global matchers,jodajs,beforeEach,describe,it,expect*/
describe('LocalDate', function () {
    var LocalDate = jodajs.LocalDate,
        DateTimeUtils = jodajs.DateTimeUtils,
        zone = new Date().getTimezoneOffset() * 60 * 1000,
        t2014_2_3 = new Date(2014, 1, 3).getTime(),
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
        it('should construct a LocalDate with given fields', function () {
            var d = new LocalDate(2014, 2, 3);
            expect(d.getYear()).toBe(2014);
            expect(d.getMonthOfYear()).toBe(2);
            expect(d.getDayOfMonth()).toBe(3);
        });
    });

    describe('fromDate', function () {
        it('should construct a LocalDate from the given Date in the current timezone', function () {
            expect(LocalDate.fromDate(new Date(littleBefore(t2014_2_3)))).toEq(new LocalDate(2014, 2, 2));
            expect(LocalDate.fromDate(new Date(t2014_2_3))).toEq(new LocalDate(2014, 2, 3));
            expect(LocalDate.fromDate(new Date(almostDayAfter(t2014_2_3)))).toEq(new LocalDate(2014, 2, 3));
            expect(LocalDate.fromDate(new Date(dayAfter(t2014_2_3)))).toEq(new LocalDate(2014, 2, 4));
        });
    });

    describe('fromDateUTC', function () {
        it('should construct a LocalDate from the given Date in UTC', function () {
            expect(LocalDate.fromDateUTC(new Date(littleBefore(t2014_2_3) - zone))).toEq(new LocalDate(2014, 2, 2));
            expect(LocalDate.fromDateUTC(new Date(t2014_2_3 - zone))).toEq(new LocalDate(2014, 2, 3));
            expect(LocalDate.fromDateUTC(new Date(almostDayAfter(t2014_2_3) - zone))).toEq(new LocalDate(2014, 2, 3));
            expect(LocalDate.fromDateUTC(new Date(dayAfter(t2014_2_3) - zone))).toEq(new LocalDate(2014, 2, 4));

        });
    });

    describe('fromMillis', function () {
        it('should construct a LocalDate from the given millis in the current timezone', function () {
            expect(LocalDate.fromMillis(littleBefore(t2014_2_3))).toEq(new LocalDate(2014, 2, 2));
            expect(LocalDate.fromMillis(t2014_2_3)).toEq(new LocalDate(2014, 2, 3));
            expect(LocalDate.fromMillis(almostDayAfter(t2014_2_3))).toEq(new LocalDate(2014, 2, 3));
            expect(LocalDate.fromMillis(dayAfter(t2014_2_3))).toEq(new LocalDate(2014, 2, 4));
        });
    });

    describe('fromMillisUTC', function () {
        it('should construct a LocalDate from the given millis in UTC', function () {
            expect(LocalDate.fromMillisUTC(littleBefore(t2014_2_3) - zone)).toEq(new LocalDate(2014, 2, 2));
            expect(LocalDate.fromMillisUTC(t2014_2_3 - zone)).toEq(new LocalDate(2014, 2, 3));
            expect(LocalDate.fromMillisUTC(almostDayAfter(t2014_2_3) - zone)).toEq(new LocalDate(2014, 2, 3));
            expect(LocalDate.fromMillisUTC(dayAfter(t2014_2_3) - zone)).toEq(new LocalDate(2014, 2, 4));

        });
    });

    describe('now', function () {
        it('should construct a LocalDate from now in the current timezone', function () {
            DateTimeUtils.setCurrentMillisFixed(littleBefore(t2014_2_3));
            expect(LocalDate.now()).toEq(new LocalDate(2014, 2, 2));

            DateTimeUtils.setCurrentMillisFixed(t2014_2_3);
            expect(LocalDate.now()).toEq(new LocalDate(2014, 2, 3));

            DateTimeUtils.setCurrentMillisFixed(almostDayAfter(t2014_2_3));
            expect(LocalDate.now()).toEq(new LocalDate(2014, 2, 3));

            DateTimeUtils.setCurrentMillisFixed(dayAfter(t2014_2_3));
            expect(LocalDate.now()).toEq(new LocalDate(2014, 2, 4));
        });
    });

    describe('UTCnow', function () {
        it('should construct a LocalDate from now in UTC', function () {
            DateTimeUtils.setCurrentMillisFixed(littleBefore(t2014_2_3) - zone);
            expect(LocalDate.nowUTC()).toEq(new LocalDate(2014, 2, 2));

            DateTimeUtils.setCurrentMillisFixed(t2014_2_3 - zone);
            expect(LocalDate.nowUTC()).toEq(new LocalDate(2014, 2, 3));

            DateTimeUtils.setCurrentMillisFixed(almostDayAfter(t2014_2_3) - zone);
            expect(LocalDate.nowUTC()).toEq(new LocalDate(2014, 2, 3));

            DateTimeUtils.setCurrentMillisFixed(dayAfter(t2014_2_3) - zone);
            expect(LocalDate.nowUTC()).toEq(new LocalDate(2014, 2, 4));
        });
    });

    describe('isEqual', function () {
        it('should return true if all fields are equal', function () {
            expect(new LocalDate(2014, 2, 3).isEqual(new LocalDate(2014, 2, 3))).toBeTruthy();
            expect(new LocalDate(2014, 2, 3).isEqual(new LocalDate(2014, 2, 4))).toBeFalsy();
            expect(new LocalDate(2014, 2, 3).isEqual(new LocalDate(2014, 3, 3))).toBeFalsy();
            expect(new LocalDate(2014, 2, 3).isEqual(new LocalDate(2015, 2, 3))).toBeFalsy();
        });
    });

    describe('isBefore', function () {
        it('should return true if a LocalDate is before another', function () {
            expect(new LocalDate(2014, 2, 3).isBefore(new LocalDate(2014, 2, 4))).toBeTruthy();
            expect(new LocalDate(2014, 2, 3).isBefore(new LocalDate(2014, 2, 3))).toBeFalsy();
            expect(new LocalDate(2014, 2, 3).isBefore(new LocalDate(2014, 1, 4))).toBeFalsy();
            expect(new LocalDate(2014, 2, 3).isBefore(new LocalDate(2013, 2, 4))).toBeFalsy();
        });
    });

    describe('isAfter', function () {
        it('should return true if a LocalDate is after another', function () {
            expect(new LocalDate(2014, 2, 3).isAfter(new LocalDate(2014, 2, 2))).toBeTruthy();
            expect(new LocalDate(2014, 2, 3).isAfter(new LocalDate(2014, 2, 3))).toBeFalsy();
            expect(new LocalDate(2014, 2, 3).isAfter(new LocalDate(2014, 3, 2))).toBeFalsy();
            expect(new LocalDate(2014, 2, 3).isAfter(new LocalDate(2015, 2, 2))).toBeFalsy();
        });
    });

    describe('getDayOfMonth', function () {
        it('should return day of month', function () {
            expect(new LocalDate(2000, 1, 1).getDayOfMonth()).toBe(1);
            expect(new LocalDate(2000, 1, 31).getDayOfMonth()).toBe(31);
        });
    });

    describe('getDayOfWeek', function () {
        it('should return day of week (1=monday,...,7=sunday)', function () {
            expect(new LocalDate(2014, 2, 10).getDayOfWeek()).toBe(1);
            expect(new LocalDate(2014, 2, 11).getDayOfWeek()).toBe(2);
            expect(new LocalDate(2014, 2, 12).getDayOfWeek()).toBe(3);
            expect(new LocalDate(2014, 2, 13).getDayOfWeek()).toBe(4);
            expect(new LocalDate(2014, 2, 14).getDayOfWeek()).toBe(5);
            expect(new LocalDate(2014, 2, 15).getDayOfWeek()).toBe(6);
            expect(new LocalDate(2014, 2, 16).getDayOfWeek()).toBe(7);
            expect(new LocalDate(2014, 2, 17).getDayOfWeek()).toBe(1);
        });
    });

    describe('getDayOfYear', function () {
        it('should return day of year', function () {
            expect(new LocalDate(2014, 1, 1).getDayOfYear()).toBe(1);
            expect(new LocalDate(2014, 2, 1).getDayOfYear()).toBe(32);
            expect(new LocalDate(2014, 2, 28).getDayOfYear()).toBe(59);
            expect(new LocalDate(2014, 3, 1).getDayOfYear()).toBe(60);
            expect(new LocalDate(2014, 12, 31).getDayOfYear()).toBe(365);
            expect(new LocalDate(2016, 12, 31).getDayOfYear()).toBe(366);
        });
    });

    describe('getMonthOfYear', function () {
        it('should return month of year', function () {
            expect(new LocalDate(2014, 1, 1).getMonthOfYear()).toBe(1);
            expect(new LocalDate(2014, 12, 31).getMonthOfYear()).toBe(12);
        });
    });

    describe('getYear', function () {
        it('should return year', function () {
            expect(new LocalDate(2014, 1, 1).getYear()).toBe(2014);
            expect(new LocalDate(2014, 12, 31).getYear()).toBe(2014);
        });
    });

    describe('plusDays', function () {
        it('should return a new LocalDate x days after', function () {
            expect(new LocalDate(2014, 2, 2).plusDays(1)).toEq(new LocalDate(2014, 2, 3));
            expect(new LocalDate(2014, 2, 2).plusDays(30)).toEq(new LocalDate(2014, 3, 4));
            expect(new LocalDate(2014, 11, 29).plusDays(33)).toEq(new LocalDate(2015, 1, 1));
        });
    });
    describe('minusDays', function () {
        it('should return a new LocalDate x days before', function () {
            expect(new LocalDate(2014, 2, 2).minusDays(1)).toEq(new LocalDate(2014, 2, 1));
            expect(new LocalDate(2014, 2, 2).minusDays(2)).toEq(new LocalDate(2014, 1, 31));
            expect(new LocalDate(2014, 2, 2).minusDays(33)).toEq(new LocalDate(2013, 12, 31));
        });
    });

    describe('plusWeeks', function () {
        it('should return a new LocalDate 7*x days after', function () {
            expect(new LocalDate(2014, 2, 9).plusWeeks(1)).toEq(new LocalDate(2014, 2, 16));
            expect(new LocalDate(2014, 2, 9).plusWeeks(3)).toEq(new LocalDate(2014, 3, 2));
            expect(new LocalDate(2014, 11, 29).plusWeeks(5)).toEq(new LocalDate(2015, 1, 3));
        });
    });

    describe('minusWeeks', function () {
        it('should return a new LocalDate 7*x days before', function () {
            expect(new LocalDate(2014, 2, 9).minusWeeks(1)).toEq(new LocalDate(2014, 2, 2));
            expect(new LocalDate(2014, 2, 9).minusWeeks(2)).toEq(new LocalDate(2014, 1, 26));
            expect(new LocalDate(2014, 2, 9).minusWeeks(6)).toEq(new LocalDate(2013, 12, 29));
        });
    });

    describe('plusMonths', function () {
        it('should return a new LocalDate x month after', function () {
            expect(new LocalDate(2014, 1, 29).plusMonths(2)).toEq(new LocalDate(2014, 3, 29));
            expect(new LocalDate(2014, 1, 29).plusMonths(1)).toEq(new LocalDate(2014, 2, 28));
            expect(new LocalDate(2016, 1, 29).plusMonths(1)).toEq(new LocalDate(2016, 2, 29));
        });
    });
    describe('minusMonths', function () {
        it('should return a new LocalDate x month before', function () {
            expect(new LocalDate(2014, 3, 29).minusMonths(1)).toEq(new LocalDate(2014, 2, 28));
            expect(new LocalDate(2014, 3, 29).minusMonths(2)).toEq(new LocalDate(2014, 1, 29));
            expect(new LocalDate(2016, 3, 29).minusMonths(1)).toEq(new LocalDate(2016, 2, 29));
        });
    });

    describe('plusYears', function () {
        it('should return a new LocalDate x years after', function () {
            expect(new LocalDate(2014, 2, 9).plusYears(1)).toEq(new LocalDate(2015, 2, 9));
            expect(new LocalDate(2016, 2, 29).plusYears(1)).toEq(new LocalDate(2017, 2, 28));
            expect(new LocalDate(2016, 2, 29).plusYears(4)).toEq(new LocalDate(2020, 2, 29));
        });
    });

    describe('minusYears', function () {
        it('should return a new LocalDate x years before', function () {
            expect(new LocalDate(2014, 2, 9).minusYears(1)).toEq(new LocalDate(2013, 2, 9));
            expect(new LocalDate(2016, 2, 29).minusYears(1)).toEq(new LocalDate(2015, 2, 28));
            expect(new LocalDate(2016, 2, 29).minusYears(4)).toEq(new LocalDate(2012, 2, 29));
        });
    });
});