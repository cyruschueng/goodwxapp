using System;
using System.Collections.Generic;
using System.Text;

namespace SfSoft.Common
{
    /// <summary>
    /// 系统配置表
    /// </summary>
    [Serializable]
    public class sys_ConfigDataTable
    {
        #region "Private Variables"
        private int _C_UpImgHeight = 120;
        private int _C_UpImgWidth = 180;
        private string _C_UploadPath = "/emc/upload/";
        private int _C_UploadSizeKb = 40480;
        private string _C_UploadFileExt ="asf,avi,bmp,csv,doc,docx,fla,flv,gif,gz,gzip,jpeg,jpg,mid,mov,mp3,mp4,mpc,mpeg,mpg,ods,odt,pdf,png,ppt,pptx,pxd,qt,ram,rar,rm,rmi,rmvb,rtf,sdc,sitd,swf,sxc,sxw,tar,tgz,tif,tiff,txt,vsd,wav,wma,wmv,xls,xlsx,xml,zip"  ;// "zip,rar,doc,docx,jpeg,jpg,png,gif,bmp,swf,xls,xlsx,ppt,pptx,pdf,pps,ppsx,txt,html,htm,";
        private bool _C_RequestLog = false;
        private string _C_IPLookUrl = "http://";
        private int _C_LoginErrorDisableMinute = 60;
        private int _C_LoginErrorMaxNum = 5;
        #endregion

        #region "Public Variables"

        /// <summary>
        /// 同一IP同一帐号登入出错,禁止登入时间(默认30)分,设定此值需要重启动应用程序
        /// </summary>
        public int C_LoginErrorDisableMinute
        {
            get
            {
                return _C_LoginErrorDisableMinute;
            }
            set
            {
                _C_LoginErrorDisableMinute = value;
            }
        }
        /// <summary>
        /// 同一IP同一帐号登入允许出错次数默认为5
        /// </summary>
        public int C_LoginErrorMaxNum
        {
            get
            {
                return _C_LoginErrorMaxNum;
            }
            set
            {
                _C_LoginErrorMaxNum = value;
            }
        }

        /// <summary>
        /// 上传文件扩展名 多个以,号分开
        /// </summary>
        public string C_UploadFileExt
        {
            get
            {
                return _C_UploadFileExt;
            }
            set
            {
                _C_UploadFileExt = value;
            }
        }

        /// <summary>
        /// 上传文件大小(Kb为单位)
        /// </summary>
        public int C_UploadSizeKb
        {
            get
            {
                return _C_UploadSizeKb;
            }
            set
            {
                _C_UploadSizeKb = value;
            }
        }

        
        /// <summary>
        /// 上传文件路径
        /// </summary>
        public string C_UploadPath
        {
            get {
                return _C_UploadPath;
            }
            set {
                _C_UploadPath = value;
            }
        }
        

        /// <summary>
        /// 上传图片缩图高度 默认120
        /// </summary>
        public int C_UpImgHeight
        {
            get
            {
                return _C_UpImgHeight;
            }
            set
            {
                _C_UpImgHeight = value;
            }
        }

        /// <summary>
        /// 上传图片缩图宽度 默认 180
        /// </summary>
        public int C_UpImgWidth
        {
            get
            {
                return _C_UpImgWidth;
            }
            set
            {
                _C_UpImgWidth = value;
            }
        }

        /// <summary>
        /// 是否启用户访问日志 默认为false
        /// </summary>
        public bool C_RequestLog
        {
            get
            {
                return _C_RequestLog;
            }
            set
            {
                _C_RequestLog = value;
            }
        }

        /// <summary>
        /// IP地址查询链接
        /// </summary>
        public string C_IPLookUrl
        {
            get
            {
                return _C_IPLookUrl;
            }
            set
            {
                _C_IPLookUrl = value;
            }
        }
        #endregion
    }
}
