import { LOOKUP_STARTED, LOOKUP_FINISHED } from '../actions/links'

export default (state = { screened: 0, reposts: 0, total: 0 }, action) => {
	switch (action.type) {
		case LOOKUP_STARTED:
			return { ...state, total: state.total + 1 }
		case LOOKUP_FINISHED:
			return { ...state, screened: state.screened + 1, reposts: state.reposts + (action.payload.result.repost ? 1 : 0) }
		default:
			return state
	}
}
