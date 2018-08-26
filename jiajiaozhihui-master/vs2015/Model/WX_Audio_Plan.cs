using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Audio_Plan:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Audio_Plan
	{
		public WX_Audio_Plan()
		{}
		#region Model
		private int _id;
		private string _planname;
		private DateTime? _startdate;
		private DateTime? _enddate;
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
		public string PlanName
		{
			set{ _planname=value;}
			get{return _planname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? StartDate
		{
			set{ _startdate=value;}
			get{return _startdate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? EndDate
		{
			set{ _enddate=value;}
			get{return _enddate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}

        /// <summary>
        /// 
        /// </summary>
        public int? IsAct
        {
            set { _isact = value; }
            get { return _isact; }
        }
		#endregion Model

	}
}

