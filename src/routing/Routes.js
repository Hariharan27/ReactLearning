import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "../onboarding/Login";
import Dashboard from "../components/Dashboard"
import Projects from "../components/Projects"
import AddNewProject from '../components/AddNewProject'
import Employees from '../components/Employees'
import AddNewEmployee from '../components/AddNewEmployee'
import history from '../history';


export default class Routes extends Component {

    render() {
         const logindetails = localStorage.getItem('usertoken')!=null?localStorage.getItem('usertoken'):"";
         console.log("testroute")
        return (
            <Router history={history}>
                <Switch>
                    {logindetails.length>0?<Route path="/" exact component={Dashboard} />
                    :<Route path="/" exact component={Home} />
                    }
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/projects" exact component={Projects}/>
                    <Route path="/projects/add-new" exact component={AddNewProject}/>   
                    <Route path="/employees" exact component={Employees}/>
                    <Route path="/employees/add-new" exact component={AddNewEmployee}/>
                </Switch>
            </Router>
        )
    }
}