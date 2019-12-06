export interface Cache<T> {

    set(value: T): Promise<void>;

    get(): Promise<T | null>;
}

export class ComposeCache<T> implements Cache<T> {
    private readonly current: Cache<T>;
    private readonly next: Cache<T>;

    constructor(current: Cache<T>, next: Cache<T>) {
        this.current = current;
        this.next = next;
    }

    async get(): Promise<T | null> {
        let value = await this.current.get();
        if (value != null) {
            return value
        }
        if (this.next != null) {
            let nextValue = await this.next.get();
            if (nextValue != null) {
                await this.set(nextValue)
            }
            return nextValue;
        }
        return null
    }

    async set(value: T): Promise<any> {
        await this.current.set(value);
        await this.next.set(value)
    }
}
