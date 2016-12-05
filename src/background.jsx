import { registerLookupHandler } from 'platform'
import { query } from './query-api'
import { cleanup } from './cache'

const maxConcurrentLookups = 4
const lookupQueue = []
let currentLookups = 0

const checkForMore = () => {
	while (currentLookups < maxConcurrentLookups && lookupQueue.length > 0) {
		currentLookups++

		const { link, resolve } = lookupQueue.shift()
		const promise = query(link)

		promise.then(resolve)
		promise.then(() => {
			currentLookups--
			checkForMore()
		})
	}
}

registerLookupHandler((link) => {
	const promise = new Promise((resolve) =>
		lookupQueue.push({
			link,
			resolve
		})
	)

	checkForMore()

	return promise
})

setInterval(cleanup, 3600000)

cleanup()
