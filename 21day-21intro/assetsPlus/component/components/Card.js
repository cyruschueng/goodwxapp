/**
 * Created by ichangtou on 2017/8/3.
 */
const React = require('react');

const Card = React.createClass({
    render (){
        if(this.props.children) {
            return (
                <div style = {this.props.styleDefault} className="global-card-layout">
                    {this.props.children}
                </div>
            );
        } else {
            return null;
        }
    }
});
module.exports = Card;







