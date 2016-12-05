import Dexie from 'dexie'

const db = new Dexie('repost-blocker')

db.version(1).stores({
	alternatives: '&url,createdAt'
})
db.open()

export const getAlternatives = async ({ url }) => {
	const result = await db.alternatives
		.where('url')
		.equals(url)
		.first()

	return result && result.alternatives
}

export const saveAlternatives = ({ url }, alternatives) =>
	db.alternatives
		.add({
			url,
			alternatives,
			createdAt: Date.now()
		})

export const cleanup = () =>
	db.alternatives
		.where('createdAt')
		.below(Date.now() - 2592000000)
		.delete()
