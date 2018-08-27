import {combineReducers} from "redux"                // 合并reducer集合
import {routerReducer} from "react-router-redux"     // 将routerReducer一起合并管理

import {user} from './events/reducer'

export default combineReducers({
    user,
    routing: routerReducer
})