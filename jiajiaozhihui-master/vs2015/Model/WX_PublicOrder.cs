using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_PublicOrder:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_PublicOrder
	{
		public WX_PublicOrder()
		{}
		#region Model
		private int _id;
		private string _openid;
		private int? _goodid;
		private string _name;
		private string _address;
		private string _telephone;
		private string _province;
		private string _city;
		private string _remark;
		private DateTime? _orderdate;
        private int? _goodstype;
        private int? _issend;
        private string _post;
        private string _logistics;
        private string _oddnumber;
        private float? _payment;
        private DateTime? _senddate;
        private int? _paymode;
        private decimal? _price;
        private int? _paynumber;
        private int? _activityid;
        private string  _tradeno; //支付订单号
        private int? _ispay;//是否支付
        private string _district;//区（南山区）
        private string _unit; //单位
        private string _logisticssn;//物流单号
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
		public int? GoodID
		{
			set{ _goodid=value;}
			get{return _goodid;}
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
		public string Address
		{
			set{ _address=value;}
			get{return _address;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string TelePhone
		{
			set{ _telephone=value;}
			get{return _telephone;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Province
		{
			set{ _province=value;}
			get{return _province;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string City
		{
			set{ _city=value;}
			get{return _city;}
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
		public DateTime? OrderDate
		{
			set{ _orderdate=value;}
			get{return _orderdate;}
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
        public int? IsSend
        {
            set { _issend = value; }
            get { return _issend; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Post
        {
            set { _post = value; }
            get { return _post; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Logistics
        {
            set { _logistics = value; }
            get { return _logistics; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string OddNumber
        {
            set { _oddnumber = value; }
            get { return _oddnumber; }
        }
        /// <summary>
        /// 
        /// </summary>
        public float? Payment
        {
            set { _payment = value; }
            get { return _payment; }
        }

        /// <summary>
        /// 
        /// </summary>
        public DateTime? SendDate
        {
            set { _senddate = value; }
            get { return _senddate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? Paymode
        {
            set { _paymode = value; }
            get { return _paymode; }
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal? Price
        {
            set { _price = value; }
            get { return _price; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? PayNumber
        {
            set { _paynumber = value; }
            get { return _paynumber; }
        }
        public int? ActivityID 
        {
            set { _activityid = value; }
            get { return _activityid; }
        }
        public string Tradeno
        {
            set { _tradeno = value; }
            get { return _tradeno; }
        }
        public int? IsPay
        {
            set { _ispay = value; }
            get { return _ispay; }
        }
        public string District
        {
            set { _district = value; }
            get { return _district; }
        }
        public string Unit
        {
            set { _unit = value; }
            get { return _unit; }
        }
        public string LogisticsSN
        {
            set { _logisticssn = value; }
            get { return _logisticssn; }
        }
		#endregion Model

	}
}

