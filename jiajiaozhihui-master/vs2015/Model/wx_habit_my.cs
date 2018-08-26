using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_habit_my:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_habit_my
	{
		public wx_habit_my()
		{}
		#region Model
		private int _id;
		private string _appid;
		private int _habit_id;
		private string _openid;
		private int? _alarm_clock_on=0;
		private string _alarm_time;
		private string _alarm_weeks;
		private int _target;
		private int? _finish;
		private DateTime _start_date;
		private DateTime? _create_date= DateTime.Now;
		private int? _is_recommend=0;
		private int? _is_top=0;
		private int? _is_act=1;
		/// <summary>
		/// 
		/// </summary>
		public int id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string appid
		{
			set{ _appid=value;}
			get{return _appid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int habit_id
		{
			set{ _habit_id=value;}
			get{return _habit_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string openid
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? alarm_clock_on
		{
			set{ _alarm_clock_on=value;}
			get{return _alarm_clock_on;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string alarm_time
		{
			set{ _alarm_time=value;}
			get{return _alarm_time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string alarm_weeks
		{
			set{ _alarm_weeks=value;}
			get{return _alarm_weeks;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int target
		{
			set{ _target=value;}
			get{return _target;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? finish
		{
			set{ _finish=value;}
			get{return _finish;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime start_date
		{
			set{ _start_date=value;}
			get{return _start_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? create_date
		{
			set{ _create_date=value;}
			get{return _create_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? is_recommend
		{
			set{ _is_recommend=value;}
			get{return _is_recommend;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? is_top
		{
			set{ _is_top=value;}
			get{return _is_top;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? is_act
		{
			set{ _is_act=value;}
			get{return _is_act;}
		}
		#endregion Model

	}
}

