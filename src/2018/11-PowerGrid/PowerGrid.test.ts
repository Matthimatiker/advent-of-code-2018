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
    });
});