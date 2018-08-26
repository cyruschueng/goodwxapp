using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Article_Release:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Article_Release
	{
		public WX_Article_Release()
		{}
		#region Model
		private int _id;
		private string _caption;
		private string _resume;
		private string _detail;
		private string _coverurl;
		private DateTime? _createdate;
		private int? _isact;
        private DateTime? _releasedate;
        private string _shareimg;
        private string _sharetitle;
        private string _sharecontent;

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
		public string Caption
		{
			set{ _caption=value;}
			get{return _caption;}
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
		public string Detail
		{
			set{ _detail=value;}
			get{return _detail;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string CoverUrl
		{
			set{ _coverurl=value;}
			get{return _coverurl;}
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
		public int? IsAct
		{
			set{ _isact=value;}
			get{return _isact;}
		}
        public DateTime? ReleaseDate
        {
            set { _releasedate = value; }
            get { return _releasedate; }
        }
        public string ShareImg
        {
            set { _shareimg = value; }
            get { return _shareimg; }
        }
        public string ShareTitle
        {
            set { _sharetitle = value; }
            get { return _sharetitle; }
        }
        public string ShareContent
        {
            set { _sharecontent = value; }
            get { return _sharecontent; }
        }
		#endregion Model

	}
}

