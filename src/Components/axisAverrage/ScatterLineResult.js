import React from 'react';
import ReactEcharts from "echarts-for-react";
import {makeStyles} from '@material-ui/core/styles';
import 'echarts-gl';
import "../../App.css"

const useStyles = makeStyles((theme) => ({
	formControl: {
		height: 60,
	},
}));

export default function ScatterLine(props) {
	const classes = useStyles()
	let distanceIs;
	let minDistance = Infinity
	let position;
	let distance = require('euclidean-distance')
	const color = ["#3B93EA", "#F7C906","#00405E" , "#552E83", "#010667", "#009749"]

	let axises = props.partyAxises.map((el, i) => {
		let partyAxis = {
			name: props.names[i],
			symbolSize: 12,
			data: [[el[props.index], 0]],
			type: 'scatter',
			color: color[i],
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
		symbolSize: 7,
		data: [[props.axisAverrage, 0]],
		type: 'scatter',
		color: 'black',
		emphasis: {
				label: {
					show: true,
					formatter: "Я",
					position: 'top'
				}
			}
	})


	const getOption = () => ({
		color: color,
		legend:{
			data: props.names,
			orient: "horizontal",
			bottom: "0%",
			width: "100%"
		},
		xAxis: {
			min: -2,
			max: 2,
		},
		yAxis: {
			show: false
		},
		height: 0,
		series: axises,
	})

	return (
		<div className='scatter-line'>
			<h5>{props.axisName}: {parseFloat(props.axisAverrage).toFixed(2)}</h5>
			<div>
				<p>{props.axisPoints.minus}</p>
				<ReactEcharts style={{height: "200px"}} className={`scatter`} option={getOption()}/>
				<p>{props.axisPoints.plus}</p>
			</div>
			<h4>Самая близкая вам партия по взглядам на оси "{props.axisName}" — "{position.title}"</h4>
		</div>
	)
}