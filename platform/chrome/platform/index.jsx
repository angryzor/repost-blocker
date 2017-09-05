// export const linkStream = Observable.fromEventPattern(
// 	(handler) => chrome.runtime.onMessage.addListener(handler),
// 	(handler) => chrome.runtime.onMessage.removeListener(handler)
// )

// registerLookupHandler :: (Link -> Promise<Array<Alternative>>) -> void
export const registerLookupHandler = (handler) =>
	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		handler(request).then(sendResponse)

		return true
	})


// requestLookup :: Link -> Promise<Array<Alternative>>
export const requestLookup = (link) => {
	return new Promise((resolve) =>
		chrome.runtime.sendMessage(link, resolve)
	)
}
