using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_SubscribeResult:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_SubscribeResult
	{
		public WX_SubscribeResult()
		{}
		#region Model
		private int _id;
		private string _shareid;
		private int? _number;
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
		public string ShareID
		{
			set{ _shareid=value;}
			get{return _shareid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Number
		{
			set{ _number=value;}
			get{return _number;}
		}
		#endregion Model

	}
}

