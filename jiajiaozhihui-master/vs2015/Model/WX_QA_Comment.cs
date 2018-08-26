using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_QA_Comment:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_QA_Comment
	{
		public WX_QA_Comment()
		{}
		#region Model
		private int _id;
		private string _appid;
		private int? _readfileid;
		private string _openid;
		private string _details;
		private string _nickname;
		private string _headimgurl;
        private DateTime? _createdate;
        private int? _experttype;
        private string _sex;
        private int? _expertid;
        private int? _isagent;
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
		public int? ReadFileId
		{
			set{ _readfileid=value;}
			get{return _readfileid;}
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
		public string Details
		{
			set{ _details=value;}
			get{return _details;}
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
        public DateTime? CreateDate
        {
            set { _createdate = value; }
            get { return _createdate; }
        }

        public int? ExpertType
        {
            set { _experttype = value; }
            get { return _experttype; }
        }
        public string Sex
        {
            set { _sex = value; }
            get { return _sex; }
        }
        public int? ExpertId
        {
            set { _expertid = value; }
            get { return _expertid; }
        }
        public int? IsAgent
        {
            set { _isagent = value; }
            get { return _isagent; }
        }
        #endregion Model

    }
}

