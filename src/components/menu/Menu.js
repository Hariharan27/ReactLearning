import React,{Component} from 'react';
import {Nav,Navbar} from 'react-bootstrap';
import './Menu.css'

export default class Menu extends Component{

    _onLogoutClick = () =>{
        localStorage.clear()
    }
    
    render(){
     return(
     <Navbar className="NavBackground" collapseOnSelect expand="lg"  bg="dark" variant="dark">
             <Navbar.Brand href="/">Todo</Navbar.Brand>
                 <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                     <Navbar.Collapse id="responsive-navbar-nav">
                         <Nav className="mr-auto">
                         </Nav>
                    <Nav>
                      <Nav.Link href="/" onClick={this._onLogoutClick}>Logout</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
      </Navbar>
     );
    }
}