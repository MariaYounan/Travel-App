import { getTripDetails } from '../client/js/app'


describe('Test, the function "getTripDetails()" should exist' , () => {
    test('It should return true', async () => {
        expect(getTripDetails).toBeDefined();
    });
});
describe('Test, the function "getTripDetails()" should be a function' , () => {
    test('It should be a function', async () => {
        expect(typeof getTripDetails).toBe("function");
    });
});