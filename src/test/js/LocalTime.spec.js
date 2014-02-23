/*global timeZone,LocalTime,DateTimeUtils,littleBefore,almostDayAfter,goodDayAfter,matchers,jodajs,beforeEach,describe,it,expect,window*/
describe("LocalTime", function () {
    var t10_15 = new Date(2014, 1, 3, 10, 15, 2, 100).getTime();


    it("should be usable with or without 'new'", function () {
        var d1, d2;
        d1 = new LocalTime(10, 15);
        expect(window.date).toBeUndefined();

        d2 = LocalTime(10, 15);
        expect(window.date).toBeUndefined();

        expect(d1).toEq(d2);
    });

    describe("fromDate", function () {
        it("should construct a LocalTime from the given Date in the current timezone", function () {
            expect(LocalTime.fromDate(new Date(littleBefore(t10_15)))).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromDate(new Date(t10_15))).toEq(LocalTime(10, 15, 2, 100));
            expect(LocalTime.fromDate(new Date(almostDayAfter(t10_15)))).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromDate(new Date(goodDayAfter(t10_15)))).toEq(LocalTime(10, 15, 2, 110));
        });
    });

    describe("fromDateUTC", function () {
        it("should construct a LocalTime from the given Date in UTC", function () {
            expect(LocalTime.fromDateUTC(new Date(littleBefore(t10_15) - timeZone))).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromDateUTC(new Date(t10_15 - timeZone))).toEq(LocalTime(10, 15, 2, 100));
            expect(LocalTime.fromDateUTC(new Date(almostDayAfter(t10_15 - timeZone)))).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromDateUTC(new Date(goodDayAfter(t10_15 - timeZone)))).toEq(LocalTime(10, 15, 2, 110));
        });
    });

    describe("fromMillis", function () {
        it("should construct a LocalTime from the given millis in the current timezone", function () {
            expect(LocalTime.fromMillis(littleBefore(t10_15))).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromMillis(t10_15)).toEq(LocalTime(10, 15, 2, 100));
            expect(LocalTime.fromMillis(almostDayAfter(t10_15))).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromMillis(goodDayAfter(t10_15))).toEq(LocalTime(10, 15, 2, 110));
        });
    });

    describe("fromMillisUTC", function () {
        it("should construct a LocalTime from the given millis in UTC", function () {
            expect(LocalTime.fromMillisUTC(littleBefore(t10_15) - timeZone)).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromMillisUTC(t10_15 - timeZone)).toEq(LocalTime(10, 15, 2, 100));
            expect(LocalTime.fromMillisUTC(almostDayAfter(t10_15) - timeZone)).toEq(LocalTime(10, 15, 2, 90));
            expect(LocalTime.fromMillisUTC(goodDayAfter(t10_15) - timeZone)).toEq(LocalTime(10, 15, 2, 110));
        });
    });

    describe("now", function () {
        it("should construct a LocalTime from now in the current timezone", function () {
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

    describe("nowUTC", function () {
        it("should construct a LocalTime from now in UTC", function () {
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


    describe("toDate", function () {
        it("should return a Date with the same fields as the LocalTime (date fields undefined)", function () {
            expect(LocalTime(3, 4, 5, 6).toDate().getHours()).toEqual(new Date(2000, 1, 1, 3, 4, 5, 6).getHours());
            expect(LocalTime(3, 4, 5, 6).toDate().getMinutes()).toEqual(new Date(2000, 1, 1, 3, 4, 5, 6).getMinutes());
            expect(LocalTime(3, 4, 5, 6).toDate().getSeconds()).toEqual(new Date(2000, 1, 1, 3, 4, 5, 6).getSeconds());
            expect(LocalTime(3, 4, 5, 6).toDate().getMilliseconds()).toEqual(new Date(2000, 1, 1, 3, 4, 5, 6).getMilliseconds());
        });
    });
});