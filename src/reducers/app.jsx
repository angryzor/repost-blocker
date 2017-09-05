import { combineReducers } from 'redux'
import config from './config'
import counters from './counters'
import overlays from './overlays'

export default combineReducers({
	config,
	counters,
	overlays
})
