/*global timeZone,jodajs,DateTimeFormat,LocalDateTime,LocalTime,LocalDate,beforeEach,describe,it,expect*/
describe("DateTimeFormat", function () {

    describe("S", function () {
        it("should print millis of second", function () {
            expect(DateTimeFormat.forPattern("S").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("1");
            expect(DateTimeFormat.forPattern("SS").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("12");
            expect(DateTimeFormat.forPattern("SSS").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("123");
            expect(DateTimeFormat.forPattern("SSSS").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("1230");

            expect(DateTimeFormat.forPattern("S").print(LocalTime(1, 2, 3, 4))).toBe("0");
            expect(DateTimeFormat.forPattern("SS").print(LocalTime(1, 2, 3, 4))).toBe("00");
            expect(DateTimeFormat.forPattern("SSS").print(LocalTime(1, 2, 3, 4))).toBe("004");
            expect(DateTimeFormat.forPattern("SSSS").print(LocalTime(1, 2, 3, 4))).toBe("0040");
        });
    });

    describe("s", function () {
        it("should print second of minute", function () {
            expect(DateTimeFormat.forPattern("s").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("5");
            expect(DateTimeFormat.forPattern("ss").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("05");
            expect(DateTimeFormat.forPattern("sss").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("005");
        });
    });

    describe("m", function () {
        it("should print minute of hour", function () {
            expect(DateTimeFormat.forPattern("m").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("4");
            expect(DateTimeFormat.forPattern("mm").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("04");
            expect(DateTimeFormat.forPattern("mmm").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("004");
        });
    });

    describe("H", function () {
        it("should print hour of day (0-23)", function () {
            expect(DateTimeFormat.forPattern("H").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("3");
            expect(DateTimeFormat.forPattern("HH").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("03");
            expect(DateTimeFormat.forPattern("HHH").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("003");
        });
    });

    describe("k", function () {
        it("should print clock hour of day (1-24)", function () {
            expect(DateTimeFormat.forPattern("k").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("3");
            expect(DateTimeFormat.forPattern("kk").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("03");
            expect(DateTimeFormat.forPattern("kkk").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("003");

            expect(DateTimeFormat.forPattern("k").print(LocalDateTime(2000, 7, 2, 0, 4, 5, 123))).toBe("24");
            expect(DateTimeFormat.forPattern("k").print(LocalDateTime(2000, 7, 2, 1, 4, 5, 123))).toBe("1");
            expect(DateTimeFormat.forPattern("k").print(LocalDateTime(2000, 7, 2, 23, 4, 5, 123))).toBe("23");
        });
    });

    describe("h", function () {
        it("should print hour of halfday (1-12)", function () {
            expect(DateTimeFormat.forPattern("hh").print(LocalDateTime(2000, 1, 2, 0, 4, 5, 123))).toBe("12");
            expect(DateTimeFormat.forPattern("hh").print(LocalDateTime(2000, 1, 2, 1, 4, 5, 123))).toBe("01");
            expect(DateTimeFormat.forPattern("hh").print(LocalDateTime(2000, 1, 2, 11, 4, 5, 123))).toBe("11");
            expect(DateTimeFormat.forPattern("hh").print(LocalDateTime(2000, 1, 2, 12, 4, 5, 123))).toBe("12");
            expect(DateTimeFormat.forPattern("hh").print(LocalDateTime(2000, 1, 2, 13, 4, 5, 123))).toBe("01");
            expect(DateTimeFormat.forPattern("hh").print(LocalDateTime(2000, 1, 2, 23, 4, 5, 123))).toBe("11");
        });
    });

    describe("K", function () {
        it("should print clock hour of halfday (0-11)", function () {
            expect(DateTimeFormat.forPattern("KK").print(LocalDateTime(2000, 1, 2, 0, 4, 5, 123))).toBe("00");
            expect(DateTimeFormat.forPattern("KK").print(LocalDateTime(2000, 1, 2, 11, 4, 5, 123))).toBe("11");
            expect(DateTimeFormat.forPattern("KK").print(LocalDateTime(2000, 1, 2, 12, 4, 5, 123))).toBe("00");
            expect(DateTimeFormat.forPattern("KK").print(LocalDateTime(2000, 1, 2, 23, 4, 5, 123))).toBe("11");
        });
    });

    describe("a", function () {
        it("should print halfday of day", function () {
            expect(DateTimeFormat.forPattern("a").print(LocalDateTime(2000, 1, 2, 0, 0, 0, 0))).toBe("AM");
            expect(DateTimeFormat.forPattern("a").print(LocalDateTime(2000, 1, 2, 11, 59, 59, 999))).toBe("AM");
            expect(DateTimeFormat.forPattern("a").print(LocalDateTime(2000, 1, 2, 12, 0, 0, 0))).toBe("PM");
            expect(DateTimeFormat.forPattern("a").print(LocalDateTime(2000, 1, 2, 23, 59, 59, 999))).toBe("PM");
        });
    });

    describe("d", function () {
        it("should print day of month", function () {
            expect(DateTimeFormat.forPattern("d").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("2");
            expect(DateTimeFormat.forPattern("dd").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("02");
            expect(DateTimeFormat.forPattern("ddd").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("002");
        });
    });

    describe("M", function () {
        it("should print month of year", function () {
            expect(DateTimeFormat.forPattern("M").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("7");
            expect(DateTimeFormat.forPattern("MM").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("07");
            expect(DateTimeFormat.forPattern("MMM").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("Jul");
            expect(DateTimeFormat.forPattern("MMMM").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("July");
        });
    });

    describe("D", function () {
        it("should print day of year", function () {
            expect(DateTimeFormat.forPattern("D").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("184");
            expect(DateTimeFormat.forPattern("DD").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("184");
            expect(DateTimeFormat.forPattern("DDD").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("184");
            expect(DateTimeFormat.forPattern("DDDD").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("0184");
        });
    });

    describe("y", function () {
        it("should print year", function () {
            expect(DateTimeFormat.forPattern("y").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("2000");
            expect(DateTimeFormat.forPattern("yy").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("00");
            expect(DateTimeFormat.forPattern("yyy").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("2000");
            expect(DateTimeFormat.forPattern("yyyy").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("2000");
            expect(DateTimeFormat.forPattern("yyyyy").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("02000");

            expect(DateTimeFormat.forPattern("yy").print(LocalDate(-1, 1, 1))).toBe("01");
        });
    });

    describe("Y", function () {
        it("should print year of era (>0)", function () {
            expect(DateTimeFormat.forPattern("Y").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("2000");
            expect(DateTimeFormat.forPattern("YY").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("00");
            expect(DateTimeFormat.forPattern("YYY").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("2000");
            expect(DateTimeFormat.forPattern("YYYY").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("2000");
            expect(DateTimeFormat.forPattern("YYYYY").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("02000");

            expect(DateTimeFormat.forPattern("Y").print(LocalDate(-1, 1, 1))).toBe("1");
            expect(DateTimeFormat.forPattern("YY").print(LocalDate(-1, 1, 1))).toBe("01");
            expect(DateTimeFormat.forPattern("YYY").print(LocalDate(-1, 1, 1))).toBe("001");
            expect(DateTimeFormat.forPattern("Y").print(LocalDate(-1, 1, 1))).toBe("1");
        });
    });

    describe("C", function () {
        it("should print century", function () {
            expect(DateTimeFormat.forPattern("C").print(LocalDate(2000, 1, 1))).toBe("20");
            expect(DateTimeFormat.forPattern("CC").print(LocalDate(2000, 1, 1))).toBe("20");
            expect(DateTimeFormat.forPattern("CCC").print(LocalDate(2000, 1, 1))).toBe("020");

            expect(DateTimeFormat.forPattern("C").print(LocalDate(2001, 1, 1))).toBe("21");
            expect(DateTimeFormat.forPattern("C").print(LocalDate(2000, 1, 1))).toBe("20");
            expect(DateTimeFormat.forPattern("C").print(LocalDate(100, 1, 1))).toBe("1");
            expect(DateTimeFormat.forPattern("C").print(LocalDate(1, 1, 1))).toBe("1");
            expect(DateTimeFormat.forPattern("C").print(LocalDate(-1, 1, 1))).toBe("1");
            expect(DateTimeFormat.forPattern("C").print(LocalDate(-100, 1, 1))).toBe("1");
            expect(DateTimeFormat.forPattern("C").print(LocalDate(-101, 1, 1))).toBe("2");
        });
    });

    describe("G", function () {
        it("should print era", function () {
            expect(DateTimeFormat.forPattern("G").print(LocalDate(-1, 1, 1))).toBe("BC");
            expect(DateTimeFormat.forPattern("G").print(LocalDate(1, 1, 1))).toBe("AD");
        });
    });

    describe("e", function () {
        it("should print day of week (numeric)", function () {
            expect(DateTimeFormat.forPattern("e").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("7");
            expect(DateTimeFormat.forPattern("ee").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("07");
        });
    });

    describe("E", function () {
        it("should print day of week (text)", function () {
            expect(DateTimeFormat.forPattern("E").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("Sun");
            expect(DateTimeFormat.forPattern("EE").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("Sun");
            expect(DateTimeFormat.forPattern("EEE").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("Sun");
            expect(DateTimeFormat.forPattern("EEEE").print(LocalDateTime(2000, 7, 2, 3, 4, 5, 123))).toBe("Sunday");
        });
    });

    describe("w", function () {
        it("should print week of weekyear", function () {
            expect(DateTimeFormat.forPattern("w").print(LocalDate(2010, 1, 3))).toBe("53");
            expect(DateTimeFormat.forPattern("ww").print(LocalDate(2010, 1, 3))).toBe("53");
            expect(DateTimeFormat.forPattern("www").print(LocalDate(2010, 1, 3))).toBe("053");
        });
    });

    describe("x", function () {
        it("should print weekyear", function () {
            expect(DateTimeFormat.forPattern("x").print(LocalDate(2010, 1, 3))).toBe("2009");
            expect(DateTimeFormat.forPattern("xx").print(LocalDate(2010, 1, 3))).toBe("09");
            expect(DateTimeFormat.forPattern("xxx").print(LocalDate(2010, 1, 3))).toBe("2009");
            expect(DateTimeFormat.forPattern("xxxx").print(LocalDate(2010, 1, 3))).toBe("2009");
            expect(DateTimeFormat.forPattern("xxxxx").print(LocalDate(2010, 1, 3))).toBe("02009");
        });
    });

//    describe("letter_for_unavailable_field", function () {
//        it("should print as empty string", function () {
//            expect(DateTimeFormat.forPattern("H").print(LocalDate(2000, 1, 1))).toBe("");
//            expect(DateTimeFormat.forPattern("HHH").print(LocalDate(2000, 1, 1))).toBe("");
//            expect(DateTimeFormat.forPattern("y").print(LocalTime(10, 15))).toBe("");
//            expect(DateTimeFormat.forPattern("yyy").print(LocalTime(10, 15))).toBe("");
//        });
//    });

    describe("non_letter", function () {
        it("should print literal", function () {
            expect(DateTimeFormat.forPattern("+\"*ç%").print(LocalDate(2010, 1, 3))).toBe("+\"*ç%");
            expect(DateTimeFormat.forPattern("?d?").print(LocalDate(2010, 1, 3))).toBe("?3?");
        });
        it("should be possible to mix with letters", function () {
            expect(DateTimeFormat.forPattern("d?d").print(LocalDate(2010, 1, 3))).toBe("3?3");
        });
    });

    describe("two_quotes", function () {
        it("should print '", function () {
            expect(DateTimeFormat.forPattern("''").print(LocalDate(2010, 1, 3))).toBe("'");
        });
    });

    describe("quoted_letter", function () {
        it("should print the letter", function () {
            expect(DateTimeFormat.forPattern("'hula'").print(LocalDate(2010, 1, 3))).toBe("hula");
        });
    });


});