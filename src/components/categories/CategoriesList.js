import React from 'react';
import * as CategoryAction from '../../redux/actions/index'
import { connect } from "react-redux";
import './CategoriesList.css'
import navigation from '../../assets/ic_navigation_menu.png';

class CategoriesList extends React.Component {

    constructor(props) {
        super(props)
        this.categoryChange = this.categoryChange.bind(this);
        this.onEnteredPressed = this.onEnteredPressed.bind(this);
        this.makeEditable = this.makeEditable.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.state = { categoryname: '' }
    }

    getUIbasedonLength(item, index) {
        if (item.tasks.length > 0) {
            return (
                <div className='rowC' >
                    <div className={item.isSelected === true ? 'SelectedSidebarText' : 'UnselectedSidebarText'} key={index} onClick={e => this.selectCategory(item)}>{item.name}</div>
                    <div className={item.isSelected === true ? 'SelectedColor' : 'UnSelectedColor'}>{item.tasks.length}</div>
                </div>
            );
        } else {
            return (
                <div className='rowC' >
                    <div className={item.isSelected === true ? 'SelectedSidebarText' : 'UnselectedSidebarText'} key={index} onClick={e => this.selectCategory(item)}>{item.name}</div>
                </div>
            );
        }
    }

    categoryChange = (event) => {
        this.setState({ categoryname: event.target.value });
    }

    selectCategory = (item) => {
        this.props.selectCategory(item);
    }

    onEnteredPressed = (e) => {
        if (e.keyCode === 13) {
            const now = Date.now(); // Unix timestamp in milliseconds
            this.setState({ categoryname: '' })
            this.props.addCategory({ id: now, name: this.state.categoryname, isSelected: false, tasks: [] });

        }
    }

    makeEditable = () => {
        this.props.makeCategory(true);
    }


    render() {
        const { categoryname } = this.state;
        const { isCategoryEditable } = this.props;
        return (<div className='Sidebar' >
            <img className='navigaitonlogo' src={navigation} alt="navigation" />
            {this.props.categories.map((item, index) => this.getUIbasedonLength(item, index))}
            {isCategoryEditable
                ? <input placeholder={'+ New list'} type='text' value={categoryname} onKeyDown={this.onEnteredPressed} className='inputCategory' onChange={this.categoryChange} />
                : <div className='TextNewCategory' onClick={this.makeEditable}> + New list</div>}
        </div>);
    }

}

function mapDispatchToProps(dispatch) {
    return {
        addCategory: category => dispatch(CategoryAction.addCategory(category)),
        selectCategory: category => dispatch(CategoryAction.selectCategory(category)),
        makeCategory: category => dispatch(CategoryAction.MakeCategoryEditable(category))
    };
}

export default connect(null, mapDispatchToProps)(CategoriesList);