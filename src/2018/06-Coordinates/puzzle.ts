import {BoundedGrid, Coordinate} from "./Coordinates";

const puzzleInput = "137, 140\n" +
    "318, 75\n" +
    "205, 290\n" +
    "104, 141\n" +
    "163, 104\n" +
    "169, 164\n" +
    "238, 324\n" +
    "180, 166\n" +
    "260, 198\n" +
    "189, 139\n" +
    "290, 49\n" +
    "51, 350\n" +
    "51, 299\n" +
    "73, 324\n" +
    "220, 171\n" +
    "146, 336\n" +
    "167, 286\n" +
    "51, 254\n" +
    "40, 135\n" +
    "103, 138\n" +
    "100, 271\n" +
    "104, 328\n" +
    "80, 67\n" +
    "199, 180\n" +
    "320, 262\n" +
    "215, 290\n" +
    "96, 142\n" +
    "314, 128\n" +
    "162, 106\n" +
    "214, 326\n" +
    "303, 267\n" +
    "340, 96\n" +
    "211, 278\n" +
    "335, 250\n" +
    "41, 194\n" +
    "229, 291\n" +
    "45, 97\n" +
    "304, 208\n" +
    "198, 214\n" +
    "250, 80\n" +
    "200, 51\n" +
    "287, 50\n" +
    "120, 234\n" +
    "106, 311\n" +
    "41, 116\n" +
    "359, 152\n" +
    "189, 207\n" +
    "300, 167\n" +
    "318, 315\n" +
    "296, 72";

const coordinates = puzzleInput.split("\n").map((line) => Coordinate.from(line));
const grid = BoundedGrid.createEnclosing(coordinates);
console.log(`Analyzed grid: ${grid.topLeft} to ${grid.bottomRight}`);

const areaByCoordinate : {[key: string]: Coordinate[]} = {};
coordinates.forEach((coordinate) => {
    areaByCoordinate[coordinate.toString()] = [];
});
for (let gridCoordinate of grid.getCoordinates()) {
    const coordinateThatTheAreaBelongsTo = gridCoordinate.nearest(coordinates);
    if (coordinateThatTheAreaBelongsTo === null) {
        continue;
    }
    areaByCoordinate[coordinateThatTheAreaBelongsTo.toString()].push(gridCoordinate);
}

coordinates
    // Remove "infinite" areas.
    .filter((coordinate) => !grid.isOnEdge(coordinate))
    .sort((left, right) => areaByCoordinate[left.toString()].length - areaByCoordinate[right.toString()].length)
    .forEach((coordinate) => {
        console.log(`Coordinate ${coordinate} has area of ${areaByCoordinate[coordinate.toString()].length}`);
    });

