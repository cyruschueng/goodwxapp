/**
 * Created by ichangtou on 2017/8/3.
 */
const React = require('react');
const ChooseList = require('../../component/course21/ChooseList');
const TitleBox = require('../course21/ChooseList/TitleBox');
const AbsTabBar = require('../../component/abstract/AbsTabBar');

// interface StateTypes {
// status: String,//用于确定这个是否处于选中状态
// arrayIndex: Array, tabbar每次都会push元素进去
// currentIndex: number,//当前选中的按钮
// cbfClick: Function,//按钮栏中的按钮被选中的回调
// styleDefault: Object,//tabbar样式
// }

// export default class Tabbar extends React.PureComponent<StateTypes> {
class AbsChooseList extends React.Component {
    constructor(props) {
        super(props);
        this.cbfTitleTabClick = this.cbfTitleTabClick.bind(this);
        this.cbfInnerBarClick = this.cbfInnerBarClick.bind(this);
        this.state = {
            currentIndex: -1,
            isSubShow: false,
            foldHeight: 0,
        };
    }

    render (){
        return(<div>
            {this.renderUpStreamBox()}
            {this.renderTabBarInner()}
        </div>)

        // let index = this.props.index;
        // return(<div className = {(className as any).container} style={this.props.boxStyle}>
        //     <div className = {(className as any).boxCollider}
        //          onClick={this.cbfClick.bind(this,index)}
        //         onMouseOver={this.cbfHover.bind(this,index)}>
        //         {this.props.children}
        //     </div>
        // </div>)

    }

    renderUpStreamBox() {
        let titleContent = this.props.content.content;
        return(<TitleBox
            content = {titleContent}
            index= {100}
            arrayIndex = {this.props.arrayIndex}
            status = {this.props.status}
            cbfClick = {this.cbfTitleTabClick}
        />)

    }

    calcFoldHeight() {
        if( this.state.isSubShow) {
            return
        } else {
            return 0
        }
    }


    renderTabBarInner() {
        let tabArray = this.props.content.tab;
        let count = tabArray.length;
        let renderCount = this.state.isSubShow ? count : 0;
        let perBarHeight = 42;
        let styleDefault = {
            // width: '100px',
            height: `${renderCount*perBarHeight}px`,
            // backgroundColor: 'gray',
            // border: '1px solid green',
            // height: 'auto',
            overflow: 'hidden',
            transition: 'height 0.4s'
        };
        return(
            <TabBarInner
                status = {this.props.status}

                arrayIndex = {this.props.arrayIndex}
                styleDefault = {styleDefault}
                currentIndex = {this.state.currentIndex}
                content = {tabArray}
                cbfClick = {this.cbfInnerBarClick}></TabBarInner>
        )
    }

    //接收到点击
    cbfTitleTabClick(index,arrayIndex) {
        // this.props.cbfClick(this.props.index,arrayIndex);
        this.state.isSubShow = !this.state.isSubShow
        this.setState({isSubShow: this.state.isSubShow})
        console.log(this.state.isSubShow);
    }


    //接收到子组件点击
    cbfInnerBarClick(subIndex,arrayIndex) {
        let index = this.props.index;
        //默认上报.
        this.setState({currentIndex: subIndex});
        this.props.cbfClick(index,arrayIndex);
    }
};


module.exports = AbsChooseList;








