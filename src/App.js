import React, {Component} from 'react';
import "./App.css"

import TextInput from "./Components/form/textInput";
import AxisProp from "./Components/Charts/axis";
import SelectBox from "./Components/form/selectBox";
import Charts from "./Components/Charts/Charts";
import RadioButton from "./Components/form/radiobutton";
import TimePickers from "./Components/form/timePickers";
import RadioHorizontal from "./Components/form/radioHorizontal";

const queryString = require('query-string');


class App extends Component {
	state = {
		questions: [],
		main_title: '',
		gateway: '',
		answers: {},
		axises: [],
		showAnswers: false
	}

	componentDidMount() {
		this.downloadData()
	}

	downloadData = () => {
		let urlString = queryString.parse(window.location.search, {decode: false})
		console.log(urlString)
		if (true) {
			// if (urlString.url) {
			// 	fetch(urlString.url)
			fetch('https://raw.githubusercontent.com/Kabirov7/kloop-forms-test/master/config.json')
				.then((response) => {
					console.log("RESPONSE", response)
					return response.json();
				})
				.then((data) => {
					console.log("DATA", data);
					this.setState({
						questions: data.questions,
						main_title: data.main_title,
						gateway: data.gateway
					})
				});
		} else {
			console.log("ERROR: no url detected")
		}
	}

	uploadData = (data) => {
		fetch(this.state.gateway, {
			method: 'POST',
			mode: 'no-cors',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(
			response => response.json()
		).then(
			success => console.log(success)
		).catch(
			error => {
				console.log("Error", error)
				this.setState({showAnswers: true})
			}
		);
	}

	returnAnswer = (answer, index) => {
		let answers = {...this.state.answers}
		answers[index] = answer
		this.setState({answers: answers})
	}

	getAxis = (state) => {
		let state_answers = Object.entries(state.answers);
		let answer, index_question, question, answer_index, axis;
		let total_axis = this.state.axises
		state_answers.forEach((item) => {
			answer = item[1]
			index_question = item[0]
			question = state.questions[index_question].title
			answer_index = state.questions[index_question].answer.indexOf(answer)
			axis = state.questions[index_question].axis[answer_index]

			total_axis = axis
			this.setState({axises: total_axis})

		})

	};


	render() {
		let questionList = this.state.questions.map((el, i) => {
			if (el.type === 'select') {
				return <SelectBox key={i} index={i} title={el.title} answers={el.answer} returnAnswer={this.returnAnswer}/>
			}
		})



		return (
			<div className="App">
				<h1 className="text-align-center">{this.state.main_title}</h1>
				{this.state.showAnswers ? <p>{JSON.stringify(this.state.answers)}</p> : null}
				<button onClick={() => this.uploadData({"a": "HELLo"})}>Send data</button>
				<button onClick={() => this.getAxis(this.state)}>Show state</button>
				{questionList}
				<AxisProp axis={this.state.axises}/>
				<Charts axis={this.state.axises}/>
			</div>
		);
	}
}


export default App;
