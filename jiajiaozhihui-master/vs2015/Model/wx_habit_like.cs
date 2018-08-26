using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_habit_like:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_habit_like
	{
		public wx_habit_like()
		{}
		#region Model
		private int _id;
		private string _appid;
		private int _habit_id;
		private int _habit_detail_id;
		private string _like_openid;
		private DateTime? _create_date= DateTime.Now;
		private int? _is_act=1;
		private int? _group_id;
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
		public int habit_id
		{
			set{ _habit_id=value;}
			get{return _habit_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int habit_detail_id
		{
			set{ _habit_detail_id=value;}
			get{return _habit_detail_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string like_openid
		{
			set{ _like_openid=value;}
			get{return _like_openid;}
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
		public int? group_id
		{
			set{ _group_id=value;}
			get{return _group_id;}
		}
		#endregion Model

	}
}

