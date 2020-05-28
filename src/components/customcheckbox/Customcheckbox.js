import React from 'react';
import checkboxunfilled from '../../ic_circle_blue_unfilled.png'
import checkboxfilled from '../../ic_checked.png'
import * as CategoryAction from '../../redux/actions/index';
import { connect } from "react-redux";
import './Customcheckbox.css';

class Customcheckbox extends React.Component{

    constructor(props){
        super(props)
        this.onMarkusCompleted = this.onMarkusCompleted.bind(this);
    }


    onMarkusCompleted = (name,checked) => {
        this.props.markusCompeleted({ selectedtask: name, selection: !checked })
    }

    render(){
        const { checked, name} = this.props;
        return(
              <img className='checkboxLogo' onClick={()=>this.onMarkusCompleted(name,checked)} src={checked?checkboxfilled:checkboxunfilled}/>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        markusCompeleted: task => dispatch(CategoryAction.markTaskusCompleted(task))
    };
}

export default connect(null,mapDispatchToProps)(Customcheckbox);