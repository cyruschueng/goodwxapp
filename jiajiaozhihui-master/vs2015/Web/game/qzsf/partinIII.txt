using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Senparc.Weixin.MP.Helpers;
using ShenerWeiXin;
using Senparc.Weixin.MP.CommonAPIs;
using SfSoft.Common;
using System.Net;
using System.ComponentModel;
using System.Data;

namespace SfSoft.web.game.qzsf
{
    public partial class partinIII : System.Web.UI.Page
    {
        public Link HTMLLink = new Link();
        public string HTMLMenuName = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack)
            {
                try
                {
                    /*
                    #region 注册js_sdk
                    ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI jsApi = new ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI(this.Page);

                    jsApi.SetRightList(ShenerWeiXin.WxApi.WxJs.EnumJsRight.hideOptionMenu, ShenerWeiXin.WxApi.WxJs.EnumJsRight.chooseImage, ShenerWeiXin.WxApi.WxJs.EnumJsRight.previewImage, ShenerWeiXin.WxApi.WxJs.EnumJsRight.uploadImage);
                    jsApi.RegisterWeiXinJsApi();
                    #endregion
                    */
                    if (Session["myopenid"] != null)
                    {
                        hfOpenID.Value = Session["myopenid"].ToString();
                        hfGoodsID.Value = Request.QueryString["id"];
                        InitLink();
                        hfInfoUrl.Value = HTMLLink.MyInfoLink;
                        GetRight(hfOpenID.Value);
                    }
                    else
                    {
                        Response.Redirect("error.html");
                    }
                }
                catch (Exception ex) {
                    if (ex.GetType().ToString() != "System.Threading.ThreadAbortException")
                    {
                        WXHelper.WriteNode("(" + Request.RawUrl + ")" + ex.Message, "qzsf.txt");
                        Response.Redirect("error.html");
                    }
                }
            }
        }
        /// <summary>
        /// 初始链接
        /// </summary>
        private void InitLink()
        {
            TimeSpan ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
            string t = Convert.ToInt64(ts.TotalSeconds).ToString();  
            //书法圈
            HTMLLink.CommunityLink = "/game/qzsf/start/index.aspx?id=76";
            //我的
            HTMLLink.MyInfoLink = "/game/qzsf/info.aspx?id=76";
            if (Helper.IsMember(hfOpenID.Value))
            {
                //邀请
                HTMLLink.PartinLink = "/game/qzsf/start/invite.aspx";
                HTMLMenuName = "邀请朋友";
            }
            else
            {
                //参与
                HTMLLink.PartinLink = "/game/qzsf/start/order.aspx";
                HTMLMenuName = "参与活动";
            }
            //上传作品
            HTMLLink.UpLoadLink = "/game/qzsf/partinIII.aspx?id=76&t="+t;
            //异常修复
            HTMLLink.RepairLink = "/game/qzsf/repair.aspx?id=76";
        }
        /// <summary>
        /// 是否有权限上传图片
        /// 只有提交订交，并发货的才可以有权限
        /// </summary>
        private void GetRight(string openid)
        {
            BLL.WX_Doublenovember_Children bllChildren = new BLL.WX_Doublenovember_Children();
            Model.WX_Doublenovember_Children modelChildren = bllChildren.GetModel(openid);
            if (modelChildren != null && modelChildren.Sex != "")
            {
                prompt.InnerHtml = "<a id='chooseImage' href='javascript:void(0)' class='alert-link'><span class='btn btn-success glyphicon glyphicon-level-up'>选择作品</span></a>";
            }
            else
            {
                prompt.InnerHtml = "<strong>提示：</strong>请先完善你的资料,再上传你的作品<br />"
                    + "<a href='/game/qzsf/additioninfo.aspx?id=76' class='alert-link'><span class='btn btn-success glyphicon glyphicon-level-up'>完善资料</span></a>";
            }
        }
    }
}
