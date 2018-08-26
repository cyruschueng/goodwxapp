using System;
namespace SfSoft.Model
{
	/// <summary>
	/// Wx_TestQuestion_Item_Ranking:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class Wx_TestQuestion_Item_Ranking
	{
		public Wx_TestQuestion_Item_Ranking()
		{}
		#region Model
		private string _openid;
		private int _activeid;
		private int _year;
		private int _month;
		private int? _score;
		private int? _usingtime;
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
		public int ActiveId
		{
			set{ _activeid=value;}
			get{return _activeid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int Year
		{
			set{ _year=value;}
			get{return _year;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int Month
		{
			set{ _month=value;}
			get{return _month;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Score
		{
			set{ _score=value;}
			get{return _score;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? UsingTime
		{
			set{ _usingtime=value;}
			get{return _usingtime;}
		}
		#endregion Model

	}
}

