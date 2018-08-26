using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Generalize.Helper
{
    public class GroupContentProvide
    {
        /// <summary>
        /// 班级从1101-9999;
        /// 每次从上面的数据中取出10个未使用的数字
        /// 并且每次由小到大取
        /// </summary>
        /// <param name="groupType"></param>
        /// <returns></returns>
        public static List<int> GetClassName(string groupType)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            List<int> usingClassList = new List<int>();
            var list= bll.GetModelList("group_type="+groupType+ " and isnumeric(class_name)=1");
            foreach (var m in list)
            {
                usingClassList.Add(int.Parse(m.class_name));
            }
            var classList = GenerateClassName();
            var newList = classList.Except(usingClassList).OrderBy(e => e).Take(10).ToList();
            return newList;
        }
        public static string GetLatelyGroupName(string groupType)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var list = bll.GetModelList("group_type=" + groupType );
            if (list.Count > 0) {
                var group= list.OrderByDescending(e => e.id).First();
                return group.title;
            }
            return "";
        }
        public static void UpdateGroupContent(int id,string catalogue, string classname,DateTime? validdate,string serverId)
        {
            string path = "";
            if (!string.IsNullOrEmpty(serverId)) {
                Helper.MediaDataProvide provide = new Helper.MediaDataProvide("");
                path = provide.UploadImg(serverId);
                if (path != "")
                {
                    path = path.Replace(System.AppDomain.CurrentDomain.BaseDirectory, "");
                    path = "/" + path.Replace("\\", "/");
                }
            }
            
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var model = bll.GetModel(id);
            model.catalogue = catalogue;
            model.class_name = classname;
            model.valid_date = validdate;
            if (!string.IsNullOrEmpty(path)) {
                model.img_url = path;
            }
            bll.Update(model);
        }
        private static List<int> GenerateClassName()
        {
            List<int> list = new List<int>();
            for (var i = 1101; i < 10000; i++) {
                list.Add(i);
            }
            return list;
        }
    }

}