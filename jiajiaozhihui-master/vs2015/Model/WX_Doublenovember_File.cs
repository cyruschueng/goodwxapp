using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Doublenovember_File:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Doublenovember_File
	{
		public WX_Doublenovember_File()
		{}
		#region Model
		private int _id;
		private string _openid;
		private string _imgurl;
		private string _audiourl;
		private string _resume;
		private int? _like_number;
		private int? _view_number;
		private DateTime? _create_date;
		private DateTime? _last_date;
        private string _fileid;
        private int? _rank;
        private int? _stick;
        private string _owner;
        private int? _isact;
        private int? _commentnumber;
        private string _bookname;
        private int? _pagenumber;
        private int? _istop;
        private string _thumbnailimgurl;
        private string _imgcloudurl;
        private string _imgmediaid;
        private string _audiocloudurl;
        private string _audiomediaid;
        private string _audiofileid;
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
		public string OpenID
		{
			set{ _openid=value;}
			get{return _openid;}
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
		public string AudioUrl
		{
			set{ _audiourl=value;}
			get{return _audiourl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Resume
		{
			set{ _resume=value;}
			get{return _resume;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Like_Number
		{
			set{ _like_number=value;}
			get{return _like_number;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? View_Number
		{
			set{ _view_number=value;}
			get{return _view_number;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? Create_Date
		{
			set{ _create_date=value;}
			get{return _create_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? Last_Date
		{
			set{ _last_date=value;}
			get{return _last_date;}
		}

        /// <summary>
        /// 
        /// </summary>
        public string Fileid
        {
            set { _fileid = value; }
            get { return _fileid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? Rank
        {
            set { _rank = value; }
            get { return _rank; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? Stick
        {
            set { _stick = value; }
            get { return _stick; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Owner
        {
            set { _owner=value; }
            get { return _owner; }
        }

        public int? IsAct
        {
            set { _isact = value; }
            get { return _isact; }
        }
        public int? Comment_Number
        {
            set { _commentnumber = value; }
            get { return _commentnumber; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string BookName
        {
            set { _bookname = value; }
            get { return _bookname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? PageNumber
        {
            set { _pagenumber = value; }
            get { return _pagenumber; }
        }
        public int? IsTop
        {
            set { _istop = value; }
            get { return _istop; }
        }
        public string ThumbnailImgUrl
        {
            set { _thumbnailimgurl = value; }
            get { return _thumbnailimgurl; }
        }
        public string ImgCloudUrl
        {
            set { _imgcloudurl = value; }
            get { return _imgcloudurl; }
        }
        public string ImgMediaId
        {
            set { _imgmediaid = value; }
            get { return _imgmediaid; }
        }

        public string AudioCloudUrl
        {
            set { _audiocloudurl = value; }
            get { return _audiocloudurl; }
        }
        public string AudioMediaId
        {
            set { _audiomediaid = value; }
            get { return _audiomediaid; }
        }
        public string AudioFileId
        {
            set { _audiofileid = value; }
            get { return _audiofileid; }
        }
        
		#endregion Model
	}
}

