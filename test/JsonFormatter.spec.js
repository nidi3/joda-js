/*global jodajs,describe,it,expect*/
describe('JsonFormatter', function () {
    var JsonFormatter = jodajs.JsonFormatter,
        LocalDateTime = jodajs.LocalDateTime,
        LocalDate = jodajs.LocalDate,
        LocalTime = jodajs.LocalTime;

    describe('beforeStringify', function () {
        it('should not change properties whose type is not LocalDate, LocalDateTime, LocalTime', function () {
            expect(JsonFormatter().beforeStringify({})).toEqual({});
            expect(JsonFormatter().beforeStringify({a: null, b: undefined, c: new Date(42), d: 'bla', e: 5, f: true, g: {h: 5}, i: [1, 2]}))
                .toEqual({a: null, b: undefined, c: new Date(42), d: 'bla', e: 5, f: true, g: {h: 5}, i: [1, 2]});
        });

        it('should convert properties whose type is LocalDate, LocalDateTime, LocalTime to strings of the given format', function () {
            expect(JsonFormatter().beforeStringify({a: LocalDate(2000, 1, 2), b: {c: LocalDateTime(2000, 1, 2, 3, 4, 5, 6), d: 5}, e: [LocalTime(1, 2, 3, 4), 5]}))
                .toEqual({a: '2000-01-02', b: {c: '2000-01-02T03:04:05.006', d: 5}, e: ['01:02:03.004', 5]});
        });
    });


});