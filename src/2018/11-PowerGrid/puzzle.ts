import {CellPosition, Grid} from "./PowerGrid";

const grid = new Grid(3214, new CellPosition(1, 1), new CellPosition(300, 300));
const squareWithMostPower = grid.getSquareWithLargestTotalPower();

console.log(`Square with largest power starts at ${squareWithMostPower.topLeft} and has a total power of ${squareWithMostPower.getTotalPower()}`);