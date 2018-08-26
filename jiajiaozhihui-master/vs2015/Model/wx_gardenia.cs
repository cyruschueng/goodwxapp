using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_gardenia:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_gardenia
	{
		public wx_gardenia()
		{}
		#region Model
		private int _id;
		private string _gardenia_name;
		private string _intro;
		private string _detail;
		private string _logo;
		private DateTime? _builder_date;
		private string _initiator;
		private DateTime? _create_date= DateTime.Now;
		/// <summary>
		/// 
		/// </summary>
		public int id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string gardenia_name
		{
			set{ _gardenia_name=value;}
			get{return _gardenia_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string intro
		{
			set{ _intro=value;}
			get{return _intro;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string detail
		{
			set{ _detail=value;}
			get{return _detail;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string logo
		{
			set{ _logo=value;}
			get{return _logo;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? builder_date
		{
			set{ _builder_date=value;}
			get{return _builder_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string initiator
		{
			set{ _initiator=value;}
			get{return _initiator;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? create_date
		{
			set{ _create_date=value;}
			get{return _create_date;}
		}
		#endregion Model

	}
}

