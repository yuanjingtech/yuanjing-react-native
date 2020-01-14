import {EventEmitter, EventSubscription} from "fbemitter";
import {MutableRefObject, useEffect, useRef} from "react";

const eventEmitter = new EventEmitter();
export default eventEmitter
export const useEventEmitter = (eventEmitter: EventEmitter, eventName: string, fn: (...args: any[]) => void) => {
    const subscription: MutableRefObject<EventSubscription | null> = useRef<EventSubscription>(null);

    useEffect(() => {
        subscription.current = eventEmitter.addListener(eventName, fn);

        return () => {
            if (subscription.current) {
                subscription.current.remove();
            }
        }
    }, [eventName]);
};
export const useDefaultEventEmitter = (eventName: string, fn: (...args: any[]) => void) => useEventEmitter(eventEmitter, eventName, fn);
