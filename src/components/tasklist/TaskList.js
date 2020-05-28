import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import './TaskList.css';
import { connect } from "react-redux";
import * as CategoryAction from '../../redux/actions/index';
import logo from'../../delete_logo.png';
import addicon from '../../ic_add.png';
import greycircle from '../../ic_circle_grey.png';
import checkboxunfilled from '../../ic_circle_blue_unfilled.png'

class TaskList extends React.Component {

    constructor(props) {
        super(props)
        this.onTaskClick = this.onTaskClick.bind(this);
        this.makeEditable = this.makeEditable.bind(this);
        this.onTasknameChange = this.onTasknameChange.bind(this);
        this.onEnteredPressed = this.onEnteredPressed.bind(this);
        this.onMarkusCompleted = this.onMarkusCompleted.bind(this);
        this.onImageDelete = this.onImageDelete.bind(this);
        this.makenonEditeable = this.makenonEditeable.bind(this);
        this.state = { taskname: '' };

    }

    onImageDelete = (id) => {
     console.log(id);
     this.props.deletetask({taskid:id});
    }

    onMarkusCompleted = (e) => {
        console.log(e.target.checked);
        this.props.markusCompeleted({ selectedtask: e.target.name, selection: e.target.checked })
    }

    onTaskClick(id) {
        this.setState({ taskname: '' })
        this.props.selectTask({ showDescription: true, selectedtask: id });
    }

    makeEditable() {
        this.setState({ taskname: '' })
        this.props.MakeEditable(true);
    }

    makenonEditeable(){
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
            this.props.addNewTask({ id:now,name: this.state.taskname, description: '', isSelected: false, isCompleted: false });
        }
    }


    getListItems(category,selectedTask) {
        return category[0].tasks.filter(function (task) {
            return task.isCompleted !== true;
        }).map((item, index) => (
            <div key={index} className={selectedTask!=null&&selectedTask.id === item.id?'rowCSelected':'rowC'}>
                <input type="checkbox" checked={item.isCompleted} name={item.id} onChange={this.onMarkusCompleted} />
                <div className='rowchildTwo' >
                <div  onClick={() => this.onTaskClick(item.id)}>{item.name}</div>
                </div>
                <div onClick={()=>this.onImageDelete(item.id)}>
                <img className="Logo" src={logo} alt="delete" />   
                </div>
            </div>
        ))
    }

    getCompletedListItem(category,selectedTask) {

        const completedtask = category[0].tasks.filter(function (task) {
            return task.isCompleted;
        });

        return completedtask != null && completedtask.length > 0
            ?
            <ListGroup variant="flush">
                <label className='TextNewCategory'> Completed </label>
                {completedtask.map((item, index) => (
                    <div key={index} className={selectedTask!=null&&selectedTask.id === item.id?'rowCSelected':'rowC'}>
                        <input type="checkbox" checked={item.isCompleted} name={item.id} onChange={this.onMarkusCompleted} />
                        <div className='crossed-line' onClick={() => this.onTaskClick(item.id)}>{item.name}</div>
                    </div>
                ))}
            </ListGroup>
            : null

    }

    render() {
        const { isEditable, category, weight, selectedTask } = this.props;
        const { taskname } = this.state;
        return (
            <Col xs={weight} className='TaskContainer' >

                <label className='TextSize'>{category[0].name}</label>

                {isEditable
                    ? <div className='rowCBottomSelected'>
                        <img className='Logo' onClick={this.makenonEditeable} src={greycircle} alt='logo'/>  
                        <input placeholder={'Add a task'} type='text' value={taskname} onKeyDown={this.onEnteredPressed} className='input' onChange={this.onTasknameChange} />
                    </div>
                    : <div className='rowC' onClick={this.makeEditable} >
                      <img className='Logo' src={addicon} alt='logo'/>  
                      <div className='TextNewSize' > Add a task</div>
                      </div>}

                <ListGroup variant="flush">
                    {this.getListItems(category,selectedTask)}
                </ListGroup>

                {this.getCompletedListItem(category,selectedTask)}


            </Col>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        addNewTask: task => dispatch(CategoryAction.addNewTask(task)),
        selectTask: task => dispatch(CategoryAction.SelectTask(task)),
        MakeEditable: task => dispatch(CategoryAction.MakeEditable(task)),
        markusCompeleted: task => dispatch(CategoryAction.markTaskusCompleted(task)),
        deletetask:task => dispatch(CategoryAction.deleteTask(task))
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