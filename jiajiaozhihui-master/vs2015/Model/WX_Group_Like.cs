using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Group_Like:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Group_Like
	{
		public WX_Group_Like()
		{}
		#region Model
		private int _id;
		private int _groupid;
		private int _contentid;
		private string _toopenid;
		private string _fromopenid;
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
		public int GroupId
		{
			set{ _groupid=value;}
			get{return _groupid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int ContentId
		{
			set{ _contentid=value;}
			get{return _contentid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ToOpenId
		{
			set{ _toopenid=value;}
			get{return _toopenid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string FromOpenId
		{
			set{ _fromopenid=value;}
			get{return _fromopenid;}
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

