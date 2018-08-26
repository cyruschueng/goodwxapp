/**
 * 其他迷你课
 * Created by lip on 2016/6/30.
 */
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

const ICT_CHANNEL = 'f30bbfdfd94c42ebb3244bafe620ed70'; //上线数据
const LINK_ARRAY = [
    {
        text: '这个基金绝不能错过',
        href: 'http://h5.ichangtou.com/minic/index4.html?ictchannel=f30bbfdfd94c42ebb3244bafe620ed70',
        number: ''
    },
    {
        text: 'P2P内幕竟然是？',
        href: 'http://h5.ichangtou.com/minic/index.html?ictchannel=f30bbfdfd94c42ebb3244bafe620ed70',
        number: ''
    },
    {
        text: '英国脱欧大赚一笔',
        href: 'http://h5.ichangtou.com/minic3/index.html?ictchannel=f30bbfdfd94c42ebb3244bafe620ed70',
        number: ''
    },
    {
        text: '0风险赚钱技巧',
        href: 'http://h5.ichangtou.com/minic/index2.html?ictchannel=f30bbfdfd94c42ebb3244bafe620ed70',
        number: ''
    }
];

//容器ID
var containerId = 'others';

var OtherLinks = React.createClass({
    render() {
        let anchorArray = [];
        for( let anchor of LINK_ARRAY ){
            anchorArray.push(
                <p>
                    <a href={anchor.href+'?ictchannel='+ICT_CHANNEL}>{anchor.text}</a>
                    <span className="number">{anchor.number}</span>
                </p>
            );
        }

        return (<div>
            <div className="message_content message_text">
                <p className="title">还不过瘾？更多——</p>
                <div id="otherLinks" className="other-links">
                    {anchorArray}
                </div>
            </div>
            <div className="message_avatar"></div>
        </div>);
    }
});

class Others {
    //添加“其他”迷你课链接
    static addOtherLinks() {
        if( LINK_ARRAY && LINK_ARRAY.length > 0 ) {
            ReactDom.render(<OtherLinks />, $('#'+containerId)[0]);
        }
    }
}

module.exports = Others;
