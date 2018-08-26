using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Yuedu_Info:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Yuedu_Info
	{
		public WX_Yuedu_Info()
		{}
		#region Model
		private int _id;
		private string _appid;
		private string _title;
		private string _logourl;
		private string _introduction;
		private int? _normalnumber;
		private int? _activenumber;
		private DateTime? _createdate;
		private int? _status;
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
		public string AppId
		{
			set{ _appid=value;}
			get{return _appid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Title
		{
			set{ _title=value;}
			get{return _title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string LogoUrl
		{
			set{ _logourl=value;}
			get{return _logourl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Introduction
		{
			set{ _introduction=value;}
			get{return _introduction;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? NormalNumber
		{
			set{ _normalnumber=value;}
			get{return _normalnumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ActiveNumber
		{
			set{ _activenumber=value;}
			get{return _activenumber;}
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
		public int? Status
		{
			set{ _status=value;}
			get{return _status;}
		}
		#endregion Model

	}
}

