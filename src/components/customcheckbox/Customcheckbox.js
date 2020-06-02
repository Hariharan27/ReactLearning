import React from 'react';
import checkboxunfilled from '../../assets/ic_circle_blue_unfilled.png'
import checkboxfilled from '../../assets/ic_checked.png'
import * as CategoryAction from '../../redux/actions/index';
import { connect } from "react-redux";
import './Customcheckbox.css';
import CustomTooltip from '../tooltip/CustomTooltip'

class Customcheckbox extends React.Component{

    constructor(props){
        super(props)
        this.onMarkusCompleted = this.onMarkusCompleted.bind(this);
    }


    onMarkusCompleted = (name,checked,step,taskid) => {
        if(step !=null && step){
            this.props.markStepCompleted({selectedtask:taskid,stepid:name,completed:!checked});
        }else{
            this.props.markusCompeleted({ selectedtask: name, selection: !checked });
        }
    }

    render(){
        const { checked, name,step,taskid} = this.props;
        return(
            <CustomTooltip child={
            <img alt={name} className='checkboxLogo' onClick={()=>this.onMarkusCompleted(name,checked,step,taskid)} src={checked?checkboxfilled:checkboxunfilled}/>
            }></CustomTooltip>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        markusCompeleted: task => dispatch(CategoryAction.markTaskusCompleted(task)),
        markStepCompleted:task => dispatch(CategoryAction.MarkStepCompleted(task))
    };
}

export default connect(null,mapDispatchToProps)(Customcheckbox);