/**
 * Created by wangchunyang on 2018/7/30.
 */
import React, {Component} from 'react';
import './funrecommend.less';

class FunRecommend extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.datalist, title = this.props.title;

        function FunRecommendItem(e) {
            window.location.href = $(e.currentTarget).attr('data-url');
        }

        return (
           <div className="FunRecommend mt_10">
               <h3 className="recommend-title">{title || '周边好玩推荐'}</h3>
               <ul className="clear">
                   {
                       data.map((item, index) => {
                           return <li key={index} data-url={item.url} onClick={FunRecommendItem}>
                               <div className="item">
                                   <div className="img" style={{background: 'url(' + item.imageUrl + ')'}}></div>
                                   <footer className="message-container">
                                       <h3>{item.title}</h3>
                                       <p>{item.comment}</p>
                                       {item.distance ? (
                                             <aside className="item-message">
                                                 <span className="message-distance"><i>{item.distance}</i></span>
                                             </aside>
                                          ) : null}
                                   </footer>
                                   <footer className="item-user">
                                       {item.honorLevel === 1 ?  <span className="user-vip">&nbsp;</span> : null}
                                       <img src={item.authorIcon}/>
                                       <aside>
                                           <p>{item.authorName}</p>
                                       </aside>
                                       <div className="message-aside">
                                           <span className="aside-zan">{item.likeNum}</span>
                                       </div>
                                   </footer>
                               </div>
                           </li>;
                       })
                   }
               </ul>
           </div>
        );
    }
}

export default FunRecommend;
