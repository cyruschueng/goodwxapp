using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_TestQuestion_Player:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_TestQuestion_Player
	{
		public WX_TestQuestion_Player()
		{}
		#region Model
		private int _id;
		private string _openid;
		private string _serviceopenid;
		private string _nickname;
		private string _headerimgurl;
		private string _longitude;
		private string _latitude;
		private int? _score;
		private string _xmlconfig;
		private DateTime? _createdate;
		private string _province;
		private string _city;
		private string _district;
		private string _street;
		private string _street_number;
        private int? _usingtime;
		/// <summary>
		/// 
		/// </summary>
		public int ID
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string OPenID
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ServiceOpenID
		{
			set{ _serviceopenid=value;}
			get{return _serviceopenid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string NickName
		{
			set{ _nickname=value;}
			get{return _nickname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string HeaderImgUrl
		{
			set{ _headerimgurl=value;}
			get{return _headerimgurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Longitude
		{
			set{ _longitude=value;}
			get{return _longitude;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Latitude
		{
			set{ _latitude=value;}
			get{return _latitude;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Score
		{
			set{ _score=value;}
			get{return _score;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string XMLConfig
		{
			set{ _xmlconfig=value;}
			get{return _xmlconfig;}
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
		public string Province
		{
			set{ _province=value;}
			get{return _province;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string City
		{
			set{ _city=value;}
			get{return _city;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string District
		{
			set{ _district=value;}
			get{return _district;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Street
		{
			set{ _street=value;}
			get{return _street;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Street_Number
		{
			set{ _street_number=value;}
			get{return _street_number;}
		}

        public int? UsingTime
        {
            set { _usingtime = value; }
            get { return _usingtime; }
        }
		#endregion Model

	}
}

