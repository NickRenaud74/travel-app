import { dateValidation, formValidation } from '../src/client/js/formValidation';

//dateValidation Test
describe("Testing date validation function", () => {
    test("Testing post request", async() => {
        expect(dateValidation).toBeDefined();
    });
});

//formValidation Test
describe("Testing form Validation function", () => {
    test("Testing handle submit", () => {
        expect(formValidation).toBeDefined();
    });
});