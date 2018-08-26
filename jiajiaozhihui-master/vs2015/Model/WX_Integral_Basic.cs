using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Integral_Basic:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Integral_Basic
	{
		public WX_Integral_Basic()
		{}
		#region Model
		private int _id;
		private string _typecode;
		private string _typename;
		private int? _score;
		private int? _scoreday;
		private int? _isusing;
		private int? _scoretype;
		private int? _isexpend;
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
		public string TypeCode
		{
			set{ _typecode=value;}
			get{return _typecode;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string TypeName
		{
			set{ _typename=value;}
			get{return _typename;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Score
		{
			set{ _score=value;}
			get{return _score;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ScoreDay
		{
			set{ _scoreday=value;}
			get{return _scoreday;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsUsing
		{
			set{ _isusing=value;}
			get{return _isusing;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ScoreType
		{
			set{ _scoretype=value;}
			get{return _scoretype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsExpend
		{
			set{ _isexpend=value;}
			get{return _isexpend;}
		}
		#endregion Model

	}
}

