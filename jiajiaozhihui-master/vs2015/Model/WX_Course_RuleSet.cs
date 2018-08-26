using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_RuleSet:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_RuleSet
	{
		public WX_Course_RuleSet()
		{}
		#region Model
		private int _id;
		private int _courseid;
		private int _lowlimit;
		private int _upperlimit;
		private int _ranking;
		private int _goodsid;
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
		public int LowLimit
		{
			set{ _lowlimit=value;}
			get{return _lowlimit;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int UpperLimit
		{
			set{ _upperlimit=value;}
			get{return _upperlimit;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int Ranking
		{
			set{ _ranking=value;}
			get{return _ranking;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int GoodsId
		{
			set{ _goodsid=value;}
			get{return _goodsid;}
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

