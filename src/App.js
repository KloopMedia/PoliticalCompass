import React, {useEffect, Component} from 'react';
import './App.css';

import {
	BrowserRouter as Router,
	Route,
} from "react-router-dom";

import Home from "./Components/auth/Home";
import ReactGa from "react-ga"

function App(){


		useEffect(()=>{
			ReactGa.initialize('UA-179274271-1')
			ReactGa.pageview(window.location.pathname + window.location.search)
		},[])

		return (
			<div>
				{/*<AuthProvider>*/}
					<Router>
						<div>
							{/*<PrivateRoute exact path={"/questionnaire/"} component={Home}/>*/}
							{/*<Route exact path={"/questionnaire/login"} component={Login}/>*/}
							<Route exact path={"/PoliticalCompass/"} component={Home}/>
						</div>
					</Router>
				{/*</AuthProvider>*/}
			</div>
		)

}

export default App;