using System;
using System.Data;
using System.Linq;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Collections.Generic;

namespace SfSoft.web.emc.gardenia.task
{
    public partial class bdtree : System.Web.UI.Page
    {
        private Newtonsoft.Json.Linq.JObject _config;
        protected void Page_Load(object sender, EventArgs e)
        {

            if (!IsPostBack)
            {
                ReadConfig();
                var schoolId= _config["schoolId"].ToString();
                if (schoolId == null) {
                    throw new Exception("未配置schoolId");
                }
                if (_config["items"] == null) {
                    throw new Exception("未配置任务");
                }
                LoadTree(schoolId);
            }
        }

        
        private void LoadTree(string schoolId)
        {
            List<Model.WX_SGroup_Content> classList = GetClassList(schoolId);


            TreeNode rootnode = new TreeNode();
            rootnode.Expanded = true;
            rootnode.NavigateUrl = "javascript:void('0')";
            rootnode.Text = "枙子会任务设置";
            BDTreeView.Nodes.Add(rootnode);
            foreach (var classInfo in classList) {
                /*班级*/
                TreeNode treenode =new TreeNode();
                treenode.Text = classInfo.title;
                treenode.NavigateUrl = "javascript:void('0')";
                rootnode.ChildNodes.Add(treenode);
                var items = _config["items"];

                foreach (var task in items) {
                    /*任务*/
                    TreeNode treenode1 = new TreeNode();
                    treenode1.Text = task["title"].ToString();
                    if (task["id"].ToString() == "everyday")
                    {
                        treenode1.NavigateUrl = "javascript:OpenEveryDay(" + classInfo.id + ")";
                    }
                    else if (task["id"].ToString() == "everyweek")
                    {
                        treenode1.NavigateUrl = "javascript:OpenEveryWeek(" + classInfo.id + ")";
                    }
                    else if (task["id"].ToString() == "everymonth")
                    {
                        treenode1.NavigateUrl = "javascript:OpenEveryMonth(" + classInfo.id + ")";
                    }
                    else if (task["id"].ToString() == "wangmama") {
                        treenode1.NavigateUrl = "javascript:OpenWangMama(" + classInfo.id + ")";
                    }
                    treenode.ChildNodes.Add(treenode1);
                }
            }
        }
        /*班级*/
        private List<Model.WX_SGroup_Content> GetClassList(string schoolId)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            return bll.GetModelList("group_type=" + schoolId + "");
        }
        /// <summary>
        /// 读起配置文件 
        /// </summary>
        private void ReadConfig()
        {
            string path = System.Web.HttpContext.Current.Server.MapPath("~/emc/gardenia/task.json");
            _config=App.Helper.FileHelper.getJson(path);
        }
    }
}


