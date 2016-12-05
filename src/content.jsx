import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { scanPage } from './page-scanner'
import reducer from './reducers/index'
import ConfigDialog from './components/config-dialog/config-dialog'
import Overlay from './components/overlay'
import StatusBar from './components/status-bar'
import RepostCSS from './components/repost-css'
import { saveConfig } from './sagas/config'
import { load } from './actions/config'

const renderDirectly = (component) => {
	const fakeContainer = document.createElement('div')
	render(component, fakeContainer)
	return fakeContainer.children[0]
}

const initContentScript = () => {
	const config = localStorage.repostBlockerConfig && JSON.parse(localStorage.repostBlockerConfig)
	const sagaMiddleware = createSagaMiddleware()
	const store = createStore(reducer, applyMiddleware(sagaMiddleware))

	sagaMiddleware.run(saveConfig)

	if (config != null) {
		store.dispatch(load(config))
	}

	document.body.appendChild(renderDirectly(
		<Provider store={store}>
			<ConfigDialog />
		</Provider>
	))

	// render(
	// 	<Provider store={store}>
	// 		<Overlay />
	// 	</Provider>,
	// 	document.body
	// )

	// I know this is disgusting, but hey, if it works it ain't stupid :)
	document.head.appendChild(renderDirectly(
		<Provider store={store}>
			<RepostCSS />
		</Provider>
	))

	const userLink = document.querySelector('#header-bottom-right .user')
	const sep = document.createElement('span')
	const statusBarContainer = document.createElement('span')
	sep.innerHTML = '|'
	sep.className = 'separator'

	userLink.insertAdjacentElement('afterend',statusBarContainer)
	userLink.insertAdjacentElement('afterend',sep)

	render(
		<Provider store={store}>
			<StatusBar />
		</Provider>,
		statusBarContainer
	)

	// window.setInterval(() => scanPage(store), 5000)
	scanPage(store)
}

initContentScript()
