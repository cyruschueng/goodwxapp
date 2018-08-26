using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Lecturer:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Lecturer
	{
		public WX_Course_Lecturer()
		{}
		#region Model
		private int _id;
		private string _name;
		private string _intro;
		private string _detail;
		private string _postion;
		private string _department;
		private DateTime? _createdate;
		private string _headimgurl;
		/// <summary>
		/// 
		/// </summary>
		public int Id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Name
		{
			set{ _name=value;}
			get{return _name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Intro
		{
			set{ _intro=value;}
			get{return _intro;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Detail
		{
			set{ _detail=value;}
			get{return _detail;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Postion
		{
			set{ _postion=value;}
			get{return _postion;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string DepartMent
		{
			set{ _department=value;}
			get{return _department;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string HeadImgUrl
		{
			set{ _headimgurl=value;}
			get{return _headimgurl;}
		}
		#endregion Model

	}
}

