import React from 'react'
import { connect } from 'react-redux'

const Header = ({ status, percentOnline }) => {
  return (
    <h3 id='header'>
      Shuttle {status}. Offline {percentOnline}% of the time.
    </h3>
  )
}

const mapStateToProps = state => {
  const status = state.metadata.online ? "online" : "offline since " + new Date(state.metadata.lastPollTime);
  const p = (state.metadata.unitsOffline / state.metadata.totalUnits) * 100;
  const percentOnline = Math.round(p * 100) / 100;
  return { status: status, percentOnline: percentOnline }
}

export default connect(
  mapStateToProps
)(Header)