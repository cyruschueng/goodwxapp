import React from 'react'
import BtnComponent from './btnComponet'
class IndexPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: props.initValue || 'placeholder'
		}
		// ES6 类中函数必须手动绑定
        this.handleClick = this.handleClick.bind(this);
	}
    handleClick(event) {
        this.setState({
            text: "yangyhtest"
        });
    }
    render() {
        return (
            <div>
           		<div className="page-index">
					<div id="header">
						<div className="title">农产品流通智慧合约</div>
						<div className="menu"></div>
					</div>
					<div id="logo">
						<div className="logoImg"></div>
					</div>
					<div className="buyerEnter">
						<BtnComponent btnName="我是买家"/>
					</div>
					<div className="sellerEnter"> 
						<BtnComponent btnName="我是卖家"/>
					</div>
				</div>
            </div>
        );
    }
}

IndexPage.propTypes = {
    initValue: React.PropTypes.string
};
IndexPage.defaultProps = {
    initValue: ''
};

export default IndexPage