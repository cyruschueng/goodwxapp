import { StyleSheet } from 'react-native';
import variables from '../../style/themes/default';
export default StyleSheet.create({
    container: {
        zIndex: variables.popup_zindex
    },
    wrap: {
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    wrapTop: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
});