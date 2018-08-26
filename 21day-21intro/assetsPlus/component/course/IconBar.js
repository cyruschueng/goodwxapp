/**
 * Created by yiran on 2017/5/5.
 */
const React = require('react');

const IconBar = React.createClass({

    getInitialState: function() {
        return {
            // finishElement: this.props.finishElement,
            // totalElement: this.props.totalElement
        };
    },


    render() {
        return(
            <div style={this.props.index === 1 ? {marginLeft: '5',marginRight: '5'} : {}}
                 className={ this.props.isView ? 'icon-bar-on' : 'icon-bar-off'}
                onClick={this.cbfCheckBar}>
                {this.renderImg()}
                {this.renderTitle()}
            </div>
        )
    },

    cbfCheckBar() {
        this.props.cbfCheckBar(this.props.index);
    },

    renderImg() {
        let type = 0;
      if (this.props.isView) {
          type = 1;
      }  else {
          type = 0;
      }
        return(<img className="icon-img" src={this.props.iconImg[type]}/>)
    },

    renderTitle() {
        return(<p className = "title">{this.props.iconTitle}</p>)
    },

    renderTotalElement() {
        let arr = [];
        for (let i = 0; i < this.state.totalElement; i++) {
            //如果当前渲染的
            if ( i < this.props.finishElement) {
                arr.push(<div className="process-bar-have" index = {i}>111</div>)
            } else {
                arr.push(<div className="process-bar" index = {i}>222</div>)
            }
        }
        return arr;
    },


});

module.exports = IconBar;
