using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Wish:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Wish
	{
		public WX_Wish()
		{}
		#region Model
		private int _id;
		private string _openid;
		private string _nickname;
		private string _headimgurl;
		private string _mobile;
		private string _qq;
		private string _weixin;
		private string _address;
		private string _detail;
		private DateTime? _createdate;
		private int? _days;
		private string _remark;
		private int? _isanonym;
		private int? _ishelp;
		private int? _isact;
		private int? _status;
		private int? _likenumber;
		private int? _attentionnumber;
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
		public string OpenID
		{
			set{ _openid=value;}
			get{return _openid;}
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
		public string HeadImgUrl
		{
			set{ _headimgurl=value;}
			get{return _headimgurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Mobile
		{
			set{ _mobile=value;}
			get{return _mobile;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string QQ
		{
			set{ _qq=value;}
			get{return _qq;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string WeiXin
		{
			set{ _weixin=value;}
			get{return _weixin;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Address
		{
			set{ _address=value;}
			get{return _address;}
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
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Days
		{
			set{ _days=value;}
			get{return _days;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Remark
		{
			set{ _remark=value;}
			get{return _remark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsAnonym
		{
			set{ _isanonym=value;}
			get{return _isanonym;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsHelp
		{
			set{ _ishelp=value;}
			get{return _ishelp;}
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
		public int? Status
		{
			set{ _status=value;}
			get{return _status;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? LikeNumber
		{
			set{ _likenumber=value;}
			get{return _likenumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? AttentionNumber
		{
			set{ _attentionnumber=value;}
			get{return _attentionnumber;}
		}
		#endregion Model

	}
}

