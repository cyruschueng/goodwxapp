using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_habit_group:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_habit_group
	{
		public wx_habit_group()
		{}
		#region Model
		private int _id;
		private string _openid;
		private string _group_id;
		private string _group_name;
		private DateTime? _create_date= DateTime.Now;
		private int? _is_act=1;
		private int? _is_default=0;
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
		public string openid
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string group_id
		{
			set{ _group_id=value;}
			get{return _group_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string group_name
		{
			set{ _group_name=value;}
			get{return _group_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? create_date
		{
			set{ _create_date=value;}
			get{return _create_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? is_act
		{
			set{ _is_act=value;}
			get{return _is_act;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? is_default
		{
			set{ _is_default=value;}
			get{return _is_default;}
		}
		#endregion Model

	}
}

