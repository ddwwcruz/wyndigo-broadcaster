# wyndigo-broadcaster

## State

```js
import { State } from '@wyndigo/broadcaster'

let stateBroadcaster = new State({
  something: 'someValue'
});

// subscribe to the broadcaster
let subscriber = stateBroadcaster.subscribe(newState => {
  // do something
});

// set the state
stateBroadcaster.set({ something: 'new value with object' });
stateBroadcaster.set(oldState => {
  return {
    something: 'new value through function'
  };
});

// unsibscribe from the broadcaster
state.unsubscribe(subscriber);
```
