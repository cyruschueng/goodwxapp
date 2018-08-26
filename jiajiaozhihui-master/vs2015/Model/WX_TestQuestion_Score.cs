using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_TestQuestion_Score:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_TestQuestion_Score
	{
		public WX_TestQuestion_Score()
		{}
		#region Model
		private int _id;
		private string _openid;
		private int? _questionactiveid;
		private int? _score;
		private decimal? _usingtime;
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
		public string OpenID
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? QuestionActiveID
		{
			set{ _questionactiveid=value;}
			get{return _questionactiveid;}
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
		public decimal? UsingTime
		{
			set{ _usingtime=value;}
			get{return _usingtime;}
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

