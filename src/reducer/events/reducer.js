import {UPDATE} from '../../action/type';

// 初始数据
const userInitial = {
    name: {}
};

export function user(state = userInitial, action) {
    switch (action.type) {
        case UPDATE:
            console.log(action);
            return Object.assign({}, state, {name: action.json});
        default:
            return state;
    }
}