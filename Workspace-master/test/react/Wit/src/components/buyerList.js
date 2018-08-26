import React from 'react'
import BtnComponent from './btnComponet'
import HeadComponent from './headComponet'

class buyerList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: props.initValue || 'placeholder'
		}
	}
    render() {
        return (
            <div>
           		<HeadComponent title="订单列表 卖家" />	
            </div>
        );
    }
}

buyerList.propTypes = {
    initValue: React.PropTypes.string
};
buyerList.defaultProps = {
    initValue: ''
};

export default buyerList