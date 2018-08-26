using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Timer:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Timer
	{
		public WX_Course_Timer()
		{}
		#region Model
		private int _courseid;
		private int? _plantype;
		private int? _repeattype;
		private int? _day;
		private string _week;
		private int? _weekofmonth;
		private int? _month;
		private int? _everyintervalhour;
		private string _unit;
		private string _starttime;
		private string _endtime;
		private DateTime? _startdatetime;
		private DateTime? _enddatetime;
        private int? _monthtype;
		/// <summary>
		/// 
		/// </summary>
		public int CourseId
		{
			set{ _courseid=value;}
			get{return _courseid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? PlanType
		{
			set{ _plantype=value;}
			get{return _plantype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? RepeatType
		{
			set{ _repeattype=value;}
			get{return _repeattype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Day
		{
			set{ _day=value;}
			get{return _day;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Week
		{
			set{ _week=value;}
			get{return _week;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? WeekOfMonth
		{
			set{ _weekofmonth=value;}
			get{return _weekofmonth;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Month
		{
			set{ _month=value;}
			get{return _month;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? EveryIntervalHour
		{
			set{ _everyintervalhour=value;}
			get{return _everyintervalhour;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Unit
		{
			set{ _unit=value;}
			get{return _unit;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string StartTime
		{
			set{ _starttime=value;}
			get{return _starttime;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string EndTime
		{
			set{ _endtime=value;}
			get{return _endtime;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? StartDateTime
		{
			set{ _startdatetime=value;}
			get{return _startdatetime;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? EndDateTime
		{
			set{ _enddatetime=value;}
			get{return _enddatetime;}
		}
        /// <summary>
        /// 
        /// </summary>
        public int? MonthType
        {
            set { _monthtype = value; }
            get { return _monthtype; }
        }
		#endregion Model

	}
}

