/*global window,stdDate,LocalDateTime,DateTimeUtils,timeZone,littleBefore,almostDayAfter,goodDayAfter,matchers,jodajs,beforeEach,describe,it,expect*/
describe("LocalDateTime", function () {

    describe("init", function () {
        it("should construct a LocalDateTime with given fields", function () {
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).getYear()).toBe(2014);
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).getMonthOfYear()).toBe(2);
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).getDayOfMonth()).toBe(3);
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).getHourOfDay()).toBe(4);
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).getMinuteOfHour()).toBe(5);
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).getSecondOfMinute()).toBe(6);
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).getMillisOfSecond()).toBe(7);
        });
        it("should construct a LocalDateTime with given fields, not given time fields should be 0", function () {
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6).getMillisOfSecond()).toBe(0);
            expect(LocalDateTime(2014, 2, 3, 4, 5).getSecondOfMinute()).toBe(0);
        });
    });

    describe("isEqual", function () {
        it("should return true if all fields are equal", function () {
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isEqual(LocalDateTime(2014, 2, 3, 4, 5, 6, 7))).toBeTruthy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isEqual(LocalDateTime(2014, 2, 3, 4, 5, 6, 8))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isEqual(LocalDateTime(2014, 3, 3, 4, 5, 7, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isEqual(LocalDateTime(2014, 2, 3, 4, 6, 6, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isEqual(LocalDateTime(2014, 2, 3, 5, 5, 6, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isEqual(LocalDateTime(2014, 2, 4, 4, 5, 6, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isEqual(LocalDateTime(2014, 3, 3, 4, 5, 6, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isEqual(LocalDateTime(2015, 2, 3, 4, 5, 6, 7))).toBeFalsy();
        });
    });

    describe("isBefore", function () {
        it("should return true if a LocalDateTime is before another", function () {
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isBefore(LocalDateTime(2014, 2, 3, 4, 5, 6, 8))).toBeTruthy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isBefore(LocalDateTime(2014, 2, 3, 4, 5, 6, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isBefore(LocalDateTime(2014, 2, 3, 4, 5, 5, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isBefore(LocalDateTime(2014, 2, 3, 4, 4, 6, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isBefore(LocalDateTime(2014, 2, 3, 3, 5, 6, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isBefore(LocalDateTime(2014, 2, 2, 4, 5, 6, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isBefore(LocalDateTime(2014, 1, 3, 4, 5, 6, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isBefore(LocalDateTime(2013, 2, 3, 4, 5, 6, 7))).toBeFalsy();
        });
    });

    describe("isAfter", function () {
        it("should return true if a LocalDateTime is after another", function () {
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isAfter(LocalDateTime(2014, 2, 3, 4, 5, 6, 6))).toBeTruthy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isAfter(LocalDateTime(2014, 2, 3, 4, 5, 6, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isAfter(LocalDateTime(2014, 2, 3, 4, 5, 7, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isAfter(LocalDateTime(2014, 2, 3, 4, 6, 6, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isAfter(LocalDateTime(2014, 2, 3, 5, 5, 6, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isAfter(LocalDateTime(2014, 2, 4, 4, 5, 6, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isAfter(LocalDateTime(2014, 3, 3, 4, 5, 6, 7))).toBeFalsy();
            expect(LocalDateTime(2014, 2, 3, 4, 5, 6, 7).isAfter(LocalDateTime(2015, 2, 3, 4, 5, 6, 7))).toBeFalsy();
        });
    });

    describe("getMillisOfSecond", function () {
        it("should return millis of second", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).getMillisOfSecond()).toBe(6);
        });
    });
    describe("withMillisOfSecond", function () {
        it("should return a new LocalDateTime with given millis of second", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).withMillisOfSecond(100)).toEq(LocalDateTime(2000, 1, 2, 3, 4, 5, 100));
        });
    });

    describe("getSecondOfMinute", function () {
        it("should return second of minute", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).getSecondOfMinute()).toBe(5);
        });
    });
    describe("withSecondOfMinute", function () {
        it("should return a new LocalDateTime with given second of minute", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).withSecondOfMinute(10)).toEq(LocalDateTime(2000, 1, 2, 3, 4, 10, 6));
        });
    });

    describe("getMinuteOfHour", function () {
        it("should return minute of hour", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).getMinuteOfHour()).toBe(4);
        });
    });
    describe("withMinuteOfHour", function () {
        it("should return a new LocalDateTime with given minute of hour", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).withMinuteOfHour(10)).toEq(LocalDateTime(2000, 1, 2, 3, 10, 5, 6));
        });
    });

    describe("getHourOfDay", function () {
        it("should return hour of day", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).getHourOfDay()).toBe(3);
        });
    });
    describe("withHourOfDay", function () {
        it("should return a new LocalDateTime with given hour of day", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).withHourOfDay(10)).toEq(LocalDateTime(2000, 1, 2, 10, 4, 5, 6));
        });
    });

    describe("getDayOfMonth", function () {
        it("should return day of month", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).getDayOfMonth()).toBe(2);
        });
    });

    describe("withDayOfMonth", function () {
        it("should return a new LocalDateTime with the given day of month", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).withDayOfMonth(3)).toEq(LocalDateTime(2000, 1, 3, 3, 4, 5, 6));
        });
    });

    describe("getDayOfWeek", function () {
        it("should return day of week (1=monday,...,7=sunday)", function () {
            expect(LocalDateTime(2014, 2, 10, 3, 4, 5, 6).getDayOfWeek()).toBe(1);
            expect(LocalDateTime(2014, 2, 11, 3, 4, 5).getDayOfWeek()).toBe(2);
            expect(LocalDateTime(2014, 2, 12, 3, 4).getDayOfWeek()).toBe(3);
            expect(LocalDateTime(2014, 2, 13, 3, 4).getDayOfWeek()).toBe(4);
            expect(LocalDateTime(2014, 2, 14, 3, 4).getDayOfWeek()).toBe(5);
            expect(LocalDateTime(2014, 2, 15, 3, 4).getDayOfWeek()).toBe(6);
            expect(LocalDateTime(2014, 2, 16, 3, 4).getDayOfWeek()).toBe(7);
            expect(LocalDateTime(2014, 2, 17, 3, 4).getDayOfWeek()).toBe(1);
        });
    });

    describe("withDayOfWeek", function () {
        it("should return a new LocalDateTime with the given day of week", function () {
            expect(LocalDateTime(2014, 2, 13, 3, 4, 5, 6).withDayOfWeek(1)).toEq(LocalDateTime(2014, 2, 10, 3, 4, 5, 6));
            expect(LocalDateTime(2014, 2, 13, 3, 4).withDayOfWeek(7)).toEq(LocalDateTime(2014, 2, 16, 3, 4, 0, 0));
        });
    });


    describe("getDayOfYear", function () {
        it("should return day of year", function () {
            expect(LocalDateTime(2014, 1, 1, 3, 4, 5, 6).getDayOfYear()).toBe(1);
            expect(LocalDateTime(2014, 2, 1, 3, 4).getDayOfYear()).toBe(32);
            expect(LocalDateTime(2014, 2, 28, 3, 4).getDayOfYear()).toBe(59);
            expect(LocalDateTime(2014, 3, 1, 3, 4).getDayOfYear()).toBe(60);
            expect(LocalDateTime(2014, 12, 31, 3, 4).getDayOfYear()).toBe(365);
            expect(LocalDateTime(2016, 12, 31, 3, 4).getDayOfYear()).toBe(366);
        });
    });

    describe("getWeekOfWeekyear", function () {
        it("should return the week of year", function () {
            expect(LocalDateTime(2010, 1, 3, 4, 5, 6, 7).getWeekOfWeekyear()).toBe(53);
            expect(LocalDateTime(2010, 1, 4, 3, 4).getWeekOfWeekyear()).toBe(1);
            expect(LocalDateTime(2011, 1, 2, 3, 4).getWeekOfWeekyear()).toBe(52);
            expect(LocalDateTime(2011, 1, 3, 3, 4).getWeekOfWeekyear()).toBe(1);
            expect(LocalDateTime(2012, 1, 1, 3, 4).getWeekOfWeekyear()).toBe(52);
            expect(LocalDateTime(2012, 1, 2, 3, 4).getWeekOfWeekyear()).toBe(1);
            expect(LocalDateTime(2012, 12, 30, 3, 4).getWeekOfWeekyear()).toBe(52);
            expect(LocalDateTime(2012, 12, 31, 3, 4).getWeekOfWeekyear()).toBe(1);
            expect(LocalDateTime(2013, 12, 29, 3, 4).getWeekOfWeekyear()).toBe(52);
            expect(LocalDateTime(2013, 12, 30, 3, 4).getWeekOfWeekyear()).toBe(1);
        });
    });

    describe("withWeekOfWeekyear", function () {
        it("should return a new LocalDate with the given week of weekyear", function () {
            expect(LocalDateTime(2010, 1, 3, 4, 5, 6, 7).withWeekOfWeekyear(52)).toEq(LocalDateTime(2009, 12, 27, 4, 5, 6, 7));
            expect(LocalDateTime(2010, 1, 4, 3, 4).withWeekOfWeekyear(2)).toEq(LocalDateTime(2010, 1, 11, 3, 4));
        });
    });

    describe("getWeekyear", function () {
        it("should return the year the current week belongs to", function () {
            expect(LocalDateTime(2010, 1, 3, 4, 5, 6, 7).getWeekyear()).toBe(2009);
            expect(LocalDateTime(2010, 1, 4, 3, 4).getWeekyear()).toBe(2010);
            expect(LocalDateTime(2011, 1, 2, 3, 4).getWeekyear()).toBe(2010);
            expect(LocalDateTime(2011, 1, 3, 3, 4).getWeekyear()).toBe(2011);
            expect(LocalDateTime(2012, 1, 1, 3, 4).getWeekyear()).toBe(2011);
            expect(LocalDateTime(2012, 1, 2, 3, 4).getWeekyear()).toBe(2012);
            expect(LocalDateTime(2012, 12, 30, 3, 4).getWeekyear()).toBe(2012);
            expect(LocalDateTime(2012, 12, 31, 3, 4).getWeekyear()).toBe(2013);
            expect(LocalDateTime(2013, 12, 29, 3, 4).getWeekyear()).toBe(2013);
            expect(LocalDateTime(2013, 12, 30, 3, 4).getWeekyear()).toBe(2014);
        });
    });

    describe("withWeekyear", function () {
        it("should return a new LocalDate with the given week of weekyear", function () {
            expect(LocalDateTime(2010, 1, 3, 4, 5, 6, 7).withWeekyear(2010)).toEq(LocalDateTime(2011, 1, 2, 4, 5, 6, 7));
            expect(LocalDateTime(2010, 1, 4, 3, 4).withWeekyear(2011)).toEq(LocalDateTime(2011, 1, 3, 3, 4));
        });
    });

    describe("withDayOfYear", function () {
        it("should return a new LocalDateTime with the given day of year", function () {
            expect(LocalDateTime(2001, 5, 16, 3, 4, 5, 6).withDayOfYear(2)).toEq(LocalDateTime(2001, 1, 2, 3, 4, 5, 6));
            expect(LocalDateTime(2001, 10, 7, 3, 4).withDayOfYear(364)).toEq(LocalDateTime(2001, 12, 30, 3, 4));
        });
    });


    describe("getMonthOfYear", function () {
        it("should return month of year", function () {
            expect(LocalDateTime(2014, 1, 1, 3, 4, 5, 6).getMonthOfYear()).toBe(1);
            expect(LocalDateTime(2014, 12, 31, 3, 4).getMonthOfYear()).toBe(12);
        });
    });

    describe("withMonthOfYear", function () {
        it("should return a new LocalDateTime with the given month of year", function () {
            expect(LocalDateTime(2001, 6, 16, 3, 4, 5, 6).withMonthOfYear(2)).toEq(LocalDateTime(2001, 2, 16, 3, 4, 5, 6));
            expect(LocalDateTime(2001, 1, 31, 3, 4).withMonthOfYear(2)).toEq(LocalDateTime(2001, 2, 28, 3, 4));
        });
    });

    describe("getYear", function () {
        it("should return year", function () {
            expect(LocalDateTime(2014, 1, 1, 3, 4, 5, 6).getYear()).toBe(2014);
            expect(LocalDateTime(2014, 12, 31, 3, 4).getYear()).toBe(2014);
        });
    });

    describe("withYear", function () {
        it("should return a new LocalDateTime with the given year", function () {
            expect(LocalDateTime(2004, 2, 29, 3, 4, 5, 6).withYear(2008)).toEq(LocalDateTime(2008, 2, 29, 3, 4, 5, 6));
            expect(LocalDateTime(2004, 2, 29, 3, 4).withYear(2005)).toEq(LocalDateTime(2005, 2, 28, 3, 4));
        });
    });

    describe("plusMillis", function () {
        it("should return a new LocalDateTime at the given amount of millis after", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusMillis(1)).toEq(LocalDateTime(2000, 1, 2, 3, 4, 5, 7));
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusMillis(1000)).toEq(LocalDateTime(2000, 1, 2, 3, 4, 6, 6));
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusMillis(60 * 1000)).toEq(LocalDateTime(2000, 1, 2, 3, 5, 5, 6));
        });
    });

    describe("minusMillis", function () {
        it("should return a new LocalDateTime at the given amount of millis before", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusMillis(1)).toEq(LocalDateTime(2000, 1, 2, 3, 4, 5, 5));
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusMillis(1000)).toEq(LocalDateTime(2000, 1, 2, 3, 4, 4, 6));
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusMillis(60 * 1000)).toEq(LocalDateTime(2000, 1, 2, 3, 3, 5, 6));
        });
    });

    describe("plusSeconds", function () {
        it("should return a new LocalDateTime at the given amount of seconds after", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusSeconds(1)).toEq(LocalDateTime(2000, 1, 2, 3, 4, 6, 6));
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusSeconds(61)).toEq(LocalDateTime(2000, 1, 2, 3, 5, 6, 6));
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusSeconds(60 * 60 + 1)).toEq(LocalDateTime(2000, 1, 2, 4, 4, 6, 6));
        });
    });

    describe("minusSeconds", function () {
        it("should return a new LocalDateTime at the given amount of seconds before", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusSeconds(1)).toEq(LocalDateTime(2000, 1, 2, 3, 4, 4, 6));
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusSeconds(61)).toEq(LocalDateTime(2000, 1, 2, 3, 3, 4, 6));
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusSeconds(60 * 60 + 1)).toEq(LocalDateTime(2000, 1, 2, 2, 4, 4, 6));
        });
    });

    describe("plusMinutes", function () {
        it("should return a new LocalDateTime at the given amount of minutes after", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusMinutes(1)).toEq(LocalDateTime(2000, 1, 2, 3, 5, 5, 6));
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusMinutes(61)).toEq(LocalDateTime(2000, 1, 2, 4, 5, 5, 6));
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusMinutes(60 * 24 + 1)).toEq(LocalDateTime(2000, 1, 3, 3, 5, 5, 6));
        });
    });

    describe("minusMinutes", function () {
        it("should return a new LocalDateTime at the given amount of minutes before", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusMinutes(1)).toEq(LocalDateTime(2000, 1, 2, 3, 3, 5, 6));
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusMinutes(61)).toEq(LocalDateTime(2000, 1, 2, 2, 3, 5, 6));
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusMinutes(60 * 24 + 1)).toEq(LocalDateTime(2000, 1, 1, 3, 3, 5, 6));
        });
    });

    describe("plusHours", function () {
        it("should return a new LocalDateTime at the given amount of hours after", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusHours(1)).toEq(LocalDateTime(2000, 1, 2, 4, 4, 5, 6));
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).plusHours(25)).toEq(LocalDateTime(2000, 1, 3, 4, 4, 5, 6));
        });
    });

    describe("minusHours", function () {
        it("should return a new LocalDateTime at the given amount of hours before", function () {
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusHours(1)).toEq(LocalDateTime(2000, 1, 2, 2, 4, 5, 6));
            expect(LocalDateTime(2000, 1, 2, 3, 4, 5, 6).minusHours(25)).toEq(LocalDateTime(2000, 1, 1, 2, 4, 5, 6));
        });
    });

    describe("plusDays", function () {
        it("should return a new LocalDateTime at the given amount of days after", function () {
            expect(LocalDateTime(2014, 2, 2, 3, 4, 5, 6).plusDays(1)).toEq(LocalDateTime(2014, 2, 3, 3, 4, 5, 6));
            expect(LocalDateTime(2014, 2, 2, 3, 4).plusDays(30)).toEq(LocalDateTime(2014, 3, 4, 3, 4));
            expect(LocalDateTime(2014, 11, 29, 3, 4).plusDays(33)).toEq(LocalDateTime(2015, 1, 1, 3, 4));
        });
    });
    describe("minusDays", function () {
        it("should return a new LocalDateTime at the given amount of days before", function () {
            expect(LocalDateTime(2014, 2, 2, 3, 4, 5, 6).minusDays(1)).toEq(LocalDateTime(2014, 2, 1, 3, 4, 5, 6));
            expect(LocalDateTime(2014, 2, 2, 3, 4).minusDays(2)).toEq(LocalDateTime(2014, 1, 31, 3, 4));
            expect(LocalDateTime(2014, 2, 2, 3, 4).minusDays(33)).toEq(LocalDateTime(2013, 12, 31, 3, 4));
        });
    });

    describe("plusWeeks", function () {
        it("should return a new LocalDateTime at 7 times the given amount of days after", function () {
            expect(LocalDateTime(2014, 2, 9, 3, 4, 5, 6).plusWeeks(1)).toEq(LocalDateTime(2014, 2, 16, 3, 4, 5, 6));
            expect(LocalDateTime(2014, 2, 9, 3, 4).plusWeeks(3)).toEq(LocalDateTime(2014, 3, 2, 3, 4));
            expect(LocalDateTime(2014, 11, 29, 3, 4).plusWeeks(5)).toEq(LocalDateTime(2015, 1, 3, 3, 4));
        });
    });

    describe("minusWeeks", function () {
        it("should return a new LocalDateTime at 7 times the given amount of days before", function () {
            expect(LocalDateTime(2014, 2, 9, 3, 4, 5, 6).minusWeeks(1)).toEq(LocalDateTime(2014, 2, 2, 3, 4, 5, 6));
            expect(LocalDateTime(2014, 2, 9, 3, 4).minusWeeks(2)).toEq(LocalDateTime(2014, 1, 26, 3, 4));
            expect(LocalDateTime(2014, 2, 9, 3, 4).minusWeeks(6)).toEq(LocalDateTime(2013, 12, 29, 3, 4));
        });
    });

    describe("plusMonths", function () {
        it("should return a new LocalDateTime at the given amount of months after", function () {
            expect(LocalDateTime(2014, 1, 29, 3, 4, 5, 6).plusMonths(2)).toEq(LocalDateTime(2014, 3, 29, 3, 4, 5, 6));
            expect(LocalDateTime(2014, 1, 29, 3, 4).plusMonths(1)).toEq(LocalDateTime(2014, 2, 28, 3, 4));
            expect(LocalDateTime(2016, 1, 29, 3, 4).plusMonths(1)).toEq(LocalDateTime(2016, 2, 29, 3, 4));
        });
    });
    describe("minusMonths", function () {
        it("should return a new LocalDateTime at the given amount of months before", function () {
            expect(LocalDateTime(2014, 3, 29, 3, 4, 5, 6).minusMonths(1)).toEq(LocalDateTime(2014, 2, 28, 3, 4, 5, 6));
            expect(LocalDateTime(2014, 3, 29, 3, 4).minusMonths(2)).toEq(LocalDateTime(2014, 1, 29, 3, 4));
            expect(LocalDateTime(2016, 3, 29, 3, 4).minusMonths(1)).toEq(LocalDateTime(2016, 2, 29, 3, 4));
        });
    });

    describe("plusYears", function () {
        it("should return a new LocalDateTime at the given amount of years after", function () {
            expect(LocalDateTime(2014, 2, 9, 3, 4, 5, 6).plusYears(1)).toEq(LocalDateTime(2015, 2, 9, 3, 4, 5, 6));
            expect(LocalDateTime(2016, 2, 29, 3, 4).plusYears(1)).toEq(LocalDateTime(2017, 2, 28, 3, 4));
            expect(LocalDateTime(2016, 2, 29, 3, 4).plusYears(4)).toEq(LocalDateTime(2020, 2, 29, 3, 4));
        });
    });

    describe("minusYears", function () {
        it("should return a new LocalDateTime at the given amount of years before", function () {
            expect(LocalDateTime(2014, 2, 9, 3, 4, 5, 6).minusYears(1)).toEq(LocalDateTime(2013, 2, 9, 3, 4, 5, 6));
            expect(LocalDateTime(2016, 2, 29, 3, 4).minusYears(1)).toEq(LocalDateTime(2015, 2, 28, 3, 4));
            expect(LocalDateTime(2016, 2, 29, 3, 4).minusYears(4)).toEq(LocalDateTime(2012, 2, 29, 3, 4));
        });
    });

    describe("toDate", function () {
        it("should return a Date with the same fields as the LocalDateTime", function () {
            expect(LocalDateTime(2014, 2, 9, 3, 4, 5, 6).toDate()).toEqual(stdDate(2014, 1, 9, 3, 4, 5, 6));
        });
    });

    describe("toString_", function () {
        it("should return the LocalDateTime in ISO format (yyyy-MM-dd'T'HH:mm:ss.SSS)", function () {
            expect(LocalDateTime(2014, 2, 9, 3, 4, 5, 6).toString()).toBe("2014-02-09T03:04:05.006");
        });
        it("should return the LocalDateTime in the given format", function () {
            expect(LocalDateTime(2014, 2, 9, 3, 4).toString("dd.MM.yyyy")).toBe("09.02.2014");
        });
    });
});