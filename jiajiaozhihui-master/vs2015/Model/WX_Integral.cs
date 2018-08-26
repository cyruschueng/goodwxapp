using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Integral:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Integral
	{
		public WX_Integral()
		{}
		#region Model
		private int _id;
		private string _cardid;
		private string _openid;
		private int? _usable_integral;
		private int? _accumulate_integral;
		private int? _expend_integral;
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
		public string CardId
		{
			set{ _cardid=value;}
			get{return _cardid;}
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
		public int? Usable_Integral
		{
			set{ _usable_integral=value;}
			get{return _usable_integral;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Accumulate_Integral
		{
			set{ _accumulate_integral=value;}
			get{return _accumulate_integral;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Expend_Integral
		{
			set{ _expend_integral=value;}
			get{return _expend_integral;}
		}
		#endregion Model

	}
}

