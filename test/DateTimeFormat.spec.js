/*global matchers,jodajs,beforeEach,describe,it,expect*/
describe('DateTimeFormat', function () {
    var DateTimeFormat = jodajs.DateTimeFormat,
        LocalDateTime = jodajs.LocalDateTime,
        LocalDate = jodajs.LocalDate;

    describe('S', function () {
        it('should print millis of second', function () {
            expect(DateTimeFormat.forPattern('S').print(LocalDateTime(2000, 1, 2, 3, 4, 5, 123))).toBe('1');
        });
    });


});