using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_habit_comment:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_habit_comment
	{
		public wx_habit_comment()
		{}
		#region Model
		private int _id;
		private string _appid;
		private int _habit_id;
		private int _habit_detail_id;
		private string _openid;
		private string _comment_openid;
		private string _comment;
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
		public string openid
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string comment_openid
		{
			set{ _comment_openid=value;}
			get{return _comment_openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string comment
		{
			set{ _comment=value;}
			get{return _comment;}
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

