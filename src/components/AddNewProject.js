import React,{Component} from 'react';
import history from '../history';

export default class AddNewProject extends Component{
 
   state= {
     projectname:''
   }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _onProjectNameChange = (event) => {  
    this.setState({projectname:event.target.value});
  }

     handleSubmit = (event) => { 

      if(this.state.projectname==null||this.state.projectname.length<=0){
             alert("Please enter a valid project name");
      }else {
        const projects = JSON.parse(localStorage.getItem("projects") || "[]");
        const project_id = projects.length +1;  
        var entry = {
          projectname: this.state.projectname,
          id : 'IP-'+project_id
        };
        projects.push(entry);
        localStorage.setItem("projects", JSON.stringify(projects));
        history.goBack();
        
      }
      event.preventDefault();
    }

    render(){
        console.log(this.state.projectname);
        return(
             <div>
               <div style={{backgroundColor:"#348890"}}>
                    <label style={{padding:'10px',color:'white',fontSize:'18px'}}>Project Detail</label>
           </div>
          <form style={{display:'flex',flexDirection:'column',margin:'10px'}}>
              <input className="InputStyle" type="text" name="ProjectName" placeholder="ProjectName" value={this.state.projectname} onChange={this._onProjectNameChange}/>
              <button className="ButtonGreen" onClick={this.handleSubmit}>Add</button>
          </form>
             </div>
          );
    }

} 