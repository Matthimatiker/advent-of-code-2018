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
    }
}

export class GuardShift {

    public static fromEvents(events: GuardEvent[]): GuardShift[] {
        throw new Error("not implemented");
    }

    public constructor(
        public readonly guard: Guard,
        public readonly events: GuardEvent[]
    ) {

    }
}

export class GuardProfile {
    public constructor(
        public readonly shifts: GuardShift[]
    ) {

    }
}

