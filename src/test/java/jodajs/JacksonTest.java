package jodajs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import org.joda.time.*;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;
import java.util.TimeZone;

import static org.junit.Assert.assertEquals;

/**
 *
 */
public class JacksonTest {
    private static ObjectMapper mapper;

    private static class Holder {
        public LocalDate date;
        public LocalTime time;
        public LocalDateTime dateTime;

        private Holder(LocalDate date, LocalTime time, LocalDateTime dateTime) {
            this.date = date;
            this.time = time;
            this.dateTime = dateTime;
        }
    }

    @BeforeClass
    public static void init() {
        mapper = new ObjectMapper();
        mapper.setTimeZone(TimeZone.getTimeZone("GMT-1"));
        mapper.registerModule(new JodaModule());
    }

    @Test
    public void formatAsString() throws IOException {
        ObjectWriter w = mapper.writer().withoutFeatures(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        assertEquals("\"2000-01-02\"", serialize(w, new LocalDate(2000, 1, 2)));
        assertEquals("\"10:15:04.050\"", serialize(w, new LocalTime(10, 15, 4, 50)));
        assertEquals("\"2000-01-02T10:15:04.050\"", serialize(w, new LocalDateTime(2000, 1, 2, 10, 15, 4, 50)));
        assertEquals("\"2000-01-02T08:15:04.050-01:00\"", serialize(w, new DateTime(2000, 1, 2, 10, 15, 4, 50, DateTimeZone.forOffsetHours(1))));
    }

    @Test
    public void formatAsTimestamp() throws IOException {
        ObjectWriter w = mapper.writer().withFeatures(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        assertEquals("[2000,1,2]", serialize(w, new LocalDate(2000, 1, 2)));
        assertEquals("[10,15,4,50]", serialize(w, new LocalTime(10, 15, 4, 50)));
        assertEquals("[2000,1,2,10,15,4,50]", serialize(w, new LocalDateTime(2000, 1, 2, 10, 15, 4, 50)));

        final DateTime dt = new DateTime(2000, 1, 2, 10, 15, 4, 50);
        assertEquals("" + dt.getMillis(), serialize(w, dt));
    }

    @Test
    public void parseAsString() throws IOException {
        assertEquals(new LocalDate(2000, 1, 2), mapper.readValue("\"2000-01-02\"", LocalDate.class));
        assertEquals(new LocalTime(10, 15, 4, 50), mapper.readValue("\"10:15:04.050\"", LocalTime.class));
        assertEquals(new LocalDateTime(2000, 1, 2, 10, 15, 4, 50), mapper.readValue("\"2000-01-02T10:15:04.050\"", LocalDateTime.class));
        assertEquals(new DateTime(2000, 1, 2, 10, 15, 4, 50, DateTimeZone.forOffsetHours(-1)), mapper.readValue("\"2000-01-02T12:15:04.050+01:00\"", DateTime.class));
    }

    @Test
    public void parseAsTimestamp() throws IOException {
        assertEquals(new LocalDate(2000, 1, 2), mapper.readValue("[2000,1,2]", LocalDate.class));
        assertEquals(new LocalTime(10, 15, 4, 50), mapper.readValue("[10,15,4,50]", LocalTime.class));
        assertEquals(new LocalDateTime(2000, 1, 2, 10, 15, 4, 50), mapper.readValue("[2000,1,2,10,15,4,50]", LocalDateTime.class));
    }

    private String serialize(ObjectWriter writer, Object obj) throws IOException {
        final StringWriter sw = new StringWriter();
        writer.writeValue(sw, obj);
        return sw.toString();
    }


}
