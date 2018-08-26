using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_RuleDoc:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_RuleDoc
	{
		public WX_Course_RuleDoc()
		{}
		#region Model
		private int _id;
		private int _courseid;
		private string _detail;
		private DateTime? _createdate;
        private int? _isact;
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
		public int CourseId
		{
			set{ _courseid=value;}
			get{return _courseid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Detail
		{
			set{ _detail=value;}
			get{return _detail;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}
        public int? IsAct
        {
            set { _isact = value; }
            get { return _isact; }
        }
		#endregion Model

	}
}

