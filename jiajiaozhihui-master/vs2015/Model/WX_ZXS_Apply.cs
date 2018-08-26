using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_ZXS_Apply:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_ZXS_Apply
	{
		public WX_ZXS_Apply()
		{}
		#region Model
		private string _appid;
		private string _openid;
		private int _applytype;
		private DateTime? _startdate;
		private DateTime? _enddate;
		private decimal? _margin;
		private int? _themenumber;
		private int? _unopennumber;
		private string _currtask;
		private decimal? _losemargin;
		private string _reason;
		private int? _state;
		private string _feedback;
		private DateTime? _createdate;
		private DateTime? _checkdate;
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
		public string OpenId
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int ApplyType
		{
			set{ _applytype=value;}
			get{return _applytype;}
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
		public decimal? Margin
		{
			set{ _margin=value;}
			get{return _margin;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ThemeNumber
		{
			set{ _themenumber=value;}
			get{return _themenumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? UnOpenNumber
		{
			set{ _unopennumber=value;}
			get{return _unopennumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string CurrTask
		{
			set{ _currtask=value;}
			get{return _currtask;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? LoseMargin
		{
			set{ _losemargin=value;}
			get{return _losemargin;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Reason
		{
			set{ _reason=value;}
			get{return _reason;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? State
		{
			set{ _state=value;}
			get{return _state;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Feedback
		{
			set{ _feedback=value;}
			get{return _feedback;}
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
		public DateTime? CheckDate
		{
			set{ _checkdate=value;}
			get{return _checkdate;}
		}
		#endregion Model

	}
}

