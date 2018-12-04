import {expect} from "chai";
import {GuardEvent, GuardEventType} from "./GuardDuty";

describe('GuardEvent', () => {

    describe('#from()', () => {
        it('parses shift BEGIN event correctly', () => {
            const event = GuardEvent.from('[1518-11-01 00:00] Guard #10 begins shift');

            expect(event.date).to.equal('1518-11-01 00:00');
            expect(event.guard).to.equal(10);
            expect(event.type).to.equal(GuardEventType.BEGIN_SHIFT);
        });

        it('parses WAKEUP event correctly', () => {
            const event = GuardEvent.from('[1518-11-01 00:25] wakes up');

            expect(event.date).to.equal('1518-11-01 00:25');
            expect(event.guard).to.equal(null);
            expect(event.type).to.equal(GuardEventType.WAKE_UP);
        });

        it('parses ASLEEP event correctly', () => {
            const event = GuardEvent.from('[1518-11-01 00:05] falls asleep');

            expect(event.date).to.equal('1518-11-01 00:05');
            expect(event.guard).to.equal(null);
            expect(event.type).to.equal(GuardEventType.FALL_ASLEEP);
        });

        it('throws error if input is invalid', () => {
            expect(() => {
                GuardEvent.from('buhuhu');
            }).throws(Error);
        });
    });

    describe('constructor()', () => {
        it('rejects BEGIN event without guard', () => {
            expect(() => {
                new GuardEvent('1518-11-01 00:05', null, GuardEventType.BEGIN_SHIFT);
            }).throws(Error);
        });
    });
});