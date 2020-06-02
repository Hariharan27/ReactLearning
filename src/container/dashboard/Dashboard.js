import React from 'react';
import { connect } from "react-redux";
import './Dashboard.css'
import CategoriesList from '../../components/categories/CategoriesList';
import CategoriesListIcon from '../../components/categories/CategoriesListIcon'
import TaskList from '../../components/tasklist/TaskList';
import DescriptionComponent from '../../components/taskdescription/DescriptionComponent';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showFullCategory: true };
    }

    render() {

        const { selected, showDescription, categories, isCategoryEditable, selectedTask,showFullCategory } = this.props;
        if (showDescription)
            return (

                <div className='fill-window'>

                    {showFullCategory
                        ?
                        <div style={{ flex: 0.2 }}>
                            <CategoriesList categories={categories} isCategoryEditable={isCategoryEditable} />
                        </div>
                        :
                        <div style={{ flex: '0.01' }}>
                            <CategoriesListIcon categories={categories} isCategoryEditable={isCategoryEditable} />
                        </div>

                    }

                    {showFullCategory
                        ?
                        <div style={{ flex: '0.6' }}>
                            <TaskList steps={selectedTask!=null?selectedTask.steps:null} showFullCategory={showFullCategory} selectedTask={selectedTask} category={selected} />
                        </div>
                        :
                        <div style={{ flex: '0.79' }}>
                            <TaskList steps={selectedTask!=null?selectedTask.steps:null} showFullCategory={showFullCategory} selectedTask={selectedTask} category={selected} />
                        </div>

                    }


                    <div style={{ flex: '0.2' }}>
                        <DescriptionComponent steps={selectedTask.steps} completed={selectedTask.isCompleted} name={selectedTask.name} description={selectedTask.description} selectedTask={selectedTask} />
                    </div>

                </div>
            ); 
        else
            return (

                <div className='fill-window' >


                    {showFullCategory
                        ?
                        <div style={{ flex: 0.2 }}>
                            <CategoriesList categories={categories} isCategoryEditable={isCategoryEditable} />
                        </div>
                        :
                        <div style={{ flex: '0.01' }}>
                            <CategoriesListIcon categories={categories} isCategoryEditable={isCategoryEditable} />
                        </div>

                    }

                    {showFullCategory
                        ?
                        <div style={{ flex: '0.8' }}>
                            <TaskList steps={selectedTask!=null?selectedTask.steps:null} showFullCategory={showFullCategory} selectedTask={selectedTask} category={selected} />
                        </div>
                        :
                        <div style={{ flex: '0.99' }}>
                            <TaskList steps={selectedTask!=null?selectedTask.steps:null} showFullCategory={showFullCategory} selectedTask={selectedTask} category={selected} />
                        </div>

                    }
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
        showFullCategory:state.showFullCategory
    };
};


export default connect(mapStateToProps)(Dashboard);