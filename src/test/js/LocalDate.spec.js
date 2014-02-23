/*global timeZone,LocalDate,DateTimeUtils,littleBefore,almostDayAfter,goodDayAfter,matchers,jodajs,beforeEach,describe,it,expect,window*/
describe("LocalDate", function () {
    var t2014_2_3 = new Date(2014, 1, 3).getTime();

    it("should be usable with or without 'new'", function () {
        var d1, d2;
        d1 = new LocalDate(2000, 1, 1);
        expect(window.date).toBeUndefined();

        d2 = LocalDate(2000, 1, 1);
        expect(window.date).toBeUndefined();

        expect(d1).toEq(d2);
    });

    describe("fromDate", function () {
        it("should construct a LocalDate from the given Date in the current timezone", function () {
            expect(LocalDate.fromDate(new Date(littleBefore(t2014_2_3)))).toEq(LocalDate(2014, 2, 2));
            expect(LocalDate.fromDate(new Date(t2014_2_3))).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromDate(new Date(almostDayAfter(t2014_2_3)))).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromDate(new Date(goodDayAfter(t2014_2_3)))).toEq(LocalDate(2014, 2, 4));
        });
    });

    describe("fromDateUTC", function () {
        it("should construct a LocalDate from the given Date in UTC", function () {
            expect(LocalDate.fromDateUTC(new Date(littleBefore(t2014_2_3) - timeZone))).toEq(LocalDate(2014, 2, 2));
            expect(LocalDate.fromDateUTC(new Date(t2014_2_3 - timeZone))).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromDateUTC(new Date(almostDayAfter(t2014_2_3) - timeZone))).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromDateUTC(new Date(goodDayAfter(t2014_2_3) - timeZone))).toEq(LocalDate(2014, 2, 4));

        });
    });

    describe("fromMillis", function () {
        it("should construct a LocalDate from the given millis in the current timezone", function () {
            expect(LocalDate.fromMillis(littleBefore(t2014_2_3))).toEq(LocalDate(2014, 2, 2));
            expect(LocalDate.fromMillis(t2014_2_3)).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromMillis(almostDayAfter(t2014_2_3))).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromMillis(goodDayAfter(t2014_2_3))).toEq(LocalDate(2014, 2, 4));
        });
    });

    describe("fromMillisUTC", function () {
        it("should construct a LocalDate from the given millis in UTC", function () {
            expect(LocalDate.fromMillisUTC(littleBefore(t2014_2_3) - timeZone)).toEq(LocalDate(2014, 2, 2));
            expect(LocalDate.fromMillisUTC(t2014_2_3 - timeZone)).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromMillisUTC(almostDayAfter(t2014_2_3) - timeZone)).toEq(LocalDate(2014, 2, 3));
            expect(LocalDate.fromMillisUTC(goodDayAfter(t2014_2_3) - timeZone)).toEq(LocalDate(2014, 2, 4));

        });
    });

    describe("now", function () {
        it("should construct a LocalDate from now in the current timezone", function () {
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

    describe("nowUTC", function () {
        it("should construct a LocalDate from now in UTC", function () {
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

    describe("toString_", function () {
        it("should return the LocalDate in the given format and language", function () {
            expect(LocalDate(2014, 12, 9).toString("dd.MMM.yyyy", "de")).toBe("09.Dez.2014");
        });
    });

});