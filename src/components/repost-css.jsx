import React from 'react'
import { connect } from 'react-redux'

const makeCSS = ({ fade, hide, applyCss, cssToApply }) => `
	.rb-repost {
		${fade ? 'opacity: 0.5;' : ''}
		${hide ? 'display: none;' : ''}
		${applyCss ? cssToApply : ''}
	}
`

const repostCSS = (config) =>
	<style>
		{ makeCSS(config) }
	</style>

export default connect(state => state.app.config)(repostCSS)
