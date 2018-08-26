using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_TestQuestion_Activity:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_TestQuestion_Activity
	{
		public WX_TestQuestion_Activity()
		{}
		#region Model
		private int _id;
		private string _activityname;
		private string _usingdata;
		private int? _usingnumber;
		private int? _onlinenumber;
		private int? _status;
		private string _allocation;
		private int? _pid;
		private DateTime? _createdate;
		private string _spid;
		private int? _isact;
		private int? _sort;
		private int? _inittakein;
		private DateTime? _startdate;
		private DateTime? _enddate;
		private string _readme;
		private string _sharetitle;
		private string _shareinfo;
		private string _appid;
		/// <summary>
		/// 
		/// </summary>
		public int ID
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ActivityName
		{
			set{ _activityname=value;}
			get{return _activityname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string UsingData
		{
			set{ _usingdata=value;}
			get{return _usingdata;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? UsingNumber
		{
			set{ _usingnumber=value;}
			get{return _usingnumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? OnlineNumber
		{
			set{ _onlinenumber=value;}
			get{return _onlinenumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Status
		{
			set{ _status=value;}
			get{return _status;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Allocation
		{
			set{ _allocation=value;}
			get{return _allocation;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Pid
		{
			set{ _pid=value;}
			get{return _pid;}
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
		public string SPid
		{
			set{ _spid=value;}
			get{return _spid;}
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
		public int? Sort
		{
			set{ _sort=value;}
			get{return _sort;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? InitTakeIn
		{
			set{ _inittakein=value;}
			get{return _inittakein;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? StartDate
		{
			set{ _startdate=value;}
			get{return _startdate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? EndDate
		{
			set{ _enddate=value;}
			get{return _enddate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Readme
		{
			set{ _readme=value;}
			get{return _readme;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ShareTitle
		{
			set{ _sharetitle=value;}
			get{return _sharetitle;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ShareInfo
		{
			set{ _shareinfo=value;}
			get{return _shareinfo;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string AppId
		{
			set{ _appid=value;}
			get{return _appid;}
		}
		#endregion Model

	}
}

