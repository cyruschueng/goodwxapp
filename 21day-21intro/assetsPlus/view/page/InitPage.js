/**
 * Created by ichangtou on 2017/6/23.
 */
/**
 * Created by yiran on 2017/5/5.
 */
const $ = window.$ = require('jquery');
const React = require('react');

const InitPage = React.createClass({

    //渲染
    render() {
        let style = {
            width: '100%',
            height: '100%',
        }
        return(
            <div>
                {/*<span>123</span>*/}
                <img style = {style} src={`./assetsPlus/image/qqErrorImg.png`}/>
            </div>
        )
    },


});

module.exports = InitPage;