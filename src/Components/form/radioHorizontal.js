import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import '../../App.css'

export default function RadioHorizontal(props) {
	const [value, setValue] = React.useState({});
	const index = props.index
	let tmp = {}

	const handleChange = id => event => {
		tmp = {...value}
		tmp[id] = event.target.value
		setValue(tmp)
		props.returnAnswer(tmp, index)
		// props.returnAxis(tmp, index)
	};

	return (
		<div className="radioHorizontal">
			<h4>{props.title}</h4>
			<div className="question_item">
				{props.subquestion.map((question, id) =>
					<div className="question_item_" key={id}>
						<p>{question}</p>
						<FormControl component="fieldset" className="question_item__answer">
							<RadioGroup aria-label="position" name="position" className="question_item__answer_"
							            onChange={handleChange(id)}>
								{props.answers.map((el, i) =>
									<FormControlLabel
										key={i}
										value={el}
										control={<Radio color="primary"/>}
										label={id > 0 ? "" : el}
										labelPlacement="top"
									/>
								)}
								{/*{props.axises.map}*/}
								{console.log(props.axises.map)}
							</RadioGroup>
						</FormControl>
					</div>
				)}
			</div>
		</div>

	);
}
