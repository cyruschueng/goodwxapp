using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WxPayAPI
{
	public partial class NativeNotifyPage : System.Web.UI.Page
	{
        //扫描支付回调地址
		protected void Page_Load(object sender, EventArgs e)
		{
            NativeNotify nativeNatify = new NativeNotify(this);
            nativeNatify.ProcessNotify();
		}
	}
}
