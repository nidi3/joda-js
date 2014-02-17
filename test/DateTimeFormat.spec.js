/*global matchers,jodajs,beforeEach,describe,it,expect*/
describe('DateTimeFormat', function () {
    var DateTimeFormat = jodajs.DateTimeFormat,
        LocalDateTime = jodajs.LocalDateTime,
        LocalDate = jodajs.LocalDate,
        ldt = LocalDateTime(2000, 7, 2, 3, 4, 5, 123);

    describe('S', function () {
        it('should print millis of second', function () {
            expect(DateTimeFormat.forPattern('S').print(ldt)).toBe('1');
            expect(DateTimeFormat.forPattern('SS').print(ldt)).toBe('12');
            expect(DateTimeFormat.forPattern('SSS').print(ldt)).toBe('123');
            expect(DateTimeFormat.forPattern('SSSS').print(ldt)).toBe('1230');
        });
    });

    describe('s', function () {
        it('should print second of minute', function () {
            expect(DateTimeFormat.forPattern('s').print(ldt)).toBe('5');
            expect(DateTimeFormat.forPattern('ss').print(ldt)).toBe('05');
            expect(DateTimeFormat.forPattern('sss').print(ldt)).toBe('005');
        });
    });

    describe('m', function () {
        it('should print minute of hour', function () {
            expect(DateTimeFormat.forPattern('m').print(ldt)).toBe('4');
            expect(DateTimeFormat.forPattern('mm').print(ldt)).toBe('04');
            expect(DateTimeFormat.forPattern('mmm').print(ldt)).toBe('004');
        });
    });

    describe('H', function () {
        it('should print hour of day (0-23)', function () {
            expect(DateTimeFormat.forPattern('H').print(ldt)).toBe('3');
            expect(DateTimeFormat.forPattern('HH').print(ldt)).toBe('03');
            expect(DateTimeFormat.forPattern('HHH').print(ldt)).toBe('003');
        });
    });

    describe('k', function () {
        it('should print clock hour of day (1-24)', function () {
            expect(DateTimeFormat.forPattern('k').print(ldt)).toBe('4');
            expect(DateTimeFormat.forPattern('kk').print(ldt)).toBe('04');
            expect(DateTimeFormat.forPattern('kkk').print(ldt)).toBe('004');
        });
    });

    describe('h', function () {
        it('should print hour of halfday (1-12)', function () {
            expect(DateTimeFormat.forPattern('hh').print(LocalDateTime(2000, 1, 2, 0, 4, 5, 123))).toBe('12');
            expect(DateTimeFormat.forPattern('hh').print(LocalDateTime(2000, 1, 2, 1, 4, 5, 123))).toBe('01');
            expect(DateTimeFormat.forPattern('hh').print(LocalDateTime(2000, 1, 2, 11, 4, 5, 123))).toBe('11');
            expect(DateTimeFormat.forPattern('hh').print(LocalDateTime(2000, 1, 2, 12, 4, 5, 123))).toBe('12');
            expect(DateTimeFormat.forPattern('hh').print(LocalDateTime(2000, 1, 2, 13, 4, 5, 123))).toBe('01');
            expect(DateTimeFormat.forPattern('hh').print(LocalDateTime(2000, 1, 2, 23, 4, 5, 123))).toBe('11');
        });
    });

    describe('K', function () {
        it('should print clock hour of halfday (0-11)', function () {
            expect(DateTimeFormat.forPattern('KK').print(LocalDateTime(2000, 1, 2, 0, 4, 5, 123))).toBe('00');
            expect(DateTimeFormat.forPattern('KK').print(LocalDateTime(2000, 1, 2, 11, 4, 5, 123))).toBe('11');
            expect(DateTimeFormat.forPattern('KK').print(LocalDateTime(2000, 1, 2, 12, 4, 5, 123))).toBe('00');
            expect(DateTimeFormat.forPattern('KK').print(LocalDateTime(2000, 1, 2, 23, 4, 5, 123))).toBe('11');
        });
    });

    describe('a', function () {
        it('should print halfday of day', function () {
            expect(DateTimeFormat.forPattern('a').print(LocalDateTime(2000, 1, 2, 0, 0, 0, 0))).toBe('AM');
            expect(DateTimeFormat.forPattern('a').print(LocalDateTime(2000, 1, 2, 11, 59, 59, 999))).toBe('AM');
            expect(DateTimeFormat.forPattern('a').print(LocalDateTime(2000, 1, 2, 12, 0, 0, 0))).toBe('PM');
            expect(DateTimeFormat.forPattern('a').print(LocalDateTime(2000, 1, 2, 23, 59, 59, 999))).toBe('PM');
        });
    });

    describe('d', function () {
        it('should print day of month', function () {
            expect(DateTimeFormat.forPattern('d').print(ldt)).toBe('2');
            expect(DateTimeFormat.forPattern('dd').print(ldt)).toBe('02');
            expect(DateTimeFormat.forPattern('ddd').print(ldt)).toBe('002');
        });
    });

    describe('M', function () {
        it('should print month of year', function () {
            expect(DateTimeFormat.forPattern('M').print(ldt)).toBe('7');
            expect(DateTimeFormat.forPattern('MM').print(ldt)).toBe('07');
            expect(DateTimeFormat.forPattern('MMM').print(ldt)).toBe('Jul');
            expect(DateTimeFormat.forPattern('MMMM').print(ldt)).toBe('July');
        });
    });

    describe('D', function () {
        it('should print day of year', function () {
            expect(DateTimeFormat.forPattern('D').print(ldt)).toBe('188');
            expect(DateTimeFormat.forPattern('DD').print(ldt)).toBe('188');
            expect(DateTimeFormat.forPattern('DDD').print(ldt)).toBe('188');
            expect(DateTimeFormat.forPattern('DDDD').print(ldt)).toBe('0188');
        });
    });

    describe('y', function () {
        it('should print year', function () {
            expect(DateTimeFormat.forPattern('y').print(ldt)).toBe('2000');
            expect(DateTimeFormat.forPattern('yy').print(ldt)).toBe('00');
            expect(DateTimeFormat.forPattern('yyy').print(ldt)).toBe('2000');
            expect(DateTimeFormat.forPattern('yyyy').print(ldt)).toBe('2000');
            expect(DateTimeFormat.forPattern('yyyyy').print(ldt)).toBe('02000');
        });
    });

    describe('e', function () {
        it('should print day of week (numeric)', function () {
            expect(DateTimeFormat.forPattern('e').print(ldt)).toBe('1');
            expect(DateTimeFormat.forPattern('ee').print(ldt)).toBe('01');
        });
    });

    describe('E', function () {
        it('should print day of week (text)', function () {
            expect(DateTimeFormat.forPattern('E').print(ldt)).toBe('Su');
            expect(DateTimeFormat.forPattern('EE').print(ldt)).toBe('Su');
            expect(DateTimeFormat.forPattern('EEE').print(ldt)).toBe('Su');
            expect(DateTimeFormat.forPattern('EEEE').print(ldt)).toBe('Sunday');
        });
    });


});