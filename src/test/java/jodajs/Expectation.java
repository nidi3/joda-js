package jodajs;

import org.hamcrest.Description;
import org.junit.internal.matchers.TypeSafeMatcher;

import java.util.regex.Pattern;

import static org.junit.Assert.*;

/**
 *
 */
public class Expectation {
    private Object obj;

    private Expectation(Object obj) {
        this.obj = obj;
    }

    public static Expectation expect(Object obj) {
        return new Expectation(obj);
    }

    public void toBe(Object value) {
        assertEquals(value, obj);
    }

    public void toBeFalsy() {
        assertTrue(isFalsy());
    }

    private boolean isFalsy() {
        return obj == null || (obj instanceof Boolean && !(Boolean) obj);
    }

    public void toBeTruthy() {
        assertFalse(isFalsy());
    }

    public void toEq(Object value) {
        assertEquals(value, obj);
    }

    public void toEqual(Object value) {
        if (obj instanceof Number && value instanceof Number) {
            assertEquals(((Number) value).doubleValue(), ((Number) obj).doubleValue(), .00001);
        } else {
            assertEquals(value, obj);
        }
    }

    public void toMatch(String regex) {
        assertThat(obj.toString(), new RegexMatcher("^" + regex + "$"));
    }

    public void toBeLessThan(double value) {
        assertThat((Number) obj, new NumberMatcher(value, true, true));
    }

    private static class NumberMatcher extends TypeSafeMatcher<Number> {
        private final double value;
        private final boolean less;
        private final boolean equal;

        private NumberMatcher(double value, boolean less, boolean equal) {
            this.value = value;
            this.less = less;
            this.equal = equal;
        }

        @Override
        public boolean matchesSafely(Number item) {
            final double diff = item.doubleValue() - value;
            return (diff == 0 && equal) || (diff < 0 == less);
        }

        @Override
        public void describeTo(Description description) {

        }
    }

    private static class RegexMatcher extends TypeSafeMatcher<String> {
        private Pattern pattern;

        private RegexMatcher(String pattern) {
            this.pattern = Pattern.compile(pattern);
        }

        @Override
        public boolean matchesSafely(String item) {
            return pattern.matcher(item).matches();
        }

        @Override
        public void describeTo(Description description) {
            description.appendText("a string ")
                    .appendText("matching ")
                    .appendValue(pattern);
        }
    }
}
