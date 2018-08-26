using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Doublenovember_Invite:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Doublenovember_Invite
	{
		public WX_Doublenovember_Invite()
		{}
		#region Model
		private int _id;
		private string _fromopenid;
		private string _toopenid;
		private string _content;
		private DateTime? _senddate;
		private DateTime? _replydate;
		private int? _status;
		private int? _isread;
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
		public string FromOpenID
		{
			set{ _fromopenid=value;}
			get{return _fromopenid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ToOpenID
		{
			set{ _toopenid=value;}
			get{return _toopenid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Content
		{
			set{ _content=value;}
			get{return _content;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? SendDate
		{
			set{ _senddate=value;}
			get{return _senddate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? ReplyDate
		{
			set{ _replydate=value;}
			get{return _replydate;}
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
		public int? IsRead
		{
			set{ _isread=value;}
			get{return _isread;}
		}
		#endregion Model

	}
}

