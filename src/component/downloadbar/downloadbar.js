import React, {Component} from "react"
import './downloadbar.less'

class DownloadBar extends Component {
    render() {
        let {title = '彩贝壳，精选周末好趣处', subtitle = '给宝贝一个闪闪发光的童年'} = this.props;
        return [
            <div key="d123456789" className="downloadBar-component">
                <a href='https://m.caibeike.com'>
                    <div className="download-content">
                        <img className="download-content-logo"
                             src="https://cdn.caibeike.com/static/images/download_icon@2x.png"/>
                        <p className="download-content-title">{title}</p>
                        <p className="download-content-detail">{subtitle}</p>
                        <span className="download-content-go">去看看</span></div>
                </a>
            </div>,
            <div key="d987654321" className="downloadBar-component-placeholder">&nbsp;</div>
        ]
    }
}

export default DownloadBar