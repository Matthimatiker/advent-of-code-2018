import {expect} from "chai";
import {Rule} from "./Steps";

describe('Rule', () => {
    describe('#from()', () => {
        it('returns correct object', () => {
            const rule = Rule.from('Step N must be finished before step T can begin.');

            expect(rule.step).to.equal('T');
            expect(rule.required).to.equal('N');
        });
    });
});

describe('Step', () => {
    describe('#requirementsFulfilledBy()', () => {
        it('returns true if step has no requirements', () => {

        });

        it('returns true if all requirements are fulfilled', () => {

        });

        it('returns true if more than the required steps are fulfilled', () => {

        });

        it('returns false if requirements are only partially fulfilled', () => {

        });

        it('returns false if only unrelated requirements are fulfilled', () => {

        });

        it('returns false if no requirements are fulfilled', () => {

        });
    });

    describe('#fromRules()', () => {
        it('returns steps without requirements', () => {

        });

        it('returns steps with aggregated requirements', () => {

        });
    });
});

describe('#order()', () => {

});