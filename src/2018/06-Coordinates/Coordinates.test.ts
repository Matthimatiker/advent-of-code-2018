import {Coordinate} from "./Coordinates";
import {expect} from "chai";

describe('Coordinate', () => {
    it('provides correct coordinates', () => {
        const coordinate = new Coordinate(3, 5);

        expect(coordinate.x).to.equal(3);
        expect(coordinate.y).to.equal(5);
    });

    describe('#manhattanDistance()', () => {
        it('returns zero for same coordinate', () => {
            const coordinate = new Coordinate(3, 5);

            const distance = coordinate.manhattanDistance(new Coordinate(3, 5));

            expect(distance).to.equal(0);
        });

        it('returns correct value for coordinates that differ on x axis', () => {
            const coordinate = new Coordinate(3, 5);

            const distance = coordinate.manhattanDistance(new Coordinate(5, 5));

            expect(distance).to.equal(2);
        });

        it('returns correct value for coordinates that differ on y axis', () => {
            const coordinate = new Coordinate(3, 5);

            const distance = coordinate.manhattanDistance(new Coordinate(3, 7));

            expect(distance).to.equal(2);
        });

        it('returns correct value for coordinates that differ on both axis', () => {
            const coordinate = new Coordinate(3, 5);

            const distance = coordinate.manhattanDistance(new Coordinate(4, 7));

            expect(distance).to.equal(3);
        });

        it('returns correct values if coordinates are negative', () => {
            const coordinate = new Coordinate(-3, -5);

            const distance = coordinate.manhattanDistance(new Coordinate(-4, -7));

            expect(distance).to.equal(3);
        });

        it('returns correct values if negative coordinate is compared to positive coordinate', () => {
            const coordinate = new Coordinate(-2, -3);

            const distance = coordinate.manhattanDistance(new Coordinate(2, 3));

            expect(distance).to.equal(10);
        });
    });

    describe('#from()', () => {
        it('extracts correct coordinates', () => {
            const coordinate = Coordinate.from('3, 5');

            expect(coordinate.x).to.equal(3);
            expect(coordinate.y).to.equal(5);
        });

        it('rejects invalid input', () => {
            expect(() => {
                Coordinate.from('buhuhu');
            }).to.throw(Error);
        });
    });
});