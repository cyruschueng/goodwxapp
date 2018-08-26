using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Item_Help:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Item_Help
	{
		public WX_Item_Help()
		{}
		#region Model
		private int _id;
		private string _title;
		private string _details;
		private int? _helptype;
		private DateTime? _createdate;
		private int? _sn;
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
		public string Title
		{
			set{ _title=value;}
			get{return _title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Details
		{
			set{ _details=value;}
			get{return _details;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? HelpType
		{
			set{ _helptype=value;}
			get{return _helptype;}
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
		#endregion Model

	}
}

