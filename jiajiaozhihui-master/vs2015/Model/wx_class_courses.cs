using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_class_courses:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_class_courses
	{
		public wx_class_courses()
		{}
		#region Model
		private int _id;
		private int _class_id;
		private int _scource_id;
		private string _role;
		private DateTime? _starting_date;
		private int? _year;
		private int? _month;
		private int? _day;
		private int? _week;
		private int? _is_act=1;
		private int? _is_public=0;
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
		public int class_id
		{
			set{ _class_id=value;}
			get{return _class_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int scource_id
		{
			set{ _scource_id=value;}
			get{return _scource_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string role
		{
			set{ _role=value;}
			get{return _role;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? starting_date
		{
			set{ _starting_date=value;}
			get{return _starting_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? year
		{
			set{ _year=value;}
			get{return _year;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? month
		{
			set{ _month=value;}
			get{return _month;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? day
		{
			set{ _day=value;}
			get{return _day;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? week
		{
			set{ _week=value;}
			get{return _week;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? is_act
		{
			set{ _is_act=value;}
			get{return _is_act;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? is_public
		{
			set{ _is_public=value;}
			get{return _is_public;}
		}
		#endregion Model

	}
}

