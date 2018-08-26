using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_ActivityManage:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_ActivityManage
	{
		public WX_ActivityManage()
		{}
		#region Model
		private int _id;
		private string _activityname;
		private int? _readnumber;
		private int? _likenumber;
		private int? _sharenumber;
		private DateTime? _startdate;
		private DateTime? _enddate;
		private int? _isact;
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
		public string ActivityName
		{
			set{ _activityname=value;}
			get{return _activityname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ReadNumber
		{
			set{ _readnumber=value;}
			get{return _readnumber;}
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
		public int? ShareNumber
		{
			set{ _sharenumber=value;}
			get{return _sharenumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? StartDate
		{
			set{ _startdate=value;}
			get{return _startdate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? EndDate
		{
			set{ _enddate=value;}
			get{return _enddate;}
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

