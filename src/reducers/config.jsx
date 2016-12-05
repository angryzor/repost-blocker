import { LOAD_CONFIG, SAVE_CONFIG } from '../actions/config'

const defaultConfig = {
	fade: true,
	hide: false,
	downvote: false,
	applyCss: false,
	cssToApply: '',
	showCounters: true,
	showOverlay: true,
}

export default (state = defaultConfig, action) => {
	switch (action.type) {
		case LOAD_CONFIG:
			return action.payload.config
		case SAVE_CONFIG:
			return action.payload.config
		default:
			return state
	}
}
