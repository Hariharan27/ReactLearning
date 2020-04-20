import React, { Component } from "react";
import Menu from './Menu'
import {Card} from 'react-bootstrap';
import history from '../history';

export default class Dashboard extends Component {

    state ={
        projectcount:0,
        employeecount:0
    }

    componentDidMount(){
      const projects = JSON.parse(localStorage.getItem("projects") || "[]");
      const employees = JSON.parse(localStorage.getItem("employees") || "[]");
      this.setState({projectcount:projects.length,employeecount:employees.length})
    }

    _onProjectClick = () => {
         history.push('/projects');
    }

    _onEmployeeClick = () =>{
        history.push('/employees');
    }

    render() {
        return (
            <div>
             <Menu/>   
             <Card border="success" style={{ width: '18rem',margin:'20px' }} onClick ={this._onProjectClick}>
                  <Card.Header style={{textAlign:'center',fontSize:'24px',color:'white',backgroundColor:"#348890"}}>Projects</Card.Header>
                   <Card.Body style={{textAlign:'center'}}>
             <Card.Text style={{fontSize:'20px'}}>{this.state.projectcount}</Card.Text>
             </Card.Body>
            </Card>
            <Card border="success" style={{ width: '18rem',margin:'20px' }} onClick={this._onEmployeeClick}>
                  <Card.Header style={{textAlign:'center',fontSize:'24px',color:'white',backgroundColor:"#348890"}}>Employees</Card.Header>
                   <Card.Body style={{textAlign:'center'}}>
        <Card.Text style={{fontSize:'20px'}}>{this.state.employeecount}</Card.Text>
             </Card.Body>
            </Card>
            </div>
        )
    }
}

