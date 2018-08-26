using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_TestQuestion_Winner_Rule:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_TestQuestion_Winner_Rule
	{
		public WX_TestQuestion_Winner_Rule()
		{}
		#region Model
		private int _id;
		private int? _activityid;
		private int? _rank;
		private string _winnername;
		private int? _lowerlimit;
		private int? _upperlimit;
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
		public int? ActivityID
		{
			set{ _activityid=value;}
			get{return _activityid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Rank
		{
			set{ _rank=value;}
			get{return _rank;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string WinnerName
		{
			set{ _winnername=value;}
			get{return _winnername;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? LowerLimit
		{
			set{ _lowerlimit=value;}
			get{return _lowerlimit;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? UpperLimit
		{
			set{ _upperlimit=value;}
			get{return _upperlimit;}
		}
		#endregion Model

	}
}

