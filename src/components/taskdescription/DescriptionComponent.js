import React from 'react';
import { connect } from "react-redux";
import * as CategoryAction from '../../redux/actions/index'
import Customcheckbox from '../customcheckbox/Customcheckbox'
import './DescriptionComponent.css'
import { Card } from '@material-ui/core';
import TextareaAutosize from 'react-textarea-autosize';
import addicon from '../../assets/ic_add.png';
import greycircle from '../../assets/ic_circle_grey.png';
import close from '../../assets/ic_close.png';
import Cutomfilepicker from '../filepicker/Cutomfilepicker';

class DescriptionComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = { desc: '' };
        this.onMarkusCompleted = this.onMarkusCompleted.bind(this);
        this.onAddstepClicked = this.onAddstepClicked.bind(this);
        this.deleteStep = this.deleteStep.bind(this);
        this.state = { iseditable: false, taskname: '' };
    }

    componentDidMount() {
        this.setState({ iseditable: false });
    }

    deleteStep = (id) => {
        this.props.DeleteStep({ stepid: id, selectedtask: this.props.selectedTask.id });
    }

    onAddstepClicked = (isedit) => {
        this.setState({ iseditable: isedit });
    }

    onStepChange = (event) => {
        this.setState({ taskname: event.target.value });
    }

    onTasknameChange = (event) => {
        this.props.addTaskDescription({ description: event.target.value, selectedtask: this.props.selectedTask.id })

    }

    onMarkusCompleted = (e) => {
        this.props.markusCompeleted({ selectedtask: e.target.name, selection: e.target.checked })
    }

    getListStpItem = (steps) => {

        return steps.map((item, index) => (
            <div className='stepholder' key={index}>
                <div className='addstepimage'>
                    <Customcheckbox checked={item.isCompleted} name={item.id} step={true} taskid={this.props.selectedTask.id} />
                </div>
                <div className='stepname'>{item.name}</div>
                <img alt='delete' onClick={() => this.deleteStep(item.id)} className='addstepimage' src={close} />
            </div>
        ));
    }

    onEnteredPressed = (e) => {
        if (e.keyCode === 13) {
            this.setState({ taskname: '' })
            const now = Date.now(); // Unix timestamp in milliseconds
            this.props.AddStep({ selectedtask: this.props.selectedTask.id, step: { id: now, name: this.state.taskname, isCompleted: false } });
        }
    }

    onTasknameChange = (event) => {
        this.props.addTaskDescription({ description: event.target.value, selectedtask: this.props.selectedTask.id })
    }


    render() {
        const { description, name, completed, selectedTask, steps,files } = this.props;
        const { iseditable, taskname } = this.state;
        return (
            <div className='Sidebar' >
                <div>
                    <Card className='divmargintop'>
                        <div className='rowCA'>
                            <div className='divmargin'>
                                <Customcheckbox checked={completed} name={selectedTask.id} />
                            </div>
                            <div className={completed ? 'descriptionlablewithcolorStrike' : 'descriptionlablewithcolor'}>{name}</div>
                        </div>

                        {this.getListStpItem(steps)}
                        {iseditable
                            ?
                            <div className='divmarginwithflexSelected'>
                                <img alt='greycircle' onClick={() => this.onAddstepClicked(false)} className='addstepimage' src={greycircle} />
                                <input placeholder={steps.length > 0 ? 'Next step' : 'Add step'} className='inputstep' type='text' value={taskname} onChange={this.onStepChange} onKeyDown={this.onEnteredPressed} />
                            </div>
                            : <div onClick={() => this.onAddstepClicked(true)} className='divmarginwithflex'>
                                <img alt='addicon' className='addstepimage' src={addicon} />
                                {steps.length > 0 ?
                                    <div className='steplablewithcolor'>Next step</div>
                                    :
                                    <div className='steplablewithcolor'>Add step</div>
                                }
                            </div>}

                    </Card>

                    <Card className='divmargintop'>
                        <Cutomfilepicker taskid={selectedTask.id} files={files} />
                    </Card>

                    <Card className='divmargintop'>
                        <TextareaAutosize placeholder={'Add note'} type='text' value={description} className='inputDescription' onChange={this.onTasknameChange} />
                    </Card>
                </div>
            </div>
        );
    }

}


function mapDispatchToProps(dispatch) {
    return {
        addTaskDescription: task => dispatch(CategoryAction.addTaskDescription(task)),
        markusCompeleted: task => dispatch(CategoryAction.markTaskusCompleted(task)),
        AddStep: task => dispatch(CategoryAction.AddStep(task)),
        DeleteStep: task => dispatch(CategoryAction.DeleteStep(task))
    };
}

export default connect(null, mapDispatchToProps)(DescriptionComponent);