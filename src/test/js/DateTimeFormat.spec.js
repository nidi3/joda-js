/*global timeZone,jodajs,DateTimeFormat,LocalDateTime,LocalTime,LocalDate,beforeEach,describe,it,expect*/
describe("DateTimeFormat", function () {
    describe("withLanguage", function () {
        it("should set the language for text output", function () {
            expect(DateTimeFormat.forPattern("E").withLanguage("en").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("Sun");
            expect(DateTimeFormat.forPattern("E").withLanguage("de").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("So");
        });
    });

    describe("withTimeZoneOffset", function () {
        it("should set the offset to be used", function () {
            expect(DateTimeFormat.forPattern("H").print(LocalTime(12, 0))).toBe("12");
            expect(DateTimeFormat.forPattern("H").withTimeZoneOffset(0).print(LocalTime(12, 0))).toBe("" + (12 + timeZone / (60 * 60 * 1000)));
            expect(DateTimeFormat.forPattern("H").withTimeZoneOffset(1).print(LocalTime(12, 0))).toBe("" + (11 + timeZone / (60 * 60 * 1000)));

            expect(DateTimeFormat.forPattern("H").print(LocalDateTime(2000, 1, 2, 12, 0))).toBe("12");
            expect(DateTimeFormat.forPattern("H").withTimeZoneOffset(0).print(LocalDateTime(2000, 1, 2, 12, 0))).toBe("" + (12 + timeZone / (60 * 60 * 1000)));
            expect(DateTimeFormat.forPattern("H").withTimeZoneOffset(1).print(LocalDateTime(2000, 1, 2, 12, 0))).toBe("" + (11 + timeZone / (60 * 60 * 1000)));
        });
        it("should not affect LocalDate", function () {
            expect(DateTimeFormat.forPattern("yyyy-MM-dd").withTimeZoneOffset(25).print(LocalDate(2000, 1, 1))).toBe("2000-01-01");
        });
    });


    describe("unknown letter", function () {
        it("should throw an Error", function () {
            expect(function () {
                DateTimeFormat.forPattern("b");
            }).toThrow();
        });
    });

    describe("Z", function () {
        it("should print time zone offset", function () {
            expect(DateTimeFormat.forPattern("Z").print(LocalDate(2010, 1, 3))).toMatch("\\+|-\\d{4}");
            expect(DateTimeFormat.forPattern("ZZ").print(LocalDate(2010, 1, 3))).toMatch("\\+|-\\d{2}:\\d{2}");
            expect(DateTimeFormat.forPattern("ZZZ").print(LocalDate(2010, 1, 3))).toBe("");
        });
    });

    describe("z", function () {
        it("should print time zone", function () {
            expect(DateTimeFormat.forPattern("z").print(LocalDate(2010, 1, 3))).toMatch("\\w{3}");
            expect(DateTimeFormat.forPattern("zz").print(LocalDate(2010, 1, 3))).toMatch("\\w{3}");
            expect(DateTimeFormat.forPattern("zzz").print(LocalDate(2010, 1, 3))).toMatch("\\w{3}");
            expect(DateTimeFormat.forPattern("zzzz").print(LocalDate(2010, 1, 3))).toBe("");
        });
    });
});