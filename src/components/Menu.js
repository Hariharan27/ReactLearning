import React,{Component} from 'react';
import {Nav,Navbar} from 'react-bootstrap';
import '../App.css';

export default class Menu extends Component{

    _onLogoutClick = () =>{
        localStorage.clear()
    }
    
    render(){
     return(
     <Navbar className="NavBackground" collapseOnSelect expand="lg"  bg="dark" variant="dark">
             <Navbar.Brand href="/">Ideas2It</Navbar.Brand>
                 <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                     <Navbar.Collapse id="responsive-navbar-nav">
                         <Nav className="mr-auto">
                             <Nav.Link href="/projects">Projects</Nav.Link>
                             <Nav.Link href="/employees">Employees</Nav.Link>
                         </Nav>
                    <Nav>
                      <Nav.Link href="/" onClick={this._onLogoutClick}>Logout</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
      </Navbar>
     );
    }
}