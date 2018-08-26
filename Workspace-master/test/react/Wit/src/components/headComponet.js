import React from 'react'

class HeadComponent extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			title: props.title
		}
		this.goBack = this.goBack.bind(this);
	}
    render() {
        return (
        	<div id="headComponet">
				<div className="back" onClick={this.goBack}></div>
				<div className="title">{this.state.title}</div>
				<div className="menu"></div>
			</div>
        );
    }
    goBack() {
    	history.back();
    }
}

HeadComponent.propTypes = {
    title: React.PropTypes.string
};
HeadComponent.defaultProps = {
    title: ""
};

export default HeadComponent