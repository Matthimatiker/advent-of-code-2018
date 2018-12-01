import { frequency } from './Frequency';
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