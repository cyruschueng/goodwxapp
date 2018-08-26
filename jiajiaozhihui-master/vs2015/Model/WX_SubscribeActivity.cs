using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_SubscribeActivity:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_SubscribeActivity
	{
		public WX_SubscribeActivity()
		{}
		#region Model
		private int _id;
		private string _shareid;
		private string _friendid;
		private string _headimgurl;
		private string _nickname;
		private DateTime? _subscribe_time;
		private int? _issubscribe=0;
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
		public string ShareID
		{
			set{ _shareid=value;}
			get{return _shareid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string FriendID
		{
			set{ _friendid=value;}
			get{return _friendid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string HeadimgUrl
		{
			set{ _headimgurl=value;}
			get{return _headimgurl;}
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
		public DateTime? Subscribe_Time
		{
			set{ _subscribe_time=value;}
			get{return _subscribe_time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsSubscribe
		{
			set{ _issubscribe=value;}
			get{return _issubscribe;}
		}
		#endregion Model

	}
}

