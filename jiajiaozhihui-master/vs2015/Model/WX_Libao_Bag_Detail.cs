using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Libao_Bag_Detail:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Libao_Bag_Detail
	{
		public WX_Libao_Bag_Detail()
		{}
		#region Model
		private int _id;
		private int? _bagid;
		private int? _productid;
		private int? _producttype;
		private decimal? _discountrate;
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
		public int? BagID
		{
			set{ _bagid=value;}
			get{return _bagid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ProductID
		{
			set{ _productid=value;}
			get{return _productid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ProductType
		{
			set{ _producttype=value;}
			get{return _producttype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? DiscountRate
		{
			set{ _discountrate=value;}
			get{return _discountrate;}
		}
		#endregion Model

	}
}

