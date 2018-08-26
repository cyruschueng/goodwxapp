using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Content:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Content
	{
		public WX_Course_Content()
		{}
		#region Model
		private int _id;
		private int _courseid;
		private int? _type;
		private decimal? _duration;
		private string _url;
		private string _content;
		private int? _sn;
		private int? _isact;
        private int? _isiframe;
        private string _cover;
        private string _responsive;
        private string _sectionid;
        private string _roles;
        private string _cname;
        private DateTime? _createdate;
        private int? _interval;
        private int? _already;
        private int? _atonceshow;

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
		public int CourseId
		{
			set{ _courseid=value;}
			get{return _courseid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Type
		{
			set{ _type=value;}
			get{return _type;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? Duration
		{
			set{ _duration=value;}
			get{return _duration;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Url
		{
			set{ _url=value;}
			get{return _url;}
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
		public int? Sn
		{
			set{ _sn=value;}
			get{return _sn;}
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
        public int? Isiframe
        {
            set { _isiframe = value; }
            get { return _isiframe; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Cover
        {
            set { _cover  = value; }
            get { return _cover; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Responsive
        {
            set { _responsive = value; }
            get { return _responsive; }
        }
        public string SectionId
        {
            set { _sectionid = value; }
            get { return _sectionid; }
        }

        public string Roles
        {
            set { _roles = value; }
            get { return _roles; }
        }

        public string Cname
        {
            set { _cname = value; }
            get { return _cname; }
        }

        public DateTime? CreateDate
        {
            set { _createdate = value; }
            get { return _createdate; }
        }
        public int? Interval
        {
            set { _interval = value; }
            get { return _interval; }
        }

        public int? Already
        {
            set { _already = value; }
            get { return _already; }
        }
        public int? AtOnceShow
        {
            set { _atonceshow = value; }
            get { return _atonceshow; }
        }
		#endregion Model

	}
}

