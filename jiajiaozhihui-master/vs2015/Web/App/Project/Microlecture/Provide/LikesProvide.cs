using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Microlecture.Provide
{
    public class LikesProvide
    {
        private string appid = "app001";
        public bool IsLike(string liker, string appId, string modules, int relationId)
        {
            BLL.wx_likes bll = new BLL.wx_likes();
            var list= bll.GetModelList("appid='" + appId + "' and modules='" + modules + "' and relation_id=" + relationId + " and liker='" + liker + "'");
            return list.Count > 0 ? true : false;
        }

        public List<Model.wx_likes> GetLikeList(string appId, string modules, int relationId)
        {
            BLL.wx_likes bll = new BLL.wx_likes();
            var list = bll.GetModelList("appid='" + appId + "' and modules='" + modules + "' and relation_id=" + relationId );
            return list;
        }
    }
}