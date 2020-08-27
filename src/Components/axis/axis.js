import React from 'react';
import {makeStyles} from '@material-ui/core/styles';


const useStyels = makeStyles((theme) =>({
	text:{
		fontSize: '25px',
	}
}));

export default function AxisProp(props){
	const classes = useStyels()


	return (
		<div>
			<p className={classes.text}>{props.axis}</p>
		</div>
	)
}