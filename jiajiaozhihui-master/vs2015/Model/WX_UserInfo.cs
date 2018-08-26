using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_UserInfo:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_UserInfo
	{
		public WX_UserInfo()
		{}
		#region Model
		private string _openid;
		private string _nickname;
		private string _headimgurl;
		private string _province;
		private string _city;
		private string _sex;
		private DateTime? _registdate;
        private int? _issubscibe;
        private DateTime? _editedate;
        private string _appid;

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
		public string NickName
		{
			set{ _nickname=value;}
			get{return _nickname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string HeadImgUrl
		{
			set{ _headimgurl=value;}
			get{return _headimgurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Province
		{
			set{ _province=value;}
			get{return _province;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string City
		{
			set{ _city=value;}
			get{return _city;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Sex
		{
			set{ _sex=value;}
			get{return _sex;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? RegistDate
		{
			set{ _registdate=value;}
			get{return _registdate;}
		}
        public int? IsSubscibe
        {
            set { _issubscibe = value; }
            get { return _issubscibe; }
        }
        public DateTime? EditeDate
        {
            set { _editedate = value; }
            get { return _editedate; }
        }
        public string AppId
        {
            set { _appid = value; }
            get { return _appid; }
        }
        #endregion Model

    }
}

