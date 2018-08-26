using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_class:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_class
	{
		public wx_class()
		{}
		#region Model
		private int _id;
		private string _class_area;
		private string _class_no;
		private string _class_name;
		private DateTime? _opening_date;
		private DateTime? _closing_date;
		private string _class_intro;
		private DateTime? _create_date;
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
		public string class_area
		{
			set{ _class_area=value;}
			get{return _class_area;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string class_no
		{
			set{ _class_no=value;}
			get{return _class_no;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string class_name
		{
			set{ _class_name=value;}
			get{return _class_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? opening_date
		{
			set{ _opening_date=value;}
			get{return _opening_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? closing_date
		{
			set{ _closing_date=value;}
			get{return _closing_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string class_intro
		{
			set{ _class_intro=value;}
			get{return _class_intro;}
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
		public int? is_act
		{
			set{ _is_act=value;}
			get{return _is_act;}
		}
		#endregion Model

	}
}

