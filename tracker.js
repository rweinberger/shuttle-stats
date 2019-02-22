const axios = require('axios');

const POLL_FREQ_MS = 10000;         // how often to poll NextBus (ms)
const INITIAL_TIME = Date.now();    // start time of script (ms)
let POLL_TIME_LAST = 0;             // last time the bus was online (ms)
let ONLINE = false;                 // is it online? this variable isn't actually used for anything (yet)
let UNITS_OFFLINE = 0;              // total number of units (i.e. POLL_FREQ_MS intervals) that it's been offline
let TOTAL_UNITS = 0;                // total number of units of time elapsed

// Enumerate route string names
const Routes = {                     
  DAYTIME: 'boston',
  SAFERIDE: 'saferidebostone'
}

// Asynchronously attempt to get data from both daytime & evening shuttles. 
async function getVehicleData() {
  const dayResponse = await fetch(Routes.DAYTIME); // first attempt daytime shuttle
  if (dayResponse.vehicle == null || dayResponse.vehicle.predictable == 'false') {
    const eveResponse = await fetch(Routes.SAFERIDE); // if it's offline, try evening shuttle
    if (eveResponse.vehicle == null || eveResponse.vehicle.predictable == 'false') {
      ONLINE = false;
      UNITS_OFFLINE++;
      return null;
    } else {
      ONLINE = true;
      POLL_TIME_LAST = parseInt(eveResponse.lastTime.time);
      return eveResponse.vehicle;
    }
  } else {
    ONLINE = true;
    POLL_TIME_LAST = parseInt(dayResponse.lastTime.time);
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

// Gets and prints shuttle stats to console.
async function main() {
  const res = await getVehicleData();
  TOTAL_UNITS++;
  if (res) {
    console.log(res.routeTag + " route @ " + res.lat + ", " + res.lon);
    console.log(res);
  } else {
    const last_seen = POLL_TIME_LAST == 0 ? INITIAL_TIME : POLL_TIME_LAST;
    console.log("offline since " + new Date(last_seen));
  }
  console.log("offline " + (UNITS_OFFLINE/TOTAL_UNITS)*100 + "% of the time");
}

// Get data every POLL_FREQ_MS.
setInterval(main, POLL_FREQ_MS);