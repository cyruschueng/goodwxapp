using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Config:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Config
	{
		public WX_Course_Config()
		{}
		#region Model
		private int _courseid;
		private int _gxdritemid;
		private int _guwenid;
		private string _zxsappid;
		private string _zxshash;
		private int _zxsthemeid;
		private string _zxstitle;
		private int? _isact;
		private DateTime? _createdate;
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
		public int GxdrItemId
		{
			set{ _gxdritemid=value;}
			get{return _gxdritemid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int GuwenId
		{
			set{ _guwenid=value;}
			get{return _guwenid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ZxsAppId
		{
			set{ _zxsappid=value;}
			get{return _zxsappid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ZxsHash
		{
			set{ _zxshash=value;}
			get{return _zxshash;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int ZxsThemeId
		{
			set{ _zxsthemeid=value;}
			get{return _zxsthemeid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ZxsTitle
		{
			set{ _zxstitle=value;}
			get{return _zxstitle;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsAct
		{
			set{ _isact=value;}
			get{return _isact;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}
		#endregion Model

	}
}

