/*global window,LocalDateTime,DateTimeUtils,timeZone,littleBefore,almostDayAfter,goodDayAfter,matchers,jodajs,beforeEach,describe,it,expect*/
describe("LocalDateTime", function () {
    var t2014_2_3 = new Date(2014, 1, 3, 5, 6, 7, 100).getTime();

    it("should be usable with or without 'new'", function () {
        var d1, d2;
        d1 = new LocalDateTime(2000, 1, 1);
        expect(window.date).toBeUndefined();

        d2 = LocalDateTime(2000, 1, 1);
        expect(window.date).toBeUndefined();

        expect(d1).toEq(d2);
    });

    describe("fromDate", function () {
        it("should construct a LocalDateTime from the given Date in the current timezone", function () {
            expect(LocalDateTime.fromDate(new Date(littleBefore(t2014_2_3)))).toEq(LocalDateTime(2014, 2, 3, 5, 6, 7, 90));
            expect(LocalDateTime.fromDate(new Date(t2014_2_3))).toEq(LocalDateTime(2014, 2, 3, 5, 6, 7, 100));
            expect(LocalDateTime.fromDate(new Date(almostDayAfter(t2014_2_3)))).toEq(LocalDateTime(2014, 2, 4, 5, 6, 7, 90));
            expect(LocalDateTime.fromDate(new Date(goodDayAfter(t2014_2_3)))).toEq(LocalDateTime(2014, 2, 4, 5, 6, 7, 110));
        });
    });

    describe("fromDateUTC", function () {
        it("should construct a LocalDateTime from the given Date in UTC", function () {
            expect(LocalDateTime.fromDateUTC(new Date(littleBefore(t2014_2_3) - timeZone))).toEq(LocalDateTime(2014, 2, 3, 5, 6, 7, 90));
            expect(LocalDateTime.fromDateUTC(new Date(t2014_2_3 - timeZone))).toEq(LocalDateTime(2014, 2, 3, 5, 6, 7, 100));
            expect(LocalDateTime.fromDateUTC(new Date(almostDayAfter(t2014_2_3) - timeZone))).toEq(LocalDateTime(2014, 2, 4, 5, 6, 7, 90));
            expect(LocalDateTime.fromDateUTC(new Date(goodDayAfter(t2014_2_3) - timeZone))).toEq(LocalDateTime(2014, 2, 4, 5, 6, 7, 110));

        });
    });

    describe("fromMillis", function () {
        it("should construct a LocalDateTime from the given millis in the current timezone", function () {
            expect(LocalDateTime.fromMillis(littleBefore(t2014_2_3))).toEq(LocalDateTime(2014, 2, 3, 5, 6, 7, 90));
            expect(LocalDateTime.fromMillis(t2014_2_3)).toEq(LocalDateTime(2014, 2, 3, 5, 6, 7, 100));
            expect(LocalDateTime.fromMillis(almostDayAfter(t2014_2_3))).toEq(LocalDateTime(2014, 2, 4, 5, 6, 7, 90));
            expect(LocalDateTime.fromMillis(goodDayAfter(t2014_2_3))).toEq(LocalDateTime(2014, 2, 4, 5, 6, 7, 110));
        });
    });

    describe("fromMillisUTC", function () {
        it("should construct a LocalDateTime from the given millis in UTC", function () {
            expect(LocalDateTime.fromMillisUTC(littleBefore(t2014_2_3) - timeZone)).toEq(LocalDateTime(2014, 2, 3, 5, 6, 7, 90));
            expect(LocalDateTime.fromMillisUTC(t2014_2_3 - timeZone)).toEq(LocalDateTime(2014, 2, 3, 5, 6, 7, 100));
            expect(LocalDateTime.fromMillisUTC(almostDayAfter(t2014_2_3) - timeZone)).toEq(LocalDateTime(2014, 2, 4, 5, 6, 7, 90));
            expect(LocalDateTime.fromMillisUTC(goodDayAfter(t2014_2_3) - timeZone)).toEq(LocalDateTime(2014, 2, 4, 5, 6, 7, 110));

        });
    });

    describe("now", function () {
        it("should construct a LocalDateTime from now in the current timezone", function () {
            DateTimeUtils.setCurrentMillisFixed(littleBefore(t2014_2_3));
            expect(LocalDateTime.now()).toEq(LocalDateTime(2014, 2, 3, 5, 6, 7, 90));

            DateTimeUtils.setCurrentMillisFixed(t2014_2_3);
            expect(LocalDateTime.now()).toEq(LocalDateTime(2014, 2, 3, 5, 6, 7, 100));

            DateTimeUtils.setCurrentMillisFixed(almostDayAfter(t2014_2_3));
            expect(LocalDateTime.now()).toEq(LocalDateTime(2014, 2, 4, 5, 6, 7, 90));

            DateTimeUtils.setCurrentMillisFixed(goodDayAfter(t2014_2_3));
            expect(LocalDateTime.now()).toEq(LocalDateTime(2014, 2, 4, 5, 6, 7, 110));
        });
    });

    describe("nowUTC", function () {
        it("should construct a LocalDateTime from now in UTC", function () {
            DateTimeUtils.setCurrentMillisFixed(littleBefore(t2014_2_3) - timeZone);
            expect(LocalDateTime.nowUTC()).toEq(LocalDateTime(2014, 2, 3, 5, 6, 7, 90));

            DateTimeUtils.setCurrentMillisFixed(t2014_2_3 - timeZone);
            expect(LocalDateTime.nowUTC()).toEq(LocalDateTime(2014, 2, 3, 5, 6, 7, 100));

            DateTimeUtils.setCurrentMillisFixed(almostDayAfter(t2014_2_3) - timeZone);
            expect(LocalDateTime.nowUTC()).toEq(LocalDateTime(2014, 2, 4, 5, 6, 7, 90));

            DateTimeUtils.setCurrentMillisFixed(goodDayAfter(t2014_2_3) - timeZone);
            expect(LocalDateTime.nowUTC()).toEq(LocalDateTime(2014, 2, 4, 5, 6, 7, 110));
        });
    });

    describe("toString_", function () {
        it("should return the LocalDateTime in the given format and language", function () {
            expect(LocalDateTime(2014, 12, 9, 3, 4).toString("dd.MMM.yyyy", "de")).toBe("09.Dez.2014");
        });
    });
});