import { frequency, firstRepeatedFrequency } from './Frequency';
import { expect } from 'chai';
import 'mocha';

describe('frequency()', () => {

    it('+1, +1, +1 results in  3', () => {
        const result = frequency([+1, +1, +1]);
        expect(result).to.equal(3);
    });

    it('+1, +1, -2 results in  0', () => {
        const result = frequency([+1, +1, -2]);
        expect(result).to.equal(0);
    });

    it('-1, -2, -3 results in -6', () => {
        const result = frequency([-1, -2, -3]);
        expect(result).to.equal(-6);
    });

    it('works if input is provided as 1 value per line', () => {
        const result = frequency("-1\n-2\n-3");
        expect(result).to.equal(-6);
    });
});

describe('firstRepeatedFrequency()', () => {

    it('+1, -1 first reaches 0 twice', () => {
        const result = firstRepeatedFrequency([+1, -1]);
        expect(result).to.equal(0);
    });

    it('+3, +3, +4, -2, -4 first reaches 10 twice', () => {
        const result = firstRepeatedFrequency([+3, +3, +4, -2, -4]);
        expect(result).to.equal(10);
    });

    it('-6, +3, +8, +5, -6 first reaches 5 twice', () => {
        const result = firstRepeatedFrequency([-6, +3, +8, +5, -6]);
        expect(result).to.equal(5);
    });

    it('+7, +7, -2, -7, -4 first reaches 14 twice', () => {
        const result = firstRepeatedFrequency([+7, +7, -2, -7, -4]);
        expect(result).to.equal(14);
    });

    it('works if input is provided as 1 value per line', () => {
        const result = firstRepeatedFrequency("1\n-1");
        expect(result).to.equal(0);
    });

    it('stops if there is no repeating frequency', () => {
        expect(() => {
            // Frequency values will always increase.
            firstRepeatedFrequency([+1, +1]);
        }).throws(Error)
    });
});