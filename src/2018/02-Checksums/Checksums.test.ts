
import {LetterCount, Checksum} from "./Checksums";
import {expect} from "chai";

describe('LetterCount#from()', () => {

    it('abcdef contains no letters that appear exactly two or three times.', () => {
        const result = LetterCount.from("abcdef");

        expect(result.exactlyTwo).to.equal(false);
        expect(result.exactlyThree).to.equal(false);
    });

    it('bababc contains two a and three b, so it counts for both.', () => {
        const result = LetterCount.from("bababc");

        expect(result.exactlyTwo).to.equal(true);
        expect(result.exactlyThree).to.equal(true);
    });

    it('abbcde contains two b, but no letter appears exactly three times.', () => {
        const result = LetterCount.from("abbcde");

        expect(result.exactlyTwo).to.equal(true);
        expect(result.exactlyThree).to.equal(false);
    });

    it('abcccd contains three c, but no letter appears exactly two times.', () => {
        const result = LetterCount.from("abcccd");

        expect(result.exactlyTwo).to.equal(false);
        expect(result.exactlyThree).to.equal(true);
    });

    it('aabcdd contains two a and two d, but it only counts once.', () => {
        const result = LetterCount.from("aabcdd");

        expect(result.exactlyTwo).to.equal(true);
        expect(result.exactlyThree).to.equal(false);
    });

    it('abcdee contains two e.', () => {
        const result = LetterCount.from("abcdee");

        expect(result.exactlyTwo).to.equal(true);
        expect(result.exactlyThree).to.equal(false);
    });

    it('ababab contains three a and three b, but it only counts once', () => {
        const result = LetterCount.from("ababab");

        expect(result.exactlyTwo).to.equal(false);
        expect(result.exactlyThree).to.equal(true);
    });
});

describe('Checksum#checksum()', () => {

    it('returns zero if given array is empty', () => {
        expect(Checksum.checksum([])).to.equal(0);
    });

    it('multiplies exactly twice and exactly three values', () => {
        const counts = [
            new LetterCount(true, false),
            new LetterCount(false, true),
            new LetterCount(true, false),
            new LetterCount(true, true),
        ];

        expect(Checksum.checksum(counts)).to.equal(3 * 2);
    });

    it('returns 12 for examples from LetterCount test', () => {
        const counts = [
            LetterCount.from("abcdef"),
            LetterCount.from("bababc"),
            LetterCount.from("abbcde"),
            LetterCount.from("abcccd"),
            LetterCount.from("aabcdd"),
            LetterCount.from("abcdee"),
            LetterCount.from("ababab")
        ];

        expect(Checksum.checksum(counts)).to.equal(4 * 3);
    });
});