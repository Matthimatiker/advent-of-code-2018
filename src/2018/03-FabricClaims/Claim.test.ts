import {Claim} from "./Claim"
import {expect} from "chai";

describe('Claim', () => {

    describe('constructor()', () => {
        it('rejects empty ID', () => {
            expect(() => {
                new Claim("", 42, 42, 7, 7);
            }).throws(Error);
        });

        it('stores provided ID', () => {
            const claim = new Claim("13", 5, 5, 7, 17);

            expect(claim.id).to.equal("13");
        });

        it('accepts zero as top and left', () => {
            const claim = new Claim("13", 0, 0, 7, 17);

            expect(claim.left).to.equal(0);
            expect(claim.top).to.equal(0);
        });

        it('accepts positive top and left value', () => {
            const claim = new Claim("13", 42, 13, 7, 17);

            expect(claim.left).to.equal(42);
            expect(claim.top).to.equal(13);
        });

        it('rejects negative top value', () => {
            expect(() => {
                new Claim("13", -1, 42, 7, 7);
            }).throws(Error);
        });

        it('rejects negative left value', () => {
            expect(() => {
                new Claim("13", 42, -1, 7, 7);
            }).throws(Error);
        });

        it('rejects zero as width', () => {
            expect(() => {
                new Claim("13", 42, 42, 0, 7);
            }).throws(Error);
        });

        it('rejects zero as height', () => {
            expect(() => {
                new Claim("13", 42, 42, 7, 0);
            }).throws(Error);
        });

        it('rejects negative width', () => {
            expect(() => {
                new Claim("13", 42, 42, -1, 7);
            }).throws(Error);
        });

        it('rejects negative height', () => {
            expect(() => {
                new Claim("13", 42, 42, 7, -1);
            }).throws(Error);
        });

        it('accepts positive width and height', () => {
            const claim = new Claim("13", 42, 42, 7, 17);

            expect(claim.width).to.equal(7);
            expect(claim.height).to.equal(17);
        });
    });

    describe('#from()', () => {
        it('extracts correct values from "#123 @ 3,2: 5x4"', () => {
            const claim = Claim.from("#123 @ 3,2: 5x4");

            expect(claim.id).to.equal("123");
            expect(claim.left).to.equal(3);
            expect(claim.top).to.equal(2);
            expect(claim.width).to.equal(5);
            expect(claim.height).to.equal(4);
        });

        it('rejects identifier in invalid format', () => {
            expect(() => {
                Claim.from("buhuhu");
            }).throws(Error);
        });
    });

    describe('#size()', () => {
       it('returns correct value', () => {
           const claim = new Claim("13", 42, 17, 7, 13);

           expect(claim.size()).to.equal(7 * 13);
       });
    });
});