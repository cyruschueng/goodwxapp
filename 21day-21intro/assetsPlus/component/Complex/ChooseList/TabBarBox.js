/**
 * Created by ichangtou on 2017/8/3.
 */
/**
 * Created by ichangtou on 2017/8/3.
 */
const React = require('react');
const AbstractBox = require('../../abstract/AbstractBox');
// index = {this.props.index}
// arrayIndex = {this.props.arrayIndex}
// content = {this.props.content}
// status = {this.props.status}
// cbfClick = {this.props.cbfClick}

const TabBarBox = React.createClass({
    render (){
        let distance = 0;
        let styleClick = {
            backgroundColor: 'green',
        }
        let styleHover = {
            backgroundColor: 'orange',
        }
        let styleDefault = {
            backgroundColor: 'yellow',
            width: '58px',
            height: `${this.props.perHeight}`,
            marginLeft: `${distance}`,
            marginRight: `${distance}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };

        return(<AbstractBox
            index = {this.props.index}
            arrayIndex = {this.props.arrayIndex}
            content = {this.props.content}
            status = {this.props.status}
            cbfClick = {this.props.cbfClick}
            styleDefault = {styleDefault}
            styleClick = {styleClick}
            styleHover = {styleHover}
            // styleImage = {styleImage}
        />)
    },

});

module.exports = TabBarBox;







