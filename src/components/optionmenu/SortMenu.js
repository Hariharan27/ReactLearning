import React from 'react';
import {Dropdown} from 'react-bootstrap';
import sortlogo from '../../assets/ic_sort.png';
import './SortMenu.css';
import { connect } from "react-redux";
import * as CategoryAction from '../../redux/actions/index';


 class SortMenu extends React.Component {

    constructor(props){
        super(props);
        this.sortascending = this.sortascending.bind(this);
        this.sortdecending = this.sortdecending.bind(this);
    }

    sortdecending = () => {
        this.props.sortDecending();
    }

    sortascending = () => {
        this.props.sortAscending();
    }

    CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
        </a>
      ));
    

    render() {

        return (
            <div className='sortdiv'>
            <Dropdown>
                <Dropdown.Toggle as={this.CustomToggle} id="dropdown-custom-components">
                    <div>
                        <img src={sortlogo} alt='sort' />
                        <label className='Sort'>sort</label>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    <Dropdown.Item onClick={this.sortascending} eventKey="1">Ascending</Dropdown.Item>
                    <Dropdown.Item onClick={this.sortdecending} eventKey="2">Descending</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
            
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        sortAscending: tasks => dispatch(CategoryAction.sortAscending(tasks)),
        sortDecending: tasks => dispatch(CategoryAction.sortDecending(tasks))
    };
}

export default connect(null,mapDispatchToProps)(SortMenu);