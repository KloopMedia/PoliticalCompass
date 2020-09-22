import React, {useState, useEffect, Component} from 'react';
import './App.css';

import {
	BrowserRouter as Router,
	Route,
} from "react-router-dom";

import Home from "./Components/auth/Home";

class App extends Component {

	render() {
		return (
			<div>
					<Router>
						<div>
							<Route exact path={"/questionnaire/"} component={Home}/>
						</div>
					</Router>
			</div>
		)
	}

}

export default App;