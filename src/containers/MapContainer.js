import React, { Component } from "react"
// import { connect } from 'react-redux'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { getVehicleData } from '../tracker'

const POLL_FREQ_MS = 10000; // how often to poll NextBus (ms)

const mapStyles = {
  width: '100%',
  height: '100%'
};

async function dispatchUpdates() {
  const res = await getVehicleData();
  console.log(res);
  // TOTAL_UNITS++;
  // if (res) {
  //   console.log(res.routeTag + " route @ " + res.lat + ", " + res.lon);
  //   console.log(res);
  // } else {
  //   const last_seen = POLL_TIME_LAST == 0 ? INITIAL_TIME : POLL_TIME_LAST;
  //   console.log("offline since " + new Date(last_seen));
  // }
  // console.log("offline " + (UNITS_OFFLINE/TOTAL_UNITS)*100 + "% of the time");
}

class MapContainer extends Component {
  componentDidMount() {
    setInterval(dispatchUpdates, POLL_FREQ_MS);
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        initialCenter={{
         lat: 42.355,
         lng: -71.09
        }}>
        <Marker
        title={'The marker`s title will appear as a tooltip.'}
        name={'SOMA'}
        position={{lat: 42.355, lng: -71.09}} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDorMEZrngWHMt2oGj0AbWpX3Gwjr2H4kI'
})(MapContainer);

// // chart component
// const CommandChart = ({ rows, colors }) => {
//   return (
//     <Chart
//       id='commandChart'
//       options={ { colors: colors } }
//       chartType="Timeline"
//       data={[columns, ...rows]}
//       width="600px"
//       height="300px"
//     />
//   )
// }

// // override default tooltip to display command duration
// const getDescription = command => {
//   return `duration: ${command.duration} ms`
// }

// const mapStateToProps = state => {
//   const allCommands = Object.values(state.commands.allCommands)
//   const firstTimestamp = state.timestamps.min;
//   const maxDisplayTimestamp = state.displayTime === 'MOST_RECENT'
//     ? Date.now()
//     : state.displayTime

//   const data = allCommands
//     // filter commands on whether they started before the max display time
//     .filter(command => {
//       return command.start <= maxDisplayTimestamp
//     })
//     .reduce((accumulator, command) => {
//       const description = getDescription(command)

//       // if command failed, color it red
//       const color = command.status === 'failed'
//         ? 'red'
//         : '#99c1ff'

//       // if the command ended after the max display time, just have it end at the max display time
//       const end = command.end <= maxDisplayTimestamp
//         ? command.end
//         : maxDisplayTimestamp

//       // a bit of a hack: there's a bug where Google Charts doesn't recognize ranges < 1 second long,
//       // so multiply by 1000: https://github.com/google/google-visualization-issues/issues/2269
//       const startTime = (command.start - firstTimestamp) * 1000
//       const endTime = (end - firstTimestamp) * 1000

//       accumulator.colors.push(color)
//       accumulator.rows.push([
//         command.commandName,
//         '',
//         description,
//         startTime,
//         endTime
//       ])

//       return accumulator
//     }, { rows: [], colors: [] })

//   return data
// }

// export default connect(
//   mapStateToProps
// )(CommandChart)