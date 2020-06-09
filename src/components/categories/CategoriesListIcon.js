import React from 'react';
import * as CategoryAction from '../../redux/actions/index'
import { connect } from "react-redux";
import './CategoriesList.css';
import navigation from '../../assets/ic_navigation_menu.png';
import addIcon from '../../assets/ic_add.png';

class CategoriesListIcon extends React.Component {

    constructor(props) {
        super(props)
        this.categoryChange = this.categoryChange.bind(this);
        this.onEnteredPressed = this.onEnteredPressed.bind(this);
        this.makeEditable = this.makeEditable.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.onNavigationClick = this.onNavigationClick.bind(this);
        this.state = { categoryname: '' }
    }

    getUIbasedonLength(item, index) {
        if (item.tasks.length > 0) {
            return (
                <div key={index} className={item.isSelected?'rowCSelected':'rowC'} >
                  <img alt={item.name} onClick={e => this.selectCategory(item)} src={item.icon}/>
                </div>
            );
        } else {
            return (
                <div key={index} className={item.isSelected?'rowCSelected':'rowC'} >
                    <img  alt={item.name} onClick={e => this.selectCategory(item)} src={item.icon}/>
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

    onNavigationClick = () => {
        var toggle = !this.props.showFullCategory
        console.log(toggle);
        this.props.toggleSideBar(toggle);
        
    }

    makeEditable = () => {
        this.props.makeCategory(true);
        this.onNavigationClick();
    }


    render() {
        const { categoryname } = this.state;
        const { isCategoryEditable } = this.props;
        return (<div className='Sidebar' >
            <img className='navigaitonlogo' src={navigation} alt="navigation"  onClick={this.onNavigationClick}/>
            {this.props.categories.map((item, index) => this.getUIbasedonLength(item, index))}
            {isCategoryEditable
                ? <input placeholder={'+ New list'} type='text' value={categoryname} onKeyDown={this.onEnteredPressed} className='inputCategory' onChange={this.categoryChange} />
            : <img className='categorylogo' src={addIcon} alt='Newlist' onClick={this.makeEditable} /> }
        </div>);
    }


}

function mapDispatchToProps(dispatch) {
    return {
        addCategory: category => dispatch(CategoryAction.addCategory(category)),
        selectCategory: category => dispatch(CategoryAction.selectCategory(category)),
        makeCategory: category => dispatch(CategoryAction.MakeCategoryEditable(category)),
        toggleSideBar:category => dispatch(CategoryAction.toggleSideBar(category))
    };
}

const mapStateToProps = state => {
    return {
        showFullCategory:state.showFullCategory
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesListIcon);