using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_ZXS_Theme:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_ZXS_Theme
	{
		public WX_ZXS_Theme()
		{}
		#region Model
		private int _id;
		private string _appid;
		private string _title;
		private int? _weeks;
		private int? _isact;
        private int? _sn;
        private int? _startweek;
        private int? _endweek;

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
		public int? Weeks
		{
			set{ _weeks=value;}
			get{return _weeks;}
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
        public int? StartWeek
        {
            set { _startweek = value; }
            get { return _startweek; }
        }

        public int? EndWeek
        {
            set { _endweek = value; }
            get { return _endweek; }
        }
		#endregion Model

	}
}

