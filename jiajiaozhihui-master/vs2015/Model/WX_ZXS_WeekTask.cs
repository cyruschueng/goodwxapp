using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_ZXS_WeekTask:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_ZXS_WeekTask
	{
		public WX_ZXS_WeekTask()
		{}
		#region Model
		private int _id;
		private int? _themeid;
		private int? _week;
		private int? _taskid;
		private int? _isact;
        private int? _sn;
        private int? _optional;
        private int? _taskclass;
        public string _hash;
        public string _other;
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
		public int? ThemeId
		{
			set{ _themeid=value;}
			get{return _themeid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Week
		{
			set{ _week=value;}
			get{return _week;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? TaskId
		{
			set{ _taskid=value;}
			get{return _taskid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsAct
		{
			set{ _isact=value;}
			get{return _isact;}
		}
        public int? Sn
        {
            set { _sn = value; }
            get { return _sn; }
        }
        public int? Optional
        {
            set { _optional = value; }
            get { return _optional; }
        }

        public int? TaskClass
        {
            set { _taskclass = value; }
            get { return _taskclass; }
        }
        public string Hash
        {
            set { _hash = value; }
            get { return _hash; }
        }
        public string Other
        {
            set { _other = value; }
            get { return _other; }
        }
		#endregion Model

	}
}

