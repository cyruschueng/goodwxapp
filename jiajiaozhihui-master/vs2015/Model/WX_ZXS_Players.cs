using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_ZXS_Players:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_ZXS_Players
	{
		public WX_ZXS_Players()
		{}
		#region Model
		private string _appid;
		private string _openid;
		private int? _playertype;
		private DateTime? _startdate;
		private DateTime? _enddate;
		private DateTime? _regiondate;
		private int? _state;
		private int? _childage;
        private DateTime? _borthday;
        private int? _Isblack;
        private string __telephone;
        private string _sex;
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
		public string OpenId
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? PlayerType
		{
			set{ _playertype=value;}
			get{return _playertype;}
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
		public DateTime? RegionDate
		{
			set{ _regiondate=value;}
			get{return _regiondate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? State
		{
			set{ _state=value;}
			get{return _state;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ChildAge
		{
			set{ _childage=value;}
			get{return _childage;}
		}
        public DateTime?  BorthDay
        {
            set { _borthday = value; }
            get { return _borthday; }
        }
        public int? IsBlack
        {
            set { _Isblack = value; }
            get { return _Isblack; }
        }
        public string Telephone
        {
            set { __telephone = value; }
            get { return __telephone; }
        }
        public string Sex
        {
            set { _sex = value; }
            get { return _sex; }
        }
		#endregion Model

	}
}

