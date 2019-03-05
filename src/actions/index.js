export const locUpdate = (lat, long, lastPollTime) => ({
  type: 'LOC_UPDATE',
  lastPollTime: lastPollTime,
  lat: lat,
  long: long
})

export const isOffline = () => ({
  type: 'IS_OFFLINE'
})
