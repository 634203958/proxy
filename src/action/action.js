import {ajax} from '../../assets/util/util';
import Address from '../../location';

import {updateName} from './type';


// 异步方法
export function activityUpdateName(name, callback) {
    return dispatch => {
        return ajax({
            unload: false,
            url: Address.ajaxUrl('/ajax/member/gwg/joinGWG.html'),
            data: {
                name: name
            },
            success(data) {
                if (data.code === 200) {
                    dispatch(updateName(data));
                    callback(data);
                } else {
                    callback(data.message);
                }
            }, error() {
                callback('系统异常');
            }
        });
    };
}

// 非异步方法
export function staticUpdateName(name) {
    return dispatch => {
        dispatch(updateName(name));
    };
}


export function requireTest(callback) {
    return ajax({
        unload: false,
        url: Address.ajaxUrl('/ajax/travel/v4/detail.html'),
        data: {
            contentId: '5b5938330cf26201662ee24a',
            contentType: 'place',
            start: 0,
            limit: 10,
        },
        success(data) {
            if (data.code === 200) {
                callback(data);
            } else {
                callback(data.message);
            }
        }, error() {
            callback({message: '系统异常'});
        }
    });
}