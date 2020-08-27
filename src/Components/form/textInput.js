import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			width: '40ch',
		},
	},

}));


function BasicTextFields(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState('');
	const index = props.index

	const handleChange = (event) => {
		setValue(event.target.value)
		props.returnAnswer(event.target.value, index)
	};

	return (
		<div>
			<form noValidate autoComplete="off">
				<h4>{props.title}</h4>
				<TextField 
					className={classes.root}
					id={"inputBox" + index}
					label="Мой ответ"
					value={value}
					onChange={handleChange}
				/>
			</form>
		</div>
	);
}

export default BasicTextFields