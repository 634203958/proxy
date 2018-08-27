import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {setShare, noScroll} from '../../../assets/util/util';
import './shareBar.less';

class ShareBar extends Component {
    state = {
        toggle: false,
        channel: [1, 2],
        shareModel: {}
    };

    componentWillMount() {
        let {toggle, channel, shareModel} = this.props;
        this.setState({
            toggle: toggle || false,
            channel: channel || [1, 2],
            shareModel: shareModel || null
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toggle) {
            this.setState({
                toggle: true,
                channel: nextProps.channel || [1, 2],
                shareModel: nextProps.shareModel || null
            }, function () {
                setTimeout(() => {
                    let $bg = document.querySelector('.nav-bg'), $nav = document.querySelector('.nav-list');
                    $bg.classList.add('nav-bg-active');
                    $nav.classList.add('nav-list-active');
                }, 0);
            });
            noScroll(true);
        }
    }

    // 关闭bar
    handleCloseBar = () => {
        let $bg = document.querySelector('.nav-bg'), $nav = document.querySelector('.nav-list');
        $bg.classList.remove('nav-bg-active');
        $nav.classList.remove('nav-list-active');
        setTimeout(() => {
            this.setState({toggle: false});
        }, 500);
        noScroll(false);
    };

    // 分享
    handleShare = (type) => {
        // 参数1：分享模型
        // 参数2：是否开启客户端分享
        // 参数3：分享渠道 1微信好友 2朋友圈 4新浪
        setShare(this.state.shareModel, true, type);
    };

    render() {
        if (this.state.toggle) {
            return ReactDOM.createPortal(<div className="shareBar-component">
                <div className="nav-bg" onClick={this.handleCloseBar}>&nbsp;</div>
                <div className="nav-list">
                    <h3 className="title">分享到</h3>
                    {
                        this.state.channel.map((item) => {
                            if (item === 1) {
                                return <div className="nav-tem" key={item}>
                                    <a className="btn btn-friend" onClick={() => this.handleShare(1)}>微信好友</a>
                                </div>;
                            } else if (item === 2) {
                                return <div className="nav-tem" key={item}>
                                    <a className="btn btn-circle" onClick={() => this.handleShare(2)}>朋友圈</a>
                                </div>;
                            } else if (item === 3) {
                                return <div className="nav-tem" key={item}>
                                    <a className="btn btn-sina" onClick={() => this.handleShare(4)}>微博</a>
                                </div>;
                            }
                        })
                    }
                </div>
            </div>, document.querySelector('body'));
        } else {
            return null;
        }
    }
}

export default ShareBar;