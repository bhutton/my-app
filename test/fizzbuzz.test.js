import { calculateFizzBuzz } from '../src/fizzbuzz';

describe('When providing a number', () => {
    it('determines, fizz, buzz, of number', () => {
        expect(calculateFizzBuzz(1)).toEqual(1);
        expect(calculateFizzBuzz(2)).toEqual(2);
        expect(calculateFizzBuzz(3)).toEqual('fizz');
        expect(calculateFizzBuzz(5)).toEqual('buzz');
        expect(calculateFizzBuzz(6)).toEqual('fizz');
        expect(calculateFizzBuzz(9)).toEqual('fizz');
        expect(calculateFizzBuzz(10)).toEqual('buzz');
        expect(calculateFizzBuzz(15)).toEqual('fizzbuzz');
    });
});
