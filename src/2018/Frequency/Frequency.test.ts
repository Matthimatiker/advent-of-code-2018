import { frequency } from './Frequency';
import { expect } from 'chai';
import 'mocha';

describe('frequency()', () => {

    it('+1, +1, +1 results in  3', () => {
        const result = frequency([+1, +1, +1]);
        expect(result).to.equal(3);
    });

    it('+1, +1, -2 results in  0', () => {
        // produces 4 because each digit (all 1) matches the next.
        const result = frequency([+1, +1, -2]);
        expect(result).to.equal(0);
    });

    it('-1, -2, -3 results in -6', () => {
        // produces 0 because no digit matches the next.
        const result = frequency([-1, -2, -3]);
        expect(result).to.equal(-6);
    });
});