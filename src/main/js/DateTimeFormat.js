/*globals exports*/
exports.DateTimeFormat = (function () {
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

        function handleToken(token) {
            var tokenLen = token.length,
                c = token.charAt(0);
            switch (c) {
            case 'G':
                builder.appendEraText();
                break;
            case 'C':
                builder.appendCenturyOfEra(tokenLen, tokenLen);
                break;
            case 'x':
            case 'y':
            case 'Y':
                if (tokenLen === 2) {
                    // Use pivots which are compatible with SimpleDateFormat.
                    switch (c) {
                    case 'x':
                        builder.appendTwoDigitWeekyear(exports.LocalDate.now().getWeekyear() - 30);
                        break;
                    case 'y':
                    case 'Y':
                        builder.appendTwoDigitYear(exports.LocalDate.now().getYear() - 30);
                        break;
                    }
                } else {
                    switch (c) {
                    case 'x':
                        builder.appendWeekyear(tokenLen, tokenLen);
                        break;
                    case 'y':
                        builder.appendYear(tokenLen, tokenLen);
                        break;
                    case 'Y':
                        builder.appendYearOfEra(tokenLen, tokenLen);
                        break;
                    }
                }
                break;
            case 'M':
                if (tokenLen >= 3) {
                    if (tokenLen >= 4) {
                        builder.appendMonthOfYearText();
                    } else {
                        builder.appendMonthOfYearShortText();
                    }
                } else {
                    builder.appendMonthOfYear(tokenLen);
                }
                break;
            case 'd':
                builder.appendDayOfMonth(tokenLen);
                break;
            case 'a':
                builder.appendHalfdayOfDayText();
                break;
            case 'h':
                builder.appendClockhourOfHalfday(tokenLen);
                break;
            case 'H':
                builder.appendHourOfDay(tokenLen);
                break;
            case 'k':
                builder.appendClockhourOfDay(tokenLen);
                break;
            case 'K':
                builder.appendHourOfHalfday(tokenLen);
                break;
            case 'm':
                builder.appendMinuteOfHour(tokenLen);
                break;
            case 's':
                builder.appendSecondOfMinute(tokenLen);
                break;
            case 'S':
                builder.appendFractionOfSecond(tokenLen, tokenLen);
                break;
            case 'e':
                builder.appendDayOfWeek(tokenLen);
                break;
            case 'E':
                if (tokenLen >= 4) {
                    builder.appendDayOfWeekText();
                } else {
                    builder.appendDayOfWeekShortText();
                }
                break;
            case 'D':
                builder.appendDayOfYear(tokenLen);
                break;
            case 'w':
                builder.appendWeekOfWeekyear(tokenLen);
                break;
            case 'z':
                if (tokenLen >= 4) {
                    //builder.zimeZoneText();
                } else {
                    builder.appendTimeZoneShortText();
                }
                break;
            case 'Z':
                if (tokenLen === 1) {
                    builder.appendTimeZoneOffset(false);
                } else if (tokenLen === 2) {
                    builder.appendTimeZoneOffset(true);
                } else {
                    //builder.timeZoneId();
                }
                break;
            case "'":
                builder.appendLiteral(token.substring(1));
                break;
            default:
                throw new Error("Illegal pattern component: " + token);
            }
        }

        var i, token,
            length = pattern.length;

        for (i = 0; i < length; i += 1) {
            token = parseToken(pattern, i);
            i = tokenPos;
            handleToken(token);
        }
    }

    return {
        forPattern: function (pattern) {
            var builder = exports.DateTimeFormatterBuilder();
            parsePatternTo(builder, pattern);
            return builder.toFormatter();
        }
    };
}());