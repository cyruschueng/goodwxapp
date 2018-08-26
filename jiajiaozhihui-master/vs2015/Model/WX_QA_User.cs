using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_QA_User:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_QA_User
	{
		public WX_QA_User()
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
        private string _expertid;
        private int? _experttype;
        private string _membership;
        private int? _isreceivemesage;
        private int? _isblack;
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
		/// <summary>
		/// 
		/// </summary>
		public DateTime? BorthDay
		{
			set{ _borthday=value;}
			get{return _borthday;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Sex
		{
			set{ _sex=value;}
			get{return _sex;}
		}
        /// <summary>
        /// 
        /// </summary>
        public int? ExpertType
        {
            set { _experttype = value; }
            get { return _experttype; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ExpertId
        {
            set { _expertid = value; }
            get { return _expertid; }
        }
        public string Membership
        {
            set { _membership = value; }
            get { return _membership; }
        }
        public int? IsReceiveMesage
        {
            set { _isreceivemesage = value; }
            get { return _isreceivemesage; }
        }
        public int? IsBlack
        {
            set { _isblack = value; }
            get { return _isblack; }
        }
		#endregion Model

	}
}

