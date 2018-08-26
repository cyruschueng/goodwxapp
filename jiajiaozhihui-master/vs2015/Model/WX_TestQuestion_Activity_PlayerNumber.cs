using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_TestQuestion_Activity_PlayerNumber:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_TestQuestion_Activity_PlayerNumber
	{
		public WX_TestQuestion_Activity_PlayerNumber()
		{}
		#region Model
		private int _id;
		private int? _questionactiveid;
		private int? _number;
		private DateTime? _lastdate;
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
		public int? QuestionActiveID
		{
			set{ _questionactiveid=value;}
			get{return _questionactiveid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Number
		{
			set{ _number=value;}
			get{return _number;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? LastDate
		{
			set{ _lastdate=value;}
			get{return _lastdate;}
		}
		#endregion Model

	}
}

