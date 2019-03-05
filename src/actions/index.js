export const locUpdate = (lat, long) => ({
  type: 'LOC_UPDATE',
  lat: lat,
  long: long
})

export const comeOnline = vehicleId => ({
  type: 'COME_ONLINE',
  vehicleId: vehicleId
})

export const goOffline = () => ({
  type: 'GO_OFFLINE'
})
