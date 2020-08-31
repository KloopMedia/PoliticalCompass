import React, {Component} from 'react';
import "./App.css"

import TextInput from "./Components/form/textInput";
import AxisProp from "./Components/Charts/axis";
import SelectBox from "./Components/form/selectBox";
import Charts from "./Components/Charts/Charts";
import RadioButton from "./Components/form/radiobutton";
import TimePickers from "./Components/form/timePickers";
import RadioHorizontal from "./Components/form/radioHorizontal";
import Scatter3d from "./Components/Charts/Scatter3d";
import axis from "./Components/Charts/axis";
import CheckBox from "./Components/form/checkBox";


const queryString = require('query-string');


class App extends Component {
	state = {
		questions: [],
		main_title: '',
		axis_template: {},
		gateway: '',
		answers: {},
		axises: {},
		total_axis: [],
		position: {},
		axis: [],
		axis_names: [],
		compass_compare: {},
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
						axis_template: data.axis_template,
						main_title: data.main_title,
						gateway: data.gateway,
						compass_compare: data.compass_compare,
						axis: data.axises,
						axis_: data.axises_
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

	returnAxis = (axis) => {
		let axises = {...this.state.axises}
		axises = axis
		this.setState({axises: axises})
	}
	returnAxisName = (axis_name, index) => {
		let axises = {...this.state.axises}
		axises[index] = axis_name
		this.setState({axis_names: axises})
	}

	getAxis = (state) => {
		let state_answers = Object.entries(state.answers);

		let answer, index_question, question, answer_index, axis;
		let axs = state_answers.map((item, index, array) => {

			answer = item[1]
			index_question = item[0]
			question = state.questions[index_question].title
			answer_index = state.questions[index_question].answer.indexOf(answer)
			axis = state.questions[index_question].axis[answer_index]

			return axis
		})
		this.returnAxis(axs)
		this.getAxisSum(axs)
	};

	getAxisSum = (axs) => {
		const sum = this.state.axis_template
		Object.values(axs).forEach(el => {
			Object.keys(el).forEach(key => {
				sum[key] += el[key]
			})
		})
		this.distanceEuclid(sum)
	}

	distanceEuclid = (axises) => {
		axises = Object.values(axises)
		let distanceIs;
		let minDistance = Infinity;
		let distance = require('euclidean-distance')

		let positionInfo = {
			distance: Infinity,
			title: Infinity,
		}

		while (axises.length < 3) {
			axises.push(0)
		}

		this.setState({total_axis: axises})


		if (axises.length != [0].length) {
			this.state.compass_compare.axises.forEach((item, index, array) => {
				distanceIs = distance(axises, item);

				if (distanceIs < minDistance) {
					minDistance = distanceIs;

					positionInfo = {
						distance: minDistance,
						title: this.state.compass_compare.position[index],
					}
				}
				this.setState({position: positionInfo})
			})
		}


	}

	render() {
		let questionList = this.state.questions.map((el, i) => {
			if (el.type === 'select') {
				return <SelectBox key={i} index={i} title={el.title} answers={el.answer} returnAnswer={this.returnAnswer}/>
			}
		})

		let checkbox = this.state.axis.map((el, i) => {
			return <CheckBox key={i} index={i} title={el} returnAxisName={this.returnAxisName}/>
		})

		let chart = () => {
			if (this.state.axises != {}) {
				return <Scatter3d myAxis={this.state.total_axis} axises={this.state.compass_compare}/>
			}
		}

		return (
			<div className="App">
				<h1 className="text-align-center">{JSON.stringify(this.state.axis_template)}</h1>
				{this.state.showAnswers ? <p>{JSON.stringify(this.state.answers)}</p> : null}
				<button onClick={() => this.uploadData({"a": "HELLo"})}>Send data</button>
				<button onClick={() => this.getAxis(this.state)}>Show state</button>
				{questionList}
				{checkbox}
				{console.log(this.state.axis_names)}
				<AxisProp axis={this.state.axises}/>
				{chart()}
				<h4>{JSON.stringify(this.state.position)}</h4>
			</div>
		);
	}
}


export default App;
