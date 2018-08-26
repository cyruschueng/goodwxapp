//
const React = require('react');
const ProcessBarInner = require('../ProcessBar/ProcessBarInner');
const ProcessBarOut = require('../ProcessBar/ProcessBarOut');
//
// //kValue
// //dTime
//
//
class ProcessBarContain extends React.Component{
    constructor() {
        super();
        this.state = {
            outWidth: 129,
        }
    }

    //className = {(className as any).container}

    render (){
        console.log(this.props);
        return(<div style= {this.props.styleDefault}>
            {this.renderProcessBarOut()}
        </div>)

    }


    renderProcessBarOut() {
        let styleDefault = {
            borderRadius: '5px',
            width: `${this.state.outWidth}px`,
            height: '14px',
            backgroundColor: '#347499',
            display: 'flex',
            flexWrap: 'no-wrap',
            alignItems: 'center',
        };
        let arr = [];
        arr.push(<ProcessBarOut styleDefault = {styleDefault}>
            {/*渲染process内部的bar*/}
            {this.renderBoxInner()}
        </ProcessBarOut>);
        return( arr)
    }

    renderBoxInner() {
        let arr = [];
        arr.push(<ProcessBarInner
            myWidth = {this.state.outWidth * this.props.kValue}
            startIndex = {0}
            dTime = {this.props.dTime}
        />);
        return arr
    }
}

module.exports = ProcessBarContain;