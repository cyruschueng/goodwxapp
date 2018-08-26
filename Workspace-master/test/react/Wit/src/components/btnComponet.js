import React from 'react'

class BtnComponent extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			btnName: props.btnName
		}
		this.handleClick = this.handleClick.bind(this);
	}
    render() {
        return (
        	<div className="btnstyle">
		        <span className="enter_btn" onClick={this.handleClick}>{this.state.btnName}</span>
		  	</div> 
        );
    }
    handleClick(){
    	console.log("in")
    }
}

BtnComponent.propTypes = {
    btnName: React.PropTypes.string
};
BtnComponent.defaultProps = {
    btnName: ""
};

export default BtnComponent