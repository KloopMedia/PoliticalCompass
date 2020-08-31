import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";


const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 120,

	},
}));

export default function CheckBox(props) {
	const classes = useStyles();

	const [state, setState] = React.useState(false);

	const handleInputChange = (event) => {
    console.log( "value:" + event.target.value + " checked: " + event.target.checked);

    //find student with that id and set checked value to it
    // for(const each of this.state.studentList){
    //     if( each.id == event.target.value){
    //       each.checked = event.target.checked;
    //     }
    // }

    //update student list state
    // this.setState({ studentList: this.state.studentList});
  }

	return (
		<FormControl>
			<FormGroup aria-label="position" row>
				<CheckBox
				label={props.key}
				// value={props.axises}
				/>
			</FormGroup>
		</FormControl>
	);
}