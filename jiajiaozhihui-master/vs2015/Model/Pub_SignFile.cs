using System;
namespace SfSoft.Model
{
	/// <summary>
	/// 实体类Pub_SignFile 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	public class Pub_SignFile
	{
		public Pub_SignFile()
		{}
		#region Model
		private int _id;
		private string _mid;
		private string _docid;
		private string _signs;
		private int? _signsid;
		private string _status;
		private DateTime? _signsdate;
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
		public string MID
		{
			set{ _mid=value;}
			get{return _mid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string DocID
		{
			set{ _docid=value;}
			get{return _docid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Signs
		{
			set{ _signs=value;}
			get{return _signs;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? SignsID
		{
			set{ _signsid=value;}
			get{return _signsid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Status
		{
			set{ _status=value;}
			get{return _status;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? SignsDate
		{
			set{ _signsdate=value;}
			get{return _signsdate;}
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

