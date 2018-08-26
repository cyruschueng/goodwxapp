using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_ShowPhoto:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_ShowPhoto
	{
		public WX_ShowPhoto()
		{}
		#region Model
		private int _id;
		private int? _activityid;
		private string _openid;
		private string _nickname;
		private string _headimgurl;
		private string _uploadimgurl;
		private DateTime? _createdate;
        private int? _sharenumber;
        private int? _isupload;
        private int? _province;
        private int? _city;
        private string _address;
        private string _telphone;
        private string _username;
        private int? _issend;

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
		public int? ActivityID
		{
			set{ _activityid=value;}
			get{return _activityid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string OpenID
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
		public string UpLoadImgUrl
		{
			set{ _uploadimgurl=value;}
			get{return _uploadimgurl;}
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
        public int? ShareNumber
        {
            set { _sharenumber = value; }
            get { return _sharenumber; }
        }

        /// <summary>
        /// 
        /// </summary>
        public int? IsUpload
        {
            set { _isupload = value; }
            get { return _isupload; }
        }

        /// <summary>
        /// 
        /// </summary>
        public int? Province
        {
            set { _province = value; }
            get { return _province; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? City
        {
            set { _city = value; }
            get { return _city; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string Address
        {
            set { _address = value; }
            get { return _address; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string Telephone
        {
            set { _telphone = value; }
            get { return _telphone; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string UserName
        {
            set { _username = value; }
            get { return _username; }
        }

        public int? IsSend
        {
            set { _issend = value; }
            get { return _issend; }
        }
		#endregion Model

	}
}

