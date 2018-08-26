using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Items:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Items
	{
		public WX_Items()
		{}
		#region Model
		private int _id;
		private string _name;
		private int? _joinnumber;
		private int? _viewnumber;
		private int? _commentnumber;
		private int? _likenumber;
		private int? _isact=1;
		private DateTime? _createdate;
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
		public string Name
		{
			set{ _name=value;}
			get{return _name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? JoinNumber
		{
			set{ _joinnumber=value;}
			get{return _joinnumber;}
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
		public int? LikeNumber
		{
			set{ _likenumber=value;}
			get{return _likenumber;}
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

