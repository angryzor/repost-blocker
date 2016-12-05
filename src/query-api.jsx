import moment from 'moment'
import { getAlternatives, saveAlternatives } from './cache'
import { lookup } from './karma-decay-api'

const retrieveAlternatives = async (link) => {
	const cachedAlternatives = await getAlternatives(link)

	if (cachedAlternatives == null) {
		const kdResult = await lookup(link)
		await saveAlternatives(link, kdResult)
		return kdResult
	} else {
		return cachedAlternatives
	}
}

const isXPost = (link, alternatives) => {
	const treshold = moment(link.date).subtract(1, 'days')

	return alternatives.every((alternative) => moment(alternative.date).isAfter(treshold))
}

export const query = async (link) => {
	const alternatives = await retrieveAlternatives(link)

	return {
		repost: alternatives.length > 0 && !isXPost(link, alternatives),
		alternatives
	}
}
