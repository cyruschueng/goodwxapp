using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_SetBag:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_SetBag
	{
		public WX_Course_SetBag()
		{}
		#region Model
		private int _id;
		private string _bagname;
		private string _imgurl;
		private int? _isact;
		private DateTime? _createdate;
		private int? _lecturer;
		private string _intro;
		private string _details;
		private decimal? _originalprice;
		private decimal? _preferentialprice;
		private int? _buynumber;
		private int? _buynumber1;
		private int? _readnumber;
        private string _miniimgurl;
        private int? _mediatype;
        private string _teachers;
        private string _subname;
        private DateTime? _validdate;

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
		public string BagName
		{
			set{ _bagname=value;}
			get{return _bagname;}
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
		public int? IsAct
		{
			set{ _isact=value;}
			get{return _isact;}
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
		public int? Lecturer
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
		public int? ReadNumber
		{
			set{ _readnumber=value;}
			get{return _readnumber;}
		}
        /// <summary>
        /// 
        /// </summary>
        public string MiniImgUrl
        {
            set { _miniimgurl = value; }
            get { return _miniimgurl; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? MediaType
        {
            set { _mediatype = value; }
            get { return _mediatype; }
        }

        public string Teachers
        {
            set { _teachers = value; }
            get { return _teachers; }
        }

        public string SubName
        {
            set { _subname = value; }
            get { return _subname; }
        }

        public DateTime? ValidDate
        {
            set { _validdate = value; }
            get { return _validdate; }
        }
		#endregion Model

	}
}

