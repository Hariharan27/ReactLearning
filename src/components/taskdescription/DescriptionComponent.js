import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from "react-redux";
import * as CategoryAction from '../../redux/actions/index'
import Customcheckbox from '../customcheckbox/Customcheckbox'
import './DescriptionComponent.css'

class DescriptionComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = { desc: '' };
        this.onMarkusCompleted = this.onMarkusCompleted.bind(this);
    }

    onEnteredPressed = (e) => {
        if (e.keyCode === 13) {
            this.setState({ desc: '' });
            this.props.addTaskDescription({ description: this.state.desc, selectedtask: this.props.selectedTask.id })
        }
    }

    onTasknameChange = (event) => {
        this.setState({ desc: event.target.value });
    }

    onMarkusCompleted = (e) => {
        this.props.markusCompeleted({ selectedtask: e.target.name, selection: e.target.checked })
    }


    render() {
        const { description, name,completed,selectedTask } = this.props;
        const { desc } = this.state;
        return (
            <Col className='Sidebar' xs={2}>
                {description != null && description.length > 0 ?
                    <div>
                        <div className='rowCA'>
                            <Customcheckbox  checked={completed} name={selectedTask.id} />
                            <div className={completed?'descriptionlablewithcolorStrike':'descriptionlablewithcolor'}>{name}</div>
                        </div>
                        <div>
                        <div className='descriptionlable'>Desciption: </div>
                        <div className='whitebackground'>{description}</div>
                         </div>   
                    </div>
                    : <div>
                         <div className='rowCA'>
                            <Customcheckbox  checked={completed} name={selectedTask.id} />
                            <div className={completed?'descriptionlablewithcolorStrike':'descriptionlablewithcolor'}>{name}</div>
                        </div>
                        <div >
                        <div className='descriptionlable'>Desciption: </div>
                        <input placeholder={'Add a description'} type='text' value={desc} onKeyDown={this.onEnteredPressed} className='inputDescription' onChange={this.onTasknameChange} />
                        </div>
                    </div>
                }
            </Col>
        );
    }

}


function mapDispatchToProps(dispatch) {
    return {
        addTaskDescription: task => dispatch(CategoryAction.addTaskDescription(task)),
        markusCompeleted: task => dispatch(CategoryAction.markTaskusCompleted(task))
    };
}

export default connect(null, mapDispatchToProps)(DescriptionComponent);