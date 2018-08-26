using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_WeiXinAccounts:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_WeiXinAccounts
	{
		public WX_WeiXinAccounts()
		{}
		#region Model
		private int _id;
		private string _weixinid;
		private string _appid;
		private string _appsect;
		private string _weixinname;
		private string _remark;
        private string _refresh_token;
        private int? _expiresin;
        private DateTime? _gettokendate;
        
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
		public string WeiXinID
		{
			set{ _weixinid=value;}
			get{return _weixinid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string AppID
		{
			set{ _appid=value;}
			get{return _appid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string AppSect
		{
			set{ _appsect=value;}
			get{return _appsect;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string WeiXinName
		{
			set{ _weixinname=value;}
			get{return _weixinname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Remark
		{
			set{ _remark=value;}
			get{return _remark;}
		}
        public string Refresh_token
        {
            set { _refresh_token = value; }
            get { return _refresh_token; }
        }
        public int? ExpiresIn
        {
            set { _expiresin = value; }
            get { return _expiresin; }
        }
        public DateTime? GetTokenDate
        {
            set { _gettokendate = value; }
            get { return _gettokendate; }
        }
        
		#endregion Model

	}
}

