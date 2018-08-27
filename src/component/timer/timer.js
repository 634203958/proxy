/**
 * Created by wangchunyang on 2018/7/30.
 */
import React, {Component} from "react"
import './timer.less'
//计时器组件
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        };
    }

    //设置state的更新状态
    tick(timeType, duration) {
        this.setState((prevState) => ({[timeType]: prevState[timeType] + duration}));
    }

    //重置时分秒为0
    reset(timeType) {
        this.setState({[timeType]: 0});
    }

    //初始化时间
    initialize(duration) {
        this.setState({
            day: Math.floor(duration / 1000 / 60 / 60 / 24),
            hour: Math.floor(duration / 1000 / 60 / 60 % 60),
            minute: Math.floor(duration / 1000 / 60 % 60),
            second: Math.floor(duration / 1000 % 60),
            millisecond: duration % 1000
        })
    }

    //启动时间
    startTime(duration) {
        this.tick('millisecond', duration);
        if (this.state.millisecond >= 1000) {
            this.reset('millisecond');
            this.tick('second', 1);
        }

        if (this.state.second >= 60) {
            this.reset('second');
            this.tick('minute', 1);
        }

        if (this.state.minute >= 60) {
            this.reset('minute');
            this.tick('hour', 1);
        }

        if (this.state.hour >= 24) {
            this.reset('hour');
            this.tick('day', 1);
        }
    }

    componentDidMount() {
        this.initialize(this.props.time);
        this.interval = setInterval(() => this.startTime(50), 50);
    }

    //清除定时器计时
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
           <div className="date-items">
               <span>{this.state.day > 9 ? this.state.day : '0' + this.state.day}</span>天
               <span>{this.state.hour > 9 ? this.state.hour : '0' + this.state.hour}</span>时
               <span>{this.state.minute > 9 ? this.state.minute : '0' + this.state.minute}</span>分
               <span>{this.state.second > 9 ? this.state.second : '0' + this.state.second}</span>秒
               <span className="millisecond">{parseInt(this.state.millisecond / 10)}</span>
           </div>
        );
    }
}

export default Timer