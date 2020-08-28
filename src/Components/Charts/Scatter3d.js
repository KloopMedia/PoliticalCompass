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
		xAxis3D: {},
		yAxis3D: {},
		zAxis3D: {},
		series: [{
			type: 'scatter3D',
			symbolSize: 15,
			data: props.data,
			itemStyle: {
				opacity: 4
			}
		}]
	});

	return (
		<div className={classes.formControl}>
			<ReactEcharts option={getOption()}/>
		</div>
	);
}

