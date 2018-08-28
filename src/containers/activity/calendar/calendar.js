import React, {Component} from 'react';
import './calendar.less';

class Calendar extends Component {
    state = {
        months: [],
        startMonth: '',
        dateList: [],
        inventories: []
    };

    componentWillMount() {
        let {months, startMonth, inventories} = this.props;
        this.setState({
            months: months > 0 ? new Array(months).fill(months) : [],
            startMonth: startMonth,
            inventories: inventories && inventories.length > 0 ? inventories : []
        }, function () {
            this.handleInit();
        });

        console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        let {months, startMonth, inventories} = nextProps.props;
        this.setState({
            months: months > 0 ? new Array(months).fill(months) : [],
            startMonth: startMonth,
            inventories: inventories && inventories.length > 0 ? inventories : []
        }, function () {
            this.handleInit();
        });
    }

    /**
     * 整合数据
     *
     *
     **/
    handleInit = () => {
        let that = this, {months, startMonth, inventories} = this.state;
        let dateList = [], currentMonth = startMonth;
        if (months && months.length > 0) {
            months.map(() => {
                let firstWeek = that.handleGetWeek(currentMonth);
                let currentMonthDay = that.handleMonthToNumber(currentMonth);
                let currentMonthDayAry = new Array(currentMonthDay).fill(currentMonthDay);

                // 循环每月的每一天，检测某天是否包含库存
                let itemMonthDays = [];
                currentMonthDayAry.map((day, index) => {
                    let itemDay = String(index + 1 < 10 ? `0${index + 1}` : index + 1);
                    let itemDate = `${currentMonth}-${itemDay}`;

                    // 校验
                    let isInventory = false;
                    inventories.map((inventory) => {
                        itemDate === inventory.date ? isInventory = true : null;
                    });
                    itemMonthDays.push({date: itemDate, day: Number.parseInt(itemDay, 10), isInventory: isInventory});
                });

                // 组合数据
                let dateItem = {
                    date: currentMonth,
                    firstWeek: firstWeek === 0 ? [0] : new Array(firstWeek).fill(firstWeek),
                    list: itemMonthDays
                };
                dateList.push(dateItem);
                currentMonth = that.handleNextMonth(currentMonth);
            });
            that.setState({dateList});
        }
    };

    /**
     * 根据当前月计算出下个月
     * @params date '2018-07'
     * @params c    boolean
     *
     **/
    handleNextMonth = (date, c = false) => {
        let [year, month] = date.split('-');
        let year2 = year, month2 = parseInt(month) + 1;
        if (month2 === 13) {
            year2 = parseInt(year2) + 1;
            month2 = 1;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        if (c) {
            return `${year2}-${month2}-01`;
        } else {
            return `${year2}-${month2}`;
        }
    };

    /**
     * 计算每月的一号是周几
     * @params dateString '2018-09-01'
     *
     **/
    handleGetWeek = (dateString) => {
        let date, dateString2 = dateString + '-01';
        if (dateString2 === null || typeof dateString2 === 'undefined') {
            date = new Date();
        } else {
            let dateArray = dateString2.split('-');
            date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
        }
        return date.getDay();
    };

    /**
     * 根据年月计算出当月天数
     * @params date '2018-09'
     *
     **/
    handleMonthToNumber = (date) => {
        let dateArray = date.split('-');
        let month = parseInt(dateArray[1], 10);
        let temp = new Date(dateArray[0], month, 0);
        return temp.getDate();
    };

    render() {
        const {dateList} = this.state;
        return (
            <div>
                {dateList && dateList.length > 0 ? (
                    <div className="calendar-container">
                        <div className="calendar-week">
                            <span className="item-week item-week-sun">周日</span>
                            <span className="item-week">周一</span>
                            <span className="item-week">周二</span>
                            <span className="item-week">周三</span>
                            <span className="item-week">周四</span>
                            <span className="item-week">周五</span>
                            <span className="item-week item-week-sun">周六</span>
                        </div>
                        <div className="calendar-content">
                            {dateList.map((item, index) => {
                                return (
                                    <div className="calendar-list" key={index}>
                                        <div className="calendar-list-header">{item.date}</div>
                                        <div className="calendar-list-day">
                                            {/*数字转数组 */}
                                            {item.firstWeek.map((week, weekIndex) => {
                                                return <span key={weekIndex} className="item-day">&nbsp;</span>;
                                            })}
                                            {item.list.map((day, dayIndex) => {
                                                return <span key={dayIndex}
                                                             className={day.isInventory ? 'item-day item-day-active' : 'item-day'}>{day.day}</span>;
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="calendar-notData">暂无日历数据</div>
                )}
            </div>
        );
    }
}

export default Calendar;