using System;
using System.Collections.Generic;
using System.Text;

namespace SfSoft.Common
{
    /// <summary>
    /// 按钮类型
    /// </summary>
    [Serializable]
    public class sys_NavigationUrl
    {
        #region 私有字段
        private string _btnText;            // 按妞的文字
        private string _btnUrl;             // 按钮的地址
        private string _btnHint;            // 按钮的提示信息
        private UrlType _btnType = UrlType.Href;
        private bool _btnDefaultSelect = false;
        #endregion

        #region 公开属性
        /// <summary>
        /// 按钮的文字
        /// </summary>
        public string btnText
        {
            set { _btnText = value; }
            get { return _btnText; }
        }

        /// <summary>
        /// 按钮的字符
        /// </summary>
        public string btnUrl
        {
            set { _btnUrl = value; }
            get { return _btnUrl; }
        }

        /// <summary>
        /// 按钮的提示信息
        /// </summary>
        public string btnHint
        {
            set { _btnHint = value; }
            get { return _btnHint; }
        }

        /// <summary>
        /// 按链链接类型
        /// </summary>
        public UrlType btnType
        {
            get
            {
                return _btnType;
            }
            set
            {
                _btnType = value;
            }
        }

        /// <summary>
        /// 是否默认选中当前铵钮
        /// </summary>
        public bool btnDefaultSelect
        {
            get
            {
                return _btnDefaultSelect;
            }
            set
            {
                _btnDefaultSelect = value;
            }
        }
        #endregion

        #region "构造函数"
        /// <summary>
        /// 构造函数
        /// </summary>
        public sys_NavigationUrl()
            : this(string.Empty, string.Empty, string.Empty, UrlType.Href, false)
        {

        }

        /// <summary>
        /// 重载构造函数
        /// </summary>
        /// <param name="bText">按妞的文字</param>
        /// <param name="bUrl">按钮的javascript/vbscript的Onclick字符</param>
        /// <param name="bHint">按钮提示信息</param>
        /// <param name="bType">按钮链接类型</param>
        /// <param name="bDefautl">是否默认选中当前按钮</param>
        public sys_NavigationUrl(string bText, string bUrl, string bHint, UrlType bType, bool bDefautl)
        {
            _btnText = bText;
            _btnUrl = bUrl;
            _btnHint = bHint;
            _btnType = bType;
            _btnDefaultSelect = bDefautl;
        }
        #endregion
    }

    /// <summary>
    /// 按钮链接类型
    /// </summary>
    public enum UrlType : byte
    {
        /// <summary>
        /// 超级链接
        /// </summary>
        Href,
        /// <summary>
        /// JavaScript 脚本
        /// </summary>
        JavaScript,
        /// <summary>
        /// VBScript 脚本
        /// </summary>
        VBScript
    }
}
