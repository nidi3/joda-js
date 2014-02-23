/*global window,matchers,jodajs,DateTimeFormatterBuilder,LocalDateTime,LocalTime,LocalDate,beforeEach,describe,it,expect*/
describe("DateTimeFormatterBuilder", function () {
    describe("init", function () {
        it("should be usable with or without 'new'", function () {
            new DateTimeFormatterBuilder();
            expect(window.parsers).toBeUndefined();

            DateTimeFormatterBuilder();
            expect(window.parsers).toBeUndefined();
        });
    });
});