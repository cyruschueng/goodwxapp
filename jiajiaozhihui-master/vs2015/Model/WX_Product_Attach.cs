using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Product_Attach:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Product_Attach
	{
		public WX_Product_Attach()
		{}
		#region Model
		private int _productid;
		private int? _showaddress;
		private int? _showpaynumber;
		private int? _showpostage;
		private int? _isact;
		private DateTime? _createdate;
		/// <summary>
		/// 
		/// </summary>
		public int ProductId
		{
			set{ _productid=value;}
			get{return _productid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ShowAddress
		{
			set{ _showaddress=value;}
			get{return _showaddress;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ShowPayNumber
		{
			set{ _showpaynumber=value;}
			get{return _showpaynumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ShowPostage
		{
			set{ _showpostage=value;}
			get{return _showpostage;}
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
		#endregion Model

	}
}

