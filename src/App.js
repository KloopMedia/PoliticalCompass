import React, {Component} from 'react';
import "./App.css"

import TextInput from "./Components/form/textInput";
import SelectBox from "./Components/form/selectBox";
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
		axises: {},
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
		let total_axis = {
			a: 0,
			b: 0,
		}
		state_answers.forEach((item, index, array) => {
			answer = item[1]
			index_question = item[0]
			question = state.questions[index_question].title
			answer_index = state.questions[index_question].answer.indexOf(answer)
			axis = state.questions[index_question].axis[answer_index]

			total_axis.a += axis.a
			total_axis.b += axis.b
			this.setState({axises: total_axis})

		})

		console.log(state)

	};


	render() {
		let questionList = this.state.questions.map((el, i) => {
			// if (el.type === 'input') {
			//   return <TextInput key={i} index={i} title={el.title} returnAnswer={this.returnAnswer} />
			// }
			// else if (el.type === 'select') {
			if (el.type === 'select') {
				return <SelectBox key={i} index={i} title={el.title} answers={el.answer} returnAnswer={this.returnAnswer}/>
			}
			// else if (el.type === 'radio') {
			//   return <RadioButton key={i} index={i} title={el.title} answers={el.answer} returnAnswer={this.returnAnswer} axises={el.axis} returnAxis={this.returnAxis}/>
			// }
			// e
			// lse if (el.type === 'time') {
			//   return <TimePickers key={i} index={i} title={el.title} returnAnswer={this.returnAnswer} />
			// }
			// else if (el.type === 'multiradio') {
			//   return <RadioHorizontal key={i} index={i} title={el.title} subquestion={el.subquestion} answers={el.answer} returnAnswer={this.returnAnswer}
			//   axises={el.axis} returnAxis={this.returnAxis}/>
			// }
			// else {
			//   return null
			// }
		})

		return (
			<div className="App">
				<h1 className="text-align-center">{this.state.main_title}</h1>
				{this.state.showAnswers ? <p>{JSON.stringify(this.state.answers)}</p> : null}
				<button onClick={() => this.uploadData({"a": "HELLo"})}>Send data</button>
				<button onClick={() => this.getAxis(this.state)}>Show state</button>
				{questionList}
			</div>
		);
	}
}


export default App;
