import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {noScroll,toast} from '../../../assets/util/util';
import './downMenuCityList.less';

class DownMeunCityList extends Component {
    state = {
        toggle: false,
        cityList: [],
        selectedId: ''
    };

    componentWillMount() {
        let {toggle, selectedId, cityList} = this.props;
        this.setState({
            toggle: toggle || false,
            cityId: selectedId || '',
            cityList: cityList || []
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toggle) {
            this.setState({
                toggle: true,
                cityId: nextProps.cityId || '',
                cityList: nextProps.cityList || []
            });
            noScroll(true);
        }
    }

    // 选择城市
    handleGetCity = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({toggle: false});

        //返回数据到父组件
        if (this.props.callBack &&  typeof this.props.callBack === 'function') {
            this.props.callBack(item);
        }
        noScroll(false);
    };

    // 隐藏弹框
    handleCloseModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        noScroll(false);
        this.setState({toggle: false});

        //返回数据到父组件
        if (this.props.callBack &&  typeof this.props.callBack === 'function') {
            this.props.callBack(false);
        }
    };


    render() {
        if (this.state.toggle) {
            return ReactDOM.createPortal(<div className="city-list-component">
                <div className="context">
                    <div className="title">选择城市</div>
                    <ul className="list">
                        {this.state.cityList.map((item) => {
                            return <li key={item.cityId}
                                       className={item.cityId === this.state.cityId ? 'list-item active' : 'list-item'}
                                       onClick={(e) => this.handleGetCity(e, item)}>
                                <span className="name">{item.cityName}</span>
                            </li>;
                        })}
                    </ul>
                </div>
                <div className="context-bg"
                     onClick={(e) => this.handleCloseModal(e)}
                     onTouchMove={() => {
                         return false;
                     }}>&nbsp;</div>
            </div>, document.querySelector('body'));
        } else {
            return null;
        }
    }
}

export default DownMeunCityList;