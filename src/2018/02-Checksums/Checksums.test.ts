
import {LetterCount} from "./Checksums";
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