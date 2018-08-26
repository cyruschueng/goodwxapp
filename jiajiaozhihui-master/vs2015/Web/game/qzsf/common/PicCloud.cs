using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.game.doublenovemberII.common
{
    public class PicCloud
    {
        protected static String VERSION = "2.1.4";
        protected static String QCLOUD_DOMAIN = "image.myqcloud.com";
        protected static String PROCESS_DOMAIN = "service.image.myqcloud.com";

        protected int mAppId;
        protected String mSecretId;
        protected String mSecretKey;
        protected String mBucket;

        protected int mErrno;
        protected String mError;

        protected String mMagicContect;

        public PicCloud(int appId, String secretId, String secretKey)
        {
            mAppId = appId;
            mSecretId = secretId;
            mSecretKey = secretKey;
            mErrno = 0;
            mBucket = "";
            mError = "";
            mClient = new CloudClient();
        }

    }
}