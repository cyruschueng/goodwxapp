using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Bag:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Bag
	{
		public WX_Course_Bag()
		{}
		#region Model
		private string _bagid;
		private int _courseid;
		private DateTime? _createdate;
		/// <summary>
		/// 
		/// </summary>
		public string BagId
		{
			set{ _bagid=value;}
			get{return _bagid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int CourseId
		{
			set{ _courseid=value;}
			get{return _courseid;}
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

