import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

import {staticUpdateName} from '../../../action/action';

import '../../../../assets/axios/axios';
import {fetchPost, fetchGet} from '../../../../assets/axios/axios';

import axios from 'axios';

class RudexComponent extends Component {
    state = {
        title: 'redux',
        isLoad: false,

    };

    componentWillMount() {

    }

    componentDidMount() {

        function aa() {
            return fetchPost('/ajax/travel/v4/detail.html', {
                data: {
                    contentId: '5b5938330cf26201662ee24a',
                    contentType: 'place',
                    start: 0,
                    limit: 10
                }
            }).then(response => {
                console.log(response);
                return response;
            }, err => {
                console.log(err);
                return err;
            });
        }

        function bb() {
            return fetchGet('/ajax/travel/v4/detail.html', {
                params: {
                    contentId: '5b5938330cf26201662ee24a',
                    contentType: 'place',
                    start: 0,
                    limit: 10
                }
            }).then(response => {
                console.log(response);
                return response;
            }, err => {
                console.log(err);
                return err;
            });
        }

        axios.all([aa(), bb()])
            .then(axios.spread(function (a, b) {
                console.log(a);
                console.log(b);
            }));

    }

    // 设置redux的值
    settingReduxItemState = () => {
        let obj = {name: '飞', age: 23};
        this.props.staticUpdateName(obj);
    };

    // 跳转
    handleBrowserHistory = () => {
        browserHistory.push('/ms/activity/test');
    };

    render() {
        return (
            <div>
                <h1>Redux Index</h1>

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

export default connect(mapState, {staticUpdateName})(RudexComponent);