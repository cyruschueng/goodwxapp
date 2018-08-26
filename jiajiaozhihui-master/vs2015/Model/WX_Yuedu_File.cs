using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Yuedu_File:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Yuedu_File
	{
		public WX_Yuedu_File()
		{}
		#region Model
		private int _id;
		private string _appid;
		private string _openid;
		private int? _likenumber;
		private int? _commentnumber;
		private DateTime? _createdate;
		private int? _sn;
		private int? _istop;
		private int? _status;
		private string _comment;
		private int? _filetype;
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
		public string OpenId
		{
			set{ _openid=value;}
			get{return _openid;}
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
		public int? CommentNumber
		{
			set{ _commentnumber=value;}
			get{return _commentnumber;}
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
		public int? Sn
		{
			set{ _sn=value;}
			get{return _sn;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsTop
		{
			set{ _istop=value;}
			get{return _istop;}
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
		public string Comment
		{
			set{ _comment=value;}
			get{return _comment;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? FileType
		{
			set{ _filetype=value;}
			get{return _filetype;}
		}
		#endregion Model

	}
}

