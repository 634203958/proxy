import React, {Component} from 'react';                                  // 引用React
import {render} from 'react-dom';                                      // 引用render方法
import {Provider} from 'react-redux';                                  // 利用Provider可以使我们的store为组件所用
import {Router, browserHistory} from 'react-router';   // browserHistory 是由 react-router创建浏览器应用推荐的history
import {syncHistoryWithStore} from 'react-router-redux';               // syncHistoryWithStore结合store同步导航事件

import finalCreateStore from '../../store/configureStore';               // 引用store配置
import reducer from '../../reducer/index';                               // 引用reducer集合
import 'babel-polyfill';
import '../../../assets/css/global.less';
import './activity.less';

const store = finalCreateStore(reducer), history = syncHistoryWithStore(browserHistory, store);

// all click to fastClick
import initReactFastclick from 'react-fastclick';

initReactFastclick();

class App extends Component {
    render() {
        return this.props.children;
    }
}

import {activity} from './routes/routes';

const rootRoute = {
    childRoutes: [{
        path: '/',
        component: App,
        childRoutes: activity
    }]
};

render(
    <Provider store={store}>
        <Router routes={rootRoute} history={history}/>
    </Provider>,
    document.getElementById('activity')
);
