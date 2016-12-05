import React from 'react'
import { connect } from 'react-redux'
import { toggleConfigDialog } from '../actions/overlays'

const statusBar = ({ reposts, screened, total, dispatch }) =>
	<span onClick={() => dispatch(toggleConfigDialog(true))}>reposts: {reposts} - screened: {screened} - total: {total}</span>

export default connect(state => state.app.counters)(statusBar)
