using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_TestQuestion_Item_Score:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_TestQuestion_Item_Score
	{
		public WX_TestQuestion_Item_Score()
		{}
		#region Model
		private string _openid;
		private int _item;
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
		public int Item
		{
			set{ _item=value;}
			get{return _item;}
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

