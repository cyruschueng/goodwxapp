using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Topic:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Topic
	{
		public WX_Topic()
		{}
		#region Model
		private int _id;
		private string _titel;
		private string _imgurl;
		private string _videourl;
		private int? _tag;
		private int? _orderby;
		private int? _istop;
		private int? _isrecommend;
		private int? _isact;
		private int? _replaynumber;
		private int? _viewnumber;
		private int? _sharenumber;
		private int? _supportnnumber;
		private int? _replayid;
		private string _openid;
		private DateTime? _createdate;
		private string _createid;
		private string _creator;
        private string _headerimgurl;
        private string _details;
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
		public string Titel
		{
			set{ _titel=value;}
			get{return _titel;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ImgUrl
		{
			set{ _imgurl=value;}
			get{return _imgurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string VideoUrl
		{
			set{ _videourl=value;}
			get{return _videourl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Tag
		{
			set{ _tag=value;}
			get{return _tag;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? OrderBy
		{
			set{ _orderby=value;}
			get{return _orderby;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsTop
		{
			set{ _istop=value;}
			get{return _istop;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsRecommend
		{
			set{ _isrecommend=value;}
			get{return _isrecommend;}
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
		public int? ReplayNumber
		{
			set{ _replaynumber=value;}
			get{return _replaynumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ViewNumber
		{
			set{ _viewnumber=value;}
			get{return _viewnumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ShareNumber
		{
			set{ _sharenumber=value;}
			get{return _sharenumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? SupportNnumber
		{
			set{ _supportnnumber=value;}
			get{return _supportnnumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ReplayID
		{
			set{ _replayid=value;}
			get{return _replayid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Openid
		{
			set{ _openid=value;}
			get{return _openid;}
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
		public string CreateID
		{
			set{ _createid=value;}
			get{return _createid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Creator
		{
			set{ _creator=value;}
			get{return _creator;}
		}
        public string HeaderImgUrl
        {
            set { _headerimgurl = value; }
            get { return _headerimgurl; }
        }
        public string Details
        {
            set { _details = value; }
            get { return _details; }
        }

		#endregion Model

	}
}

