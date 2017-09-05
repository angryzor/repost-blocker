import React from 'react'

export default ({ link: { alternatives } }) =>
	<section>
		<h1>Other similar posts</h1>
		<div className="main">
			<ul>
				{ alternatives.map((alternative) => <li>{alternative.url}</li>) }
			</ul>
		</div>
	</section>
