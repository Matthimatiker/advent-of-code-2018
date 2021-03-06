import {Claim, InchPosition} from "./Claim"
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

    describe('#getRight()', () => {
        it('returns correct value', () => {
            const claim = new Claim("13", 3, 17, 2, 13);

            expect(claim.getRight()).to.equal(4);
        });
    });

    describe('#getBottom()', () => {
        it('returns correct value', () => {
            const claim = new Claim("13", 42, 7, 9, 2);

            expect(claim.getBottom()).to.equal(8);
        });
    });

    describe('#size()', () => {
       it('returns correct value', () => {
           const claim = new Claim("13", 42, 17, 7, 13);

           expect(claim.size()).to.equal(7 * 13);
       });
    });

    describe('#intersection()', () => {
        it('returns null if there is no intersection', () => {
            const claim = new Claim("13", 42, 17, 7, 13);
            const anotherClaim = new Claim("42", 1, 1, 2, 3);

            const intersection = claim.intersection(anotherClaim);

            expect(intersection).to.equal(null);
        });

        it('returns correct partial intersection', () => {
            // Example from puzzle:
            const claim = Claim.from("#1 @ 1,3: 4x4");
            const anotherClaim = Claim.from("#2 @ 3,1: 4x4");

            const intersection = claim.intersection(anotherClaim);

            expect(intersection!.width).to.equal(2);
            expect(intersection!.height).to.equal(2);
            expect(intersection!.left).to.equal(3);
            expect(intersection!.top).to.equal(3);
        });

        it('left.intersection(right) equals right.intersection(left)', () => {
            const left = Claim.from("#1 @ 1,3: 4x4");
            const right = Claim.from("#2 @ 3,1: 4x4");

            const leftComparedToRight = left.intersection(right);
            const rightComparedToLeft = right.intersection(left);

            expect(leftComparedToRight!.id).to.equal(rightComparedToLeft!.id);
            expect(leftComparedToRight!.width).to.equal(rightComparedToLeft!.width);
            expect(leftComparedToRight!.height).to.equal(rightComparedToLeft!.height);
            expect(leftComparedToRight!.left).to.equal(rightComparedToLeft!.left);
            expect(leftComparedToRight!.top).to.equal(rightComparedToLeft!.top);
        });

        it('returns correct full intersection for container.intersection(smallerClaim)', () => {
            const container = Claim.from("#1 @ 1,2: 10x11");
            const smallerClaim = Claim.from("#2 @ 3,4: 5x6");

            const intersection = container.intersection(smallerClaim);

            expect(intersection!.width).to.equal(smallerClaim.width);
            expect(intersection!.height).to.equal(smallerClaim.height);
            expect(intersection!.left).to.equal(smallerClaim.left);
            expect(intersection!.top).to.equal(smallerClaim.top);
        });

        it('returns correct full intersection for smallerClaim.intersection(container)', () => {
            const container = Claim.from("#1 @ 1,2: 10x11");
            const smallerClaim = Claim.from("#2 @ 3,4: 5x6");

            const intersection = smallerClaim.intersection(container);

            expect(intersection!.width).to.equal(smallerClaim.width);
            expect(intersection!.height).to.equal(smallerClaim.height);
            expect(intersection!.left).to.equal(smallerClaim.left);
            expect(intersection!.top).to.equal(smallerClaim.top);
        });
    });

    describe('#getInches()', () => {
        it('returns correct number of inches', () => {
            const claim = new Claim("42", 1, 2, 3, 4);

            const inches = claim.getInches();

            expect(inches.length).to.equal(3 * 4);
        });

        it('returns correct inches', () => {
            const claim = new Claim("42", 2, 3, 1, 1);

            const inch = claim.getInches()[0];

            expect(inch.left).to.equal(2);
            expect(inch.top).to.equal(3);
        });
    });
});

describe('InchPosition', () => {
    describe('constructor()', () => {
        it('rejects negative left value', () => {
            expect(() => {
                new InchPosition(-1, 3);
            }).throws(Error);
        });

        it('rejects negative top value', () => {
            expect(() => {
                new InchPosition(3, -1);
            }).throws(Error);
        });

        it('assigns correct top and left values', () => {
            const position = new InchPosition(3, 5);

            expect(position.left).to.equal(3);
            expect(position.top).to.equal(5);
        });
    });

    describe('toString()', () => {
        it('provides different value if top value differs', () => {
            const first = new InchPosition(3, 5);
            const second = new InchPosition(3, 4);

            expect(first.toString()).to.not.equal(second.toString());
        });

        it('provides different value if left value differs', () => {
            const first = new InchPosition(3, 5);
            const second = new InchPosition(4, 5);

            expect(first.toString()).to.not.equal(second.toString());
        });

        it('provides same value if coordinates are equal', () => {
            const first = new InchPosition(3, 5);
            const second = new InchPosition(3, 5);

            expect(first.toString()).to.equal(second.toString());
        });
    });
});