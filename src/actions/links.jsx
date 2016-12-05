export const LOOKUP_STARTED = 'LOOKUP_STARTED'
export const LOOKUP_FINISHED = 'LOOKUP_FINISHED'

export const lookupStarted = (link) => ({ type: LOOKUP_STARTED, payload: { link } })
export const lookupFinished = (link, result) => ({ type: LOOKUP_FINISHED, payload: { link, result } })
