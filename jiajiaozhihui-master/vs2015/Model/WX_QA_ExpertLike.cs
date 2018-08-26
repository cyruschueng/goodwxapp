using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_QA_ExpertLike:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_QA_ExpertLike
	{
		public WX_QA_ExpertLike()
		{}
		#region Model
		private int _id;
		private string _appid;
		private int? _expertid;
		private string _openid;
		private DateTime? _createdate;
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
		public int? ExpertId
		{
			set{ _expertid=value;}
			get{return _expertid;}
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
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
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
		#endregion Model

	}
}

