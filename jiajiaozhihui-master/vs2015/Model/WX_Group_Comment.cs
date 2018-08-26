using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Group_Comment:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Group_Comment
	{
		public WX_Group_Comment()
		{}
		#region Model
		private int _id;
		private int _groupid;
		private int _fileid;
		private string _openid;
		private string _comment;
		private DateTime? _creatdate;
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
		public int GroupId
		{
			set{ _groupid=value;}
			get{return _groupid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int FileId
		{
			set{ _fileid=value;}
			get{return _fileid;}
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
		public string Comment
		{
			set{ _comment=value;}
			get{return _comment;}
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

