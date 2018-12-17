export class CellPosition {
    public constructor(public readonly x: number, public readonly y: number) {
    }

    public toString(): string {
        return `(${this.x},${this.y})`;
    }
}

export class Grid {

    public constructor(private gridSerialNumber: number, public readonly topLeft: CellPosition, private bottomRight: CellPosition) {
    }

    public getPowerLevelAt(position: CellPosition): number {
        const rackId = position.x + 10;
        let powerLevel = rackId * position.y;
        powerLevel += this.gridSerialNumber;
        powerLevel *= rackId;
        const powerLevelAsString = powerLevel.toString(10);
        if (powerLevelAsString.length < 3) {
            return 0;
        }
        const hundredsDigit = parseInt(powerLevelAsString.charAt(powerLevelAsString.length - 3), 10);
        return hundredsDigit - 5;
    }

    public getTotalPower(): number {
        let power = 0;
        for (let x = this.topLeft.x; x <= this.bottomRight.x; x++) {
            for (let y = this.topLeft.y; y <= this.bottomRight.y; y++) {
                power += this.getPowerLevelAt(new CellPosition(x, y));
            }
        }
        return power;
    }

    /**
     * Returns the 3x3 square with largest power in this grid.
     */
    public getSquareWithLargestTotalPower(): Grid {
        const possibleSquares = [];
        for (let x = this.topLeft.x; x <= this.bottomRight.x - 2; x++) {
            for (let y = this.topLeft.y; y <= this.bottomRight.y - 2; y++) {
                const square = new Grid(this.gridSerialNumber, new CellPosition(x, y), new CellPosition(x + 2, y + 2));
                possibleSquares.push(square);
            }
        }
        return possibleSquares.sort((left, right) => -1 * (left.getTotalPower() - right.getTotalPower()))[0];
    }
}