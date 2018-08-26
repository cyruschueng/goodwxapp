using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_gardenia_user_detail:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_gardenia_user_detail
	{
		public wx_gardenia_user_detail()
		{}
		#region Model
		private string _openid;
		private string _parent_name;
		private int? _parent_age=0;
		private string _profession;
		private string _city;
		private string _child_sex;
		private int? _child_age=0;
		private string _child_grade;
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
		public string parent_name
		{
			set{ _parent_name=value;}
			get{return _parent_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? parent_age
		{
			set{ _parent_age=value;}
			get{return _parent_age;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string profession
		{
			set{ _profession=value;}
			get{return _profession;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string city
		{
			set{ _city=value;}
			get{return _city;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string child_sex
		{
			set{ _child_sex=value;}
			get{return _child_sex;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? child_age
		{
			set{ _child_age=value;}
			get{return _child_age;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string child_grade
		{
			set{ _child_grade=value;}
			get{return _child_grade;}
		}
		#endregion Model

	}
}

