import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

import {staticUpdateName} from '../../../action/action';

class RudexTest extends Component {
    state = {
        title: 'redux',
        isLoad: false,

    };

    componentWillMount() {

    }

    componentDidMount() {

        console.log(this.props.name)

    }

    // 设置redux的值
    settingReduxItemState = () => {
        let obj = {name: '飞2', age: 123};
        this.props.staticUpdateName(obj);
    };

    // 跳转
    handleBrowserHistory = () => {
        browserHistory.push('/ms/activity/index');
    };

    render() {
        return (
            <div>
                <h1>Redux Test</h1>

                <button onClick={this.settingReduxItemState}>向redux传值</button>

                <a className="button" onClick={this.handleBrowserHistory}>
                    <h3>查看redux中的数据</h3>
                </a>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        name: state.user.name
    };
};

export default connect(mapState, {staticUpdateName})(RudexTest);