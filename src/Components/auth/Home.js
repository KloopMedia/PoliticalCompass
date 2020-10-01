import React, {Component, useEffect, useState} from "react";
import '../../App.css'
import RadioButton from "../form/radiobutton";
import CheckBox from "../form/checkBox";
import SelectBox from "../form/SelectBox";
import Scatter from "../Charts/Scatter";
import firebase from "../../util/firebase";
import FacebookShareBtn from "../shareBtn/facebookShare";
import app, {signInWithGoogle, signInAnonymously} from "../../util/firebase";
import {
	EmailShareButton, FacebookIcon,
	FacebookShareButton,
	FacebookShareCount
} from "react-share";
import ScatterLine from "../axisAverrage/ScatterLineResult";
import PartyImage from "../component/PartyImage";
import PrecentOfAnswered from "../axisAverrage/PrecentOfAnswered";

let distance = require('euclidean-distance')


const queryString = require('query-string')

class Home extends Component {
	state = {
		questions: [],
		main_title: '',
		gateway: '',
		answers: {},
		notAnswered: [],
		axises: {},
		axis_points: [],
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
		answer_values: ["da"],
		answer_values_males: [],
		count_axises: [],
		compass_compare: {},
		default_axises: [],
		all_axis_averrage: [],
		batch_axises: [],
		onlyTwoCheckBox: true,
		showAnswers: false,
		questions_on_page: 0,
		first_questions: 0,
		partyColor: [],
		anket: false,
		anket_all_answers: 1,
		anketa_questions: [],
		anket_answers: [],
		axis_legends: [],
		legendary: [],
		nearestParty: {},
		compass_url: "",
		saveData: false,
		uid: false,
		user: false,
		axisNearest: []

	}


	componentDidMount() {
		this.downloadData()
	}

	downloadData = () => {
		let urlString = queryString.parse(window.location.search, {decode: false})
		console.log(urlString)
		if (true) {
			// fetch('https://raw.githubusercontent.com/Kabirov7/kloop-forms-test/master/final_config_test_0.json')
				fetch('https://raw.githubusercontent.com/Kabirov7/kloop-forms-test/master/config_plus_test_and_anketa.json')
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
						answer_values_males: data.answer_values,
						axises_object: data.axises_object,
						questions_on_page: data.questions_on_page,
						axis_points: data.axis_points,
						partyColor: data.partyColor,
						anketa_questions: data.anket,
						axis_legends: data.axis_legends,
						compass_url: data.compass_url,
						axisNearest: data.axisNearest,
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

	returnAnketsAnswer = (answer, index) => {
		let answers = {...this.state.anket_answers}
		answers[index] = answer
		this.setState({anket_answers: answers})
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
			let answers_item = state.answer_values_males[answer_type_index][state.anket_answers[0]]
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
		const minDistances = [];

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

	legendByAxis = () => {
		let legendsByAxis = []
		let legendIs = this.state.axis_legends.map((el, i) => {
			let itIs;

			let legends = Object.values(el)
			let indexAxisByName = this.state.axis_title.indexOf(el.name)
			let axis = this.state.all_axis_averrage[indexAxisByName]
			if (-2 <= axis && axis < -1.11) {
				itIs = 1

			} else if (-1.10 < axis && axis < -0.61) {
				itIs = 2

			} else if (-0.60 < axis && axis < -0.21) {
				itIs = 3

			} else if (-0.20 < axis && axis < 0.20) {
				itIs = 4

			} else if (0.21 < axis && axis < 0.60) {
				itIs = 5

			} else if (-0.61 < axis && axis < 1.10) {
				itIs = 6

			} else if (-1.11 < axis && axis <= 2.00) {
				itIs = 7

			}

			legendsByAxis[i] = itIs
			return (<div className={"legend"}>
				<h5>{el.name}:</h5>
				<p>{legends[itIs]}</p>
			</div>)
		})

		if (this.state.legendary.length == [].length) {
			this.setState({legendary: legendsByAxis})
		}
		return legendIs
	}

	saving_data = (state) => {
		const answ = state.answer_values_males[0][state.anket_answers[0]]

		let answers = Object.values(state.answers).map((el, i) => {
			let answerIdx = answ.indexOf(el)
			return {[i]: answerIdx}
		})

		let part = {
			male: state.anket_answers[0],
			old: state.anket_answers[1],
			distric: state.anket_answers[2],
			answers: answers,
			axises_averrage: state.all_axis_averrage,
			axises: state.axises,
		}

		const db = firebase.firestore().collection("users_answers")
		let uid;
		let user = firebase.auth().currentUser
		if (this.state.saveData == false) {

			firebase.auth().onAuthStateChanged(function (user) {
				if (user != null) {
					uid = user.uid
					db.doc(uid).collection('answers').doc().set(part)

				} else if (user == null) {
					signInAnonymously()
				}

			});
			this.setState({saveData: true})
		}

	}

	signInWithGoogleUser = () => {
		firebase.auth().onAuthStateChanged(function (user) {
			signInWithGoogle()

		})

		this.setState({user: true})

	}

	render() {

		let qSet = this.state.questions.slice(this.state.first_questions, this.state.first_questions + this.state.questions_on_page)
		let questionList = qSet.map((el, i) => {
			let message;
			if (el.type === 'select') {
				if (this.state.notAnswered.indexOf(i) != -1) {
					message = 'Вам следует ответить на этот вопрос'
				} else {
					message = ''
				}

				let type_answers = el.answer;
				let title_values = this.state.answer_title_values;
				let index_type = title_values.indexOf(type_answers);
				let answer = this.state.answer_values_males[index_type][this.state.anket_answers[0]]
				return (
					<RadioButton ans={this.state.answers[this.state.first_questions + i]}
					             key={this.state.first_questions + i} id={i} index={this.state.first_questions + i}
					             title={el.title}
					             message={message} answers={answer} returnAnswer={this.returnAnswer}/>
				)
			}
		})

		let axisAverrage = this.state.axis_title.map((el, i) => {
			return (<ScatterLine index={i}
			                     axisName={el}
			                     names={this.state.compass_compare.position}
			                     partyAxises={this.state.compass_compare.axises}
			                     partyColor={this.state.partyColor}
			                     axisNearest={this.state.axisNearest[i]}
			                     axisAverrage={this.state.all_axis_averrage[i]}
					                 axisPoints={this.state.axis_points[i]}
				/>
			)
		})

		let checkbox = this.state.axis.map((el, i) => {
			if (el != "b") {
				return (
					<CheckBox key={i} index={i} name={el} title={this.state.axis_title[i]} returnAxisName={this.returnAxisName}/>
				)
			}

		})

		let chart = () => {
			if (this.state.axises != {}) {
				return (
					<div>
						<Scatter partyColor={this.state.partyColor} myAxis={this.state.total_axis}
						         names={this.state.compass_compare.position}
						         axises={this.state.batch_axises}/>
					</div>
				)

			}
		}

		let resultParty = () => {
			let distanceIs;
			let names = this.state.compass_compare.position
			let minIs = {
				idx: "",
				name: "",
				distance: Infinity
			}
			this.state.compass_compare.axises.map((el, i) => {
				distanceIs = distance(this.state.all_axis_averrage, el)
				if (distanceIs < minIs.distance) {
					minIs.idx = i
					minIs.name = names[i]
					minIs.distance = distanceIs
				}
			})
			if (Object.values(this.state.nearestParty).length == Object.values({}).length) {
				this.setState({nearestParty: minIs})
			}
			return (<div>
				<div className={"resultParty"}>
					<h3>Ближайшая вам партия:</h3>
					<h3>«{minIs.name}»</h3>
				</div>

				<div className={"partyImage"}>
					<PartyImage partyLink={minIs.idx} partyName={this.state.compass_compare.parties_image_name[minIs.idx]}/>
					<a href={this.state.compass_compare.about_parties[minIs.idx]}>Узнайте больше об этой партии</a>

				</div>
				<div className={"resultParty"}>
					<h3>Ваш политический автопортрет на основе ответов:</h3>
					<div className={"myLegends"}>
						{this.legendByAxis()}
					</div>
				</div>

				<div className={"facebookBtn"}>
					<FacebookShareBtn
						className={'fb'}
						name={this.state.compass_compare.parties_image_name[minIs.idx]}
						legends={this.state.axis_legends}
						indexLegends={this.state.legendary}
						compass_url={this.state.compass_url}
					/>
				</div>
			</div>)
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
				const el = document.getElementById(`${whichNotAnswered[0]}`)
				el.scrollIntoView({
					behavior: "smooth",
					block: "start"
				})
			}

			if (Object.values(this.state.answers).length == Object.values(this.state.questions).length && Object.values(this.state.answers).length != Object.values({}).length) {

				this.saving_data(this.state)

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

		let onlyTwoCheckbox = () => {
			let values = Object.values(this.state.axis_names)
			const countTrue = values.filter(el => el == true)
			if (countTrue.length == 2) {
				this.setState({onlyTwoCheckBox: true})
				this.getAxis(this.state)
			} else {
				this.setState({onlyTwoCheckBox: false})
			}
		}

		let anket = this.state.anketa_questions.map((el, i) => {
			return <SelectBox key={i} index={i} title={el.title} answers={el.answer}
			                  returnAnketsAnswer={this.returnAnketsAnswer}/>
		})


		let doneAnket = () => {
			if (Object.keys(this.state.anket_answers).length == this.state.anketa_questions.length) {
				this.setState({
					anket_all_answers: true,
					anket: true
				})
			} else {
				this.setState({anket_all_answers: false})
			}

		}

		const forms = () => {
			if (this.state.anket == false) {
				let answers = (this.state.anket_all_answers == false) ? "Вам следует ответить на все вопросы" : ""
				let userIs = (this.state.user == true) ? (<div className={"enterByEmail"}>
						<p>Вы вошли через google</p>
						<p>Теперь жмите сюда:</p>
					</div>) :
					(<div className={"notEnterByEmail"}>
						<p>Если хотите в будущем найти единомышленников среди других пользователей, нажмите сюда и у нас сохранятся
							ваше имя и email:</p>
						<button className={"signinGoogle"} onClick={() => this.signInWithGoogleUser()}>Войти через google</button>
						<p>Можно и не входить в Google тогда просто сразу жмите сюда:</p>
					</div>)
				return (
					<div style={{textAlign: "center"}}>
						<p className={"chooseAnswer padding_margin"}>{answers}</p>
						{anket}
						<div className={"enter"}>
							{userIs}
						</div>
						<div className={"buttons"}>
							<button onClick={() => doneAnket()}>Начать</button>
						</div>
					</div>
				)
			} else if (this.state.questions.length <= this.state.first_questions && this.state.anket == true) {
let result = this.state.onlyTwoCheckBox ? "" : "Выберите только две темы";
				let d = (this.state.compass_compare.axises != undefined) ? resultParty() : "";
				return (<div>
					{d}
					<h2 className="content-center full-result">Развёрнутые результаты:</h2>
					{axisAverrage}
					<h1 className="content-center moreResult">Поиграйтесь с результатами! Выведите их на график!</h1>
					<h2 className="content-center choose3axis">Выберите два явления, которые вы хотите отобразить:</h2>
					<p className="chooseAnswer padding_margin">{result}</p>
					<div className="choose_axises">
						{checkbox}
					</div>
					<div style={{textAlign: "center"}}>
						<button onClick={() => onlyTwoCheckbox()}>Показать результаты</button>
					</div>
					{chart()}
					<div className={'result-position'}>
						<h3>Ближайшая вам партия по выбранным осям:</h3>
						<h2>{this.state.position.title}</h2>
					</div>
				</div>)

			} else {

				return (<div>
					<PrecentOfAnswered lenQuestions={this.state.questions.length} currentQuestions={this.state.first_questions}/>
					{questionList}
					<div className="pagination">
						<button onClick={previousAndScrollTop}>Предыдущая страница</button>
						<button onClick={nextAndScrollTop}>Следующая страница</button>
					</div>
				</div>)

			}
		}

		return (
			<div className="App">
				{forms()}
			</div>
		);
	}
}


export default Home;
