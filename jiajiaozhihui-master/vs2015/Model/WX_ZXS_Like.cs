using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_ZXS_Like:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_ZXS_Like
	{
		public WX_ZXS_Like()
		{}
		#region Model
		private int _id;
		private string _appid;
		private int _playertaskid;
		private string _openid;
		private DateTime _createdate;
        private string _nickname;
        private string _headimgurl;
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
		public int PlayerTaskId
		{
			set{ _playertaskid=value;}
			get{return _playertaskid;}
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
		public DateTime CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}
        public string NickName
        {
            set { _nickname = value; }
            get { return _nickname; }
        }
        public string HeadImgUrl
        {
            set { _headimgurl = value; }
            get { return _headimgurl; }
        }
		#endregion Model

	}
}

