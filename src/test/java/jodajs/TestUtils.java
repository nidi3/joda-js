package jodajs;

import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.joda.time.LocalTime;
import org.joda.time.chrono.GJChronology;
import org.joda.time.format.DateTimeFormatterBuilder;

import java.util.Date;
import java.util.Locale;

/**
 *
 */
public class TestUtils {
    static {
        Locale.setDefault(Locale.ENGLISH);
    }

    public static LocalDateTime LocalDateTime(int y, int m, int d, int h, int mi, int s, int ms) {
        return new LocalDateTime(y, m, d, h, mi, s, ms);
    }

    public static LocalDateTime LocalDateTime(int y, int m, int d, int h, int mi, int s) {
        return new LocalDateTime(y, m, d, h, mi, s);
    }

    public static LocalDateTime LocalDateTime(int y, int m, int d, int h, int mi) {
        return new LocalDateTime(y, m, d, h, mi);
    }

    public static LocalTime LocalTime(int h, int mi, int s, int ms) {
        return new LocalTime(h, mi, s, ms);
    }

    public static LocalTime LocalTime(int h, int mi) {
        return new LocalTime(h, mi);
    }

    public static LocalDate LocalDate(int y, int m, int d) {
        return new LocalDate(y, m, d, GJChronology.getInstance());
    }

    public static DateTimeFormatterBuilder DateTimeFormatterBuilder() {
        return new DateTimeFormatterBuilder();
    }

    public static Date stdDate(int y, int m, int d, int h, int mi, int s, int ms) {
        return new Date(new Date(y - 1900, m, d, h, mi, s).getTime() + ms);
    }

}
