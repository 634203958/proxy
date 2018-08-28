import React, {Component} from 'react';
import Calendar from './calendar';

class CalendarComponent extends Component {
    state = {};

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Calendar months={13} startMonth={'2018-09'}/>
            </div>
        );
    }
}

export default CalendarComponent;