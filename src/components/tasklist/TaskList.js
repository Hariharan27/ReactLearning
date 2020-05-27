import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import './TaskList.css';
import { connect } from "react-redux";
import * as CategoryAction from '../../redux/actions/index'
import FontAwesome from 'react-fontawesome';


class TaskList extends React.Component {

    constructor(props) {
        super(props)
        this.onTaskClick = this.onTaskClick.bind(this);
        this.makeEditable = this.makeEditable.bind(this);
        this.onTasknameChange = this.onTasknameChange.bind(this);
        this.onEnteredPressed = this.onEnteredPressed.bind(this);
        this.onMarkusCompleted = this.onMarkusCompleted.bind(this);
        this.state = { taskname: '' };

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
                    ? <input placeholder={'Add a task'} type='text' value={taskname} onKeyDown={this.onEnteredPressed} className='input' onChange={this.onTasknameChange} />
                    : <div className='TextNewSize' onClick={this.makeEditable}>+ Add a task</div>}

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
        markusCompeleted: task => dispatch(CategoryAction.markTaskusCompleted(task))
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