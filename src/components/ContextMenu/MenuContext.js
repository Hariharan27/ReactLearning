import React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Card } from 'react-bootstrap';
import * as CategoryAction from '../../redux/actions/index';
import { connect } from "react-redux";

class MenuContext extends React.Component {

  constructor(props) {
    super(props);
    this.onImageDelete = this.onImageDelete.bind(this);
    this.onMarkusCompleted = this.onMarkusCompleted.bind(this);
  }

  onImageDelete = (id) => {
    console.log(id);
    this.props.deletetask({ taskid: id });
  }

  onMarkusCompleted = (id) => {
    this.props.markusCompeleted({ selectedtask: id, selection: !this.props.checked });
  }

  render() {
    const { child, id, checked } = this.props;
    return (
      <div>

        <ContextMenuTrigger id={''+id}>
          {child}
        </ContextMenuTrigger>

        <ContextMenu id={''+id}>
          <Card body>
            <MenuItem onClick={()=> this.onMarkusCompleted(id)} >
             {checked?<div>Mark as not completed</div> :<div>Mark as Completed</div>} 
            </MenuItem>
            <MenuItem  onClick={()=> this.onImageDelete(id)}>
              <div style={{ marginTop:'10px',color: 'red' }} >Delete</div>
            </MenuItem>
          </Card>
        </ContextMenu>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    markusCompeleted: task => dispatch(CategoryAction.markTaskusCompleted(task)),
    deletetask: task => dispatch(CategoryAction.deleteTask(task))
  };
}

export default connect(null, mapDispatchToProps)(MenuContext);