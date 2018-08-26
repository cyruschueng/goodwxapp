using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Comment:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Comment
	{
		public WX_Comment()
		{}
		#region Model
		private int _id;
		private int? _topicid;
		private string _details;
		private int? _isact;
		private string _openid;
		private string _nickname;
		private DateTime? _createdate;
		private string _imgurls;
		private int? _commenttype;
		private string _toopenid;
        private string _headerimgurl;
        private int? _toid;
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
		public int? TopicID
		{
			set{ _topicid=value;}
			get{return _topicid;}
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
		public int? IsAct
		{
			set{ _isact=value;}
			get{return _isact;}
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
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ImgUrls
		{
			set{ _imgurls=value;}
			get{return _imgurls;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? CommentType
		{
			set{ _commenttype=value;}
			get{return _commenttype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ToOpenid
		{
			set{ _toopenid=value;}
			get{return _toopenid;}
		}

        public string HeaderImgUrl
        {
            set { _headerimgurl = value; }
            get { return _headerimgurl; }
        }
        public int? ToID
        {
            set { _toid = value; }
            get { return _toid; }
        }
		#endregion Model

	}
}

