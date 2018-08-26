using System;
namespace SfSoft.Model
{
	/// <summary>
	/// 实体类Pub_Data_Acl_Users 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	public class Pub_Data_Acl_Users
	{
		public Pub_Data_Acl_Users()
		{}
		#region Model
		private int _id;
		private int _dataaclid;
		private int _uid;
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
		public int DataAclID
		{
			set{ _dataaclid=value;}
			get{return _dataaclid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int UID
		{
			set{ _uid=value;}
			get{return _uid;}
		}
		#endregion Model

	}
}

