import {expect} from "chai";
import {Light, Observer, Position, Sky, Velocity} from "./Sky";

describe('Velocity', () => {
    describe('#multiplyBy()', () => {
        it('returns velocity with correct values', () => {
            const initialVelocity = new Velocity(1, 2);

            const newVelocity = initialVelocity.multiplyBy(3);

            expect(newVelocity.x).to.equal(3);
            expect(newVelocity.y).to.equal(6);
        });
    });
});

describe('Position', () => {
    describe('#moveBy()', () => {
        it('creates moved position', () => {
            const position = new Position(-3, 2);

            const newPosition = position.moveBy(new Velocity(2, 1));

            expect(newPosition.x).to.equal(-1);
            expect(newPosition.y).to.equal(3);
        });
    });

    describe('#distanceTo()', () => {
        it('returns 0 when compared to self', () => {
            const position = new Position(-3, 2);

            const distance = position.distanceTo(position);

            expect(distance).to.equal(0.0);
        });

        it('returns larger value when position is more distant', () => {
            const position = new Position(-3, 2);
            const near = new Position(-2, 1);
            const farAway = new Position(8, -9);

            expect(position.distanceTo(near)).to.be.lessThan(position.distanceTo(farAway));
        });

        it('returns same value for a.distanceTo(b) and b.distanceTo(a)', () => {
            const position = new Position(-3, 2);
            const anotherPosition = new Position(-2, 1);

            expect(position.distanceTo(anotherPosition)).to.equal(anotherPosition.distanceTo(position));
        });
    });
});

describe('Light', () => {
    describe('#fromText()', () => {
        it('returns object with correct values', () => {
            const light = Light.fromText('position=< 31097, -41136> velocity=<-3,  4>');

            expect(light.initialPosition.x).to.equal(31097);
            expect(light.initialPosition.y).to.equal(-41136);
            expect(light.velocity.x).to.equal(-3);
            expect(light.velocity.y).to.equal(4);
        });
    });
});

describe('Sky', () => {
    describe('#toString()', () => {
        it('returns representation of glowing positions', () => {
            const sky = new Sky([new Position(1, 1), new Position(2, 2), new Position(3, 2)]);

            const expected = "#..\n" +
                             ".##\n";

            expect(sky.toString()).to.equal(expected);
        });
    });
});

describe('Observer', () => {
    const example = "position=< 9,  1> velocity=< 0,  2>\n" +
        "position=< 7,  0> velocity=<-1,  0>\n" +
        "position=< 3, -2> velocity=<-1,  1>\n" +
        "position=< 6, 10> velocity=<-2, -1>\n" +
        "position=< 2, -4> velocity=< 2,  2>\n" +
        "position=<-6, 10> velocity=< 2, -2>\n" +
        "position=< 1,  8> velocity=< 1, -1>\n" +
        "position=< 1,  7> velocity=< 1,  0>\n" +
        "position=<-3, 11> velocity=< 1, -2>\n" +
        "position=< 7,  6> velocity=<-1, -1>\n" +
        "position=<-2,  3> velocity=< 1,  0>\n" +
        "position=<-4,  3> velocity=< 2,  0>\n" +
        "position=<10, -3> velocity=<-1,  1>\n" +
        "position=< 5, 11> velocity=< 1, -2>\n" +
        "position=< 4,  7> velocity=< 0, -1>\n" +
        "position=< 8, -2> velocity=< 0,  1>\n" +
        "position=<15,  0> velocity=<-2,  0>\n" +
        "position=< 1,  6> velocity=< 1,  0>\n" +
        "position=< 8,  9> velocity=< 0, -1>\n" +
        "position=< 3,  3> velocity=<-1,  1>\n" +
        "position=< 0,  5> velocity=< 0, -1>\n" +
        "position=<-2,  2> velocity=< 2,  0>\n" +
        "position=< 5, -2> velocity=< 1,  2>\n" +
        "position=< 1,  4> velocity=< 2,  1>\n" +
        "position=<-2,  7> velocity=< 2, -2>\n" +
        "position=< 3,  6> velocity=<-1, -1>\n" +
        "position=< 5,  0> velocity=< 1,  0>\n" +
        "position=<-6,  0> velocity=< 2,  0>\n" +
        "position=< 5,  9> velocity=< 1, -2>\n" +
        "position=<14,  7> velocity=<-2,  0>\n" +
        "position=<-3,  6> velocity=< 2, -1>";

    const expectedSkyAfter3Seconds = "" +
        "#...#..###\n" +
        "#...#...#.\n" +
        "#...#...#.\n" +
        "#####...#.\n" +
        "#...#...#.\n" +
        "#...#...#.\n" +
        "#...#...#.\n" +
        "#...#..###\n";

    it('calculates correct sky from example data', () => {
        const lights = example.split("\n").map(line => Light.fromText(line));
        const observer = new Observer(lights);

        expect(observer.after(3).toString()).to.equal(expectedSkyAfter3Seconds);
    });

    describe('#sortByWordProbability()', () => {
        it('finds sky with word', () => {
            const lights = example.split("\n").map(line => Light.fromText(line));
            const observer = new Observer(lights);

            const skies = [];
            for (let second = 0; second < 10; second++) {
                skies.push(observer.after(second));
            }

            const sorted = Observer.sortByWordProbability(skies);

            expect(sorted[0].toString()).to.equal(expectedSkyAfter3Seconds);
        });
    });
});