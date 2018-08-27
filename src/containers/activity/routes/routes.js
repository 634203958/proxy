const routeList = {
    ActivityIndex: {
        title: 'index',
        path: '/ms/activity/index',
        getComponent(nextState, cb) {
            require.ensure([], function (require) {
                return cb(null, require('../index/index').default);
            }, 'ActivityIndex');
        }
    },
    ActivityTest: {
        title: 'test',
        path: '/ms/activity/test',
        getComponent(nextState, cb) {
            require.ensure([], function (require) {
                return cb(null, require('../index/test').default);
            }, 'ActivityTest');
        }
    },
};

const activity = [
    routeList.ActivityIndex,
    routeList.ActivityTest
];

export {activity};
