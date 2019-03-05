import { combineReducers } from 'redux'

// each topology action pushes a new topology snapshot to the state
function vehicles(
  state = {
    vehicleId: null,
    lat: null,
    long: null
  }, action) {
  switch (action.type) {
    case 'LOC_UPDATE':
      return {
        ...state,
        lat: action.lat,
        long: action.long
      }
    case 'IS_OFFLINE':
      return {
        ...state,
        vehicleId: null,
        lat: null,
        long: null
      }
    default:
      return state
  }
}

function metadata(
  state = {
    lastPollTime: Date.now(),
    online: false,
    unitsOnline: 0,
    unitsOffline: 1,
    totalUnits: 1
  }, action) {
  switch (action.type) {
    case 'LOC_UPDATE':
      return {
        ...state,
        lastPollTime: action.lastPollTime,
        online: true,
        unitsOnline: state.unitsOnline + 1,
        totalUnits: state.totalUnits + 1
      }
    case 'IS_OFFLINE':
      console.log(state);
      return {
        ...state,
        online: false,
        unitsOffline: state.unitsOffline + 1,
        totalUnits: state.totalUnits + 1
      }
    default:
      return state
  }
}

const apmApp = combineReducers({
  vehicles: vehicles,
  metadata: metadata
})

export default apmApp