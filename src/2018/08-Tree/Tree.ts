export class Node {
    public constructor(
        public readonly children: Node[],
        public readonly metadata: number[]
    ) {

    }
}

export class TreeParser {
    public static parse(data: number[]): Node {
        throw new Error('Not implemented')
    }
}