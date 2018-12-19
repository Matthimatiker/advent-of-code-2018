import {expect} from "chai";
import {CellPosition, Grid} from "./PowerGrid";

describe('Grid', () => {

    describe('calculates correct cell power value', () => {
        const examples = [
            {
                gridSerial: 8,
                checkedCell: new CellPosition(3, 5),
                expectedPower: 4
            },
            {
                gridSerial: 57,
                checkedCell: new CellPosition(122, 79),
                expectedPower: -5
            },
            {
                gridSerial: 39,
                checkedCell: new CellPosition(217, 196),
                expectedPower: 0
            },
            {
                gridSerial: 71,
                checkedCell: new CellPosition(101, 153),
                expectedPower: 4
            },
        ];

        for (let example of examples) {
            it(`for cell ${example.checkedCell} in grid with serial number ${example.gridSerial}`, () => {
                const grid = new Grid(example.gridSerial, new CellPosition(1, 1), new CellPosition(300, 300));

                expect(grid.getPowerLevelAt(example.checkedCell)).to.equal(example.expectedPower);
            })
        }
    });

    describe('finds correct square with largest power', () => {
        const examples = [
            {
                gridSerial: 18,
                expectedTopLeft: new CellPosition(33, 45),
                expectedTotalPower: 29
            },
            {
                gridSerial: 42,
                expectedTopLeft: new CellPosition(21, 61),
                expectedTotalPower: 30
            }
        ];
        for (let example of examples) {
            it(`for grid with serial number ${example.gridSerial}`, () => {
                const grid = new Grid(example.gridSerial, new CellPosition(1, 1), new CellPosition(300, 300));

                const square = grid.getSquareWithLargestTotalPower();

                expect(square.topLeft).to.deep.equal(example.expectedTopLeft);
                expect(square.getTotalPower()).to.equal(example.expectedTotalPower);
            });

        }

        it('finds correct square of size 300', () => {
            const grid = new Grid(18, new CellPosition(1, 1), new CellPosition(300, 300));

            // This should be basically the grid itself.
            const square = grid.getSquareWithLargestTotalPower(300);

            expect(grid.getSize()).to.deep.equal(square.getSize());
            expect(grid.getTotalPower()).to.equal(square.getTotalPower());
        });
    });

    describe('#getSize()', () => {
        it('returns correct value', () => {
            const grid = new Grid(42, new CellPosition(1, 1), new CellPosition(200, 300));

            const size = grid.getSize();

            expect(size.x).to.equal(200);
            expect(size.y).to.equal(300);
        });
    });


    describe('finds correct square of any size with largest power', () => {
        const examples = [
            {
                gridSerial: 18,
                expectedTopLeft: new CellPosition(90, 269),
                expectedSize: 16,
                expectedTotalPower: 113
            },
            {
                gridSerial: 42,
                expectedTopLeft: new CellPosition(232, 251),
                expectedSize: 12,
                expectedTotalPower: 119
            }
        ];
        for (let example of examples) {
            it.skip(`for grid with serial number ${example.gridSerial}`, () => {
                const grid = new Grid(example.gridSerial, new CellPosition(1, 1), new CellPosition(300, 300));

                const square = grid.getSquareOfAnySizeWithLargestTotalPower();

                expect(square.topLeft).to.deep.equal(example.expectedTopLeft);
                expect(square.getTotalPower()).to.equal(example.expectedTotalPower);
                expect(square.getSize().x).to.equal(example.expectedSize);
                expect(square.getSize().y).to.equal(example.expectedSize);
            }).timeout(180000);
        }
    });
});