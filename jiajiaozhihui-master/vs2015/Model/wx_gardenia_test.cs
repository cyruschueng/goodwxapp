using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_gardenia_test:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_gardenia_test
	{
		public wx_gardenia_test()
		{}
		#region Model
		private int _id;
		private string _openid;
		private decimal? _score;
		private decimal? _timer;
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
		public string openid
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? score
		{
			set{ _score=value;}
			get{return _score;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? timer
		{
			set{ _timer=value;}
			get{return _timer;}
		}
		#endregion Model

	}
}

