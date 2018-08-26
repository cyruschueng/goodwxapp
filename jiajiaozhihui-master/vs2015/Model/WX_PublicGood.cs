using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_PublicGood:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_PublicGood
	{
		public WX_PublicGood()
		{}
		#region Model
		private int _id;
		private string _goodno;
		private string _goodname;
		private decimal? _marketprice;
		private decimal? _publicprice;
		private int? _number;
		private string _desc;
		private DateTime? _createdate;
		private string _creator;
        private int _buynumber;
        private string _infodesc;
        private DateTime? _validitydate;
        private int? _score;
        private int? _goodstype;
        private string _imgurl;
        private int? _isact;
        private int? _orderby;
        private DateTime? _startdate;
        private DateTime? _enddate;
        private decimal? _discount;
        private decimal? _depreciate;
        private string _goodslink;
        private string _exchange;//作为等量交换产品的（如：1000金币换些产品）
        private int? _goodclass; //实体类(1)，虚拟类(0)
        private int? _isrecommend;
        private int? _isonlinepayment;
        private int? _isrosebery;
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
		public string GoodNo
		{
			set{ _goodno=value;}
			get{return _goodno;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string GoodName
		{
			set{ _goodname=value;}
			get{return _goodname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? MarketPrice
		{
			set{ _marketprice=value;}
			get{return _marketprice;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? PublicPrice
		{
			set{ _publicprice=value;}
			get{return _publicprice;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Number
		{
			set{ _number=value;}
			get{return _number;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Desc
		{
			set{ _desc=value;}
			get{return _desc;}
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
		public string Creator
		{
			set{ _creator=value;}
			get{return _creator;}
		}
        /// <summary>
        /// 
        /// </summary>
        public int BuyNumber
        {
            set { _buynumber = value; }
            get { return _buynumber; }
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
        public int? Score
        {
            set { _score = value; }
            get { return _score; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? GoodsType
        {
            set { _goodstype = value; }
            get { return _goodstype; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string  ImgURL
        {
            set { _imgurl = value; }
            get { return _imgurl; }
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
        public int? OrderBy
        {
            set { _orderby = value; }
            get { return _orderby; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? StartDate
        {
            set { _startdate = value; }
            get { return _startdate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? EndDate
        {
            set { _enddate = value; }
            get { return _enddate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal? Discount
        {
            set { _discount = value; }
            get { return _discount; }
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal? Depreciate
        {
            set { _depreciate = value; }
            get { return _depreciate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string GoodsLink
        {
            set { _goodslink = value; }
            get { return _goodslink; }
        }
        public string Exchange
        {
            set { _exchange = value; }
            get { return _exchange; }
        }
        public int? GoodClass
        {
            set { _goodclass = value; }
            get { return _goodclass; }
        }

        /// <summary>
        /// 是否显示在订单的相关产品中,这里粉丝福利中将不会显示出来
        /// </summary>
        public int? IsRecommend
        {
            set { _isrecommend = value; }
            get { return _isrecommend; }
        }
        /// <summary>
        /// 是否支持在线支付
        /// </summary>
        public int? IsOnlinePayment
        {
            set { _isonlinepayment = value; }
            get { return _isonlinepayment; }
        }
        /// <summary>
        /// 是否支持货到付款
        /// </summary>
        public int? IsRosebery
        {
            set { _isrosebery = value; }
            get { return _isrosebery; }
        }

		#endregion Model
	}
}

