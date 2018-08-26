using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Doublenovember_Comment:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Doublenovember_Comment
	{
		public WX_Doublenovember_Comment()
		{}
		#region Model
		private int _id;
		private string _modulesid;
		private int? _fileid;
		private string _openid;
		private string _content;
		private DateTime? _creatdate;
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
		public string ModulesID
		{
			set{ _modulesid=value;}
			get{return _modulesid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? FileID
		{
			set{ _fileid=value;}
			get{return _fileid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string OpenID
		{
			set{ _openid=value;}
			get{return _openid;}
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
		public DateTime? CreatDate
		{
			set{ _creatdate=value;}
			get{return _creatdate;}
		}
		#endregion Model

	}
}

