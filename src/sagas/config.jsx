import { SAVE_CONFIG } from '../actions/config'
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

function* persistConfig({ payload: { config } }) {
	localStorage.repostBlockerConfig = JSON.stringify(config)
}

export function* saveConfig() {
	yield takeEvery(SAVE_CONFIG, persistConfig)
}
