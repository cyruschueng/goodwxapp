/**
 * Created by Administrator on 2016/7/11.
 */

var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');

var Modal = require('./Modal');

var shareGuiderInstance = null;

class ShareGuider {
    static show() {
        let tapHandler = ()=>{
            shareGuiderInstance.hide();
        };

        if( !shareGuiderInstance ){
            shareGuiderInstance = ReactDom.render(<Modal>
                <div className="share-guider" onTouchEnd={tapHandler}></div>
            </Modal>, $('#modal2')[0]);
        }else {
            shareGuiderInstance.show();
        }
    }
}

module.exports = ShareGuider;