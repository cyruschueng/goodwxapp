using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Libao_Bag:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Libao_Bag
	{
		public WX_Libao_Bag()
		{}
		#region Model
		private int _id;
		private int? _bagid;
		private string _bagname;
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
		public string BagName
		{
			set{ _bagname=value;}
			get{return _bagname;}
		}
		#endregion Model

	}
}

