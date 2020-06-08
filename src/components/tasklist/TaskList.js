import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './TaskList.css';
import { connect } from "react-redux";
import * as CategoryAction from '../../redux/actions/index';
import addicon from '../../assets/ic_add.png';
import greycircle from '../../assets/ic_circle_grey.png';
import Customcheckbox from '../customcheckbox/Customcheckbox';
import SortMenu from '../optionmenu/SortMenu';
import MenuContext from '../ContextMenu/MenuContext';

class TaskList extends React.Component {


    constructor(props) {
        super(props)
        this.onTaskClick = this.onTaskClick.bind(this);
        this.makeEditable = this.makeEditable.bind(this);
        this.onTasknameChange = this.onTasknameChange.bind(this);
        this.onEnteredPressed = this.onEnteredPressed.bind(this);
        this.makenonEditeable = this.makenonEditeable.bind(this);
        this.state = { taskname: '' };

    }


    onTaskClick(id, e) {
        this.setState({ taskname: '' })
        this.props.selectTask({ showDescription: true, selectedtask: id });
    }

    makeEditable() {
        this.setState({ taskname: '' })
        this.props.MakeEditable(true);
    }

    makenonEditeable() {
        this.setState({ taskname: '' })
        this.props.MakeEditable(false);
    }

    onTasknameChange = (event) => {
        this.setState({ taskname: event.target.value });
    }


    onEnteredPressed = (e) => {
        if (e.keyCode === 13) {
            this.setState({ taskname: '' })
            const now = Date.now(); // Unix timestamp in milliseconds
            this.props.addNewTask({ id: now, name: this.state.taskname, description: '', isSelected: false, isCompleted: false, steps: [],files:[] });
        }
    }

    getListItems(category, selectedTask, steps,files) {
        return category[0].tasks.filter(function (task) {
            return task.isCompleted !== true;
        }).map((item, index) => (
            <div key={index} className={selectedTask != null && selectedTask.id === item.id ? 'rowCSelected' : 'rowC'}>
                <Customcheckbox checked={item.isCompleted} name={item.id} />
                <div className='rowchildTwo' >
                    <MenuContext checked={item.isCompleted} id={item.id} child={
                        <div onClick={(e) => this.onTaskClick(item.id, e)}>
                            <div>{item.name}</div>
                            <div className='TaskdivListItem'>
                            {steps != null && steps.length > 0 && selectedTask != null && selectedTask.id === item.id?
                                <div className='stepsinfo'>{steps.filter(function(step){
                                    return step.isCompleted
                                }).length} of {steps.length}</div> :
                                null
                            }
                            { files != null && files.length > 0 && selectedTask != null && selectedTask.id === item.id ?
                                <div className='stepsinfowithMargin'> @ files attached</div> :null }
                            </div>

                        </div>} />
                </div>
            </div>
        ))
    }

    getCompletedListItem(category, selectedTask, steps) {

        const completedtask = category[0].tasks.filter(function (task) {
            return task.isCompleted;
        });

        return completedtask != null && completedtask.length > 0
            ?
            <ListGroup variant="flush">
                <label className='TasknameWithoutColor' > Completed </label>
                {completedtask.map((item, index) => (
                    <div key={index} className={selectedTask != null && selectedTask.id === item.id ? 'rowCSelected' : 'rowC'}>
                        <Customcheckbox checked={item.isCompleted} name={item.id} />
                        <div className='taskdiv'>
                            <MenuContext checked={item.isCompleted} id={item.id} child={
                                <div className='crossed-line' onClick={(e) => this.onTaskClick(item.id, e)}>{item.name}</div>
                            } />
                        </div>
                    </div>
                ))}
            </ListGroup>
            : null

    }

    render() {
        const { isEditable, category, selectedTask, steps,files } = this.props;
        const { taskname } = this.state;
        return (
            <div className='TaskContainer' >

                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <SortMenu />
                    <label className='Taskname' >{category[0].name}</label>
                </div>

                {isEditable
                    ? <div className='rowCBottomSelected'>
                        <img className='Logo' onClick={this.makenonEditeable} src={greycircle} alt='logo' />
                        <input placeholder={'Add a task'} type='text' value={taskname} onKeyDown={this.onEnteredPressed} className='input' onChange={this.onTasknameChange} />
                    </div>
                    : <div className='rowC' onClick={this.makeEditable} >
                        <img className='Logo' src={addicon} alt='logo' />
                        <div className='TextNewSize' > Add a task</div>
                    </div>}

                <ListGroup variant="flush">
                    {this.getListItems(category, selectedTask, steps,files)}
                </ListGroup>

                {this.getCompletedListItem(category, selectedTask, steps,files)}


            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        addNewTask: task => dispatch(CategoryAction.addNewTask(task)),
        selectTask: task => dispatch(CategoryAction.SelectTask(task)),
        MakeEditable: task => dispatch(CategoryAction.MakeEditable(task))
    };
}

const mapStateToProps = state => {
    return {
        category: state.categories.filter(function (item) {
            return item.isSelected;
        }),
        showDescription: state.showDescription,
        isEditable: state.isEditable
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TaskList);