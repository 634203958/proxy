import thunk from 'redux-thunk';               // redux-thunk 支持 dispatch function，并且可以异步调用它
import createLogger from 'redux-logger';       // 利用redux-logger 打印日志
import {createStore, applyMiddleware, compose} from 'redux'; // 引入redux createStore、中间件及compose
import DevTools from '../devtool/DevTools';    // 引入DevTools调试组件

const loggerMiddleware = createLogger();      // 打印日志
const middleware = [thunk, loggerMiddleware]; // 创建一个中间件集合

// 利用compose增强store，这个 store 与 applyMiddleware 和 redux-devtools 一起使用
const finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
)(createStore);

export default finalCreateStore;
