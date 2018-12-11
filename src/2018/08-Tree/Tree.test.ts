import {expect} from "chai";
import {TreeParser} from "./Tree";

describe('TreeParser', () => {
    describe('#parse()', () => {
        const exampleData = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ').map(value => parseInt(value, 10));
        const root = TreeParser.parse(exampleData);

        it('extracts correct number of child nodes for root', () => {
            expect(root.children).to.have.lengthOf(2);
        });

        it('extracts correct meta data for root node', () => {
            expect(root.metadata).to.deep.equal([1, 1, 2]);
        });

        it('extracts correct number of child nodes for nodes at level 1', () => {
            expect(root.children[0].children).to.have.lengthOf(0);
            expect(root.children[1].children).to.have.lengthOf(1);
        });

        it('extracts correct metadata for nodes for nodes at level 1', () => {
            expect(root.children[0].metadata).to.deep.equal([10, 11, 12]);
        });
    });
});