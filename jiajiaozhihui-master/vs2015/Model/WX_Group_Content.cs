using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Group_Content:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Group_Content
	{
		public WX_Group_Content()
		{}
		#region Model
		private int _id;
		private string _openid;
		private int _groupid;
		private int? _mediatype;
		private string _imgurl;
		private string _audiourl;
		private string _videourl;
		private string _resume;
		private int? _likenumber;
		private int? _viewnumber;
		private int? _commentnumber;
		private DateTime? _createdate;
		private string _fileid;
		private int? _rank;
		private string _owner;
		private int? _isact;
		private int? _istop;
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
		public int GroupId
		{
			set{ _groupid=value;}
			get{return _groupid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? MediaType
		{
			set{ _mediatype=value;}
			get{return _mediatype;}
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
		public string AudioUrl
		{
			set{ _audiourl=value;}
			get{return _audiourl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string VideoUrl
		{
			set{ _videourl=value;}
			get{return _videourl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Resume
		{
			set{ _resume=value;}
			get{return _resume;}
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
		public int? ViewNumber
		{
			set{ _viewnumber=value;}
			get{return _viewnumber;}
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
		public string Fileid
		{
			set{ _fileid=value;}
			get{return _fileid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Rank
		{
			set{ _rank=value;}
			get{return _rank;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Owner
		{
			set{ _owner=value;}
			get{return _owner;}
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
		public int? IsTop
		{
			set{ _istop=value;}
			get{return _istop;}
		}
		#endregion Model

	}
}

