using System;
using System.Collections.Generic;
using System.Text;

namespace SfSoft.SfEmc
{
    /// <summary>
    /// 系统配置表
    /// </summary>
    [Serializable]
    public class emc_configdata
    {
        private string _productNo = "{C5610424-044C-4E0D-94BB-8CD895410D44}";
        private string _version = "V5.5";

        /// <summary>
        /// 产品编号
        /// </summary>
        public string ProductNo
        {
            get
            {
                return _productNo;
            }
        }
        /// <summary>
        /// 版本号
        /// </summary>
        public string Version
        {
            get
            {
                return _version;
            }
        }
    }
}
