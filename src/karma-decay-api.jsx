import moment from 'moment'
import take from 'lodash/fp/take'

const dateTypes = ['seconds', 'minutes', 'hours', 'days', 'months', 'years'].map((name) => ({
	name,
	pattern: new RegExp(`(\\d+) ${name}? ago`)
}))

const parseDate = (str) => {
	const now = moment()
	const dateType = dateTypes.find((type) => str.match(type.pattern))
	return now.subtract(Number(str.match(dateType.pattern)[1]), dateType.name).valueOf()
}

const parseAlternatives = (page) => {
	const parser = new DOMParser()
	const doc = parser.parseFromString(page, "text/html")
	const foundString = doc.querySelector('tr:nth-child(5) td:first-child').innerText
	const hasReposts = foundString.indexOf("No similar images were found") == -1
	                && foundString.indexOf("No very similar images were found") == -1
	                && foundString.indexOf("Could not find an image") == -1;

	if (!hasReposts) {
		return []
	} else {
		const amountFound = parseInt(foundString.match(/\d+/))
		const results = take(amountFound)(doc.querySelectorAll('.result'))

		return results.map((result) => ({
			url: result.querySelector('.info a').getAttribute('href'),
			date: parseDate(result.querySelector('.submitted').innerText)
		}))
	}
}

export const lookup = async (link) => {
	const response = await fetch(`http://karmadecay.com/${link.url}`)
	const body = await response.text()

	return parseAlternatives(body)
}
