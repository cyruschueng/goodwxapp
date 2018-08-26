import React from 'react';
import styles from './index.less';

/* eslint-disable */
const WxLogin = ({ appid, href, redirectUri, state = new Date().getTime(), scope = 'snsapi_login', style = 'black', width = '152px', height = '152px' }) => {
  const loginTtype = 'jssdk';
  const selfRedirect = 'default';
  const iframeUrl = `http://open.weixin.qq.com/connect/qrconnect?appid=${appid}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}&login_type=${loginTtype}&self_redirect=${selfRedirect}&style=${style}&href=${href}`
  console.log(iframeUrl)
  return (
    <div className={styles.normal}>
      <iframe
        title="iframe"
        src={iframeUrl}
        frameBorder="0"
        sandbox="allow-scripts allow-same-origin allow-top-navigation"
        scrolling="no"
        width={width}
        height={height}
      />
    </div>
  );
}
export default WxLogin;
