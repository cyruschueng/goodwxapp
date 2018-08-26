import React from 'react';
import styles from './index.css';


const DmIcon = (props) => {
    const { type } = props;
    return <i className={`iconfont ${type}`} />;
};

export default DmIcon;
