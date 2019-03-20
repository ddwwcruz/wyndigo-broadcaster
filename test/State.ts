import { expect } from 'chai';
import { State, Subscriber } from '../src/State';

describe('State', () => {
  const initialState = { number: 0, string: '', boolean: false };
  const state = new State(initialState);
  let subscriber: Subscriber<typeof initialState>;

  it('should start with no subscribers', () => {
    expect(state.size).to.equal(0);
  });

  it('should start with the initial state', () => {
    expect(state.state).to.be.sealed;
    expect(state.state.number).to.equal(initialState.number);
    expect(state.state.boolean).to.equal(initialState.boolean);
    expect(state.state.string).to.equal(initialState.string);
  });

  it('should be able to set state', () => {
    state.set(({ number }) => ({ number: number + 1 }));
    expect(state.state.number).to.equal(1);
  });

  it('should be able to subscribe', () => {
    state.subscribe(subscriber = ({ number }) => {
      expect(number).to.equal(2);
    });
    state.set(({ number }) => ({ number: number + 1 }));
    expect(state.size).to.equal(1);
  });

  it('should be able to unsubscribe from a broadcaster', () => {
    state.unsubscribe(subscriber);
    expect(state.size).to.equal(0);
  });

  it('should be able to reset the state', () => {
    state.reset();
    expect(state.state.number).to.equal(initialState.number);
    expect(state.state.boolean).to.equal(initialState.boolean);
    expect(state.state.string).to.equal(initialState.string);
  });
});
