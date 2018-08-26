using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_NativePay:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_NativePay
	{
		public WX_NativePay()
		{}
		#region Model
		private int _id;
		private string _product_name;
		private string _product_id;
		private string _body;
		private string _detail;
		private string _attach;
		private string _out_trade_no;
		private int _total_fee;
		private int? _time_expire;
		private string _goods_tag;
		private string _spbill_create_ip;
		private string _notify_url;
		private string _trade_type="NATIVE";
		private DateTime _create_date;
		private int _isact;
		/// <summary>
		/// 
		/// </summary>
		public int id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string product_name
		{
			set{ _product_name=value;}
			get{return _product_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string product_id
		{
			set{ _product_id=value;}
			get{return _product_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string body
		{
			set{ _body=value;}
			get{return _body;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string detail
		{
			set{ _detail=value;}
			get{return _detail;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string attach
		{
			set{ _attach=value;}
			get{return _attach;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string out_trade_no
		{
			set{ _out_trade_no=value;}
			get{return _out_trade_no;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int total_fee
		{
			set{ _total_fee=value;}
			get{return _total_fee;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? time_expire
		{
			set{ _time_expire=value;}
			get{return _time_expire;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string goods_tag
		{
			set{ _goods_tag=value;}
			get{return _goods_tag;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string spbill_create_ip
		{
			set{ _spbill_create_ip=value;}
			get{return _spbill_create_ip;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string notify_url
		{
			set{ _notify_url=value;}
			get{return _notify_url;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string trade_type
		{
			set{ _trade_type=value;}
			get{return _trade_type;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime create_date
		{
			set{ _create_date=value;}
			get{return _create_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int isact
		{
			set{ _isact=value;}
			get{return _isact;}
		}
		#endregion Model

	}
}

