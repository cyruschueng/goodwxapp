using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_ParticipatorList:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_ParticipatorList
	{
		public WX_ParticipatorList()
		{}
		#region Model
		private int _id;
		private int? _activityid;
		private string _openid;
		private string _nickname;
		private string _headimgurl;
		private DateTime? _createdate;
		private int? _status;
        private DateTime? _subscribetime;
        
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
		public int? ActivityId
		{
			set{ _activityid=value;}
			get{return _activityid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Openid
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
		public string HeadimgUrl
		{
			set{ _headimgurl=value;}
			get{return _headimgurl;}
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
        /// <summary>
        /// 
        /// </summary>
        public DateTime? SubscribeTime
        {
            set { _subscribetime = value; }
            get { return _subscribetime; }
        }

		#endregion Model

	}
}

