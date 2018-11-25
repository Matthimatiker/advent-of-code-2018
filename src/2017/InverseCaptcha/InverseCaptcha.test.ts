import { sequenceSum } from './InverseCaptcha';
import { expect } from 'chai';
import 'mocha';

describe('sequenceSum()', () => {

    it('produces 3 for "1122"', () => {
        // produces a sum of 3 (1 + 2) because the first digit (1) matches the
        // second digit and the third digit (2) matches the fourth digit.
        const result = sequenceSum('1122');
        expect(result).to.equal(3);
    });

    it('produces 4 for "1111"', () => {
        // produces 4 because each digit (all 1) matches the next.
        const result = sequenceSum('1111');
        expect(result).to.equal(4);
    });

    it('produces 0 for "1234"', () => {
        // produces 0 because no digit matches the next.
        const result = sequenceSum('1234');
        expect(result).to.equal(0);
    });

    it('produces 9 for "91212129"', () => {
        // produces 9 because the only digit that matches the next one is the last digit, 9.
        const result = sequenceSum('91212129');
        expect(result).to.equal(9);
    });

    it('produces 0 for empty string', () => {
        const result = sequenceSum('');
        expect(result).to.equal(0);
    });
});