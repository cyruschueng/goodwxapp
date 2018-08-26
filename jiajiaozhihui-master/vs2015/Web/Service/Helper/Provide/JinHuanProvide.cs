using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.Service.Helper.Provide
{
    public class JinHuanProvide
    {
        public List<Entity.JinHua.Group> GetJinHuan(int type)
        {
            BLL.WX_JingHua bll = new BLL.WX_JingHua();
            var list= bll.GetModelList("ArticleType="+type);

            var query = (from e in list
                         group e by new { e.GroupTitle } into g
                         select g.FirstOrDefault()).ToList();

            var groupTitleList = GetGroupTitle();
            var group = groupTitleList.Where(e => query.Exists(x => x.GroupTitle == e.Id)).OrderBy(e=>e.Sn);

            List<Entity.JinHua.Group> articles = new List<Entity.JinHua.Group>();
            
            foreach (var g in group) {
                articles.Add(new Entity.JinHua.Group
                {
                    GroupTitle=g.Title,
                    Header = ConventEntity(list.Where(e => (e.GroupTitle == g.Id) && ((e.IsHead??0) == 1)).FirstOrDefault<Model.WX_JingHua>()),
                    Body=ConventEntitys(list.Where(e=>(e.GroupTitle==g.Id) && ((e.IsHead??0)==0)).OrderByDescending(e=>e.CreateDate).ToList())

                });
            }
            return articles;
        }
        private List<Entity.JinHua.Titles> GetGroupTitle()
        { 
            BLL.Pub_BaseData bll=new BLL.Pub_BaseData();
            List<Entity.JinHua.Titles> titles = new List<Entity.JinHua.Titles>();

            DataSet ds= bll.GetList("RefObj='weixin.material.jinghua.groupname'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                foreach (DataRow dr in ds.Tables[0].Rows) {
                    titles.Add(new Entity.JinHua.Titles {
                        Id = dr.Field<string>("RefValueCode"),
                        Title = dr.Field<string>("RefValue"),
                        Sn = dr.Field<int>("OrderId")
                    });
                }
            }
            return titles;
        }
        private List<Entity.JinHua.JinHuanInfo> ConventEntitys(List<Model.WX_JingHua> list)
        {
            List<Entity.JinHua.JinHuanInfo> infos = new List<Entity.JinHua.JinHuanInfo>();
            foreach (var m in list) {
                infos.Add(ConventEntity(m));
            }
            return infos;
        }
        private Entity.JinHua.JinHuanInfo ConventEntity(Model.WX_JingHua model)
        {
            Entity.JinHua.JinHuanInfo info = new Entity.JinHua.JinHuanInfo();
            if (model == null) model = new Model.WX_JingHua();
            info.ArticleType = model.ArticleType;
            info.ArticleUrl = model.ArticleUrl;
            info.CreateDate = model.CreateDate;
            info.Detail = model.Detail;
            info.ImgUrl = model.ImgUrl;
            info.IsHead = model.IsHead;
            info.Sn = model.Order;
            info.Title = model.Title;
            info.ReleaseDate = model.ReleaseDate;
            return info;
        }
    }
 
}