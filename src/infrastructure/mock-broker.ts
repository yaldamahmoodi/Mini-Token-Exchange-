export class MockBroker {
    private events: any[] = [];

    publish(eventName: string, payload: any) {
        console.log(`Event published: ${eventName}`, payload);
        this.events.push({eventName, payload});
    }

    getEvents() {
        return this.events;
    }
}

//  TODO: event overflow
// get last event
// handle push bug
// queue structure