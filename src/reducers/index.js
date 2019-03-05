import { combineReducers } from 'redux'

// each topology action pushes a new topology snapshot to the state
function locations(
  state = [{
    vehicleId: null,
    lat: null,
    long: null
  }], action) {
  switch (action.type) {
    case 'LOC_UPDATE':
      return [
        ...state,
        {
          lat: action.lat,
          long: action.long
        }
      ]
    case 'COME_ONLINE':
      return [
        ...state,
        {
          vehicleId: action.vehicleId
        }
      ]
    case 'GO_OFFLINE':
      return [
        ...state,
        {
          vehicleId: null,
          lat: null,
          long: null
        }
      ]
    default:
      return state
  }
}

// // set displayTime
// function displayTime(state = 'MOST_RECENT', action) {
//   switch (action.type) {
//     case 'SET_DISPLAY_TIME':
//       return action.displayTime
//     default:
//       return state
//   }
// }

const apmApp = combineReducers({
  locations
})

export default apmApp