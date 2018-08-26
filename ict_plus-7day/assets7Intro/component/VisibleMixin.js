/**
 * Created by lip on 2016/7/27.
 */

var VisibleMixin = {
    getInitialState() {
        return {
        };
    },

    show() {
        this.setState({
            display: true
        });
    },

    hide() {
        this.setState({
            display: false
        });
    },

    shouldComponentUpdate(nextProps, nextState) {
        for( let p in nextProps ) {
            if( nextProps[p] != this.props[p] ){
                return true;
            }
        }

        for( let n in nextState ) {
            if( nextState[n] != this.state[n] ){
                return true;
            }
        }

        return false;
    }


};

module.exports = VisibleMixin;