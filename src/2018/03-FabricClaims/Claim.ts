export class Claim {
    public static from(identifier: string): Claim {
        return new Claim("huhu", 1, 1, 1, 1);
    }

    public constructor(
        public readonly id: string,
        public readonly left: number,
        public readonly top: number,
        public readonly width: number,
        public readonly height: number
    ) {
    }
}