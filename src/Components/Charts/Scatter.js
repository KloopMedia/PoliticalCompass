import React from 'react';
import ReactEcharts from "echarts-for-react";
import {makeStyles} from '@material-ui/core/styles';
import 'echarts-gl';

const useStyles = makeStyles((theme) => ({
	formControl: {
		paddingBottom: 30,
	},
}));

export default function Scatter(props) {
	const classes = useStyles();

	let axises = props.axises.map((el, i) => {
		let partyAxis = {
			symbolSize: 17,
			data: [el],
			type: 'scatter',
			color: 'black',
			emphasis: {
				label: {
					show: true,
					formatter: props.names[i],
					position: 'top'
				}
			}
		}
		return partyAxis
	})

	axises.push({
		symbolSize: 10,
		data: [props.myAxis],
		type: 'scatter',
		color: 'red'
	})
	const getOption = () => ({
		xAxis: {
			name: 'x',
			min: -2,
			max: 2,

		},
		yAxis: {
			name: 'y',
			min: -2,
			max: 2,

		},
		series: axises
	})
	return (
		<div className={classes.formControl}>
			<ReactEcharts option={getOption()}/>
		</div>
	);
}