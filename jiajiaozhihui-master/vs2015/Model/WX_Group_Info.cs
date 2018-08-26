using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Group_Info:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Group_Info
	{
		public WX_Group_Info()
		{}
		#region Model
		private int _id;
		private string _coding;
		private string _type;
		private string _name;
		private string _logourl;
		private string _intro;
		private string _detail;
		private string _grule;
		private int? _upperlimit;
		private int? _check;
		private string _qrcodeurl;
		private string _registerqrcodeurl;
		private int? _ispremium;
		private int? _premiumcondition;
		private decimal? _premium;
		private decimal? _balance;
		private DateTime? _createdate;
		private int? _status;
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
		public string Coding
		{
			set{ _coding=value;}
			get{return _coding;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Type
		{
			set{ _type=value;}
			get{return _type;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Name
		{
			set{ _name=value;}
			get{return _name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string LogoUrl
		{
			set{ _logourl=value;}
			get{return _logourl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Intro
		{
			set{ _intro=value;}
			get{return _intro;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Detail
		{
			set{ _detail=value;}
			get{return _detail;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Grule
		{
			set{ _grule=value;}
			get{return _grule;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? UpperLimit
		{
			set{ _upperlimit=value;}
			get{return _upperlimit;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Check
		{
			set{ _check=value;}
			get{return _check;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string QRcodeUrl
		{
			set{ _qrcodeurl=value;}
			get{return _qrcodeurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string RegisterQRcodeUrl
		{
			set{ _registerqrcodeurl=value;}
			get{return _registerqrcodeurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsPremium
		{
			set{ _ispremium=value;}
			get{return _ispremium;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? PremiumCondition
		{
			set{ _premiumcondition=value;}
			get{return _premiumcondition;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? Premium
		{
			set{ _premium=value;}
			get{return _premium;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? Balance
		{
			set{ _balance=value;}
			get{return _balance;}
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
		public int? Status
		{
			set{ _status=value;}
			get{return _status;}
		}
		#endregion Model

	}
}

