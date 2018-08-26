using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.ComponentModel;
namespace SfSoft.Common
{
    public delegate void EventDayItemCreating(object source, EventDayItemArgs e);
    public delegate void EventDayChange(object source, EventDayChangeArgs e);
    public class EventDayChangeArgs : EventArgs
    {
        public EventDayChangeArgs(DateTime dt)
        {
            Date = dt;
        }
        private DateTime mDate;
        public DateTime Date
        {
            get
            {
                return mDate;
            }
            set
            {
                mDate = value;
            }
        }

    }
    public class EventDayItemArgs : EventArgs
    {
        public EventDayItemArgs(DayItem di)
        {
            mItem = di;
        }
        private DayItem mItem;
        public DayItem Item
        {
            get
            {
                return mItem;
            }
        }
        private int mCursorMonth;
        public int CursorMonth
        {
            get
            {
                return mCursorMonth;
            }
            set
            {
                mCursorMonth = value;
            }

        }
    }
    public interface IHtmlRender
    {
        void Reader(HtmlTextWriter writer);

    }
    public class DayItem : IHtmlRender
    {
        public DayItem(DateTime dt)
        {
            mDate = dt;
            Text = dt.Day.ToString();
        }
        #region IHtmlRender 成员
        private DateTime mDate;
        public DateTime Date
        {
            get
            {
                return mDate;
            }
        }
        private string mText = "1";
        public string Text
        {
            get
            {
                return mText;
            }
            set
            {
                mText = value;
            }
        }
        private System.Web.UI.AttributeCollection mAttributes = new System.Web.UI.AttributeCollection(new System.Web.UI.StateBag(true));
        public System.Web.UI.AttributeCollection Attributes
        {
            get
            {
                return mAttributes;
            }
        }
        public void Reader(HtmlTextWriter writer)
        {
            writer.Write("<td align=\"center\"");
            foreach (object key in Attributes.Keys)
            {
                writer.Write(" " + key.ToString() + "=\"" + Attributes[key.ToString()] + "\"");

            }
            writer.Write(">" + Text + "</td>");
        }

        #endregion
    }
    internal class CalendarBuilder : IHtmlRender
    {
        public event EventDayItemCreating ItemCreating;
        protected virtual void OnItemCreating(EventDayItemArgs e)
        {
            if (ItemCreating != null)
            {
                if (e != null)
                    e.CursorMonth = _DT.Month;
                ItemCreating(this, e);
            }
        }
        private DateTime _DT;
        public CalendarBuilder(DateTime dt)
        {
            _DT = dt;
        }
        private string mChangeScript = "";
        public string ChangeScript
        {
            get
            {
                return mChangeScript;
            }
            set
            {
                mChangeScript = value;
            }
        }

        private string mMonthCtlID = "";
        public string MonthCtlID
        {
            get
            {
                return mMonthCtlID;
            }
            set
            {
                mMonthCtlID = value;
            }
        }
        private string mYearCtlID = "";
        public string YearCtlID
        {
            get
            {
                return mYearCtlID;
            }
            set
            {
                mYearCtlID = value;
            }
        }
        static System.IO.Stream _Script = null;
        static System.IO.Stream _Image = null;
        public static byte[] GetResource(string tag)
        {
            System.IO.Stream stream = null;
            if (tag.ToLower() == "script")
            {
                if (_Script == null)
                    _Script = typeof(CalendarBuilder).Assembly.GetManifestResourceStream("HFSoft.Web.CalendarScript.js");
                stream = _Script;
            }
            else
            {
                if (_Image == null)
                    _Image = typeof(CalendarBuilder).Assembly.GetManifestResourceStream("HFSoft.Web.Timer.gif");
                stream = _Image;
            }
            stream.Position = 0;
            Byte[] bytes = new byte[stream.Length];
            stream.Read(bytes, 0, bytes.Length);
            return bytes;
        }
        #region IHtmlRender 成员

        public void Reader(HtmlTextWriter writer)
        {
            writer.Write("<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse: collapse\" bordercolor=\"#111111\" width=\"100%\"  id=\"AutoNumber1\" height=\"100%\">");
            writer.Write("<tr>");
            writer.Write("<td width=\"100%\" height=\"11\" colspan=\"2\" bgcolor=\"#666699\">");
            writer.Write("<p align=\"center\"></p>");
            writer.Write("<table border=\"0\" style=\"border-collapse: collapse; font-size:10pt; color:#FFFFFF; font-weight:bold\" bordercolor=\"#111111\" width=\"100%\" id=\"AutoNumber5\" cellpadding=\"2\">");
            writer.Write("<tr>");
            writer.Write("<td width=\"100%\" align=\"center\">");
            //string changejs ="";//document.all('txtDateValue').value =document.all('_year').options[document.all('_year').selectedIndex].value+'-'+document.all('_month').options[document.all('_month').selectedIndex].value+'-1'";
            writer.Write("<SELECT onpropertychange=\"" + ChangeScript + "\" id=\"" + YearCtlID + "\" style=\"WIDTH: 60px\" name=\"Select1\">");
            for (int i = _DT.Year - 10; i <= _DT.Year + 10; i++)
            {
                if (i == _DT.Year)
                    writer.Write("<OPTION value=\"" + i + "\" selected>" + i + "</OPTION>");
                else
                    writer.Write("<OPTION value=\"" + i + "\">" + i + "</OPTION>");
            }
            writer.Write("</SELECT>");
            writer.Write("年<SELECT onpropertychange=\"" + ChangeScript + "\" id=\"" + MonthCtlID + "\" style=\"WIDTH: 40px\" name=\"Select1\">");
            for (int i = 1; i <= 12; i++)
            {
                if (i == _DT.Month)
                    writer.Write("<OPTION value=\"" + i + "\" selected>" + i + "</OPTION>");
                else
                    writer.Write("<OPTION value=\"" + i + "\">" + i + "</OPTION>");
            }
            writer.Write("</SELECT>月");
            writer.Write("</td>");
            writer.Write("</tr>");
            writer.Write("</table>");
            writer.Write("</td>");
            writer.Write("</tr>");
            writer.Write("<tr>");
            writer.Write("<td width=\"100%\" height=\"100%\" valign=\"top\">");
            writer.Write("<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse: collapse; font-size: 10pt\" bordercolor=\"#111111\" width=\"100%\" id=\"AutoNumber4\" height=\"100%\" bordercolorlight=\"#EEEEEE\" bordercolordark=\"#FFFFFF\">");
            writer.Write("<tr>");
            writer.Write("<td width=\"14%\" height=\"18\" align=\"center\" bgcolor=\"#808080\">");
            writer.Write("<p align=\"center\"><b><font color=\"#FFFFFF\" size=\"2\">日</font></b></td>");
            writer.Write("<td width=\"14%\" height=\"16\"  align=\"center\" bgcolor=\"#808080\"><b>");
            writer.Write("<font color=\"#FFFFFF\" size=\"2\">一</font></b></td>");
            writer.Write("<td width=\"14%\" height=\"16\" align=\"center\" bgcolor=\"#808080\"><b>");
            writer.Write("<font color=\"#FFFFFF\" size=\"2\">二</font></b></td>");
            writer.Write("<td width=\"14%\" height=\"16\" align=\"center\" bgcolor=\"#808080\"><b>");
            writer.Write("<font color=\"#FFFFFF\" size=\"2\">三</font></b></td>");
            writer.Write("<td width=\"14%\" height=\"16\" align=\"center\" bgcolor=\"#808080\"><b>");
            writer.Write("<font color=\"#FFFFFF\" size=\"2\">四</font></b></td>");
            writer.Write("<td width=\"15%\" height=\"16\" align=\"center\" bgcolor=\"#808080\"><b>");
            writer.Write("<font color=\"#FFFFFF\" size=\"2\">五</font></b></td>");
            writer.Write("<td width=\"15%\" height=\"16\" align=\"center\" bgcolor=\"#808080\"><b>");
            writer.Write("<font color=\"#FFFFFF\" size=\"2\">六</font></b></td>");
            writer.Write("</tr>");
            writer.Write("<tr>");
            System.Collections.IList list = CreateDate(_DT);
            for (int i = 1; i <= list.Count; i++)
            {
                DayItem item = (DayItem)list[i - 1];
                EventDayItemArgs e = new EventDayItemArgs(item);

                OnItemCreating(e);
                item.Reader(writer);
                if (i % 7 == 0)
                    writer.Write("<tr>");
            }
            writer.Write(@"   </table>
						</td>
					</tr>
			</table>");
        }

        #endregion
        private System.Collections.IList CreateDate(DateTime dt)
        {
            System.Collections.IList list = new System.Collections.ArrayList();
            DayItem item;
            DateTime tempdate = new DateTime(dt.Year, dt.Month, 1);
            int week = tempdate.DayOfWeek.GetHashCode();
            int index = 0;
            int days;

            if (week != 0)
            {
                DateTime prvd = tempdate.AddDays(-week);
                days = DateTime.DaysInMonth(prvd.Year, prvd.Month);
                for (int i = prvd.Day; i <= days; i++)
                {
                    item = new DayItem(new DateTime(prvd.Year, prvd.Month, i));
                    list.Add(item);
                    index++;

                }
            }
            days = DateTime.DaysInMonth(dt.Year, dt.Month);
            for (int i = 1; i <= days; i++)
            {
                item = new DayItem(new DateTime(dt.Year, dt.Month, i));
                list.Add(item);
                index++;

            }
            tempdate = new DateTime(dt.Year, dt.Month, days);
            week = tempdate.DayOfWeek.GetHashCode();
            if (week < 6)
            {
                DateTime next = tempdate.AddDays(6 - week);

                for (int i = 1; i <= 20; i++)
                {
                    item = new DayItem(new DateTime(next.Year, next.Month, i));
                    list.Add(item);
                    index++;
                    if (index % 7 == 0)
                    {
                        break;
                    }
                }
            }
            return list;

        }
    }
    public class Calendar : WebControl, IPostBackEventHandler
    {
        public event EventDayItemCreating DayItemCreating;
        protected virtual void OnDayItemCreating(EventDayItemArgs e)
        {
            if (DayItemCreating != null)
            {
                DayItemCreating(this, e);
            }
        }
        protected override void Render(HtmlTextWriter writer)
        {

            base.Render(writer);

        }
        protected override void RenderChildren(HtmlTextWriter writer)
        {
            //writer.Write("<table width=\"100%\" height=\"100%\"><tr><td width=\"100%\" height=\"100%\">");
            CalendarBuilder cb = null;
            if (ViewState["__ViewDate"] == null)
                cb = new CalendarBuilder(DateTime.Now);
            else
                cb = new CalendarBuilder((DateTime)ViewState["__ViewDate"]);

            cb.ItemCreating += new EventDayItemCreating(ItemCreating);
            cb.MonthCtlID = "_Month" + this.ClientID;
            cb.YearCtlID = "_Year" + this.ClientID;
            if (Page.Site == null || !Page.Site.DesignMode)
            {
                string url = "'" + Page.Request.Path + "?Calender_Change=open&Calendar_Value='+document.all('" + cb.YearCtlID + "').options[document.all('" + cb.YearCtlID + "').selectedIndex].value+'-'+document.all('" + cb.MonthCtlID + "').options[document.all('" + cb.MonthCtlID + "').selectedIndex].value+'-1'+'&Calendar_ctl="
                    + this.ClientID
                    + "'";

                string script = "SetCtlCalenderHtml(document.all('" + this.ClientID + "')," + url + ")";
                cb.ChangeScript = script;
            }

            cb.Reader(writer);

            //writer.Write("</td></tr></table>");
            base.RenderChildren(writer);
        }
        private void ItemCreating(object source, EventDayItemArgs e)
        {
            if (e.Item.Date.Month != e.CursorMonth)
            {
                e.Item.Attributes.Add("bgColor", "gainsboro");
            }
            if (IsPostBack)
            {
                e.Item.Attributes.Add("OnClick", Page.GetPostBackEventReference(this, e.Item.Date.ToShortDateString()));
            }
            OnDayItemCreating(e);
            if (e.Item.Attributes["style"] != null)
            {
                e.Item.Attributes["style"] = e.Item.Attributes["style"] + ";CURSOR: hand";
            }
            else
            {
                e.Item.Attributes.Add("style", "CURSOR: hand");
            }
        }
        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);
            if (Width == Unit.Empty)
            {
                Width = Unit.Parse("300");
            }
            if (Height == Unit.Empty)
            {
                Height = Unit.Parse("200");
            }
            if (Page.Site == null || !Page.Site.DesignMode)
            {
                Page.RegisterClientScriptBlock("__datescript", "<script language=javascript src=\"" + Page.Request.Path + "?calendar_getsource=script\"></script>");
            }
            if (Page.Site == null || !Page.Site.DesignMode)
            {
                if (Page.Request.QueryString["calendar_getsource"] != null)
                {
                    Page.Response.Clear();
                    Page.Response.BinaryWrite(CalendarBuilder.GetResource(Page.Request.QueryString["calendar_getsource"]));
                    Page.Response.Flush();
                    Page.Response.End();

                }
                if (Page.Request.QueryString["Calender_Change"] != null && Page.Request.QueryString["Calendar_ctl"] == this.ClientID)
                {
                    Page.Init += new EventHandler(PageInit);
                }
            }


        }
        private void PageInit(object source, EventArgs e)
        {
            ChangeDate(Page.Request.QueryString["Calender_Change"]);
        }
        private void ChangeDate(string type)
        {
            if (Page.Request.QueryString["Calendar_ctl"] == this.ClientID)
            {
                Page.Response.Clear();
                HtmlTextWriter writer = new HtmlTextWriter(Page.Response.Output);
                CalendarBuilder cb = new CalendarBuilder(DateTime.Parse(Page.Request.QueryString["Calendar_Value"]));
                cb.ItemCreating += new EventDayItemCreating(ItemCreating);
                cb.MonthCtlID = "_Month" + Page.Request.QueryString["Calendar_ctl"];
                cb.YearCtlID = "_Year" + Page.Request.QueryString["Calendar_ctl"];
                string url = "'" + Page.Request.Path + "?Calender_Change=open&Calendar_Value='+document.all('" + cb.YearCtlID + "').options[document.all('" + cb.YearCtlID + "').selectedIndex].value+'-'+document.all('" + cb.MonthCtlID + "').options[document.all('" + cb.MonthCtlID + "').selectedIndex].value+'-1'+'&Calendar_ctl="
                    + Page.Request.QueryString["Calendar_ctl"]
                    + "'";

                string script = "SetCtlCalenderHtml(document.all('" + Page.Request.QueryString["Calendar_ctl"] + "')," + url + ")";
                cb.ChangeScript = script;
                cb.Reader(writer);
                Page.Response.Flush();
                Page.Response.End();
            }

        }
        #region IPostBackEventHandler 成员
        public event EventDayChange Change;
        protected virtual void OnChange(EventDayChangeArgs e)
        {
            if (Change != null)
                Change(this, e);
        }
        public void RaisePostBackEvent(string eventArgument)
        {
            // TODO:  添加 Calendar.RaisePostBackEvent 实现
            EventDayChangeArgs e = new EventDayChangeArgs(DateTime.Parse(eventArgument));
            ViewState["__ViewDate"] = e.Date;
            OnChange(e);
        }
        public bool IsPostBack
        {
            get
            {
                if (ViewState["_IsPostBack"] == null)
                    return false;
                return (bool)ViewState["_IsPostBack"];
            }
            set
            {
                ViewState["_IsPostBack"] = value;
            }
        }

        #endregion
    }

    [DefaultEvent("Change")]
    public class DatePicker : WebControl, IPostBackEventHandler
    {
        #region IPostBackEventHandler 成员

        public event EventDayChange Change;
        protected virtual void OnChange(EventDayChangeArgs e)
        {
            if (Change != null)
                Change(this, e);
        }
        public void RaisePostBackEvent(string eventArgument)
        {
            // TODO:  添加 Calendar.RaisePostBackEvent 实现
            EventDayChangeArgs e = new EventDayChangeArgs(DateTime.Parse(eventArgument));
            OnChange(e);
        }
        public bool IsPostBack
        {
            get
            {
                if (ViewState["_IsPostBack"] == null)
                    return false;
                return (bool)ViewState["_IsPostBack"];
            }
            set
            {
                ViewState["_IsPostBack"] = value;
            }
        }

        #endregion
        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);
            if (Width == Unit.Empty)
            {
                Width = Unit.Parse("200");
            }
            if (Page.Site == null || !Page.Site.DesignMode)
            {
                if (Page.Request.QueryString["calendar_getsource"] != null)
                {
                    Page.Response.Clear();
                    Page.Response.BinaryWrite(CalendarBuilder.GetResource(Page.Request.QueryString["calendar_getsource"]));
                    Page.Response.Flush();
                    Page.Response.End();

                }
                Page.RegisterClientScriptBlock("__datescript", "<script language=javascript src=\"" + Page.Request.Path + "?calendar_getsource=script\"></script>");
                if (Page.Request.QueryString["Calender_Change"] != null && Page.Request.QueryString["Calendar_ctl"] == this.ClientID)
                {
                    Page.Init += new EventHandler(PageInit);
                }

                if (Page.Request["Date" + this.ClientID] != null)
                    ViewState["_DateValue"] = Page.Request["Date" + this.ClientID];
            }
        }
        private void PageInit(object source, EventArgs e)
        {
            ChangeDate(Page.Request.QueryString["Calender_Change"]);
        }
        private void ChangeDate(string type)
        {
            if (Page.Request.QueryString["Calendar_ctl"] == this.ClientID)
            {
                Page.Response.Clear();
                HtmlTextWriter writer = new HtmlTextWriter(Page.Response.Output);
                writer.Write("<DIV style=\"BORDER-RIGHT: black 1px solid;BORDER-TOP: black 1px solid;OVERFLOW: auto;BORDER-LEFT: black 1px solid;WIDTH: 100%;BORDER-BOTTOM: black 1px solid;HEIGHT: 100%\" >");
                DateTime dt;
                try
                {
                    dt = DateTime.Parse(Page.Request.QueryString["Calendar_Value"]);
                }
                catch
                {
                    dt = DateTime.Now;
                }
                CalendarBuilder cb = new CalendarBuilder(dt);
                cb.ItemCreating += new EventDayItemCreating(ItemCreating);
                cb.MonthCtlID = "_Month" + Page.Request.QueryString["Calendar_ctl"];
                cb.YearCtlID = "_Year" + Page.Request.QueryString["Calendar_ctl"];
                string url = "'" + Page.Request.Path + "?Calender_Change=open&Calendar_Value='+document.all('" + cb.YearCtlID + "').options[document.all('" + cb.YearCtlID + "').selectedIndex].value+'-'+document.all('" + cb.MonthCtlID + "').options[document.all('" + cb.MonthCtlID + "').selectedIndex].value+'-1'+'&Calendar_ctl="
                    + Page.Request.QueryString["Calendar_ctl"]
                    + "&Calendar_ValueCtl=" + Page.Request.QueryString["Calendar_ValueCtl"] + "&Calendar_Post=" + Page.Request.QueryString["Calendar_Post"] + "'";

                string script = "parent.SetCalenderWindow(" + url + ")";
                cb.ChangeScript = script;
                cb.Reader(writer);
                writer.Write("</div>");
                Page.Response.Flush();
                Page.Response.End();
            }

        }
        private void ItemCreating(object source, EventDayItemArgs e)
        {
            if (e.Item.Date.Month != e.CursorMonth)
            {
                e.Item.Attributes.Add("bgColor", "gainsboro");
            }
            OnDayItemCreating(e);
            if (e.Item.Attributes["style"] != null)
            {
                e.Item.Attributes["style"] = e.Item.Attributes["style"] + ";CURSOR: hand";
            }
            else
            {
                e.Item.Attributes.Add("style", "CURSOR: hand");
            }
            e.Item.Attributes.Add("onclick", "parent.document.all('" + Page.Request.QueryString["Calendar_ValueCtl"] + "').value='" + e.Item.Date.ToShortDateString() + "';parent.CalendaroPopup.hide();");
            bool post = bool.Parse(Page.Request.QueryString["Calendar_Post"]);
            if (post)
            {
                e.Item.Attributes.Add("OnClick", e.Item.Attributes["onclick"] + "parent." + Page.GetPostBackEventReference(this, e.Item.Date.ToShortDateString()));
            }
        }
        protected override void RenderChildren(HtmlTextWriter writer)
        {

            string click = "";
            if (Page.Site == null || !Page.Site.DesignMode)
            {
                click = "OpenCalenderWindow(document.all('" + this.ClientID + "'),'" + Page.Request.Path + "?Calender_Change=open&Calendar_Value='+document.all('Date" + this.ClientID + "').value+'&Calendar_ValueCtl=Date" + this.ClientID + "&Calendar_ctl=" + this.ClientID + "&Calendar_Post=" + this.IsPostBack + "')";


            }
            string _value = "";
            if (ViewState["_DateValue"] != null)
                _value = ViewState["_DateValue"].ToString();
            writer.Write("<TABLE id=\"Table1\" cellSpacing=\"0\" cellPadding=\"0\" width=\"100%\" border=\"0\">");
            writer.Write("<TR>");
            writer.Write("<TD width=\"99%\"><INPUT style=\"width:100%;BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: none\" id=\"Date" + this.ClientID + "\" type=\"text\" name=\"Date" + this.ClientID + "\" value=\"" + _value + "\"></TD>");
            writer.Write("<TD><INPUT onclick=\"" + click + "\" style=\"CURSOR: hand;BORDER-RIGHT: #ffffff 1px ridge; BORDER-TOP: #ffffff 1px ridge; BORDER-LEFT: #ffffff 1px ridge; BORDER-BOTTOM: #ffffff 1px ridge\"	id=\"Button1\" type=\"button\" value=\"...\" name=\"cmd" + this.ClientID + "\"></TD>");
            writer.Write(@"</TR>
			</TABLE>");
            base.RenderChildren(writer);
            Page.GetPostBackEventReference(this);
        }
        public event EventDayItemCreating DayItemCreating;
        protected virtual void OnDayItemCreating(EventDayItemArgs e)
        {
            if (DayItemCreating != null)
            {
                DayItemCreating(this, e);
            }
        }
        public string DateValue
        {
            get
            {
                if (ViewState["_DateValue"] == null)
                    return null;
                return ViewState["_DateValue"].ToString();
            }
            set
            {
                ViewState["_DateValue"] = value;
            }
        }
        /// <summary>
        /// 一年的第几周
        /// </summary>
        /// <param name="dTime"></param>
        /// <returns></returns>
        public   int ChinaWeek(DateTime dTime)
        {
            try
            {
                //确定此时间在一年中的位置  
                var dayOfYear = dTime.DayOfYear;
                //当年第一天  
                var tempDate = new DateTime(dTime.Year, 1, 1);
                //确定当年第一天  
                var tempDayOfWeek = (int)tempDate.DayOfWeek;
                tempDayOfWeek = tempDayOfWeek == 0 ? 7 : tempDayOfWeek;
                //确定星期几  
                var index = (int)dTime.DayOfWeek;
                index = index == 0 ? 7 : index;
                //当前周的范围  
                DateTime retStartDay = dTime.AddDays(-(index - 1));
                DateTime retEndDay = dTime.AddDays(7 - index);
                //确定当前是第几周  
                var weekIndex = (int)Math.Ceiling(((double)dayOfYear + tempDayOfWeek - 1) / 7);
                if (retStartDay.Year < retEndDay.Year)
                {
                    weekIndex = 1;
                }
                return weekIndex;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        /// <summary>
        ///  某日期是当月的第几周                                                              
        /// </summary>
        /// <param name="day"></param>
        /// <param name="WeekStart">1表示 周一至周日 为一周 2表示 周日至周六 为一周</param>
        /// <returns>错误返回值0  </returns>
        public static int WeekOfMonth(DateTime day, int WeekStart) 
        {
            DateTime FirstofMonth;
            FirstofMonth = Convert.ToDateTime(day.Date.Year + "-" + day.Date.Month + "-" + 1);
            int i = (int)FirstofMonth.Date.DayOfWeek;
            if (i == 0) {
                i = 7;
            }
            if (WeekStart == 1)
            {
                return (day.Date.Day + i - 2) / 7 + 1;
            }
            if (WeekStart == 2)
            {
                return (day.Date.Day + i - 1) / 7;
            }
            return 0;
        }
        /// <summary>
        /// 这个月有几周
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static int NumWeeks(DateTime dt)
        {
            //年
            int year = dt.Year;
            //月
            int month = dt.Month;
            //当前月第一天
            DateTime weekStart = new DateTime(year, month, 1);
            //该月的最后一天
            DateTime monEnd = weekStart.AddMonths(1).AddDays(-1);
            int i = 1;
            //当前月第一天是星期几
            int dayOfWeek = Convert.ToInt32(weekStart.DayOfWeek.ToString("d"));
            //该月第一周结束日期
            DateTime weekEnd = dayOfWeek == 0 ? weekStart : weekStart.AddDays(7 - dayOfWeek);

            //当日期小于或等于该月的最后一天
            while (weekEnd.AddDays(1) <= monEnd)
            {
                i++;
                //该周的开始时间
                weekStart = weekEnd.AddDays(1);
                //该周结束时间
                weekEnd = weekEnd.AddDays(7) > monEnd ? monEnd : weekEnd.AddDays(7);

            }
            return i;
        }
        /**/
        /// <summary>
        /// 求某年有多少周
        /// 返回 int
        /// </summary>
        /// <param name="strYear"></param>
        /// <returns>int</returns>
        public static int GetYearWeekCount(int strYear)
        {
            System.DateTime fDt = DateTime.Parse(strYear.ToString() + "-01-01");
            int k = Convert.ToInt32(fDt.DayOfWeek);//得到该年的第一天是周几 
            if (k == 1)
            {
                int countDay = fDt.AddYears(1).AddDays(-1).DayOfYear;
                int countWeek = countDay / 7 + 1;
                return countWeek;
            }
            else
            {
                int countDay = fDt.AddYears(1).AddDays(-1).DayOfYear;
                int countWeek = countDay / 7 + 2;
                return countWeek;
            }
        }
    }
}
