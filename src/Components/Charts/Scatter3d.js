import React from 'react';
import ReactEcharts from "echarts-for-react";
import {makeStyles} from '@material-ui/core/styles';
import 'echarts-gl';

const useStyles = makeStyles((theme) => ({
	formControl: {
		paddingBottom: 120,
	},
}));

export default function Scatter3d(props) {
	const classes = useStyles();
	let distance = require('euclidean-distance')

	const data = () => {
		const values = Object.values(props.data)

		if (values.length < 3) {
			values.push(0)
		}

		return values
	};

	const distanceEuclid = (values) => {
		let min = Infinity;
		let itis = {
			distance: Infinity,
			title: Infinity,
		}
		let distanceIs;


		if (values.length != [0].length) {
			props.axises.forEach((item, index, array) => {
				// console.log('values ',values)
				distanceIs = distance(values, item);
				console.log(item)

				if (distanceIs < min) {
					min = distanceIs;
					itis = {
						distance: min,
						title: props.position[index],
					}
				}
			})
		}

		if (itis.distance != Infinity) {
			return <h4>{JSON.stringify(itis)}</h4>

		}

	}


	const getOption = () => ({
		grid3D: {},
		xAxis3D: {},
		yAxis3D: {},
		zAxis3D: {},
		series: [{
			type: 'scatter3D',
			symbolSize: 15,
			data: [data()],
			itemStyle: {
				opacity: 4
			}
		}]
	});

	return (
		<div className={classes.formControl}>
			<ReactEcharts option={getOption()}/>
			<p>{distanceEuclid(data())}</p>
		</div>
	);
}

