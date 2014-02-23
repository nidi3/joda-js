/*global jodajs,DateTimeUtils,describe,it,expect*/
describe("DateTimeUtils", function () {

    describe("currentTimeMillis", function () {
        it("should return the same as new Date() if provider set to system", function () {
            DateTimeUtils.setCurrentMillisSystem();
            expect(Math.abs(DateTimeUtils.currentTimeMillis() - new Date().getTime())).toBeLessThan(10);
        });
        it("should return the same as new Date() by offset if provider set to offset", function () {
            DateTimeUtils.setCurrentMillisOffset(10000);
            expect(Math.abs(DateTimeUtils.currentTimeMillis() - 10000 - new Date().getTime())).toBeLessThan(10);
        });
        it("should return the a fixed value if provider set to fixed", function () {
            DateTimeUtils.setCurrentMillisFixed(10000);
            expect(DateTimeUtils.currentTimeMillis()).toEqual(10000);
        });


    });
});