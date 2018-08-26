using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_JingHua:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_JingHua
	{
		public WX_JingHua()
		{}
		#region Model
		private int _id;
		private string _title;
		private string _articleurl;
		private string _imgurl;
		private string _grouptitle;
		private int? _order;
		private DateTime? _createdate;
        private int? _ishead;
        private int? _articletype;
        private int? _year;
        private int? _month;
        private int? _week;
        private string _detail;
        private DateTime? _releasedate;

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
		public string Title
		{
			set{ _title=value;}
			get{return _title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ArticleUrl
		{
			set{ _articleurl=value;}
			get{return _articleurl;}
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
		public string GroupTitle
		{
			set{ _grouptitle=value;}
			get{return _grouptitle;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Order
		{
			set{ _order=value;}
			get{return _order;}
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
        public int? IsHead
        {
            set { _ishead = value; }
            get { return _ishead; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? ArticleType
        {
            set { _articletype = value; }
            get { return _articletype; }
        }

        /// <summary>
        /// 
        /// </summary>
        public int? Year
        {
            set { _year = value; }
            get { return _year; }
        }

        /// <summary>
        /// 
        /// </summary>
        public int? Month
        {
            set { _month = value; }
            get { return _month; }
        }

        /// <summary>
        /// 
        /// </summary>
        public int? Week
        {
            set { _week = value; }
            get { return _week; }
        }
        public string Detail
        {
            set { _detail = value; }
            get { return _detail; }
        }

        public DateTime? ReleaseDate
        {
            set { _releasedate = value; }
            get { return _releasedate; }
        }
		#endregion Model

	}
}

