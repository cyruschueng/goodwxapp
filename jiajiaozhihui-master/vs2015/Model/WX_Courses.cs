using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Courses:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Courses
	{
		public WX_Courses()
		{}
		#region Model
		private int _id;
		private string _topic;
		private int? _sendstatus;
		private int? _area;
		private int? _arttype;
		private string _artcontent;
		private DateTime? _pubdate;
		private string _creator;
		private int? _enrollment;
		private string _twodimension;
		private string _modifier;
		private DateTime? _mtime;
		private int? _isshow;
		private int? _clicknum;
        private string _infodesc;
        private DateTime? _validitydate;
        private string _courseurl;
        private int? _isact;
        private int? _istele;
        private string _imgurl;
        private DateTime? _enddate;

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
		public string Topic
		{
			set{ _topic=value;}
			get{return _topic;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? SendStatus
		{
			set{ _sendstatus=value;}
			get{return _sendstatus;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Area
		{
			set{ _area=value;}
			get{return _area;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ArtType
		{
			set{ _arttype=value;}
			get{return _arttype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ArtContent
		{
			set{ _artcontent=value;}
			get{return _artcontent;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? PubDate
		{
			set{ _pubdate=value;}
			get{return _pubdate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Creator
		{
			set{ _creator=value;}
			get{return _creator;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Enrollment
		{
			set{ _enrollment=value;}
			get{return _enrollment;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string TwoDimension
		{
			set{ _twodimension=value;}
			get{return _twodimension;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string modifier
		{
			set{ _modifier=value;}
			get{return _modifier;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? mtime
		{
			set{ _mtime=value;}
			get{return _mtime;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsShow
		{
			set{ _isshow=value;}
			get{return _isshow;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ClickNum
		{
			set{ _clicknum=value;}
			get{return _clicknum;}
		}
        /// <summary>
        /// 
        /// </summary>
        public string InfoDesc
        {
            set { _infodesc = value; }
            get { return _infodesc; }
        }

        /// <summary>
        /// 
        /// </summary>
        public DateTime? ValidityDate
        {
            set { _validitydate = value; }
            get { return _validitydate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string CourseUrl
        {
            set { _courseurl = value; }
            get { return _courseurl; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? IsAct
        {
            set { _isact = value; }
            get { return _isact; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? IsTele
        {
            set { _istele = value; }
            get { return _istele; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string ImgUrl
        {
            set { _imgurl = value; }
            get { return _imgurl; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? EndDate
        {
            set { _enddate = value; }
            get { return _enddate; }
        }
		#endregion Model

	}
}

