using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_TestQuestion_TestRecord:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_TestQuestion_TestRecord
	{
		public WX_TestQuestion_TestRecord()
		{}
		#region Model
		private int _id;
		private string _itemid;
		private string _openid;
		private string _rightanswers;
		/// <summary>
		/// 
		/// </summary>
		public int Id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ItemId
		{
			set{ _itemid=value;}
			get{return _itemid;}
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
		public string RightAnswers
		{
			set{ _rightanswers=value;}
			get{return _rightanswers;}
		}
		#endregion Model

	}
}

