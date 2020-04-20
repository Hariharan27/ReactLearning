import React,{Component}from 'react';
import '../App.css';
import logo from'../logo_web_white.png'
import history from '../history';

class App extends Component {
  
  state = {
    username:"",
    password:""
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    console.log(localStorage.getItem('usertoken'));
  }
  
  _onchangeUername =(event) =>{
    this.setState(
      {
      username:event.target.value,
      password:this.state.password
    }
    )
  }
  _onPasswordChange = (event) => {
    this.setState(
      {
      username:this.state.username,
      password:event.target.value
    }
    )
  }

  handleSubmit=(event)=> {
    
    const username = this.state.username;
    const passowrd = this.state.password;

    if(username.length<=0){
          alert("Please enter a valid username");
          event.preventDefault();

    }else if(passowrd.length<=0){
      alert("Please enter a valid password");
      event.preventDefault();
    }else {
      const token = this.state.username+this.state.password;
      localStorage.setItem('usertoken', token);
      history.push("/");  
    }
    
  }

  render(){
    console.log(this.state);
    return (
      <div className="App">
          <div>
          <form className="App-header">
              <img className="Logo" src={logo} alt="" />
              <input className="InputStyle" type="text" name="username" placeholder="username" value={this.state.username} onChange={this._onchangeUername} />
              <input className="InputStyle"  type="password" name="password" placeholder ="password" value={this.state.password} onChange={this._onPasswordChange}/>
              <button className="Button" onClick={this.handleSubmit}>Login</button>
          </form>
          </div>
      </div>
    )
  }

}


export default App;
