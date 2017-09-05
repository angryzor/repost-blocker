import React from 'react'
import { reduxForm, Field } from 'redux-form'

// <label>Min days apart to be repost: <input class="rbcfgitem" name="daysapart" /></label>

const inputField = (field) => {
	const combinedOnChange = (...args) => {
		field.input.onChange(...args)
		window.setTimeout(() => field.handleSubmit(), 0)
	}
	
	return (
		<div>
			<label>
				<input {...field.input} type={field.type} onChange={combinedOnChange} />
				{field.description}
			</label>
		</div>
	)
}

const textareaField = (field) => {
	const combinedOnChange = (...args) => {
		field.input.onChange(...args)
		window.setTimeout(() => field.handleSubmit(), 0)
	}
	
	return (
		<div>
			<textarea {...field.input} onChange={combinedOnChange} />
		</div>
	)
}

const ConfigForm = ({ handleSubmit, onClose }) =>
	<div id="rb-config">
		<h1>Repost blocker config</h1>
		<form>
			<Field name="fade" component={inputField} type="checkbox" handleSubmit={handleSubmit} description="Fade out reposts" />
			<Field name="hide" component={inputField} type="checkbox" handleSubmit={handleSubmit} description="Hide reposts" />
			<Field name="downvote" component={inputField} type="checkbox" handleSubmit={handleSubmit} description="Downvote reposts" />
			<Field name="applyCss" component={inputField} type="checkbox" handleSubmit={handleSubmit} description="Apply the following custom CSS:" />
			<Field name="cssToApply" component={textareaField} handleSubmit={handleSubmit} />
			<input type="button" value="Close" onClick={onClose} />
		</form>
	</div>

export default reduxForm({
	form: 'config'
})(ConfigForm)

			// <Field name="showCounters" component={inputField} type="checkbox" description="Show counters" />
			// <Field name="showOverlay" component={inputField} type="checkbox" description="Show overlay" />
			// <input type="button" value="Clear database" />
