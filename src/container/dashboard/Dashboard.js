import React from 'react';
import { connect } from "react-redux";
import './Dashboard.css'
import CategoriesList from '../../components/categories/CategoriesList';
import TaskList from '../../components/tasklist/TaskList';
import DescriptionComponent from '../../components/taskdescription/DescriptionComponent';

class Dashboard extends React.Component {

    render() {

        const { selected, showDescription, categories, isCategoryEditable, selectedTask } = this.props;
     if(showDescription)
        return (
            
            <div className='fill-window'>
                
                <CategoriesList categories={categories} isCategoryEditable={isCategoryEditable} />
          
                <div style={{flex:'0.6'}}>
                <TaskList selectedTask={selectedTask} category={selected} />
                </div>

                <div style={{flex:'0.2'}}>
                <DescriptionComponent completed={selectedTask.isCompleted} name={selectedTask.name} description={selectedTask.description} selectedTask={selectedTask} />
                </div>

            </div>
        );
        else
        return (
            
            <div className='fill-window' >
                
                <CategoriesList categories={categories} isCategoryEditable={isCategoryEditable} />
                        
                <div style={{flex:'0.8'}}>
                <TaskList selectedTask={selectedTask} category={selected} />
                </div>
            </div>
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