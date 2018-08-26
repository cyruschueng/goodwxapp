//
const React = require('react');
const AbstractBox = require('../../abstract/AbstractBox');
// // status: String,//表示按钮的状态.
// // styleDefault: Object,
//
// // export default class Tabbar extends React.PureComponent<StateTypes> {
class ProcessBarOut extends React.Component{
    constructor() {
        super();
    }
//
//     //className = {(className as any).container}
//
    render (){
        let styleDefault = {
            borderRadius: '5px',
            transform: `translateX(${this.props.myWidth * this.props.startIndex}px)`,
            width: `${this.props.myWidth}`,
            height: '100%',
            backgroundColor: 'rgba(255,162,38,1)',
            transition: `width ${this.props.dTime}s`
        };
        return(<AbstractBox
            styleDefault = {styleDefault}>
        </AbstractBox>)
//
    }
}
//
module.exports = ProcessBarOut;