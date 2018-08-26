using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Group_Member:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Group_Member
	{
		public WX_Group_Member()
		{}
		#region Model
		private string _openid;
		private int _groupid;
		private string _password;
		private string _kindred;
		private string _nickname;
		private string _alias;
		private string _headimgurl;
		private string _tel;
		private int? _childyear;
		private int? _childmonth;
		private int? _childday;
		private string _childsex;
		private string _province;
		private string _city;
		private string _inviteopenid;
		private int? _invitemethod;
		private DateTime? _joindate;
		private DateTime? _fstupload;
		private int? _checkstate;
		private int? _state;
		private int? _onlinestate;
		private int? _isalias;
        private int? _isjoin;
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
		public int GroupId
		{
			set{ _groupid=value;}
			get{return _groupid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string PassWord
		{
			set{ _password=value;}
			get{return _password;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Kindred
		{
			set{ _kindred=value;}
			get{return _kindred;}
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
		public string Alias
		{
			set{ _alias=value;}
			get{return _alias;}
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
		public string Tel
		{
			set{ _tel=value;}
			get{return _tel;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ChildYear
		{
			set{ _childyear=value;}
			get{return _childyear;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ChildMonth
		{
			set{ _childmonth=value;}
			get{return _childmonth;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ChildDay
		{
			set{ _childday=value;}
			get{return _childday;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ChildSex
		{
			set{ _childsex=value;}
			get{return _childsex;}
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
		public string InviteOpenId
		{
			set{ _inviteopenid=value;}
			get{return _inviteopenid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? InviteMethod
		{
			set{ _invitemethod=value;}
			get{return _invitemethod;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? JoinDate
		{
			set{ _joindate=value;}
			get{return _joindate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? FstUpload
		{
			set{ _fstupload=value;}
			get{return _fstupload;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? CheckState
		{
			set{ _checkstate=value;}
			get{return _checkstate;}
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
		public int? OnLineState
		{
			set{ _onlinestate=value;}
			get{return _onlinestate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsAlias
		{
			set{ _isalias=value;}
			get{return _isalias;}
		}
        public int? IsJoin
        {
            set { _isjoin = value; }
            get { return _isjoin; }
        }
		#endregion Model

	}
}

