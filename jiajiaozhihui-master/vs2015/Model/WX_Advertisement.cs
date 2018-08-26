using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Advertisement:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Advertisement
	{
		public WX_Advertisement()
		{}
		#region Model
		private int _id;
		private string _name;
		private string _textcontent;
		private string _imgurl;
		private string _mediaurl;
		private string _positions;
		private string _own;
        private DateTime? _createdate;
        private string _resume;
        private int? _isact;
        private string _outerlink;
        private string _sharetitle;
        private string _sharedesc;
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
		public string Name
		{
			set{ _name=value;}
			get{return _name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string TextContent
		{
			set{ _textcontent=value;}
			get{return _textcontent;}
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
		public string MediaUrl
		{
			set{ _mediaurl=value;}
			get{return _mediaurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Positions
		{
			set{ _positions=value;}
			get{return _positions;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Own
		{
			set{ _own=value;}
			get{return _own;}
		}
        /// <summary>
		/// 
		/// </summary>
        public DateTime? CreateDate
		{
			set{ _createdate=value;}
            get { return _createdate; }
		}

        public string Resume
        {
            set { _resume=value; }
            get { return _resume; }
        }

        public int? IsAct
        {
            set { _isact = value; }
            get { return _isact; }
        }
        public string OuterLink
        {
            set { _outerlink = value; }
            get { return _outerlink; }
        }
        public string ShareTitle
        {
            set { _sharetitle = value; }
            get { return _sharetitle; }
        }
        public string ShareDesc
        {
            set { _sharedesc = value; }
            get { return _sharedesc; }
        }
		#endregion Model

	}
}

