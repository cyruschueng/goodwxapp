using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_QA_Grade:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_QA_Grade
	{
		public WX_QA_Grade()
		{}
		#region Model
		private int _id;
		private int? _grade;
		private string _gradename;
		private int? _upperlimit;
		private int? _lowerlimit;
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
		public int? Grade
		{
			set{ _grade=value;}
			get{return _grade;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string GradeName
		{
			set{ _gradename=value;}
			get{return _gradename;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? UpperLimit
		{
			set{ _upperlimit=value;}
			get{return _upperlimit;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? LowerLimit
		{
			set{ _lowerlimit=value;}
			get{return _lowerlimit;}
		}
		#endregion Model

	}
}

