import React from 'react'
import { connect } from 'react-redux'
import ConfigForm from './form'
import { save } from '../../actions/config'
import { toggleConfigDialog } from '../../actions/overlays'
import flowRight from 'lodash/fp/flowRight'

const ConfigDialog = ({ dispatch, config, configOpen }) =>
	<div id="rb-config-dialog" className={configOpen ? '' : 'rb-hidden'}>
		<ConfigForm onSubmit={flowRight(dispatch, save)} initialValues={config} onClose={() => dispatch(toggleConfigDialog(false))} />
	</div>

export default connect((state) => ({
	config: state.app.config,
	configOpen: state.app.overlays.config.open
}))(ConfigDialog)
