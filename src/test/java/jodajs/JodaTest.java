package jodajs;

import org.joda.time.*;
import org.joda.time.chrono.GJChronology;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatterBuilder;
import org.junit.Test;

import java.util.Date;
import java.util.Locale;

import static jodajs.TestUtils.LocalDateTime;
import static org.junit.Assert.assertEquals;

/**
 *
 */
public class JodaTest {
    LocalDateTime ldt = LocalDateTime(2000, 7, 2, 3, 4, 5, 123);

    @Test
    public void millis() {
        assertEquals("1", DateTimeFormat.forPattern("S").print(new LocalTime(10, 15, 4, 123)));
        assertEquals("12", DateTimeFormat.forPattern("SS").print(new LocalTime(10, 15, 4, 123)));
        assertEquals("123", DateTimeFormat.forPattern("SSS").print(new LocalTime(10, 15, 4, 123)));
        assertEquals("1230", DateTimeFormat.forPattern("SSSS").print(new LocalTime(10, 15, 4, 123)));

        assertEquals("0", DateTimeFormat.forPattern("S").print(new LocalTime(10, 15, 4, 1)));
        assertEquals("00", DateTimeFormat.forPattern("SS").print(new LocalTime(10, 15, 4, 1)));
        assertEquals("001", DateTimeFormat.forPattern("SSS").print(new LocalTime(10, 15, 4, 1)));
        assertEquals("0010", DateTimeFormat.forPattern("SSSS").print(new LocalTime(10, 15, 4, 1)));

        assertEquals("12", new DateTimeFormatterBuilder().appendMillisOfSecond(1).toFormatter().print(new LocalTime(10, 15, 4, 12)));
        assertEquals("12", new DateTimeFormatterBuilder().appendMillisOfSecond(2).toFormatter().print(new LocalTime(10, 15, 4, 12)));
        assertEquals("012", new DateTimeFormatterBuilder().appendMillisOfSecond(3).toFormatter().print(new LocalTime(10, 15, 4, 12)));
        assertEquals("0012", new DateTimeFormatterBuilder().appendMillisOfSecond(4).toFormatter().print(new LocalTime(10, 15, 4, 12)));

        assertEquals("0", new DateTimeFormatterBuilder().appendFractionOfSecond(1, 1).toFormatter().print(new LocalTime(10, 15, 4, 12)));
        assertEquals("01", new DateTimeFormatterBuilder().appendFractionOfSecond(1, 2).toFormatter().print(new LocalTime(10, 15, 4, 12)));
        assertEquals("012", new DateTimeFormatterBuilder().appendFractionOfSecond(1, 3).toFormatter().print(new LocalTime(10, 15, 4, 12)));
        assertEquals("012", new DateTimeFormatterBuilder().appendFractionOfSecond(1, 4).toFormatter().print(new LocalTime(10, 15, 4, 12)));

        assertEquals("01", new DateTimeFormatterBuilder().appendFractionOfSecond(2, 2).toFormatter().print(new LocalTime(10, 15, 4, 12)));
        assertEquals("012", new DateTimeFormatterBuilder().appendFractionOfSecond(2, 3).toFormatter().print(new LocalTime(10, 15, 4, 12)));
        assertEquals("012", new DateTimeFormatterBuilder().appendFractionOfSecond(2, 4).toFormatter().print(new LocalTime(10, 15, 4, 12)));

        assertEquals("0120", new DateTimeFormatterBuilder().appendFractionOfSecond(4, 4).toFormatter().print(new LocalTime(10, 15, 4, 12)));
    }

    @Test
    public void halfday() {
        assertEquals("12", DateTimeFormat.forPattern("hh").print(new LocalTime(0, 4)));
        assertEquals("01", DateTimeFormat.forPattern("hh").print(new LocalTime(1, 4)));
        assertEquals("11", DateTimeFormat.forPattern("hh").print(new LocalTime(11, 4)));
        assertEquals("12", DateTimeFormat.forPattern("hh").print(new LocalTime(12, 4)));
        assertEquals("01", DateTimeFormat.forPattern("hh").print(new LocalTime(13, 4)));
        assertEquals("11", DateTimeFormat.forPattern("hh").print(new LocalTime(23, 4)));

        assertEquals("00", DateTimeFormat.forPattern("KK").print(new LocalTime(0, 4)));
        assertEquals("11", DateTimeFormat.forPattern("KK").print(new LocalTime(11, 4)));
        assertEquals("00", DateTimeFormat.forPattern("KK").print(new LocalTime(12, 4)));
        assertEquals("11", DateTimeFormat.forPattern("KK").print(new LocalTime(23, 4)));

        assertEquals("PM", DateTimeFormat.forPattern("a").print(new LocalTime(12, 0)));
        assertEquals("AM", DateTimeFormat.forPattern("a").print(new LocalTime(0, 0)));
    }

    @Test
    public void month() {
        assertEquals("7", DateTimeFormat.forPattern("M").print(new LocalDate(2000, 7, 2)));
        assertEquals("07", DateTimeFormat.forPattern("MM").print(new LocalDate(2000, 7, 2)));
        assertEquals("Jul", DateTimeFormat.forPattern("MMM").print(new LocalDate(2000, 7, 2)));
        assertEquals("July", DateTimeFormat.forPattern("MMMM").print(new LocalDate(2000, 7, 2)));
    }

    @Test
    public void year() {
        assertEquals("2000", DateTimeFormat.forPattern("y").print(new LocalDate(2000, 7, 2)));
        assertEquals("00", DateTimeFormat.forPattern("yy").print(new LocalDate(2000, 7, 2)));
        assertEquals("2000", DateTimeFormat.forPattern("yyy").print(new LocalDate(2000, 7, 2)));
        assertEquals("2000", DateTimeFormat.forPattern("yyyy").print(new LocalDate(2000, 7, 2)));
        assertEquals("02000", DateTimeFormat.forPattern("yyyyy").print(new LocalDate(2000, 7, 2)));
    }

    @Test
    public void yearOfEra() {
        assertEquals("2000", DateTimeFormat.forPattern("Y").print(new LocalDate(2000, 7, 2)));
        assertEquals("00", DateTimeFormat.forPattern("YY").print(new LocalDate(2000, 7, 2)));
        assertEquals("2000", DateTimeFormat.forPattern("YYY").print(new LocalDate(2000, 7, 2)));
        assertEquals("2000", DateTimeFormat.forPattern("YYYY").print(new LocalDate(2000, 7, 2)));
        assertEquals("02000", DateTimeFormat.forPattern("YYYYY").print(new LocalDate(2000, 7, 2)));

        assertEquals("1", DateTimeFormat.forPattern("Y").print(new LocalDate(-1, 7, 2, GJChronology.getInstance())));
        assertEquals("01", DateTimeFormat.forPattern("YY").print(new LocalDate(-1, 7, 2, GJChronology.getInstance())));
        assertEquals("001", DateTimeFormat.forPattern("YYY").print(new LocalDate(-1, 7, 2, GJChronology.getInstance())));

        assertEquals("1", DateTimeFormat.forPattern("Y").print(new LocalDate(-1, 7, 2, GJChronology.getInstance())));
    }

    @Test
    public void century() {
        assertEquals("20", DateTimeFormat.forPattern("C").print(new LocalDate(2000, 7, 2)));
        assertEquals("20", DateTimeFormat.forPattern("CC").print(new LocalDate(2000, 7, 2)));
        assertEquals("020", DateTimeFormat.forPattern("CCC").print(new LocalDate(2000, 7, 2)));

        assertEquals("20", DateTimeFormat.forPattern("C").print(new LocalDate(2000, 7, 2, GJChronology.getInstance())));
        assertEquals("21", DateTimeFormat.forPattern("C").print(new LocalDate(2001, 7, 2, GJChronology.getInstance())));
        assertEquals("1", DateTimeFormat.forPattern("C").print(new LocalDate(100, 7, 2, GJChronology.getInstance())));
        assertEquals("1", DateTimeFormat.forPattern("C").print(new LocalDate(1, 7, 2, GJChronology.getInstance())));
        assertEquals("1", DateTimeFormat.forPattern("C").print(new LocalDate(-1, 7, 2, GJChronology.getInstance())));
        assertEquals("1", DateTimeFormat.forPattern("C").print(new LocalDate(-100, 7, 2, GJChronology.getInstance())));
        assertEquals("2", DateTimeFormat.forPattern("C").print(new LocalDate(-101, 7, 2, GJChronology.getInstance())));
    }

    @Test
    public void era() {
        assertEquals("BC", DateTimeFormat.forPattern("G").withLocale(Locale.ENGLISH).print(new LocalDate(-2000, 7, 2, GJChronology.getInstance())));
        assertEquals("AD", DateTimeFormat.forPattern("G").withLocale(Locale.ENGLISH).print(new LocalDate(2000, 7, 2, GJChronology.getInstance())));

    }

    @Test
    public void dayOfWeek() {
        assertEquals("Sun", DateTimeFormat.forPattern("E").print(new LocalDate(2000, 7, 2)));
        assertEquals("Sun", DateTimeFormat.forPattern("EE").print(new LocalDate(2000, 7, 2)));
        assertEquals("Sun", DateTimeFormat.forPattern("EEE").print(new LocalDate(2000, 7, 2)));
        assertEquals("Sunday", DateTimeFormat.forPattern("EEEE").print(new LocalDate(2000, 7, 2)));
        assertEquals("Sunday", DateTimeFormat.forPattern("EEEEE").print(new LocalDate(2000, 7, 2)));

        assertEquals("So", DateTimeFormat.forPattern("EEE").withLocale(Locale.GERMAN).print(new LocalDate(2000, 7, 2)));
        assertEquals("Sonntag", DateTimeFormat.forPattern("EEEE").withLocale(Locale.GERMAN).print(new LocalDate(2000, 7, 2)));

        assertEquals(new LocalDate(2011, 1, 2), new LocalDate(2010, 1, 3).withWeekyear(2010));

    }

    @Test(expected = IllegalArgumentException.class)
    public void unknown() {
        DateTimeFormat.forPattern("b").print(new LocalDate(2000, 7, 2));
    }

    @Test
    public void unknown2() {
        assertEquals("\ufffd\ufffd\ufffd", DateTimeFormat.forPattern("HHH").print(new LocalDate(2000, 7, 2)));
        assertEquals("\ufffd", DateTimeFormat.forPattern("y").print(new LocalTime(20, 7)));
    }

    @Test
    public void weekyear() {
        assertEquals(1999, new LocalDate(2000, 1, 1).getWeekyear());
        assertEquals(1999, new LocalDate(2000, 1, 2).getWeekyear());
        assertEquals(2000, new LocalDate(2000, 1, 3).getWeekyear());
        assertEquals(2000, new LocalDate(2000, 1, 4).getWeekyear());
    }

    @Test
    public void zone() {
        assertEquals("+0100", DateTimeFormat.forPattern("Z").print(new DateTime(DateTimeZone.forOffsetHours(1))));
        assertEquals("+01:00", DateTimeFormat.forPattern("ZZ").print(new DateTime(DateTimeZone.forOffsetHours(1))));
        //assertEquals("Europe/Zurich", DateTimeFormat.forPattern("ZZZ").print(new DateTime()));
        //assertEquals("Europe/Zurich", DateTimeFormat.forPattern("ZZZZ").print(new DateTime()));

        //assertEquals("CET", DateTimeFormat.forPattern("z").print(new DateTime()));
        //assertEquals("Central European Time", DateTimeFormat.forPattern("zzzz").print(new DateTime()));

        assertEquals("12", DateTimeFormat.forPattern("H").withZone(DateTimeZone.forOffsetHours(new Date().getTimezoneOffset() / 60)).print(new LocalTime(12, 0)));
        assertEquals("11", DateTimeFormat.forPattern("H").withZone(DateTimeZone.forOffsetHours(0)).print(new DateTime(2000, 1, 1, 12, 0, DateTimeZone.forOffsetHours(1))));
    }

    @Test
    public void parse() {
        //  assertEquals(new LocalTime(10, 15, 20, 25), new DateTimeFormatterBuilder().appendFractionOfSecond(1, 1).toParser().p);
    }
}
