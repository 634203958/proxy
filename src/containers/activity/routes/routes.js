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
    CalendarIndex: {
        title: 'test',
        path: '/ms/activity/calendar',
        getComponent(nextState, cb) {
            require.ensure([], function (require) {
                return cb(null, require('../calendar/index').default);
            }, 'CalendarIndex');
        }
    },
};

const activity = [
    routeList.ActivityIndex,
    routeList.CalendarIndex
];

export {activity};
