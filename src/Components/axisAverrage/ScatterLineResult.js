import React from 'react';
import ReactEcharts from "echarts-for-react";
import {makeStyles} from '@material-ui/core/styles';
import 'echarts-gl';
import "../../App.css"

const useStyles = makeStyles((theme) => ({
	formControl: {
		paddingBottom: 60,
	},
}));

export default function ScatterLine(props) {
	const classes = useStyles()
	let distanceIs;
	let minDistance = Infinity
	let position;
	let distance = require('euclidean-distance')

	let axises = props.partyAxises.map((el, i) => {
		let partyAxis = {
			symbolSize: 17,
			data: [[el[props.index], 0]],
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

		//get min distance
		distanceIs = distance([props.axisAverrage, 0], [el[props.index], 0])
		if (distanceIs < minDistance) {
			minDistance = distanceIs;

			position = {
				distance: minDistance,
				title: props.names[i],
			}
		}

		return partyAxis
	})
	axises.push({
		symbolSize: 13,
		data: [[props.axisAverrage, 0]],
		type: 'scatter',
		color: 'red'
	})

	const getOption = () => ({
		tooltip: {
			trigger: "axis",
			axisPointer: {}
		},
		xAxis: {
			min: -2,
			max: 2,
		},
		yAxis: {
			show: false
		},
		series: axises,
	})

	return (
		<div className={classes.formControl}>
			<p>{props.axisName}: {props.axisAverrage}</p>
			<div className={"scatter-line"}>
				<p>{props.axisPoints.minus}</p>
				<ReactEcharts option={getOption()}/>
				<p>{props.axisPoints.plus}</p>
			</div>
			<h4>Самая близкая партия на данном графике: {position.title}</h4>
		</div>
	)
}