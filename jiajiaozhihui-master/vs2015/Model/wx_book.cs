using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_book:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_book
	{
		public wx_book()
		{}
		#region Model
		private int _id;
		private string _title;
		private string _info;
		private decimal? _price;
		private string _img_url;
		private string _buy_link;
		private int? _sales_volume;
		private string _remark;
		private int? _prefecturen;
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
		public string title
		{
			set{ _title=value;}
			get{return _title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string info
		{
			set{ _info=value;}
			get{return _info;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? price
		{
			set{ _price=value;}
			get{return _price;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string img_url
		{
			set{ _img_url=value;}
			get{return _img_url;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string buy_link
		{
			set{ _buy_link=value;}
			get{return _buy_link;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? sales_volume
		{
			set{ _sales_volume=value;}
			get{return _sales_volume;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string remark
		{
			set{ _remark=value;}
			get{return _remark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? prefecturen
		{
			set{ _prefecturen=value;}
			get{return _prefecturen;}
		}
		#endregion Model

	}
}

