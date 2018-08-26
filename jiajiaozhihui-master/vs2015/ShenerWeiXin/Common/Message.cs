using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace ShenerWeiXin.Common
{
    public  class Message
    {
        private static string _autoAttention = "";
        private static string _passivityAttention = "";
        private static List<ShenerWeiXin.Message> _messages = null;
        public  Message(string appId)
        {
            SfSoft.BLL.WX_DataBase bll = new SfSoft.BLL.WX_DataBase();
            DataSet ds = bll.GetList("AppId='"+appId+"'");
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                if (dr["Code"].ToString().ToLower() == "autoattention")
                {
                    _autoAttention = dr["Value"].ToString();
                }
                if (dr["Code"].ToString().ToLower() == "passivityattention")
                {
                    _passivityAttention = dr["Value"].ToString();
                }
            }
            InitMessage(appId);
        }
        /// <summary>
        /// 关注回复
        /// </summary>
        public static string AutoAttention
        {
            get { return _autoAttention; }
        }
        /// <summary>
        /// 被动默认回复
        /// </summary>
        public static string PassivityAttention
        {
            get { return _passivityAttention; }
        }
        public List<ShenerWeiXin.Message> Messages
        {
            get { return _messages; }
        }

        private  void InitMessage(string appId)
        {
            SfSoft.BLL.WX_MessageReply bll = new SfSoft.BLL.WX_MessageReply();
            DataSet ds = bll.GetList(0, "AppId='"+appId+"'", "keyword,[order]");
            ShenerWeiXin.Message message = null;
            List<ShenerWeiXin.Message> listmessage = new List<ShenerWeiXin.Message>();
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                message = new ShenerWeiXin.Message();
                message.Class = dr["class"].ToString();
                message.Content = dr["Content"].ToString();
                message.Description = dr["Description"].ToString();
                message.HQMusicUrl = dr["HQMusicUrl"].ToString();
                message.KeyWord = dr["KeyWord"].ToString();
                message.MediaId = dr["MediaId"].ToString();
                message.MsgType = dr["MsgType"].ToString();
                message.MusicURL = dr["MusicURL"].ToString();
                message.PicUrl = dr["PicUrl"].ToString();
                message.Title = dr["Title"].ToString();
                message.Url = dr["NewsUrl"].ToString();
                message.AuthUrl = dr["AuthUrl"].ToString();
                message.Tags = dr["Tags"].ToString();
                message.Order = string.IsNullOrEmpty(dr["Order"].ToString()) == true ? 9999: int.Parse(dr["Order"].ToString());
                if (dr["IsReadWeixinService"] != null && dr["IsReadWeixinService"].ToString() == "1")
                {
                    message.IsReadWeixinService = 1;
                }
                else {
                    message.IsReadWeixinService = 0;
                }
                listmessage.Add(message);
            }
            _messages=listmessage;
        }        
    }
}
