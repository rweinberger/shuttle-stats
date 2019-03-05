import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'
import { getVehicleData } from './tracker'
import {
  locUpdate,
  isOffline
} from './actions'

const POLL_FREQ_MS = 5000; // how often to poll NextBus (ms)
const store = createStore(rootReducer);

async function dispatchUpdates() {
  const data = await getVehicleData();
  if (data) {
    console.log(data);
    const lastPolltime = Date.now() - data.secsSinceReport * 1000;
    store.dispatch(locUpdate(data.lat, data.lon, lastPolltime));
  } else {
    store.dispatch(isOffline());
  }
}

setInterval(dispatchUpdates, POLL_FREQ_MS);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
