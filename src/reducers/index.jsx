import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import app from './app'

export default combineReducers({
	app,
	form
})