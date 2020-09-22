import React from 'react'
import Scatter3d from './Scatter3d'

export default function Charts(props) {


	const data = () => {
		console.log('axis', props.axis)
		let keys = Object.keys(props.axis)
		let values = Object.values(props.axis)



		if (values.length == 2){
			values.push(0)
			console.log(values)
		}
	}

	return (
		<div>
			<Scatter3d data={data()}/>
		</div>
	);
}