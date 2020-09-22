import React, {Component, useEffect, useState} from "react";
import '../../App.css'
import AllAxisAverrage from "../axisAverrage/axisAverrage";
import RadioButton from "../form/radiobutton";
import CheckBox from "../form/checkBox";
import Scatter from "../Charts/Scatter";
import firebase from "../../util/firebase";
import FacebookShareBtn from "../shareBtn/facebookShare";
import app, {signInWithGoogle, signInAnonymously} from "../../util/firebase";
import {
	EmailShareButton,
	FacebookShareButton,
	FacebookShareCount
} from "react-share";


const queryString = require('query-string')

class Home extends Component {
	state = {
		questions: [],
		main_title: '',
		gateway: '',
		answers: {},
		notAnswered: [],
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
		all_axis_averrage: [],
		batch_axises: [],
		showAnswers: false,
		questions_on_page: 0,
		first_questions: 0,

	}


	componentDidMount() {
		this.downloadData()
	}

	downloadData = () => {
		let urlString = queryString.parse(window.location.search, {decode: false})
		console.log(urlString)
		if (true) {
			// fetch('https://raw.githubusercontent.com/Kabirov7/kloop-forms-test/master/config.json')
			fetch('https://raw.githubusercontent.com/Kabirov7/kloop-forms-test/master/config_plus.json')
			// fetch('https://raw.githubusercontent.com/Kabirov7/kloop-forms-test/master/final_config_test.json')
			// fetch('https://raw.githubusercontent.com/Kabirov7/kloop-forms-test/master/final_config_test_0.json')
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
						questions_on_page: data.questions_on_page,
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

	getNotAnswered = (state, pl) => {

		function elToIntArr(array) {
			array.forEach((i, index) => {
				array[index] = Number(array[index])
			})
			return array
		}

		let currentQset;
		if (pl == "plus") {
			currentQset = this.state.questions.slice(this.state.first_questions, this.state.first_questions + this.state.questions_on_page);
		} else if (pl == 'minus') {
			currentQset = this.state.questions.slice(this.state.first_questions, this.state.first_questions - this.state.questions_on_page);
		}


		let idxsOfAnswered = elToIntArr(Object.keys(state.answers))
		currentQset = elToIntArr(Object.keys(currentQset))

		let whichNotAnswered = currentQset.filter((i) => idxsOfAnswered.indexOf(this.state.first_questions + i) == -1);

		return whichNotAnswered
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

	getAxisMainTemplate = (state) => {
		let mainTemplate;
		for (let i = 0; i < state.axises_object.length + 1; i++) {
			mainTemplate = Object.assign({}, state.axises_object[i], state.axises_object[i + 1], mainTemplate)
		}
		return mainTemplate;
	}

	getAxisTemplate = (state) => {
		let axis_names = [];
		let axis, axis_index, axis_object;
		let all_axis;
		let template = Object.entries(state.axis_names).map((item) => {
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
		return all_axis;
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
			index_question = item[0]
			answer = item[1]
			let answer_type = state.questions[index_question].answer;
			let answer_type_index = state.answer_title_values.indexOf(answer_type)
			let answers_item = state.answer_values[answer_type_index]
			let answer_index = answers_item.indexOf(answer)

			let axis_type = state.questions[index_question].axis;
			let axis_type_index = state.axis_title_values.indexOf(axis_type)
			let axis_array = state.axis_values[axis_type_index]
			let axis_is = axis_array[answer_index]

			Object.keys(axis_is).forEach((i) => {
				axises_names.push(i)
			})

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
		const mainTemplate = this.getAxisMainTemplate(this.state)

		Object.values(axs).forEach(el => {
			Object.keys(el).forEach(key => {

				mainTemplate[key] += el[key]
				if (sum != undefined) {
					if (sum[key] !== undefined) {
						sum[key] += el[key]
					}
				}
			})
		})


		Object.keys(axis_count).forEach(key => {
			mainTemplate[key] = mainTemplate[key] / axis_count[key]
		})

		if (sum != undefined) {
			Object.keys(sum).forEach(key => {
				if (axis_count[key] !== undefined) {
					sum[key] = sum[key] / axis_count[key]
				}
			})
		}

		this.setState({all_axis_averrage: Object.values(mainTemplate).reverse()})
		if (sum != undefined) {
			this.distanceEuclid(sum)
		}
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


		this.setState({batch_axises: default_axises})
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

	saving_data = (state) => {
		let part = {
			// name: currentUser.email,
			answers: state.answers,
			axises_averrage: state.all_axis_averrage,
			axises: state.axises,
		}

		const rootRef = firebase.database().ref().child('parties')
		const axisesRef = rootRef.push(part)
	}


	render() {

		let qSet = this.state.questions.slice(this.state.first_questions, this.state.first_questions + this.state.questions_on_page)

		let questionList = qSet.map((el, i) => {
			let message;
			if (el.type === 'select') {
				if (this.state.notAnswered.indexOf(i) != -1) {
					message = 'Вам следуюет ответить на этот вопрос'
				} else {
					message = ''
				}
				let type_answers = el.answer;
				let title_values = this.state.answer_title_values;
				let index_type = title_values.indexOf(type_answers);
				let answer = this.state.answer_values[index_type]

				return <RadioButton ans={this.state.answers[this.state.first_questions + i]}
				                    key={this.state.first_questions + i} index={this.state.first_questions + i} title={el.title}
				                    message={message} answers={answer} returnAnswer={this.returnAnswer}/>
			}
		})

		let axisAverrage = this.state.axis_title.map((el, i) => {
			return (<AllAxisAverrage key={i} index={i} axisName={el} axisAverrage={this.state.all_axis_averrage[i]}/>
			)

		})

		let checkbox = this.state.axis.map((el, i) => {
			return (
				<CheckBox key={i} index={i} name={el} title={this.state.axis_title[i]} returnAxisName={this.returnAxisName}/>
			)
		})

		let chart = () => {
			if (this.state.axises != {}) {
				return <Scatter myAxis={this.state.total_axis} axises={this.state.batch_axises}/>
			}
		}

		let topFunction = () => {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		}

		let nextAndScrollTop = () => {
			let whichNotAnswered = this.getNotAnswered(this.state, "plus");

			if (whichNotAnswered.length == 0) {
				this.getAxis(this.state)
				this.setState({first_questions: this.state.first_questions + this.state.questions_on_page});
				this.setState({notAnswered: []})
				topFunction();
			} else {
				this.setState({notAnswered: whichNotAnswered})
			}

		}

		let previousAndScrollTop = () => {
			let whichNotAnswered = this.getNotAnswered(this.state, "minus");

			if (whichNotAnswered.length == 0) {
				this.getAxis(this.state)
				this.setState({first_questions: this.state.first_questions - this.state.questions_on_page});
				this.setState({notAnswered: []})
				topFunction();
			} else {
				this.setState({notAnswered: whichNotAnswered})
			}
		}

		const forms = () => {
			if (this.state.questions.length <= this.state.first_questions) {
				return (<div>
					<h2 className="content-center">Выберите наиболее важные вещи для вас</h2>
					<div className="choose_axises">
						{checkbox}
					</div>
					{chart()}
					<div className="allAxis">
						{axisAverrage}
					</div>
					<button onClick={() => this.getAxis(this.state)}>Show state</button>
					<br/>
					<button onClick={previousAndScrollTop}>Previous page</button>
					<button onClick={nextAndScrollTop}>Next page</button>
					<br/>
					<button onClick={() => this.saving_data(this.state)}>Save data</button>
				</div>) //in if

			} else {
				return (<div>
					{questionList}
					<button onClick={previousAndScrollTop}>Previous page</button>
					<button onClick={nextAndScrollTop}>Next page</button>
				</div>) // in else

			}
		}

		return (
			<div className="App">
				<button onClick={() => console.log(this.state)}>show state</button>
				<button onClick={signInWithGoogle}>Sign in with google</button>
				<FacebookShareBtn axises={this.state.all_axis_averrage} axises_title={this.state.axis_title}/>
				{/*{this.state.showAnswers ? <p>{JSON.stringify(this.state.answers)}</p> : null}
				<button onClick={() => this.uploadData({"a": "HELLo"})}>Send data</button>*/}
				{forms()}
			</div>
		);
	}
}


export default Home;
