/*global jodajs,DateTimeUtils,describe,it,expect*/
describe("DateTimeUtils", function () {
    describe("currentTimeMillis", function () {

        it("should use the given provider", function () {
            DateTimeUtils.setCurrentMillisProvider({
                getMillis: function () {
                    return 42;
                }
            });
            expect(DateTimeUtils.currentTimeMillis()).toBe(42);
        });

    });
});