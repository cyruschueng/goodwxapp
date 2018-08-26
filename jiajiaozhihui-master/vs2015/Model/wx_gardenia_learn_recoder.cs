using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_gardenia_learn_recoder:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_gardenia_learn_recoder
	{
		public wx_gardenia_learn_recoder()
		{}
		#region Model
		private int _id;
		private string _learner;
		private int _course_id;
		private DateTime? _learen_date= DateTime.Now;
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
		public string learner
		{
			set{ _learner=value;}
			get{return _learner;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int course_id
		{
			set{ _course_id=value;}
			get{return _course_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? learen_date
		{
			set{ _learen_date=value;}
			get{return _learen_date;}
		}
		#endregion Model

	}
}

