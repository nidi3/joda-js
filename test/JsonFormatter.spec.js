/*global jodajs,timeZone,describe,it,expect*/
describe('JsonFormatter', function () {
    var JsonFormatter = jodajs.JsonFormatter,
        DateTimeFormat = jodajs.DateTimeFormat,
        LocalDateTime = jodajs.LocalDateTime,
        LocalDate = jodajs.LocalDate,
        LocalTime = jodajs.LocalTime;

    describe('beforeStringify', function () {
        it('should not change properties whose type is not LocalDate, LocalDateTime, LocalTime', function () {
            expect(JsonFormatter().beforeStringify({})).toEqual({});
            var obj = {a: null, b: undefined, c: new Date(42), d: 'bla', e: 5, f: true, g: {h: 5}, i: [1, 2]};
            expect(JsonFormatter().beforeStringify(obj)).toEqual({a: null, b: undefined, c: new Date(42), d: 'bla', e: 5, f: true, g: {h: 5}, i: [1, 2]});
        });

        it('should convert properties whose type is LocalDate, LocalDateTime, LocalTime to strings of default format', function () {
            var t = LocalTime(12, 2, 3, 4),
                tp = DateTimeFormat.forPattern("HH:mm:ss.SSS"),
                dt = LocalDateTime(2000, 1, 2, 12, 4, 5, 6),
                dtp = DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss.SSS"),
                obj = {a: LocalDate(2000, 1, 2), b: {c: dt, d: 5}, e: [t, 5]};
            expect(JsonFormatter().beforeStringify(obj)).toEqual({a: '2000-01-02', b: {c: '2000-01-02T12:04:05.006', d: 5}, e: ['12:02:03.004', 5]});
            expect(JsonFormatter().beforeStringify(obj, true)).toEqual({a: '2000-01-02', b: {c: dtp.print(dt.plusMillis(timeZone)), d: 5}, e: [tp.print(t.plusMillis(timeZone)), 5]});
        });

        it('should convert properties whose type is LocalDate, LocalDateTime, LocalTime to strings of given format', function () {
            var t = LocalTime(12, 2, 3, 4),
                tp = DateTimeFormat.forPattern("HH:mm"),
                dt = LocalDateTime(2000, 1, 2, 12, 4, 5, 6),
                dtp = DateTimeFormat.forPattern("dd.MM.yyyy HH:mm"),
                jf = JsonFormatter({LocalDate: 'dd.MM.yyyy', LocalTime: 'HH:mm', LocalDateTime: 'dd.MM.yyyy HH:mm'}),
                obj = {a: LocalDate(2000, 1, 2), b: {c: LocalDateTime(2000, 1, 2, 12, 4, 5, 6), d: 5}, e: [LocalTime(12, 2, 3, 4), 5]};
            expect(jf.beforeStringify(obj)).toEqual({a: '02.01.2000', b: {c: '02.01.2000 12:04', d: 5}, e: ['12:02', 5]});
            expect(jf.beforeStringify(obj, true)).toEqual({a: '02.01.2000', b: {c: dtp.print(dt.plusMillis(timeZone)), d: 5}, e: [tp.print(t.plusMillis(timeZone)), 5]});
        });
    });


});