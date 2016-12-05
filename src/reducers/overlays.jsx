import { TOGGLE_CONFIG_DIALOG } from '../actions/overlays'

const defaultOverlayState = {
	config: {
		open: false
	}
}

export default (state = defaultOverlayState, action) => {
	switch (action.type) {
		case TOGGLE_CONFIG_DIALOG:
			return { ...state, config: { ...state.config, open: action.payload.state } }
		default:
			return state
	}
}
