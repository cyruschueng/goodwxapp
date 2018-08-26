using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_habit_black_list:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_habit_black_list
	{
		public wx_habit_black_list()
		{}
		#region Model
		private int _id;
		private string _appid;
		private string _openid;
		private DateTime? _black_date= DateTime.Now;
		private int? _interval=0;
		private string _remark;
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
		public DateTime? black_date
		{
			set{ _black_date=value;}
			get{return _black_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? interval
		{
			set{ _interval=value;}
			get{return _interval;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string remark
		{
			set{ _remark=value;}
			get{return _remark;}
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

