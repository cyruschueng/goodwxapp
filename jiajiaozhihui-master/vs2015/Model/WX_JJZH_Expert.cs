using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_JJZH_Expert:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_JJZH_Expert
	{
		public WX_JJZH_Expert()
		{}
		#region Model
		private int _id;
		private string _openid;
		private string _nickname;
		private string _headimgurl;
		private string _imgurl;
		private string _uname;
		private string _intro;
		private string _detail;
		private string _telephone;
		private string _sex;
		private int? _isact;
		private int? _isrest;
        private int? _experttype;
        private int? _ischeck;
        private int? _likenumber;
        private int? _Isdefault;
        private int? _sn;

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
		public string OpenId
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
		public string ImgUrl
		{
			set{ _imgurl=value;}
			get{return _imgurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string UName
		{
			set{ _uname=value;}
			get{return _uname;}
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
		public string TelePhone
		{
			set{ _telephone=value;}
			get{return _telephone;}
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
		public int? IsAct
		{
			set{ _isact=value;}
			get{return _isact;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsRest
		{
			set{ _isrest=value;}
			get{return _isrest;}
		}
        public int? ExpertType
        {
            set { _experttype = value; }
            get { return _experttype; }
        }
        public int? IsCheck
        {
            set { _ischeck = value; }
            get { return _ischeck; }
        }
        public int? LikeNumber
        {
            set { _likenumber = value; }
            get { return _likenumber; }
        }
        public int? IsDefault
        {
            set { _Isdefault = value; }
            get { return _Isdefault; }
        }
        public int? Sn
        {
            set { _sn = value; }
            get { return _sn; }
        }
		#endregion Model

	}
}

