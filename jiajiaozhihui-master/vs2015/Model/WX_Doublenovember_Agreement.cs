using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Doublenovember_Agreement:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Doublenovember_Agreement
	{
		public WX_Doublenovember_Agreement()
		{}
		#region Model
		private int _id;
		private string _openid;
		private string _name;
		private string _telephone;
		private string _localimgurl;
		private string _medialid;
		private string _cloudimgurl;
		private string _cloudfileid;
		private int? _isact=0;
		private DateTime? _createdate;
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
		public string Name
		{
			set{ _name=value;}
			get{return _name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Telephone
		{
			set{ _telephone=value;}
			get{return _telephone;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string LocalImgUrl
		{
			set{ _localimgurl=value;}
			get{return _localimgurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string MedialId
		{
			set{ _medialid=value;}
			get{return _medialid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string CloudImgUrl
		{
			set{ _cloudimgurl=value;}
			get{return _cloudimgurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string CloudFileId
		{
			set{ _cloudfileid=value;}
			get{return _cloudfileid;}
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
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}
		#endregion Model

	}
}

