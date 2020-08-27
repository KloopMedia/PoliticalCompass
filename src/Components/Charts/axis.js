import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Scatter3d from "./Scatter3d";


const useStyels = makeStyles((theme) =>({
	text:{
		fontSize: '25px',
	}
}));

export default function AxisProp(props){
	const classes = useStyels()


	return (
		<div>
			<p className={classes.text}>{JSON.stringify(props.axis)}</p>
		</div>
	)
}