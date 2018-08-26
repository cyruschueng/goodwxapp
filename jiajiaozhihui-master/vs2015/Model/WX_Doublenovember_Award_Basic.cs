using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Doublenovember_Award_Basic:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Doublenovember_Award_Basic
	{
		public WX_Doublenovember_Award_Basic()
		{}
		#region Model
		private int _id;
		private string _code;
		private string _name;
		private int? _award;
		private int? _condition;
		private int? _isact;
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
		public string Code
		{
			set{ _code=value;}
			get{return _code;}
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
		public int? Award
		{
			set{ _award=value;}
			get{return _award;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Condition
		{
			set{ _condition=value;}
			get{return _condition;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsAct
		{
			set{ _isact=value;}
			get{return _isact;}
		}
		#endregion Model

	}
}

