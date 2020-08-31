import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButton(props) {
	const [value, setValue] = React.useState('');
	const index = props.index

	const handleChange = (event) => {
		setValue(event.target.value)
		props.returnAnswer(event.target.value, index)
	};

	return (
		<div>
			<h4>{props.title}</h4>
			<FormControl const='fieldset'>
				<RadioGroup aria-label={props.title} name={props.title} value={value} onChange={handleChange}>
					{props.answers.map((el, i) => <FormControlLabel key={i} value={el} control={<Radio/>} label={el}/>)}
				</RadioGroup>
			</FormControl>
		</div>
	)
		;
}