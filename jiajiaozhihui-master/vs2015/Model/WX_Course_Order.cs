using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Order:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Order
	{
		public WX_Course_Order()
		{}
		#region Model
		private int _id;
		private int _courseid;
		private string _openid;
		private string _tradeno;
		private DateTime? _orderdatetime;
		private int? _buynumber;
		private decimal? _price;
		private int? _salesplatform;
		private string _referrer;
		private string _remark;
		private string _name;
		private string _telephone;
		private int? _isact;
		private int? _isdel;
		private int? _ispay;
        private int? _ordertype;
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
		public string OpenId
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Tradeno
		{
			set{ _tradeno=value;}
			get{return _tradeno;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? OrderDateTime
		{
			set{ _orderdatetime=value;}
			get{return _orderdatetime;}
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
		public decimal? Price
		{
			set{ _price=value;}
			get{return _price;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? SalesPlatform
		{
			set{ _salesplatform=value;}
			get{return _salesplatform;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Referrer
		{
			set{ _referrer=value;}
			get{return _referrer;}
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
		public string Name
		{
			set{ _name=value;}
			get{return _name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Telephone
		{
			set{ _telephone=value;}
			get{return _telephone;}
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
		public int? IsDel
		{
			set{ _isdel=value;}
			get{return _isdel;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsPay
		{
			set{ _ispay=value;}
			get{return _ispay;}
		}
        public int? OrderType
        {
            set { _ordertype = value; }
            get { return _ordertype; }
        }
		#endregion Model

	}
}

