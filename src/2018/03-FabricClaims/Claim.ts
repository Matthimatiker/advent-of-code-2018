export class Claim {

    /**
     * Extracts a claim from an identifier in format "#{id} @ {left},{top}: {width}x{height}", e.g. "#123 @ 3,2: 5x4"
     *
     * @param identifier
     */
    public static from(identifier: string): Claim {
        const [idPart, sizePart] = identifier.split(" @ ", 2);
        const id = idPart.substring(1);
        const [topLeftPart, dimensionPart] = sizePart.split(": ", 2);
        const [left, top] = topLeftPart.split(",");
        const [width, height] = dimensionPart.split("x");
        return new Claim(
            id,
            parseInt(left, 10),
            parseInt(top, 10),
            parseInt(width, 10),
            parseInt(height, 10)
        );
    }

    public constructor(
        public readonly id: string,
        public readonly left: number,
        public readonly top: number,
        public readonly width: number,
        public readonly height: number
    ) {
        if (id.trim() === "") {
            throw new Error(`ID must not be empty, but git "${id}".`);
        }
        if (left < 0) {
            throw new Error(`Left value must be greater than or equal to zero, but got ${left}.`);
        }
        if (top < 0) {
            throw new Error(`Top value must be greater than or equal to zero, but got ${top}.`);
        }
        if (width <= 0) {
            throw new Error(`Width must be greater than zero, but got ${width}.`);
        }
        if (height <= 0) {
            throw new Error(`Height must be greater than zero, but got ${height}.`);
        }
    }
}