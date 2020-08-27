import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 'auto',
	},
}));

export default function TimePickers(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState('');
	const index = props.index

	const handleChange = (event) => {
		setValue(event.target.value)
		props.returnAnswer(event.target.value, index)
	};


	return (
		<div>
			<h4>{props.title}</h4>
			<form className={classes.container} noValidate>
				<TextField
					id={"time" + index}
					label="Время"
					type="time"
					value={value}
					onChange={handleChange}
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
					InputProps={{disableUnderline: true}}
				/>
			</form>
		</div>
	);
}