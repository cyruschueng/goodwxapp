using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Card_Detail_Error:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Card_Detail_Error
	{
		public WX_Course_Card_Detail_Error()
		{}
		#region Model
		private int _id;
		private int _cardid;
		private int _cardtype;
		private int _cardno;
		private string _openid;
		private string _ipaddress;
		private DateTime _registdate;
		private int? _isact=0;
		private int? _isagree=0;
		private DateTime? _agreedate;
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
		public int CardId
		{
			set{ _cardid=value;}
			get{return _cardid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int CardType
		{
			set{ _cardtype=value;}
			get{return _cardtype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int CardNo
		{
			set{ _cardno=value;}
			get{return _cardno;}
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
		public string IpAddress
		{
			set{ _ipaddress=value;}
			get{return _ipaddress;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime RegistDate
		{
			set{ _registdate=value;}
			get{return _registdate;}
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
		public int? IsAgree
		{
			set{ _isagree=value;}
			get{return _isagree;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? AgreeDate
		{
			set{ _agreedate=value;}
			get{return _agreedate;}
		}
		#endregion Model

	}
}

