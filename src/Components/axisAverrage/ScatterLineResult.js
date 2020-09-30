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
	const partyColor = props.partyColor

	let axises = props.partyAxises.map((el, i) => {
		let partyAxis = {
			name: props.names[i], 
			symbolSize: 12,
			data: [[el[props.index], 0]],
			type: 'scatter',
			color: partyColor[i],
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
		color: 'red',
		emphasis: {
			label: {
				show: true,
				formatter: "Я",
				position: 'top'
			}
		}
	})


	const getOption = () => ({
		color: partyColor,
		legend: {
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
			<h5 style={{textAlign:"center"}}>{props.axisName}: {parseFloat(props.axisAverrage).toFixed(2)}</h5>
			<div>
				<div className={"decision"}>
					<p className={"minus"}>
						{props.axisPoints.minus}<br/>
						<i className="em em-arrow_left" aria-role="presentation" aria-label="LEFTWARDS BLACK ARROW"></i>
					</p>
					<div>
						<div>
						</div>
					</div>
					<p className={"plus"}>{props.axisPoints.plus}<br/>
						<i className="em em-arrow_right" aria-role="presentation" aria-label="LEFTWARDS BLACK ARROW"></i>
					</p>
				</div>
				<ReactEcharts style={{height: "200px"}} className={`scatter`} option={getOption()}/>
			</div>
			<h4>Самая близкая вам партия по взглядам на оси "{props.axisName}" — "{position.title}"</h4>
		</div>
	)
}