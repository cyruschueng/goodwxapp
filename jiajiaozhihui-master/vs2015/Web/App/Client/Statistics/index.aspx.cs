using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.App.Client.Statistics
{
    public partial class index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Gxdr();
            QA();
            Zxs();
            Qzsf();
            Read();
        }
        /// <summary>
        /// 诵读社
        /// </summary>
        private void Read()
        {
            BLL.WX_Read_User bll = new BLL.WX_Read_User();
            ReadPlayerNumber=bll.GetRecordCount("");
        }
        /// <summary>
        /// 亲子书法
        /// </summary>
        private void Qzsf()
        {
            BLL.WX_Items_User bll = new BLL.WX_Items_User();
            QZSFPlayerNumber=bll.GetRecordCount("ItemsId=1");
        }
        /// <summary>
        /// 知行社
        /// </summary>
        private void Zxs()
        {
            BLL.WX_ZXS_Players bll = new BLL.WX_ZXS_Players();
            ZxsPlayerNumber=bll.GetRecordCount("");
        }
        /// <summary>
        /// 国学达人数
        /// </summary>
        private void Gxdr()
        {
            BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            GxdrPlayerNumber=bll.GetRecordCount("");
        }
        /// <summary>
        /// 家教问题参与人数
        /// </summary>
        private void QA()
        {
            BLL.WX_QA_User bll = new BLL.WX_QA_User();
            QaPlayerNumber = bll.GetRecordCount("");
        }
        public int GxdrPlayerNumber { get; set; }

        public int QaPlayerNumber { get; set; }

        public int ZxsPlayerNumber { get; set; }

        public int QZSFPlayerNumber { get; set; }

        public int ReadPlayerNumber { get; set; }
    }
}
