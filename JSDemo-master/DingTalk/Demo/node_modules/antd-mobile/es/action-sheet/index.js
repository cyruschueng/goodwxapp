import React from 'react';
import { ActionSheetIOS, Platform } from 'react-native';
import topView from 'rn-topview';
import ActionSheetAndroidContainer from './AndroidContainer';
var ActionSheet = ActionSheetIOS;
if (Platform.OS !== 'ios') {
    var instance = void 0;
    var saveInstance = function saveInstance(i) {
        instance = i;
    };
    var onAnimationEnd = function onAnimationEnd(visible) {
        if (!visible) {
            topView.remove();
        }
    };
    ActionSheet = {
        showActionSheetWithOptions: function showActionSheetWithOptions(config, callback) {
            topView.set(React.createElement(ActionSheetAndroidContainer, { visible: true, ref: saveInstance, onAnimationEnd: onAnimationEnd, config: config, callback: callback }));
        },
        showShareActionSheetWithOptions: function showShareActionSheetWithOptions(config) {
            topView.set(React.createElement(ActionSheetAndroidContainer, { visible: true, ref: saveInstance, onAnimationEnd: onAnimationEnd, config: config, share: true }));
        },
        close: function close() {
            if (instance) {
                instance.close();
            }
        }
    };
}
export default ActionSheet;