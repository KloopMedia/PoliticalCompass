import React from 'react';
import ReactEcharts from "echarts-for-react";
import {makeStyles} from '@material-ui/core/styles';
import 'echarts-gl';

const useStyles = makeStyles((theme) => ({
	formControl: {
		paddingBottom: 120,
	},
}));

export default function Scatter(props) {
	const classes = useStyles();

	const getOption = () => ({
			xAxis: {},
			yAxis: {},
			series: [{
				symbolSize: 15,
				data: props.axises,
				type: 'scatter',
				color: 'black'
			},
				{
					symbolSize: 10,
					data: [props.myAxis],
					type: 'scatter',
					color: 'red'
				}
			]
		})
	;

	return (
		<div className={classes.formControl}>
			<ReactEcharts option={getOption()}/>
		</div>
	);
}