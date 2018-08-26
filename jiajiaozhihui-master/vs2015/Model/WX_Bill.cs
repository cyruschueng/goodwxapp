using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Bill:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Bill
	{
		public WX_Bill()
		{}
		#region Model
		private int _id;
		private string _mchid;
		private string _tradeno;
		private string _orderid;
		private int? _billtype;
		private decimal? _amount;
		private DateTime? _paymenttime;
		private int? _paytype;
		private string _remark;
		private DateTime? _createdate;
        private string _openid;
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
		public string MchId
		{
			set{ _mchid=value;}
			get{return _mchid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string TradeNo
		{
			set{ _tradeno=value;}
			get{return _tradeno;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string OrderId
		{
			set{ _orderid=value;}
			get{return _orderid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? BillType
		{
			set{ _billtype=value;}
			get{return _billtype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? Amount
		{
			set{ _amount=value;}
			get{return _amount;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? PaymentTime
		{
			set{ _paymenttime=value;}
			get{return _paymenttime;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? PayType
		{
			set{ _paytype=value;}
			get{return _paytype;}
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
        /// <summary>
        /// 
        /// </summary>
        public string OpenId
        {
            set { _openid = value; }
            get { return _openid; }
        }

		#endregion Model

	}
}

