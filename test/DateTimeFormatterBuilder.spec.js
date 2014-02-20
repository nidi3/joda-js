/*global window,matchers,jodajs,beforeEach,describe,it,expect*/
describe('DateTimeFormatterBuilder', function () {
    var DateTimeFormatterBuilder = jodajs.DateTimeFormatterBuilder,
        LocalDateTime = jodajs.LocalDateTime,
        LocalDate = jodajs.LocalDate,
        LocalTime = jodajs.LocalTime;

    describe('init', function () {
        it('should be usable with or without "new"', function () {
            var d1, d2;
            d1 = new DateTimeFormatterBuilder();
            expect(window.DateTimeFormatterBuilder).toBeUndefined();

            d2 = DateTimeFormatterBuilder();
            expect(window.DateTimeFormatterBuilder).toBeUndefined();
        });
    });

    describe('fractionOfSecond', function () {
        it('should print fractions of second', function () {
            expect(DateTimeFormatterBuilder().fractionOfSecond(1, 1).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe('0');
            expect(DateTimeFormatterBuilder().fractionOfSecond(1, 2).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe('01');
            expect(DateTimeFormatterBuilder().fractionOfSecond(1, 3).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe('012');
            expect(DateTimeFormatterBuilder().fractionOfSecond(1, 4).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe('012');

            expect(DateTimeFormatterBuilder().fractionOfSecond(2, 2).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe('01');
            expect(DateTimeFormatterBuilder().fractionOfSecond(2, 3).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe('012');
            expect(DateTimeFormatterBuilder().fractionOfSecond(2, 4).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe('012');

            expect(DateTimeFormatterBuilder().fractionOfSecond(4, 4).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe('0120');
        });
        it('should parse fractions of second', function () {
           // expect(DateTimeFormatterBuilder().fractionOfSecond(1, 1).toParser().parse('0')).toEq('0');
        });
    });

    describe('millisOfSecond', function () {
        it('should add a millis of second field', function () {
            expect(DateTimeFormatterBuilder().millisOfSecond(1).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe('12');
            expect(DateTimeFormatterBuilder().millisOfSecond(2).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe('12');
            expect(DateTimeFormatterBuilder().millisOfSecond(3).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe('012');
            expect(DateTimeFormatterBuilder().millisOfSecond(4).toFormatter().print(LocalTime(10, 15, 4, 12))).toBe('0012');
        });
    });

    describe('secondOfMinute', function () {
        it('should add a second of minute field', function () {
            var formatter = DateTimeFormatterBuilder().secondOfMinute(2).toFormatter();
            expect(formatter.print(LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe('05');
        });
    });

    describe('minuteOfHour', function () {
        it('should add a minute of hour field', function () {
            var formatter = DateTimeFormatterBuilder().minuteOfHour(2).toFormatter();
            expect(formatter.print(LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe('04');
        });
    });

    describe('hourOfDay', function () {
        it('should add a hour of day field', function () {
            var formatter = DateTimeFormatterBuilder().hourOfDay(2).toFormatter();
            expect(formatter.print(LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe('03');
        });
    });

    describe('dayOfWeek', function () {
        it('should add a day of week field', function () {
            var formatter = DateTimeFormatterBuilder().dayOfWeek(2).toFormatter();
            expect(formatter.print(LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe('07');
        });
    });

    describe('dayOfMonth', function () {
        it('should add a day of month field', function () {
            var formatter = DateTimeFormatterBuilder().dayOfMonth(2).toFormatter();
            expect(formatter.print(LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe('02');
        });
    });

    describe('dayOfYear', function () {
        it('should add a day of year field', function () {
            var formatter = DateTimeFormatterBuilder().dayOfYear(4).toFormatter();
            expect(formatter.print(LocalDateTime(2001, 12, 30, 3, 4, 5, 6))).toBe('0364');
        });
    });

    describe('monthOfYear', function () {
        it('should add a month of year field', function () {
            var formatter = DateTimeFormatterBuilder().monthOfYear(2).toFormatter();
            expect(formatter.print(LocalDateTime(2000, 1, 2, 3, 4, 5, 6))).toBe('01');
        });
    });

    describe('weekOfWeekyear', function () {
        it('should add a week of weekyear field', function () {
            var formatter = DateTimeFormatterBuilder().weekOfWeekyear(2).toFormatter();
            expect(formatter.print(LocalDate(2010, 1, 3))).toBe('53');
            expect(formatter.print(LocalDate(2010, 1, 4))).toBe('01');
        });
    });

    describe('weekyear', function () {
        it('should add a weekyear field', function () {
            var formatter = DateTimeFormatterBuilder().weekyear(4).toFormatter();
            expect(formatter.print(LocalDate(2010, 1, 3))).toBe('2009');
            expect(formatter.print(LocalDate(2010, 1, 4))).toBe('2010');
        });
    });


    describe('year', function () {
        it('should add a year field', function () {
            var formatter = DateTimeFormatterBuilder().year(1).toFormatter();
            expect(formatter.print(LocalDate(2014, 1, 1))).toBe('2014');
            expect(formatter.print(LocalDateTime(2016, 1, 1))).toBe('2016');
        });

        it('should pad left with 0', function () {
            var formatter = DateTimeFormatterBuilder().year(6).toFormatter();
            expect(formatter.print(LocalDate(2014, 1, 1))).toBe('002014');
        });
    });

    describe('literal', function () {
        it('should add string literal', function () {
            var formatter = DateTimeFormatterBuilder().literal('hula').toFormatter();
            expect(formatter.print(LocalDate(2014, 1, 1))).toBe('hula');
        });
    });

    describe('concatenated', function () {
        it('should concatenate all formatters', function () {
            var formatter = DateTimeFormatterBuilder().year(4).literal('-').monthOfYear(2).literal('-').dayOfMonth(2).toFormatter();
            expect(formatter.print(LocalDate(2014, 1, 2))).toBe('2014-01-02');
        });
    });


});