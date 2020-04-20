import React, { Component } from "react";
import '../App.css';
import history from '../history';
import {Table} from 'react-bootstrap';


export default class Projects extends Component {

    _onaddnewProject=()=>{
          history.push('/projects/add-new');
    }

    getTableBodyAsReactElement() {

        let projects = JSON.parse(localStorage.getItem("projects"));
        return (!projects) ? null : (
          <tbody>
            {projects.map((item) => {                               
              console.log('item: ', item);
              return (
                <tr key={item.id}>
                 <td style={{textAlign:'center'}}>{item.id}</td>
                 <td>{item.projectname}</td>
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
                    <label style={{padding:'10px',color:'white',fontSize:'18px'}}>Project List</label>
                </div>
                <div>
                <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th style={{textAlign:'center'}}>#id</th>
                        <th>Project Name</th>
                      </tr>
                    </thead>
                    {this.getTableBodyAsReactElement()}
                </Table>
                    <button className="AddNewButton" onClick={this._onaddnewProject}>Add New</button>
                </div>
            </div>
        )
    }
}
