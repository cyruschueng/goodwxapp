/**
 * Created by yiran on 2017/5/5.
 */
const React = require('react');
const Dimensions = require('../../Dimensions');
const ModalMask = require('../../component/common/ModalMask');

const FixedBg = React.createClass({
    getInitialState: function() {
        // console.log('123');
        return {
            content: this.props.content,

        };
    },

    componentWillMount() {
        // console.log(Dimensions.getWidthScale());
        // console.log('22222211');
        // console.log(Dimensions);
    },


    handleClick() {
        // this.setState({liked: !this.state.liked});
        location.hash = "/select";
    },
    // style = {fullbg}
    render() {
        console.log('calc bg');
        let courseId = sessionStorage.getItem('courseId');
        let betaId = GlobalConfig.getBetaInfo().courseId.toString();
        let bgName = 'bg-ground';
        let bgStyle = {
            // backgroundImage: 'url("./assetsPlus/image/fund/join-bg.jpg")',
            width: Dimensions.getWindowWidth(),
            height: Dimensions.getWindowHeight()
        };
        switch(courseId) {
            case '0':
                bgStyle.backgroundImage = 'url("./assetsPlus/image/seven/bg_1.png")';
                break;
            case '1':
                bgStyle.backgroundImage = 'url("./assetsPlus/image/fund/join-bg.jpg")';
                break;
            case '2':
                bgStyle.backgroundColor = '#FFE69B';
                break;
            case betaId:
                bgStyle.backgroundImage = `url("./assetsPlus/image/${GlobalConfig.getCourseName()}/join-bg.jpg")`;
                break;
            default:
                bgStyle.backgroundColor = '#4498c7';
        }

        // if(sessionStorage.getItem('courseId') === '1') {
        //     return(
        //         <div className="bg-ground" style = {{backgroundImage: 'url("./assetsPlus/image/fund/join-bg.jpg")', width:Dimensions.getWindowWidth(), height: Dimensions.getWindowHeight()}}></div>
        //     )
        // }else if(sessionStorage.getItem('courseId') === '0'){
        //     return(
        //         <div className="bg-ground" style = {{backgroundImage: 'url("./assetsPlus/image/seven/bg_1.png")', width:Dimensions.getWindowWidth(), height: Dimensions.getWindowHeight()}}></div>
        //     )
        // } else if(sessionStorage.getItem('courseId') === '2'){
        //     return(
        //         <div className="bg-ground" style = {{backgroundColor: '#FFE69B', width:Dimensions.getWindowWidth(), height: Dimensions.getWindowHeight()}}></div>
        //     )
        // }else if(sessionStorage.getItem('courseId') === GlobalConfig.getBetaInfo().courseId.toString()){
        //     return(
        //         <div className="bg-ground" style = {{backgroundImage: `url("./assetsPlus/image/${GlobalConfig.getCourseName()}/join-bg.jpg")`, width:Dimensions.getWindowWidth(), height: Dimensions.getWindowHeight()}}></div>
        //     )
        // }else {
        //     return(<div className="bg-ground" style = {{backgroundColor: '#4498c7', width:Dimensions.getWindowWidth(), height: Dimensions.getWindowHeight()}}></div>
        //     )
        // }
        // return(<div>
        //     {this.renderModal()}
        // </div>)
        return(<div>
            <div className={bgName} style = {bgStyle}></div>
            <div className="modal-style">{this.renderModal()}</div>
        </div>)
    },
    renderModal() {
        let styleImg = {};
        let style = {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(35,24,21,0.5)',
            flexDirection: 'column',
        };

        console.log('renderModal');
        let arr = []
        switch (this.props.modalType) {
            // case 'null':
            //     break;
            case 'getExp':
                styleImg = {
                    width: '251px',
                    height: '146px',
                };
                arr.push(<ModalMask cbfClick = {this.props.cbfClick.bind(this,this.props.modalType)} isShow = {true}>
                    <div style = {style}>
                        {/*<span>{GlobalExp.getExpModalInfo().value}</span>*/}
                        {/*<span>{GlobalExp.getExpModalInfo().txt}</span>*/}
                        <div>
                            <img style = {styleImg} src={`./assetsPlus/image/exp_up.png`}/>
                        </div>
                    </div>
                    </ModalMask>);
                break;
            case 'levelUp':
                style.justifyContent = 'flex-start';
                arr.push(<ModalMask cbfClick = {this.props.cbfClick.bind(this,this.props.modalType)} isShow = {true}>
                    <div className="level-up-info" style = {style}>
                        <div className="head-image">
                            <div className="out-div">
                                <img className="image-font" src={`./assetsPlus/image/exp_level_up_font.png`}/>
                                <img className="inner-image" src={GlobalExp.getExpModalInfo().headImage}/>
                                <img className="out-image" src={`./assetsPlus/image/exp_level_up.png`}/>
                            </div>
                        </div>
                        <div className="txt-line" >
                            <p>恭喜你升到了</p>
                            <span className="level-icon">Lv{GlobalExp.getExpModalInfo().level}</span>
                        </div>
                        <img className="sure-button" src={`./assetsPlus/image/exp_modal_yes.png`}/>
                    </div>
                </ModalMask>);
                break;
            default:
                break;
        }
        return arr;

    }
});

module.exports = FixedBg;