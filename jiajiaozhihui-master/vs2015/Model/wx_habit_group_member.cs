using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_habit_group_member:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_habit_group_member
	{
		public wx_habit_group_member()
		{}
		#region Model
		private int _id;
		private int _group_id;
		private string _openid;
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
		public int group_id
		{
			set{ _group_id=value;}
			get{return _group_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string openid
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		#endregion Model

	}
}

