import {CellPosition, Grid} from "./PowerGrid";

const grid = new Grid(3214, new CellPosition(1, 1), new CellPosition(300, 300));
const squareWithMostPower = grid.getSquareWithLargestTotalPower();

console.log(`Square with largest power starts at ${squareWithMostPower.topLeft} and has a total power of ${squareWithMostPower.getTotalPower()}`);

const squareOfAnySizeWithMostPower = grid.getSquareOfAnySizeWithLargestTotalPower();
console.log((`Square of any size with largest power starts at ${squareOfAnySizeWithMostPower.topLeft}, has the size ${squareOfAnySizeWithMostPower.getSize()} and a total power of ${squareOfAnySizeWithMostPower.getTotalPower()}`));