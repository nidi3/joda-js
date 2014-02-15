/*global matchers,jodajs,beforeEach,describe,it,expect*/
describe('DateTimeFormatterBuilder', function () {
    var DateTimeFormatterBuilder = jodajs.DateTimeFormatterBuilder,
        LocalDateTime = jodajs.LocalDateTime,
        LocalDate = jodajs.LocalDate;

    describe('millisOfSecond', function () {
        it('should add a millis of second field', function () {
            var formatter = new DateTimeFormatterBuilder().millisOfSecond(4).toFormatter();
            expect(formatter.print(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe('0006');
        });
    });

    describe('secondOfMinute', function () {
        it('should add a second of minute field', function () {
            var formatter = new DateTimeFormatterBuilder().secondOfMinute(2).toFormatter();
            expect(formatter.print(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe('05');
        });
    });

    describe('minuteOfHour', function () {
        it('should add a minute of hour field', function () {
            var formatter = new DateTimeFormatterBuilder().minuteOfHour(2).toFormatter();
            expect(formatter.print(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe('04');
        });
    });

    describe('hourOfDay', function () {
        it('should add a hour of day field', function () {
            var formatter = new DateTimeFormatterBuilder().hourOfDay(2).toFormatter();
            expect(formatter.print(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe('03');
        });
    });

    describe('dayOfWeek', function () {
        it('should add a day of week field', function () {
            var formatter = new DateTimeFormatterBuilder().dayOfWeek(2).toFormatter();
            expect(formatter.print(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe('07');
        });
    });

    describe('dayOfMonth', function () {
        it('should add a day of month field', function () {
            var formatter = new DateTimeFormatterBuilder().dayOfMonth(2).toFormatter();
            expect(formatter.print(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe('02');
        });
    });

    describe('dayOfYear', function () {
        it('should add a day of year field', function () {
            var formatter = new DateTimeFormatterBuilder().dayOfYear(4).toFormatter();
            expect(formatter.print(new LocalDateTime(2001, 12, 30, 3, 4, 5, 6))).toBe('0364');
        });
    });

    describe('monthOfYear', function () {
        it('should add a month of year field', function () {
            var formatter = new DateTimeFormatterBuilder().monthOfYear(2).toFormatter();
            expect(formatter.print(new LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe('01');
        });
    });

    describe('year', function () {
        it('should add a year field', function () {
            var formatter = new DateTimeFormatterBuilder().year(1).toFormatter();
            expect(formatter.print(new LocalDate(2014, 1, 1))).toBe('2014');
            expect(formatter.print(new LocalDateTime(2016, 1, 1))).toBe('2016');
        });

        it('should pad left with 0', function () {
            var formatter = new DateTimeFormatterBuilder().year(6).toFormatter();
            expect(formatter.print(new LocalDate(2014, 1, 1))).toBe('002014');
        });
    });

    describe('literal', function () {
        it('should add string literal', function () {
            var formatter = new DateTimeFormatterBuilder().literal('hula').toFormatter();
            expect(formatter.print(new LocalDate(2014, 1, 1))).toBe('hula');
        });
    });

    describe('concatenated', function () {
        it('should concatenate all formatters', function () {
            var formatter = new DateTimeFormatterBuilder().year(4).literal('-').monthOfYear(2).literal('-').dayOfMonth(2).toFormatter();
            expect(formatter.print(new LocalDate(2014, 1, 2))).toBe('2014-01-02');
        });
    });


});