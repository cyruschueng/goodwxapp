/**
 * Created by lip on 2016/7/5.
 */
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

var Dimensions = require('../Dimensions');
var Util = require('../Util');

const COURSE_IMAGE_SRC = [
    '/image/course1.png',
    //'/image/course2.jpg',
    '/image/course3.jpg',
    '/image/course4.png'
];

/**
 * props:
 *  src: 图片路径
 */
var CourseImageComp = React.createClass({
    getInitialState() {
        let style = {
            width: Dimensions.getWindowWidth()+'px',
            height: 1134/1634*Dimensions.getWindowWidth()+'px'
        };
        return {
            showMask: false,
            style: style
        };
    },

    clickHandler() {
        let yAxis = $(this.refs.image).offset().top - Dimensions.getWindowHeight()/2;

        this.setState({
            showMask: true,
            yAxis: yAxis
        });
        scrollTo(0, 0);

        Util.lockScroll();
    },
    maskClickHandler(e) {
        e.stopPropagation();
        this.setState({
            showMask: false
        });

        Util.unlockScroll();
        scroll(0, this.state.yAxis);
    },

    render() {
        let maskHide = this.state.showMask ? 'show' : 'hide';

        return (
            <div onClick={this.clickHandler} className="course-image" ref="container">
                <div className="message_content message_image" style={{width: '11.5rem'}}>
                    <img src={"assets" + Util.getMinicId() + this.props.src} ref="image"  />
                </div>
                <div className="message_avatar"></div>

                <div className={"mask " + maskHide} ref="mask" onClick={this.maskClickHandler}>
                    <img src={"assets" + Util.getMinicId() + this.props.src} style={this.state.style} />
                </div>
            </div>
        );
    }
});

class CourseImage {
    static addCourseImage() {
        let $courseImages = $('.course-image-container');
        for( let i = 0, l = $courseImages.length; i < l; i++ ) {
            ReactDom.render(<CourseImageComp src={COURSE_IMAGE_SRC[i]} />, $courseImages[i]);
        }

    }
}
window.CourseImage = CourseImage;

module.exports = CourseImage;
