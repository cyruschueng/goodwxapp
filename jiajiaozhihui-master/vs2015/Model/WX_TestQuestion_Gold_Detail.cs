using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_TestQuestion_Gold_Detail:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_TestQuestion_Gold_Detail
	{
		public WX_TestQuestion_Gold_Detail()
		{}
		#region Model
		private int _id;
		private string _openid;
		private int? _questionactiveid;
		private int? _gold;
		private DateTime? _createdate;
		private int? _status;
		private string _remark;
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
		public int? Gold
		{
			set{ _gold=value;}
			get{return _gold;}
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
		public int? Status
		{
			set{ _status=value;}
			get{return _status;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Remark
		{
			set{ _remark=value;}
			get{return _remark;}
		}
		#endregion Model

	}
}

