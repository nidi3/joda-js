/*global timeZone,littleBefore,almostDayAfter,goodDayAfter,matchers,jodajs,beforeEach,describe,it,expect,window*/
describe('LocalDate', function () {
    var LocalDate = jodajs.LocalDate,
        DateTimeUtils = jodajs.DateTimeUtils,
        t2014_2_3 = new Date(2014, 1, 3).getTime();

    describe('init', function () {
        it('should construct a LocalDate with given fields', function () {
            var d = LocalDate(2014, 2, 3);
            expect(d.getYear()).toBe(2014);
            expect(d.getMonthOfYear()).toBe(2);
            expect(d.getDayOfMonth()).toBe(3);
        });
        it('should be usable with or without "new"', function () {
            var d1, d2;
            d1 = new LocalDate(2000, 1, 1);
            expect(window.LocalDate).toBeUndefined();

            d2 = LocalDate(2000, 1, 1);
            expect(window.LocalDate).toBeUndefined();

            expect(d1).toEq(d2);
        });
    });

    describe('fromDate', function () {
        it('should construct a LocalDate from the given Date in the current timezone', function () {
            expect(LocalDate.fromDate(new Date(littleBefore(t2014_2_3)))).toEq(LocalDate(2014, 2, 2));
            expect(LocalDate.fromDate(new Date(t2014_2_3))).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromDate(new Date(almostDayAfter(t2014_2_3)))).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromDate(new Date(goodDayAfter(t2014_2_3)))).toEq(LocalDate(2014, 2, 4));
        });
    });

    describe('fromDateUTC', function () {
        it('should construct a LocalDate from the given Date in UTC', function () {
            expect(LocalDate.fromDateUTC(new Date(littleBefore(t2014_2_3) - timeZone))).toEq(LocalDate(2014, 2, 2));
            expect(LocalDate.fromDateUTC(new Date(t2014_2_3 - timeZone))).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromDateUTC(new Date(almostDayAfter(t2014_2_3) - timeZone))).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromDateUTC(new Date(goodDayAfter(t2014_2_3) - timeZone))).toEq(LocalDate(2014, 2, 4));

        });
    });

    describe('fromMillis', function () {
        it('should construct a LocalDate from the given millis in the current timezone', function () {
            expect(LocalDate.fromMillis(littleBefore(t2014_2_3))).toEq(LocalDate(2014, 2, 2));
            expect(LocalDate.fromMillis(t2014_2_3)).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromMillis(almostDayAfter(t2014_2_3))).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromMillis(goodDayAfter(t2014_2_3))).toEq(LocalDate(2014, 2, 4));
        });
    });

    describe('fromMillisUTC', function () {
        it('should construct a LocalDate from the given millis in UTC', function () {
            expect(LocalDate.fromMillisUTC(littleBefore(t2014_2_3) - timeZone)).toEq(LocalDate(2014, 2, 2));
            expect(LocalDate.fromMillisUTC(t2014_2_3 - timeZone)).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromMillisUTC(almostDayAfter(t2014_2_3) - timeZone)).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromMillisUTC(goodDayAfter(t2014_2_3) - timeZone)).toEq(LocalDate(2014, 2, 4));

        });
    });

    describe('now', function () {
        it('should construct a LocalDate from now in the current timezone', function () {
            DateTimeUtils.setCurrentMillisFixed(littleBefore(t2014_2_3));
            expect(LocalDate.now()).toEq(LocalDate(2014, 2, 2));

            DateTimeUtils.setCurrentMillisFixed(t2014_2_3);
            expect(LocalDate.now()).toEq(LocalDate(2014, 2, 3));

            DateTimeUtils.setCurrentMillisFixed(almostDayAfter(t2014_2_3));
            expect(LocalDate.now()).toEq(LocalDate(2014, 2, 3));

            DateTimeUtils.setCurrentMillisFixed(goodDayAfter(t2014_2_3));
            expect(LocalDate.now()).toEq(LocalDate(2014, 2, 4));
        });
    });

    describe('nowUTC', function () {
        it('should construct a LocalDate from now in UTC', function () {
            DateTimeUtils.setCurrentMillisFixed(littleBefore(t2014_2_3) - timeZone);
            expect(LocalDate.nowUTC()).toEq(LocalDate(2014, 2, 2));

            DateTimeUtils.setCurrentMillisFixed(t2014_2_3 - timeZone);
            expect(LocalDate.nowUTC()).toEq(LocalDate(2014, 2, 3));

            DateTimeUtils.setCurrentMillisFixed(almostDayAfter(t2014_2_3) - timeZone);
            expect(LocalDate.nowUTC()).toEq(LocalDate(2014, 2, 3));

            DateTimeUtils.setCurrentMillisFixed(goodDayAfter(t2014_2_3) - timeZone);
            expect(LocalDate.nowUTC()).toEq(LocalDate(2014, 2, 4));
        });
    });

    describe('isEqual', function () {
        it('should return true if all fields are equal', function () {
            expect(LocalDate(2014, 2, 3).isEqual(LocalDate(2014, 2, 3))).toBeTruthy();
            expect(LocalDate(2014, 2, 3).isEqual(LocalDate(2014, 2, 4))).toBeFalsy();
            expect(LocalDate(2014, 2, 3).isEqual(LocalDate(2014, 3, 3))).toBeFalsy();
            expect(LocalDate(2014, 2, 3).isEqual(LocalDate(2015, 2, 3))).toBeFalsy();
        });
    });

    describe('isBefore', function () {
        it('should return true if a LocalDate is before another', function () {
            expect(LocalDate(2014, 2, 3).isBefore(LocalDate(2014, 2, 4))).toBeTruthy();
            expect(LocalDate(2014, 2, 3).isBefore(LocalDate(2014, 2, 3))).toBeFalsy();
            expect(LocalDate(2014, 2, 3).isBefore(LocalDate(2014, 1, 4))).toBeFalsy();
            expect(LocalDate(2014, 2, 3).isBefore(LocalDate(2013, 2, 4))).toBeFalsy();
        });
    });

    describe('isAfter', function () {
        it('should return true if a LocalDate is after another', function () {
            expect(LocalDate(2014, 2, 3).isAfter(LocalDate(2014, 2, 2))).toBeTruthy();
            expect(LocalDate(2014, 2, 3).isAfter(LocalDate(2014, 2, 3))).toBeFalsy();
            expect(LocalDate(2014, 2, 3).isAfter(LocalDate(2014, 3, 2))).toBeFalsy();
            expect(LocalDate(2014, 2, 3).isAfter(LocalDate(2015, 2, 2))).toBeFalsy();
        });
    });

    describe('getDayOfMonth', function () {
        it('should return day of month', function () {
            expect(LocalDate(2000, 1, 1).getDayOfMonth()).toBe(1);
            expect(LocalDate(2000, 1, 31).getDayOfMonth()).toBe(31);
        });
    });

    describe('withDayOfMonth', function () {
        it('should return a new LocalDate with the given day of month', function () {
            expect(LocalDate(2000, 1, 1).withDayOfMonth(2)).toEq(LocalDate(2000, 1, 2));
        });
    });

    describe('getDayOfWeek', function () {
        it('should return day of week (1=monday,...,7=sunday)', function () {
            expect(LocalDate(2014, 2, 10).getDayOfWeek()).toBe(1);
            expect(LocalDate(2014, 2, 11).getDayOfWeek()).toBe(2);
            expect(LocalDate(2014, 2, 12).getDayOfWeek()).toBe(3);
            expect(LocalDate(2014, 2, 13).getDayOfWeek()).toBe(4);
            expect(LocalDate(2014, 2, 14).getDayOfWeek()).toBe(5);
            expect(LocalDate(2014, 2, 15).getDayOfWeek()).toBe(6);
            expect(LocalDate(2014, 2, 16).getDayOfWeek()).toBe(7);
            expect(LocalDate(2014, 2, 17).getDayOfWeek()).toBe(1);
        });
    });

    describe('withDayOfWeek', function () {
        it('should return a new LocalDate with the given day of week', function () {
            expect(LocalDate(2014, 2, 13).withDayOfWeek(1)).toEq(LocalDate(2014, 2, 10));
            expect(LocalDate(2014, 2, 13).withDayOfWeek(7)).toEq(LocalDate(2014, 2, 16));
        });
    });


    describe('getDayOfYear', function () {
        it('should return day of year', function () {
            expect(LocalDate(2014, 1, 1).getDayOfYear()).toBe(1);
            expect(LocalDate(2014, 2, 1).getDayOfYear()).toBe(32);
            expect(LocalDate(2014, 2, 28).getDayOfYear()).toBe(59);
            expect(LocalDate(2014, 3, 1).getDayOfYear()).toBe(60);
            expect(LocalDate(2014, 12, 31).getDayOfYear()).toBe(365);
            expect(LocalDate(2016, 12, 31).getDayOfYear()).toBe(366);
        });
    });

    describe('withDayOfYear', function () {
        it('should return a new LocalDate with the given day of year', function () {
            expect(LocalDate(2001, 5, 16).withDayOfYear(2)).toEq(LocalDate(2001, 1, 2));
            expect(LocalDate(2001, 10, 7).withDayOfYear(364)).toEq(LocalDate(2001, 12, 30));
        });
    });


    describe('getMonthOfYear', function () {
        it('should return month of year', function () {
            expect(LocalDate(2014, 1, 1).getMonthOfYear()).toBe(1);
            expect(LocalDate(2014, 12, 31).getMonthOfYear()).toBe(12);
        });
    });

    describe('withMonthOfYear', function () {
        it('should return a new LocalDate with the given month of year', function () {
            expect(LocalDate(2001, 6, 16).withMonthOfYear(2)).toEq(LocalDate(2001, 2, 16));
            expect(LocalDate(2001, 1, 31).withMonthOfYear(2)).toEq(LocalDate(2001, 2, 28));
        });
    });

    describe('getWeekOfWeekyear', function () {
        it('should return the week of year', function () {
            expect(LocalDate(2010, 1, 3).getWeekOfWeekyear()).toBe(53);
            expect(LocalDate(2010, 1, 4).getWeekOfWeekyear()).toBe(1);
            expect(LocalDate(2011, 1, 2).getWeekOfWeekyear()).toBe(52);
            expect(LocalDate(2011, 1, 3).getWeekOfWeekyear()).toBe(1);
            expect(LocalDate(2012, 1, 1).getWeekOfWeekyear()).toBe(52);
            expect(LocalDate(2012, 1, 2).getWeekOfWeekyear()).toBe(1);
            expect(LocalDate(2012, 12, 30).getWeekOfWeekyear()).toBe(52);
            expect(LocalDate(2012, 12, 31).getWeekOfWeekyear()).toBe(1);
            expect(LocalDate(2013, 12, 29).getWeekOfWeekyear()).toBe(52);
            expect(LocalDate(2013, 12, 30).getWeekOfWeekyear()).toBe(1);
        });
    });

    describe('withWeekOfWeekyear', function () {
        it('should return a new LocalDate with the given week of weekyear', function () {
            expect(LocalDate(2010, 1, 3).withWeekOfWeekyear(52)).toEq(LocalDate(2009, 12, 27));
            expect(LocalDate(2010, 1, 4).withWeekOfWeekyear(2)).toEq(LocalDate(2010, 1, 11));
        });
    });

    describe('getWeekyear', function () {
        it('should return the year the current week belongs to', function () {
            expect(LocalDate(2010, 1, 3).getWeekyear()).toBe(2009);
            expect(LocalDate(2010, 1, 4).getWeekyear()).toBe(2010);
            expect(LocalDate(2011, 1, 2).getWeekyear()).toBe(2010);
            expect(LocalDate(2011, 1, 3).getWeekyear()).toBe(2011);
            expect(LocalDate(2012, 1, 1).getWeekyear()).toBe(2011);
            expect(LocalDate(2012, 1, 2).getWeekyear()).toBe(2012);
            expect(LocalDate(2012, 12, 30).getWeekyear()).toBe(2012);
            expect(LocalDate(2012, 12, 31).getWeekyear()).toBe(2013);
            expect(LocalDate(2013, 12, 29).getWeekyear()).toBe(2013);
            expect(LocalDate(2013, 12, 30).getWeekyear()).toBe(2014);
            expect(LocalDate(2013, 6, 6).getWeekyear()).toBe(2013);
        });
    });

    describe('withWeekyear', function () {
        it('should return a new LocalDate with the given week of weekyear', function () {
            expect(LocalDate(2010, 1, 3).withWeekyear(2010)).toEq(LocalDate(2011, 1, 2));
            expect(LocalDate(2010, 1, 4).withWeekyear(2011)).toEq(LocalDate(2011, 1, 3));
        });
    });

    describe('getYear', function () {
        it('should return year', function () {
            expect(LocalDate(2014, 1, 1).getYear()).toBe(2014);
            expect(LocalDate(2014, 12, 31).getYear()).toBe(2014);
        });
    });

    describe('withYear', function () {
        it('should return a new LocalDate with the given year', function () {
            expect(LocalDate(2004, 2, 29).withYear(2008)).toEq(LocalDate(2008, 2, 29));
            expect(LocalDate(2004, 2, 29).withYear(2005)).toEq(LocalDate(2005, 2, 28));
        });
    });

    describe('plusDays', function () {
        it('should return a new LocalDate x days after', function () {
            expect(LocalDate(2014, 2, 2).plusDays(1)).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate(2014, 2, 2).plusDays(30)).toEq(LocalDate(2014, 3, 4));
            expect(LocalDate(2014, 11, 29).plusDays(33)).toEq(LocalDate(2015, 1, 1));
        });
    });
    describe('minusDays', function () {
        it('should return a new LocalDate x days before', function () {
            expect(LocalDate(2014, 2, 2).minusDays(1)).toEq(LocalDate(2014, 2, 1));
            expect(LocalDate(2014, 2, 2).minusDays(2)).toEq(LocalDate(2014, 1, 31));
            expect(LocalDate(2014, 2, 2).minusDays(33)).toEq(LocalDate(2013, 12, 31));
        });
    });

    describe('plusWeeks', function () {
        it('should return a new LocalDate 7*x days after', function () {
            expect(LocalDate(2014, 2, 9).plusWeeks(1)).toEq(LocalDate(2014, 2, 16));
            expect(LocalDate(2014, 2, 9).plusWeeks(3)).toEq(LocalDate(2014, 3, 2));
            expect(LocalDate(2014, 11, 29).plusWeeks(5)).toEq(LocalDate(2015, 1, 3));
        });
    });

    describe('minusWeeks', function () {
        it('should return a new LocalDate 7*x days before', function () {
            expect(LocalDate(2014, 2, 9).minusWeeks(1)).toEq(LocalDate(2014, 2, 2));
            expect(LocalDate(2014, 2, 9).minusWeeks(2)).toEq(LocalDate(2014, 1, 26));
            expect(LocalDate(2014, 2, 9).minusWeeks(6)).toEq(LocalDate(2013, 12, 29));
        });
    });

    describe('plusMonths', function () {
        it('should return a new LocalDate x month after', function () {
            expect(LocalDate(2014, 1, 29).plusMonths(2)).toEq(LocalDate(2014, 3, 29));
            expect(LocalDate(2014, 1, 29).plusMonths(1)).toEq(LocalDate(2014, 2, 28));
            expect(LocalDate(2016, 1, 29).plusMonths(1)).toEq(LocalDate(2016, 2, 29));
            expect(LocalDate(2016, 1, 29).plusMonths(13)).toEq(LocalDate(2017, 2, 28));
        });
    });
    describe('minusMonths', function () {
        it('should return a new LocalDate x month before', function () {
            expect(LocalDate(2014, 3, 29).minusMonths(1)).toEq(LocalDate(2014, 2, 28));
            expect(LocalDate(2014, 3, 29).minusMonths(2)).toEq(LocalDate(2014, 1, 29));
            expect(LocalDate(2016, 3, 29).minusMonths(1)).toEq(LocalDate(2016, 2, 29));
            expect(LocalDate(2016, 3, 29).minusMonths(13)).toEq(LocalDate(2015, 2, 28));
        });
    });

    describe('plusYears', function () {
        it('should return a new LocalDate x years after', function () {
            expect(LocalDate(2014, 2, 9).plusYears(1)).toEq(LocalDate(2015, 2, 9));
            expect(LocalDate(2016, 2, 29).plusYears(1)).toEq(LocalDate(2017, 2, 28));
            expect(LocalDate(2016, 2, 29).plusYears(4)).toEq(LocalDate(2020, 2, 29));
        });
    });

    describe('minusYears', function () {
        it('should return a new LocalDate x years before', function () {
            expect(LocalDate(2014, 2, 9).minusYears(1)).toEq(LocalDate(2013, 2, 9));
            expect(LocalDate(2016, 2, 29).minusYears(1)).toEq(LocalDate(2015, 2, 28));
            expect(LocalDate(2016, 2, 29).minusYears(4)).toEq(LocalDate(2012, 2, 29));
        });
    });

    describe('toDate', function () {
        it('should return a Date with the same fields as the LocalDate (time fields set to 0)', function () {
            expect(LocalDate(2014, 2, 9).toDate()).toEqual(new Date(2014, 1, 9, 0, 0, 0, 0));
        });
    });
});