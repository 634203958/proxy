/**
 * Created by wangchunyang on 2018/5/28.
 */
import React, {Component} from "react"
import './countdown.less'

class CountDownComponent extends Component {
     CountDown = (str) => {
          let leftTime = +str - (new Date()).getTime(),
             leftsecond = parseInt(leftTime / 1000),
             day1 = Math.floor(leftsecond / (60 * 60 * 24)),
             hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600),
             minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60),
             second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60),
             timeMilliseSecond = parseInt((leftTime / 100) % 9 + 1);
          return {
               leftTime: leftTime,
               day: day1 < 10 && day1 > 0 ? "0" + day1 : day1 >= 10 ? day1 : '00',
               hours: hour < 10 && hour > 0 ? "0" + hour : leftTime < 0 ? '0' : hour,
               minute: minute < 10 && minute > 0 ? "0" + minute : leftTime < 0 ? '0' : minute,
               second: second < 10 && second > 0 ? "0" + second : leftTime < 0 ? '0' : second,
               mill: leftTime < 0 ? '0' : timeMilliseSecond
          }
     };

     getSecond = (str) => {
          let that = this, _date = that.CountDown(str);
          $(".countDown-container .time-day").text(_date.day);
          $(".countDown-container .time-hours").text(_date.hours);
          $(".countDown-container .time-minute").text(_date.minute);
          $(".countDown-container .time-second").text(_date.second);
          $(".countDown-container .time-milliseSecond").text(_date.mill);
          // 设置定时器
          window._timer = setTimeout(() => {
               if (_date.leftTime > 0) {
                    that.getSecond(str);
               } else {
                    clearTimeout(window._timer);
               }
          }, 100);
     };

     componentDidMount() {
          this.getSecond(this.props.endTime);
     }

     render() {
          let title = this.props.title, subTitle = this.props.subTitle;
          return (
             <section className="countDown-container">
                  {title ? (
                        <h3 className="timer-title"><span
                           className="title-bg">&nbsp;</span>距离抢购结束还剩<span
                           className="title-bg">&nbsp;</span></h3>
                     ) : null}
                  <div className="timer-count">
                       {subTitle ? (<span className="subtitle">{subTitle}</span>) : null}
                       <span className="common-time time-day">00</span>天
                       <span className="common-time time-hours">00</span>时
                       <span className="common-time time-minute">00</span>分
                       <span className="common-time time-second">00</span>秒
                       <span className="common-time time-milliseSecond">0</span>
                  </div>
             </section>
          )
     }
}

export default CountDownComponent
