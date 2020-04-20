import React, { Component } from "react";
import '../App.css';
import history from '../history';
import {Table} from 'react-bootstrap';


export default class Employees extends Component {

    _onaddnewEmployee=()=>{
          history.push('/employees/add-new');
    }

    getTableBodyAsReactElement() {

        let employees = JSON.parse(localStorage.getItem("employees"));
        return (!employees) ? null : (
          <tbody>
            {employees.map((item) => {                               
              console.log('item: ', item);
              return (
                <tr key={item.id}>
                 <td style={{textAlign:'center'}}>{item.id}</td>
                 <td>{item.employeedetail.firstname}</td>
                 <td>{item.employeedetail.projectname}</td>
                 <td>{item.employeedetail.phonenumber}</td>
                </tr>
              );
            })}
          </tbody>
        );
      }

    render() {
        return (
            <div>
                <div style={{backgroundColor:"#348890"}}>
                    <label style={{padding:'10px',color:'white',fontSize:'18px'}}>Employee List</label>
                </div>
                <div>
                <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th style={{textAlign:'center'}}>#id</th>
                        <th>Employee Name</th>
                        <th>Project</th>
                        <th>Phone Number</th>
                      </tr>
                    </thead>
                    {this.getTableBodyAsReactElement()}
                </Table>
                    <button className="AddNewButton" onClick={this._onaddnewEmployee}>Add New</button>
                </div>

            </div>
        )
    }
}
