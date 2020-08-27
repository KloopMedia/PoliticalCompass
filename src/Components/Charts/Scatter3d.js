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

	const getOption = () => ({
		grid3D: {},
		xAxis3D: {
			data: [1, 423, 4, 5]
		},
		yAxis3D: {
			data: [6, 3, 6, 33]
		},
		zAxis3D: {
			data: [6, 3, 6, 33]
		},
		series: [{
			type: 'scatter3D',
			symbolSize: 15,
			data: [1, 2, 3, 5],
			itemStyle: {
				opacity: 1
			}
		}]
	});

	return (
		<div className={classes.formControl}>
			<label>{props.status}</label>
			<ReactEcharts option={getOption()}/>
		</div>
	);
}

