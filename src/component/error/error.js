import React, {Component} from "react"
import './error.less'

class Error extends Component {
    render() {
        return <div>
            {this.props.errorText ? (
               <div className="error-component">
                   <div className="error-content">
                       <h3 className="error-title">{this.props.errorText}</h3>
                       <p className="error-explain">请刷新页面再次尝试或联系客服</p>
                   </div>
               </div>
            ) : (
               <div className="load-component">努力加载中...</div>
            )}
        </div>
    }
}

export default Error

