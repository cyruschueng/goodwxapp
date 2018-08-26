using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_WarrantyCard:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_WarrantyCard
	{
		public WX_WarrantyCard()
		{}
		#region Model
		private string _machinecode;
		private string _openid;
		private string _username;
		private string _telephone;
		private string _province;
		private string _city;
		private string _address;
		private string _district;
		private DateTime? _orderdate;
		private int? _isact;
		private DateTime? _createdate;
        private decimal? _latitude;
        private decimal? _longitude;
		/// <summary>
		/// 
		/// </summary>
		public string MachineCode
		{
			set{ _machinecode=value;}
			get{return _machinecode;}
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
		public string UserName
		{
			set{ _username=value;}
			get{return _username;}
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
		public string Address
		{
			set{ _address=value;}
			get{return _address;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string District
		{
			set{ _district=value;}
			get{return _district;}
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
        public decimal? Latitude
        {
            set { _latitude = value; }
            get { return _latitude; }
        }
        public decimal? Longitude
        {
            set { _longitude = value; }
            get { return _longitude; }
        }
		#endregion Model

	}
}

