const INITIAL_STATE = Symbol('INITIAL_STATE');
const CURRENT_STATE = Symbol('CURRENT_STATE');
const SUBSCRIBERS = Symbol('SUBSCRIBERS');

export class State<T> {
  static readonly INITIAL_STATE = INITIAL_STATE;
  static readonly CURRENT_STATE = CURRENT_STATE;
  static readonly SUBSCRIBERS = SUBSCRIBERS;

  [INITIAL_STATE]: T;
  [CURRENT_STATE]: T;
  [SUBSCRIBERS] = new Set<Subscriber<T>>();

  constructor(initial: T) {
    this[INITIAL_STATE] = Object.assign({}, initial);
    this[CURRENT_STATE] = Object.assign({}, initial);
  }

  /**
   * Gets the current state
   */
  get() {
    return Object.freeze(this[CURRENT_STATE]);
  }

  /**
   * The current state
   */
  get state() {
    return this.get();
  }

  /**
   * The number of subscribers
   */
  get size() {
    return this[SUBSCRIBERS].size;
  }

  /**
   * Sets the state of this broadcaster
   * @param newState New state to merge into the current state
   */
  set(newState: NewState<T>) {
    if (typeof newState === 'function') {
      let partialState = newState(this[CURRENT_STATE]);
      if (!partialState) {
        partialState = {};
      }
      this.set(partialState);
    } else {
      this[CURRENT_STATE] = Object.assign({}, this[CURRENT_STATE], newState);
      this.broadcast();
    }
  }

  /**
   * Subscribe to this broadcaster
   * @param subscriber Subscriber
   */
  subscribe(subscriber: Subscriber<T>) {
    this[SUBSCRIBERS].add(subscriber);
  }

  /**
   * Unsubscribe from this broadcaster
   * @param subscriber Subscriber
   */
  unsubscribe(subscriber: Subscriber<T>) {
    this[SUBSCRIBERS].delete(subscriber);
  }

  /**
   * Resets the state to the initial state
   */
  reset() {
    this.set(this[INITIAL_STATE]);
  }

  /**
   * Broadcast changes to other listeners
   */
  protected broadcast() {
    this[SUBSCRIBERS].forEach(cb => cb(this[CURRENT_STATE]));
  }

}

export type NewState<T> = Partial<T> | NewStateCB<T>;
export type NewStateCB<T> = (e: T) => Partial<T> | void;
export type Subscriber<T> = (e: T) => void;
