using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Read_User:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Read_User
	{
		public WX_Read_User()
		{}
		#region Model
		private string _appid;
		private string _openid;
		private int? _usertype;
		private DateTime? _startdate;
		private DateTime? _enddate;
		private DateTime? _regiondate;
		private int? _isact;
		private int? _childage;
		private string _telephone;
        private DateTime? _borthday;
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
		public int? UserType
		{
			set{ _usertype=value;}
			get{return _usertype;}
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
		public int? IsAct
		{
			set{ _isact=value;}
			get{return _isact;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ChildAge
		{
			set{ _childage=value;}
			get{return _childage;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Telephone
		{
			set{ _telephone=value;}
			get{return _telephone;}
		}
		#endregion Model
        public DateTime? BorthDay
        {
            set { _borthday = value; }
            get { return _borthday; }
        }
        public string Sex
        {
            set { _sex = value; }
            get { return _sex; }
        }
	}
}

