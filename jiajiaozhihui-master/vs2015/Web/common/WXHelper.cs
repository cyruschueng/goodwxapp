using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using SfSoft.DBUtility;
using System.IO;
using SfSoft.Common;
using Senparc.Weixin.MP.AdvancedAPIs;
using Senparc.Weixin.MP.CommonAPIs;
using Senparc.Weixin.MP.Entities.Menu;
using Senparc.Weixin.Helpers;

namespace SfSoft.web.common
{
    public class WXHelper
    {
        
        /// <summary>
        /// 设置汇总表
        /// </summary>
        /// <param name="typeCode"></param>
        /// <param name="openid"></param>
        /// <param name="orderNo"></param>
        /// <param name="integral">如果不是默认值，会员分数设置会与用户给定的值设置</param>
        public void SetIntegral(string typeCode, string openid,string orderNo="",int integral=0)
        {
            BLL.WX_Integral_Basic bll = new BLL.WX_Integral_Basic();
            Model.WX_Integral_Basic model = bll.GetModel(typeCode);
            if (integral != 0) {
                model.Score = integral;
            }
            
            //积分明细表
            BLL.WX_Integral_Detail bllDetail = new BLL.WX_Integral_Detail();
            Model.WX_Integral_Detail modelDetail = new Model.WX_Integral_Detail();
            modelDetail.OpenId = openid;
            modelDetail.Integral_Type = typeCode;
            modelDetail.CreateDate = DateTime.Now;
            modelDetail.OrderNo = orderNo;
            modelDetail.Score = model.Score;
            
            bllDetail.Add(modelDetail);

            //积分汇总
            BLL.WX_Integral bllTotal = new BLL.WX_Integral();
            Model.WX_Integral modeTotal =bllTotal.GetModel(openid);

            if (modeTotal != null)
            {
                int score = 0;
                if (modeTotal.Usable_Integral != null)
                {
                    score = (int)modeTotal.Usable_Integral;
                }
                //可能积分
                if (model.ScoreType == 1)
                {
                    modeTotal.Usable_Integral = score + (int)model.Score;
                }
                else
                {
                    modeTotal.Usable_Integral = score - (int)model.Score;
                }
                //累计积分
                score = 0;
                if (modeTotal.Accumulate_Integral != null)
                {
                    score = (int)modeTotal.Accumulate_Integral;
                }
                if (model.ScoreType == 1)
                {
                    modeTotal.Accumulate_Integral = score + (int)model.Score;
                }
                //消费类累计积分
                score = 0;
                if (modeTotal.Expend_Integral != null)
                {
                    score = (int)modeTotal.Expend_Integral;
                }
                if (model.IsExpend == 1)
                {
                    modeTotal.Expend_Integral = score + (int)model.Score;
                }
                bllTotal.Update(modeTotal);
            }
            else {
                modeTotal = new Model.WX_Integral();
                //可能积分
                if (model.ScoreType == 1)
                {
                    modeTotal.Usable_Integral = (int)model.Score;
                }
                else
                {
                    modeTotal.Usable_Integral = - (int)model.Score;
                }
                //累计积分
                if (model.ScoreType == 1)
                {
                    modeTotal.Accumulate_Integral =  (int)model.Score;
                }
                //消费类累计积分
                if (model.IsExpend == 1)
                {
                    modeTotal.Expend_Integral = (int)model.Score;
                }
                modeTotal.OpenId = openid;
                bllTotal.Add(modeTotal);
            }
        }
        /// <summary>
        /// 家园卡等级
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="type">1:赚积分卡的等级（书童 ，书生 ，秀才 ） 2：消费多少的等级(银卡，黄金卡，白金卡)</param>
        /// <returns></returns>
        public string GetGrade(string openid,int type)
        {
            string result = "";
            BLL.WX_Integral bll = new BLL.WX_Integral();
            Model.WX_Integral model = bll.GetModel(openid);
            int score = 0;
            if (model != null) {
                score = model.Accumulate_Integral.Value;
            }
            BLL.WX_Grade bllGrade = new BLL.WX_Grade();
            string sql = "select * from WX_Grade where " + score + ">=floor and " + score + "<=upper and type="+type.ToString();
            DataSet ds= DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                result = ds.Tables[0].Rows[0]["Title"].ToString();
            }
            return result;
        }
        /// <summary>
        /// 写入记事本
        /// </summary>
        /// <param name="words"></param>
        public void WriteNode(string words)
        {
            try
            {
                FileStream stream = new FileStream("mytest.txt", FileMode.Create, FileAccess.Write);
                StreamWriter sw = new StreamWriter(stream);
                string text = words;
                sw.WriteLine(text);
                sw.Close();
                stream.Close();
            }
            catch (IOException e)
            {
                
            }
        }
        /// <summary>
        /// 是否已注册
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public bool IsExistOauthDataBase(string openid)
        {
            bool result = false;
            BLL.WX_HomeCard bll = new BLL.WX_HomeCard();
            DataSet ds = bll.GetList("userid='" + openid + "'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = true;
            }
            return result;
        }
        /// <summary>
        /// 注册新用户
        /// </summary>
        /// <param name="userinfo"></param>
        public void Insert(OAuthUserInfo userinfo,string userid)
        {
            string sql = "select * from WX_HomeCard where openid='" + userinfo.openid + "'";
            DataSet ds = DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                BLL.WX_HomeCard bll = new BLL.WX_HomeCard();
                Model.WX_HomeCard model = bll.GetModel(ds.Tables[0].Rows[0]["ID"].ToString());
                model.UserID = userid;
                model.HeadimgUrl = userinfo.headimgurl;
                model.NickName = userinfo.nickname;
                bll.Update(model);
            }
            else {
                BLL.WX_HomeCard bll = new BLL.WX_HomeCard();
                Model.WX_HomeCard model = new Model.WX_HomeCard();

                if (bll.GetModelByCache(userid) != null) return; //如果会员存在就不新增了

                model.OpenId = userinfo.openid;
                model.NickName = userinfo.nickname;
                model.Sex = userinfo.sex;

                model.CreateDate = DateTime.Now;
                model.HeadimgUrl = userinfo.headimgurl;
                model.Integral = 1500;
                model.CardId = CreateCardID();
                model.UserID = userid;
                int row = bll.Add(model);

                //注册用户增加积分
                if (row > 0)
                {
                    WXHelper helper = new WXHelper();
                    helper.SetIntegral("register", userid);
                }
            }
        }
        /// <summary>
        /// 卡id
        /// </summary>
        /// <returns></returns>
        public string CreateCardID()
        {
            string result = "";
            BLL.WX_HomeCard bll = new BLL.WX_HomeCard();
            DataSet ds = bll.GetList(1, "convert(varchar(10),createdate,120)=convert(varchar(10),getdate(),120)", "ID desc");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                string value = ds.Tables[0].Rows[0]["CardId"].ToString();
                value = value.Substring(6);
                int maxvalue = int.Parse(value) + 1;
                value = maxvalue.ToString().PadLeft(5, '0');
                result = DateTime.Now.ToString("yyMMdd") + value;
            }
            else
            {
                result = DateTime.Now.ToString("yyMMdd") + "00001";
            }
            return result;
        }
        /// <summary>
        /// 创建菜单
        /// </summary>
        /// <param name="appId"></param>
        /// <param name="appSecret"></param>
        public void CreateMenu(string appId,string appSecret)
        {
            var accessToken = AccessTokenContainer.TryGetToken(appId, appSecret);
            ButtonGroup bg = new ButtonGroup();
            
            /*******************************************************************/
            var subButton = new SubButton()
            {
                name = "慧 · 教育"
            };
            //subButton.sub_button.Add(new SingleViewButton()
            //{
            //    url = "http://www.shenerjiaoyu.com",
            //    name = "家教帮"
            //});
            subButton.sub_button.Add(new SingleClickButton()
            {
                name = "慧 · 课堂",
                key = "course"
            });
            subButton.sub_button.Add(new SingleViewButton()
            {
                url = "http://m.jiaxiaogongyu.com/vm/school/phoneApp/home/home.vm",
                name = "家校共育"
            });
            subButton.sub_button.Add(new SingleViewButton()
            {
                url = "http://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MzA4MjExMjkwNQ==#wechat_webview_type=1&wechat_redirect",
                name = "历史文章"
            });
            bg.button.Add(subButton);


            /**********************************************************************************************/


            subButton = new SubButton()
            {
                name = "慧 · 活动"
            };
            //subButton.sub_button.Add(new SingleViewButton()
            //{
            //    url = "http://www.shenerjiaoyu.com",
            //    name = "慧∙玩儿"
            //});
            subButton.sub_button.Add(new SingleClickButton()
            {
                name = "公益品",
                key = "goods"
            });

            subButton.sub_button.Add(new SingleViewButton()
            {
                name = "悦享达人",
                url = "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=202048431&idx=1&sn=fb0ef211074cec2edd4d9b930f4a32c3#rd"
            });

            subButton.sub_button.Add(new SingleViewButton()
            {
                name = "周末秀",
                url = "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=202048658&idx=1&sn=d01e8db859010a39c1aa72148dac5fb3#rd"
            });
            subButton.sub_button.Add(new SingleViewButton()
            {
                name = "关注有礼",
                url = "http://www.ctcppdy.org/mobile/gift/index.aspx"
            });

            //subButton.sub_button.Add(new SingleViewButton()
            //{
            //    url = "http://www.shenerjiaoyu.com",
            //    name = "幸运购"
            //});
            //subButton.sub_button.Add(new SingleClickButton()
            //{
            //    key = "SubClickRoot_Text",
            //    name = "慧∙游戏"
            //});
            bg.button.Add(subButton);
            

            /**********************************************************************************************/
            subButton = new SubButton()
            {
                name = "慧 · 生活"
            };
            //subButton.sub_button.Add(new SingleViewButton()
            //{
            //    url = "http://www.shenerjiaoyu.com",
            //    name = "慧∙优购"
            //});
            subButton.sub_button.Add(new SingleViewButton()
            {
                url = "http://wsq.qq.com/reflow/263358109",
                name = "慧 · 社区"
            });
            subButton.sub_button.Add(new SingleClickButton()
            {
                key = "exchange",
                name = "积分兑换"
            });
            subButton.sub_button.Add(new SingleClickButton()
            {
                name = "家园卡",
                key = "hodecard"
            });

            bg.button.Add(subButton);

            var result = CommonApi.CreateMenu(accessToken, bg);
        }

        public bool IsOpenID(string openid)
        {
            BLL.WX_HomeCard bll = new BLL.WX_HomeCard();
            Model.WX_HomeCard model= bll.GetModelByCache(openid);
            if (model == null)
            {
                return false;
            }
            else {
                return true;
            }
        }
        #region 赚积分
        /// <summary>
        /// 完善资料获赠积分
        /// </summary>
        public void SetIntegral_CompleteRegister(string openid)
        {
            BLL.WX_HomeCard bll = new BLL.WX_HomeCard();
            Model.WX_HomeCard model = bll.GetModel(openid);
            if (model != null)
            {
                if (model.ModifyDate == null)
                {
                    WXHelper helper = new WXHelper();
                    helper.SetIntegral("completeRegister", openid);
                }
            }
        }
        /// <summary>
        /// 每日签到
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public string SetIntegral_SignIn(string openid)
        {
            if (IsSigninByDay(openid) == false) {
                WXHelper helper = new WXHelper();
                helper.SetIntegral("signIn", openid);
            }
            BLL.WX_Integral bll = new BLL.WX_Integral();
            return bll.GetModel(openid).Usable_Integral.ToString();
        }
        #endregion

        /// <summary>
        /// 判断今天是不是已签到
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public bool IsSigninByDay(string openid)
        {
            BLL.WX_Integral_Detail bllDetail = new BLL.WX_Integral_Detail();
            DataSet ds = bllDetail.GetList("openid='" + openid + "' and convert(varchar(10),createdate,120)=convert(varchar(10),getdate(),120) and integral_type='signIn'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                return true;
            }
            else {
                return false;
            }

        }
        /// <summary>
        /// 取得可用户积分
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public int GetUsableIntegral(string openid)
        {
            BLL.WX_Integral bll = new BLL.WX_Integral();
            Model.WX_Integral model= bll.GetModel(openid);
            if (model != null) {
                return (int)model.Usable_Integral;       
            }
            return 0;
        }
        /// <summary>
        /// 如果True 表示有效期内，False表示超过有效期
        /// </summary>
        /// <param name="validdate">有效期</param>
        /// <returns></returns>
        public bool IsDateValid(string validdate)
        {
            if (validdate != "")
            {
                DateTime ValidityDate = DateTime.Parse(string.Format("{0:yyyy-MM-dd}",validdate));
                DateTime Today = DateTime.Parse(string.Format("{0:yyyy-MM-dd}", DateTime.Now));
                if (DateTime.Compare(ValidityDate, Today) > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            return true;
        }
        public bool IsAttention(string openid,string userid)
        {
            Model.WX_HomeCard model = null;
            BLL.WX_HomeCard bll=new BLL.WX_HomeCard();
            if (userid != "") {
                model = bll.GetModel(userid);
                if (model != null) {
                    return true;
                }
            }
            return false;
        }
    }
    public class IntegralItem
    {
        /// <summary>
        /// 注册成为会员
        /// </summary>
        public string Register
        {
            get{return "register";}
        }
        /// <summary>
        /// 完善会员资料
        /// </summary>
        public string CompleteRegister
        {
            get{return "completeregister";}
        }
        /// <summary>
        /// 邀请好友成为会员
        /// </summary>
        public string Invite
        {
            get{return "invite";}
        }
        /// <summary>
        /// 每日签到
        /// </summary>
        /// 
        public string SignIn
        {
            get { return "signIn"; }
        }
        /*
        家教帮提问
        家教帮提问回答
        家教帮提问回答被采纳
        慧玩儿发布
        慧玩儿被采用
        慧玩儿评论
        慧玩儿分享朋友圈被点击
        慧课堂报名
        慧课堂答签到
        慧课堂分享分享朋友圈被点击
        慧课堂邀请好友参加成功
        公益品购买
        公益品分享朋友圈点击
        公益品邀请好友购买
        幸运购购买
        幸运购分享朋友圈点击
        慧游戏
        慧游戏分享朋友圈点击
        悦享达人活动获奖
        周末秀活动获奖
        */
    }
}