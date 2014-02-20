/*globals exports*/
exports.DateTimeFormat = function () {


    return {

    };
};

(function (LocalDate) {
    function parsePatternTo(builder, pattern) {
        var tokenPos;

        function parseToken(pattern, i) {
            var c, peek, inLiteral, buf = '', length = pattern.length;

            c = pattern.charAt(i);
            if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) {
                buf += c;
                while (i + 1 < length) {
                    peek = pattern.charAt(i + 1);
                    if (peek === c) {
                        buf += c;
                        i += 1;
                    } else {
                        break;
                    }
                }
            } else {
                buf += "'";
                inLiteral = false;
                while (i < length) {
                    c = pattern.charAt(i);
                    if (c === "'") {
                        if (i + 1 < length && pattern.charAt(i + 1) === "'") {
                            i += 1;
                            buf += c;
                        } else {
                            inLiteral = !inLiteral;
                        }
                    } else if (!inLiteral && ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z'))) {
                        i -= 1;
                        break;
                    } else {
                        buf += c;
                    }
                    i += 1;
                }
            }
            tokenPos = i;
            return buf;
        }

        function isNumericToken(token) {
            var tokenLen = token.length;
            if (tokenLen > 0) {
                switch (token.charAt(0)) {
                case 'c': // century (number)
                case 'C': // century of era (number)
                case 'x': // weekyear (number)
                case 'y': // year (number)
                case 'Y': // year of era (number)
                case 'd': // day of month (number)
                case 'h': // hour of day (number, 1..12)
                case 'H': // hour of day (number, 0..23)
                case 'm': // minute of hour (number)
                case 's': // second of minute (number)
                case 'S': // fraction of second (number)
                case 'e': // day of week (number)
                case 'D': // day of year (number)
                case 'F': // day of week in month (number)
                case 'w': // week of year (number)
                case 'W': // week of month (number)
                case 'k': // hour of day (1..24)
                case 'K': // hour of day (0..11)
                    return true;
                case 'M': // month of year (text and number)
                    if (tokenLen <= 2) {
                        return true;
                    }
                }
            }
            return false;
        }

        var i, token, tokenLen, c, lenientParse, maxDigits, sub,
            length = pattern.length;

        for (i = 0; i < length; i += 1) {
            token = parseToken(pattern, i);
            i = tokenPos;
            tokenLen = token.length;
            c = token.charAt(0);
            switch (c) {
            case 'G': // era designator (text)
                builder.eraText();
                break;
            case 'C': // century of era (number)
                builder.centuryOfEra(tokenLen, tokenLen);
                break;
            case 'x': // weekyear (number)
            case 'y': // year (number)
            case 'Y': // year of era (number)
                if (tokenLen === 2) {
                    lenientParse = true;

                    // Peek ahead to next token.
                    if (i + 1 < length) {
                        if (isNumericToken(parseToken(pattern, i + 1))) {
                            // If next token is a number, cannot support
                            // lenient parse, because it will consume digits
                            // that it should not.
                            lenientParse = false;
                        }
                    }

                    // Use pivots which are compatible with SimpleDateFormat.
                    switch (c) {
                    case 'x':
                        builder.twoDigitWeekyear(LocalDate.now().getWeekyear() - 30, lenientParse);
                        break;
                    case 'y':
                    case 'Y':
                    default:
                        builder.twoDigitYear(LocalDate.now().getYear() - 30, lenientParse);
                        break;
                    }
                } else {
                    // Try to support long year values.
                    maxDigits = 9;

                    // Peek ahead to next token.
                    if (i + 1 < length) {
                        if (isNumericToken(parseToken(pattern, i + 1))) {
                            // If next token is a number, cannot support long years.
                            maxDigits = tokenLen;
                        }
                    }

                    switch (c) {
                    case 'x':
                        builder.weekyear(tokenLen, maxDigits);
                        break;
                    case 'y':
                        builder.year(tokenLen, maxDigits);
                        break;
                    case 'Y':
                        builder.yearOfEra(tokenLen, maxDigits);
                        break;
                    }
                }
                break;
            case 'M': // month of year (text and number)
                if (tokenLen >= 3) {
                    if (tokenLen >= 4) {
                        builder.monthOfYearText();
                    } else {
                        builder.monthOfYearShortText();
                    }
                } else {
                    builder.monthOfYear(tokenLen);
                }
                break;
            case 'd': // day of month (number)
                builder.dayOfMonth(tokenLen);
                break;
            case 'a': // am/pm marker (text)
                builder.halfdayOfDayText();
                break;
            case 'h': // clockhour of halfday (number, 1..12)
                builder.clockhourOfHalfday(tokenLen);
                break;
            case 'H': // hour of day (number, 0..23)
                builder.hourOfDay(tokenLen);
                break;
            case 'k': // clockhour of day (1..24)
                builder.clockhourOfDay(tokenLen);
                break;
            case 'K': // hour of halfday (0..11)
                builder.hourOfHalfday(tokenLen);
                break;
            case 'm': // minute of hour (number)
                builder.minuteOfHour(tokenLen);
                break;
            case 's': // second of minute (number)
                builder.secondOfMinute(tokenLen);
                break;
            case 'S': // fraction of second (number)
                builder.fractionOfSecond(tokenLen);
                break;
            case 'e': // day of week (number)
                builder.dayOfWeek(tokenLen);
                break;
            case 'E': // dayOfWeek (text)
                if (tokenLen >= 4) {
                    builder.dayOfWeekText();
                } else {
                    builder.dayOfWeekShortText();
                }
                break;
            case 'D': // day of year (number)
                builder.dayOfYear(tokenLen);
                break;
            case 'w': // week of weekyear (number)
                builder.weekOfWeekyear(tokenLen);
                break;
            case 'z': // time zone (text)
                if (tokenLen >= 4) {
                    //builder.zimeZoneText();
                } else {
                    builder.timeZoneShortText();
                }
                break;
            case 'Z': // time zone offset
                if (tokenLen === 1) {
                    builder.timeZoneOffset(false);
                } else if (tokenLen === 2) {
                    builder.timeZoneOffset(true);
                } else {
                    //builder.timeZoneId();
                }
                break;
            case "'": // literal text
                sub = token.substring(1);
                builder.literal(sub);
                break;
            default:
                throw new Error("Illegal pattern component: " + token);
            }
        }
    }

    exports.DateTimeFormat.forPattern = function (pattern) {
        var builder = new exports.DateTimeFormatterBuilder();
        parsePatternTo(builder, pattern);
        return builder.toFormatter();
    };
}(exports.LocalDate));