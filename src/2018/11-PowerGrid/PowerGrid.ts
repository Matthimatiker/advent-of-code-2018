export class CellPosition {
    public constructor(public readonly x: number, public readonly y: number) {
    }

    public toString(): string {
        return `(${this.x},${this.y})`;
    }
}

export class GridSize {
    public constructor(public readonly x: number, public readonly y: number) {
    }

    public toString(): string {
        return `(${this.x}x${this.y})`;
    }
}

export class Grid {

    /**
     * Total power, if already calculated.
     */
    private totalPower: number|null = null;

    private readonly size: GridSize;

    public constructor(private gridSerialNumber: number, public readonly topLeft: CellPosition, private bottomRight: CellPosition) {
        this.size = new GridSize(bottomRight.x - topLeft.x + 1, bottomRight.y - topLeft.y + 1)
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
        if (this.totalPower === null) {
            let power = 0;
            for (let x = this.topLeft.x; x <= this.bottomRight.x; x++) {
                for (let y = this.topLeft.y; y <= this.bottomRight.y; y++) {
                    power += this.getPowerLevelAt(new CellPosition(x, y));
                }
            }
            this.totalPower = power;
        }
        return this.totalPower;
    }

    public getSize(): GridSize {
        return this.size;
    }

    /**
     * Returns the 3x3 square with largest power in this grid.
     */
    public getSquareWithLargestTotalPower(size = 3): Grid {
        let squareWithLargestPower = null;
        for (let x = this.topLeft.x; x <= this.bottomRight.x - size + 1; x++) {
            for (let y = this.topLeft.y; y <= this.bottomRight.y - size + 1; y++) {
                const square = new Grid(this.gridSerialNumber, new CellPosition(x, y), new CellPosition(x + size - 1, y + size - 1));
                if (squareWithLargestPower === null) {
                    squareWithLargestPower = square;
                } else if (squareWithLargestPower.getTotalPower() < square.getTotalPower()) {
                    squareWithLargestPower = square;
                }
            }
        }
        return squareWithLargestPower!;
    }

    public getSquareOfAnySizeWithLargestTotalPower(): Grid {
        let squareWithLargestPower = null;
        // This assumes that the grid itself is a square, which is ok for the puzzle.
        for (let size = 1; size <= this.getSize().x; size++) {
            const square = this.getSquareWithLargestTotalPower(size);
            if (squareWithLargestPower === null) {
                squareWithLargestPower = square;
            } else if (squareWithLargestPower.getTotalPower() < square.getTotalPower()) {
                squareWithLargestPower = square;
            }
        }
        return squareWithLargestPower!;
    }
}