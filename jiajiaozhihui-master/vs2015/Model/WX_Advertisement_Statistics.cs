using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Advertisement_Statistics:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Advertisement_Statistics
	{
		public WX_Advertisement_Statistics()
		{}
		#region Model
		private int _id;
		private string _projectid;
		private int? _advertisementid;
		private int? _viewnumber;
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
		public string ProjectID
		{
			set{ _projectid=value;}
			get{return _projectid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? AdvertisementID
		{
			set{ _advertisementid=value;}
			get{return _advertisementid;}
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
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}
		#endregion Model

	}
}

