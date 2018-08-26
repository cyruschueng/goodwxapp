using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Comment:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Comment
	{
		public WX_Course_Comment()
		{}
		#region Model
		private int _id;
		private int? _courseid;
		private string _commentopenid;
		private string _commentname;
		private string _replyopenid;
		private string _replayname;
		private string _content;
		private DateTime? _createdate;
		private int? _ischeck;
		private string _grade;
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
		public int? CourseId
		{
			set{ _courseid=value;}
			get{return _courseid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string CommentOpenId
		{
			set{ _commentopenid=value;}
			get{return _commentopenid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string CommentName
		{
			set{ _commentname=value;}
			get{return _commentname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ReplyOpenId
		{
			set{ _replyopenid=value;}
			get{return _replyopenid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ReplayName
		{
			set{ _replayname=value;}
			get{return _replayname;}
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
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsCheck
		{
			set{ _ischeck=value;}
			get{return _ischeck;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Grade
		{
			set{ _grade=value;}
			get{return _grade;}
		}
        /// <summary>
        /// 
        /// </summary>
        public string HeadImgUrl
        {
            set { _headimgurl = value; }
            get { return _headimgurl; }
        }
		#endregion Model

	}
}

