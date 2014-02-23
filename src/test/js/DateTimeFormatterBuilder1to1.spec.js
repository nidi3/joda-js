/*global window,matchers,jodajs,DateTimeFormatterBuilder,LocalDateTime,LocalTime,LocalDate,beforeEach,describe,it,expect*/
describe("DateTimeFormatterBuilder", function () {

    describe("appendFractionOfSecond", function () {
        it("should print fractions of second", function () {
            expect(DateTimeFormatterBuilder().appendFractionOfSecond(1, 1).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe("0");
            expect(DateTimeFormatterBuilder().appendFractionOfSecond(1, 2).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe("01");
            expect(DateTimeFormatterBuilder().appendFractionOfSecond(1, 3).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe("012");
            expect(DateTimeFormatterBuilder().appendFractionOfSecond(1, 4).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe("012");

            expect(DateTimeFormatterBuilder().appendFractionOfSecond(2, 2).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe("01");
            expect(DateTimeFormatterBuilder().appendFractionOfSecond(2, 3).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe("012");
            expect(DateTimeFormatterBuilder().appendFractionOfSecond(2, 4).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe("012");

            expect(DateTimeFormatterBuilder().appendFractionOfSecond(4, 4).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe("0120");
        });
        it("should parse fractions of second", function () {
            // expect(DateTimeFormatterBuilder().appendFractionOfSecond(1, 1).toParser().parse("0")).toEq("0");
        });
    });

    describe("appendMillisOfSecond", function () {
        it("should add a millis of second field", function () {
            expect(DateTimeFormatterBuilder().appendMillisOfSecond(1).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe("12");
            expect(DateTimeFormatterBuilder().appendMillisOfSecond(2).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe("12");
            expect(DateTimeFormatterBuilder().appendMillisOfSecond(3).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe("012");
            expect(DateTimeFormatterBuilder().appendMillisOfSecond(4).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe("0012");
        });
    });

    describe("secondOfMinute", function () {
        it("should add a second of minute field", function () {
            expect(DateTimeFormatterBuilder().appendSecondOfMinute(2).toFormatter()
                .print(LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe("05");
        });
    });

    describe("minuteOfHour", function () {
        it("should add a minute of hour field", function () {
            expect(DateTimeFormatterBuilder().appendMinuteOfHour(2).toFormatter()
                .print(LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe("04");
        });
    });

    describe("hourOfDay", function () {
        it("should add a hour of day field", function () {
            expect(DateTimeFormatterBuilder().appendHourOfDay(2).toFormatter().
                print(LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe("03");
        });
    });

    describe("dayOfWeek", function () {
        it("should add a day of week field", function () {
            expect(DateTimeFormatterBuilder().appendDayOfWeek(2).toFormatter().
                print(LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe("07");
        });
    });

    describe("dayOfMonth", function () {
        it("should add a day of month field", function () {
            expect(DateTimeFormatterBuilder().appendDayOfMonth(2).toFormatter().
                print(LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe("02");
        });
    });

    describe("dayOfYear", function () {
        it("should add a day of year field", function () {
            expect(DateTimeFormatterBuilder().appendDayOfYear(4).toFormatter().
                print(LocalDateTime(2001, 12, 30, 3, 4, 5, 6))).toBe("0364");
        });
    });

    describe("monthOfYear", function () {
        it("should add a month of year field", function () {
            expect(DateTimeFormatterBuilder().appendMonthOfYear(2).toFormatter().
                print(LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe("01");
        });
    });

    describe("weekOfWeekyear", function () {
        it("should add a week of weekyear field", function () {
            expect(DateTimeFormatterBuilder().appendWeekOfWeekyear(2).toFormatter()
                .print(LocalDate(2010, 1, 3))).toBe("53");
            expect(DateTimeFormatterBuilder().appendWeekOfWeekyear(2).toFormatter()
                .print(LocalDate(2010, 1, 4))).toBe("01");
        });
    });

    describe("weekyear", function () {
        it("should add a weekyear field", function () {
            expect(DateTimeFormatterBuilder().appendWeekyear(4, 4).toFormatter()
                .print(LocalDate(2010, 1, 3))).toBe("2009");
            expect(DateTimeFormatterBuilder().appendWeekyear(4, 4).toFormatter()
                .print(LocalDate(2010, 1, 4))).toBe("2010");
        });
    });


    describe("year", function () {
        it("should add a year field", function () {
            expect(DateTimeFormatterBuilder().appendYear(1, 4).toFormatter()
                .print(LocalDate(2014, 1, 1))).toBe("2014");
            expect(DateTimeFormatterBuilder().appendYear(1, 4).toFormatter()
                .print(LocalDateTime(2016, 1, 1, 2, 3, 4, 5))).toBe("2016");
        });

        it("should pad left with 0", function () {
            expect(DateTimeFormatterBuilder().appendYear(6, 6).toFormatter()
                .print(LocalDate(2014, 1, 1))).toBe("002014");
        });
    });

    describe("literal", function () {
        it("should add string literal", function () {
            expect(DateTimeFormatterBuilder().appendLiteral("hula").toFormatter()
                .print(LocalDate(2014, 1, 1))).toBe("hula");
        });
    });

    describe("concatenated", function () {
        it("should concatenate all formatters", function () {
            expect(DateTimeFormatterBuilder()
                .appendYear(4, 4).appendLiteral("-")
                .appendMonthOfYear(2).appendLiteral("-")
                .appendDayOfMonth(2).toFormatter()
                .print(LocalDate(2014, 1, 2))).toBe("2014-01-02");
        });
    });


});