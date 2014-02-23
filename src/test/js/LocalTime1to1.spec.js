/*global timeZone,LocalTime,DateTimeUtils,littleBefore,almostDayAfter,goodDayAfter,matchers,jodajs,beforeEach,describe,it,expect,window*/
describe("LocalTime", function () {

    describe("init", function () {
        it("should construct a LocalTime with given fields", function () {
            expect(LocalTime(10, 15, 2, 3).getHourOfDay()).toBe(10);
            expect(LocalTime(10, 15, 2, 3).getMinuteOfHour()).toBe(15);
            expect(LocalTime(10, 15, 2, 3).getSecondOfMinute()).toBe(2);
            expect(LocalTime(10, 15, 2, 3).getMillisOfSecond()).toBe(3);
        });

        it("should construct a LocalTime with given fields, not given time fields should be 0", function () {
            expect(LocalTime(10, 15).getMillisOfSecond()).toBe(0);
            expect(LocalTime(10, 15).getSecondOfMinute()).toBe(0);
        });
    });

    describe("isEqual", function () {
        it("should return true if all fields are equal", function () {
            expect(LocalTime(10, 15, 2, 3).isEqual(LocalTime(10, 15, 2, 3))).toBeTruthy();
            expect(LocalTime(10, 15, 2, 3).isEqual(LocalTime(10, 15, 2, 4))).toBeFalsy();
            expect(LocalTime(10, 15, 2, 3).isEqual(LocalTime(10, 15, 3, 3))).toBeFalsy();
            expect(LocalTime(10, 15, 2, 3).isEqual(LocalTime(10, 16, 2, 3))).toBeFalsy();
            expect(LocalTime(10, 15, 2, 3).isEqual(LocalTime(11, 15, 2, 3))).toBeFalsy();
        });
    });

    describe("isBefore", function () {
        it("should return true if a LocalTime is before another", function () {
            expect(LocalTime(10, 15, 2, 3).isBefore(LocalTime(10, 15, 2, 4))).toBeTruthy();
            expect(LocalTime(10, 15, 2, 3).isBefore(LocalTime(10, 15, 2, 3))).toBeFalsy();
            expect(LocalTime(10, 15, 2, 3).isBefore(LocalTime(10, 15, 1, 3))).toBeFalsy();
            expect(LocalTime(10, 15, 2, 3).isBefore(LocalTime(10, 14, 1, 3))).toBeFalsy();
            expect(LocalTime(10, 15, 2, 3).isBefore(LocalTime(9, 15, 1, 3))).toBeFalsy();
        });
    });

    describe("isAfter", function () {
        it("should return true if a LocalTime is after another", function () {
            expect(LocalTime(10, 15, 2, 3).isAfter(LocalTime(10, 15, 2, 2))).toBeTruthy();
            expect(LocalTime(10, 15, 2, 3).isAfter(LocalTime(10, 15, 2, 3))).toBeFalsy();
            expect(LocalTime(10, 15, 2, 3).isAfter(LocalTime(10, 15, 3, 3))).toBeFalsy();
            expect(LocalTime(10, 15, 2, 3).isAfter(LocalTime(10, 16, 2, 3))).toBeFalsy();
            expect(LocalTime(10, 15, 2, 3).isAfter(LocalTime(11, 15, 2, 3))).toBeFalsy();
        });
    });

    describe("getMillisOfSecond", function () {
        it("should return millis of second", function () {
            expect(LocalTime(10, 15, 2, 3).getMillisOfSecond()).toBe(3);
        });
    });
    describe("withMillisOfSecond", function () {
        it("should return a new LocalTime with given millis of second", function () {
            expect(LocalTime(10, 15, 2, 3).withMillisOfSecond(100)).toEq(LocalTime(10, 15, 2, 100));
        });
    });

    describe("getSecondOfMinute", function () {
        it("should return second of minute", function () {
            expect(LocalTime(10, 15, 2, 3).getSecondOfMinute()).toBe(2);
        });
    });
    describe("withSecondOfMinute", function () {
        it("should return a new LocalTime with given second of minute", function () {
            expect(LocalTime(10, 15, 2, 3).withSecondOfMinute(20)).toEq(LocalTime(10, 15, 20, 3));
        });
    });

    describe("getMinuteOfHour", function () {
        it("should return minute of hour", function () {
            expect(LocalTime(10, 15, 2, 3).getMinuteOfHour()).toBe(15);
        });
    });
    describe("withMinuteOfHour", function () {
        it("should return a new LocalTime with given minute of hour", function () {
            expect(LocalTime(10, 15, 2, 3).withMinuteOfHour(20)).toEq(LocalTime(10, 20, 2, 3));
        });
    });

    describe("getHourOfDay", function () {
        it("should return hour of day", function () {
            expect(LocalTime(10, 15, 2, 3).getHourOfDay()).toBe(10);
        });
    });
    describe("withHourOfDay", function () {
        it("should return a new LocalTime with given hour of day", function () {
            expect(LocalTime(10, 15, 2, 3).withHourOfDay(20)).toEq(LocalTime(20, 15, 2, 3));
        });
    });

    describe("plusMillis", function () {
        it("should return a new LocalTime at the given amount of millis after", function () {
            expect(LocalTime(3, 4, 5, 6).plusMillis(1)).toEq(LocalTime(3, 4, 5, 7));
            expect(LocalTime(3, 4, 5, 6).plusMillis(1000)).toEq(LocalTime(3, 4, 6, 6));
            expect(LocalTime(3, 4, 5, 6).plusMillis(60 * 1000)).toEq(LocalTime(3, 5, 5, 6));
        });
    });

    describe("minusMillis", function () {
        it("should return a new LocalTime at the given amount of millis before", function () {
            expect(LocalTime(3, 4, 5, 6).minusMillis(1)).toEq(LocalTime(3, 4, 5, 5));
            expect(LocalTime(3, 4, 5, 6).minusMillis(1000)).toEq(LocalTime(3, 4, 4, 6));
            expect(LocalTime(3, 4, 5, 6).minusMillis(60 * 1000)).toEq(LocalTime(3, 3, 5, 6));
        });
    });

    describe("plusSeconds", function () {
        it("should return a new LocalTime at the given amount of seconds after", function () {
            expect(LocalTime(3, 4, 5, 6).plusSeconds(1)).toEq(LocalTime(3, 4, 6, 6));
            expect(LocalTime(3, 4, 5, 6).plusSeconds(61)).toEq(LocalTime(3, 5, 6, 6));
            expect(LocalTime(3, 4, 5, 6).plusSeconds(60 * 60 + 1)).toEq(LocalTime(4, 4, 6, 6));
        });
    });

    describe("minusSeconds", function () {
        it("should return a new LocalTime at the given amount of seconds before", function () {
            expect(LocalTime(3, 4, 5, 6).minusSeconds(1)).toEq(LocalTime(3, 4, 4, 6));
            expect(LocalTime(3, 4, 5, 6).minusSeconds(61)).toEq(LocalTime(3, 3, 4, 6));
            expect(LocalTime(3, 4, 5, 6).minusSeconds(60 * 60 + 1)).toEq(LocalTime(2, 4, 4, 6));
        });
    });

    describe("plusMinutes", function () {
        it("should return a new LocalTime at the given amount of minutes after", function () {
            expect(LocalTime(3, 4, 5, 6).plusMinutes(1)).toEq(LocalTime(3, 5, 5, 6));
            expect(LocalTime(3, 4, 5, 6).plusMinutes(61)).toEq(LocalTime(4, 5, 5, 6));
            expect(LocalTime(3, 4, 5, 6).plusMinutes(60 * 24 + 1)).toEq(LocalTime(3, 5, 5, 6));
        });
    });

    describe("minusMinutes", function () {
        it("should return a new LocalTime at the given amount of minutes before", function () {
            expect(LocalTime(3, 4, 5, 6).minusMinutes(1)).toEq(LocalTime(3, 3, 5, 6));
            expect(LocalTime(3, 4, 5, 6).minusMinutes(61)).toEq(LocalTime(2, 3, 5, 6));
            expect(LocalTime(3, 4, 5, 6).minusMinutes(60 * 24 + 1)).toEq(LocalTime(3, 3, 5, 6));
        });
    });

    describe("plusHours", function () {
        it("should return a new LocalTime at the given amount of hours after", function () {
            expect(LocalTime(3, 4, 5, 6).plusHours(1)).toEq(LocalTime(4, 4, 5, 6));
            expect(LocalTime(3, 4, 5, 6).plusHours(25)).toEq(LocalTime(4, 4, 5, 6));
        });
    });

    describe("minusHours", function () {
        it("should return a new LocalTime at the given amount of hours before", function () {
            expect(LocalTime(3, 4, 5, 6).minusHours(1)).toEq(LocalTime(2, 4, 5, 6));
            expect(LocalTime(3, 4, 5, 6).minusHours(25)).toEq(LocalTime(2, 4, 5, 6));
        });
    });

    describe("toString_", function () {
        it("should return the LocalDate in ISO format (HH:mm:ss.SSS)", function () {
            expect(LocalTime(10, 11, 12, 13).toString()).toBe("10:11:12.013");
        });
        it("should return the LocalTime in the given format", function () {
            expect(LocalTime(10, 11, 12, 13).toString("HH:mm:ss")).toBe("10:11:12");
        });
    });
});