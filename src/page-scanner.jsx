import { requestLookup } from 'platform'
import { lookupStarted, lookupFinished } from './actions/links'

const imageUrlPattern = /^https?:\/\/(i\.)?imgur.com\/.+|https?:\/\/gfycat.com\/.+|https?:\/\/i.reddituploads.com\/.+$/

const makeLink = (element) => ({
	date: Number(element.getAttribute('data-timestamp')),
	url: element.getAttribute('data-url')
})

const makeLinkWithElement = (element) => ({
	element,
	link: makeLink(element)
})

const checkImageUrl = ({ link: { url } }) =>
	imageUrlPattern.test(url)

export const scanPage = (store) => {
	const downvote = store.getState().app.config.downvote
	const links = Array.from(document.querySelectorAll('#siteTable .link:not(.rb-lookedup)'))
		.map(makeLinkWithElement)
		.filter(checkImageUrl)

	links.forEach(async ({ link, element }) => {
		element.className += ' rb-lookedup'
		store.dispatch(lookupStarted(link))
		const result = await requestLookup(link)
		store.dispatch(lookupFinished(link, result))

		if (result.repost) {
			element.className += ' rb-repost'

			if (downvote && element.querySelectorAll('.midcol.dislikes').length === 0) {
				element.querySelector('.arrow.down').click()
			}
		} else {
			element.className += ' rb-clean'
		}
	})
}
