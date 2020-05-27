import React from 'react';
import { connect } from "react-redux";
import { Row, Container } from 'react-bootstrap';
import './Dashboard.css'
import CategoriesList from '../../components/categories/CategoriesList';
import TaskList from '../../components/tasklist/TaskList';
import DescriptionComponent from '../../components/taskdescription/DescriptionComponent';

class Dashboard extends React.Component {

    render() {

        const { selected, showDescription, categories, isCategoryEditable, selectedTask } = this.props;
        return (
            <Container fluid>
                <Row className='fill-window'>
                    <CategoriesList categories={categories} isCategoryEditable={isCategoryEditable} />
                    <TaskList  weight={showDescription ? 8 : 8} category={selected} />
                    {showDescription ? <DescriptionComponent completed={selectedTask.isCompleted} name={selectedTask.name} description={selectedTask.description} selectedTask={selectedTask} /> : null}
                </Row>
            </Container>
        );
    }

}

const mapStateToProps = state => {
    const selectedCategory = state.categories.filter(function (item) {
        return item.isSelected;
    })[0]

    return {
        categories: state.categories,
        showDescription: state.showDescription,
        isCategoryEditable: state.isCategoryEditable,
        selected: selectedCategory,
        selectedTask: state.selectedTask,
    };
};


export default connect(mapStateToProps)(Dashboard);