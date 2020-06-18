import React from 'react';
import * as CategoryAction from '../../actions/index'
import { connect } from "react-redux";
import './CategoriesList.css'
import navigation from '../../assets/ic_navigation_menu.png';
import itemlist from '../../assets/ic_item_list.png'
import addIcon from '../../assets/ic_add.png';


class CategoriesList extends React.Component {

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
                <div key={index} className='rowC' onClick={e => this.selectCategory(item)}>
                    <img alt={item.name} src={item.icon} />
                    <div className={item.isSelected === true ? 'SelectedSidebarText' : 'UnselectedSidebarText'} >{item.name}</div>
                    <div className={item.isSelected === true ? 'SelectedColor' : 'UnSelectedColor'}>{item.tasks.length}</div>
                </div>
            );
        } else {
            return (
                <div key={index} className='rowC' onClick={e => this.selectCategory(item)}>
                    <img alt={item.name} src={item.icon} />
                    <div className={item.isSelected === true ? 'SelectedSidebarText' : 'UnselectedSidebarText'}  >{item.name}</div>
                </div>
            );
        }
    }

    onNavigationClick = () => {
        var toggle = !this.props.showFullCategory
        console.log(toggle);
        this.props.toggleSideBar(toggle);
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
            this.props.addCategory({ id: now, name: this.state.categoryname, isSelected: false, tasks: [], icon: itemlist });

        }
    }

    makeEditable = () => {
        this.props.makeCategory(true);
    }


    render() {
        const { categoryname } = this.state;
        const { isCategoryEditable } = this.props;
        return (<div className='Sidebar' >
            <img className='navigaitonlogo' src={navigation} alt="navigation" onClick={this.onNavigationClick} />
            {this.props.categories.map((item, index) => this.getUIbasedonLength(item, index))}
            {isCategoryEditable
                ? <div className='rowCWhiteBackground' >
                    <img className='categorylogoadd' alt='New list' src={addIcon} />
                    <input placeholder={'New list'} type='text' value={categoryname} onKeyDown={this.onEnteredPressed} className='inputCategory' onChange={this.categoryChange} />
                </div>
                : <div className='rowC' onClick={this.makeEditable}>
                    <img className='categorylogoadd' alt='New list' src={addIcon} />
                    <div className='SelectedSidebarText'> New list</div>
                </div>}
        </div>);
    }

}

function mapDispatchToProps(dispatch) {
    return {
        addCategory: category => dispatch(CategoryAction.addCategory(category)),
        selectCategory: category => dispatch(CategoryAction.selectCategory(category)),
        makeCategory: category => dispatch(CategoryAction.MakeCategoryEditable(category)),
        toggleSideBar: category => dispatch(CategoryAction.toggleSideBar(category))
    };
}

const mapStateToProps = state => {
    return {
        showFullCategory: state.showFullCategory
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);