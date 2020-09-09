import React, {Component} from 'react';
import "./App.css"
import AxisProp from "./Components/Charts/axis";
import SelectBox from "./Components/form/selectBox";
import Scatter3d from "./Components/Charts/Scatter3d";
import RadioButton from "./Components/form/radiobutton";
import CheckBox from "./Components/form/checkBox";
import {push} from "echarts/src/component/dataZoom/history";


const queryString = require('query-string');


class App extends Component {
	state = {
		questions: [],
		main_title: '',
		gateway: '',
		answers: {},
		axises: {},
		total_axis: [],
		axis_title_values: [],
		axis_values: [],
		position: {},
		axis: [],
		axis_title: [],
		axises_object: [],
		axis_names: {},
		all_axis: {},
		answer_title_values: [],
		answer_values: [],
		count_axises: [],
		compass_compare: {},
		default_axises: [],
		showAnswers: false,
		size: 0,
		page: 0
	}

	componentDidMount() {
		this.downloadData()
	}

	downloadData = () => {
		let urlString = queryString.parse(window.location.search, {decode: false})
		console.log(urlString)
		if (true) {
			fetch('https://raw.githubusercontent.com/Kabirov7/kloop-forms-test/master/config.json')
				// if (urlString.url) {
				// 	fetch(urlString.url)
				.then((response) => {
					console.log("RESPONSE", response)
					return response.json();
				})
				.then((data) => {
					console.log("DATA", data);
					this.setState({
						questions: data.questions,
						main_title: data.main_title,
						gateway: data.gateway,
						compass_compare: data.compass_compare,
						axis: data.axises,
						axis_title: data.axis_title,
						axis_title_values: data.axis_title_values,
						axis_values: data.axis_values,
						answer_title_values: data.answer_title_values,
						answer_values: data.answer_values,
						axises_object: data.axises_object,
						size: data.questions.length
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

	returnAxisName = (axis_name, index) => {
		let axises = {...this.state.axis_names}
		axises[index] = axis_name
		this.setState({axis_names: axises})
	}

	getAxisTemplate = (state) => {
		let axis_names = [];
		let axis, axis_index, axis_object;
		let all_axis;
		let template = Object.entries(state.axis_names).map((item, index, array) => {
			axis = item[1]
			axis_index = item[0]
			axis_object = state.axises_object[axis_index]
			if (axis) {
				axis_names.push(axis_object)
				return axis_object
			}
		})

		template = template.filter(item => item !== undefined)
		template = template.reverse()
		for (let i = 0; i < template.length + 1; i++) {
			if (i != template.length) {
				all_axis = Object.assign({}, template[i], template[i + 1], all_axis)
			}
		}
		return all_axis
		this.setState({all_axis: all_axis})
	}

	returnAxis = (axis) => {
		let axises = {...this.state.axises}
		axises = axis
		this.setState({axises: axises})
	}

	getAxis = (state) => {
		let state_answers = Object.entries(state.answers);

		let axises_names = [];
		let axis_count = {};
		let answer, index_question;
		let axs = state_answers.map((item, index, array) => {

			answer = item[1]
			index_question = item[0]
			let answer_type = state.questions[index_question].answer;
			let answer_type_index = state.answer_title_values.indexOf(answer_type)
			let answers_item = state.answer_values[answer_type_index]
			let answer_index = answers_item.indexOf(answer)

			let axis_type = state.questions[index_question].axis;
			let axis_type_index = state.axis_title_values.indexOf(axis_type)
			let axis_array = state.axis_values[axis_type_index]
			let axis_is = axis_array[answer_index]

			axises_names.push(Object.keys(axis_is)[0])

			return axis_is;
		})
		axises_names = axises_names.sort()

		let unique_axis = [...new Set(axises_names)];
		unique_axis.forEach((item, index) => {
			let difference = (axises_names.lastIndexOf(item) + 1) - axises_names.indexOf(item)

			axis_count[item] = difference
		})
		this.returnAxis(axs);
		this.getAxisAverage(axs, axis_count);
	};

	getAxisAverage = (axs, axis_count) => {
		const sum = this.getAxisTemplate(this.state)
		let sum_array;

		Object.values(axs).forEach(el => {
			Object.keys(el).forEach(key => {
				if (sum[key] !== undefined) {
					sum[key] += el[key]
				}
			})
		})

		Object.keys(sum).forEach(key => {
			if (axis_count[key] !== undefined) {
				sum[key] = sum[key] / axis_count[key]
			}
		})

		sum_array = Object.values(sum)
		this.distanceEuclid(sum)
	}

	distanceEuclid = (axises_object) => {
		let distanceIs;
		let minDistance = Infinity;
		let axises = [];
		let distance = require('euclidean-distance')

		let positionInfo = {
			distance: Infinity,
			title: Infinity,
		}

		let axises_object_keys = Object.keys(axises_object);//keys of choosen axises
		let axises_object_values = Object.values(axises_object);// values of choosen axises
		const axises_idx = [];
		;

		let default_axises = [];
		while (default_axises.length < this.state.compass_compare.axises.length) {
			default_axises.push([])
		}

		axises_object_keys.forEach((el, i) => {
			axises[i] = axises_object_values[i]
			axises_idx[i] = this.state.axis.indexOf(el)
		})

		this.state.compass_compare.axises.map((item, item_index) => {
			let default_axis = []
			while (default_axis.length < axises_idx.length) {
				default_axis.push(0)
			}
			axises_idx.forEach((axis_idx, idx) => {
				default_axis[idx] = item[axis_idx]
			})

			default_axises[item_index] = default_axis
		})

		this.setState({total_axis: axises})


		if (axises.length != [0].length) {
			default_axises.forEach((item, index, array) => {
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
		let qSet = null
		if (this.state.page === 0) {
			qSet = this.state.questions.slice(0, 30)
		}
		else if (this.state.page === 1) {
			qSet = this.state.questions.slice(30, 60)
		}
		else if (this.state.page === 2) {
			qSet = this.state.questions.slice(60, 90)
		}
		
		let questionList = qSet.map((el, i) => {
			if (el.type === 'selecadt') {
				let type_answers = el.answer;
				let title_values = this.state.answer_title_values;
				let index_type = title_values.indexOf(type_answers);
				let answer = this.state.answer_values[index_type]

				return <SelectBox key={i} index={i} title={el.title} answers={answer} returnAnswer={this.returnAnswer}/>

			} else if (el.type === 'select') {
				let type_answers = el.answer;
				let title_values = this.state.answer_title_values;
				let index_type = title_values.indexOf(type_answers);
				let answer = this.state.answer_values[index_type]

				return <RadioButton key={i} index={i} title={el.title} answers={answer} returnAnswer={this.returnAnswer}/>
			}
		})

		let checkbox = this.state.axis.map((el, i) => {
			return <CheckBox key={i} index={i} name={el} title={this.state.axis_title[i]}
			                 returnAxisName={this.returnAxisName}/>
		})

		let chart = () => {
			if (this.state.axises != {}) {
				return <Scatter3d myAxis={this.state.total_axis} axises={this.state.compass_compare}/>
			}
		}

		return (
			<div className="App">
				<h1 className="text-align-center">{JSON.stringify(this.state.total_axis)}</h1>
				{this.state.showAnswers ? <p>{JSON.stringify(this.state.answers)}</p> : null}
				<button onClick={() => this.uploadData({"a": "HELLo"})}>Send data</button>
				<button onClick={() => this.getAxis(this.state)}>Show state</button>
				{checkbox}
				{questionList}
				<AxisProp axis={this.state.axises}/>
				{chart()}
				<button onClick={() => this.setState({page: this.state.page + 1})}>Next page</button>
				<button onClick={() => this.getAxis(this.state)}>Show state</button>

			</div>
		);
	}
}


export default App;
