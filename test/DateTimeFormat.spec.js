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
            expect(DateTimeFormat.forPattern('D').print(ldt)).toBe('184');
            expect(DateTimeFormat.forPattern('DD').print(ldt)).toBe('184');
            expect(DateTimeFormat.forPattern('DDD').print(ldt)).toBe('184');
            expect(DateTimeFormat.forPattern('DDDD').print(ldt)).toBe('0184');
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
            expect(DateTimeFormat.forPattern('e').print(ldt)).toBe('7');
            expect(DateTimeFormat.forPattern('ee').print(ldt)).toBe('07');
        });
    });

    describe('E', function () {
        it('should print day of week (text)', function () {
            expect(DateTimeFormat.forPattern('E').print(ldt)).toBe('Sun');
            expect(DateTimeFormat.forPattern('E').withLanguage('de').print(ldt)).toBe('So');
            expect(DateTimeFormat.forPattern('EE').print(ldt)).toBe('Sun');
            expect(DateTimeFormat.forPattern('EEE').print(ldt)).toBe('Sun');
            expect(DateTimeFormat.forPattern('EEEE').print(ldt)).toBe('Sunday');
        });
    });

    describe('w', function () {
        it('should print week of weekyear', function () {
            expect(DateTimeFormat.forPattern('w').print(LocalDate(2010, 1, 3))).toBe('53');
            expect(DateTimeFormat.forPattern('ww').print(LocalDate(2010, 1, 3))).toBe('53');
            expect(DateTimeFormat.forPattern('www').print(LocalDate(2010, 1, 3))).toBe('053');
        });
    });

    describe('x', function () {
        it('should print weekyear', function () {
            expect(DateTimeFormat.forPattern('x').print(LocalDate(2010, 1, 3))).toBe('2009');
            expect(DateTimeFormat.forPattern('xx').print(LocalDate(2010, 1, 3))).toBe('09');
            expect(DateTimeFormat.forPattern('xxx').print(LocalDate(2010, 1, 3))).toBe('2009');
            expect(DateTimeFormat.forPattern('xxxx').print(LocalDate(2010, 1, 3))).toBe('2009');
            expect(DateTimeFormat.forPattern('xxxxx').print(LocalDate(2010, 1, 3))).toBe('02009');
        });
    });

    describe('Z', function () {
        it('should print time zone offset', function () {
            expect(DateTimeFormat.forPattern('Z').print(LocalDate(2010, 1, 3))).toMatch(/\+|-\d{4}/);
            expect(DateTimeFormat.forPattern('ZZ').print(LocalDate(2010, 1, 3))).toMatch(/\+|-\d{2}:\d{2}/);
            expect(DateTimeFormat.forPattern('ZZZ').print(LocalDate(2010, 1, 3))).toBe('');
        });
    });

    describe('z', function () {
        it('should print time zone', function () {
            expect(DateTimeFormat.forPattern('z').print(LocalDate(2010, 1, 3))).toMatch(/\w{3}/);
            expect(DateTimeFormat.forPattern('zz').print(LocalDate(2010, 1, 3))).toMatch(/\w{3}/);
        });
    });

    describe('non letter', function () {
        it('should print literal', function () {
            expect(DateTimeFormat.forPattern('+"*ç%').print(LocalDate(2010, 1, 3))).toBe('+"*ç%');
            expect(DateTimeFormat.forPattern('?d?').print(LocalDate(2010, 1, 3))).toBe('?3?');
        });
        it('should be possible to mix with letters', function () {
            expect(DateTimeFormat.forPattern('d?d').print(LocalDate(2010, 1, 3))).toBe('3?3');
        });
    });

    describe("''", function () {
        it("should print '", function () {
            expect(DateTimeFormat.forPattern("''").print(LocalDate(2010, 1, 3))).toBe("'");
        });
    });

    describe("'<letter>'", function () {
        it("should print <letter>", function () {
            expect(DateTimeFormat.forPattern("'hula'").print(LocalDate(2010, 1, 3))).toBe("hula");
        });
    });


});