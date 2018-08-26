using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_MessageReply:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_MessageReply
	{
		public WX_MessageReply()
		{}
		#region Model
		private int _id;
		private string _keyword;
		private string _msgtype;
		private string _title;
		private string _description;
		private string _picurl;
		private string _newsurl;
		private string _musicurl;
		private string _hqmusicurl;
		private string _mediaid;
		private string _content;
        private string _class;
        private int? _order;
        private string _authurl;
        private string _tags;
        private int? _issreadweixinservice;
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
		public string KeyWord
		{
			set{ _keyword=value;}
			get{return _keyword;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string MsgType
		{
			set{ _msgtype=value;}
			get{return _msgtype;}
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
		public string Description
		{
			set{ _description=value;}
			get{return _description;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string PicUrl
		{
			set{ _picurl=value;}
			get{return _picurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string NewsUrl
		{
			set{ _newsurl=value;}
			get{return _newsurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string MusicURL
		{
			set{ _musicurl=value;}
			get{return _musicurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string HQMusicUrl
		{
			set{ _hqmusicurl=value;}
			get{return _hqmusicurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string MediaId
		{
			set{ _mediaid=value;}
			get{return _mediaid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Content
		{
			set{ _content=value;}
			get{return _content;}
		}
        /// <summary>
        /// 
        /// </summary>
        public string Class
        {
            set { _class = value; }
            get { return _class; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? Order
        {
            set { _order = value; }
            get { return _order; }
        }
        public string AuthUrl
        {
            set { _authurl = value; }
            get { return _authurl; }
        }
        public string Tags
        {
            set { _tags = value; }
            get { return _tags; }
        }
        /// <summary>
        /// 是否从微信服务器读数
        /// </summary>
        public int? IsReadWeixinService
        {
            set { _issreadweixinservice = value; }
            get { return _issreadweixinservice; }
        }
        public string AppId
        {
            set { _appid = value; }
            get { return _appid; }
        }
		#endregion Model

	}
}

