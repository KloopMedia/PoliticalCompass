import React from 'react'
import ReactEcharts from "echarts-for-react";
import Slider from '@material-ui/core/Slider';
import Scatter3d from './Scatter3d'
import AxisProp from "./axis";

export default function Charts(props) {

	return (
		<div>
			
			<Scatter3d/>
		</div>
	);
}