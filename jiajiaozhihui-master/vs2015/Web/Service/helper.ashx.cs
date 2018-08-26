using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using SfSoft.SfEmc;
using SfSoft.web.common;
using SfSoft.DBUtility;
using ShenerWeiXin;
using ShenerWeiXin.User;
using ShenerWeiXin.Share;

namespace SfSoft.web.Service
{
    /// <summary>
    /// helper 的摘要说明
    /// </summary>
    public class helper : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string result = "";
            string method="";
            method=context.Request["method"].ToString();
            context.Response.ContentType = "text/plain";

            switch (method) { 
                case "area":
                    result = GetArea();
                    break;
                case "pgo":
                    result = SavePublicGoodsOrder(context);
                    break;
                case "modifyhomecard":
                    result=ModifyHomeCard(context);
                    break;
                case "signinbyday":
                    result = SetIntegralSignIn(context);
                    break;
                case "issigninbyday":
                    result = IsSigninByDay(context);
                    break;
                case "exchange":
                    result = Exchange(context);
                    break;
                case "coursesorder":
                    result = AddCoursesOrder(context);
                    break;
                case "coursepage":
                    result = CoursePage(context);
                    break;
                case "share":
                    result = Share(context);
                    break;
                case "attentiongift":
                    result = AttentionGift(context);
                    break;
                case "getgift":
                    result = GetGift(context);
                    break;
            }
            context.Response.Write(result);
        }
        /// <summary>
        /// 提交公益品定单
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string SavePublicGoodsOrder(HttpContext context)
        {
            string result = "";

            string openid = "";
            if (context.Request["openid"] != null) {
                openid = context.Request["openid"].ToString();
            }
            string goodsid = "";
            if (context.Request["goodsid"] != null)
            {
                goodsid = context.Request["goodsid"].ToString();
            }
            string name = "";
            if (context.Request["txtName"] != null)
            {
                name = context.Request["txtName"].ToString();
            }
            string address = "";
            if (context.Request["txtAddress"] != null)
            {
                address = context.Request["txtAddress"].ToString();
            }
            string telephone = "";
            if (context.Request["txtPhone"] != null)
            {
                telephone = context.Request["txtPhone"].ToString();
            }
            string province = "";
            if (context.Request["ddlProvince"] != null)
            {
                province = context.Request["ddlProvince"].ToString();
            }
            string city = "";
            if (context.Request["ddlCity"] != null)
            {
                city = context.Request["ddlCity"].ToString();
            }
            string remark = "";
            if (context.Request["txtRemark"] != null)
            {
                remark = context.Request["txtRemark"].ToString();
            }
            string mode = "";
            if (context.Request["mode"] != null)
            {
                mode = context.Request["mode"].ToString();
            }
            string friendid = "";
            if (context.Request["friendid"] != null)
            {
                friendid = context.Request["friendid"].ToString();
            }

            Model.WX_PublicOrder model = new Model.WX_PublicOrder();
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            if (bll.Exists(telephone, goodsid)) {
                return "-1";
            }

            ShareContent share = new ShareContent();
            if (mode == "share" || mode == "link")
            {
                model = share.SetGoodsOrderModel(friendid, goodsid, name, address, telephone, province, city, "1","1","0");
                bll.Add(model);
            }
            else {
                model = share.SetGoodsOrderModel(openid, goodsid, name, address, telephone, province, city, "1","1","0");
                bll.Add(model);

                //更新家园卡
                WXHelper helper = new WXHelper();
                helper.UpdateHomeCard(openid, name, telephone, province, city, address);

                BLL.WX_PublicGood bllGood = new BLL.WX_PublicGood();
                Model.WX_PublicGood modelGood = bllGood.GetModel(int.Parse(goodsid));

                //设置积份
                int score = 0;
                if (modelGood.Score != null && modelGood.Score.ToString() != "")
                {
                    score = (int)modelGood.Score;
                }
                Follower follower = new Follower();
                follower.ExpenseAndTakeScore(openid, "publicorder", score);
            }
            return result;
        }
        /// <summary>
        /// 获取省市
        /// </summary>
        /// <returns></returns>
        private string GetArea()
        {
            string result = "";
            BLL.Pub_Areas bll = new BLL.Pub_Areas();
            DataSet ds = bll.GetAllList();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                result = FormatToJson.ToJson(ds);
            }
            return result;
        }
        /// <summary>
        /// 修改家园卡
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string ModifyHomeCard(HttpContext context)
        {
            string result = "";
            string userid = "";
            if (context.Request["userid"] != null)
            {
                userid = context.Request["userid"].ToString();
            }
            string name = "";
            if (context.Request["name"] != null)
            {
                name = context.Request["name"].ToString();
            }
            string birthday = "";
            if (context.Request["birthday"] != null)
            {
                birthday = context.Request["birthday"].ToString();
            }
            string telephone = "";
            if (context.Request["telephone"] != null)
            {
                telephone = context.Request["telephone"].ToString();
            }
            string address = "";
            if (context.Request["address"] != null)
            {
                address = context.Request["address"].ToString();
            }
            string ddlProvince = "";
            if (context.Request["ddlProvince"] != null)
            {
                ddlProvince = context.Request["ddlProvince"].ToString();
            }
            string ddlCity = "";
            if (context.Request["ddlCity"] != null)
            {
                ddlCity = context.Request["ddlCity"].ToString();
            }

            if (userid == "") {
                result = "-1";
            }

            BLL.WX_HomeCard bll = new BLL.WX_HomeCard();
            Model.WX_HomeCard model = bll.GetModel(userid);
            model.Address = address;
            if (birthday != "")
            {
                model.Birthday = DateTime.Parse(birthday);
            }
            model.City = ddlCity;
            model.ModifyDate = DateTime.Now;
            model.name = name;
            model.Province = ddlProvince;
            model.Telephone = telephone;
            Follower follower = new Follower();
            if (follower.IsCompleteRegister(model.UserID) == false)
            {
                follower.TakeScore(userid, "completeRegister"); //完善资料加积分
            }

            bool t= bll.Update(model);
            if (t == false)
            {
                result = "0";
            }
            else {
                
                result = "1";
            }
            return result;
        }
        /// <summary>
        /// 每日签到赠分
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string SetIntegralSignIn(HttpContext context)
        {
            string result = "";
            if (context.Request["openid"] != null) {
                string openid=context.Request["openid"].ToString();
                Follower follower = new Follower();
                if (IsSigninByDay(context) == "false")
                {
                    follower.TakeScore(openid, "signIn");
                    result = follower.GetSurplusScore(openid).ToString();
                }
                else {
                    result = follower.GetSurplusScore(openid).ToString();
                }
            }
            return result;
        }
        /// <summary>
        /// 每日是否签到
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string IsSigninByDay(HttpContext context)
        {
            if (context.Request["openid"] != null) {
                string openid = context.Request["openid"].ToString();
                Follower follower = new Follower();
                if (follower.IsSigninByDay(openid) == true)
                {
                    return "true";
                }
                else {
                    return "false";
                }
            }
            return "false";
        }
        /// <summary>
        /// 积分兑换
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string Exchange(HttpContext context)
        {
            string result = "";
            string openid = "";
            if (context.Request["openid"] != null)
            {
                openid = context.Request["openid"].ToString();
            }
            string goodsid = "";
            if (context.Request["goodsid"] != null)
            {
                goodsid = context.Request["goodsid"].ToString();
            }
            string name = "";
            if (context.Request["txtName"] != null)
            {
                name = context.Request["txtName"].ToString();
            }
            string address = "";
            if (context.Request["txtAddress"] != null)
            {
                address = context.Request["txtAddress"].ToString();
            }
            string telephone = "";
            if (context.Request["txtPhone"] != null)
            {
                telephone = context.Request["txtPhone"].ToString();
            }
            string province = "";
            if (context.Request["ddlProvince"] != null)
            {
                province = context.Request["ddlProvince"].ToString();
            }
            string city = "";
            if (context.Request["ddlCity"] != null)
            {
                city = context.Request["ddlCity"].ToString();
            }
            string remark = "";
            if (context.Request["txtRemark"] != null)
            {
                remark = context.Request["txtRemark"].ToString();
            }
            Model.WX_PublicOrder model = new Model.WX_PublicOrder();
            model.Address = address;
            model.City = city;
            model.GoodID = int.Parse(goodsid);
            model.Name = name;
            model.OpenID = openid;
            model.OrderDate = DateTime.Now;
            model.Province = province;
            model.Remark = remark;
            model.TelePhone = telephone;
            model.GoodsType = -1;
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            int row = bll.Add(model);
            if (row == 0)
            {
                result = "0";
            }
            BLL.WX_PublicGood bllGood = new BLL.WX_PublicGood();
            Model.WX_PublicGood modelGood = bllGood.GetModel(int.Parse(goodsid));
            modelGood.Number = modelGood.Number - 1;
            bool t = bllGood.Update(modelGood);
            if (t == false)
            {
                result = "-1";
            }
            if (result == "")
            {
                WXHelper helper = new WXHelper();

                int score = 0;
                if (modelGood.Score != null && modelGood.Score.ToString() != "")
                {
                    score = (int)modelGood.Score;
                }
                //设置积份
                Follower follower = new Follower();
                follower.ExpenseScore(openid, "exchange", score);
            }
            return result;
        }
        /// <summary>
        /// 课程报名人员
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string AddCoursesOrder(HttpContext context)
        {
            string result = "true";
            string coursesid = "";
            if (context.Request["coursesid"] != null) {
                coursesid = context.Request["coursesid"].ToString();
            }
            string openid = "";
            if (context.Request["openid"] != null)
            {
                openid = context.Request["openid"].ToString();
            }
            string telephone = "";
            if (context.Request["telephone"] != null) {
                telephone = context.Request["telephone"].ToString();
            }
            string entrant = "";
            if (context.Request["entrant"] != null)
            {
                entrant = context.Request["entrant"].ToString();
            }
            string mode = "";
            if (context.Request["mode"] != null)
            {
                mode = context.Request["mode"].ToString();
            }
            string friendid = "";
            if (context.Request["friendid"] != null)
            {
                friendid = context.Request["friendid"].ToString();
            }
            string nickname="";
            if (context.Request["nickname"] != null)
            {
                nickname = context.Request["nickname"].ToString();
            }

            Model.WX_CoursOrder modelOrder = new Model.WX_CoursOrder();
            BLL.WX_CoursOrder bllOrder = new BLL.WX_CoursOrder();

            ShareContent share = new ShareContent();
            if (mode == "share" || mode == "link")
            {
                //新境报名名单
                 modelOrder= share.SetCourseOrderModel(friendid, coursesid, entrant, nickname, telephone);
                 bllOrder.Add(modelOrder);
            }
            else {
                //新境报名名单
                Follower follower = new Follower();
                nickname = follower.NickName(openid);
                modelOrder = share.SetCourseOrderModel(openid, coursesid, entrant, nickname, telephone);
                bllOrder.Add(modelOrder);

                //更新家园卡
                WXHelper helper = new WXHelper();
                helper.UpdateHomeCard(openid, entrant, telephone);

                //报名加积分
                follower.TakeScore(openid, "course");

            }
            return result;
        }
        /// <summary>
        /// 课程报名 人员分页显示
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string CoursePage(HttpContext context)
        {
            string result = "{}";
            string coursesid = "";
            if (context.Request["coursesid"] != null)
            {

                coursesid = context.Request["coursesid"].ToString();
            }
            string startindex="";
            if(context.Request["startindex"]!=null){
                startindex=context.Request["startindex"].ToString();
            }
            string endindex="";
            if(context.Request["endindex"]!=null){
                endindex=context.Request["endindex"].ToString();
            }
            int count = 0;
            BLL.WX_CoursOrder bll = new BLL.WX_CoursOrder();
             DataSet ds=bll.GetList("coursid=" + coursesid);
             if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                 count = ds.Tables[0].Rows.Count;
             }
            ds = bll.GetListByPage("coursid=" + coursesid, "id", int.Parse(startindex), int.Parse(endindex));

            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                result = FormatToJson.ToJson(ds);
                string json = ",\"count\":\"" + count + "\"";
                int index=result.LastIndexOf('}');
                result = result.Insert(index, json);
            }
            return result;
        }
        /// <summary>
        /// 分享
        /// 如果mode=share 给分享者加积分
        /// 如果mode=link 不加积分
        /// 如果mode=view 不加积分
        /// </summary>
        /// <param name="context"></param>
        /// <returns>0:已超过分享的次数 1:分享成功</returns>
        private string Share(HttpContext context)
        {
            string openid = "";
            if (context.Request["openid"] != "") {
                openid = context.Request["openid"].ToString();
            }
            string articleType = "";
            if (context.Request["articletype"] != "")
            {
                articleType = context.Request["articletype"].ToString();
            }
            string articleid = "";
            if (context.Request["articleid"] != "")
            {
                articleid = context.Request["articleid"].ToString();
            }
            string integralcode = "";
            if (context.Request["integralcode"] != "")
            {
                integralcode = context.Request["integralcode"].ToString();
            }
            
            WXHelper helper = new WXHelper();
            bool b = helper.IsShare(openid,  int.Parse(articleType), int.Parse(articleid), integralcode);
            if (b == false) {
                return "0";//已超过分享的次数
            }
            //新增分享数据
            Model.WX_Share model = new Model.WX_Share();
            model.ArticleID =int.Parse(articleid);
            model.ArticleType = int.Parse(articleType);
            model.CreateDate = DateTime.Now;
            model.IntegralCode = integralcode;
            model.Openid = openid;
            BLL.WX_Share bll = new BLL.WX_Share();
            bll.Add(model);

            //计算个人积分
            Follower follower = new Follower();
            follower.TakeScore(openid, integralcode);

            return "1";
        }
        /// <summary>
        /// 关注有礼
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string AttentionGift(HttpContext context)
        {
            string result = "";
            string openid = "";
            if (context.Request["openid"] != null)
            {
                openid = context.Request["openid"].ToString();
            }
            string goodsid = "";
            if (context.Request["goodsid"] != null)
            {
                goodsid = context.Request["goodsid"].ToString();
            }
            string name = "";
            if (context.Request["txtName"] != null)
            {
                name = context.Request["txtName"].ToString();
            }
            string address = "";
            if (context.Request["txtAddress"] != null)
            {
                address = context.Request["txtAddress"].ToString();
            }
            string telephone = "";
            if (context.Request["txtPhone"] != null)
            {
                telephone = context.Request["txtPhone"].ToString();
            }
            string province = "";
            if (context.Request["ddlProvince"] != null)
            {
                province = context.Request["ddlProvince"].ToString();
            }
            string city = "";
            if (context.Request["ddlCity"] != null)
            {
                city = context.Request["ddlCity"].ToString();
            }
            string remark = "";
            if (context.Request["txtRemark"] != null)
            {
                remark = context.Request["txtRemark"].ToString();
            }
            string mode = "";
            if (context.Request["mode"] != "") {
                mode = context.Request["mode"].ToString();
            }

            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            if (bll.Exists(telephone, goodsid))
            {
                return "-1";
            }
            Model.WX_PublicOrder model = new Model.WX_PublicOrder();
            model.Address = address;
            model.City = city;
            model.GoodID = int.Parse(goodsid);
            model.Name = name;
            model.OpenID = openid;
            model.OrderDate = DateTime.Now;
            model.Province = province;
            model.Remark = remark;
            model.TelePhone = telephone;
            model.GoodsType = 3;
            
            int row = bll.Add(model);
            //更新家园卡

            WXHelper helper = new WXHelper();
            if (mode == "view" || mode == "link")
            {
            }
            else {
                helper.UpdateHomeCard(openid, name, telephone, province, city, address);
            }
            
            if (row == 0)
            {
                result = "0";
            }
            else {
                result = "1";
            }
            return result;
        }
        /// <summary>
        /// 粉丝数兑换
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string GetGift(HttpContext context)
        {
            string result = "true";
            
            string openid = context.Request["openid"].ToString();

            string goodsid = "";
            if (context.Request["goodsid"] != null)
            {
                goodsid = context.Request["goodsid"].ToString();
            }
            string name = "";
            if (context.Request["txtName"] != null)
            {
                name = context.Request["txtName"].ToString();
            }
            string address = "";
            if (context.Request["txtAddress"] != null)
            {
                address = context.Request["txtAddress"].ToString();
            }
            string telephone = "";
            if (context.Request["txtPhone"] != null)
            {
                telephone = context.Request["txtPhone"].ToString();
            }
            string province = "";
            if (context.Request["ddlProvince"] != null)
            {
                province = context.Request["ddlProvince"].ToString();
            }
            string city = "";
            if (context.Request["ddlCity"] != null)
            {
                city = context.Request["ddlCity"].ToString();
            }
            string remark = "";
            if (context.Request["txtRemark"] != null)
            {
                remark = context.Request["txtRemark"].ToString();
            }
            try
            {
                BLL.WX_PublicGood bllGood = new BLL.WX_PublicGood();
                if (bllGood.IsStore(int.Parse(goodsid)) == false)
                {
                    return "-1";
                }
                //当前礼物消耗的粉丝数
                
                Model.WX_PublicGood modelGood = bllGood.GetModel(int.Parse(goodsid));
                string number = modelGood.Score.ToString();

                //计算消耗粉丝数后的总量
                BLL.WX_SubscribeResult bll = new BLL.WX_SubscribeResult();
                if (bll.IsCanChange(openid, int.Parse(number)))
                {
                    //把信息写入订单表中
                    BLL.WX_PublicOrder bllOrder = new BLL.WX_PublicOrder();
                    Model.WX_PublicOrder modelOrder = new Model.WX_PublicOrder();
                    modelOrder.Address = address;
                    modelOrder.City = city;
                    modelOrder.GoodID = int.Parse(goodsid);
                    modelOrder.GoodsType = 4;
                    modelOrder.Name = name;
                    modelOrder.OpenID = openid;
                    modelOrder.OrderDate = DateTime.Now;
                    modelOrder.Province = province;
                    modelOrder.TelePhone = telephone;
                    bllOrder.Add(modelOrder);

                    bll.SubtractFans(openid, int.Parse(number));

                    modelGood.Number = modelGood.Number - 1;
                    bool t = bllGood.Update(modelGood);

                    result = "true";
                }
            }
            catch (Exception ex) {
                result = "fase";
            }
            return result;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}