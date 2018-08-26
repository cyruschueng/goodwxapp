using System;
namespace SfSoft.Model
{
	/// <summary>
	/// Pub_CallList_Add:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class Pub_CallList_Add
	{
		public Pub_CallList_Add()
		{}
		#region Model
		private int _id;
		private int? _calllistid;
		private int? _calltype;
		private string _calladd;
		private string _callname;
		private string _calluid;
		private string _status;
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
		public int? CallListID
		{
			set{ _calllistid=value;}
			get{return _calllistid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? CallType
		{
			set{ _calltype=value;}
			get{return _calltype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string CallAdd
		{
			set{ _calladd=value;}
			get{return _calladd;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string CallName
		{
			set{ _callname=value;}
			get{return _callname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string CallUid
		{
			set{ _calluid=value;}
			get{return _calluid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Status
		{
			set{ _status=value;}
			get{return _status;}
		}
		#endregion Model

	}
}

