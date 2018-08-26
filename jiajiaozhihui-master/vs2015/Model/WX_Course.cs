using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course
	{
		public WX_Course()
		{}
		#region Model
		private int _id;
		private int? _parentid;
		private int? _providerid;
		private string _imgurl;
		private decimal? _duration;
		private string _lecturer;
		private string _intro;
		private string _details;
		private string _reward;
		private decimal? _originalprice;
		private decimal? _preferentialprice;
		private int? _buynumber;
		private int? _buynumber1;
		private int? _learnnumber;
		private DateTime? _onlinedatetime;
		private int? _salestate;
		private int? _learnstate;
		private string _learndate;
		private int? _commentstate;
		private string _name;
        private int? _theme;
        private DateTime? _start;
        private DateTime? _end;
        private int? _coursetype;
        private int? _isfree;
        private int? _isbags;
        private string _miniimgurl;
        private int? _mediatype;
        private string _exercisesid;

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
		public int? ParentId
		{
			set{ _parentid=value;}
			get{return _parentid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ProviderId
		{
			set{ _providerid=value;}
			get{return _providerid;}
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
		public decimal? Duration
		{
			set{ _duration=value;}
			get{return _duration;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Lecturer
		{
			set{ _lecturer=value;}
			get{return _lecturer;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Intro
		{
			set{ _intro=value;}
			get{return _intro;}
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
		public string Reward
		{
			set{ _reward=value;}
			get{return _reward;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? OriginalPrice
		{
			set{ _originalprice=value;}
			get{return _originalprice;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? PreferentialPrice
		{
			set{ _preferentialprice=value;}
			get{return _preferentialprice;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? BuyNumber
		{
			set{ _buynumber=value;}
			get{return _buynumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? BuyNumber1
		{
			set{ _buynumber1=value;}
			get{return _buynumber1;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? LearnNumber
		{
			set{ _learnnumber=value;}
			get{return _learnnumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? OnLineDateTime
		{
			set{ _onlinedatetime=value;}
			get{return _onlinedatetime;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? SaleState
		{
			set{ _salestate=value;}
			get{return _salestate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? LearnState
		{
			set{ _learnstate=value;}
			get{return _learnstate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string LearnDate
		{
			set{ _learndate=value;}
			get{return _learndate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? CommentState
		{
			set{ _commentstate=value;}
			get{return _commentstate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Name
		{
			set{ _name=value;}
			get{return _name;}
		}
        public int? Theme
        {
            set { _theme = value; }
            get { return _theme; }
        }

        /// <summary>
        /// 
        /// </summary>
        public DateTime? Start
        {
            set { _start = value; }
            get { return _start; }
        }

        /// <summary>
        /// 
        /// </summary>
        public DateTime? End
        {
            set { _end = value; }
            get { return _end; }
        }
        public int? CourseType
        {
            set { _coursetype = value; }
            get { return _coursetype; }
        }
        public int? IsFree
        {
            set { _isfree = value; }
            get { return _isfree; }
        }
        public int? IsBags
        {
            set { _isbags = value; }
            get { return _isbags; }
        }
        public string MiniImgUrl
        {
            set { _miniimgurl = value; }
            get { return _miniimgurl; }
        }
        public int? MediaType
        {
            set { _mediatype = value; }
            get { return _mediatype; }
        }

        public string ExercisesId
        {
            set { _exercisesid = value; }
            get { return _exercisesid; }
        }
        #endregion Model

    }
}

