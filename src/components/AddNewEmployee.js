import React,{Component} from 'react';
import {Form,Col} from 'react-bootstrap';
import history from '../history';

export default class AddNewEmployee extends Component{

  state= {
    firstname:'',
    lastname:'',
    email:'',
    phonenumber:'',
    projectname:''
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => { 
    let firstname = this.state.firstname;
    let lastname = this.state.lastname;
    let email = this.state.email;
    let phonenumber = this.state.phonenumber;
    let projectname = this.state.projectname;

    if(firstname == null||firstname.length <=0){
       alert("please enter a valid firstname");
    }else if (lastname == null||lastname.length <=0){
      alert("please enter a valid lastname");
    }else if (email == null ||email.length <=0){
      alert("please enter a valid email");
    }else if (phonenumber == null || phonenumber.length<=0||phonenumber.length!==10){
      alert("please enter a valid phonenumber");
    }else if(projectname == null || projectname.length<=0){
      alert("please select a valid project");
    }else{
      const employees = JSON.parse(localStorage.getItem("employees") || "[]");
      const employee_id = employees.length +1;  
      var entry = {
        employeedetail: this.state,
        id : 'EMP-'+employee_id
      };
      employees.push(entry);
      localStorage.setItem("employees", JSON.stringify(employees));
      history.goBack();
     
    }
    event.preventDefault();
  }

  getProjectOptionAsReactElement() {

    let projects = JSON.parse(localStorage.getItem("projects"));
    return (!projects) ? null : (
      <Form.Control value={this.state.projectname} ref={select => { this.select = select }} as="select" size="sm" custom onChange={this._handleProjectSelet}>
            <option value="" disabled>Select your option</option>
        {projects.map((item) => {                               
          return (
          <option key={item.id}>{item.projectname}</option>
          );
        })}
        </Form.Control>
    );
  }
  updateFirstname =(event)=>{
    const eventvalue = event.target.value;
    this.setState({firstname:eventvalue})
   }

   updateLastname =(event)=>{
    const eventvalue = event.target.value;
    this.setState({lastname:eventvalue})
   }

   updateEmail =(event)=>{
    const eventvalue = event.target.value;
    this.setState({email:eventvalue})
   }

   updatePhonenumber =(event)=>{
    const eventvalue = event.target.value;
    this.setState({phonenumber:eventvalue})
   }

    _handleProjectSelet = () =>{
      console.log(this.select.value);
      this.setState({projectname:this.select.value})
    }

  render(){
       console.log(this.state);
        return(
          <div>
             <div style={{backgroundColor:"#348890"}}>
                    <label style={{padding:'10px',color:'white',fontSize:'18px'}}>Employee Details</label>
             </div>
                <div style={{margin:'20px'}}> 
                <Form> 
                   <Form.Row style={{margin:'8px'}}>
                     <Col>
                     <Form.Control placeholder="First name" value={this.state.firstname} onChange={this.updateFirstname} />
                     </Col>
                     <Col>
                     <Form.Control placeholder="Last name" value={this.state.lastname} onChange={this.updateLastname} />
                     </Col>
                   </Form.Row>
               
                   <Form.Row style={{margin:'8px'}} >
                     <Col>
                     <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.updateEmail} />
                     </Col>
                     <Col>
                     <Form.Control type="phone" placeholder="Phone number" value={this.state.phonenumber} onChange={this.updatePhonenumber} />
                     </Col>
                   </Form.Row>

                   <Form.Group style={{margin:'20px'}} controlId="exampleForm.SelectCustomSizeLg">
                        <Form.Label>Select Project</Form.Label>
                                 {this.getProjectOptionAsReactElement()}
                   </Form.Group>
                   <div className="AppButtonCenterDiv">
                   <button className="ButtonGreen" onClick={this.handleSubmit}>Add</button> 
                   </div>
              </Form>
            </div>
          </div>
        );
    }

} 