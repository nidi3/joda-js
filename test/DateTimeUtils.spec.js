/*global jodajs,describe,it,expect*/
describe('DateTimeUtils', function () {
    var Dtu = jodajs.DateTimeUtils;

    describe('currentTimeMillis', function () {
        it('should return the same as new Date() by default', function () {
            expect(Math.abs(Dtu.currentTimeMillis() - new Date().getTime())).toBeLessThan(10);
        });
        it('should return the same as new Date() if provider set to system', function () {
            Dtu.setCurrentMillisSystem();
            expect(Math.abs(Dtu.currentTimeMillis() - new Date().getTime())).toBeLessThan(10);
        });
        it('should return the same as new Date() by offset if provider set to offset', function () {
            Dtu.setCurrentMillisOffset(10000);
            expect(Math.abs(Dtu.currentTimeMillis() - 10000 - new Date().getTime())).toBeLessThan(10);
        });
        it('should return the a fixed value if provider set to fixed', function () {
            Dtu.setCurrentMillisFixed(10000);
            expect(Math.abs(Dtu.currentTimeMillis() - 10000)).toBeLessThan(10);
        });

    });
});