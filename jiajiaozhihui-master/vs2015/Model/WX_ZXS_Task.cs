using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_ZXS_Task:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_ZXS_Task
	{
		public WX_ZXS_Task()
		{}
		#region Model
		private int _id;
		private string _appid;
		private string _title;
		private int? _time;
		private int? _tasktype;
		private int? _isact;
        private string _remark;
        private int _hz;
        private string _unit;
        private string _imglogo;
        private string _introduce;
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
		public string AppId
		{
			set{ _appid=value;}
			get{return _appid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Title
		{
			set{ _title=value;}
			get{return _title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Time
		{
			set{ _time=value;}
			get{return _time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? TaskType
		{
			set{ _tasktype=value;}
			get{return _tasktype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsAct
		{
			set{ _isact=value;}
			get{return _isact;}
		}
        public string Remark
        {
            set { _remark = value; }
            get { return _remark; }
        }
        public int HZ
        {
            set { _hz = value; }
            get { return _hz; }
        }
        public string Unit
        {
            set { _unit = value; }
            get { return _unit; }
        }
        public string ImgLogo
        {
            set { _imglogo = value; }
            get { return _imglogo; }
        }
        public string Introduce
        {
            set { _introduce = value; }
            get { return _introduce; }
        }
		#endregion Model

	}
}

