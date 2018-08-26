using System;
using System.Data;
using System.Web.UI.WebControls;
using SfSoft.SfEmc;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Threading.Tasks;
using SfSoft.web.emc.gardenia.template;

namespace SfSoft.web.emc.gardenia.checkmember
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
                var list = bll.GetModelList("");
                ViewState.Add("classdata", list);
                InitDropDownList();
                BindData(GetWhere());
            }
            else
            {
                Common.SetEmptyGridView.ResetGridView(this.GridView1);
            }
            
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.read.plan";
        }
        #region 初始化工具栏
        protected override void VtInitToolbars()
        {
            
        }

        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        #endregion
        protected override void VtDelete()
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, true);
            if (ID == "")
            {
                return;
            }
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.wx_gardenia_user model = bll.GetModel(id);
                if (model.is_act == -1) {
                    bll.Delete(id);
                }
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            var sql = "select a.*,c.group_name,b.class_name as grade_name from wx_gardenia_user a " +
                "left join WX_SGroup_Content b on a.class_id=b.id " +
                "left join WX_SGroup c on b.group_type=c.id " +
                "where "+ strWhere;

            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);


            //BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            //DataSet ds = bll.GetList(strWhere);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                PagedDataSource pds = new PagedDataSource();
                pds.DataSource = ds.Tables[0].DefaultView;
                AspNetPager1.RecordCount = pds.Count;
                pds.AllowPaging = true;
                pds.CurrentPageIndex = AspNetPager1.CurrentPageIndex - 1;
                pds.PageSize = AspNetPager1.PageSize;
                GridView1.PageIndex = AspNetPager1.CurrentPageIndex - 1;
                this.GridView1.DataSource = pds;
                this.GridView1.DataBind();
            }
            else
            {
                AspNetPager1.RecordCount = 0;
                Common.SetEmptyGridView.GridViewDataBind(GridView1, ds.Tables[0]);
            }
        }
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
        private string GetWhere()
        {
            string strWhere = "1=1";
            if (rblAct.SelectedItem!=null && rblAct.SelectedValue!="") {
                strWhere += " and a.is_act=" + rblAct.SelectedValue;
            }
            if (ddlGroupType.SelectedItem != null && ddlGroupType.SelectedValue != "") {
                strWhere += " and c.id="+ddlGroupType.SelectedValue;
            }
            strWhere += " order by a.Id desc";
            return strWhere;
        }

        
        protected new void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                if (e.Row.RowState == DataControlRowState.Alternate || e.Row.RowState == DataControlRowState.Normal) {
                    //int id = 0;
                    //int.TryParse(e.Row.Cells[10].Text, out id);
                    //var list =(List<Model.WX_SGroup_Content>)ViewState["classdata"];
                    //var model= list.Find(x => x.id == id);
                    //if(model!=null) e.Row.Cells[10].Text =  model.title;
                }
                if (e.Row.RowState == DataControlRowState.Edit) {
                    HiddenField hfIsAct = (HiddenField)e.Row.Cells[8].FindControl("hfIsAct");
                    RadioButtonList rblIsAct = (RadioButtonList)e.Row.Cells[8].FindControl("rblIsAct");
                    if (!string.IsNullOrEmpty(hfIsAct.Value)) {
                        rblIsAct.Items.FindByValue(hfIsAct.Value).Selected = true;
                    }
                }
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {

        }

        protected void rblAct_SelectedIndexChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        public string GetStateName(string isAct)
        {
            string result = "";
            switch (isAct) {
                case "0":
                    result = "审核中";
                    break;
                case "1":
                    result = "通过";
                    break;
                case "-1":
                    result = "审核失败";
                    break;
            }
            return result;
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }

        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            RadioButtonList rblIsAct = (RadioButtonList)(GridView1.Rows[e.RowIndex].FindControl("rblIsAct"));

            Model.wx_gardenia_user model = new Model.wx_gardenia_user();
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();

            model = bll.GetModel(RefID);
            if (model != null)
            {
                if (rblIsAct.SelectedItem!=null && rblIsAct.SelectedValue!="")
                {
                    model.is_act = int.Parse( rblIsAct.SelectedValue);
                    if (model.is_act == 1)
                    {
                        BLL.WX_SGroup_Content contentBll = new BLL.WX_SGroup_Content();
                        var contentModel= contentBll.GetModel(model.class_id ?? 0);
                        model.class_no = contentModel.id.ToString();
                        model.class_name = contentModel.id.ToString();
                        model.class_type = contentModel.catalogue.PadLeft(3, '0');
                        //CombinImageAnsy(model.openid, studentNumber, model.real_name, model.class_id ?? 0);
                    }
                    else
                    {
                        //DeleteImgAnsy(model.openid);

                        model.class_no ="";
                        model.class_name = "";
                        model.class_type ="";
                    }
                }
            }
            bll.Update(model);
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        /// <summary>
        ///  图文合成
        /// </summary>
        /// <param name="sourceImg"></param>
        /// <param name="openid"></param>
        /// <param name="studentNumber"></param>
        /// <param name="studentName"></param>
        /// <param name="className"></param>
        /// <returns></returns>
        public void  CombinImageAnsy(string openid, string studentNumber,string studentName, int classId)
        {
            Task task = new Task((basePath)=> {
                
                BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
                var model = bll.GetModel(classId);

                string sourceImg = basePath+ "emc\\gardenia\\img\\advice.jpg";
                System.Drawing.Image img = System.Drawing.Image.FromFile(sourceImg);     //照片图片 
                                                                                         //从指定的System.Drawing.Image创建新的System.Drawing.Graphics       
                Graphics g = Graphics.FromImage(img);
                #region
                //添加文字
                Font drawFont = new Font("方正静蕾简体", 30, FontStyle.Bold);

                SolidBrush drawBrush = new SolidBrush(Color.Black);
                g.DrawString(studentNumber, drawFont, drawBrush, 220, 340);
                g.DrawString(studentName, drawFont, drawBrush, 360, 340);
                g.DrawString(model != null ? model.title : "10010班", drawFont, drawBrush, 240, 423);
                #endregion

                GC.Collect();
                string path = basePath+"files\\gardenia\\member\\advice\\";
                if (Directory.Exists(path) == false)
                {
                    Directory.CreateDirectory(path);
                }
                string saveImagePath = path + openid + ".png";
                img.Save(saveImagePath, ImageFormat.Png);
                SendNotice(new entity { ClassId=model.title, MemberId=studentNumber,OpenId=openid });
            }, Page.MapPath("~/"));
            task.Start();
        }
        private void DeleteImgAnsy(string openId)
        {
            Task task = new Task((basePath) => {
                var file = basePath+"files\\gardenia\\member\\advice\\" + openId + ".png";
                if (File.Exists(file))
                {
                    File.Delete(file);
                }
            }, Page.MapPath("~/"));
            task.Start();
        }
        private void SendNotice(entity param)
        {
            Task task=new Task((x) =>{
                var info = x as entity;
                var result = Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.GetPrivateTemplate("");
                var cc = result.template_list.Find(e => e.template_id == "");

                string classId =info.ClassId;//班级
                string first = "亲,您已成功加入栀子会" + classId;
                string memberId = info.MemberId;
                string remark = "请点击进入查看入学通知书";
                string url = "http://weixin.jiajiaozhihui.cn/files/gardenia/member/advice/"+info.OpenId+".png";
                string appId = App.Helper.WxPayConfig.APPID;
                string openId = info.OpenId;
                zh4tWfqeAC2_YrKkAfQ_BYJT7wyUoVI72Tj2nOgGnAw data = new zh4tWfqeAC2_YrKkAfQ_BYJT7wyUoVI72Tj2nOgGnAw(first, memberId, remark, url);
                Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessageAsync(appId, openId, data);
            }, param);
            task.Start();
        }
        private void InitDropDownList()
        {
            BLL.WX_SGroup bll = new BLL.WX_SGroup();
            var list= bll.GetModelList("");
            foreach (var m in list) {
                ddlGroupType.Items.Add(new ListItem { Value= m.id.ToString(), Text=m.group_name }); 
            }
            ddlGroupType.Items.Insert(0, new ListItem { Value = "", Text = "请选择" });
        }

        protected void ddlGroupType_SelectedIndexChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
    }
}


