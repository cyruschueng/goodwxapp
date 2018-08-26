using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_habit_my_detail:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_habit_my_detail
	{
		public wx_habit_my_detail()
		{}
		#region Model
		private int _id;
		private string _appid;
		private int _habit_id;
		private string _openid;
		private string _notes;
		private string _image_url;
		private string _audio_url;
		private string _video_url;
		private DateTime? _create_date= DateTime.Now;
		private int? _group_id;
		private int? _finish=0;
		private int? _is_recommend=0;
		private int? _is_top=0;
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
		public int habit_id
		{
			set{ _habit_id=value;}
			get{return _habit_id;}
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
		public string notes
		{
			set{ _notes=value;}
			get{return _notes;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string image_url
		{
			set{ _image_url=value;}
			get{return _image_url;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string audio_url
		{
			set{ _audio_url=value;}
			get{return _audio_url;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string video_url
		{
			set{ _video_url=value;}
			get{return _video_url;}
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
		public int? group_id
		{
			set{ _group_id=value;}
			get{return _group_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? finish
		{
			set{ _finish=value;}
			get{return _finish;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? is_recommend
		{
			set{ _is_recommend=value;}
			get{return _is_recommend;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? is_top
		{
			set{ _is_top=value;}
			get{return _is_top;}
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

