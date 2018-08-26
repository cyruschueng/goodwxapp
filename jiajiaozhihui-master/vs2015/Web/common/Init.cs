using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.common
{
    public class InitSession
    {
        private string _openid = "";
        public InitSession(string openid)
        {
            _openid = openid;
        }
        public void InitMessage()
        {
            BLL.WX_MessageReply bll = new BLL.WX_MessageReply();
            DataSet ds = bll.GetList(0, "", "keyword,[order]");
            SessionItem sessionItem = new SessionItem();
            sessionItem.Oper = Operation.KeyWord;
            Message message = null;
            List<Message> listmessage = new List<Message>();
            foreach (DataRow dr in ds.Tables[0].Rows) {
                message=new Message();
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
                listmessage.Add(message);
            }
            sessionItem.Data = listmessage;
            WXSession.Add(_openid, sessionItem);
        }
        public bool IsInitMessage()
        {
            bool result = false;
            SessionItem sessionItem= WXSession.Get(_openid) as SessionItem;
            if (sessionItem != null) {
                result = true;
            }
            return result;
        }
        public List<Message> GetMessage()
        {
            SessionItem sessionItem = WXSession.Get(_openid) as SessionItem;
            List<Message> message = sessionItem.Data as List<Message>;
            return message;
        }
    }
}