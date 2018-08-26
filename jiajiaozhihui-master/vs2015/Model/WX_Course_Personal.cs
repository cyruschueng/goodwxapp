using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Personal:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Personal
	{
		public WX_Course_Personal()
		{}
		#region Model
		private int _courseid;
		private string _openid;
		private int? _tiem;
		private int? _currsection;
		private DateTime? _lastdatetime;
        private int? _isdele;
        private int? _bagid;
        private int? _onlineId;
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
		public string OpenId
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Tiem
		{
			set{ _tiem=value;}
			get{return _tiem;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? CurrSection
		{
			set{ _currsection=value;}
			get{return _currsection;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? LastDateTime
		{
			set{ _lastdatetime=value;}
			get{return _lastdatetime;}
		}
        /// <summary>
        /// 
        /// </summary>
        public int? IsDele
        {
            set { _isdele = value; }
            get { return _isdele; }
        }

        public int? BagId
        {
            set { _bagid = value; }
            get { return _bagid; }
        }
        public int? OnlineId
        {
            set { _onlineId = value; }
            get { return _onlineId; }
        }
		#endregion Model

	}
}

