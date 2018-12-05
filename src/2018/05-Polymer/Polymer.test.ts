import {expect} from "chai";
import {react} from "./Polymer";

describe('react()', () => {
    it('does not remove units of same polarity', () => {
        const polymer = 'aa';

        const reactedPolymer = react(polymer);

        expect(reactedPolymer).to.equal('aa');
    });

    it('does not remove units of different type', () => {
        const polymer = 'aB';

        const reactedPolymer = react(polymer);

        expect(reactedPolymer).to.equal('aB');
    });

    it('does not remove units that could react, but that are not adjacent', () => {
        const polymer = 'abAB';

        const reactedPolymer = react(polymer);

        expect(reactedPolymer).to.equal('abAB');
    });

    it('removes reacting units within polymer', () => {
        const polymer = 'cbBD';

        const reactedPolymer = react(polymer);

        expect(reactedPolymer).to.equal('cD');
    });

    it('removes units that can react when other units reacted first', () => {
        const polymer = 'abBA';

        const reactedPolymer = react(polymer);

        expect(reactedPolymer).to.equal('');
    });

    it('returns correct value for example input from puzzle', () => {
        const polymer = 'dabAcCaCBAcCcaDA';

        const reactedPolymer = react(polymer);

        expect(reactedPolymer).to.equal('dabCBAcaDA');
    });
});