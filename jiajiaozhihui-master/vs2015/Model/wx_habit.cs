using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_habit:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_habit
	{
		public wx_habit()
		{}
		#region Model
		private int _id;
		private string _appid;
		private string _title;
		private int _habit_classify;
		private string _imgurl;
		private int? _join_num=0;
		private int? _is_private=0;
		private DateTime? _create_date= DateTime.Now;
		private int? _sn=999999999;
		private int? _is_act=1;
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
		public string title
		{
			set{ _title=value;}
			get{return _title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int habit_classify
		{
			set{ _habit_classify=value;}
			get{return _habit_classify;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string imgurl
		{
			set{ _imgurl=value;}
			get{return _imgurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? join_num
		{
			set{ _join_num=value;}
			get{return _join_num;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? is_private
		{
			set{ _is_private=value;}
			get{return _is_private;}
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
		public int? sn
		{
			set{ _sn=value;}
			get{return _sn;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? is_act
		{
			set{ _is_act=value;}
			get{return _is_act;}
		}
		#endregion Model

	}
}

