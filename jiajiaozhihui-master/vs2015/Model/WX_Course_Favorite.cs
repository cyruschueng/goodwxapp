using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Favorite:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Favorite
	{
		public WX_Course_Favorite()
		{}
		#region Model
		private int _courseid;
		private string _openid;
		private int? _isact;
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
		public string OpenId
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsAct
		{
			set{ _isact=value;}
			get{return _isact;}
		}
		#endregion Model

	}
}

