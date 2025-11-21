import { pinoLogger } from "../presentation/shared/pino-logger";

export interface BrokerEvent {
    eventName: string;
    payload: any;
}

export class MockBroker {
    private eventQueue: BrokerEvent[] = [];

    publish(eventName: string, payload: any) {
        const event: BrokerEvent = { eventName, payload };
        this.eventQueue.push(event);
        pinoLogger.info(event, "Event published");
    }

    getEvents(): BrokerEvent[] {
        return [...this.eventQueue];
    }

    getFirstEvent(): BrokerEvent | undefined {
        return this.eventQueue.length > 0 ? this.eventQueue[0] : undefined;
    }

    getLastEvent(): BrokerEvent | undefined {
        return this.eventQueue.length > 0
            ? this.eventQueue[this.eventQueue.length - 1]
            : undefined;
    }

    dequeue(): BrokerEvent | undefined {
        return this.eventQueue.shift();
    }

    clearQueue(): void {
        this.eventQueue = [];
    }

    count(): number {
        return this.eventQueue.length;
    }
}
