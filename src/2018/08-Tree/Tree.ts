export class Node {
    public constructor(
        public readonly children: Node[],
        public readonly metadata: number[]
    ) {
    }

    /**
     * Returns the sum of the metadata in this node and all of its child nodes.
     */
    public metadataSum(): number {
        return this.sum(this.children.map(node => node.metadataSum())) + this.sum(this.metadata);
    }

    public childDependentSum(): number {
        if (this.children.length === 0) {
            return this.sum(this.metadata);
        }
        const childValues = this.metadata.map(value => {
            const childIndex = value - 1;
            if (childIndex < 0 || childIndex >= this.children.length) {
                return 0;
            }
            return this.children[childIndex].childDependentSum();
        });
        return this.sum(childValues);
    }

    private sum(entries: number[]): number {
        return entries.reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
    }
}

interface NodeParseResult {
    node: Node,
    newPosition: number
}

export class TreeParser {
    public static parse(data: number[]): Node {
        return this.parseNode(data, 0).node;
    }

    private static parseNode(data: number[], currentPosition: number): NodeParseResult {
        const numberOfChildNodes = data[currentPosition];
        const numberOfMetadataEntries = data[currentPosition + 1];
        let newPosition = currentPosition + 2;
        const childNodes = [];
        for (let i = 0; i < numberOfChildNodes; i++) {
            const result = this.parseNode(data, newPosition);
            childNodes.push(result.node);
            newPosition = result.newPosition;
        }
        const metadata = [];
        for (let i = 0; i < numberOfMetadataEntries; i++) {
            metadata.push(data[newPosition]);
            newPosition++;
        }
        return {
            node: new Node(childNodes, metadata),
            newPosition: newPosition
        };
    }
}