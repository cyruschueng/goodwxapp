using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Card:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Card
	{
		public WX_Course_Card()
		{}
		#region Model
		private int _id;
		private int _bagid;
		private DateTime? _startdate;
		private DateTime? _enddate;
		private string _title;
		private string _detail;
		private int? _quantity;
		private string _remark;
		private DateTime? _createdate;
        private string _cardtype;
        private int? _isact;
        private string _imgurl;
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
		public int BagId
		{
			set{ _bagid=value;}
			get{return _bagid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? StartDate
		{
			set{ _startdate=value;}
			get{return _startdate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? EndDate
		{
			set{ _enddate=value;}
			get{return _enddate;}
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
		public string Detail
		{
			set{ _detail=value;}
			get{return _detail;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Quantity
		{
			set{ _quantity=value;}
			get{return _quantity;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Remark
		{
			set{ _remark=value;}
			get{return _remark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}

        public string CardType
        {
            set { _cardtype = value; }
            get { return _cardtype; }
        }

        public int? IsAct
        {
            set { _isact = value; }
            get { return _isact; }
        }
        public string ImgUrl
        {
            set { _imgurl = value; }
            get { return _imgurl; }
        }
        
		#endregion Model

	}
}

