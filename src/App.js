import React, {useState, useEffect, Component} from 'react';
import './App.css';

import {
	BrowserRouter as Router,
	Route,
} from "react-router-dom";

import Home from "./Components/auth/Home";
import Login from "./Components/auth/Login";
import PrivateRoute from "./util/PrivateRoute";
import {AuthProvider} from "./util/Auth";

class App extends Component {

	render() {
		return (
			<div>
				<AuthProvider>
					<Router>
						<div>
							<PrivateRoute exact path={"/questionnaire/"} component={Home}/>
							<Route exact path={"/questionnaire/login"} component={Login}/>
						</div>
					</Router>
				</AuthProvider>
			</div>
		)
	}

}

export default App;