const axios = require('axios');

// Enumerate route string names
const Routes = {                     
  DAYTIME: 'boston',
  SAFERIDE: 'saferidebostone'
}

// Asynchronously attempt to get data from both daytime & evening shuttles. 
async function getVehicleData() {
  const dayResponse = await fetch(Routes.DAYTIME); // first attempt daytime shuttle
  if (dayResponse.vehicle == null || dayResponse.vehicle.predictable === 'false') {
    const eveResponse = await fetch(Routes.SAFERIDE); // if it's offline, try evening shuttle
    if (eveResponse.vehicle == null || eveResponse.vehicle.predictable === 'false') {
      return null;
    } else {
      return eveResponse.vehicle;
    }
  } else {
    return dayResponse.vehicle;
  }
}

// Queries NextBus for active vehicle locations on a particular route. Returns a Promise that resolves with vehicle data.
// API docs at https://www.nextbus.com/xmlFeedDocs/NextBusXMLFeed.pdf
function fetch(route) {
  const reqURL = 'http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=mit&r='+ route +'&t=0';
  return new Promise((resolve, reject) => {
    axios.get(reqURL)
    .then(response => {
      resolve(response.data);
    }).catch(error => {
      reject(error);
    });
  });
}

export { getVehicleData };
