import {
    fibonacciCalculator,
    fibonacciToString,
} from '../src/fibonacciCalculator';

describe('When provided a number', () => {
    it('Calculates a fibonacci', () => {
        expect(fibonacciCalculator(1)).toEqual([0]);
        expect(fibonacciCalculator(2)).toEqual([0, 1]);
        expect(fibonacciCalculator(3)).toEqual([0, 1, 1]);
        expect(fibonacciCalculator(4)).toEqual([0, 1, 1, 2]);
        expect(fibonacciCalculator(5)).toEqual([0, 1, 1, 2, 3]);
        expect(fibonacciCalculator(6)).toEqual([0, 1, 1, 2, 3, 5]);
        expect(fibonacciCalculator(7)).toEqual([0, 1, 1, 2, 3, 5, 8]);
    });

    it('Calculates and prints a string', () => {
        expect(fibonacciToString(2)).toEqual('[0,1]');
    });
});
