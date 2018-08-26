using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common;

namespace SfSoft.web.emc.wxcourse.timer
{
    public partial class browse : SfSoft.SfEmc.EmcDetailPage
    {
        Model.WX_Course_Timer modelArts = new SfSoft.Model.WX_Course_Timer();
        BLL.WX_Course_Timer bllArts = new BLL.WX_Course_Timer();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {                
                hfMID.Value = "emc.wxcourse.timer";
                hfCourseId.Value = Request.QueryString["id"];
                BLL.WX_Course_Timer bll = new BLL.WX_Course_Timer();
                modelArts = bllArts.GetModel(int.Parse(hfCourseId.Value));
                hfMode.Value = "add";
                if (modelArts != null)
                {
                    hfMode.Value = "update";
                    this.ShowInfo(modelArts);
                }
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.wxcourse.timer";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
            tsbtnReturn.Attributes.CssStyle.Add("display", "none");
        }
        private void ShowInfo(Model.WX_Course_Timer model)
        {
            ddlPlanType.Items.FindByValue(model.PlanType.ToString()).Selected = true;
            ddlRepeatType.Items.FindByValue(model.RepeatType.ToString()).Selected = true;
            /*频率*/
            if (model.RepeatType == 1) {
                ShowRepeatByDay(model);
            }
            else if (model.RepeatType == 2) {
                ShowRepeatByWeek(model);
            }
            else if (model.RepeatType == 3) {
                ShowRepeatByMonth(model);
            }
            txtEveryInterval.Text = model.EveryIntervalHour.ToString();
            ddlUnit.Items.FindByValue(model.Unit).Selected = true;
            txtEveryDayStartTime.Text = model.StartTime;
            txtEveryDayEndTime.Text = model.EndTime;
            txtStartDate.Text = string.Format("{0:yyyy-MM-dd}", model.StartDateTime.Value.Date);
            txtStartTime.Text = model.StartDateTime.Value.TimeOfDay.ToString();
            txtEndDate.Text = string.Format("{0:yyyy-MM-dd}", model.EndDateTime.Value.Date);
            txtEndTime.Text = model.EndDateTime.Value.TimeOfDay.ToString();
        }
        private void ShowRepeatByDay(Model.WX_Course_Timer model)
        {
            if (model.Day != null) {
                txtDayInterval.Text = model.Day.ToString();
            }
        }

        private void ShowRepeatByWeek(Model.WX_Course_Timer model)
        {
            if (model.Day != null)
            {
                txtWeekInterval.Text = model.Day.ToString();
            }
            if (model.Week != "") {
                string[] items = model.Week.Split(new char[]{ ','});
                for (int i = 0; i < items.Length; i++) {
                    cblWeek.Items.FindByValue(items[i]).Selected = true;
                }
            }
        }

        private void ShowRepeatByMonth(Model.WX_Course_Timer model)
        {
            if (model.MonthType == 0)
            {
                rbRepeatItemMonthIn.Checked = true;
                rbRepeatItemMonthAt.Checked = false;
                if (model.Day != null) txtMonthInDay.Text = model.Day.ToString();
                if (model.Month != null) txtMonthInterval.Text = model.Month.ToString();
            }
            else {
                rbRepeatItemMonthIn.Checked = false;
                rbRepeatItemMonthAt.Checked = true;
                if (model.Day != null) ddlSn.Items.FindByValue(model.Day.ToString()).Selected = true;
                if (model.WeekOfMonth != null) ddlWeeks.Items.FindByValue(model.WeekOfMonth.ToString()).Selected = true;
                if (model.Month != null) txtMonthInterval1.Text = model.Month.ToString();
            }
        }
        protected override void VtSave()
        {
            string strErr = "";
            strErr = checkform();
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }
            //保存单据
            Model.WX_Course_Timer model = new Model.WX_Course_Timer();
            model.CourseId = Convert.ToInt32(hfCourseId.Value);
            model = SetModelValue(model);
            bllArts.Delete(model.CourseId);
            bllArts.Add(model);

        }
        private Model.WX_Course_Timer SetModelValue(Model.WX_Course_Timer model)
        {
            //执行类型 执行一次，重复执行
            model.PlanType = int.Parse(ddlPlanType.SelectedValue);
            //执行频率 每天，每周，每月
            model.RepeatType = int.Parse(ddlRepeatType.SelectedValue);
            if (hfPanel2.Value== "1")
            {
                if (model.RepeatType == 1)
                {
                    RepeatByDay(model);
                }
                else if (model.RepeatType == 2)
                {
                    RepeatByWeek(model);
                }
                else if (model.RepeatType == 3)
                {
                    RepeatByMonth(model);
                }
            }
            // 每天执行频率
            if (hfPanel2.Value == "1")
            {
                model.EveryIntervalHour = Convert.ToInt16(txtEveryInterval.Text);
                model.Unit = ddlUnit.SelectedValue;
                model.StartTime = txtEveryDayStartTime.Text;
                model.EndTime = txtEveryDayEndTime.Text;
            }
            //持续时间
            model.StartDateTime =Convert.ToDateTime(txtStartDate.Text + " " + txtStartTime.Text);
            model.EndDateTime = Convert.ToDateTime(txtEndDate.Text + " " + txtEndTime.Text);
            return model;
        }
        private void RepeatByDay(Model.WX_Course_Timer model)
        {
            model.Day = Convert.ToInt16(txtDayInterval.Text);
        }
        private void RepeatByWeek(Model.WX_Course_Timer model)
        {
            model.Day = Convert.ToInt16(txtWeekInterval.Text);
            for (int i = 1; i < cblWeek.Items.Count + 1; i++)
            {
                if (cblWeek.Items.FindByValue(i.ToString()).Selected)
                {
                    model.Week += "," + i.ToString();
                }
            }
            model.Week = model.Week!=""?model.Week.Substring(1):"";
        }
        private void RepeatByMonth(Model.WX_Course_Timer model)
        {
            if (rbRepeatItemMonthIn.Checked)
            {
                model.MonthType = 0;
                model.Day = Convert.ToInt16(txtMonthInDay.Text);
                model.Month = Convert.ToInt16(txtMonthInterval.Text);
            }
            if (rbRepeatItemMonthAt.Checked)
            {
                model.MonthType = 1;
                model.Day = Convert.ToInt16(ddlSn.SelectedValue);
                model.WeekOfMonth =Convert.ToInt32(ddlWeeks.SelectedValue);
                model.Month = Convert.ToInt16(txtMonthInterval1.Text);
            }
        }
        private string checkform()
        {
            string strErr = "";
            if (txtStartDate.Text.Trim() == "") {
                strErr += "持续时间-开始日期不能为空\\n";
            }
            if (txtStartTime.Text.Trim() == "")
            {
                strErr += "持续时间-开始时间不能为空\\n";
            }
            if (txtEndDate.Text.Trim() == "")
            {
                strErr += "持续时间-结束日期不能为空\\n";
            }
            if (txtEndTime.Text.Trim() == "")
            {
                strErr += "持续时间-结束时间不能为空\\n";
            }
            if (hfPanel3.Value == "1") {
                if (txtStartDate.Text.Trim() == "")
                {
                    strErr += "第天频率- 开始时间不能为空\\n";
                }
                if (txtStartTime.Text.Trim() == "")
                {
                    strErr += "第天频率-结束时间不能为空\\n";
                }
            }
            return strErr;
        }
    }
}

