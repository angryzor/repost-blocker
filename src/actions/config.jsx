export const LOAD_CONFIG = 'LOAD_CONFIG'
export const SAVE_CONFIG = 'SAVE_CONFIG'

export const load = (config) => ({ type: LOAD_CONFIG, payload: { config } })
export const save = (config) => ({ type: SAVE_CONFIG, payload: { config } })
