declare type Guard = number;

export enum GuardEventType {
    BEGIN_SHIFT,
    FALL_ASLEEP,
    WAKE_UP
}

export class GuardEvent {

    /**
     * Parses guard events from lines like the following:
     *
     *     [1518-11-01 00:00] Guard #10 begins shift
     *     [1518-11-01 00:05] falls asleep
     *     [1518-11-01 00:25] wakes up
     *
     * @param eventLine
     */
    public static from(eventLine: string) : GuardEvent {
        const date = eventLine.substr(1, 16);
        if (eventLine.includes("begins shift")) {
            const guardId = eventLine.substring(18)
                .replace("Guard #", "")
                .replace(" begins shift", "");
            return new GuardEvent(date, parseInt(guardId, 10), GuardEventType.BEGIN_SHIFT);
        } else if (eventLine.includes("falls asleep")) {
            return new GuardEvent(date, null, GuardEventType.FALL_ASLEEP);
        } else if (eventLine.includes("wakes up")) {
            return new GuardEvent(date, null, GuardEventType.WAKE_UP);
        } else {
            throw new Error(`Cannot parse event from line: ${eventLine}`)
        }
    }

    public constructor(
        public readonly date: string,
        public readonly guard: Guard|null,
        public readonly type: GuardEventType
    ) {
        if (type === GuardEventType.BEGIN_SHIFT && guard === null) {
            throw new Error('Guard ID must be provided for BEGIN_SHIFT events.');
        }
        if (date.length !== 16) {
            throw new Error(`Expected date in format YYYY-MM-DD HH:MM, but got "${date}".`);
        }
    }
}

export class GuardShift {

    public static fromEvents(events: GuardEvent[]): GuardShift[] {
        const orderedEvents = events.sort((left, right) => {
            return left.date.localeCompare(right.date);
        });
        const shifts : GuardShift[] = [];
        let eventsForNextShift: GuardEvent[] = [];
        for (let event of orderedEvents) {
            if (event.type === GuardEventType.BEGIN_SHIFT) {
                // A new shift starts.
                if (eventsForNextShift.length > 0) {
                    shifts.push(new GuardShift(eventsForNextShift[0].guard!, eventsForNextShift));
                }
                eventsForNextShift = [];
            }
            eventsForNextShift.push(event);
        }
        // Add the last shift.
        if (eventsForNextShift.length > 0) {
            shifts.push(new GuardShift(eventsForNextShift[0].guard!, eventsForNextShift));
        }
        return shifts;
    }

    public constructor(
        public readonly guard: Guard,
        public readonly events: GuardEvent[]
    ) {
        if (events.length === 0) {
            throw new Error(`Expected at least one event for guard ${guard}.`);
        }
        let dateBefore = '0000-00-00 00:00';
        for (let event of events) {
            if (event.guard !== null && event.guard !== guard) {
                throw new Error(`Expected only events of guard ${guard}, but found an event that belongs to ${event.guard}: ${event}`);
            }
            if (event.date < dateBefore) {
                throw new Error(`Expected events in ascending order, but found event from "${event.date}" after "${dateBefore}: ${event}"`);
            }
            dateBefore = event.date;
        }
        if (events[events.length - 1].type === GuardEventType.FALL_ASLEEP) {
            throw new Error(`Detected case that is currently not covered: Last event for guard ${guard} is FALL_ASLEEP: ${events[events.length - 1]}`);
        }
    }
}

export class GuardProfile {
    public constructor(
        public readonly shifts: GuardShift[]
    ) {

    }
}

