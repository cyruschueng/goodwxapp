import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { View, Text, Image,
// CameraRoll,
TouchableWithoutFeedback } from 'react-native';
import imagePickerStyles from './style/';
import ImageRoll from './ImageRoll';

var ImagePicker = function (_React$Component) {
    _inherits(ImagePicker, _React$Component);

    function ImagePicker(props) {
        _classCallCheck(this, ImagePicker);

        var _this = _possibleConstructorReturn(this, (ImagePicker.__proto__ || Object.getPrototypeOf(ImagePicker)).call(this, props));

        _this.onPressIn = function () {
            var styles = _this.props.styles;
            _this.plusWrap.setNativeProps({
                style: [styles.item, styles.size, styles.plusWrapHighlight]
            });
        };
        _this.onPressOut = function () {
            var styles = _this.props.styles;
            _this.plusWrap.setNativeProps({
                style: [styles.item, styles.size, styles.plusWrapNormal]
            });
        };
        // TODO 先统一采用 CameraRoll 形式，注释代码勿删
        // openPickerDialog(type) {
        //   ImagePickerIOS[type]({}, (imageUrl) => {
        //     // 由于性能问题，不能在这里转换 base64， 需要利用 native 模块;
        //     // 这里回调 assets-library, 交给业务自己实现转换 base64
        //     // https://github.com/facebook/react-native/issues/201
        //     console.log(imageUrl)
        //     this.addImage({url: imageUrl});
        //   }, error => {
        //     if (error) {
        //       console.warn(error.message || `{type} error`);
        //       return;
        //     }
        //   });
        // }
        _this.showPicker = function () {
            // if (Platform.OS === "ios") {
            //   ImagePickerIOS.canUseCamera(canUse => {
            //     if (canUse) {
            //       ActionSheetIOS.showActionSheetWithOptions({
            //         options: ['Take Photo', 'Photo Libray', 'Cancel'],
            //         cancelButtonIndex: 2,
            //       }, (btnIndex) => {
            //         if (btnIndex == 0) {
            //           this.openPickerDialog('openCameraDialog');
            //           ImagePickerIOS.openCameraDialog({})
            //         } else if (btnIndex == 1) {
            //           this.openPickerDialog('openSelectDialog');
            //         }
            //       });
            //     } else {
            //       this.openPickerDialog('openSelectDialog');
            //     }
            //   });
            // } else {
            _this.setState({
                visible: true
            });
            // }
        };
        _this.hideImageRoll = function () {
            _this.setState({
                visible: false
            });
        };
        _this.state = {
            visible: false
        };
        return _this;
    }

    _createClass(ImagePicker, [{
        key: 'addImage',
        value: function addImage(imageObj) {
            if (!imageObj.url) {
                imageObj.url = imageObj.uri;
                delete imageObj.uri;
            }
            var _props$files = this.props.files,
                files = _props$files === undefined ? [] : _props$files;

            var newImages = files.concat(imageObj);
            if (this.props.onChange) {
                this.props.onChange(newImages, 'add');
            }
        }
    }, {
        key: 'removeImage',
        value: function removeImage(idx) {
            var newImages = [];
            var _props$files2 = this.props.files,
                files = _props$files2 === undefined ? [] : _props$files2;

            files.forEach(function (image, index) {
                if (index !== idx) {
                    newImages.push(image);
                }
            });
            if (this.props.onChange) {
                this.props.onChange(newImages, 'remove', idx);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props$files3 = this.props.files,
                files = _props$files3 === undefined ? [] : _props$files3;

            var styles = this.props.styles;
            var filesView = files.map(function (item, index) {
                return React.createElement(
                    View,
                    { key: index, style: [styles.item, styles.size] },
                    React.createElement(Image, { source: { uri: item.url }, style: [styles.size, styles.image] }),
                    React.createElement(
                        TouchableWithoutFeedback,
                        { onPress: function onPress() {
                                return _this2.removeImage(index);
                            } },
                        React.createElement(
                            View,
                            { style: styles.closeWrap },
                            React.createElement(
                                Text,
                                { style: styles.closeText },
                                '\xD7'
                            )
                        )
                    )
                );
            });
            var imageRollEl = React.createElement(ImageRoll, { onCancel: this.hideImageRoll, onSelected: function onSelected(imgObj) {
                    return _this2.addImage(imgObj);
                } });
            return React.createElement(
                View,
                { style: styles.container },
                filesView,
                React.createElement(
                    TouchableWithoutFeedback,
                    { onPress: this.showPicker, onPressIn: this.onPressIn, onPressOut: this.onPressOut },
                    React.createElement(
                        View,
                        { ref: function ref(conponent) {
                                return _this2.plusWrap = conponent;
                            }, style: [styles.item, styles.size, styles.plusWrap, styles.plusWrapNormal] },
                        React.createElement(
                            Text,
                            { style: [styles.plusText] },
                            '+'
                        )
                    )
                ),
                this.state.visible ? imageRollEl : null
            );
        }
    }]);

    return ImagePicker;
}(React.Component);

export default ImagePicker;

ImagePicker.defaultProps = {
    styles: imagePickerStyles,
    onChange: function onChange() {},

    files: []
};