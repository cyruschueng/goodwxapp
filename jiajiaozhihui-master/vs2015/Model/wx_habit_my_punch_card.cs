using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_habit_my_punch_card:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_habit_my_punch_card
	{
		public wx_habit_my_punch_card()
		{}
		#region Model
		private int _id;
		private string _appid;
		private string _openid;
		private int _habit_id;
		private int? _group_id;
		private DateTime _punch_card_date;
		private DateTime? _create_date= DateTime.Now;
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
		public string appid
		{
			set{ _appid=value;}
			get{return _appid;}
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
		public int habit_id
		{
			set{ _habit_id=value;}
			get{return _habit_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? group_id
		{
			set{ _group_id=value;}
			get{return _group_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime punch_card_date
		{
			set{ _punch_card_date=value;}
			get{return _punch_card_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? create_date
		{
			set{ _create_date=value;}
			get{return _create_date;}
		}
		#endregion Model

	}
}

