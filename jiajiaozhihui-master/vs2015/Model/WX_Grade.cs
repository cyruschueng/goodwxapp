using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Grade:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Grade
	{
		public WX_Grade()
		{}
		#region Model
		private int _id;
		private int? _grade;
		private string _title;
		private int? _floor;
		private int? _upper;
		private int? _type;
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
		public int? Grade
		{
			set{ _grade=value;}
			get{return _grade;}
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
		public int? Floor
		{
			set{ _floor=value;}
			get{return _floor;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Upper
		{
			set{ _upper=value;}
			get{return _upper;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Type
		{
			set{ _type=value;}
			get{return _type;}
		}
		#endregion Model

	}
}

